import React from 'react'
import { View, StyleSheet, TouchableWithoutFeedback, TouchableOpacity, Text } from 'react-native'
import { langData } from '../assets/langData'
import AsyncStorage from '@react-native-community/async-storage'
import RNRestart from 'react-native-restart'

export default function LanguageSelect({ route, navigation }) {
  const languages = langData[route.params.language].langList

  const handleLangChange = async lang => {
    const index = languages.indexOf(lang)
    const langInEng = langData.English.langList[index]
    await setLanguage(langInEng)
    await setContinent(langData[langInEng].continents[0])
    RNRestart.Restart()
  }

  const setLanguage = async lang => {
    try {
      await AsyncStorage.setItem('lang', lang)
    } catch (e) {
      console.log(`Something went wrong: ${e}`)
    }
  }

  const setContinent = async cont => {
    try {
      await AsyncStorage.setItem('continent', cont)
    } catch (e) {
      console.log(`Something went wrong: ${e}`)
    }
  }

  const listLanguages = languages?.map(lang => (
    <TouchableOpacity key={lang} onPress={() => handleLangChange(lang)}>
      <Text style={styles.optionText}>{lang}</Text>
    </TouchableOpacity>
  ))

  return (
    <TouchableWithoutFeedback
      onPress={() => navigation.goBack()}>
      <View style={[styles.container, styles.center]}>
        <View style={styles.flex1View} />
        <View>{listLanguages}</View>
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