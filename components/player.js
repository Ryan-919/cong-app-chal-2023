import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, SafeAreaView, StyleSheet, TouchableWithoutFeedback, Keyboard, FlatList, ScrollView } from 'react-native';
const SpotifyWebApi = require("spotify-web-api-node");

// var spotifyApi = new SpotifyWebApi();


const Player = ({route}) => {
  const {json} = route.params;
  
  const [currentTime, setCurrentTime] = useState(0);
  
    useEffect(() => {

      
      const startTime = Date.now()
  
      const timer = setInterval(() => {
        const currentTimeMs = Date.now() - startTime;
        setCurrentTime(currentTimeMs);
        console.log(currentTime)
      }, 100); // Update every 100 milliseconds
  
      return () => clearInterval(timer); // Clear the timer when the component unmounts
    });
  
    const getCurrentLyricIndex = () => {

      for (let i = 0; i < json.lines.length; i++) {
        const startTimeMs = parseInt(json.lines[i].startTimeMs);
        
        if (currentTime >= startTimeMs) {
          return i;
        }
      }
  
      return json.lines.length - 1;
    };
  
    const currentLyricIndex = getCurrentLyricIndex();
  
    return (
      <SafeAreaView style = {styles.container}>
        <ScrollView>
        {json.lines.slice(currentLyricIndex).map((line, index) => (
          <Text key={index}>{JSON.stringify(line.words)}</Text>
        ))}
        </ScrollView>
      </SafeAreaView>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      paddingTop: 4
    }});
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