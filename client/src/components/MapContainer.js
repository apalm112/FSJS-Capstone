import React, { Component } from 'react';
import loadGoogleMaps from '../modules/load-google-maps';
import MarkerClusterer from '@google/markerclusterer';
import MapNavBar from './MapNavBar';

class MapContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: false,
			schools: [],
			clusterManager: [],
			map: {},
		};
		this.handleInitMap = this.handleInitMap.bind(this);
		this.handleMarkersCreate = this.handleMarkersCreate.bind(this);
	}

	// Creates a new Google map & adds it the state object.
	handleInitMap() {
		const Wenatchee = { lat: 47.3232, lng: -120.3232 };
		const options = {	center: Wenatchee,	zoom: 7, gestureHandling: 'greedy'	};

		const map = new window.google.maps.Map(	document.getElementById('map'),	options);

		this.setState({ map });
		this.handleMarkersCreate(map);
	}

	// Creates markers & InfoWindows for the data passed in.
	handleMarkersCreate = (map, schoolData=this.state.schools) => {
		var getMap = this.state.map;
		var markers = schoolData.map((school, idx) => {
			// Add the markers to the map.
			var marker = new window.google.maps.Marker({
				position: { lng: this.state.schools[idx].lng, lat: this.state.schools[idx].lat },
				map: getMap,
				content:
									'<div class="content">'+
									`<div><h5>${this.state.schools[idx].specificRouteData}</h5></div>`+
									`<h5>${this.state.schools[idx].reported}</h5>`+
									`<h5>${this.state.schools[idx].name}</h5>`+
									'<div>'+
									`<h6>Grade Levels:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ${this.state.schools[idx].levels}</h6>`+
									`<h6>K-12 Enrollment:&nbsp;&nbsp;&nbsp;&nbsp; ${this.state.schools[idx].k12}</h6>`+
									`<h6>${this.state.schools[idx].address},&nbsp; ${this.state.schools[idx].city}</h6>`+
									`<h6>${this.state.schools[idx].district}</h6>`+
									'</div>'+
									'</div>',
				icon: `https://maps.google.com/mapfiles/ms/icons/green-dot.png`
			});
			var infowindow = new window.google.maps.InfoWindow({ content: marker.content });
			window.google.maps.event.addListener(marker, 'click', function(event) {
				infowindow.open(map, marker);
			});
			window.google.maps.event.addListener(map, 'click', function(event) {
				infowindow.close();
			});
			return marker;
		});
		this.handlerMarkerCluster(map, markers);
	}

	// Create the Google MarkerClusterer for the map.
	handlerMarkerCluster = (map, markers) => {
		var clusterManager = new MarkerClusterer(map, markers, {imagePath: '../images/m'})
		this.handleSetMCState(clusterManager);
		var getCM = this.state.clusterManager;
		if (getCM.length) {
			getCM.redraw();
		}
	}

	// Update the MarkerClusterer state & loading value.
	handleSetMCState = (param) => {
		let isLoading = this.state.isLoading;
			this.setState({ clusterManager: param });
			this.toggleIsLoading(isLoading);
	}

	// Zooms the map out on route change if needed.
	handleMapSetZoom = () => {
		var getCM = this.state.clusterManager;
		getCM.minClusterSize_ = 5;
		var prevZoom = getCM.prevZoom_;
		if (prevZoom > 7) {
			getCM.fitMapToMarkers();
		}
	}

	// Removes the markers from the map.
	handleClearMarkers = () => {
		var getCM = this.state.clusterManager;
		let clusterNotEmpty = getCM.markers_;
		if (clusterNotEmpty.length) {
			getCM.clearMarkers();
		}
	}

	// Adds markers to the map.
	handleAddMarkers = () => {
		var getMap = this.state.map;
		this.handleClearMarkers();
		this.handleMarkersCreate(getMap);
	}

	// Switch the loading state for the Bootstrap loading spinner buttons.
	toggleIsLoading = (isLoading) => {
		if (isLoading) {
			this.setState({ isLoading: false });
		} else {
			this.setState({ isLoading: true });
		}
	}

	// On page load adds the Google map & MarkerClusterer.
	async componentDidMount() {
		try {
			await loadGoogleMaps(this.handleInitMap);
			const res = await fetch(this.props.schoolQueryRoute)
			const schools = await res.json()
			this.setState({ schools })
			this.handleAddMarkers();
		} catch(err) {
			console.error(err);
		}
	}

	// On route change updates the MarkerClusterer state.
	async componentDidUpdate(prevProps) {
	this.handleMapSetZoom();
	let isLoading = this.state.isLoading;
		try {
			if (this.props.schoolQueryRoute !== prevProps.schoolQueryRoute) {
				this.toggleIsLoading(isLoading);
				const res = await fetch(this.props.schoolQueryRoute)
				const schools = await res.json()
				this.setState({ schools })
				this.handleAddMarkers();
			}
		} catch(err) {
				console.error(err);
		}
	}

  render() {
		const isLoading = this.state.isLoading;
		const currentRoute = this.props.schoolQueryRoute;
		const schoolNum = this.state.schools.length;
		return (
			<div>
				<MapNavBar loading={isLoading} />
				<h5 className="center">Showing Schools for: {currentRoute}</h5>
				<h5 className="center">Number of schools: {schoolNum}</h5>
				<div id="map"></div>
				<ul>
					<li><a href="https://www.github.com/apalm112/FSJS-Capstone" target="_blank" rel="noopener noreferrer"><i className="fa fa-github"></i></a></li>
					<li><a href="https://www.linkedin.com/in/adapalmer" target="_blank" rel="noopener noreferrer"><i className="fa fa-linkedin"></i></a></li>
				</ul>
			</div>
		);
  }
}

export default MapContainer;
