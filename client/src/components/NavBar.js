import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => (
	<nav className="navbar navbar-expand-lg navbar-light bg-light" id="navbar">
		<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
			<span className="navbar-toggler-icon"></span>
		</button>

		<div className="collapse navbar-collapse" id="navbarSupportedContent">
			<div className="btn-group">
				<button data={window.scrollBy(0, 200)} type="button" className="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
					Schools
				</button>
				<div className="dropdown-menu">
					<NavLink className="dropdown-item" to="/school/complete_for_all">100% Immunization Rate</NavLink>
					<div className="dropdown-divider"></div>
					<NavLink className="dropdown-item" to="/school/reported_yes">Reported Yes</NavLink>
					<div className="dropdown-divider"></div>
					<NavLink className="dropdown-item" to="/school/reported_no">Reported No</NavLink>
					<div className="dropdown-divider"></div>
					<NavLink className="dropdown-item" to="/school/all">All Schools</NavLink>
				</div>
			</div>
			<div className="btn-group">
				<button data={window.scrollBy(0, 200)} type="button" className="btn btn-primary dropdown-toggle middle-button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
					Exemption by Immunization Type
				</button>
				<div className="dropdown-menu" aria-labelledby="navbarDropdown">
					<NavLink className="dropdown-item" to="/immunization/hepatitis_b">Hepatitis B</NavLink>
					<div className="dropdown-divider"></div>
					<NavLink className="dropdown-item" to="/immunization/measles">Measles</NavLink>
					<div className="dropdown-divider"></div>
					<NavLink className="dropdown-item" to="/immunization/pertussis">Pertussis</NavLink>
					<div className="dropdown-divider"></div>
					<NavLink className="dropdown-item" to="/immunization/polio">Polio</NavLink>
					<div className="dropdown-divider"></div>
					<NavLink className="dropdown-item" to="/immunization/tetanus">Tetanus</NavLink>
					<div className="dropdown-divider"></div>
					<NavLink className="dropdown-item" to="/immunization/varicella">Varicella</NavLink>
				</div>
			</div>
			<div className="btn-group">
				<button data={window.scrollBy(0, 200)} type="button" className="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
					Exemption By Reason
				</button>
				<div className="dropdown-menu" aria-labelledby="navbarDropdown">
					<NavLink className="dropdown-item" to="/reason/medical">Medical</NavLink>
					<div className="dropdown-divider"></div>
					<NavLink className="dropdown-item" to="/reason/personal">Personal</NavLink>
					<div className="dropdown-divider"></div>
					<NavLink className="dropdown-item" to="/reason/religous">Religous</NavLink>
					<div className="dropdown-divider"></div>
					<NavLink className="dropdown-item" to="/reason/any_exemption">Any Exemption</NavLink>
				</div>
			</div>
		</div>
	</nav>
);

export default NavBar;
