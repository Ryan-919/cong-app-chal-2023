import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, Button, SafeAreaView, StyleSheet, TouchableWithoutFeedback, Keyboard, FlatList, ScrollView } from 'react-native';
const SpotifyWebApi = require("spotify-web-api-node");
import { Audio } from 'expo-av';


const Player = ({route, navigation}) => {
  const {json, songUrl} = route.params;
  var time = 0
  var index = 0
  const [songIndex, setSongIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [sound, setSound] = useState();
  const [wordsIndex, setWordsIndex] = useState(0);
  const [currentLyric, setCurrentLyric] = useState("");
  const [tokenizedLine, setTokenizedLine] = useState([]); // Store the tokenized line
  const [userInput, setUserInput] = useState([]);
  const textInputRefs = useRef([]);
  const [total, setTotal] = useState(0);



  useEffect(() => {
    textInputRefs.current = textInputRefs.current.slice(0, json.lines.length);
  }, [json.lines.length]);


  useEffect(() => {

    const timer = setInterval(() => {
      time += 100
      if (index < json.lines.length) {
        if (time >= json.lines[index].startTimeMs) {
          setCurrentLyric(json.lines[index].words)
          setUserInput(Array(tokenizedLine.length).fill('')); // Initialize userInput array based on tokenized line
          index +=1;
          setSongIndex(index);
          if (tokenizedLine.some(word => word.isBlanked)) {
            textInputRefs.current[index - 1].focus();
          }
        }
      }

    }, 100); // Update every 100 milliseconds

    return () => 
    {clearInterval(timer);
    textInputRefs.current.forEach((ref) => ref.blur()); // Unfocus all TextInputs when the component unmounts
    Keyboard.dismiss(); 
    }
  }, []);

  useEffect(() => {
    playSound();
  }, []);

  useEffect(() => {
    return sound
    ? () => {
        console.log('Unloading Sound');
        sound.unloadAsync();
      }
    : undefined;
  }, [sound])

  async function playSound() {
    console.log('Loading Sound');
    try {
    await Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      staysActiveInBackground: false,
      shouldDuckAndroid: false,
    });

    const { sound } = await Audio.Sound.createAsync( require("../assets/song.mp3"));
    setSound(sound);

    console.log('Playing Sound');
    await sound.playAsync();
  } catch (err) {
    console.log(err.message)
  }
  }
  const getRandomNumber = () => {
    const randomDecimal = Math.random();
    const randomNumber = Math.floor(randomDecimal * 10) + 1;
    return randomNumber;
  };
  
  useEffect(() => {
    if (currentLyric) {
      const tokenized = currentLyric.split(' ').map((word) => ({
        text: word,
        isBlanked: (getRandomNumber() < 6) ? true : false, // You can add logic here to determine which words to blank out
      }));
      setTokenizedLine(tokenized);
    }
  }, [currentLyric]);

  useEffect (() => {
    if (songIndex == json.lines.length) {
      navigation.navigate("Results", {score})
    }
  }, [songIndex])

  const handleInputChange = (wordIndex, text) => {
    const updatedInput = [...userInput];
    updatedInput[wordIndex] = text;
    setUserInput(updatedInput);
    setWordsIndex(wordIndex)
  };

  const handleSubmit = (input, wordIndex) => {
    const expectedWord = tokenizedLine[wordIndex].text;
    if (input == expectedWord) {
      setScore((prevScore) => prevScore+1);
    }
  }


  const renderLine = () => {
    return tokenizedLine.map((word, wordIndex) => {
      if (word.isBlanked) {
        return (
          <TextInput    
            ref={(ref) => (textInputRefs.current[wordIndex] = ref)} // Reference to TextInput
            style={styles.blankedWord}
            placeholder=""
            onChangeText = {(text) => handleInputChange(wordIndex, text)}
            onSubmitEditing = {() => handleSubmit(userInput[wordsIndex], wordsIndex)}
            value={userInput[wordIndex]}
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
      {/* <View style = {styles.container}>
        <Button title="Finished" onPress={navigateToResults} />
      </View> */}
    </SafeAreaView>
  );
  
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

 export default Player;


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