var app = angular.module('app', ['ngRoute']);

app.config(['$interpolateProvider', '$routeProvider', function ($interpolateProvider, $routeProvider) {
	$interpolateProvider.startSymbol('[[');
	$interpolateProvider.endSymbol(']]');

	$routeProvider
		.when('/register', {
			templateUrl: 'templates/register.html',
			controller: 'UserRegisterCtrl'
		})

		.when('/login', {
			templateUrl: 'templates/login.html'
		})

		.otherwise({
			templateUrl: 'templates/index.html'
		});	
}]);