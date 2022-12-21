import React from 'react';
import PageNavbar from './PageNavbar';
import TrackRow from './TrackRow';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/Track.css';
import SpotifyLink from './SpotifyLink';
import NextTrackRow from './NextTrackRow';


export default class Track extends React.Component {

constructor(props) {
  super(props);
  this.state = {
    trackID: "",
    spotifyId:[],
    trackData:[],
    nextSong:[]    
  };
  
}

componentDidMount() {
    
  const search = window.location.pathname.split("t=")[1];
  this.state.trackID = search;
  this.showTrack(this.state.trackID);
  this.showNextSong(this.state.trackID);

  // pulls spotify information from local DB
  fetch("http://localhost:8081/spotify/" + this.state.trackID)
   .then(results => {
    console.log(results); 
    return results.json();
   }).then(data => {
     let spotifyResults = data.map((spotify, i) => {
       return(
         <SpotifyLink key={i} spotify={spotify} />
       )

  })

  this.setState({
    spotifyId: spotifyResults}, 
      () => console.log("state-local", this.state.spotifyId)
      );

  });
}

showTrack(trackID){

  fetch(`https://theaudiodb.com/api/v1/json/523532/track.php?h=${trackID}`,
    {
      method: 'GET' 
    }).then(res => {
      // Convert the response data to a JSON.
      return res.json();
    }, err => {
      // Print the error if there is one.
      console.log(err);
    }).then(trackResp => {
      let trackResults = trackResp.track.map((track, i) => {
        return(
          <TrackRow key={i} track={track} />
        )
     })
     this.setState({
      trackData: trackResults})
    }, err => {
      // Print the error if there is one.
      console.log(err);
    }); 
}

showNextSong(trackID){
  fetch(`http://localhost:8081/nextsong/${trackID}`,
  {
    method: "GET"
  }).then(res => {
    return res.json();
  }, err => {
    console.log(err);
  }).then(NextSongsList => {
    console.log("Next Song", NextSongsList);

    
      let NextSongsDivs = NextSongsList.map((Track, i) => 
        
      <NextTrackRow key={i} music={Track}/>
      );
      this.setState({
        nextSong: NextSongsDivs
      });




});
}

render() {

  return(

      <div className="Recommendations">
				<PageNavbar active="track" />

			    <div className="container">
			    	<div className="jumbotron">
			    	<div className="fullWidthContainer">
			    		<div className="albumInfoContainer">
                {this.state.trackData}
			    		</div>
              <div className="spotifyContainer">
                {this.state.spotifyId}
              </div>
              <div>{this.state.nextSong}</div>
              </div>
			    	</div>
			    </div>
		    </div>

                );
        
    }


}
