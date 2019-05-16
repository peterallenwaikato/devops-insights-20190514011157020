//var markerlatlng = {lat: -25.363, lng: 131.044};
var ConsoleModule = angular.module('ConsoleModule', ['ngRoute']);

ConsoleModule.config(['$routeProvider', '$locationProvider','$sceDelegateProvider', '$httpProvider',
    function ($routeProvider, $locationProvider, $sceDelegateProvider, $httpProvider) {
    $routeProvider.when('/', {
        templateUrl: '/partials/Byzip.html',
        controller: 'wcontroller',
        controllerAs: 'wcontroller'
    });
}]);

function addMarker(location,map){
	
	var marker = new google.maps.Marker({
	position:location,
	map:map
	});


}
ConsoleModule.controller('wcontroller', ['$scope', '$http', '$routeParams', '$timeout', '$sce',
    function($scope, $http, $routeParams, $timeout, $sce) {

    $scope.somemessage = "Some weather";
    $scope.zip1City = "";
    $scope.zip1Weather = "";
    var city = [];
    var latitude = [];
    var longitude = [];
    var markerArray = [];
    var point;
    
    
//addMarker(markerlatlng, map);
    $scope.zip = function(which) {

        var data = "";
        if(which === 1) {
            data = $scope.zip1m;
        } else if(which === 2) {
            data = $scope.zip2m;
        } else if(which === 3) {
            data = $scope.zip3m;
        } else if(which === 4) {
            data = $scope.zip4m;
        } 

       
            $http({
                method: "GET",
                url: '/api/v1/getWeather?zip=' + data
            }).then( function(response) {
                if(which === 1) {
                	markerArray[0].setMap(null);
                    $scope.zip1City = response.data.city;
                    $scope.zip1Weather = response.data.weather;
                    city[0] = response.data.city;
                    latitude[0] = response.data.coord.lat;
                    longitude[0] = response.data.coord.lon; 
                    point = {lat:latitude[0], lon:longitude[0]};
                   markerArray[0].addMarker(point,map);
                    
                } else if(which === 2) {
                	markerArray[1].setMap(null);
                    $scope.zip2City = response.data.city;
                    $scope.zip2Weather = response.data.weather;
                      city[1] = response.data.city;
                    latitude[1] = response.data.coord.lat;
                    longitude[1] = response.data.coord.lon; 
                    point = {lat:latitude[1], lon:longitude[1]};
                   markerArray[1].addMarker(point,map);
                  
                } else if(which === 3) {
                	markerArray[2].setMap(null);
                    $scope.zip3City = response.data.city;
                    $scope.zip3Weather = response.data.weather;
                      city[2] = response.data.city;
                    latitude[2] = response.data.coord.lat;
                    longitude[2] = response.data.coord.lon; 
                    point = {lat:latitude[2], lon:longitude[2]};
                   markerArray[2].addMarker(point,map);
                    
                } else if(which === 4) {
                markerArray[3].setMap(null);
                    $scope.zip4City = response.data.city;
                    $scope.zip4Weather = response.data.weather;
                      city[3] = response.data.city;
                    latitude[3] = response.data.coord.lat;
                    longitude[3] = response.data.coord.lon;
                    point = {lat:latitude[3], lon:longitude[3]};
                   markerArray[3].addMarker(point,map);
                   
                }        
            });       
    }; 
}]);
