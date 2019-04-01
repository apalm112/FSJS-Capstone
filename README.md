# FSJS-Capstone-Project
A MERN stack web application deployed on Heroku,
which combines a React frontend with a Express backend.

This project uses REST API design, Node.js, and Express to create API routes, along with Mongoose and MongoDB for data modeling and persistence.  
The API will provide a way for users to:
* review immunization data for Washington state by school. Users can see a Google map displaying schools in the database.
___________________________________________________________________________

### Installation

###### You will need [MongoDB](https://docs.mongodb.com/manual/installation/#mongodb-community-edition) installed on your local machine.

* Clone the repo:

	`$ git clone git@github.com:apalm112/FSJS-Capstone.git`

* `cd` into the project folder & install dependencies:

	`$ npm i`

* `cd` into the `/client` folder & install dependencies:

	`$ npm i`


### Create a `.Env` File for API Keys

* You will need to create a `.env` file in the root directory of the project and a second `.env` file in the `/client` folder.

* To run this project you will need your own:

	1 [Google Maps JavaScript API Key](https://developers.google.com/maps/documentation/javascript/get-api-key)
	* In the `/client/.env` file add:

		`REACT_APP_MAP_KEY=<Google Maps API Key>`

 2 [Socrata App Token](https://opendata.socrata.com/signup)

	* In the `/client/.env` file add:

		`SOCRATA_API_KEY=<Socrata App Token>`

  3 [mLab Database](https://mlab.com/login/) account
	* Hopefully you already have an mLab account, they're not giving out new ones.
	* Login to your mLab account & create a new MongoDB Deployment, the free option works.
	* Add a new database user & password to it.
	* Copy the [ standard MongoDB URI](https://docs.mlab.com/connecting/#connect-string) from the deployment into the root directory `.env` file:

	`MONGOLAB_URI=mongodb://<dbuser>:<dbpassword>@ds<number>.mlab.com:<number>/<deployment name>`


* To run the app, in the terminal enter:

	`$ npm start`
