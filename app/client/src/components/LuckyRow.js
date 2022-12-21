import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/Track.css';
import { Link } from 'react-router-dom';


export default class LuckyRow extends React.Component {
	constructor(props) {
		super(props);
		
		
	}


	render() {


		return (
			<div className="track-container">
				<div className="bodytext"><hr />Why don't you try listening to ...<br /><br /></div>
				<div className="albumInfoContainer">
				

				<div className="flexbox sub-head">Artist</div>
				<div className="flexbox artist-name">

							{this.props.music.strArtist}</div>
							<div className="flexbox learn-more"><Link to={{
							pathname: `/artist/a=${this.props.music.idArtist}`,
							state: this.props.idArtist
							}}>Learn More About the artist</Link></div>



			

				<hr />
					<div className="flexbox sub-head">Track</div>

					<div className="flexbox track-name">

					{this.props.music.strTrack}
					</div>
					<div className="flexbox learn-more"><Link to={{
							pathname: `/track/t=${this.props.music.idTrack}`,
							state: this.props.idArtist
							}}>Learn More About the Song</Link></div>




					<hr />
					

				</div>
				<div className="spotifyContainer">
					<div>

				<iframe src={"https://open.spotify.com/embed/track/"+this.props.music.spotify_id} width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>

			</div>	
					
              </div>
			</div>

		);
	}
}