import React, { Component } from 'react';
import Map from './map';
import './App.css';

import MarkerClusterer from '@google/markerclusterer';
import schools from './schools.json';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			maps: []
		}
	}

	createMakerClusterer(event, map) {}

  render() {
		// Create an array of alphabetical characters used to label the markers.
		var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return (
      <div className="App">
        <header className="App-header">
        	<p>You Waht?</p>
					<h5>From:         /Project12/fsjs-capstone-project/wastate_immunization/client/src/App.js</h5>
        </header>
				<Map
					id="myMap"
					options={{
						// center: { lat: 41.0082, lng: 28.9784 },
						center: { lat: 47.3232, lng: -120.3232 },
						zoom: 7
					}}
					initMap={map => {
						// Add some markers to the map.
						var markers = schools.map(function(school, idx) {
							return new window.google.maps.Marker({
							position: school,
							// position: { lat: 41.0082, lng: 28.9784 },
							map: map,
							label: labels[idx % labels.length]
							});
						});
						new MarkerClusterer(map, markers, {imagePath: 'images/m'});
							// {imagePath: 'https://raw.githubusercontent.com/googlemaps/js-marker-clusterer/gh-pages/images/m'});
/*							 RawGit is now in a sunset phase and will soon shut down. It's been a fun five years, but all things must end.  GitHub repositories that served content through RawGit within the last month will continue to be served until at least October of 2019.
							{imagePath: 'https://cdn.rawgit.com/googlemaps/js-marker-clusterer/gh-pages/images/m'});
*/					}}
				/>
      </div>
    );
  }
}
export default App;
