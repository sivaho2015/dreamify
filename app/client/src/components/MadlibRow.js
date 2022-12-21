import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/Track.css';
import { Link } from 'react-router-dom';


export default class MadlibRow extends React.Component {
	constructor(props) {
		super(props);
		console.log(this.props.song);
	}

	render() {
		return (
			<div className="track-container">

				<div className="albumInfoContainer">

					<div className="flexbox sub-head">Artist</div>
					<div className="flexbox artist-name">
						{this.props.song.artists}</div>
							<div className="flexbox learn-more"><Link to={{
							pathname: `/artist/a=${this.props.song.idArtist}`,
							state: this.props.idArtist
							}}>Learn More About the artist</Link></div>
						<hr />
					<div className="flexbox sub-head">Track</div>
					<div className="flexbox track-name">
						{this.props.song.name}
					</div>
					<div className="flexbox learn-more"><Link to={{
							pathname: `/track/t=${this.props.song.idTrack}`,
							state: this.props.idArtist
							}}>Learn More About the Song</Link></div>
				</div>
				<div className="spotifyContainer">
					<div>	
					<iframe src={"https://open.spotify.com/embed/track/"+this.props.song.spotifyId} width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>

					</div>	

				</div>
			</div>

		);
	}
}