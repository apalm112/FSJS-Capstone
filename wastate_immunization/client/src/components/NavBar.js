import React from 'react';
import {
	Route,
	Link,
	Redirect
} from 'react-router-dom';

import MapContainer from './MapContainer';

const Navbar = (props) => (
	<header className="App-header">
		<h1>WA State School Immuninzation Rates</h1>

		<nav className="navbar navbar-expand-lg navbar-light bg-light">
			<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
				<span className="navbar-toggler-icon"></span>
			</button>

			<div className="collapse navbar-collapse" id="navbarSupportedContent">
				<ul className="navbar-nav mr-auto">

					<li className="nav-item dropdown">
						<a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Schools</a>
						<div className="dropdown-menu" aria-labelledby="navbarDropdown">
							<Link className="dropdown-item" to="/school/all">All Schools</Link>
							<div className="dropdown-divider"></div>
							<Link className="dropdown-item" to="/school/complete_for_all">100% Immuninzation Rates</Link>
							<div className="dropdown-divider"></div>
							<Link className="dropdown-item" to="/school/reported_yes">Reported Immuninzation Rates</Link>
							<div className="dropdown-divider"></div>
							<Link className="dropdown-item" to="/school/reported_no">Did Not Report Immuninzation Rates</Link>
						</div>
					</li>

					<li className="nav-item dropdown">
						<a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
							Exemption by Immuninzation Type
						</a>
						<div className="dropdown-menu" aria-labelledby="navbarDropdown">
							<Link className="dropdown-item" to="/immunization/hebatitis_b">Hepatitis B</Link>
							<div className="dropdown-divider"></div>
							<Link className="dropdown-item" to="/immunization/measles">Measles</Link>
							<div className="dropdown-divider"></div>
							<Link className="dropdown-item" to="/immunization/pertussis">Pertussis</Link>
							<div className="dropdown-divider"></div>
							<Link className="dropdown-item" to="/immunization/polio">Polio</Link>
							<div className="dropdown-divider"></div>
							<Link className="dropdown-item" to="/immunization/tetanus">Tetanus</Link>
							<div className="dropdown-divider"></div>
							<Link className="dropdown-item" to="/immunization/varicella">Varicella</Link>
						</div>
					</li>

					<li className="nav-item dropdown">
						<a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
							Exemption by Reason
						</a>
						<div className="dropdown-menu" aria-labelledby="navbarDropdown">
							<Link className="dropdown-item" to="/reason/medical">Medical</Link>
							<div className="dropdown-divider"></div>
							<Link className="dropdown-item" to="/reason/personal">Personal</Link>
							<div className="dropdown-divider"></div>
							<Link className="dropdown-item" to="/reason/religous">Religous</Link>
							<div className="dropdown-divider"></div>
							<Link className="dropdown-item" to="/reason/any">Any Exemption</Link>
						</div>
					</li>
				</ul>
				<form className="form-inline my-2 my-lg-0">
					<input className="form-control mr-sm-2" type="search" placeholder="Search by Address" aria-label="Search"></input>
					<button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
				</form>
			</div>
		</nav>
		<h3>Current Express Route: {props.searchQuery}</h3>
		

		{/* Write routes here... YA HOBO!*/}
		<Route path="/reason/medical" component={MapContainer} />


	</header>
);

export default Navbar;
