
import React, { useState } from 'react';
import { View, Text, TextInput, Button, SafeAreaView, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
const SpotifyWebApi = require("spotify-web-api-node");

var spotifyApi = new SpotifyWebApi();

const Home = () => {
  const [songSearch, setSongSearch] = useState('');
  const [genreSearch, setGenreSearch] = useState('');
  const [languageSearch, setLanguageSearch] = useState('');

  spotifyApi.setAccessToken("BQAeCkePLY_tIVqTf3_7wicotZHp3qycQeHS_YHmeE1jTLfgJVZKa5G0i3ies9R9sMUcqnMAGPQdniTVd-fgdQeXUgUrwMNIzXti5Dk2XA2NiCrDlDg")


  const handleSearchTrack = (song) => {
    // Implement your search logic here
    spotifyApi.searchTracks(song)
    .then(function(data) {
      console.log('Search by' + song);
      const trackResponse = data.body;
    
      const tracks = trackResponse.tracks.items.map(trackItem => ({
        name: trackItem.name,
        url: trackItem.external_urls.spotify,
        artist: trackItem.artists[0].name,
        id: trackItem.id
      }));
      
      console.log(tracks);
    }, function(err) {
      console.error(JSON.stringify(err));
    });
  };

  const handleSearchGenre = (playlist) => {
    // Implement your search logic here
    spotifyApi.searchPlaylists(playlist)
    .then(function(data) {
      console.log('Search for' + playlist);
      const playlistResponse = data.body;
      const firstPlaylist = playlistResponse.playlists.items[0];
      const playlistInfo = {
        name: firstPlaylist.name,
        url: firstPlaylist.external_urls.spotify,
        id: firstPlaylist.id
      };
      console.log(playlistInfo);

      spotifyApi.getPlaylistTracks(playlistInfo.id)
      .then(function(playlistData) {
        console.log('Some information about this playlist');
        const playlistTrackResponse = playlistData.body;
        const firstTrack = playlistTrackResponse.items[0].track;
        const trackInfo = {
          name: firstTrack.name,
          url: firstTrack.external_urls.spotify,
          artist: firstTrack.artists[0].name,
          id: firstTrack.id
        };
        console.log(trackInfo);
      }, function(err) {
        console.log('Something went wrong!', err);
      });
    }, function(err) {
      console.error(JSON.stringify(err));
    });
  };

  const handleSearchLanguage = () => {
    // Implement your search logic here
  };

  const handleRandomSong = () => {
    // Implement logic to suggest a random song
  };

  return (
    <TouchableWithoutFeedback onPress = {Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.header}>
          Welcome to the Song Lyrics Game!
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Search for songs..."
          value={songSearch}
          onChangeText={(text) => setSongSearch(text)}
          onSubmitEditing={() => handleSearchTrack(songSearch)}
        />
        <TextInput
          style={styles.input}
          placeholder="Search for a genre..."
          value={genreSearch}
          onChangeText={(text) => setGenreSearch(text)}
          onSubmitEditing={() => handleSearchGenre(genreSearch)}
        />
        <TextInput
          style={styles.input}
          placeholder="Search for a language..."
          value={languageSearch}
          onChangeText={(text) => setLanguageSearch(text)}
          onSubmitEditing={handleSearchLanguage}
        />
        <Button title="Suggest Random Song" onPress={handleRandomSong} />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 4
  },
  header: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    marginRight: 10,
    marginLeft: 10
  },
});

export default Home;