import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { langData } from '../assets/langData'
import Icon from 'react-native-vector-icons/AntDesign'
Icon.loadFont()

export default function Home({ route, navigation }) {
  const data = langData[route.params.language]

  const [score, setScore] = useState(0)
  const [continent, setContinent] = useState(data.continents[0])
  const [language, setLanguage] = useState(data.langName)

  const getScore = async () => {
    try {
      const storeScore = await AsyncStorage.getItem('score')
      setScore(storeScore ? storeScore : 0)
    } catch (e) {
      console.log(`Something went wrong: ${e}`)
    }
  }

  const getContinent = async () => {
    try {
      const cont = await AsyncStorage.getItem('continent')
      setContinent(cont ? cont : 'All Continents')
    } catch (e) {
      console.log(`Something went wrong: ${e}`)
    }
  }

  useEffect(() => {
    return navigation.addListener('focus', () => {
      getScore()
      getContinent()
    })
  }, [navigation])

  return (
    <View style={styles.container}>
      {/* Highest score */}
      <View style={[styles.topArea, styles.center]}>
        <Text style={styles.score}>{score}</Text>
      </View>

      <View style={styles.middleView}>
        {/* Select continent */}
        <View style={[styles.selectView, styles.center]}>
          <TouchableOpacity
            style={styles.selectBtn}
            onPress={() => navigation.navigate('ContinentSelect')}>
            <Text style={styles.selectText}>
              {continent} <Icon name="caretdown" size={20} />
            </Text>
          </TouchableOpacity>
        </View>

        {/* Play button */}
        <View style={[styles.buttonsView, styles.center]}>
          <TouchableHighlight
            onPress={() => navigation.navigate('Game', { language, score, continent })}
            style={styles.homeButtons}>
            <Text style={styles.btnText}>{data.playBtn}</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.flex1View} />
      </View>

      {/* Select language */}
      <View style={[styles.bottomView, styles.center]}>
        <TouchableOpacity
          style={styles.selectBtn}
          onPress={() => navigation.navigate('LanguageSelect')}>
          <Text style={styles.selectText}>
            {language} <Icon name="caretdown" size={20} color="black" />
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFB041',
    paddingHorizontal: '5%',
  },
  topArea: {
    flex: 1,
  },
  score: {
    fontSize: 80,
  },
  middleView: {
    flex: 1,
  },
  selectView: {
    flex: 1,
  },
  selectText: {
    fontSize: 23,
  },
  buttonsView: {
    flex: 1,
  },
  homeButtons: {
    backgroundColor: 'black',
    width: '65%',
    paddingVertical: 10,
    borderRadius: 50,
    alignItems: 'center',
  },
  btnText: {
    fontSize: 30,
    color: 'white',
  },
  bottomView: {
    flex: 1,
  },
  selectViewButtons: {
    backgroundColor: 'black',
    width: '65%',
    paddingVertical: 10,
    marginVertical: 20,
    borderRadius: 50,
    alignItems: 'center',
  },
  flex1View: {
    flex: 1,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
})