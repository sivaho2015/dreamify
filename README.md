# Dreamify - Music Recommender App
The app is a music recommender that provides users with song recommendations based on user inputs. 

-------------------------------------------
TEAM MEMBERS
-------------------------------------------

Mumtahin Monzoor<br>
Hollis Cooper<br>
Xinyi Che Samore<br>
Siva Ho

-------------------------------------------
PROJECT TOPIC
-------------------------------------------
Music Recommender<br>
The app is a music recommender that provides users with song recommendations based on user inputs

-------------------------------------------
CODE BREAKDOWN
-------------------------------------------
All code needed for ingesting, cleaning, and wrangling data can be found under `/data/` folder. 

All application code can be found in `/app/` folder. 

-------------------------------------------
Usage
-------------------------------------------
## Table of Content
1. Fetching Data
2. Populating the Database
3. Running the Application

### Fetching data 

1. Fetch an API key from AudioDB (or use ours: 523532)
2. Save API key as an os variable so the python modules in `/data` can use it. We have saved it in our `.bashrc` file with the following command: 
```export AUDIODB_KEY="<key>"``` 
3. Navigate to `/data/` and run `pip install -r requirments.txt`
4. Run `python loader.py` : loads Spotify and makes API requests to AudioDB. Puts intermediate results into a file of the format **final_tracks_YYYY_MM-DD.csv**
5. Run `python parser.py`: Takes the intermediate data from above step as an input file. Outputs the final as a csv in the format of **parsed_audiodb_YYYY_MM_DD.csv**. 

### Populating the Database

#### 1. Create AudioDB and Spotify Tables

Create two main tables holding the two data sources using the following CSVs: 

1. Spotify Table - Use **data_spotify_cleaned.csv** 
2. AudioDB Table - Use **parsed_audiodb_2021_03_29.csv** 

~~~~sql

create table Spotify
(
	acousticness double null,
	artists varchar(64) null,
	danceability double null,
	duration_ms int null,
	energy double null,
	explicit int null,
	id varchar(64) not null
		primary key,
	instrumentalness double null,
	`key` int null,
	liveness double null,
	loudness double null,
	mode int null,
	name text null,
	popularity int null,
	release_date varchar(64) null,
	speechiness double null,
	tempo double null,
	valence double null,
	year int null
);

create table AudioDB
(
	spotify_id varchar(64) not null,
	idTrack int not null,
	idAlbum int null,
	idArtist int null,
	idLyric int null,
	idIMVDB text null,
	strTrack text null,
	strAlbum text null,
	strArtist text null,
	strArtistAlternate text null,
	intCD int null,
	intDuration int null,
	strGenre text null,
	strMood text null,
	strStyle text null,
	strTheme text null,
	strDescriptionEN text null,
	strTrackThumb text null,
	strTrack3DCase text null,
	strTrackLyrics text null,
	strMusicVid text null,
	strMusicVidDirector text null,
	strMusicVidCompany text null,
	strMusicVidScreen1 text null,
	strMusicVidScreen2 text null,
	strMusicVidScreen3 text null,
	intMusicVidViews text null,
	intMusicVidLikes text null,
	intMusicVidDislikes text null,
	intMusicVidFavorites text null,
	intMusicVidComments text null,
	intTrackNumber int null,
	intLoved int null,
	intScore int null,
	intScoreVotes int null,
	intTotalListeners int null,
	intTotalPlays int null,
	strMusicBrainzID text null,
	strMusicBrainzAlbumID text null,
	strMusicBrainzArtistID text null,
	strLocked text null,
	primary key (spotify_id, idTrack),
    FOREIGN KEY (spotify_id) REFERENCES Spotify(id)
);
~~~~
#### 2. Create Smaller tables 

Decompose the bigger tables into smaller ones for **Application** usage purposes:

~~~~sql

CREATE TABLE Artist AS 
SELECT DISTINCT idArtist, strArtist, strArtistAlternate 
FROM AudioDB;
​
CREATE TABLE dedupArtist AS 
    with cte AS (
        SELECT*,
            row_number() OVER (PARTITION BY idArtist, strArtist ORDER BY strArtistAlternate desc) AS rn  from Artist)
            select * from  cte where rn=1;
        SELECT idArtist, count(idArtist) from dedupArtist group by idArtist having count(idArtist)>1;
        SELECT * FROM dedupArtist where idArtist=111456;
        SET SQL_SAFE_UPDATES = 0;
        DELETE FROM dedupArtist WHERE idArtist=111456 AND strArtist='Marvin Gaye';
        SET SQL_SAFE_UPDATES = 1;
        ALTER TABLE dedupArtist
        ADD PRIMARY KEY (idArtist);
ALTER TABLE dedupArtist DROP rn;

CREATE TABLE Album AS 
SELECT DISTINCT idAlbum, idArtist, strAlbum 
FROM AudioDB;
​
​CREATE TABLE dedupAlbum AS 
    with cte AS (
        SELECT*,
            row_number() OVER (PARTITION BY idAlbum ORDER BY idArtist, strAlbum desc) AS rn  from Album)
        select * from  cte where rn=1;
ALTER TABLE dedupAlbum ADD PRIMARY KEY (idAlbum);
ALTER TABLE dedupAlbum ADD FOREIGN KEY (idArtist) REFERENCES dedupArtist(idArtist);
ALTER TABLE dedupAlbum DROP rn;
​
CREATE TABLE Track AS 
    SELECT spotify_id, 
            idTrack, 
            idAlbum,
            idArtist,
            idLyric,
            idIMVDB,
            strTrack,
            intDuration,
            strGenre,
            strMood,
            strStyle,
            strTheme,
            strDescriptionEN,
            strTrackThumb,
            strTrack3DCase,
            intTrackNumber,
            intLoved,
            intTotalListeners,
            intTotalPlays
    FROM AudioDB;
ALTER TABLE Track ADD FOREIGN KEY (idArtist) REFERENCES dedupArtist(idArtist);
ALTER TABLE Track ADD FOREIGN KEY (idAlbum) REFERENCES dedupAlbum(idAlbum);
​
/*Below are the tables for optimizing bestGenres query*/
CREATE TABLE yearWithPopularity AS(
        SELECT 
            Spotify.id as id, Spotify.name as name, Spotify.popularity as popularity, Spotify.year as year, Track.strGenre as genre
        from Spotify inner join Track
        on Spotify.id=Track.spotify_id
    where Track.strGenre is not null and Track.strGenre <>'...');
  
create table decadeWithPopularity as(
    select yearWithPopularity.id as id, yearWithPopularity.name as name, yearWithPopularity.popularity as popularity, FLOOR(yearWithPopularity.year/10)*10 as decade, yearWithPopularity.genre as genre
from yearWithPopularity);
​

create table decadeWithPopularityStats as (
    select decadeWithPopularity.decade as decade, decadeWithPopularity.genre as genre, round(avg(decadeWithPopularity.popularity),0) as avgPopularity, max(decadeWithPopularity.popularity) as maxPopularity
from decadeWithPopularity
group by decadeWithPopularity.decade, decadeWithPopularity.genre);
~~~~

### Running the Application

1. Navigate to `/app/`folder and make sure Node.JS must be installed on your local computer. 
2. Go to `app/server` and create a `db-config.js` file. 
3. In the `db-config.js` file, create the following template:
```js
// Private. Will not be included in submission
module.exports = {
    host: "",
    port: "",
    user: "",
    password: "",
    database: ""
  };
```
4. Fill in the appropriate values with the correct AWS credentials.
5. In both `/client/` and `/server/` directories, run `npm install`. 
6. Welcome to our app! Hope you have fun navigating. 

Note: Because of size, please keep the node_modules in your .gitignore file. For security, also keep the db-config in your .gitignore file.
