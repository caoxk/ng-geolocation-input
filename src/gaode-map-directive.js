/**
 * directive 定义
 *
 * @ngInject
 */
function GaodeMapDirective($q, gaodeMapApi) {

  return {
    transclude: true,
    template: [
      '<div></div>',
      '<div ng-transclude></div>'
    ].join(''),
    scope: {
      center: '='
    },
    link: link
  };

  function link(scope, element, attrs) {
    var container = element.children();
    element.css('display', 'block');
    angular.element(container[1]).css('display', 'none');
    angular.element(container[0]).css({
      'min-height': '100px',
      'min-width': '100px',
      height: '100%',
      width: '100%'
    });

    scope.$on('mapready', initialize);

    gaodeMapApi.then(function(AMap) {
        var map = new AMap.Map(container[0], {
            resizeEnable: true,
            zoom: 11
        });
        var center = scope.center;
        if (center) {
            var point = new AMap.LngLat(center.lng, center.lat);
            map.setCenter(point);
        }
      scope.$broadcast('mapready', map);
    });

    return;

    function initialize(e, map) {
		var isDragged = false;
		AMap.event.addListener(map, "dragend", function(e) {
			isDragged = true;
			var center = map.getCenter();
			scope.center = {lng: center.getLng(),lat: center.getLat()};
			scope.$apply();
			isDragged = false;
		});

      scope.$watch('center', function(newVal, oldVal) {
		  if(isDragged)
			  return;
			var point = new AMap.LngLat(newVal.lng, newVal.lat);
			map.panTo(point);
      }, true);
    }
  }

}

module.exports = GaodeMapDirective;
