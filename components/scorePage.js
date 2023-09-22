import React, { useState } from 'react';
import { View, Text, TextInput, Button, SafeAreaView, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';



const ScorePage = ({navigation, route}) => {

  const {score, total, json, songUrl} = route.params;

  return (
    <SafeAreaView style = {styles.container}>
      <View style = {styles.lyricsContainer}>
        <Text style = {styles.lyrics}>You got {score} out of {total} words correct</Text>
      </View>
      <Button title = "Try Again" onPress={() => navigation.navigate("Player", {json, songUrl})} />
      <Button title="Finish" onPress={() => navigation.popToTop()} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 4,
    justifyContent: 'center',
    textAlignVertical: 'center'
  },
  lyrics: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 16,
  },
  lyricsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default ScorePage;