import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/Track.css';
import { Link } from 'react-router-dom';

export default class TrackRow extends React.Component {
	constructor(props) {
		super(props);
		
	}
	
	render() {
		
		return (
			
			<div className="track-container">
				
					<div className="flexbox sub-head">Artist</div>
					<div className="flexbox artist-name">
						{this.props.track.strArtist}</div>
							<div className="flexbox learn-more"><Link to={{
							pathname: `/artist/a=${this.props.track.idArtist}`,
							state: this.props.idArtist
							}}>Learn More About the artist</Link></div>

					<hr />
					<div className="flexbox sub-head">Track</div>
					<div className="flexbox track-name">{this.props.track.strTrack}</div>
					<hr />
					<div className="flexbox sub-head">Album</div>
					<div className="flexbox album-name">
						{this.props.track.strAlbum}</div>
							<div className="flexbox learn-more"><Link to={{
							pathname: `/album/al=${this.props.track.idAlbum}`,
							state: this.props.idAlbum
							}}>Learn More About the album</Link></div>



					
					<hr />
					<div className="flexbox sub-head">Genre</div>
					<div className="flexbox genre-name">{this.props.track.strGenre}</div>
					<hr />
				
								
			
			</div>
		);
	}
}
