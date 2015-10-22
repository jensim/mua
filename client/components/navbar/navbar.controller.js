'use strict';

angular.module('dndToolApp')
	.controller('NavbarCtrl', function ($scope, $location, Auth) {
		$scope.menu = [{
			'title': 'Home',
			'link': '/'
    }, {
			'title': 'Mutant: UA',
			'link': '/mutant'
		}];

		$scope.isCollapsed = true;
		$scope.isLoggedIn = Auth.isLoggedIn;
		$scope.isAdmin = Auth.isAdmin;
		$scope.getCurrentUser = Auth.getCurrentUser;

		$scope.logout = function () {
			Auth.logout();
			$location.path('/login');
		};

		$scope.isActive = function (route) {
			return route === $location.path();
		};
	});
