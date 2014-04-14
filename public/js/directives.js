app.directive('alert', function(){
	return {
		transclude: true,
		scope: {},
		restrict: 'C',
		template: '<a class="close" ng-click="close()"></a> <div ng-transclude></div>',
		link: function (scope, element, attrs) {
			scope.close = function () {
				element.remove();
			}
		}
	}
});