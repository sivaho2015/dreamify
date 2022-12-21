## Loading data

Using `loader.py` you can pull the full data sets and it will require an **API_KEY**. To get your **API_KEY**, you have to go to AudioDB and sign up for a patron account. 
For grading purposes, if you want to run this without getting your own key, use API KEY: 523532.

### Loading dependencies 

This step requires having Python 3 installed along with the packages found in `requirements.txt`. 

### Spotify Data set

The spotify data ```data.csv``` was mostly cleaned but required few cleaning steps that were also done in ```loader.py```. The cleaned dataset is labelled **data_spotify_cleaned.csv**

In order to make sure all the correct dependencies are set, please install the requirements.txt file. 

### FULL Data set -AUDIODB

- The full data set including null responses: running `loader.py` will result in a larger file including null records with the following naming convention: **final_tracks_YYYY_MM_DD.csv**. 
- **The full data set excluding null responses: [populated_records](final_tracks_2021_03_16.csv)** or ```final_tracks_2021_03_16.csv```

## Parser

The parsing module `parser.py` ingests a file like the `final_tracks_2021_03_16.csv` and then parses the audioDB response object
into its own corresponding columns. 

Check that you are in the right directory and run the following:
1. ```python parser.py```
2. Input is required for the file name, if you have cloned this repo, then the final tracks file can be used as input: ```final_tracks_2021_03_16.csv```
3. Output is saved in a file with the following naming structure: **parsed_audiodb_YYYY_MM_DD.csv** 

## Connecting to DB

The parsed AudioDB and Spotify cleaned dataset has been uploaded to the AWS MySQL instance. To connect, create a ```db-creds.json``` file using the following template:

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


