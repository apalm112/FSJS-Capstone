import React from 'react';
import { NavLink } from 'react-router-dom';

const MainNavBar = () => (
		<nav className="nav-pills float-left flex-sm-row navbar-expand-lg navbar-dark" id="main-navbar">

			<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
				<span className="navbar-toggler-icon"></span>
			</button>

			<div className="navbar-collapse collapse" id="navbarSupportedContent">

				<NavLink className="flex-sm-fill text-sm nav-link" to="/school/all">Home</NavLink>
				<NavLink className="flex-sm-fill text-sm nav-link" to="/about">About</NavLink>
			</div>
		</nav>
);

export default MainNavBar;
