var express = require('express');
var app = express();

app.get('/data', function (req, res) {
	res.send([{
		name: 'wine1'
	}, {
		name: 'wine2'
	}]);
});

app.use('/', express.static(__dirname + '/dist'));
app.listen(process.env.PORT || 5000);
