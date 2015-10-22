'use strict';

describe('Controller: MutantCtrl', function () {

	// load the controller's module
	beforeEach(module('dndToolApp'));

	var MutantCtrl, scope;

	// Initialize the controller and a mock scope
	beforeEach(inject(function ($controller, $rootScope) {
		scope = $rootScope.$new();
		MutantCtrl = $controller('MutantCtrl', {
			$scope: scope
		});
	}));

	it('should ...', function () {
		expect(1).toEqual(1);
	});
});
