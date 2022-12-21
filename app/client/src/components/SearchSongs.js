import React from 'react';
import PageNavbar from './PageNavbar';
import '../style/Track.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

export default class SearchSongs extends React.Component {
	constructor(props) {
		super(props);

		// State maintained by this React component is the inputted song,
		// and the list of Songs of that song.
		this.state = {
			song: "",
			artist: "",
			partialSong: "",
			spotifyID: "",
			foundSongs: [],
			foundArtists: [],
			foundPartialSongs: []

		}
		/*Handling song change */
		this.handlesongChange = this.handlesongChange.bind(this);
		this.submitsong = this.submitsong.bind(this);
		/*Handling partial song change */
		this.handlePartialSongChange = this.handlePartialSongChange.bind(this);
		this.submitPartialSong = this.submitPartialSong.bind(this);
		/*Handling artist change */
		this.handleArtistChange = this.handleArtistChange.bind(this);
		this.submitArtist = this.submitArtist.bind(this);

		this.showSpotify = this.showSpotify.bind(this);


	}

	handlesongChange(e) {
        //console.log(e.target.value);
		this.setState({
			song: e.target.value
		});
	}

	handleArtistChange(e) {
        //console.log(e.target.value);
		this.setState({
			artist: e.target.value
		});
	}

	handlePartialSongChange(e) {
        //console.log(e.target.value);
		this.setState({
			partialSong: e.target.value
		});
	}
	
	showSpotify(spotify_id){
		const frame = `<iframe src="https://open.spotify.com/embed/track/${spotify_id}" width="300px" height="80px" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>`
		return <div dangerouslySetInnerHTML={{ __html: frame}} />;  
	}
	  
	submitsong() {
		/* ---- Part 2 (FindSongs) ---- */
		
		//Name of song submitted is contained in `this.state.song`.
	
		fetch(`http://localhost:8081/search/song/${this.state.song}`,
		{
			method: "GET"
		}).then(res => {
			return res.json();
		}, err => {
			console.log(err);
		}).then(SongsList => {
			console.log("Songs list", SongsList); //displays your JSON object in the console
			
			if(SongsList[0].Song !== 'Not Found'){
				let SongsDivs = SongsList.map((Song, i) => 
					
      			<div key={i}>
					  <br /><br />
                    <div class="thirds">
					<div className="sub-head">Song</div>
					<div className="track-name">{Song.Song}</div>
					<div className="flexbox learn-more"><Link target="_blank" to={{
							pathname: `/track/t=${Song.idTrack}`,
							state: this.props.idTrack
						}}>
						Learn more about the song</Link>
						</div>
					</div>
					<div class="thirds">
					<div className="sub-head">Artist</div>
					<div className="artist-name">{Song.Artist}</div> 
					<div className="flexbox learn-more"><Link target="_blank" to={{
							pathname: `/artist/a=${Song.idArtist}`,
							state: this.props.idArtist
						}}>
						Learn more about the artist</Link>
						</div>
					</div>
					<div class="thirds">
					<div className="sub-head">Listen</div>
					<br />	{this.showSpotify(Song.spotify_id)}
					</div>
        		</div>
				);

				//This saves our HTML representation of the data into the state, which we can call in our render function
				this.setState({
					foundSongs: SongsDivs
				});
				
			}
			else{
				let SongsDivs = SongsList.map((Song, i) => 
				/* ---- Part 2 (FindSongs) ---- */
				// TODO: (6) - Complete the HTML for this map function
      			<div key={i}>
					  <br /><br />
                	<div class="thirds">
					<div className="sub-head">Song</div>
					<div className="track-name">{Song.Song}</div></div>
					<div class="thirds">
					<div className="sub-head"><div className="artist-name">Artist</div></div>
					{Song.Artist}</div>
        		</div>
				);

				//This saves our HTML representation of the data into the state, which we can call in our render function
				this.setState({
					foundSongs: SongsDivs
				})
				
			}
			
		});
	}
	submitArtist() {
		/* ---- (Find Partial Songs) ---- */
			
		fetch(`http://localhost:8081/search/artist/${this.state.artist}`,
		{
			method: "GET"
		}).then(res => {
			return res.json();
		}, err => {
			console.log(err);
		}).then(artistList => {
			console.log("artist list", artistList); //displays your JSON object in the console
			
			if(artistList[0].Artist !== 'Not Found'){
				let artistDivs = artistList.map((Artist, i) => 
	
      			<div key={i}>
					  <br /><br />
                    <div class="thirds">
					<div className="sub-head">Song</div>
					<div className="track-name">
					{Artist.Song}</div>
					<div className="flexbox learn-more"><Link target="_blank" to={{
							pathname: `/track/t=${Artist.idTrack}`,
							state: this.props.idTrack
						}}>
						Learn more about the song</Link>
						</div>
					</div>
					<div class="thirds">
					<div className="sub-head">Artist</div>
					<div className="artist-name">{Artist.Artist}</div>  
					<div className="flexbox learn-more"><Link target="_blank" to={{
							pathname: `/artist/a=${Artist.idArtist}`,
							state: this.props.idArtist
						}}>
						Learn more about the artist</Link>
						</div>
					</div>
					<div class="thirds">
						<div className="sub-head">Listen</div>
					<br />
						{this.showSpotify(Artist.spotify_id)}
					</div>
				</div>
				);

				//This saves our HTML representation of the data into the state, which we can call in our render function
				this.setState({
					foundArtists: artistDivs
				});
			}
			else{
				let artistDivs = artistList.map((Artist, i) => 
				/* ---- Part 2 (FindSongs) ---- */
				// TODO: (6) - Complete the HTML for this map function
      			<div key={i}>
					  <br /><br />
                    <div class="thirds">
					<div className="sub-head">Song</div>
					<div className="track-name">{Artist.Song}</div></div>
					<div class="thirds">
					<div className="sub-head">Artist</div><div className="artist-name">
					{Artist.Artist}</div></div>
        		</div>
				);

				//This saves our HTML representation of the data into the state, which we can call in our render function
				this.setState({
					foundArtists: artistDivs
				});
			}
			
		});
	}


	submitPartialSong() {
		console.log("here");			
		fetch(`http://localhost:8081/search/psong/${this.state.partialSong}`,
		{
			method: "GET"
		}).then(res => {
			return res.json();
		}, err => {
			console.log(err);
		}).then(partialSongList => {
			console.log("Songs list", partialSongList[0].Song); //displays your JSON object in the console
			if(partialSongList[0].Song !== 'Not Found'){

				let PartialSongsDivs = partialSongList.map((Song, i) =>
				<div key={i}>
					<br /><br />
					<div class="thirds">
					<div className="sub-head">Song</div>
					<div className="track-name">
					{Song.Song}</div>
					<div className="flexbox learn-more"><Link target="_blank" to={{
							pathname: `/track/t=${Song.idTrack}`,
							state: this.props.idTrack
						}}>
						Learn more about the song</Link>
					</div></div>
					<div class="thirds"> 
					<div className="sub-head">Artist</div>
					<div className="artist-name">
					{Song.Artist}</div>
							<div className="flexbox learn-more"><Link target="_blank" to={{
							pathname: `/artist/a=${Song.idArtist}`,
							state: this.props.idArtist
						}}>Learn More About the artist</Link></div>

					</div>
					<div class="thirds">
					<div className="sub-head">Listen</div>
					<br />
						{this.showSpotify(Song.spotify_id)}
					</div>
				</div>
				);
	
				//This saves our HTML representation of the data into the state, which we can call in our render function
				this.setState({
					foundPartialSongs: PartialSongsDivs
				});

			}
			else{
				let PartialSongsDivs = partialSongList.map((Song, i) => 
      			<div key={i}>
					  <br /><br />
                	<div class="thirds"><div className="sub-head">Song</div><div className="track-name">{Song.Song}</div></div>
					<div class="thirds"><div className="sub-head">Artist</div><div className="artist-name">{Song.Artist}</div></div>
        		</div>
				);

				//This saves our HTML representation of the data into the state, which we can call in our render function
				this.setState({
					foundPartialSongs: PartialSongsDivs
				})
				
			}
		});
	}

	
	render() {

		return (
			<div className="Recommendations">
				<PageNavbar active="search" />
				<div className="container">

			    <div className="jumbotron">
          			
					  <div className="fullWidthContainer">
						<div className="page-title">Search</div>
						<div className="bodytext">This is the feature for the determined type ... you know what you want to listen to, and you want to do it now! Whether you're looking for a specific song or artist, let us help you find it.</div>
						<hr />

						<div className="h5">Search a <b>Specific</b> Song Title!</div>
						<p>Input the name of a song you like, and we will try to return an exact match!</p>
						
						<div>
							<input type='text' placeholder="Everlong" value={this.state.song} onChange={this.handlesongChange} id="movieName" className="song-input"/>
					
					
							{/* ---- (FindSongs) ---- */}
					
							<button id="submitSongBtn" className="submit-btn" onClick={this.submitsong}>Submit</button>
						</div>
						
						
						<div>
						
							{this.state.foundSongs}
						
						</div>
						<hr />

						<br></br>
						<div className="h5">Search an <b>Artist</b>!</div>
						<p>Want a song recommendation from your favorite artist? Search it here!</p>
						<div>
							<input type='text' placeholder="Taylor Swift" value={this.state.artist} onChange={this.handleArtistChange} id="movieName" className="artist-input"/>
							{/* ---- (Find Artist) ---- */}
						
							<button id="submitArtistBtn" className="submit-btn" onClick={this.submitArtist}>Submit</button>
						</div>
					

						<div className="track-container">
							{this.state.foundArtists}
						</div>
						<hr />
						<br></br>
						<div className="h5">Search a <b>Partial</b> Song!</div>
						<p>Don't know the exact mactch of your song? Find a partial match instead!</p>

						<div>
							<input type='text' placeholder="ever" value={this.state.partialSong} onChange={this.handlePartialSongChange} id="movieName" className="partial-song-input"/>
							{/* ---- (Find Partial Songs) ---- */}
						
							<button id="submitPartialBtn" className="submit-btn" onClick={this.submitPartialSong}>Submit</button>
						</div>
						

					<div className="track-container" id="results">
						{this.state.foundPartialSongs}
					</div>
					
				</div>
			</div>
		</div>
			</div>
		);
	}
}