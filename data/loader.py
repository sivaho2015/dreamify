from datetime import datetime
import json
import pandas as pd
import requests
from urllib import parse
import os 

def fetch_resp_track(artist_name, track_name):
    api_key = os.environ.get("AUDIODB_KEY")
    artist = artist_name.replace(" ", "_")
    track = parse.quote(track_name)
    url = f'''https://theaudiodb.com/api/v1/json/{api_key}/searchtrack.php?s={artist}&t={track}'''
    resp = requests.get(url)
    if resp.status_code == 200:
        try:
            val = resp.json()
            if val["track"]:
                print("success")
                return resp.json()
            else:
                print("none")
                return {"track": None}
                
        except:
            pass

# load spotify data
df_spot = pd.read_csv("data.csv")
#clean artist values
df_spot["artists"] = df_spot["artists"].replace(r"\[|\]|\"", "", regex=True).str.lower().apply(lambda x: x[1: len(x)-1] if x[0] == "'" else x)
df_spot["name"] = df_spot["name"].str.lower()

df_spot.drop_duplicates(inplace=True)
df_spot.to_csv("data_spotify_cleaned.csv", index=False)

# adding full audiodb response for each track/artist 
adb_tracks = []
spot_id = []

# can modify the start and end ranges to do this in chunks and check output results
# recommended splits (start, end): (0, 43597), (43597 87194), (87194, 127194), (127194, 174389)
start = 0
end = df_spot.shape[0]

for i in range(start, end):
    if i%1000 == 0:
        print(f'''Completed {i} records''')
    a = df_spot.artists.values[i]
    n = df_spot.name.values[i]
    value = adb_tracks.append(fetch_resp_track(a, n))
    spot_id.append(df_spot.id.values[i])

print(f'''Length of spotify ids: {len(spot_id)}, 
Length of audio_db tracks pulled: {len(adb_tracks)}''')

adb_spot = list(zip(adb_tracks, spot_id))
df_adb = pd.DataFrame(adb_spot, columns=["track", "spotify_id"])

# save the raw records into a file - change this value to map to the various sections
df_adb.to_csv("adb_total_records_incl_null.csv")

count_not_null = df_adb[~(df_adb["track"].isna()) & ~(df_adb["track"] == {'track': None})].shape[0]
print(f'''Total number of not null transactions are {count_not_null}''')

# save the not null values into full csv
output_file = "final_tracks"+datetime.today().strftime('%Y_%m_%d')+".csv"
df_adb[~(df_adb["track"].isna()) & ~(df_adb["track"] == {'track': None})].to_csv(output_file, index=False)


