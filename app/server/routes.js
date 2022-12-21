var config = require('./db-config.js');
var mysql = require('mysql');

config.connectionLimit = 10;
var connection = mysql.createPool(config);

// Query for the "I'm Feeling Lucky" Feature
function getRandomArtistSong(req, res) {
  var query = `
  SELECT dA.strArtist, T.strTrack, T.idTrack, T.idArtist, T.spotify_id
  FROM music_data.Track T JOIN music_data.dedupArtist dA on T.idArtist = dA.idArtist
  ORDER BY RAND()
  LIMIT 1;
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};

// Query to get songs on album
function getAlbumTracks(req,res) {
  var inputAlbum = req.params.inputAlbum;

  var query = `
  SELECT DISTINCT T.idTrack, T.strTrack, A.idAlbum, A.idArtist, dA.strArtist, A.strAlbum
  FROM Track T JOIN dedupAlbum A on T.idAlbum = A.idAlbum JOIN dedupArtist dA on T.idArtist = dA.idArtist
  WHERE A.idAlbum = '${inputAlbum}';
  `;

  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });

};

// Query to pull spotify ID
function getSpotifyData(req,res) {
  var inputTrack = req.params.inputTrack;
  
  var query = `
  SELECT DISTINCT T.spotify_id as spotifyId
  FROM Track T
  WHERE T.idTrack = '${inputTrack}'
  LIMIT 1;
  `;
  
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
      }
    });
  };

  // Query to pull rec song based on song
  function getNextSong(req,res) {

    var inputTrack = req.params.inputTrack;
  
    var query = `
    WITH AdbTrackData AS (
      SELECT DISTINCT T.strGenre, T.idArtist, T.idTrack, T.strTrack, T.spotify_id
      FROM Track T
      WHERE T.idTrack='${inputTrack}'
  ),
      SpotEnergy AS (
      SELECT DISTINCT S.energy
      FROM Spotify S JOIN AdbTrackData A ON S.id=A.spotify_id
  ),
      AdbGenreArtistSongs AS (
      SELECT DISTINCT T.idTrack, T.strTrack, T.spotify_id, T.idArtist
      FROM Track T, AdbTrackData A
      WHERE (A.strGenre=T.strGenre OR A.idArtist=T.idArtist)
          AND T.idTrack<>A.idTrack
  ),
      SpotDataPool AS (
      SELECT DISTINCT S.id, S.popularity
      FROM Spotify S JOIN SpotEnergy E
      WHERE S.energy <= (E.energy+.15)
      AND S. energy >= (E.energy-.15)
  ),
      TrackPool AS (
      SELECT DISTINCT A.idTrack, A.strTrack, A.spotify_id, A.idArtist
      FROM AdbGenreArtistSongs A JOIN SpotDataPool S ON A.spotify_id = S.id
      ORDER BY S.popularity
      LIMIT 30
  )
  SELECT T.idTrack, T.strTrack, T.idArtist, D.strArtist
  FROM TrackPool T JOIN dedupArtist D ON T.idArtist=D.idArtist
  ORDER BY RAND()
  LIMIT 1;
  `;
  
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
      }
    });
  };
  

function getSearchedArtist(req, res) {
  var inputArtist = req.params.artist;
  console.log(inputArtist);

  var query = `
  SELECT T.strTrack as Song, dA.strArtist as Artist, dA.idArtist, idTrack, spotify_id
    FROM music_data.Track T JOIN music_data.dedupArtist dA on T.idArtist = dA.idArtist
    where strArtist LIKE '%${inputArtist}%'
    UNION
    (SELECT '--' as Song, 'Not Found' as Artist, '--' as idArtist, '--' as idTrack, '--' spotify_id)
    LIMIT 1;`;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      console.log(query);
      console.log(rows);
      res.json(rows);
    }
  });
};

function getSearchedSong(req, res) {
  var inputSong = req.params.song;
  var query = `
  SELECT T.strTrack as Song, dA.strArtist as Artist, dA.idArtist, idTrack, spotify_id
    FROM music_data.Track T JOIN music_data.dedupArtist dA on T.idArtist = dA.idArtist
    where strTrack = '${inputSong}'
    UNION
    (SELECT 'Not Found' as Song, '--' as Artist, '--' as idArtist, '--' as idTrack, '--' as spotify_id)
    LIMIT 1;`;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      console.log(query);
      console.log(rows);
      res.json(rows);
    }
  });
};

function getSearchedPartialSong(req, res) {
  var inputSong = req.params.partialSong;

  var query = `
  SELECT T.strTrack as Song, dA.strArtist as Artist, dA.idArtist, idTrack, spotify_id
    FROM music_data.Track T JOIN music_data.dedupArtist dA on T.idArtist = dA.idArtist
    where strTrack LIKE '%${inputSong}%'
    UNION
    (SELECT 'Not Found' as Song, '--' as Artist, '--' as idArtist, '--' as idTrack, '--' spotify_id)
    LIMIT 1;`;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      console.log(query);
      console.log(rows);
      res.json(rows);
    }
  });
};

/* Query for Madlib section */
function getSongByMoodAndActivity(req, res) {
  var mood = req.params.mood;
  var activity = req.params.activity;
  var query = ``;

  var moodQuery = ``;
  var activityQuery = ``;

  switch (mood) {
    case "upbeat":
      moodQuery = `
      SELECT id, artists, name, idTrack, idArtist, T.spotify_id
      FROM music_data.Spotify S
      INNER JOIN music_data.Track T 
      ON S.id = T.spotify_id
      WHERE T.strMood = 'Energetic' OR strMood = 'Excitable' OR strMood = 'High'
      OR strMood = 'Boisterous' OR strMood = 'Rousing' OR strMood = 'Enlightened'
      ORDER BY danceability DESC
      `;
      break;

    case "slow":
      moodQuery = `
      SELECT id, artists, name, idTrack, idArtist, T.spotify_id
      FROM music_data.Spotify S
      INNER JOIN music_data.Track T 
      ON S.id = T.spotify_id
      WHERE tempo < 50 OR strMood = 'Relaxed'
      `;
      break;

    case "loud":
      moodQuery = `
      SELECT *
      FROM (
        SELECT id, artists, name, idTrack, idArtist, T.spotify_id
        FROM music_data.Spotify S
        INNER JOIN music_data.Track T
        ON S.id = T.spotify_id
        ORDER BY loudness DESC) temp
      `;
      break;

    case "quiet":
      moodQuery = `
      SELECT *
      FROM (
        SELECT id, artists, name, idTrack, idArtist, T.spotify_id
        FROM music_data.Spotify S
        INNER JOIN music_data.Track T
        ON S.id = T.spotify_id
        ORDER BY loudness ASC) temp
      `;
      break;

    case "happy":
      moodQuery = `
      SELECT *
      FROM (
        SELECT id, artists, name, idTrack, idArtist, T.spotify_id
        FROM music_data.Spotify S
        INNER JOIN music_data.Track T
        ON S.id = T.spotify_id
        WHERE valence = 0.8 OR strMood = 'Happy'
        ORDER BY S.valence DESC) temp
      `;
      break;

    case "chill":
      moodQuery = `
      SELECT *
      FROM (
        SELECT id, artists, name, idTrack, idArtist, T.spotify_id
        FROM music_data.Spotify S
        INNER JOIN music_data.Track T
        ON S.id = T.spotify_id
        WHERE speechiness < 0.05 OR strMood = 'Dreamy'
        ORDER BY speechiness) temp
      `;
      break;

    default:
      console.log("no matching mood");
  }
  
  switch (activity) {
    case "dance":
      activityQuery = `
        SELECT *
        FROM (
          SELECT id, artists, name, idTrack, idArtist, T.spotify_id
          FROM music_data.Spotify S
          INNER JOIN music_data.Track T
          ON S.id = T.spotify_id
          WHERE danceability > 0.60 OR strMood = 'Gentle'
          ORDER BY danceability DESC) temp
      `;
      break;

    case "relax":
      activityQuery = `
        SELECT id, artists, name, idTrack, idArtist, T.spotify_id
        FROM music_data.Spotify S
        INNER JOIN music_data.Track T
        ON S.id = T.spotify_id
        WHERE 0.1 > energy OR -25 > loudness OR acousticness > 0.9
      `;
      break;

    case "study":
      activityQuery = `
        SELECT *
        FROM (
          SELECT id, artists, name, idTrack, idArtist, T.spotify_id
          FROM music_data.Spotify S
          INNER JOIN music_data.Track T
          ON S.id = T.spotify_id
          WHERE danceability < 0.3 OR instrumentalness > 0.7 OR acousticness > 0.7
          ORDER BY danceability) temp
      `;
      break;

    case "cook":
      activityQuery = `
        SELECT *
        FROM (
          SELECT id, artists, name, idTrack, idArtist, T.spotify_id
          FROM music_data.Spotify S
          INNER JOIN music_data.Track T
          ON S.id = T.spotify_id
          WHERE 0.35 > energy AND acousticness > 0.8) temp
      `;
      break;

    default:
      console.log("no matching activity");
  }

  query = `
    WITH Mood_CTE (Mid, Martists, Mname, MidTrack, MidArtist, Msid)
    AS (
      ${moodQuery}
    ),
    Activity_CTE (Aid, Aartists, Aname, AidTrack, AidArtist, Asid)
    AS (
      ${activityQuery}
    )
    SELECT DISTINCT Martists AS artists, 
    Mname AS name, 
    MidTrack as idTrack,
    MidArtist as idArtist,
    Msid as spotifyId
    FROM Mood_CTE M
    INNER JOIN Activity_CTE A
    ON Mid = Aid
    ORDER BY RAND()
    LIMIT 1;
  `;
  
  connection.query(query, function (err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};
function getDecades(req, res) {
	var query = `
    SELECT DISTINCT (FLOOR(year/10)*10) AS decade
    FROM (
      SELECT DISTINCT year
      FROM Spotify
      ORDER BY year
    ) y
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
}
/*query for best genre and song per decade */
function bestGenresPerDecade(req, res) {
  var inputDecade = req.params.selectedDecade;
  var query = `
  WITH TEMP AS (  
    select decadeWithPopularityStats.decade as decade, decadeWithPopularityStats.genre as genre, decadeWithPopularityStats.avgPopularity as avgPopularity, decadeWithPopularity.name as name
    from decadeWithPopularity inner join decadeWithPopularityStats
    on decadeWithPopularity.genre=decadeWithPopularityStats.genre and decadeWithPopularity.decade=decadeWithPopularityStats.decade
    where decadeWithPopularity.popularity=decadeWithPopularityStats.maxPopularity and decadeWithPopularity.decade like  '${inputDecade}'
    ),
    CTE AS
        (SELECT decade, genre, avgPopularity, name,  ROW_NUMBER() OVER 
    (PARTITION BY decade,genre,avgPopularity ORDER BY  decade, genre, avgPopularity) RN
        FROM TEMP)
    select decade, genre, avgPopularity, name 
    from CTE 
    where RN<=1
    ORDER BY avgPopularity desc
    limit 10 ;    
    `;
 
 

  // remember to update decade
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });


};
module.exports = {
  getRandomArtistSong: getRandomArtistSong,
  getSpotifyData: getSpotifyData,
  getAlbumTracks: getAlbumTracks,
  getSearchedSong: getSearchedSong,
  getSearchedPartialSong: getSearchedPartialSong,
  getSearchedArtist: getSearchedArtist,
  getSongByMoodAndActivity: getSongByMoodAndActivity,
  getDecades:getDecades,
  bestGenresPerDecade: bestGenresPerDecade,
  getNextSong: getNextSong
}
