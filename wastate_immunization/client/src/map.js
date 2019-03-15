import React, { Component } from 'react';
// import { render } from 'react-dom';
import './App.css';
import MarkerClusterer from '@google/markerclusterer';
import searchQuery from './allSchools.json';

class Map extends Component {
	constructor(props) {
		super(props);
		this.onScriptLoad = this.onScriptLoad.bind(this);
	}

	initMap = (map, searchQuery) => {
		// Create an array of alphabetical characters used to label the markers.
		var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

		var contentString = '<div id="content">'+
      '<div id="siteNotice">'+
      '</div>'+
      '<h1 id="firstHeading" class="firstHeading">Uluru</h1>'+
      '<div id="bodyContent">'+
      '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
      'sandstone rock formation in the southern part of the '+
      'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) '+
      'south west of the nearest large town, Alice Springs; 450&#160;km '+
      '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major '+
      'features of the Uluru - Kata Tjuta National Park. Uluru is '+
      'sacred to the Pitjantjatjara and Yankunytjatjara, the '+
      'Aboriginal people of the area. It has many springs, waterholes, '+
      'rock caves and ancient paintings. Uluru is listed as a World '+
      'Heritage Site.</p>'+
      '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
      'https://en.wikipedia.org/w/index.php?title=Uluru</a> '+
      '(last visited June 22, 2009).</p>'+
      '</div>'+
      '</div>';

			var infowindow = new window.google.maps.InfoWindow({ content: contentString });

	// TODO: Change the current schools.json to a changeable parameter that can be taken from the text value of a submit button click event,
		var markers = searchQuery.map(function(school, idx) {
			// Add some markers to the map.
			var marker = new window.google.maps.Marker({
				position: school,
				map: map,
				label: labels[idx % labels.length]
			});
			window.google.maps.event.addListener(marker, 'click', function(event) {
				// infowindow.setContent(content);
				infowindow.open(map, marker);
			});
			return marker;
		});	// End of searchQuery.map()
		new MarkerClusterer(map, markers, {imagePath: 'images/m'});
	}	// End of initMap()

	onScriptLoad() {
		const map = new window.google.maps.Map(
			document.getElementById('waMap'),
			{	center: { lat: 47.3232, lng: -120.3232 },	zoom: 4	},
			this.initMap);

		this.initMap(map, searchQuery);
	}

	componentDidMount() {
		if (!window.google) {
			let createScriptMap = document.createElement('script');
			createScriptMap.type =  'text/javascript';
			createScriptMap.async = true;
			createScriptMap.defer = true;
			createScriptMap.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_MAP_KEY}`;

			document.body.appendChild(createScriptMap);

			// IMPORTANT:: cannot access google.maps until it's finished loading.
			createScriptMap.addEventListener('load', event => {
				this.onScriptLoad();
			})
		}
	}

  render() {
    return (
			<div
				className="map"
				id="waMap"
			>
			</div>
    );
  }
}

export default Map;
