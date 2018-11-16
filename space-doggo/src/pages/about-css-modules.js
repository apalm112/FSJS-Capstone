import React from 'react';
import styles from './about-css-modules.css';
import Container from '../components/container';

const User = props => (
	<div className={styles.user}>
		<img src={props.avatar} className={styles.avatar} alt="missing source" />
		<div className={styles.description}>
			<h2 className={styles.username}>{props.username}</h2>
			<p className={styles.excerpt}>{props.excerpt}</p>
		</div>
	</div>
)

export default () => (
	<Container>
		<h1>About CSS Modules</h1>
		<p>CSS Modules are pretty neat.</p>
		<User
		username="Sally Super"
		avatar="https://s3.amazonaws.com/uifaces/faces/twitter/adellecharles/128.jpg"
		excerpt="I'm Jane Doe chek out my wig. Lorem ipsum dolor sit amet, consectetur adipisicing elit."
	/>

	<User
		username="Bilbo Baggins"
		avatar="https://s3.amazonaws.com/uifaces/faces/twitter/vladarbatov/128.jpg"
		excerpt="I'm Bilbo, I manufacture artisinal wigs. Lorem ipsum dolor sit amet, consectetur adipisicing elit."
	/>
	</Container>
)
