import React, { useState } from 'react';
import { FlatList, View, Text, TextInput, Button, SafeAreaView, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Card from '../styles/card'



const SearchResults = ({route}) => {  
  const { tracks } = route.params;
  return (
    <SafeAreaView style = {styles.container}>
      <FlatList
        data={tracks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card>
            <Text>{item.name}</Text>
            <Text>{item.artist}</Text>
          </Card>
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