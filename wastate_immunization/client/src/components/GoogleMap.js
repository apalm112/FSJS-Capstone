import React, { Component } from 'react';
import Loading from './Loading';
import loadGoogleMaps from '../modules/load-google-maps';

class GoogleMap extends Component {
	constructor(props) {
		super(props);
		this.state = { googleMapsReady: false };
		this.initMap = this.initMap.bind(this);
	}

	initMap() {
		const Wenatchee = { lat: 47.3232, lng: -120.3232 };
		const map = new window.google.maps.Map(
			document.getElementById('map'),
			{	center: Wenatchee,	zoom: 6	});
			return map;
	}


	componentDidMount() {
		loadGoogleMaps((initMap) => {
			// work to do after teh library loads
			this.setState({ googleMapsReady: true });
		});
	}

  render() {
		// {this.state.googleMapsReady ? <GoogleMap /> : ''}
		if (!this.state.googleMapsReady) {
			return (
				<Loading />
			);
		} else {
			// return ( null );
			return (
				<div className="map-component">
					<div id="floating-panel">
						<input  type="button" value="Clear Markers From Map" />
					</div>
				</div>
			);
		}
	}
}

export default GoogleMap;
