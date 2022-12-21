import ast
from datetime import datetime
from os import path
import pandas as pd 

def parser(parser_file):
    raw_df = pd.read_csv(parser_file)
    df_parsed = raw_df.copy()

    # take the column with raw response from Audio DB and cast as dict
    df_parsed["track_dict"] = df_parsed.track.apply(lambda x: ast.literal_eval(x)["track"][0])

    #using the audio db documentation, take the list of columns and populate by expanding dict object
    df_parsed[['idTrack', 'idAlbum', 'idArtist', 'idLyric', 'idIMVDB', 'strTrack',
       'strAlbum', 'strArtist', 'strArtistAlternate', 'intCD', 'intDuration',
       'strGenre', 'strMood', 'strStyle', 'strTheme', 'strDescriptionEN',
       'strTrackThumb', 'strTrack3DCase', 'strTrackLyrics', 'strMusicVid',
       'strMusicVidDirector', 'strMusicVidCompany', 'strMusicVidScreen1',
       'strMusicVidScreen2', 'strMusicVidScreen3', 'intMusicVidViews',
       'intMusicVidLikes', 'intMusicVidDislikes', 'intMusicVidFavorites',
       'intMusicVidComments', 'intTrackNumber', 'intLoved', 'intScore',
       'intScoreVotes', 'intTotalListeners', 'intTotalPlays',
       'strMusicBrainzID', 'strMusicBrainzAlbumID', 'strMusicBrainzArtistID',
       'strLocked']] = df_parsed["track_dict"].apply(pd.Series)
    
    # drop columns with raw data or intermediary structures like dict objects
    df_parsed.drop(columns=["track", "track_dict"], axis=1, inplace=True)
    print(f'''Sample parsed dataframe: {df_parsed.head()}''')
    assert df_parsed.shape[0] == raw_df.shape[0]
    return df_parsed 

if __name__=="__main__": 
    # change this to parse a different file
    parser_file =  input("Please provide filename to parse (e.g. raw_data.csv) ")

    if path.exists(parser_file):
        start = datetime.now()
        df = parser(parser_file)
        output_file = "parsed_audiodb_"+datetime.today().strftime('%Y_%m_%d')+".csv"
        df.to_csv(output_file, index=False)
        end = datetime.now()
        print(f'''Total execution time:{((end-start).total_seconds())} seconds''')
    else:
        raise ValueError("The file you have entered doesn't exist in the directory.")