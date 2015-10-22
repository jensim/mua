'use strict';

describe('Service: mutantCalcFactory', function () {

  // load the service's module
  beforeEach(module('dndToolApp'));

  // instantiate service
  var mutantCalcFactory;
  beforeEach(inject(function (_mutantCalcFactory_) {
    mutantCalcFactory = _mutantCalcFactory_;
  }));

  it('should do something', function () {
    expect(!!mutantCalcFactory).toBe(true);
  });

});
