import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

// Put a link on it!

export default class TextLink extends React.Component {
	constructor(props) {
		super(props);

			this.state = {
				//showLink: false,
				//url:""
			}
		
	}

	
	render() {
		return (
			<div>
			<a href={"http://"+this.props.url} target="_blank" rel="noopener noreferrer">{this.props.url}</a>
			</div>
		);
	}
}
