import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableHighlight, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {BlurView} from '@react-native-community/blur';

export default function Home({navigation}) {
  const [score, setScore] = useState(0);
  const [continent, setContinent] = useState('All Continents');
  const [continentsSelect, setContinentsSelect] = useState(false);
  const [languagesSelect, setLanguagesSelect] = useState(false);

  const getScore = async () => {
    try {
      const value = await AsyncStorage.getItem('score');
      setScore(value ? value : 0);
    } catch (e) {
      console.log(`Something went wrong: ${e}`);
    }
  };

  useEffect(() => {
    getScore();
  }, []);

  let selectView = null;
  if (continentsSelect) {
    selectView = (
      <View style={styles.absolute}>
        <BlurView
          style={styles.absolute}
          blurType="light"
          blurAmount={20}
          reducedTransparencyFallbackColor="white"
        />
        <View style={styles.blurView}>
          <TouchableHighlight
            onPress={() => setMenuOpen(false)}
            style={styles.selectViewButtons}>
            <Text style={styles.btnText}>Resume</Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => handleRestart()}
            style={styles.selectViewButtons}>
            <Text style={styles.btnText}>Restart</Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => navigation.reset({routes: [{name: 'Home'}]})}
            style={styles.selectViewButtons}>
            <Text style={styles.btnText}>Main Menu</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.topArea}>
        <Text style={styles.scoreText}>Highest Score</Text>
        <Text style={styles.score}>{score}</Text>
        <TouchableOpacity onPress={() => setContinentsSelect(true)}>
          <Text>{continent}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonsView}>
        <TouchableHighlight
          onPress={() => navigation.navigate('Game', {score: score})}
          style={styles.homeButtons}>
          <Text style={styles.btnText}>Play</Text>
        </TouchableHighlight>
      </View>
      <View style={styles.adView} />
      {selectView}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFB041',
    paddingHorizontal: '5%',
  },
  topArea: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'green',
  },
  scoreText: {
    fontSize: 30,
  },
  score: {
    fontSize: 40,
  },
  buttonsView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  homeButtons: {
    backgroundColor: 'black',
    width: '65%',
    paddingVertical: 10,
    marginVertical: 10,
    borderRadius: 50,
    alignItems: 'center',
  },
  btnText: {
    fontSize: 30,
    color: 'white',
  },
  adView: {
    flex: 2,
    // backgroundColor: 'red',
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  blurView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectViewButtons: {
    backgroundColor: 'black',
    width: '65%',
    paddingVertical: 10,
    marginVertical: 20,
    borderRadius: 50,
    alignItems: 'center',
  },
});
