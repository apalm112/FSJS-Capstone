import React, { Component } from 'react';
// import { render } from 'react-dom';
import './App.css';

class Map extends Component {
	constructor(props) {
		super(props);
		this.onScriptLoad = this.onScriptLoad.bind(this);
	}

	onScriptLoad() {
		const map = new window.google.maps.Map(
			document.getElementById(this.props.id),
			this.props.options, this.props.initMap);

		this.props.initMap(map);
	}

	componentDidMount() {
		if (!window.google) {
			let createScriptMap = document.createElement('script');
			createScriptMap.type =  'text/javascript';
			createScriptMap.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_MAP_KEY}`;

			let insertScript = document.getElementsByTagName('script')[0];
			insertScript.parentNode.insertBefore(createScriptMap, insertScript);

			// IMPORTANT:: cannot access google.maps until it's finished loading.
			createScriptMap.addEventListener('load', event => {
				this.onScriptLoad();
			})
		} else {
			this.onScriptLoad();
		}
	}

  render() {
    return (
      <div className="App">
				<div className="map" id={this.props.id}></div>
      </div>
    );
  }
}

export default Map;
