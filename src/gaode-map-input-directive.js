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