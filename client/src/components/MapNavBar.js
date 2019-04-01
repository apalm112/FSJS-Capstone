import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class MapNavBar extends Component {
	render() {
		const { loading } = this.props;

		return (
		<nav className="navbar navbar-light bg-text-primary">
			<div>
				<div className="btn-group d-block-sm d-inline-md d-inline-lg btn-one">

					{ loading ? <button className="btn btn-primary btn-load-one d-flex justify-content-center" id="btn-loading" type="button" disabled>
						<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
						Loading...
					</button>
					:	<button className="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
						Schools
					</button>
					}
					<div className="dropdown-menu bg-text-primary">
						<NavLink className="dropdown-item bg-text-primary" to="/school/complete_for_all">100% Immunization Rate</NavLink>
						<div className="dropdown-divider"></div>
						<NavLink className="dropdown-item bg-text-primary" to="/school/reported_yes">Reported Yes</NavLink>
						<div className="dropdown-divider"></div>
						<NavLink className="dropdown-item bg-text-primary" to="/school/reported_no">Reported No</NavLink>
						<div className="dropdown-divider"></div>
						<NavLink className="dropdown-item bg-text-primary" to="/school/all">All Schools</NavLink>
					</div>
				</div>
				<div className="btn-group d-block-sm d-inline-md d-inline-lg btn-two">

					{ !loading ? <button className="btn btn-primary dropdown-toggle middle-button" id="btn-two" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
						Exemption by Immunization
					</button>
					: <button className="btn btn-primary btn-load-one d-flex justify-content-center" id="btn-loading" type="button" disabled>
						<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
						Loading...
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
					{ !loading ? <button className="btn btn-primary dropdown-toggle" id="btn-three" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
						Exemption By Reason
					</button>
					:  <button className="btn btn-primary btn-load-one d-flex justify-content-center" id="btn-loading" type="button" disabled>
						<span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
						Loading...
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
