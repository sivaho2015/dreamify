import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/Track.css';
import TextLink from './TextLink';



export default class ArtistRow extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		console.log('I was triggered during render');
		console.log("state2", this.props.artist);

		
		return (
			
			<div className="track-container">
				<div className="text-container">
					<div className="flexbox sub-head">Artist</div>
					<div className="flexbox artist-name">{this.props.artist.strArtist}</div>
					<hr />
					<div className="flexbox sub-head">Year Formed</div>
					<div className="flexbox track-name">{this.props.artist.intFormedYear}</div>
					<hr />
					<div className="flexbox sub-head">Biography</div>
					<div className="flexbox">
						<div className="smaller">{this.props.artist.strBiographyEN}</div>
					</div>
					<hr />
					<div className="flexbox sub-head">Website</div>
					<div className="flexbox">
						<div className="smaller">
							<TextLink url={this.props.artist.strWebsite} />
						
						</div>
					</div>
						
				
				</div>
				<div className="track-thumb-container">
					<img src={this.props.artist.strArtistLogo} />
				</div>
				
			
			</div>
		);
	}
}
