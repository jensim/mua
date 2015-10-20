'use strict';

var _ = require('lodash');
var Tabletop = require('tabletop');
var listeners = [];
var mutantData;
var mutantDataGet = false;
var tableTopCallback = function (data, tabletop) {
	//console.log('tableTopCallback:data: ' + JSON.stringify(data));
	console.log('tableTopCallback:data: ');
	console.log(data);
	//console.log('tableTopCallback:tabletop: ' + JSON.stringify(tabletop));
	console.log('tableTopCallback:tabletop: ');
	console.log(tabletop);
	mutantData = data;
	mutantDataGet = false;
	listeners.forEach(function (l) {
		try {
			l(data);
		} catch (err) {
			console.err('Problem calling listener: ' + err);
		}
	});
};
var loadMutantData = function () {
	if (mutantDataGet) {
		Tabletop.init({
			key: '1-O2dpXX923Hetv2P24XpN4KhhLSr7-NJ-rnrx_pB_ug',
			callback: tableTopCallback
		});
	}
};
loadMutantData();
setInterval(loadMutantData, 120000);

// Get list of mutantdatas
exports.index = function (req, res) {
	mutantDataGet = true;
	if (!!mutantData) {
		return res.status(200).send(mutantData);
	} else {
		return res.status(500).send('No data on server..');
	}
};

exports.listen = function (listener) {
	listeners.push(listener);
};
