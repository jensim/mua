var express = require('express');
var app = express();
var mongoose = require('mongoose');

var port = process.env.PORT || 5000;
var mongoURL = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'localhost';

var uristring =
	process.env.MONGOLAB_URI ||
	process.env.MONGOHQ_URL ||
	'mongodb://localhost/dd';

mongoose.connect(uristring, function (err, res) {
	if (err) {
		console.log('ERROR connecting to: ' + uristring + '. ' + err);
	} else {
		console.log('Succeeded connected to: ' + uristring);
	}
});

var dnd5 = require('./node_backend/data-dnd5');

app.get('/data/:db/:collection', function (req, res) {
	console.log(req.params.collection + ': ' + req.data);
	dnd5.getClasses();
	res.status(200).send([{
		name: req.params.collection
				}, {
		name: 'wine2'
				}]);

});

app.post('/data/:db/:collection', function (req, res) {
	if (req.data && req.params.collection) {
		console.log(req.params.collection + ': ' + req.data);
		res.status(200).send('Good one!');
	} else {
		console.log('No data');
		res.status(500).send('Not Acceptable');
	}
});


app.use('/', express.static(__dirname + '/dist'));

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	app.use(function (err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: err
		});
	});
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: {}
	});
});

app.listen(port);
console.log('Server started on port ' + port);
