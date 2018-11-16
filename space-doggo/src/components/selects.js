import React from 'react';
import Header from '../components/header';


export default props => (
	<div className='menus'>
		<Header headerText='Select a NYT Book Best Seller List' />
		<div className='selects'>
			<select className='Fiction'>
				<option value='Fiction' disabled selected>Fiction</option>
				<option value='1'>Humor</option>
				<option value='2'>Manga</option>
				<option value='3'>Fitness</option>
				<option value='4'>CyperPunk</option>
			</select>
			<select className='NonFiction'>
				<option value='NonFiction' disabled selected>Non-Fiction</option>
				<option value='1'>Culture</option>
				<option value='2'>Business</option>
				<option value='3'>Education</option>
				<option value='4'>Science</option>
			</select>
			<select className='Monthly'>
				<option value='Monthly' disabled selected>Monthly</option>
				<option value='1'>Culture</option>
				<option value='2'>Business</option>
				<option value='3'>Education</option>
				<option value='4'>Science</option>
			</select>
		</div>
	</div>
);

// style={{ border: '1px red solid' }}
