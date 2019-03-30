import React from 'react';
import { NavLink } from 'react-router-dom';

const MainNavBar = () => (
		<nav className="float-left nav nav-pills flex-sm-row navbar-expand-lg navbar-dark" id="main-navbar">

			<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
				<span className="navbar-toggler-icon"></span>
			</button>
			<div className="collapse navbar-collapse" id="navbarSupportedContent">

				<a className="flex-sm-fill text-sm nav-link" href="/">Home</a>
				<a className="flex-sm-fill text-sm nav-link" href="/about">About</a>
			</div>
		</nav>
);

export default MainNavBar;


/* <ul className="nav nav-pills" id="main-navbar">
	<li className="nav-item">
		<NavLink className="main-nav-link nav-link" to="/">Home
			<span className="sr-only">(current)</span>
		</NavLink>
	</li>
	<li className="nav-item">
		<NavLink className="main-nav-link nav-link" to="/about">About</NavLink>
	</li>
</ul> */
