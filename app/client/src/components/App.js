import React from 'react';
import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';
import Dashboard from './Dashboard';
import Lucky from './Lucky';
import Madlib from './Madlib';
import Album from './Album';
import Track from './Track';
import Artist from './Artist';
import Genre from './BestGenres';
import Search from './SearchSongs';



export default class App extends React.Component {

	render() {
		return (
			<div className="App">
				<Router>
					<Switch>
						<Route
							exact
							path="/"
							render={() => (
								<Dashboard />
							)}
						/>
						<Route
							exact
							path="/dashboard"
							render={() => (
								<Dashboard />
							)}
						/>
						<Route
							exact
							path="/search"
							render={() => (
								<Search />
							)}
						/>
						<Route
							path="/lucky"
							render={() => (
								<Lucky />
							)}
						/>
						<Route
							path="/madlibs"
							render={() => (
								<Madlib />
							)}
						/>
						<Route
							path="/track"
							render={() => (
								<Track />
							)}
						/>
						<Route
							path="/album"
							render={() => (
								<Album />
							)}
						/>
						<Route
							path="/artist"
							render={() => (
								<Artist />
							)}
						/>
						<Route
							path="/genre"
							render={() => (
								<Genre />
							)}
						/>
					</Switch>
				</Router>
			</div>
		);
	}
}
