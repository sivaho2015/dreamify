import React from 'react';
import PageNavbar from './PageNavbar';
import MadlibRow from './MadlibRow';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/Track.css';
import '../style/Dashboard.css';


export default class Madlib extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			selectedMood: "upbeat",
			selectedActivity: "dance",
			songs: []
		};

		this.submitMoodAndActivity = this.submitMoodAndActivity.bind(this);
		this.handleChangeMood = this.handleChangeMood.bind(this);
		this.handleChangeActivity = this.handleChangeActivity.bind(this);
	}

	handleChangeMood(e) {
		this.setState({
			selectedMood: e.target.value
		});
	}

	handleChangeActivity(e) {
		this.setState({
			selectedActivity: e.target.value
		});
		console.log(e.target.value);
	}


	submitMoodAndActivity() {
		let mood = this.state.selectedMood;
		let activity = this.state.selectedActivity;
	
		fetch("http://localhost:8081/madlibs/" + mood + "/" + activity, 
		{
			method: "GET"
		}).then(res => {
			console.log(res);
			return res.json();
		}, err => {
			console.log(err);
		}).then(songList => {
			let songDivs = songList.map((song, i) =>
			<MadlibRow key={i} song={song}/>
			);

			this.setState({
				songs: songDivs
			});

		});
		}

	render() {

		return (
			<div className="BestGenres">
				<PageNavbar active="madlibs" />

				<div className="container bestgenres-container">
			      <div className="jumbotron">
			        

			        <div className="fullWidthContainer">
					<div className="page-title">MadLibs</div>

					<div className="bodytext">What are Mad Libs&reg;? Much like the classic kids game that asks you to come up with words to create a story, we're asking you to put in your mood and what you feel like doing, and we'll suggest something to listen to! Ready to play?</div>
					<hr />
					
			          <div className="smaller">
						<label>I am looking for&nbsp; </label>
						<select value={this.state.selectedMood} onChange={this.handleChangeMood} className="dropdown" id="moodDropdown">
							<option value="upbeat">upbeat</option>
							<option value="slow">slow</option>
							<option value="loud">loud</option>
							<option value="quiet">quiet</option>
							<option value="happy">happy</option>
							<option value="chill">chill</option>
						</select>
						<label>&nbsp;music that makes me want to&nbsp;</label>
						<select value={this.state.selectedActivity} onChange={this.handleChangeActivity} className="dropdown" id="activityDropdown">
							<option value="dance">dance</option>
							<option value="relax">relax</option>
							<option value="study">study</option>
							<option value="cook">cook</option>
						</select>
						&nbsp;
			            <button className="submit-btn" id="SubmitBtn" onClick={this.submitMoodAndActivity}>Submit</button>
			          </div>
					  <div className="movies-container">
			          <div className="movies-container" id="results">
			            {this.state.songs}
			          </div>
			        </div>


			        </div>
			      </div>
			
			    </div>
			</div>
		);
	}
}