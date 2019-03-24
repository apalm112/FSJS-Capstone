import React, { Component } from 'react';
import {
	BrowserRouter,
	// eslint-disable-next-line
	Redirect,
	Route,
	Switch
} from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import NavBar from './components/NavBar';
import NotFound from './components/NotFound';
import MapContainer from './components/MapContainer';

export default class App extends Component {

  render() {
		// Show number of unimmunized kids at each school
		// How many kids are NOT vaccinated by the whole area
		// Then be able to narrow that down by section.
		// Show Data by Percentage, then break out further data in each Marker infoWindow.
		// <Route path="/" render={ () => {return <MapContainer
		// 	onClick={this.handleClick.bind(this)} /> }} />
		// <Route exact path="/" component={MapContainer} />
    return (
			<BrowserRouter>
	      <div className="App">
					<ErrorBoundary>

						<Route component={NavBar} />

						<Switch>
							{/* TODO: a MapContainer for each of the 14 routes? */}

							<Route exact path= "/" render={ () => <Redirect to={'/school/all'} /> } />

							<Route path="/school/all" render={ () => {return <MapContainer
								schoolQueryRoute={"/school/all"} /> }} />
							<Route path="/school/complete_for_all" render={ () => {return <MapContainer
								schoolQueryRoute={"/school/complete_for_all"} /> }} />
							<Route path="/school/reported_yes" render={ () => {return <MapContainer
								schoolQueryRoute={"/school/reported_yes"} /> }} />
							<Route path="/school/reported_no" render={ () => {return <MapContainer
								schoolQueryRoute={"/school/reported_no"} /> }} />
							<Route path="/immunization/hepatitis_b" render={ () => {return <MapContainer
								schoolQueryRoute={"/immunization/hepatitis_b"} /> }} />
							<Route path="/immunization/measles" render={ () => {return <MapContainer
								schoolQueryRoute={"/immunization/measles"} /> }} />
							<Route path="/immunization/pertussis" render={ () => {return <MapContainer
								schoolQueryRoute={"/immunization/pertussis"} /> }} />
							<Route path="/immunization/polio" render={ () => {return <MapContainer
								schoolQueryRoute={"/immunization/polio"} /> }} />
							<Route path="/immunization/tetanus" render={ () => {return <MapContainer
								schoolQueryRoute={"/immunization/tetanus"} /> }} />
							<Route path="/immunization/varicella" render={ () => {return <MapContainer
								schoolQueryRoute={"/immunization/varicella"} /> }} />
							<Route path="/reason/medical" render={ () => {return <MapContainer
								schoolQueryRoute={"/reason/medical"} /> }} />
							<Route path="/reason/personal" render={ () => {return <MapContainer
								schoolQueryRoute={"/reason/personal"} /> }} />
							<Route path="/reason/religous" render={ () => {return <MapContainer
								schoolQueryRoute={"/reason/religous"} /> }} />
							<Route path="/reason/any_exmption" render={ () => {return <MapContainer
								schoolQueryRoute={"/reason/any_exmption"} /> }} />

							<Route component={NotFound} />
						</Switch>
					</ErrorBoundary>
	      </div>
			</BrowserRouter>
    );
  }
}
