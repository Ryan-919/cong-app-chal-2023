import React from 'react';
import { FlatList, Text, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import Card from '../styles/card'



const SearchResults = ({route, navigation}) => {  
  const { tracks } = route.params;


  const handlePlaySong = (songId, songUri) =>{
    console.log(songId, songUri)
    fetch("https://spotify-lyric-api.herokuapp.com/?trackid=" + songId, {
      method: 'GET'})
      .then((response) => response.json())
      .then(function(json) {
        console.log(JSON.stringify(json));
        navigation.navigate("Player", {json})
      })
      .catch(function(error) {
        console.log('There has been a problem with your fetch operation: ' + error.message);
          throw error;
        });
  }

  return (
    <SafeAreaView style = {styles.container}>
      <FlatList
        data={tracks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress = {() => handlePlaySong(item.id, item.uri)} >
            <Card>
              <Text>{item.name}</Text>
              <Text>{item.artist}</Text>
            </Card>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 4
  }
});

export default SearchResults;