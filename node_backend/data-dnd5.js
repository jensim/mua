if (typeof define !== 'function') {
	var define = require('amdefine')(module);
}

define(function (require) {
	var mongoose = require('mongoose');
	var uristring =
		process.env.MONGOLAB_URI ||
		process.env.MONGOHQ_URL ||
		'mongodb://localhost:27017/dnd-tool';

	mongoose.connect(uristring, function (err, res) {
		if (err) {
			console.log('ERROR connecting to: ' + uristring + '. ' + err);
		} else {
			console.log('Succeeded connected to: ' + uristring);
		}
	});

	var lintJson = function (data, allowed) {
		for (var property in data) {
			if (data.hasOwnProperty(property)) {
				var doDelete = true;
				allowed.forEach(function (a) {
					if (property == a) {
						doDelete = false;
					}
				});
				if (doDelete) {
					delete data[property];
				}
			}
		}
		return data;
	};

	var raceSchema = mongoose.Schema({
		name: String
	});
	var Race = mongoose.model('Race', raceSchema);

	return {
		receiveData: function (callback, collection, data) {
			if (collection === 'Race') {
				data = lintJson(data, ['name']);
				console.log('PostLint' + JSON.stringify(data));
				Race.find(data, callback);
			} else {
				callback('No matching collection.');
			}
		},
		createData: function (callback, collection, data) {
			//Create if it does not exist
			if (collection === 'Race') {
				console.log('PreLint' + JSON.stringify(data));
				data = lintJson(data, ['name']);
				console.log('PostLint' + JSON.stringify(data));
				Race.find(data, function (err, races) {
					if (err) {
						callback('Knepgigt att läsa');
					} else if (races.length === 0) {
						new Race(data).save(callback);
					} else {
						callback('Race already exists');
					}
				});
			} else {
				callback('No matching collection.');
			}
		}
	};
});
