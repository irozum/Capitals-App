import React from 'react';
import {View, Text, StyleSheet, TouchableHighlight} from 'react-native';

export default function Home({navigation}) {
  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.score}>10</Text>
      </View>
      <View style={styles.buttonsView}>
        <TouchableHighlight
          onPress={() => navigation.navigate('Game', {name: 'Game'})}
          style={styles.homeButtons}>
          <Text style={styles.btnText}>Play</Text>
        </TouchableHighlight>
      </View>
      <View style={styles.adView} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFB041',
    paddingHorizontal: '5%',
  },
  topBar: {
    flex: 1,
    justifyContent: 'center',
  },
  score: {
    fontSize: 30,
  },
  buttonsView: {
    flex: 8,
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
    flex: 1,
  },
});
