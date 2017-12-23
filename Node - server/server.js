var express = require('express');
var app = express();
var request = require('request');

var bodyParser = require('body-parser');
// var url = 'http://api.themoviedb.org/3/';
// mode = 'search/movie?query=';
// input;
// movieName;
// key = '&api_key=<<api_key>>';

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

app.get('/movietime', function(req, res){
	request('http://api.themoviedb.org/3/search/movie?&api_key=<<api_key>>&query=sherlock', function (error, response, body) {
		if (!error && response.statusCode == 200) {
		  var info = JSON.parse(body)
		  res.json(info);
		}
	})
});

app.get('/movietime/:name', function(req, res){
	request('http://api.themoviedb.org/3/search/movie?&api_key=<<api_key>>&query='+req.params.name, function (error, response, body) {
		if (!error && response.statusCode == 200) {
		  var info = JSON.parse(body)
		  res.json(info);
		}
	})
});

app.get('/movietime/genre/:genre', function(req, res){
	console.log(req.params.genre);
	request('https://api.themoviedb.org/3/genre/'+req.params.genre+'/movies?api_key=<<api_key>>&language=en-US&sort_by=created_at.asc',
		function (error, response, body) {
			if (!error && response.statusCode == 200) {
				var info = JSON.parse(body)
				res.json(info);
			}
	})
});

app.listen(3000);
console.log("Server is running on poet 3000");