import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class TrackButton extends React.Component {
	constructor(props) {
		super(props);

		/* props looks like:
		{
			id
			onClick
			genre
		}
		*/
	}

	render() {
		return (

		//	<a href="#" onClick="">Learn More</a>	

			<div className="genre" id={this.props.id} onClick={this.props.onClick}>
			{this.props.idTrack}
			</div>
		);
	}
}
