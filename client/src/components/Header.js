import React from 'react';

const Header = () => {
	return (
		<div className="jumbotron App-header">
		  <h1 className="display-4 lead">Washington School Immunization Rates</h1>
		  <p className="lead">
			The data is from the Washington state Department of Health.</p>
			<p className="lead">For student immunization rates, kindergarten through 12th grade, by school for 2016-2017.</p>
			<p className="lead"> You can view school locations sorted by immunization rates, different types of immunizations & by exemption reasons.
			</p>
			<hr className="line"/>
		  <p className="push-to-bottom">Select any category from the dropdown menus below to display the school data associated with it.</p>
		</div>
	);
}

export default Header;
