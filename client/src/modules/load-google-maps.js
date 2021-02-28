const loadGoogleMaps = (callback) => {
	/*	This function checks the index.html file for the Google Maps script tag
			if it isn't there, then it adds one. Then executes the callback initMap(),
			which is passed to it in the MapContainer component.

			Source:  https://cleverbeagle.com/blog/articles/tutorial-how-to-load-third-party-scripts-dynamically-in-javascript
	*/
	const existingScript = document.getElementById('googleMaps');

	if (!existingScript) {
		const script = document.createElement('script');
		script.async = true;
		script.defer = true;
		script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_MAP_KEY}`;
		script.type =  'text/javascript';
		script.id = 'googleMaps';

		document.body.appendChild(script);

		script.addEventListener('load', event => {
			if (callback) callback();
		});
	}

	if (existingScript && callback) callback();
};

export default loadGoogleMaps;
