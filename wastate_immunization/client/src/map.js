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

	// TODO: Change the current schools.json to a changeable parameter that can be taken from the text value of a submit button click event,
		var markers = searchQuery.map(function(school, idx) {
			// Add some markers to the map.
			return new window.google.maps.Marker({
				position: school,
				map: map,
				label: labels[idx % labels.length]
			});
		});
		new MarkerClusterer(map, markers, {imagePath: 'images/m'});
	}

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
