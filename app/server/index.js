const bodyParser = require('body-parser');
const express = require('express');
var routes = require("./routes.js");
const cors = require('cors');

const app = express();

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/feelinglucky', routes.getRandomArtistSong);
app.get('/search/artist/:artist', routes.getSearchedArtist);
app.get('/spotify/:inputTrack', routes.getSpotifyData);
app.get('/search/song/:song', routes.getSearchedSong);
app.get('/search/psong/:partialSong', routes.getSearchedPartialSong);
app.get('/madlibs/:mood/:activity', routes.getSongByMoodAndActivity);
app.get('/album/:inputAlbum', routes.getAlbumTracks);
app.get('/decades', routes.getDecades);
app.get('/decades/:selectedDecade', routes.bestGenresPerDecade);
app.get('/nextsong/:inputTrack', routes.getNextSong);

app.listen(8081, () => {
	console.log(`Server listening on PORT 8081`);
});
