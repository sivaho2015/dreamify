import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/Track.css';
import { Link } from 'react-router-dom';

// This class is used by both Artist.js and Album.js

export default class AlbumRow extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		console.log('I was triggered during render');
		console.log("state2", this.props.album);

		
		return (
			
			<div className="track-container">
				<div className="text-container">
					
					<div className="flexbox sub-head">Artist</div>
					<div className="flexbox artist-name">
						{this.props.album.strArtist}</div>
							<div className="flexbox learn-more"><Link to={{
							pathname: `/artist/a=${this.props.album.idArtist}`,
							state: this.props.idArtist
							}}>Learn More About the artist</Link></div>



					<hr />
					<div className="flexbox sub-head">Album</div>
					<div className="flexbox album-name">{this.props.album.strAlbum}</div>
					<hr />
					<div className="flexbox sub-head">Released</div>
					<div className="flexbox album-name">{this.props.album.intYearReleased}</div>
					<hr />
					<div className="flexbox sub-head">Genre</div>
					<div className="flexbox album-name">{this.props.album.strGenre}</div>
					<hr />
					<div className="flexbox"><p>{this.props.album.strDescriptionEN}</p></div>

				</div>
				
				<div className="track-thumb-container"><img src={this.props.album.strAlbumThumb} /></div>
				
				
			</div>
		);
	}
}
