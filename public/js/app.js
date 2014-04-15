var app = angular.module('app', ['ngRoute']);

app.config(['$interpolateProvider', '$routeProvider', function ($interpolateProvider, $routeProvider) {
	$interpolateProvider.startSymbol('[[');
	$interpolateProvider.endSymbol(']]');

	$routeProvider
		.when('/register', {
			templateUrl: '/templates/register.html',
			controller: 'UserRegisterCtrl'
		})

		.when('/login', {
			templateUrl: '/templates/login.html'
		})

		/* Adminstration routes */
		.when('/adm/index', {
			templateUrl: '/templates/adm/index.html',
			controller: 'UserCtrl'
		})

		.when('/adm/answers', {
			templateUrl: '/templates/adm/answers.html',
			controller: 'UserCtrl'
		})

		.otherwise({
			templateUrl: '/templates/index.html'
		});	
}]);