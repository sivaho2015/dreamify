import React from 'react';
import PageNavbar from './PageNavbar';
import ArtistRow from './ArtistRow';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/Track.css';

export default class Artist extends React.Component {

constructor(props) {
  super(props);
  this.state = {
    artistId:"",
    artistData:[],
    albumData:[]
    
  };
  
}

componentDidMount() {

  const search = window.location.pathname.split("a=")[1];
  this.state.artistId = search;

  this.showArtist(this.state.artistId);
}


showArtist(artistID){

  fetch(`https://theaudiodb.com/api/v1/json/523532/artist.php?i=${artistID}`,
    {
      method: 'GET' 
    }).then(res => {
      // Convert the response data to a JSON.
      return res.json();
    }, err => {
      // Print the error if there is one.
      console.log(err);
    }).then(artistResp => {
      console.log(artistResp);
      let artistResults = artistResp.artists.map((artist, i) => {
        return(
          <ArtistRow key={i} artist={artist} />
        )
     })
     this.setState({
      artistData: artistResults})
    }, err => {
      // Print the error if there is one.
      console.log(err);
    }); 
  }     

render() {

  return(

      <div className="Recommendations">
				<PageNavbar active="artist" />

			    <div className="container">
			    	<div className="jumbotron">
              <div className="fullWidthContainer">
			    		  <div id="results">
                {this.state.artistData}
                <hr />
			    		  </div>
              
                <div id="results2">{this.state.albumData}</div>
              </div>
			    	</div>
			    </div>
		  </div>


    );
        
  }


}