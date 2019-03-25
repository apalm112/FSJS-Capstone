import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = (props, {match}) => (
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
							<NavLink className="dropdown-item" to="/school/all">All Schools</NavLink>
							<div className="dropdown-divider"></div>
							<NavLink className="dropdown-item" to="/school/complete_for_all">100% Immuninzation Rates</NavLink>
							<div className="dropdown-divider"></div>
							<NavLink className="dropdown-item" to="/school/reported_yes">Reported Yes</NavLink>
							<div className="dropdown-divider"></div>
							<NavLink className="dropdown-item" to="/school/reported_no">Reported No</NavLink>
						</div>
					</li>

					<li className="nav-item dropdown">
						<a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
							Exemption by Immuninzation Type
						</a>
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
					</li>

					<li className="nav-item dropdown">
						<a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
							Exemption by Reason
						</a>
						<div className="dropdown-menu" aria-labelledby="navbarDropdown">
							<NavLink className="dropdown-item" to="/reason/medical">Medical</NavLink>
							<div className="dropdown-divider"></div>
							<NavLink className="dropdown-item" to="/reason/personal">Personal</NavLink>
							<div className="dropdown-divider"></div>
							<NavLink className="dropdown-item" to="/reason/religous">Religous</NavLink>
							<div className="dropdown-divider"></div>
							<NavLink className="dropdown-item" to="/reason/any_exmption">Any Exemption</NavLink>
						</div>
					</li>
				</ul>
			</div>
		</nav>
	</header>



);

export default NavBar;
