import React, { Component } from 'react';
import loadGoogleMaps from '../modules/load-google-maps';
import MarkerClusterer from '@google/markerclusterer';

class MapContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			addButtonEnabled: false,
			clearButtonEnabled: true,
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
		this.setState({ clusterManager: clusterManager });
		var getCM = this.state.clusterManager;
		console.log('99999999', getCM);
		return () => { clusterManager.clearMarkers() }
	}

	handleSchoolQuery = (schoolQueryRoute) => {
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

	handleClick = () => {
		var getCM = this.state.clusterManager;
		// this.setState({ clusterManager: null });
		getCM.clearMarkers();
		console.log('The link was clicked: ', getCM);
	}
	handleClearMarkers = () => {
		var getCM = this.state.clusterManager;
		// this.setState({ clusterManager: null });
		getCM.clearMarkers();
		console.log('The clusterManager was cleared: ', getCM);
	}
	handleAddMarkers = () => {
		var getMap = this.state.map;
		var getCM = this.state.clusterManager;
		this.handleMarkersCreate(getMap);
		// console.log('Here is STATE.MAP: ', getMap);
		console.log('The clusterManager was populated, STATE.CLUSTERMANAGER: ', getCM);
	}
	handleToggle = () => {
		// var addButton = document.getElementById('add-markers');
		// var clearButton = document.getElementById('clear-markers')
		this.setState({
			addButtonEnabled: !this.state.addButtonEnabled,
			clearButtonEnabled: !this.state.clearButtonEnabled
		});
		console.log('hobos');
	}

	componentDidMount() {
		loadGoogleMaps(this.handleInitMap);
		this.handleSchoolQuery(this.props.schoolQueryRoute);
		// var getMap = this.state.map;
		// this.handleMarkersCreate(getMap);
		console.log('####componentDidMOUNT--MAP.JS::{this.props}', this.props);
	}

	componentDidUpdate(prevProps) {
		// var getMap = this.state.map;
		console.log('$$$$componentDidUPDATE--MAP.JS::{this.props} : {prevProps.schoolQueryRoute}', this.props.schoolQueryRoute, prevProps.schoolQueryRoute);

		if (this.props.schoolQueryRoute !== prevProps.schoolQueryRoute) {
			this.handleSchoolQuery(this.props.schoolQueryRoute)
			// this.handleMarkersCreate(getMap);
			console.log('else clause from compdodidupdate, props & prevProps NOT Equal');
		} else {
			console.log('nothing happened, props & prevProps are Equal');
		}
		//				: this.handleSchoolQuery(this.props.match.params.schoolQueryRoute)
	}

  render() {
				// <input onClick={this.handleClearMarkers} onLoadStart={this.handleInitMap} type="button" value="Clear Markers From Map" />
		return (
			<div>
				<div id="map"></div>
				<form className="form-inline my-2 my-lg-0" id="floating-panel">
					<input id="add-markers" onMouseUp={this.handleAddMarkers} onClick={this.handleToggle} disabled={this.state.addButtonEnabled} type="button" value="Add Markers To Map"/>
					<input id="clear-markers" onMouseUp={this.handleClearMarkers} onClick={this.handleToggle} disabled={this.state.clearButtonEnabled} type="button" value="Clear Markers From Map"/>

					<input className="btn btn-outline-success my-2 my-sm-0" type="button" onMouseUp={this.handleClearMarkers} onClick={this.handleToggle} disabled={this.state.clearButtonEnabled}  value="Clear Markers From Map"/>
					<input className="btn btn-outline-success my-2 my-sm-0" type="button" onMouseUp={this.handleAddMarkers} onClick={this.handleToggle} disabled={this.state.addButtonEnabled} value="Add Markers To Map"/>
				</form>
			</div>
		);
  }
}

export default MapContainer;
