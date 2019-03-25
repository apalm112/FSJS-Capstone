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
		// console.log('The link was clicked: ', getCM);
	}
	handleClearMarkers = () => {
		var getCM = this.state.clusterManager;
		let clusterNotEmpty = getCM.markers_.length;
		if (clusterNotEmpty) {
			console.log('The clusterManager was cleared: Array Length: ', getCM.markers_.length);
			getCM.clearMarkers();
		}
	}
	handleAddMarkers = () => {
		var getMap = this.state.map;
		this.handleMarkersCreate(getMap);
		// var getCM = this.state.clusterManager;
		// console.log('Here is STATE.MAP: ', getMap);
		// console.log('The clusterManager was populated, STATE.CLUSTERMANAGER: ', getCM);
	}
	handleToggle = () => {
		this.setState(prevState => ({
			addButtonEnabled: !prevState.addButtonEnabled,
			clearButtonEnabled: !prevState.clearButtonEnabled
		}));
	}

	componentDidMount() {
		loadGoogleMaps(this.handleInitMap);
		this.handleSchoolQuery(this.props.schoolQueryRoute);
		// console.log('####componentDidMOUNT--MAP.JS::{this.props}', this.props);
	}

	componentDidUpdate(prevProps) {
		// console.log('$$$$componentDidUPDATE--MAP.JS::{this.props} : {prevProps.schoolQueryRoute}', this.props.schoolQueryRoute, prevProps.schoolQueryRoute);

		if (this.props.schoolQueryRoute !== prevProps.schoolQueryRoute) {
			this.handleSchoolQuery(this.props.schoolQueryRoute)
			console.log('componentDidUpdate, this.handleSchoolQuery() executed');
		} else {
			// console.log('nothing happened, props & prevProps are Equal');
		}
		//				: this.handleSchoolQuery(this.props.match.params.schoolQueryRoute)
	}

  render() {
		// onClick={this.handleToggle}
		// onClick={this.handleToggle}
				// <input onClick={this.handleClearMarkers} onLoadStart={this.handleInitMap} type="button" value="Clear Markers From Map" />
		return (
			<div>
				<h3>Displaying Markers for Schools with: {this.state.searchQuery}</h3>
				<div className="marker-buttons">
					<svg className="vg-two" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
						viewBox="0 0 496.158 496.158" style={{"enable-background": "new 0 0 496.158 496.158"}}>
						<path style={{"fill": "#56B48C"}} d="M248.082,0.003C111.07,0.003,0,111.061,0,248.085c0,137,111.07,248.07,248.082,248.07
						c137.006,0,248.076-111.07,248.076-248.07C496.158,111.061,385.088,0.003,248.082,0.003z"/>
						<path style={{"fill": "#FFFFFF"}} d="M319.783,325.595c-4.005-3.124-9.814-4.688-17.432-4.688h-76.465c2.44-3.71,4.834-6.885,7.178-9.521
							c5.468-6.64,15.55-15.967,30.249-27.979c14.696-12.012,25.17-20.824,31.421-26.44c6.249-5.614,12.378-13.378,18.384-23.291
							c6.006-9.911,9.009-20.922,9.009-33.032c0-7.713-1.442-15.161-4.321-22.339c-2.882-7.178-6.91-13.5-12.085-18.97
							c-5.177-5.468-11.183-9.764-18.018-12.891c-10.547-4.688-23.291-7.031-38.232-7.031c-12.403,0-23.218,1.831-32.446,5.493
							s-16.846,8.473-22.852,14.429c-6.006,5.958-10.524,12.598-13.55,19.922c-3.028,7.324-4.541,14.355-4.541,21.094
							c0,5.566,1.611,9.961,4.834,13.184s7.274,4.834,12.158,4.834c5.566,0,9.789-1.758,12.671-5.273
							c2.879-3.516,5.468-8.544,7.764-15.088c2.293-6.542,3.93-10.547,4.907-12.012c7.324-11.229,17.381-16.846,30.176-16.846
							c6.054,0,11.646,1.369,16.772,4.102c5.127,2.735,9.178,6.569,12.158,11.499c2.978,4.933,4.468,10.524,4.468,16.772
							c0,5.763-1.392,11.646-4.175,17.651s-6.837,11.865-12.158,17.578c-5.324,5.713-11.989,11.403-19.995,17.065
							c-4.493,3.028-11.964,9.352-22.412,18.97c-10.451,9.62-22.169,21.167-35.156,34.644c-3.126,3.321-6.006,7.887-8.643,13.696
							c-2.637,5.812-3.955,10.474-3.955,13.989c0,5.47,2.051,10.231,6.152,14.282c4.102,4.054,9.814,6.079,17.139,6.079H306.6
						c6.445,0,11.254-1.659,14.429-4.98c3.172-3.319,4.761-7.372,4.761-12.158C325.789,332.97,323.786,328.722,319.783,325.595z"/>
					</svg>

					<input className="btn btn-outline-success add" type="button" onMouseUp={this.handleAddMarkers} onClick={this.handleToggle}
						onClick={this.handleToggle} disabled={this.state.addButtonEnabled} value="Add Markers To Map"/>
					<input className="btn btn-outline-success" type="button" onMouseUp={this.handleClearMarkers} onClick={this.handleToggle}
						onClick={this.handleToggle} disabled={this.state.clearButtonEnabled}  value="Clear Markers"/>

					<svg className="vg-three" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
						viewBox="0 0 496.158 496.158" style={{"enableBackground": "new 0 0 496.158 496.158"}}>
						<path style={{"fill": "#56B48C"}} d="M248.082,0.003C111.07,0.003,0,111.061,0,248.085c0,137,111.07,248.07,248.082,248.07
						c137.006,0,248.076-111.07,248.076-248.07C496.158,111.061,385.088,0.003,248.082,0.003z"/>
						<path style={{"fill": "#FFFFFF"}} d="M319.637,269.711c-2.637-6.395-6.569-12.231-11.792-17.505c-5.226-5.273-11.646-9.961-19.263-14.063
							c7.91-6.64,13.989-13.451,18.237-20.435c4.248-6.981,6.372-15.355,6.372-25.122c0-7.42-1.465-14.355-4.395-20.801
							s-7.276-12.108-13.037-16.992c-5.763-4.882-12.55-8.617-20.361-11.206c-7.814-2.586-16.457-3.882-25.928-3.882
							c-10.84,0-20.654,1.538-29.443,4.614s-16.139,7.155-22.046,12.231c-5.91,5.079-10.4,10.426-13.477,16.04
							c-3.076,5.617-4.614,10.963-4.614,16.04c0,5.273,1.634,9.499,4.907,12.671c3.271,3.175,6.859,4.761,10.767,4.761
							c3.319,0,6.249-0.586,8.789-1.758c2.538-1.172,4.296-2.783,5.273-4.834c1.659-3.809,3.49-7.86,5.493-12.158
							c2-4.296,4.125-7.812,6.372-10.547c2.245-2.733,5.296-4.93,9.155-6.592c3.856-1.659,8.764-2.49,14.722-2.49
							c8.789,0,15.77,2.71,20.947,8.13c5.175,5.42,7.764,11.891,7.764,19.409c0,9.865-3.248,17.432-9.741,22.705
							c-6.496,5.273-14.234,7.91-23.218,7.91h-6.006c-6.935,0-12.158,1.442-15.674,4.321c-3.516,2.882-5.273,6.665-5.273,11.353
							c0,4.786,1.465,8.521,4.395,11.206c2.93,2.687,7.079,4.028,12.451,4.028c1.172,0,3.809-0.194,7.91-0.586
							c4.102-0.389,7.127-0.586,9.082-0.586c11.133,0,19.823,3.248,26.074,9.741c6.249,6.496,9.375,15.454,9.375,26.88
							c0,7.716-1.831,14.502-5.493,20.361s-8.302,10.279-13.916,13.257c-5.617,2.98-11.451,4.468-17.505,4.468
							c-10.547,0-18.727-3.296-24.536-9.888c-5.812-6.592-11.256-16.674-16.333-30.249c-0.783-2.245-2.442-4.175-4.98-5.786
							c-2.541-1.611-5.177-2.417-7.91-2.417c-5.47,0-10.034,1.735-13.696,5.2c-3.662,3.468-5.493,8.034-5.493,13.696
							c0,4.395,1.538,9.961,4.614,16.699s7.617,13.257,13.623,19.556s13.646,11.549,22.925,15.747c9.276,4.198,19.775,6.299,31.494,6.299
							c11.522,0,22.046-1.831,31.567-5.493s17.748-8.739,24.683-15.234c6.933-6.493,12.181-13.891,15.747-22.192
						c3.563-8.299,5.347-16.894,5.347-25.781C323.592,283.018,322.273,276.109,319.637,269.711z"/>
					</svg>
				</div>
				<hr></hr>
				<div id="map"></div>
			</div>
		);
  }
}

export default MapContainer;
