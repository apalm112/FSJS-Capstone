import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class MapNavBar extends Component {
	render() {
		const loading = this.props.isLoading;
		return (
		<nav className="navbar navbar-light bg-light">
			<div>
				<div className="btn-group d-block-sm d-inline-md d-inline-lg btn-one">

					{ loading ? <button className="btn btn-dark btn-load-one" type="button" disabled>
						<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
						Loading...
					</button>
					:	<button className="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
						Schools
					</button>
					}

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
				<div className="btn-group d-block-sm d-inline-md d-inline-lg btn-two">

					{ loading ? <button className="btn btn-dark btn-load-two" type="button" disabled>
						<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
						Loading...
					</button>
					:	<button type="button" className="btn btn-primary dropdown-toggle middle-button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
						Exemption by Immunization
					</button>
					}
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
				<div className="btn-group d-block-sm d-inline-md d-inline-lg btn-three">
					{ loading ? <button className="btn btn-dark btn-load-three" type="button" disabled>
						<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
						Loading...
					</button>
					:		<button type="button" className="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
						Exemption By Reason
					</button>
					}

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
	}
}
