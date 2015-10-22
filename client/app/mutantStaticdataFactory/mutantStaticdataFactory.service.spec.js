'use strict';

describe('Service: mutantStaticdataFactory', function () {

  // load the service's module
  beforeEach(module('dndToolApp'));

  // instantiate service
  var mutantStaticdataFactory;
  beforeEach(inject(function (_mutantStaticdataFactory_) {
    mutantStaticdataFactory = _mutantStaticdataFactory_;
  }));

  it('should do something', function () {
    expect(!!mutantStaticdataFactory).toBe(true);
  });

});
