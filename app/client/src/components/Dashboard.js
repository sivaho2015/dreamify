import React from 'react';
import PageNavbar from './PageNavbar';
//import '../style/Dashboard.css';
import '../style/Track.css';
import { Link } from 'react-router-dom';


import 'bootstrap/dist/css/bootstrap.min.css';

export default class Dashboard extends React.Component {
	constructor(props) {
		super(props);
	}
	
	render() {

		return (
			<div className="Recommendations">
				<PageNavbar active="dashboard" />
			    <div className="container">
          			<br></br>
					<div className="jumbotron">
					<div className="project-title">
						Music Recommender
					</div>

					
					<p>This app is a music recommender that provides users with song recommendations whether you know what you want to listen to or not. We have a little something for everyone &ndash; pick the statement that fits you the best.
					</p>
					<hr />
					<div className="heading-lg">I know what I want to hear!</div>
					<p>Ok! Our song/artist search page should be your thing.</p>
					<div className="center-align left-correct">
					<Link className="btn submit-btn" to={{
						pathname: `/search/`,
						}}>Take me to your song search
						</Link>
						</div>
						<hr />
					<div className="heading-lg">I think I might have a general idea of what I want to listen to ... Maybe!</div>
					<p>Sounds like our Mad Libs&reg; feature is right for you. Choose a mood and an activity, and we'll select something good!</p>
					<div className="center-align left-correct">
					<Link className="btn submit-btn" to={{
						pathname: `/madlibs/`,
						}}>Wait ... what's a mad lib?
						</Link>
						</div>
						<hr />
					<div className="heading-lg">I already make too many decisions in life. Make one for me!</div>
					<p>Random song selection coming right up!</p>
					<div className="center-align left-correct">
					<Link className="btn submit-btn" to={{
						pathname: `/lucky/`,
						}}>Just choose to click this button
						</Link>
						</div>
						<hr />
					<div className="heading-lg">I want fun facts!</div>
					<p>Get some interesting data pulled from complex SQL queries ;-)</p>
					<div className="center-align left-correct">
					<Link className="btn submit-btn" to={{
						pathname: `/genre/`,
						}}>I love to learn things
						</Link>
						</div>
					
					
				</div>
			</div>
		</div>
			
		);
	}
}