import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

// Put a link on it!

export default class SpotifyLink extends React.Component {
	constructor(props) {
		super(props);

			this.state = {
				//showLink: false,
				//url:""
			}
		
	}

	
	render() {
		console.log("spotify-link", this.props.spotify.spotifyId);
		return (
			<div>

				<iframe src={"https://open.spotify.com/embed/track/"+this.props.spotify.spotifyId} width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>

			</div>
		);
	}
}
