
import React, { useState } from 'react';
import { View, Text, TextInput, Button, SafeAreaView, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';

const Home = () => {
  const [songSearch, setSongSearch] = useState('');
  const [genreSearch, setGenreSearch] = useState('');
  const [artistSearch, setArtistSearch] = useState('');
  const [languageSearch, setLanguageSearch] = useState('');

  const handleSearch = () => {
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
          onSubmitEditing={handleSearch}
        />
        <TextInput
          style={styles.input}
          placeholder="Search for an artist..."
          value={artistSearch}
          onChangeText={(text) => setArtistSearch(text)}
          onSubmitEditing={handleSearch}
        />
        <TextInput
          style={styles.input}
          placeholder="Search for a genre..."
          value={genreSearch}
          onChangeText={(text) => setGenreSearch(text)}
          onSubmitEditing={handleSearch}
        />
        <TextInput
          style={styles.input}
          placeholder="Search for a language..."
          value={languageSearch}
          onChangeText={(text) => setLanguageSearch(text)}
          onSubmitEditing={handleSearch}
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