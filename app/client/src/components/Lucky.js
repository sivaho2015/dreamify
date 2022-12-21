import React from 'react';
import PageNavbar from './PageNavbar';
import LuckyRow from './LuckyRow';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/Track.css';



export default class Lucky extends React.Component {
	constructor(props) {
		super(props);

		// State maintained by this React component is the selected movie name,
		// and the list of recommended movies.
		this.state = {
			selectedTrack: "",
			recSong: []

		}

		
		this.submitIds = this.submitIds.bind(this);
	
	}



	submitIds() {
		fetch("http://localhost:8081/feelinglucky",
		{
			method: "GET"
		}).then(res => {
			return res.json();
		}, err => {
			console.log(err);
		}).then(musicList => {
			let musicDivs = musicList.map((music, i) => 
			<LuckyRow key={i} music={music}/>
			
			
				
			);

			this.setState({
				recSong: musicDivs
			});
		});
	}

	
	
	render() {

		console.log("luckyresult",this.state.recSong);

		return (
			<div className="Recommendations">
				<PageNavbar active="lucky" />

			    <div className="container">
			    	<div className="jumbotron">

						<div className="fullWidthContainer">
			    			<div className="page-title">Lucky You</div>
			    			
			    			
								<div className="bodytext">Not sure what you want to listen to? Today's your lucky day! Are you feeling lucky?<br /><br /></div>
								<div className="center-align">
			    				<button id="submitLuckyBtn" className="submit-btn" onClick={this.submitIds}>I'm feeling lucky</button></div>
			    			
			    			<div className="movies-container">
			         			 <div className="movies-container" id="results">
			    		
			    				{this.state.recSong}
								</div>
							
			    			</div>
			    		</div>
					</div>
			    </div>
		    </div>
		);
	}
}
