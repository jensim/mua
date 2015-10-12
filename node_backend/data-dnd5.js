if (typeof define !== 'function') {
	var define = require('amdefine')(module);
}

define(function (require) {
	var mongoose = require('mongoose');

	return {
		getClasses: function () {
			console.log('I was called. Get classes is going places!');
		}
	};
});
