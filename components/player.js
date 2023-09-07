import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, SafeAreaView, StyleSheet, TouchableWithoutFeedback, Keyboard, FlatList, ScrollView } from 'react-native';
const SpotifyWebApi = require("spotify-web-api-node");

// var spotifyApi = new SpotifyWebApi();


const Player = ({route}) => {
  const {json} = route.params;
  var time = 0
  var index = 0
  const [currentLyric, setCurrentLyric] = useState("");
  const [userInput, setUserInput] = useState("");
 
  useEffect(() => {

    const timer = setInterval(() => {
      time += 100
      if (index < json.lines.length) {
        if (time >= json.lines[index].startTimeMs) {
          setCurrentLyric(json.lines[index].words)
          index +=1;
        }
      }
      console.log(userInput)
    }, 100); // Update every 100 milliseconds

    return () => clearInterval(timer); // Clear the timer when the component unmounts
  }, []);
    
  const getRandomNumber = () => {
    const randomDecimal = Math.random();
    const randomNumber = Math.floor(randomDecimal * 10) + 1;
    return randomNumber;
  };
  
  const tokenizeLine = (line) => {
    return line.split(' ').map((word) => ({
      text: word,
      isBlanked: (getRandomNumber() < 6) ? true:false, // You can add logic here to determine which words to blank out
    }));
  };

  const handleInputChange = (wordIndex, text) => {
    const updatedInput = [...userInput];
    updatedInput[wordIndex] = text;
    setUserInput(updatedInput);
  };


  const renderLine = () => {
    const words = tokenizeLine(currentLyric);
    return words.map((word, wordIndex) => {
      if (word.isBlanked) {
        return (
          <TextInput
            key={wordIndex}
            style={styles.blankedWord}
            placeholder=""
            onSubmitEditing={(text) => handleInputChange(wordIndex, text)}
          />
        );
      } else {
        return <Text style = {styles.lyrics} key={wordIndex}>{word.text} </Text>;
      }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.lyricsContainer}>{renderLine()}</View>
    </SafeAreaView>
  );
  
  // return (
  //   <SafeAreaView style = {styles.container}>
  //     {/* <ScrollView style = {styles.scroll}> */}
  //     <Text style = {styles.lyrics}>{currentLyric}</Text>
  //     {/* </ScrollView> */}
  //   </SafeAreaView>
  // );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      paddingTop: 4,
      justifyContent: 'center',
      textAlignVertical: 'center'
    },
    scroll: {
      flex:1,
      justifyContent: 'center'
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
    },
    blankedWord: {
      borderBottomWidth: 1,
      minWidth: 50,
      marginHorizontal: 4
    }  
  });
//   spotifyApi.setAccessToken('BQBgVNIcpFSyyxadtk_Rm3dtnANXhqOJPz_0xDAQT3kfjOfcx6iuIHiiH-D7dg8kfRZJ86FOfr4V-OhkKqdX7BsCDuY0unJzc05XeC6-mexVFIxu3dE')

//   useEffect(() => {
//     spotifyApi.play({
//       uris: 'spotify:track:2lLG56qpLP3UbcLuzMvkWX',
//       position_ms: 5000
//     })
//     .then(
//       function () {
//         console.log("playing: ", topSongs.data.items[props.index].name);
//       },
//       function (err) {
//         //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
//         console.log("Something went wrong!", err);
//       }
//     );
//   })
  
//   return (
//     <View>
//       <Text>hi there</Text>
//     </View>
//   )



 export default Player;