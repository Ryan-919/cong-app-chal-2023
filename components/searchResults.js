import React from 'react';
import { FlatList, Text, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import Card from '../styles/card'



const SearchResults = ({route}) => {  
  const { tracks } = route.params;


  const handlePlaySong = (songId, songUri) =>{
    console.log(songId, songUri)
    fetch("https://e25c-107-201-176-27.ngrok-free.app/hello/" + songId, {
      method: 'GET'})
      .then((response) => response.json())
      .then((json) => console.log(JSON.stringify(json)))
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