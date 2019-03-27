import React from 'react';

const Header = () => {
	return (
		<div className="jumbotron App-header">
		  <h1 className="display-4">Washington School Immunization Rates</h1>
		  <p className="lead">
				The data displayed is the Washington student immunization rates by school for 2016-2017.</p>
			<p className="lead"> You can view school locations sorted by different types of immunizations, immunization rates & by exemption reasons.
			</p>
		  <p className="lead">Data source is <a href="https://dev.socrata.com/foundry/data.wa.gov/ndsp-2k9r">Socrata Data.WA.gov</a></p>
			<hr className="line"/>
		  <p className="push-to-bottom">Select any category from the dropdown menus below to display the school data associated with it.</p>
		</div>
	);
}

export default Header;
