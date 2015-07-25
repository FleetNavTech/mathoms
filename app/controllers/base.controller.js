(function () {
	'use strict';

	angular
	.module('app.controller.base', [])
	.controller('BaseCtrl', Controller);

	Controller.$inject = ['$scope'];

	function Controller ($scope) {
		var vm = this;
	}
})();