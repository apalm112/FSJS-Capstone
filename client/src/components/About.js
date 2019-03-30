import React from 'react';

const About = () => {
	return (
		<div className="about-container">

			<ul>
				<li>Washington student immunization rates by school for 2016-2017</li>
				<li>Data Provided by:
				Office of Immunization and Child Profile, Department of Health</li>
				<li>Total # of Schools: 2595</li>
				<li><a href="https://dev.socrata.com/foundry/data.wa.gov/ndsp-2k9r">Socrata API</a></li>
				<li><a href="https://data.wa.gov/Health/All-students-kindergarten-through-12th-grade-immun/9zru-c2kz">Data.WA.gov</a></li>
			</ul>
			<p className="lead">Data Source: <br/>
			These data are based on counts of students by immunization status in all grades (kindergartner through 12th grade) in public and private schools. The student immunization status is based on parent reports to schools and may not be verified by a healthcare provider. The department makes no other claims about the accuracy of the data as reported by schools. The summary data in this report is not weighted and does not account for the percentage of schools that did not report.</p>

			<p className="lead">Immunization Status Definitions:<br/> Complete: The student meets all the school-entry requirements for their age and grade and is in compliance.	Conditional: The student lacks appropriate documentation or is missing one or more of the required immunizations.	Out-of-Compliance: Conditional status has ended, but the students has not been fully immunized, does not have an exemption on file or lacks appropriate documentation.	Exempt: The student has a signed Certificate of Exemption on file at the school excusing the student from one or more vaccinations due to medical, personal or religious beliefs.</p>

			<p className="lead">Some schools have no coordinates, 7 schools have the wrong coordinates which place them in other states.  Those have been ommitted from the database queries displayed on the Google map.</p>



		</div>
	);
}

export default About;
