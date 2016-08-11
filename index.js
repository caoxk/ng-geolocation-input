angular.module('ngGaodeMap', [])
  .factory('gaodeMapScriptLoader', require('./src/script-loader-factory'))
  .provider('gaodeMapApi', require('./src/api-provider'))
  .directive('gaodeMap', require('./src/gaode-map-directive'))
  .directive('marker', require('./src/marker-directive'))
  .directive('coordinateInput', require('./src/gaode-map-input-directive'));
