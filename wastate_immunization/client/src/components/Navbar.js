import React from 'react';

const Navbar = (props) => {
	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-light">
			<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
				<span className="navbar-toggler-icon"></span>
			</button>

			<div className="collapse navbar-collapse" id="navbarSupportedContent">
				<ul className="navbar-nav mr-auto">

					<li className="nav-item dropdown">
						<a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Schools</a>
						<div className="dropdown-menu" aria-labelledby="navbarDropdown">
							<a className="dropdown-item" href="/school/all">All Schools</a>
							<div className="dropdown-divider"></div>
							<a className="dropdown-item" href="/school/complete_for_all">100% Immuninzation Rates</a>
							<div className="dropdown-divider"></div>
							<a className="dropdown-item" href="/school/reported_yes">Reported Immuninzation Rates</a>
							<div className="dropdown-divider"></div>
							<a className="dropdown-item" href="/school/reported_no">Did Not Report Immuninzation Rates</a>
						</div>
					</li>

					<li className="nav-item dropdown">
						<a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
					Exemption by Immuninzation Type
						</a>
						<div className="dropdown-menu" aria-labelledby="navbarDropdown">
							<a className="dropdown-item" href="/immunization/hebatitis_b">Hepatitis B</a>
							<div className="dropdown-divider"></div>
							<a className="dropdown-item" href="/immunization/measles">Measles</a>
							<div className="dropdown-divider"></div>
							<a className="dropdown-item" href="/immunization/pertussis">Pertussis</a>
							<div className="dropdown-divider"></div>
							<a className="dropdown-item" href="/immunization/polio">Polio</a>
							<div className="dropdown-divider"></div>
							<a className="dropdown-item" href="/immunization/tetanus">Tetanus</a>
							<div className="dropdown-divider"></div>
							<a className="dropdown-item" href="/immunization/varicella">Varicella</a>
						</div>
					</li>

					<li className="nav-item dropdown">
						<a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
					Exemption by Reason
						</a>
						<div className="dropdown-menu" aria-labelledby="navbarDropdown">
							<a className="dropdown-item" href="/reason/medical">Medical</a>
							<div className="dropdown-divider"></div>
							<a className="dropdown-item" href="/reason/personal">Personal</a>
							<div className="dropdown-divider"></div>
							<a className="dropdown-item" href="/reason/religous">Religous</a>
							<div className="dropdown-divider"></div>
							<a className="dropdown-item" href="/reason/any">Any Exemption</a>
						</div>
					</li>
				</ul>
				<form className="form-inline my-2 my-lg-0">
					<input className="form-control mr-sm-2" type="search" placeholder="Search by Address" aria-label="Search"></input>
					<button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
				</form>
			</div>
		</nav>
	);
}

export default Navbar;
