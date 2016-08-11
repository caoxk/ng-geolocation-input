(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
angular.module('ngGaodeMap', [])
  .factory('gaodeMapScriptLoader', require('./src/script-loader-factory'))
  .provider('gaodeMapApi', require('./src/api-provider'))
  .directive('gaodeMap', require('./src/gaode-map-directive'))
  .directive('marker', require('./src/marker-directive'))
  .directive('coordinateInput', require('./src/gaode-map-input-directive'));

},{"./src/api-provider":2,"./src/gaode-map-directive":3,"./src/gaode-map-input-directive":4,"./src/marker-directive":5,"./src/script-loader-factory":6}],2:[function(require,module,exports){
/**
 * 用于配置加载地图的方法
 */
function ApiProvider() {

  return {
    $get: $get,
    accessKey: accessKey,
    version: version,
    options: {
      version: '2.0'
    }
  };

  function accessKey(_accessKey) {
    this.options.accessKey = _accessKey;
    return this;
  }

  function version(_version) {
    this.options.version = _version;
    return this;
  }

  /**
   * @ngInject
   */
  function $get(gaodeMapScriptLoader) {
    return gaodeMapScriptLoader(this.options.version, this.options.accessKey);
  }
}

module.exports = ApiProvider;

},{}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
/**
 * directive 定义
 *
 * @ngInject
 */
function coordinateInputDirective() {
	var options = {
		restrict: 'AE',
		replace: true,
		scope: {
			point: '=coordinateValue'
		},
		templateUrl: '../templates/geolocation.html',
		controller: 'coordinateController',
		controllerAs: 'coordinateCtrl',
		bindToController: true
	};
	return options;
}
module.exports = coordinateInputDirective;
},{}],5:[function(require,module,exports){
function MarkerDirective() {

	return {
		scope: {
			latlng: '='
		},
		link: link
	};

	function link(scope, element) {
		scope.$on('mapready', initialize);
		return;

		function initialize(e, map) {
			// console.log('put marker');
			var lng = scope.latlng.lng;
			var lat = scope.latlng.lat;
			var point = new AMap.LngLat(lng, lat);
			var marker = new AMap.Marker({
				position: point,
				draggable: true,
				cursor: 'move'
			});

			//map.addOverlay(marker);
			marker.setMap(map);

			AMap.event.addListener(marker, "dragend", function(e) {
				scope.latlng.lng = e.lnglat.getLng();
				scope.latlng.lat = e.lnglat.getLat();
				scope.$apply();
			});

			scope.$watch('latlng', function(newVal, oldVal) {
				var point = new AMap.LngLat(newVal.lng, newVal.lat);
				marker.setPosition(point);
			}, true);
		}
	}

}

module.exports = MarkerDirective;
},{}],6:[function(require,module,exports){
/**
 * 用于管理百度地图 API 脚本
 *
 * @ngInject
 */
function ScriptLoaderFactory($q) {

  var mapApi = $q.defer();
  var callbackName = randomCallbackName();
  window[callbackName] = initialize;

  return load;

  function load(version, accessKey) {
    // load gaode map api
    var script = document.createElement('script');

    var gaodeLoader = [
      'http://webapi.amap.com/maps?',
      'v=', version,
      '&ak=', accessKey,
      '&callback=', callbackName
    ].join('');

    console.log(gaodeLoader);
    script.src = gaodeLoader;
    document.body.appendChild(script);

    return mapApi.promise;
  }

  function initialize() {
    // console.log('api loaded');
    mapApi.resolve(AMap);
    delete window[callbackName];
  }
}

/**
 * 生成随机的 callback 方法名
 */
function randomCallbackName() {
  var name = '_callback' + (Math.random() + 1).toString(36).substring(2, 5);
  return name;
}

module.exports = ScriptLoaderFactory;

},{}]},{},[1]);
