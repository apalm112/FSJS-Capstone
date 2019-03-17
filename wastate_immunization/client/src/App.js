import React, { Component } from 'react';
 // eslint-disable-next-line
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import ErrorBoundary from './ErrorBoundary';
import Loading from './Loading';
import Navbar from './components/Navbar';
import Map from './map';

class App extends Component {
	constructor() {
		super();
		this.state = {
			schools: [],
			isLoading: true,
			searchQuery: '',
		}
	}

	handleSchoolQuery = (query='/school/all') => {
	// This function returns whatever query is sent to it.
		fetch(`${query}`)
		.then(res => res.json())
		.then(schools => this.setState({ schools: schools, searchQuery: query, isLoading: false }));
	}
/*	These two routes work, but don't need them
	//  This route code kindof runs, BUT the app is in race conditions, so it only works sometimes.
	get100PercentImmunizedSchools = (query='/schools/complete_for_all') => {
	// This function return 65 schools
		fetch(`${query}`)
		.then(res => res.json())
		.then(schools => this.setState({ schools: schools, searchQuery: query, isLoading: false }))
	}

	getSchoolsCoordsNo = (query='/schools/reported_yes') => {
//	This function not working, doesn't always return 117 schools
		fetch(`${query}`)	// should return 117 school coordinates
		.then(res => res.json())
		.then(schools => this.setState({ schools: schools, searchQuery: query, isLoading: false }))
	}*/
/*	getSchoolsCoordsNo = async (query='/schools/reported_no') => {
		const response = await fetch(query);
		const body = await response.json();
		if (response.status !== 200) throw Error(body.message);
		this.setState({ isLoading: false });
		return body;
	};
		// NOT WORKING:	TRHOWS THE ERROR: Access to XMLHttpRequest at
 		// 	'http://schools/complete_for_all' from origin 'http://localhost:3000' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
		get100PercentImmunizedSchools = (query='/schools/complete_for_all') => {
		this.setState({ isLoading: true });
		axios.get(`/${query}`, {
			headers: {"Access-Control-Allow-Origin": "*"}
		})
		.then(response => {
			this.setState({ schools: response.body,
				isLoading: false,
				searchQuery: query,
			})
		})
		.catch(err => {
			console.error("You What!?  Error axiosing the Express server....");
		})
	}*/

	componentDidMount() {
	// TODO: if the param is left empty, then this function throws an error!
	// Create a way to pass in the param from the NavBar href to control the
	// route.
	// 											(`${routeClickedOn}`)
		this.handleSchoolQuery('/school/reported_no');
		// this.get100PercentImmunizedSchools();
	}	// End componentDidMount()

  render() {
		// Show number of unimmunized kids at each school
		// How many kids are NOT vaccinated by the whole area
		// Then be able to narrow that down by section.
		// Show Data by Percentage, then break out further data in each Marker infoWindow.

		var getSchoolState = this.state.schools;
		console.log('===========searchQuery & Schools.length: ', this.state.searchQuery, getSchoolState.length, getSchoolState[0]);

    return (
			<BrowserRouter>
	      <div className="App">
					<ErrorBoundary>
		        <header className="App-header">
		        	<h1>WA State School Immuninzation Rates</h1>
							<Navbar />
		        </header>
						<h3>Current Express Route: {this.state.searchQuery}</h3>
						{/* Pass in the query results & markers as props.  */}
						{ (this.state.isLoading) ? <Loading />
						: <Map
							schools={this.state.schools}
							searchQuery={this.state.searchQuery}
							/>
						}
					</ErrorBoundary>
	      </div>
			</BrowserRouter>
    );
  }
}
export default App;
