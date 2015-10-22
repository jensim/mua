'use strict';

describe('Service: mutantService', function () {

  // load the service's module
  beforeEach(module('dndToolApp'));

  // instantiate service
  var mutantService;
  beforeEach(inject(function (_mutantService_) {
    mutantService = _mutantService_;
  }));

  it('should do something', function () {
    expect(!!mutantService).toBe(true);
  });

});
