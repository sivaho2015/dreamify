import React from 'react';
import PageNavbar from './PageNavbar';
import BestGenreRow from './BestGenreRow';
import '../style/Track.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class BestGenre extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			selectedDecade: "",
			decades: [],
			genres: []
		};

		this.submitDecade = this.submitDecade.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}
		
	/* ---- Q3a (Best Genres) ---- */
	componentDidMount() {
		fetch("http://localhost:8081/decades",
    {
      method: 'GET' // The type of HTTP request.
    }).then(res => {
      // Convert the response data to a JSON.
      return res.json();
    }, err => {
      // Print the error if there is one.
      console.log(err);
    }).then(decadeList => {
      if (!decadeList) return;
    
      let decadeDivs = decadeList.map((decadeObj, i) =>
      <option value={decadeObj.decade}>{decadeObj.decade} </option>
	  );
	  this.setState({
		decades: decadeDivs
	});
}, err => {
	// Print the error if there is one.
	console.log(err);

});	

}
handleChange(e) {
	this.setState({
		selectedDecade: e.target.value
	});
}
	
	



	/* ---- Q3b (Best Genres) ---- */
	submitDecade() {
	
			fetch("http://localhost:8081/decades/" + this.state.selectedDecade,
			{
				method: "GET"
			}).then(res => {
				return res.json();
			}, err => {
				console.log(err);
			}).then(genresList => {
				if(!genresList) return;
				console.log(genresList); //displays your JSON object in the console
				let genresDivs = genresList.map((genreObj, i) => (
			
					<BestGenreRow
					genre={genreObj.genre}
					avgPopularity={genreObj.avgPopularity}
					name={genreObj.name}
					  />
				));
					
				this.setState({
					genres:genresDivs
				});
			}, err => {
				// Print the error if there is one.
				console.log(err);
			
			});	
	}


	render() {

		return (
			<div className="Recommendations">
				<PageNavbar active="genre" />

				<div className="container">
			    	<div className="jumbotron">
					<div className="fullWidthContainer">
			        <div className="page-title">Best Genres</div>

			        
					<div className="bodytext">Fun facts! Select a decade to see the most popular genres by decade, and then check out a song from that genre and decade.<br /><br /></div>
			          	<div className="dropdown-container">
			            	<select value={this.state.selectedDecade} onChange={this.handleChange} className="dropdown" id="decadesDropdown">
			            	<option select value> -- select an option -- </option>
			            	{this.state.decades}
			            	</select>
			            	<button className="submit-btn" id="decadesSubmitBtn" onClick={this.submitDecade}>Submit</button>
			          	</div>
			        
			        	<div className="movies-container">
							<br /><br />
							<div className="thirds">
							<div className="flexbox sub-head">Genre</div>
							</div>

							<div className="thirds">
							<div className="flexbox sub-head">Average Popularity Rating</div>
							</div>

							<div className="thirds">
							<div className="flexbox sub-head">Recommended Song</div>
							</div>


			          		<div className="movies-container" id="results">
			            	{this.state.genres}
			          		</div>
					  </div>
			        </div>
			      </div>
			    </div>
			</div>
		);
	}
}