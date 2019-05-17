
var express = require('express');
var router = express.Router();
var REQUEST = require('request');

var request = REQUEST.defaults( {
    strictSSL: false
});

var OPENWEATHERURL = "http://api.openweathermap.org/data/2.5/weather?appid=6b7b471967dd0851d0010cdecf28f829&units=metric";

exports.getWeather = function(req, res) {
	var location = req.query.location;
	if( (location === null) || (typeof(location) === 'undefined') ) {
		return res.status(400).send('zip missing');
	}

	var aurl = OPENWEATHERURL + '&q=' + location + ',NZ';

	request({
		method: 'GET',
        url: aurl,
  		json: true
    }, function(err, resp, body) {
    	if(err) {
    		res.status(400).send('Failed to get the data');
    		//console.error("Failed to send request to openweathermap.org", err);
    	} else {
    		if(body.cod === 200) {
    			var weath = "Conditions are " + body.weather[0].main + " and temperature is " + body.main.temp + ' C';
    			var response = {city: body.name, weather: weath,coord: body.coord};
    			return res.status(200).send(response);
    		} else {
                return res.status(400).send({msg:'Failed'});
            }
    	}
    });

};
router.get('/getWeather', exports.getWeather);




exports.getWeathergeo = function(req, res) {
	var latitude = req.query.lat;
	var longitude = req.query.lon;
	if( (latitude === null) || (typeof(latitude) === 'undefined') ) {
		return res.status(400).send('latitude missing');
	}
	else if( (longitude === null) || (typeof(longitude) === 'undefined') ) {
		return res.status(400).send('longitude missing');
	}

var aurl = OPENWEATHERURL + '&lat=' + latitude + ' &lon=' + longitude;

	request({
		method: 'GET',
        url: aurl,
  		json: true
    }, function(err, resp, body) {
    	if(err) {
    		res.status(400).send('Failed to get the data');
    		//console.error("Failed to send request to openweathermap.org", err);
    	} else {
    		if(body.cod === 200) {
    			var weath = "Conditions are " + body.weather[0].main + " and temperature is " + body.main.temp + ' C';
    			var response = {city: body.name, weather: weath, coord: body.coord};
    			return res.status(200).send(response);
    		} else {
                return res.status(400).send({msg:'Failed'});
            }
    	}
    });

};
router.get('/getWeathergeo', exports.getWeathergeo);


exports.router = router;
