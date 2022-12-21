import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class BestGenreRow extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="track-container">

				
				<div className="thirds">
					<div>{this.props.genre}</div>
					</div>

					<div className="thirds">
					<div>{this.props.avgPopularity}</div>
					</div>

					<div className="thirds">
					<div className="caps">{this.props.name}</div>
					</div>
				
				
			</div>
		);
	}
}
