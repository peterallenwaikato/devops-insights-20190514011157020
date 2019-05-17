
   var ConsoleModule = angular.module('ConsoleModule', ['ngRoute']);

   var city = [];
    var latitude = [];
    var longitude = [];
    var markerArray = [];

ConsoleModule.config(['$routeProvider', '$locationProvider','$sceDelegateProvider', '$httpProvider',
    function ($routeProvider, $locationProvider, $sceDelegateProvider, $httpProvider) {
    $routeProvider.when('/', {
        templateUrl: '/partials/Byzip.html',
        controller: 'wcontroller',
        controllerAs: 'wcontroller'
    });
}]);
function putPinsOnMap(cities,lat,long) {
	setMapOnAll(null);
	markerArray=[];
    for (i = 0; i < city.length; i++){
    	var point = {lat: lat[i], lng: long[i]};
        addPin(point, map);       
    }
    setMapOnAll(map);
}

function addPin(location,map){
	
	var marker = new google.maps.Marker({
	position:location,
	map:map
	})

markerArray.push(marker);
}
 
        function setMapOnAll(map) {
        for (var i = 0; i < markerArray.length; i++) {
          markerArray[i].setMap(map);
        }
      }



ConsoleModule.controller('wcontroller', ['$scope', '$http', '$routeParams', '$timeout', '$sce',
    function($scope, $http, $routeParams, $timeout, $sce) {

    $scope.somemessage = "Some weather";
    $scope.zip1City = "";
    $scope.zip1Weather = "";
 
    
    
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
                url: '/api/v1/getWeather?location=' + data
            }).then( function(response) {
                if(which === 1) {               
                    $scope.zip1City = response.data.city;
                    $scope.zip1Weather = response.data.weather;
                    city[0] = response.data.city;
                    latitude[0] = response.data.coord.lat;
                    longitude[0] = response.data.coord.lon; 
                    
                  
                  
                    
                } else if(which === 2) {
                
                    $scope.zip2City = response.data.city;
                    $scope.zip2Weather = response.data.weather;
                    city[1] = response.data.city;
                    latitude[1] = response.data.coord.lat;
                    longitude[1] = response.data.coord.lon; 
                  

                  
                } else if(which === 3) {
                	
                    $scope.zip3City = response.data.city;
                    $scope.zip3Weather = response.data.weather;
                    city[2] = response.data.city;
                    latitude[2] = response.data.coord.lat;
                    longitude[2] = response.data.coord.lon; 
                    
                 
                    
                } else if(which === 4) {
            
                    $scope.zip4City = response.data.city;
                    $scope.zip4Weather = response.data.weather;
                    city[3] = response.data.city;
                    latitude[3] = response.data.coord.lat;
                    longitude[3] = response.data.coord.lon;
                  
                } 
                 putPinsOnMap(city,latitude,longitude);
             

            });  
                 google.maps.event.addListener(map, 'click', function(event) {
                var latitudepin = event.latLng.lat();
                var longitudepin = event.latLng.lng();
                 $http({
                method: "GET",
                url: '/api/v1/getWeathergeo?lat=' + latitudepin + '&lon=' + longitudepin
            }).then( function(response) {
            	var slot = response.data.city;
                if(slot[0] !== null || slot[0] !== undefined) {               
              
					var index = 0;                    
                  
                  
                    
                 if((slot[0] === null) || slot[0] === undefined) {
                        $scope.city1m = response.data.city;
            			$scope.city1 = response.data.coord.lat + ', ' + response.data.coord.lon;
	            		$scope.city1Weather = response.data.weather;
						index = 0;        
       
                  

                  
                } else if(slot[2] === null || slot[2] === undefined) {
  						   $scope.city1m = response.data.city;
            			$scope.city1 = response.data.coord.lat + ', ' + response.data.coord.lon;
	            		$scope.city1Weather = response.data.weather;
						index = 1;  
                    
                 
                    
                 
                     } else if((slot[3] === null) || slot[3] === undefined) {
  
                       $scope.city1m = response.data.city;
            			$scope.city1 = response.data.coord.lat + ', ' + response.data.coord.lon;
	            		$scope.city1Weather = response.data.weather;
						index = 2;  
                 
                    
                } 
                else {
                   $scope.city1m = response.data.city;
            			$scope.city1 = response.data.coord.lat + ', ' + response.data.coord.lon;
	            		$scope.city1Weather = response.data.weather;
						index=3;  
                  
                } 
                city[i]= response.data.city;
                latitude[i] = response.data.coord.lat;
                longitude[i] = response.data.coord.lon; 
             
            }
               putPinsOnMap(city,latitude,longitude);
    });
});
   



}]);
