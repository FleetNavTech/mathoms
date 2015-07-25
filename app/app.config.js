(function () {
	'use strict';

	angular
	.module('app.config', [])
	.config(Config);

	Config.$inject = ["$stateProvider", "$urlRouterProvider"];

	function Config ($stateProvider, $urlRouterProvider) {
		$stateProvider

		.state('app', {
			url: '/app',
			abstract: true,
			templateUrl: 'app/templates/base.html',
			controller: 'BaseCtrl as Base'
		})

		.state('app.login', {
			url: '/login',
			templateUrl: 'app/templates/login.html',
			controller: 'LoginCtrl as Login'
		})

		// if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app/login');
	}
})();