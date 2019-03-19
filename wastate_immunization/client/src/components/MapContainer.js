import React, { Component } from 'react';
import Loading from './Loading';
import MarkerClusterer from '@google/markerclusterer';

class MapContainer extends Component {
	constructor(props) {
		super(props);
		this.onScriptLoad = this.onScriptLoad.bind(this);
	}

	initMap = (map, gotData) => {
		// TODO: map over this.props.schools to add Something fo marker label? Or not?
		// Create an array of alphabetical characters used to label the markers.
		var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

		// TODO: Edit the infoWindow so it renders each schools data
		// probably have to modify the routes/ to return the required data.
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

			//   JSON.stringify(contentString)
	// TODO: Change the current schools.json to a changeable parameter that can be taken from the text value of a submit button click event,
		var markers = gotData.map((school, idx) => {
			// Add some markers to the map.
			var marker = new window.google.maps.Marker({
				// position: school[idx].location_1.coordinates,
				position: { lng: this.props.schools[idx].lng, lat: this.props.schools[idx].lat },
				map: map,
				label: labels[idx % labels.length],
				content:
									'<div id="content">'+
									`<div id="siteNotice"><h2>${this.props.schools[idx].specificRouteData}</h2></div>`+
									`<h3 id="firstHeading" class="firstHeading">School:  ${this.props.schools[idx].name}</h3>`+
									'<div id="bodyContent">'+
									`<h5>Grade Levels: ${this.props.schools[idx].levels}</h5>`+
									`<h5>K-12 Enrollment: ${this.props.schools[idx].k12}</h5>`+
									`<h5>${this.props.schools[idx].address}</h5>`+
									`<h5>City: ${this.props.schools[idx].city}</h5>`+
									`<h5>School District:  ${this.props.schools[idx].district}</h5>`+
									'</div>'+
									'</div>'
			});
			var infowindow = new window.google.maps.InfoWindow({ content: marker.content });

			window.google.maps.event.addListener(marker, 'click', function(event) {
				// infowindow.setContent(content);
				infowindow.open(map, marker);
			});

			google.maps.event.addListener(map, 'click', function(event) {
				infowindow.close();
			});


			return marker;
		});	// End of searchQuery.map()

		new MarkerClusterer(map, markers, {imagePath: 'images/m'});
	}	// End of initMap()

	onScriptLoad(gotData) {
		const map = new window.google.maps.Map(
			document.getElementById('waMap'),
			{	center: { lat: 47.3232, lng: -120.3232 },	zoom: 4	},
			this.initMap);

		// const gotData = this.props.schools;

		this.initMap(map, (gotData=this.props.schools) );
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

/*	componentDidUpdate(prevProps) {
		if (this.props.searchQuery !== prevProps.searchQuery) {
			this.props.handleSchoolQuery(this.props.searchQuery);
		}
	}*/
/*	UNSAFE_componentWillReceiveProps(props) {
		(this.props.searchQuery)
		? this.props.handleSchoolQuery(this.props.searchQuery)
		: this.props.handleSchoolQuery()
	}*/

  render() {

		return (
			<div>
				{ (this.props.isLoading) ? <Loading />
				: <div
					className="map"
					id="waMap"
					>
				</div>
				}
			</div>
			);
  }
}

export default MapContainer;
