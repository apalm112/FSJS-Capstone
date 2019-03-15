import React, { Component } from 'react';
 // eslint-disable-next-line
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import ErrorBoundary from './ErrorBoundary';
import Loading from './Loading';
import Map from './map';
import Navbar from './components/Navbar';

// Makes the API call.
// import axios from 'axios';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			response: '',
			post: '',
			responseToPost: '',
	// TODO: How to get the queried school data,
	//			 that's returned from the Express route from mLab DB school collection,
	//			 pushed to the app's state?
	// IDEA: *  Maybe try just passing in each data results as props.  Then when done w/ it, just drop it on the floor & recieve teh next data results.
	// 				* could use axios to fetch the data, then save it w/ .setState({ })
	//			 	 ^--This option is working so far. The data push to setState works, but the
	//					map does not reload to display any markers.
	//				 	Try using the  ? :  , to use loading spinner, then show map when data is ready.
			schools: [],
			isLoading: false,
			searchQuery: '',
		}
	}

	// CURRENT STOPPING POINT THIRDSDAY NITE: TRYING TO GET THE DATA PASSED INTO REACT FRUM EXPRESS
/*	get100PercentImmunizedSchools = (query='/schools/complete_for_all') => {
	// This function return 65 schools
		fetch(`${query}`)
		.then(res => res.json())
		.then(schools => this.setState({ schools: schools, searchQuery: query, isLoading: false }));
	}*/

	getSchoolsCoordsYes = (query='/schools/coords/yes') => {
/*	This function not working, doesn't always return 117 schools
	And it runs super slow!!!!!
	And can't get the data to be rendered as markers.
	Now it's not working at all.*/
		this.setState({ isLoading: true });
		fetch(`${query}`)	// should return 117 school coordinates
		.then(res => res.json())
		.then(schools => this.setState({ schools, searchQuery: query }))
		.then( this.setState({ isLoading: false }) );
	}
	// NOT WORKING:	TRHOWS THE ERROR: Access to XMLHttpRequest at 'http://schools/complete_for_all' from origin 'http://localhost:3000' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
/*	get100PercentImmunizedSchools = (query='/schools/complete_for_all') => {
		this.setState({ isLoading: true });
		axios.get(`/${query}`, {
			headers: {"Access-Control-Allow-Origin": "*"}
		})
		.then(response => {
			// let queryData = response;
			this.setState({ schools: response,
				// schools: queryData.map(curr => {
				// 	var coords = curr.location_1.coordinates;
				// 	return { lng: coords[0], lat: coords[1] }
				// }),
				isLoading: false,
				searchQuery: query,
			})
		})
		.catch(err => {
			console.error("You What!?  Error axiosing the Express server....");
		})
	}*/
	componentDidMount() {
		this.callApi()
		//                             res.send({ express: 'Hellos froms Expresses' });
			.then(res => this.setState({ response: res.express }))
			.catch(err => console.error(err));

		// this.getSchoolsCoordsYes();
		this.getSchoolsCoordsYes();
	}

	callApi = async () => {
		const response = await fetch('/api/hello');
		const body = await response.json();
		if (response.status !== 200) throw Error(body.message);
		return body;
	};
	handleSubmit = async event => {
		event.preventDefault();
		event.currentTarget.reset();  // Empties out the user text from the input.
		const response = await fetch('/api/puff', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ post: this.state.post }),
		});
		const body = await response.text();
		this.setState({ responseToPost: body });
	};

  render() {

		// Show number of unimmunized kids at each school***********************************/
		// How many kids are NOT vaccinated by the whole area
		// Then be able to narrow that down by section.
		// Show Data by Percentage, then break out further data in each Marker infoWindow.

		var getSchoolState = this.state.schools;
		// var getMuhData = getEm.map(curr => {
		// 	var coords = curr.location_1.coordinates;
		// 	return { lng: coords[0], lat: coords[1] };
		// });
		console.log('===========searchQuery & Schools.length: ', this.state.searchQuery, getSchoolState.length, getSchoolState[3]);

    return (
			<BrowserRouter>
	      <div className="App">
					<ErrorBoundary>
		        <header className="App-header">
		        	<h1>WA State School Immuninzation Rates</h1>
							<Navbar />
		        </header>
						<h3>Current Express Route: {this.state.searchQuery}</h3>

						{/* Put a function here to reload the map & marker clusterer for each button click.
							Pass in the query results & markers as props.  */}
						{ (this.state.isLoading) ? <Loading />
							: <Map
									schools={this.state.schools}
									searchQuery={this.state.searchQuery}
									onSearch={this.getSchoolsCoordsYes}
								/>
						}
						<p>{this.state.response}</p>
						<form onSubmit={this.handleSubmit}>
							<p>
								<strong>Post to Server:</strong>
							</p>
							<input
								type="text"
								value={this.state.post}
								onChange={event => this.setState({ post: event.target.value })}
								onSubmit={event => event.value.reset()}
							/>
							<button type="submit">Submit Teh Post!</button>
						</form>
						<h3><strong>{this.state.responseToPost}</strong></h3>
					</ErrorBoundary>
	      </div>
			</BrowserRouter>
    );
  }
}
export default App;
