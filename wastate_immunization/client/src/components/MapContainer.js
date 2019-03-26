import React, { Component } from 'react';
import loadGoogleMaps from '../modules/load-google-maps';
import MarkerClusterer from '@google/markerclusterer';

class MapContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			searchQuery: '',
			schools: [],
			clusterManager: [],
			map: {},
		};
		this.handleInitMap = this.handleInitMap.bind(this);
		this.handleMarkersCreate = this.handleMarkersCreate.bind(this);
	}

	handleInitMap() {
		const Wenatchee = { lat: 47.3232, lng: -120.3232 };
		const options = {	center: Wenatchee,	zoom: 3	};

		const map = new window.google.maps.Map(	document.getElementById('map'),	options);

		this.setState({ map: map });
		this.handleMarkersCreate(map);
	}

	handleMarkersCreate = (map, schoolData=this.state.schools) => {
		var count = '';
		var getMap = this.state.map;
		var markers = schoolData.map((school, idx) => {
			// Add some markers to the map.
			var marker = new window.google.maps.Marker({
				position: { lng: this.state.schools[idx].lng, lat: this.state.schools[idx].lat },
				map: getMap,
				// Create an array of numbers used to label the markers.
				label: count + [idx],
				content:
									'<div id="content">'+
									`<div id="siteNotice"><h2>${this.state.schools[idx].specificRouteData}</h2></div>`+
									`<h3>${this.state.schools[idx].reported}</h3>`+
									`<h3 id="firstHeading" class="firstHeading">${this.state.schools[idx].name}</h3>`+
									'<div id="bodyContent">'+
									`<h5>Grade Levels: ${this.state.schools[idx].levels}</h5>`+
									`<h5>${this.state.schools[idx].k12}</h5>`+
									`<h5>${this.state.schools[idx].address}</h5>`+
									`<h5>${this.state.schools[idx].city}</h5>`+
									`<h5>${this.state.schools[idx].district}</h5>`+
									'</div>'+
									'</div>',
				// icon: 'images/icon-mapmarker.png'
			});

			var infowindow = new window.google.maps.InfoWindow({ content: marker.content });
			window.google.maps.event.addListener(marker, 'click', function(event) {
				infowindow.open(map, marker);
			});
			window.google.maps.event.addListener(map, 'click', function(event) {
				infowindow.close();
			});
			return marker;
		});	// End of schoolData.map()

		this.handlerMarkerCluster(map, markers);
	}	// End of handleMarkersCreate()

	handlerMarkerCluster = (map, markers) => {
		var clusterManager = new MarkerClusterer(map, markers, {imagePath: '../images/m'})
		this.handleSetMCState(clusterManager);
		var getCM = this.state.clusterManager;
		console.log('The clusterManager: ', getCM);
		// return () => { clusterManager.clearMarkers() }  //<--Not necessary?
	}
	handleSetMCState = (param) => {
			this.setState({ clusterManager: param });
	}

	handleSchoolQuery = (schoolQueryRoute='/') => {
	// This function returns whatever schoolQueryRoute is sent to it.
		fetch(`${schoolQueryRoute}`)
		.then(res => res.json())
		.then(
			schools => this.setState({
				searchQuery: schoolQueryRoute,
				schools: schools,
			}),
			(error) => {
				return error.message;
			})
		console.log(this.state.schools);
	}

	handleClearMarkers = () => {
		var getCM = this.state.clusterManager;
		let clusterNotEmpty = getCM.markers_;
		if (clusterNotEmpty !== undefined) {
			console.log('The clusterManager was cleared: Array Length: ', getCM.markers_.length);
			getCM.clearMarkers();
		}
	}
	handleAddMarkers = () => {
		this.handleClearMarkers();
		var getMap = this.state.map;
		this.handleMarkersCreate(getMap);
		// var getCM = this.state.clusterManager;
		// console.log('Here is STATE.MAP: ', getMap);
		// console.log('The clusterManager was populated, STATE.CLUSTERMANAGER: ', getCM);
	}

	componentDidMount() {
		this.handleSchoolQuery(this.props.schoolQueryRoute);
		loadGoogleMaps(this.handleInitMap);
		// console.log('####componentDidMOUNT--MAP.JS::{this.props}', this.props);
	}

	componentDidUpdate(prevProps) {
		// console.log('$$$$componentDidUPDATE--MAP.JS::{this.props} : {prevProps.schoolQueryRoute}', this.props.schoolQueryRoute, prevProps.schoolQueryRoute);

		if (this.props.schoolQueryRoute !== prevProps.schoolQueryRoute) {
			this.handleSchoolQuery(this.props.schoolQueryRoute)
			console.log('componentDidUpdate, this.handleSchoolQuery() executed');
			setTimeout(this.handleAddMarkers, 1500);
		}
		//				: this.handleSchoolQuery(this.props.match.params.schoolQueryRoute)
	}

  render() {
		return (
			<div>
				<h3>Displaying Markers for the Route: {this.state.searchQuery}</h3>
				<div id="map"></div>
			</div>
		);
  }
}

export default MapContainer;
