import React, { Component } from 'react';
import loadGoogleMaps from '../modules/load-google-maps';
import Loading from './Loading';
import MarkerClusterer from '@google/markerclusterer';

class MapContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: false,
			markers: [],
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
		const options = {	center: Wenatchee,	zoom: 6	};

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
			this.setState({	markers: markers });

			var infowindow = new window.google.maps.InfoWindow({ content: marker.content });
			window.google.maps.event.addListener(marker, 'click', function(event) {
				infowindow.open(map, marker);
			});
			window.google.maps.event.addListener(map, 'click', function(event) {
				infowindow.close();
			});
			return marker;
		});	// End of schoolData.map()

		this.newMarkerClustererCreateHandler(map, markers);
   // var markerCluster = new MarkerClusterer(map, markers, {imagePath: 'images/m'});
	}	// End of handleMarkersCreate()

	newMarkerClustererCreateHandler = (map, markers) => {
		this.setState({ clusterManager: new MarkerClusterer(map, markers, {imagePath: '../images/m'})
		});
	}

	handleSchoolQuery = (schoolQueryRoute='/school/all') => {
	// This function returns whatever schoolQueryRoute is sent to it.
	this.setState({ isLoading: !this.state.isLoading });
		fetch(`${schoolQueryRoute}`)
		.then(res => res.json())
		.then(
			schools => this.setState({
				isLoading: !this.state.isLoading,
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
		console.log('The link was clicked: ', getCM);
	}
	handleAddMarkers = () => {
		var getCM = this.state.clusterManager;
		var getMap = this.state.map;
		// getCM.getMarkers();
		// loadGoogleMaps(this.handleInitMap);
		this.handleMarkersCreate(getMap);
		console.log(this.props.schoolQueryRoute);
		console.log('The link was clicked: ', getCM);
		console.log('Here is STATE.MARKERS: ', this.state.map);
		console.log('Here is STATE.MAP: ', this.state.map);
	}

	componentDidMount() {
		loadGoogleMaps(this.handleInitMap);
		console.log('#######componentDidMOUNT--MAP.JS::{this.props}', this.props);
	}

	componentDidUpdate(prevProps) {
		// console.log('#######componentDidUPDATE--MAP.JS::{this.props}', this.props);
		// const map = document.getElementById('map');
		// this.handleMarkersCreate(map);
/*		this.handleMarkersCreate()
			.then(this.newInfoWindowCreateHandler)
			.then(this.newMarkerClustererCreateHandler)
			.catch((err) => {
				console.error(err);
			});
*/
	}
	UNSAFE_componentWillReceiveProps(props) {
		(props.schoolQueryRoute)
		? this.handleSchoolQuery(props.schoolQueryRoute)
		: this.handleSchoolQuery(props.match.params.schoolQueryRoute)
	}

  render() {
				// <input onClick={this.handleClearMarkers} onLoadStart={this.handleInitMap} type="button" value="Clear Markers From Map" />
		return (
			<div>
				{ (this.state.isLoading) ? <Loading />
				: '' }
				<div id="map"></div>
				<div id="floating-panel">
					<input onClick={this.handleClearMarkers} type="button" value="Clear Markers From Map" />
					<input onClick={this.handleAddMarkers} type="button" value="Add Markers To Map" />
				</div>
			</div>
					);

	/*	if (this.props.state.googleMapsReady) {
			return (
				<Loading />
			);
		} else {
			// return ( null );
			return ();
		}*/
  }
}

export default MapContainer;
