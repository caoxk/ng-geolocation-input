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