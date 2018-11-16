# gatsby-starter-hello-world
Starter with the bare essentials needed for a [Gatsby](https://www.gatsbyjs.org/) site.

Install this starter (assuming Gatsby is installed) by running from your CLI:
```
gatsby new gatsby-site https://github.com/gatsbyjs/gatsby-starter-hello-world
```

Or [view the live demo here](https://gatsby-starter-hello-world-demo.netlify.com/).

## Running in development
`gatsby develop`

## My Comments:

* Any React component defined in src/pages/\*.js will automatically become a page.

### Deploy Yo Gatsby Project

* CLI: 	`gatsby build`

* To install a plugin, there are two steps. First, you install the plugin’s NPM package and second, you add the plugin to your site’s gatsby-config.js.

* Next, in your code editor, create a file at the root of your project folder named gatsby-config.js. This is where you add plugins along with other site configuration.

Copy the following into gatsby-config.js
```
gatsby-config.js
module.exports = {
  plugins: [`gatsby-plugin-typography`],
}
```
Gatsby reads the site’s config file when starting.

* **Note that if you use gatsby-plugin-typography with the default starter, you’ll need to delete the default layout.css used by that starter as it overrides the Typography.js CSS**

*

## NASA API


Your API key for apalm112@protonmail.com is:

FTn2P1g5bTSNIUmegVy8mxeO97XB8Uj9vCle4ahZ
You can start using this key to make web service requests. Simply pass your key in the URL when making a web request. Here's an example:

https://api.nasa.gov/planetary/apod?api_key=FTn2P1g5bTSNIUmegVy8mxeO97XB8Uj9vCle4ahZ
For additional support, please contact us. When contacting us, please tell us what API you're accessing and provide the following account details so we can quickly find you:

Account Email: apalm112@protonmail.com
Account ID: db2b62e6-0f2b-4a03-8a02-f1dff3d6865a

#### Use For Neo-Feed

Neo - Feed
Retrieve a list of Asteroids based on their closest approach date to Earth. GET https://api.nasa.gov/neo/rest/v1/feed?start_date=START_DATE&end_date=END_DATE&api_key=API_KEY

QUERY PARAMETERS
Parameter	Type	Default	Description
start_date	YYYY-MM-DD	none	Starting date for asteroid search
end_date	YYYY-MM-DD	7 days after start_date	Ending date for asteroid search
api_key	string	DEMO_KEY	api.nasa.gov key for expanded usage
EXAMPLE QUERY
https://api.nasa.gov/neo/rest/v1/feed?start_date=2015-09-07&end_date=2015-09-08&api_key=DEMO_KEY

* `is_potentially_hazardous_asteroid: true`

* `close_approach_data:`

* `near_earth_objects: [
		close_approach_data: [

		]
]`

* Data Schema returned:
```json
{
"links": {
"self": "https://api.nasa.gov/neo/rest/v1/neo/3092123?api_key=DEMO_KEY"
},
"neo_reference_id": "3092123",
"name": "(1994 GK)",
"designation": "1994 GK",
"nasa_jpl_url": "http://ssd.jpl.nasa.gov/sbdb.cgi?sstr=3092123",
"absolute_magnitude_h": 24.2,
"estimated_diameter": {
"kilometers": {
"estimated_diameter_min": 0.0384197891,
"estimated_diameter_max": 0.0859092601
},
"meters": {
"estimated_diameter_min": 38.4197891064,
"estimated_diameter_max": 85.9092601232
},
"miles": {
"estimated_diameter_min": 0.0238729428,
"estimated_diameter_max": 0.0533815229
},
"feet": {
"estimated_diameter_min": 126.0491808919,
"estimated_diameter_max": 281.8545369825
}
},
"is_potentially_hazardous_asteroid": false,
"close_approach_data": [
{
"close_approach_date": "1994-04-05",
"epoch_date_close_approach": 765529200000,
"relative_velocity": {
"kilometers_per_second": "15.6304178597",
"kilometers_per_hour": "56269.50429487",
"miles_per_hour": "34963.6817103318"
},
"miss_distance": {
"astronomical": "0.0222743416",
"lunar": "8.6647186279",
"kilometers": "3332194",
"miles": "2070529.375"
},
"orbiting_body": "Earth"
}
],
"orbital_data": {
"orbit_id": "12",
"orbit_determination_date": "2017-04-06 09:18:16",
"first_observation_date": "1994-04-07",
"last_observation_date": "1994-04-10",
"data_arc_in_days": 3,
"observations_used": 11,
"orbit_uncertainty": "8",
"minimum_orbit_intersection": ".00299328",
"jupiter_tisserand_invariant": "3.657",
"epoch_osculation": "2449451.5",
"eccentricity": ".6008315940265806",
"semi_major_axis": "1.936697818428041",
"inclination": "5.630593694109096",
"ascending_node_longitude": "15.39416320569674",
"orbital_period": "984.4444658536413",
"perihelion_distance": ".7730685810341199",
"perihelion_argument": "111.5061117463358",
"aphelion_distance": "3.100327055821962",
"perihelion_time": "2449403.695258597501",
"mean_anomaly": "17.48164320267328",
"mean_motion": ".3656884796318431",
"equinox": "J2000",
"orbit_class": {
"orbit_class_type": "APO",
"orbit_class_range": "a (semi-major axis) > 1.0 AU; q (perihelion) < 1.017 AU",
"orbit_class_description": "Near-Earth asteroid orbits which cross the Earth’s orbit similar to that of 1862 Apollo"
}
},
"is_sentry_object": true,
"sentry_data": "https://api.nasa.gov/neo/rest/v1/neo/sentry/3092123?api_key=DEMO_KEY"
}
```

* `is_sentry_object: true`  <-- Loads new data! ANd page, is Cool!
```json
{
	"links":
	{
		"near_earth_object_parent": "https://api.nasa.gov/neo/rest/v1/neo/3012393?api_key=DEMO_KEY",
		"self": "https://api.nasa.gov/neo/rest/v1/neo/sentry/3012393?api_key=DEMO_KEY"
	},
	"spkId": "3012393",
	"designation": "1979 XB",
	"sentryId": "bJ79X00B",
	"fullname": "(1979 XB)",
	"year_range_min": "2056",
	"year_range_max": "2113",
	"potential_impacts": "2",
	"impact_probability": "7.36e-07",
	"v_infinity": "23.9194972826087",
	"absolute_magnitude": "18.53",
	"estimated_diameter": "0.662",
	"palermo_scale_ave": "-2.82",
	"Palermo_scale_max": "-3.12",
	"torino_scale": "0",
	"last_obs": "1979-Dec-15.42951",
	"last_obs_jd": "2444222.92951",
	"url_nasa_details": "https://cneos.jpl.nasa.gov/sentry/details.html#?des=1979+XB",
	"url_orbital_elements": "http://ssd.jpl.nasa.gov/sbdb.cgi?sstr=3012393;orb=1",
	"is_active_sentry_object": true,
	"average_lunar_distance": 14.2337865829
}
```

* The `url_nasa_details:` goes to the page:	https://cneos.jpl.nasa.gov/sentry/details.html#?des=1979%20XB

* 
