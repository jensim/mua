'use strict';

angular.module('dndToolApp').config(function ($stateProvider) {
	$stateProvider.state('mutant', {
		url: '/',
		templateUrl: 'app/mutant/mutant.html',
		controller: 'MutantCtrl'
	});
});
