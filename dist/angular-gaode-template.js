angular.module('templates-main', ['../templates/dropdown.html', '../templates/geolocation.html']);

angular.module("../templates/dropdown.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../templates/dropdown.html",
    "<div class=\"dropdown-menu dropdown-menu-right\" uib-dropdown-menu role=\"menu\">\n" +
    "	<gaode-map class=\"map\" center=\"coordinateCtrl.point\">\n" +
    "		<marker latlng=\"coordinateCtrl.point\">\n" +
    "		</marker>\n" +
    "	</gaode-map>\n" +
    "</div>");
}]);

angular.module("../templates/geolocation.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("../templates/geolocation.html",
    "<div class=\"btn-group\" uib-dropdown auto-close=\"outsideClick\">\n" +
    "	<div class=\"input-group\"><input type=\"text\" class=\"form-control\" value=\"{{coordinateCtrl.point.lng}}, {{coordinateCtrl.point.lat}}\" placeholder=\"Search for...\" readonly=\"readonly\">\n" +
    "		<div class=\"input-group-btn\"><button class=\"btn btn-default\" type=\"button\" uib-dropdown-toggle ng-disabled=\"disabled\"><span class=\"caret\"></span></button></div>\n" +
    "	</div>\n" +
    "	<div class=\"dropdown-menu dropdown-menu-right\" uib-dropdown-menu template-url=\"../templates/dropdown.html\"></div>\n" +
    "</div>");
}]);
