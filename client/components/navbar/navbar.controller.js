'use strict';

angular.module('dndToolApp').controller('NavbarCtrl', function ($scope, $location, Auth) {
	$scope.menu = [
		{
			'title': 'UA',
			'link': '/'
		}, {
			'title': 'År noll',
			'link': '/zero',
			'disabled': true
		}
	];

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
