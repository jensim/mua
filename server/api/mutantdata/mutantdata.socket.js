/**
 * Broadcast updates to client when the model changes
 */

'use strict';

//var Mutantdata = require('./mutantdata.model');
var MutatController = require('./mutantdata.controller');

function onSave(socket, doc, cb) {
	socket.emit('mutantdata:save', doc);
}

exports.register = function (socket) {
	MutatController.listen(function (data) {
		onSave(socket, data);
	});
};
