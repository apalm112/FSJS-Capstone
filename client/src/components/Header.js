import React from 'react';
import MainNavBar from './MainNavBar';

const Header = () => {
	return (
		<div className="jumbotron-fluid App-header">

			<MainNavBar />

		  <h1 className="jumbo-center display-4">Washington School Immunization Rates</h1>
			<hr className="line"/>
		  <p className="lead">
			The data is from the Washington state Department of Health.</p>
			<p className="lead">For student immunization rates, kindergarten through 12th grade, by school for 2016-2017.</p>
			<p className="lead"> You can view school locations sorted by different types of immunizations, by exemption reasons and more.
			</p>
			<p className="lead">Each drop down menu selection displays the school data for that single category.</p>
			<p className="lead"> Each map marker can be clicked to open an infoWindow displaying its data.</p>
		</div>
	);
}

export default Header;
