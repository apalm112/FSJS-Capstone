const loadGoogleMaps = (callback) => {
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
