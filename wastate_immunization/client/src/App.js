import React, { Component } from 'react';
import Loading from './Loading';
import ErrorBoundary from './ErrorBoundary';
import Map from './map';
import './App.css';

// import MarkerClusterer from '@google/markerclusterer';
// import schools from './schools.json';

// Makes the API call.
// import axios from 'axios'


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
	// IDEA: * could write each query to a file, which gets overwritten each time,
	//				 then, React imports that file like the temp marker array is now.  this skips using state.  Proj6.
	//			 * could use axios to fetch the data, then save it w/ .setState({ })
	//			 	 ^--This option is working so far. The data push to setState works, but the
	//					map does not reload to display any markers.
	//				 	Try using the  ? :  , to use loading spinner, then show map when data is ready.


	// 				*  Maybe try just passing in each data results as props.  Then when done w/ it, just drop it on the floor & recieve teh next data results.
			schools: [],
			isLoading: false,
			searchQuery: '',
		}
	}

	getSchools = (query='/schools/coords/yes') => {
	// This function not working, doesn't always return 117 schools
	// And it runs super slow!!!!!
	// And can't get the data to be rendered as markers.
	// Now it's not working at all.
		this.setState({ isLoading: true });
		fetch(`${query}`)	// should return 117 school coordinates
		.then(res => res.json())
		.then(schools => this.setState({ schools, searchQuery: query }))
		.then( this.setState({ isLoading: false }) );
	}
/*	NOT WORKING:
	getSchools = (query='schools') => {
		this.setState({ isLoading: true });
		axios.get(`/${query}`)
		.then(response => {
			let queryData = response;
			this.setState({
				schools: queryData.map(curr => {
					var coords = curr.location_1.coordinates;
					return { lng: coords[0], lat: coords[1] }
				}),
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
			.then(res => this.setState({ response: res.express }))
			.catch(err => console.error(err));

		this.getSchools();
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
	handleSchoolQuery = async event => {
		event.preventDefault();
		const response = await fetch('/re')
	}

  render() {

		var getEm = this.state.schools;
		var getMuhData = getEm.map(curr => {
			var coords = curr.location_1.coordinates;
			return { lng: coords[0], lat: coords[1] };
		});
		console.log('==========================================', getMuhData.length);
		// var schoolQuery = this.state.schools;

    return (
      <div className="App">
				<ErrorBoundary>
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
	        <header className="App-header">
	        	<p>You Waht?</p>
						<h5>From:         /Project12/fsjs-capstone-project/wastate_immunization/client/src/App.js</h5>
	        </header>
					<h2>{this.state.searchQuery}</h2>

					{/* Put a function here to reload the map & marker clusterer for each button click.
						Pass in the query results & markers as props.  */}
					{ (this.state.isLoading) ? <Loading />
						: <Map
						searchQuery={this.state.searchQuery}
							/>
					}
				</ErrorBoundary>
      </div>
    );
  }
}
export default App;
