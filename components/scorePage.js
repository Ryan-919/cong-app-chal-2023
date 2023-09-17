import React, { useState } from 'react';
import { View, Text, TextInput, Button, SafeAreaView, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';



const ScorePage = ({route}) => {

  const {score} = route.params;

  return (
    <SafeAreaView>
      <Text>You got {score} words correct</Text>
    </SafeAreaView>
  )
}

export default ScorePage;