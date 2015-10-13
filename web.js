var bodyParser = require('body-parser');
var express = require('express');
var app = express();
var dnd5 = require('./node_backend/data-dnd5');

var port = process.env.PORT || 5000;
var serverFolder = process.argv[2] || 'dist';

app.use(bodyParser.json());

app.post('/dnd5/get/:collection', function (req, res) {
	//console.log('GET: ' + JSON.stringify(req.body));
	dnd5.receiveData(function (err, dbResp) {
		if (err) {
			res.status(500).send(err);
		} else {
			res.status(200).send(dbResp);
		}
	}, req.params.collection, req.body);
});

app.post('/dnd5/create/:collection', function (req, res) {
	if (req.body === undefined) {
		res.status(500).send('No data attribute');
	}
	dnd5.createData(function (err, dbResp) {
		if (err) {
			res.status(500).send(err);
		} else {
			res.status(200).send(dbResp);
		}
	}, req.params.collection, req.body);
});


app.use('/', express.static(__dirname + '/' + serverFolder));

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
