import React, { Component } from 'react';
// import { render } from 'react-dom';
import './App.css';
import MarkerClusterer from '@google/markerclusterer';
import searchQuery from './100percent.json';

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
      `<p>school_district: ${this.props.schools.school_district}</p>`+
      '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
      'https://en.wikipedia.org/w/index.php?title=Uluru</a> '+
      '(last visited June 22, 2009).</p>'+
      '</div>'+
      '</div>';
/* eslint-disable */
		/*	school_district
			school_name
			school_year
			grade_levels
			k_12_enrollment
			location_1: { coordinates	}
			location_1_address
			location_1_city
			reported
			percent_complete_for_all_immunizations
			percent_exempt_for_diphtheria_tetanus
			percent_exempt_for_hepatitisb
			percent_exempt_for_measles_mumps_rubella
			percent_exempt_for_pertussis
			percent_exempt_for_polio
			percent_exempt_for_varicella
			percent_with_any_exemption
			percent_with_medical_exemption
			percent_with_personal_exemption
			percent_with_religious_exemption
			percent_with_religious_membership_exemption*/


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
		console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>MAP.JS::{this.props}', this.props);
		if (!window.google) {
			let createScriptMap = document.createElement('script');
			createScriptMap.type =  'text/javascript';
			createScriptMap.async = true;
			createScriptMap.defer = true;
			createScriptMap.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_MAP_KEY}`;

			document.body.appendChild(createScriptMap);

			// IMPORTANT:: cannot access google.maps until it's finished loading.
			// IDEA: get this code replaced by a function that runs only on state being updated.
			createScriptMap.addEventListener('load', event => {
				this.onScriptLoad();
			})
		}
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.props.state !== prevProps.state) {
			this.onScriptLoad();
		} }// NOT WORKING

	// UNSAFE_componentWillReceiveProps(props) {
	// 	(this.props.state.schools)
	// 	? this.props.onSearch(props.state.schools)
	// 	: this.props.onSearch(props.state.schools)
	// }




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
