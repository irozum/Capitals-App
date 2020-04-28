import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { langData } from '../assets/langData'
import { func } from '../helpers/functions'
import { BannerAd, BannerAdSize} from '@react-native-firebase/admob';
import Icon from 'react-native-vector-icons/AntDesign'
import Icon1 from 'react-native-vector-icons/Ionicons'
import Icon2 from 'react-native-vector-icons/Feather'

Icon.loadFont()
Icon1.loadFont()
Icon2.loadFont()

export default function Game({ route, navigation }) {
  const data = langData[func.langToEng(route.params.language)]
  const Countries = data.countries
  const continent = func.contToEng(data.continents, route.params.continent)

  let countriesArray = []
  if (route.params.continent === data.continents[0]) {
    countriesArray = [
      ...Countries.Africa,
      ...Countries.Asia,
      ...Countries.Australia,
      ...Countries.Europe,
      ...Countries['North America'],
      ...Countries['South America'],
    ]
  } else {
    countriesArray = [...Countries[continent]]
  }

  const [countries, setCountries] = useState(countriesArray)
  const [country, setCountry] = useState('')
  const [capitals, setCapitals] = useState([])
  const [capital, setCapital] = useState(null)
  const [score, setScore] = useState(0)
  const [lives, setLives] = useState(['life', 'life', 'life'])
  const [cStyles, setCStyles] = useState({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (countries.length > 0) {
      let index = Math.floor(Math.random() * countries.length)
      setCountry(countries[index]?.country)
      const capitalTmp = countries[index]?.capital
      setCapital(capitalTmp)
      countries.splice(index, 1)
      setCountries([...countries])
      let capitals_array = [capitalTmp]
      while (capitals_array.length < 4) {
        if (countries.length > 4) {
          index = Math.floor(Math.random() * countries.length)
          if (!capitals_array.includes(countries[index].capital)) {
            capitals_array.push(countries[index]?.capital)
          }
        } else {
          index = Math.floor(Math.random() * countriesArray.length)
          if (!capitals_array.includes(countriesArray[index].capital)) {
            capitals_array.push(countriesArray[index]?.capital)
          }
        }
      }

      // Shuffles array of capitals
      for (let i = capitals_array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        const x = capitals_array[i]
        capitals_array[i] = capitals_array[j]
        capitals_array[j] = x
      }
      setCapitals(capitals_array)
    } else {
      setCountry(null)
      setCapitals(null)
    }
  }, [score, lives])

  const handleAnswer = (answer) => {
    setLoading(true)
    if (answer === capital) {
      setCStyles({ ...cStyles, [answer]: { backgroundColor: '#59B86A' } }) // making the button green
      updateHighestScore(score + 1) // saving the score to the store
      setTimeout(() => {
        setCStyles({})
        setScore(score + 1) // updating score
        setLoading(false)
      }, 1000)
    } else {
      setCStyles({
        // changing buttons' color
        ...cStyles,
        [answer]: { backgroundColor: '#D26D6A' },
        [capital]: { backgroundColor: '#59B86A' },
      })
      setTimeout(() => {
        setCStyles({}) // changing buttons color back
        lives.shift()
        setLives([...lives]) // removing 1 life
        setLoading(false)
      }, 1000)
    }
  }

  const updateHighestScore = async (scoreNew) => {
    if (scoreNew > route.params.score) {
      try {
        await AsyncStorage.setItem('score', JSON.stringify(scoreNew))
      } catch (e) {
        console.log(`Something went wrong: ${e}`)
      }
    }
  }
  const listAnswers = capitals?.map((capitalName) => (
    <TouchableHighlight
      key={capitalName}
      style={[styles.capitalBtn, cStyles[capitalName]]}
      onPress={() => handleAnswer(capitalName)}>
      <Text
        style={[
          styles.capitalTxt,
          capitalName.length >= 20 && { fontSize: 25 },
        ]}>
        {capitalName}
      </Text>
    </TouchableHighlight>
  ))

  const listLives = []
  for (let i = 2; i !== -1; i--) {
    listLives.push(
      <Icon
        key={i}
        style={styles.life}
        name={lives[i] ? 'heart' : 'hearto'}
        size={20}
      />,
    )
  }

  styles.country = {
    fontWeight: '700',
    textAlign: 'center',
  }
  const breakingLength = data.langName === 'English' ? 15 : 10
  styles.country.fontSize = country?.length <= breakingLength ? 50 : 35

  // Win / lose view
  if (
    score + (3 - lives.length) === countriesArray.length ||
    lives.length === 0
  ) {
    return (
      <View style={[styles.finalView]}>
        <View style={styles.flex1View} />

        <View style={[styles.finalScoreView]}>
          <Text style={styles.finalScoreNum}>{score}</Text>
        </View>

        <View style={[styles.finalTextView, styles.center]}>
          <Text style={styles.finalText}>
            {score + (3 - lives.length) === countriesArray.length ? data.winTxt : data.lossTxt}
          </Text>
        </View>

        <View style={[styles.finalBtnView]}>
          <TouchableHighlight
            onPress={() => navigation.goBack()}
            style={styles.menuButtons}>
            <Icon1 name="md-exit" size={30} color="white" />
          </TouchableHighlight>
        </View>

        <View style={styles.flex1View} />
      </View>
    )
  }

  return (
    <View style={styles.container} pointerEvents={loading ? "none" : "auto"}>
      <View style={styles.container} >
        <View style={styles.topBar}>
          <Text style={styles.score}>{score}</Text>
          <TouchableOpacity
            style={styles.menu}
            onPress={() => navigation.navigate('PlayMenu')}>
            <Text style={styles.menuDots}>···</Text>
          </TouchableOpacity>
          <View style={styles.livesView}>{listLives}</View>
        </View>
        <View style={[styles.questionView, styles.center]}>
          <Text style={styles.question}>{data.questionTxt}</Text>
          <Text style={styles.country}>{country}</Text>
        </View>
        <View style={[styles.buttonsView, styles.center]}>{listAnswers}</View>
        <View style={styles.adView}>
          <BannerAd
            unitId='ca-app-pub-6984163410331419/7286925200'
            size={BannerAdSize.SMART_BANNER}
            requestOptions={{
              requestNonPersonalizedAdsOnly: true,
            }}
            onAdFailedToLoad={(error) => {
              console.error('Advert failed to load: ', error)
            }}
          />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFB041',
  },
  topBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: '5%',
  },
  score: {
    flex: 1,
    fontSize: 30,
  },
  menu: {
    flex: 1,
    marginTop: '7%',
    alignItems: 'center',
  },
  menuDots: {
    fontSize: 30,
    fontWeight: '900',
    marginTop: '8%',
  },
  livesView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  life: {
    paddingLeft: '1%',
  },
  questionView: {
    flex: 3,
    paddingHorizontal: '10%',
  },
  question: {
    fontSize: 30,
    textAlign: 'center',
  },
  buttonsView: {
    flex: 5,
  },
  capitalBtn: {
    backgroundColor: 'black',
    width: '85%',
    paddingVertical: 10,
    marginVertical: 10,
    borderRadius: 50,
    alignItems: 'center',
  },
  capitalTxt: {
    fontSize: 30,
    color: 'white',
    textAlign: 'center',
  },
  adView: {
    flex: 1,
  },
  finalView: {
    flex: 1,
    backgroundColor: '#FFB041',
  },
  finalScoreView: {
    flex: 2,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  finalScore: {
    fontSize: 30,
  },
  finalScoreNum: {
    fontSize: 80,
  },
  finalTextView: {
    flex: 2,
  },
  finalText: {
    fontSize: 30,
    textAlign: 'center',
  },
  finalBtnView: {
    flex: 4,
    justifyContent: 'flex-start',
    alignItems: 'center',
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
  },
  menuButtons: {
    backgroundColor: 'black',
    width: '65%',
    paddingVertical: 10,
    marginVertical: 20,
    borderRadius: 50,
    alignItems: 'center',
  },
  btnText: {
    fontSize: 30,
    color: 'white',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  flex1View: {
    flex: 1,
  },
})
