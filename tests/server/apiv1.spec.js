
/*eslint-disable no-extra-parens */
(function () {

  'use strict';

  var requireHelper = require('./requireHelper');
  var apiv1 = requireHelper.require('tests/coverage/instrumented/routes/apiv1');
  var assert = require('chai').assert;
  var sinon = require('sinon');



  // create mock request and response
  var reqMock = {};

  var resMock = {};
  resMock.status = function() {
    return this;
  };
  resMock.send = function() {
    return this;
  };
  resMock.end = function() {
    return this;
  };
  sinon.spy(resMock, "status");
  sinon.spy(resMock, "send");


  describe('Get Weather', function() {

    it('with without location', function() {
      reqMock = {
        query: {

        }
      };

      apiv1.getWeather(reqMock, resMock);

      assert(resMock.status.lastCall.calledWith(400), 'Unexpected status code:' + resMock.status.lastCall.args);
    });

    it('with valid zip code and error from request call', function() {
      reqMock = {
        query: {
          location: 'Hamilton'
        }
      };

      var request = function( obj, callback ){
        callback("error", null, null);
      };

      apiv1.__set__("request", request);

      apiv1.getWeather(reqMock, resMock);

      assert(resMock.status.lastCall.calledWith(400), 'Unexpected response:' + resMock.status.lastCall.args);
      assert(resMock.send.lastCall.calledWith('Failed to get the data'), 'Unexpected response:' + resMock.send.lastCall.args);
    });

    it('with incomplete zip code', function() {
      reqMock = {
        query: {
          location: 'Hamilton'
        }
      };

      var request = function( obj, callback ){
        callback(null, null, {});
      };

      apiv1.__set__("request", request);

      apiv1.getWeather(reqMock, resMock);

      assert(resMock.status.lastCall.calledWith(400), 'Unexpected response:' + resMock.status.lastCall.args);
      assert(resMock.send.lastCall.args[0].msg === 'Failed', 'Unexpected response:' + resMock.send.lastCall.args);
    });

    it('with valid zip code', function() {
      reqMock = {
        query: {
          location: 'Hamilton'
        }
      };

      var body = {
        cod: 200,
        name: 'El Paso',
        weather: [
          {
            main: 'cold'
          }
        ],
        main: {
          temp: 78
        }
      };

      var request = function( obj, callback ){
        callback(null, null, body);
      };

      apiv1.__set__("request", request);

      apiv1.getWeather(reqMock, resMock);

      assert(resMock.status.lastCall.calledWith(200), 'Unexpected response:' + resMock.status.lastCall.args);
      assert(resMock.send.lastCall.args[0].city === 'El Paso', 'Unexpected response:' + resMock.send.lastCall.args[0].city);
      assert(resMock.send.lastCall.args[0].weather === 'Conditions are cold and temperature is 78 C', 'Unexpected response:' + resMock.send.lastCall.args[0].weather);
    });
  });

 
  describe('Get Weather geo', function() {
  	  
  	  it('with without position', function() {
      reqMock = {
        query: {
            
        }
      };

      apiv1.getWeathergeo(reqMock, resMock);
      assert(resMock.status.lastCall.calledWith(400), 'Unexpected status code:' + resMock.status.lastCall.args);
  	 });

    it('with without latitude', function() {
      reqMock = {
        query: {
             lon: 174.7633
        }
      };
  apiv1.getWeatherPos(reqMock, resMock);
});
assert(resMock.status.lastCall.calledWith(400), 'Unexpected status code:' + resMock.status.lastCall.args);

         it('with without longitude', function() {
      reqMock = {
        query: {
             lat: -36.8485
        }
      };

      apiv1.getWeathergeo(reqMock, resMock);

      assert(resMock.status.lastCall.calledWith(400), 'Unexpected status code:' + resMock.status.lastCall.args);
    });

    it('with valid location and error from request call', function() {
      reqMock = {
        query: {
          lat: -36.8485,
          lon: 174.7633
        }
      };

      var request = function( obj, callback ){
        callback("error", null, null);
      };

      apiv1.__set__("request", request);

      apiv1.getWeathergeo(reqMock, resMock);

      assert(resMock.status.lastCall.calledWith(400), 'Unexpected response:' + resMock.status.lastCall.args);
      assert(resMock.send.lastCall.calledWith('Failed to get the data'), 'Unexpected response:' + resMock.send.lastCall.args);
    });

    it('with incomplete location', function() {
      reqMock = {
        query: {
            lat: -36.8485,
          lon: 174.7633
        }
      };

      var request = function( obj, callback ){
        callback(null, null, {});
      };

      apiv1.__set__("request", request);

      apiv1.getWeathergeo(reqMock, resMock);

      assert(resMock.status.lastCall.calledWith(400), 'Unexpected response:' + resMock.status.lastCall.args);
      assert(resMock.send.lastCall.args[0].msg === 'Failed', 'Unexpected response:' + resMock.send.lastCall.args);
    });

    it('with valid location', function() {
      reqMock = {
        query: {
           lat: -36.8485,
          lon: 174.7633
        }
      };

      var body = {
        cod: 200,
        name: 'Auckland',
        weather: [
          {
            main: 'cold'
          }
        ],
        main: {
          temp: 2
        }
      };

      var request = function( obj, callback ){
        callback(null, null, body);
      };

      apiv1.__set__("request", request);

      apiv1.getWeathergeo(reqMock, resMock);

      assert(resMock.status.lastCall.calledWith(200), 'Unexpected response:' + resMock.status.lastCall.args);
      assert(resMock.send.lastCall.args[0].city === 'Auckland', 'Unexpected response:' + resMock.send.lastCall.args[0].city);
      assert(resMock.send.lastCall.args[0].weather === 'Conditions are cold and temperature is 2 C', 'Unexpected response:' + resMock.send.lastCall.args[0].weather);
      assert(resMock.send.lastCall.args[0].coord === {lon: 174.7633 , lat:-36.8485},'Unexpected response:' + resMock.send.lastCall.args[0].coord);
    });
  });
  
}());
