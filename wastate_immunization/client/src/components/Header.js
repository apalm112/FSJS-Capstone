import React from 'react';

const Header = () => {
	return (
		<header className="App-header">
			<h1>WA State School Immunization Rates</h1>
			<p>This is placeholder for the copy deets about this project & the data being displayed.</p>
			<p>Data source is <a href="https://dev.socrata.com/foundry/data.wa.gov/ndsp-2k9r">Socrata Data.WA.gov</a></p>
			<hr className="line"></hr>
			<p>Select any link from the dropdown menus below to fetch the school data associated with it.</p>
		</header>
	);
}

export default Header;
