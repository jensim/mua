'use strict';

/**
 * @ngdoc function
 * @name ddApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ddApp
 */
angular.module('ddApp')
	.controller('MainCtrl', ['$scope', '$http', '$log', function ($scope, $http, $log) {
		$scope.createRace = function () {
			$log.debug('Creating race: ' + $scope.newRaceName);
			var data = {
				name: $scope.newRaceName
			};
			$http.post('/dnd5/create/Race', data).then(
				function (res) {
					$log.debug('Create success: ' + JSON.stringify(res.data));
					$scope.mongoResponse = res.data;
				},
				function (res) {
					$log.debug('Create error: ' + JSON.stringify(res.data));
					$scope.mongoResponse = res.data;
				}
			);
		};
		$scope.getRace = function () {
			$log.debug('Getting race: ' + $scope.newRaceName);
			var data = {
				name: $scope.newRaceName
			};
			$http.post('/dnd5/get/Race', data).then(
				function (res) {
					$log.debug('Find success: ' + JSON.stringify(res.data));
					$scope.mongoResponse = res.data;
				},
				function (res) {
					$log.error('Find error: ' + JSON.stringify(res.data));
					$scope.mongoResponse = res.data;
				}
			);
		};
		this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  }]);
