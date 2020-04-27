import React from 'react'
import { View, StyleSheet, TouchableWithoutFeedback, TouchableOpacity, Text } from 'react-native'
import { langData } from '../assets/langData'
import AsyncStorage from '@react-native-community/async-storage'

export default function ContinentSelect({ route, navigation }) {
  const continents = langData[route.params.language].continents
  
  const handleContChange = cont => {
    storeContinent(cont)
    navigation.goBack()
  }

  const storeContinent = async (cont) => {
    try {
      await AsyncStorage.setItem('continent', cont)
    } catch (e) {
      console.log(`Something went wrong: ${e}`)
    }
  }

  const listContinents = continents.map((cont) => (
    <TouchableOpacity key={cont} onPress={() => handleContChange(cont)}>
      <Text style={styles.optionText}>{cont}</Text>
    </TouchableOpacity>
  ))

  return (
    <TouchableWithoutFeedback
      onPress={() => navigation.goBack()}>
          <View style={[styles.container, styles.center]}>
            <View style={styles.flex1View} />
              <View>{listContinents}</View>
            <View style={styles.flex1View} />
          </View>
      </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFB041',
    paddingHorizontal: '5%',
  },
  flex1View: {
    flex: 1,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 30,
    marginVertical: '5%',
    textAlign: 'center',
  },
})