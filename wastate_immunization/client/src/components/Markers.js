import React, { Component } from 'react';
import Loading from './Loading';
import MarkerClusterer from '@google/markerclusterer';

class Markers extends Component {
	constructor(props) {
		super(props);
		this.state = {
			you: 'What?!',
		};
	}

	newMarkersCreateHandler = (map, schoolData=this.props.schools) => {
		// TODO: map over this.props.schools to add Something fo marker label? Or not?
		// Create an array of alphabetical characters used to label the markers.
		var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

		var markers = schoolData.map((school, idx) => {
			// Add some markers to the map.
			var marker = new window.google.maps.Marker({
				position: { lng: this.props.schools[idx].lng, lat: this.props.schools[idx].lat },
				map: map,
				label: labels[idx % labels.length],
				content:
									'<div id="content">'+
									`<div id="siteNotice"><h2>${this.props.schools[idx].specificRouteData}</h2></div>`+
									`<h3>${this.props.schools[idx].reported}</h3>`+
									`<h3 id="firstHeading" class="firstHeading">${this.props.schools[idx].name}</h3>`+
									'<div id="bodyContent">'+
									`<h5>Grade Levels: ${this.props.schools[idx].levels}</h5>`+
									`<h5>${this.props.schools[idx].k12}</h5>`+
									`<h5>${this.props.schools[idx].address}</h5>`+
									`<h5>${this.props.schools[idx].city}</h5>`+
									`<h5>${this.props.schools[idx].district}</h5>`+
									'</div>'+
									'</div>'
			});
			var infowindow = new window.google.maps.InfoWindow({ content: marker.content });

			window.google.maps.event.addListener(marker, 'click', function(event) {
				// infowindow.setContent(content);
				infowindow.open(map, marker);
			});

			window.google.maps.event.addListener(map, 'click', function(event) {
				infowindow.close();
			});

			return marker;
			// this.newMarkerClustererCreateHandler(map, markers);
		});	// End of newMarkersCreateHandler()

   var markerCluster = new MarkerClusterer(map, markers, {imagePath: 'images/m'});
		// markerCluster.clearMarkers();
		// markerCluster.addMarkers(markers, true);
		return markerCluster;
	}	// End of initMap()

	componentDidMount() {
		this.newMarkersCreateHandler();
	}

	componentDidUpdate(prevProps) {
		// console.log('#######componentDidUPDATE--MAP.JS::{this.props}', this.props);

		// if (this.props.searchQuery !== prevProps.searchQuery) {
		// 	this.props.handleSchoolQuery(this.props.searchQuery);
		// 	// this.markerCluster.clearMarkers();
		// 	// this.newMarkersCreateHandler();
		// 	// this.markerCluster.addMarkers(markers, true);
		// }
	}

  render() {

		if (this.props.isLoading) {
			return (
				<Loading />
			);
		} else {
			// return ( null );
			return (
				<div id="floating-panel">
					<input onClick={this.handleClick} type="button" value="Clear Markers From Map" />

				</div>
			);
		}
  }
}

export default Markers;
