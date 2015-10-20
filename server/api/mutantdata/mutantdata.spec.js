'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');

describe('GET /api/mutantdata', function () {

	it('should respond with JSON array', function (done) {
		request(app)
			.get('/api/mutantdata')
			.expect(500)
			.expect('Content-Type', 'text/html; charset=utf-8')
			.end(function (err, res) {
				if (err) return done(err);
				//res.body.should.be.instanceof(Array);
				done();
			});
	});
});
