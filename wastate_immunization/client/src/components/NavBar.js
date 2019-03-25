import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = (props, {match}) => (
		<nav className="navbar navbar-expand-lg navbar-light bg-light">
			<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
				<span className="navbar-toggler-icon"></span>
			</button>

			<div className="collapse navbar-collapse" id="navbarSupportedContent">
				<ul className="navbar-nav mr-auto">

					<li className="nav-item dropdown">
						<svg  className="nav-link dropdown-toggle vg-one" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
							 viewBox="0 0 496.158 496.158" style={{ "enableBackground": "new 0 0 4}96.158 496.158"}} >
						<path style={{"fill":"#56B48C"}} d="M248.082,0.003C111.07,0.003,0,111.061,0,248.085c0,137,111.07,248.07,248.082,248.07
							c137.006,0,248.076-111.07,248.076-248.07C496.158,111.061,385.088,0.003,248.082,0.003z"/>
						<path style={{"fill": "#FFFFFF"}} d="M278.767,145.419c-3.126-4.003-7.276-6.006-12.451-6.006c-4.591,0-7.716,0.879-9.375,2.637
							c-1.662,1.758-5.226,6.445-10.693,14.063c-5.47,7.617-11.744,14.502-18.823,20.654c-7.082,6.152-16.53,12.012-28.345,17.578
							c-7.91,3.712-13.429,6.738-16.553,9.082c-3.126,2.344-4.688,6.006-4.688,10.986c0,4.298,1.586,8.082,4.761,11.353
							c3.172,3.273,6.812,4.907,10.913,4.907c8.592,0,25.292-9.521,50.098-28.564V335.41c0,7.814,1.806,13.722,5.42,17.725
							c3.612,4.003,8.397,6.006,14.355,6.006c13.378,0,20.068-9.814,20.068-29.443V161.972
							C283.455,154.941,281.892,149.425,278.767,145.419z"/>
						</svg>
					</li>
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
);

export default NavBar;
