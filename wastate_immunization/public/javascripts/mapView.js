// Pass in to the IIFE a module, upon which objects can be attached for later access.
(function(module) {
	// Configure a view object, to hold all our functions for dynamic updates and article-related event handlers.
  var mapView = {};

	mapView.initMap = function(dataPassedIn) {
		console.log('+++++++++++++++++++++++++++++++++++++++++++++++++');
			latLngWA = { lat: 47.3232, lng: -120.3232 };
			var map = new google.maps.Map(document.getElementById('map'), {
				center: latLngWA,
			zoom: 6
			});
			var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
			var markers = dataPassedIn.map(function(school, idx) {
				return new google.maps.Marker({
					position: school,
					label: labels[idx % labels.length]
				});
			});
			var markerCluster = new MarkerClusterer(map, markers,
				{imagePath: '../images/m'});
	};

	mapView.getAll = function(next) {
		  $.getJSON('../../database/schools.json', function(responseData) {
		    localStorage.hackerIpsum = JSON.stringify(responseData);
				mapView.initMap(responseData);
		  });
		};

	// console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>THIS', this);
	/* Works!  'this' throws no errors on run time.  As 'this' does reference
		the actual window object of the browser!	*/
	module.mapView = mapView;
})(this);
