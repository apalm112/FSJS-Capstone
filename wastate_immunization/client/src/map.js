import React, { Component } from 'react';
// import { render } from 'react-dom';
import './App.css';
import MarkerClusterer from '@google/markerclusterer';
// import searchQuery from './100percent.json';

class Map extends Component {
	constructor(props) {
		super(props);
		this.onScriptLoad = this.onScriptLoad.bind(this);
	}

	initMap = (map, gotData) => {
		// Create an array of alphabetical characters used to label the markers.
		var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

		// TODO: Edit the infoWindow so it renders each schools data
		// probably have to modify the routes/ to return the
		// required data.  Right now only coordinates get returned.
		var contentString = '<div id="content">'+
      '<div id="siteNotice">'+
      '</div>'+
      '<h1 id="firstHeading" class="firstHeading">Darmok</h1>'+
      '<div id="bodyContent">'+
      `<p>school_district: ${this.props.schools.school_district}</p>`+
      '<p>And: Jalod, at__Tanagra '+
      '(last visited September 1991).</p>'+
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
		var markers = gotData.map(function(school, idx) {
			// Add some markers to the map.
			var marker = new window.google.maps.Marker({
				// position: school[idx].location_1.coordinates,
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

		const gotData = this.props.schools;

		this.initMap(map, gotData);
	}

	componentDidMount() {
		var gotData = this.props.schools;
		console.log('>>>>>>>>>componentDidMount--MAP.JS::{this.props}', this.props);
		console.log('OVER HERE LEONARDS!: ', gotData);

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

	componentDidUpdate(prevProps) {
		// console.log('////////////: ', this.props.schools[0].location_1.coordinates);
		if (this.props.schools !== prevProps.schools) {
			this.onScriptLoad();
		}
	}
/*	componentDidUpdate(prevProps) {
	// NOT WORKING
		if (this.props.schools !== prevProps.schools) {
			console.log('HOBOS CALLIN componentDidUpdate YO!');
			this.initMap( (this.props.searchQuery));
		}
	}*/

/*	componentDidUpdate() {
     this.map.panTo(new google.maps.LatLng(this.props.lat, this.props.lng));
	 }*/

	/*UNSAFE_componentWillReceiveProps(props) {
		(this.props.state.schools)
		? this.props.onSearch(props.state.schools)
		: this.props.onSearch(props.state.schools)
	}*/




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
