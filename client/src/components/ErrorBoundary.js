// This file creates a reusable ErrorBoundary Component that you can wrap around the entire app.
import React, { Component } from 'react';

export default class ErrorBoundary extends Component {

	state = {
		hasError: false
	};

	componentDidCatch() {
		this.setState({ hasError: true });
	}

	render() {
		if (this.state.hasError) {
			return <h2>Something went wrong, setState has an Error!</h2>
		}
		return this.props.children;
	}
}
