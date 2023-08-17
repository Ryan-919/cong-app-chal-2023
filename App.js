import { StatusBar } from 'expo-status-bar';
import { StyleSheet, SafeAreaView } from 'react-native';
import Home from './components/home';
import Player from './components/player';
import ScorePage from './components/scorePage';
import SearchResults from './components/searchResults';

export default function App() {

  return (
    <SafeAreaView style = {styles.wrapper}>
      <Home/>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
