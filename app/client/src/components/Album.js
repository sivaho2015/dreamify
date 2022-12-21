import React from 'react';
import PageNavbar from './PageNavbar';
import AlbumRow from './AlbumRow';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/Track.css';

// Pulls track list and other album data

export default class Album extends React.Component {

constructor(props) {
  super(props);
  this.state = {
    albumId:"",
    albumData:[],
    albumArt:[]
  };
  
}

componentDidMount() {

  const search = window.location.pathname.split("al=")[1];
  this.state.albumId = search;
  console.log(search);
  this.showAlbum(this.state.albumId);
}

showAlbum(albumId){

  fetch(`https://theaudiodb.com/api/v1/json/523532/album.php?m=${albumId}`,
    {
      method: 'GET' 
    }).then(res => {
      // Convert the response data to a JSON.
      return res.json();
    }, err => {
      // Print the error if there is one.
      console.log(err);
    }).then(albumResp => {
      console.log(albumResp);
      let albumResults = albumResp.album.map((album, i) => {
        return(
          <AlbumRow key={i} album={album} />
        )
     })
     this.setState({
      albumData: albumResults})
    }, err => {
      // Print the error if there is one.
      console.log(err);
    }); 
  }

render() {

  return(

      <div className="Recommendations">
				<PageNavbar active="album" />

			    <div className="container">
			    	<div className="jumbotron">
              <div className="fullWidthContainer">
			    	    
               
                <div className="top-space">
			    		    <div>
                  {this.state.albumData}
			    		    </div>
                </div>
              </div>
			    	</div>
			    </div>
		  </div>

        );
        
    }


}