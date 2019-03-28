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
							<Route exact path= "/" component={MapContainer} />

							<Route exact path="/school/complete_for_all" render={ () => {return <MapContainer
								schoolQueryRoute={"/school/complete_for_all"} /> }} />

							<Route exact path="/school/reported_yes" render={ () => {return <MapContainer
								schoolQueryRoute={"/school/reported_yes"} /> }} />

							<Route exact path="/school/reported_no" render={ () => {return <MapContainer
								schoolQueryRoute={"/school/reported_no"} /> }} />

							<Route exact path="/school/all" render={ () => {return <MapContainer
									schoolQueryRoute={"/school/all"} /> }} />

							<Route exact path="/immunization/hepatitis_b" render={ () => {return <MapContainer
								schoolQueryRoute={"/immunization/hepatitis_b"} /> }} />

							<Route exact path="/immunization/measles" render={ () => {return <MapContainer
								schoolQueryRoute={"/immunization/measles"} /> }} />

							<Route exact path="/immunization/pertussis" render={ () => {return <MapContainer
								schoolQueryRoute={"/immunization/pertussis"} /> }} />

							<Route exact path="/immunization/polio" render={ () => {return <MapContainer
								schoolQueryRoute={"/immunization/polio"} /> }} />

							<Route exact path="/immunization/tetanus" render={ () => {return <MapContainer
								schoolQueryRoute={"/immunization/tetanus"} /> }} />

							<Route exact path="/immunization/varicella" render={ () => {return <MapContainer
								schoolQueryRoute={"/immunization/varicella"} /> }} />

							<Route exact path="/reason/medical" render={ () => {return <MapContainer
								schoolQueryRoute={"/reason/medical"} /> }} />

							<Route exact path="/reason/personal" render={ () => {return <MapContainer
								schoolQueryRoute={"/reason/personal"} /> }} />

							<Route exact path="/reason/religous" render={ () => {return <MapContainer
								schoolQueryRoute={"/reason/religous"} /> }} />

							<Route exact path="/reason/any_exemption" render={ () => {return <MapContainer
								schoolQueryRoute={"/reason/any_exemption"} /> }} />

							<Route component={NotFound} />
						</Switch>
					</ErrorBoundary>
	      </div>
			</BrowserRouter>
    );
  }
}
