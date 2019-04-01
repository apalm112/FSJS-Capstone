import React from 'react';
import {
	BrowserRouter,
	Redirect,
	Route,
	Switch
} from 'react-router-dom';
import About from './components/About';
import Header from './components/Header';
import ErrorBoundary from './components/ErrorBoundary';
import NotFound from './components/NotFound';
import MapContainer from './components/MapContainer';
const supportHistory = 'pushState' in window.history;

const App = () => (
	<BrowserRouter
		forceRefresh={!supportHistory}
	>
    <div className="App">
			<ErrorBoundary>
				<Route component={Header} />

				<Switch>
					<Redirect exact path= "/" push to="/school/all" />

					<Route path="/about" component={About} />

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

					<Route path="/reason/any_exemption" render={ () => {return <MapContainer
						schoolQueryRoute={"/reason/any_exemption"} /> }} />

					<Route component={NotFound} />
				</Switch>
			</ErrorBoundary>
    </div>
	</BrowserRouter>
);

export default App;
