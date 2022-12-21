import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/Track.css';

// This class is used by both Artist.js and Album.js

export default class TrackList extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		console.log('I was triggered during render');
		console.log("state2", this.props.track);

		
		return (
			
				<div className="text-container">
					<div className="flexbox"><div className="track-title">{this.props.track.strTrack}</div></div>
					
				</div>
				
		);
	}
}
