'use strict';

describe('Directive: diceRoller', function () {

	// load the directive's module and view
	beforeEach(module('dndToolApp'));
	beforeEach(module('app/dice-roller/dice-roller.html'));

	var element, scope;

	beforeEach(inject(function ($rootScope) {
		scope = $rootScope.$new();
	}));

	it('should make hidden element visible', inject(function ($compile) {
		element = angular.element('<dice-roller dice="1T1" persist="true"></dice-roller>');
		element = $compile(element)(scope);
		scope.$apply();
		//TODO: expect(element.text()).toBe('this is the diceRoller directive');
	}));
});
