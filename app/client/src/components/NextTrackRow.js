import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/Track.css';
import { Link } from 'react-router-dom';


export default class NextTrackRow extends React.Component {
	constructor(props) {
		super(props);
		
		
	}


	render() {
	const linkNum = this.props.music.idTrack;

		return (
			<div className="track-container">
				<br /><br />
				<div className="h5">If you like this song, you might also like ...<br /><br /></div>
				
				
			

				<div className="halves">
					<div className="flexbox sub-head">Track</div>

					<div className="sub-name">

					{this.props.music.strTrack}
					</div>
					<div className="flexbox learn-more"><a href={"/track/t=" + this.props.music.idTrack}>Learn More About the Song</a></div>
							




</div>
<div className="halves">
				<div className="flexbox sub-head">Artist</div>
				<div className="sub-name">

							{this.props.music.strArtist}</div>
							<div className="flexbox learn-more"><Link to={{
							pathname: `/artist/a=${this.props.music.idArtist}`,
							state: this.props.idArtist
							}}>Learn More About the artist</Link></div>



				</div>

				</div>
				
			

		);
	}
}