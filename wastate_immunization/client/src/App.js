import React, { Component } from 'react';
import {
	BrowserRouter,
	Route,
	Switch
} from 'react-router-dom';
import Header from './components/Header';
import ErrorBoundary from './components/ErrorBoundary';
import NavBar from './components/NavBar';
import NotFound from './components/NotFound';
import MapContainer from './components/MapContainer';

export default class App extends Component {

  render() {
    return (
			<BrowserRouter>
	      <div className="App">
					<ErrorBoundary>
						<Route component={Header} />
						<Route component={NavBar} />
						<Switch>
						{/*	Works better w/out the Redirect, then the markers always load on first route selection!
							<Route exact path= "/" render={ () => <Redirect to={'/school/complete_for_all'} /> } />  */}

							<Route exact path= "/" component={MapContainer} />
							<Route path="/school/complete_for_all" render={ () => {return <MapContainer
								schoolQueryRoute={"/school/complete_for_all"} /> }} />
							<Route path="/school/reported_yes" render={ () => {return <MapContainer
								schoolQueryRoute={"/school/reported_yes"} /> }} />
							<Route path="/school/reported_no" render={ () => {return <MapContainer
								schoolQueryRoute={"/school/reported_no"} /> }} />
							<Route path="/school/all" render={ () => {return <MapContainer
									schoolQueryRoute={"/school/all"} /> }} />
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
