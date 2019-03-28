const loadGoogleMaps = (callback) => {
	/*	This function checks the index.html file for the Google Maps script tag
			if it isn't there, then it adds one. Then executes the callback initMap(),
			which is passed to it in the MapContainer component.
	*/
	const existingScript = document.getElementById('googleMaps');

	if (!existingScript) {
		const script = document.createElement('script');
		script.id = 'googleMaps';
		script.type =  'text/javascript';
		script.async = true;
		script.defer = true;
		script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_MAP_KEY}`;

		document.body.appendChild(script);

		script.addEventListener('load', event => {
			if (callback) callback();
		});
	}

	if (existingScript && callback) callback();
};

export default loadGoogleMaps;
