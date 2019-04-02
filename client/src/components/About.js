import React from 'react';

const About = (props) => {
	return (
		<div className="about-container">
			<table className="info">
				<tbody>
					<tr>
						<td>Total Number of Schools in the Database:</td>
						<td>2595</td>
					</tr>
					<tr>
						<td>Total Number of Schools with valid coordinates:</td>
						<td>2248</td>
					</tr>
					<tr>
						<td>Number of Schools with no coordinates:</td>
						<td>340</td>
					</tr>
					<tr>
						<td>Number of Schools with invalid coordinates:</td>
						<td>7</td>
					</tr>
					<tr>
						<td>Washington School Data Source:</td>
						<td>	<a href="https://dev.socrata.com/foundry/data.wa.gov/ndsp-2k9r">Socrata API</a></td>
					</tr>
				</tbody>
			</table>
			<br/>
			<p className="about about-source">Source:
				<a href="https://data.wa.gov/Health/All-students-kindergarten-through-12th-grade-immun/9zru-c2kz">Data.WA.gov</a></p>
			<p className="about about-data">"About the Data:</p>
			<p className="about about-last">
			This data is based on counts of students by immunization status in all grades (kindergartner through 12th grade) in public and private schools. The student immunization status is based on parent reports to schools and may not be verified by a healthcare provider. The department makes no other claims about the accuracy of the data as reported by schools. The summary data in this report is not weighted and does not account for the percentage of schools that did not report."</p>
		</div>
	);
}

export default About;
