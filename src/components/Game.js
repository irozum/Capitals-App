import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import {BlurView} from '@react-native-community/blur';
import AsyncStorage from '@react-native-community/async-storage';
import Countries from '../countries.json';

export default function Game({route, navigation}) {
  const [countries, setCountries] = useState([...Countries]);
  const [country, setCountry] = useState('');
  const [capitals, setCapitals] = useState([]);
  const [capital, setCapital] = useState(null);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [cStyles, setCStyles] = useState({});
  const [loading, setLoading] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (countries.length > 0) {
      let index = Math.floor(Math.random() * countries.length);
      setCountry(countries[index]?.country);
      const capitalTmp = countries[index]?.capital;
      setCapital(capitalTmp);
      countries.splice(index, 1);
      setCountries([...countries]);
      let capitals_array = [capitalTmp];
      while (capitals_array.length < 4) {
        if (countries.length > 4) {
          index = Math.floor(Math.random() * countries.length);
          if (!capitals_array.includes(countries[index].capital)) {
            capitals_array.push(countries[index]?.capital);
          }
        } else {
          index = Math.floor(Math.random() * Countries.length);
          if (!capitals_array.includes(Countries[index].capital)) {
            capitals_array.push(Countries[index]?.capital);
          }
        }
      }

      // Shuffles array of capitals
      // for (let i = capitals_array.length - 1; i > 0; i--) {
      //   const j = Math.floor(Math.random() * (i + 1));
      //   const x = capitals_array[i];
      //   capitals_array[i] = capitals_array[j];
      //   capitals_array[j] = x;
      // }
      setCapitals(capitals_array);
    } else {
      setCountry(null);
      setCapitals(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [score, lives]);

  const handleAnswer = (answer) => {
    setLoading(true);
    if (answer === capital) {
      setCStyles({...cStyles, [answer]: {backgroundColor: '#59B86A'}}); // making the button green
      updateHighestScore(score + 1); // saving the score to the store
      setTimeout(() => {
        setCStyles({});
        setScore(score + 1); // updating score
        setLoading(false);
      }, 1000);
    } else {
      setCStyles({
        // changing buttons' color
        ...cStyles,
        [answer]: {backgroundColor: '#D26D6A'},
        [capital]: {backgroundColor: '#59B86A'},
      });
      setTimeout(() => {
        setCStyles({}); // changing buttons color back
        setLives(lives - 1); // removing 1 life
        setLoading(false);
      }, 1000);
    }
  };

  const updateHighestScore = async (scoreNew) => {
    if (scoreNew > route.params.score) {
      try {
        await AsyncStorage.setItem('score', JSON.stringify(scoreNew));
      } catch (e) {
        console.log(`Something went wrong: ${e}`);
      }
    }
  };

  const handleRestart = () => {
    setCountries([...Countries]);
    setScore(0);
    setLives(3);
    setMenuOpen(false);
  };

  const listAnswers = capitals?.map((capitalName) => (
    <TouchableHighlight
      key={capitalName}
      style={[styles.capitalBtn, cStyles[capitalName]]}
      onPress={() => handleAnswer(capitalName)}>
      <Text style={styles.capitalTxt}>{capitalName}</Text>
    </TouchableHighlight>
  ));

  styles.country = {
    fontWeight: '700',
    textAlign: 'center',
  };
  styles.country.fontSize = country?.length <= 15 ? 50 : 35;

  let menu = null;
  if (menuOpen) {
    menu = (
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
            style={styles.menuButtons}>
            <Text style={styles.btnText}>Resume</Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => handleRestart()}
            style={styles.menuButtons}>
            <Text style={styles.btnText}>Restart</Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => navigation.reset({routes: [{name: 'Home'}]})}
            style={styles.menuButtons}>
            <Text style={styles.btnText}>Main Menu</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }

  // Win / lose view
  if (score + (3 - lives) === Countries.length || lives === 0) {
    return (
      <View style={styles.finalView}>
        <Text style={styles.finalText}>Score: {score}</Text>
        <Text style={styles.finalText}>
          {score + (3 - lives) === Countries.length
            ? "Congratulations!\nYou've answered all the questions."
            : "You've lost your lives."}
        </Text>
        <TouchableHighlight
          onPress={() => handleRestart()}
          style={styles.menuButtons}>
          <Text style={styles.btnText}>Restart</Text>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={() => navigation.reset({routes: [{name: 'Home'}]})}
          style={styles.menuButtons}>
          <Text style={styles.btnText}>Main Menu</Text>
        </TouchableHighlight>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.container} pointerEvents={loading && 'none'}>
        <View style={styles.topBar}>
          <Text style={styles.score}>{score}</Text>
          <TouchableOpacity
            style={styles.menu}
            onPress={() => setMenuOpen(true)}>
            <Text style={styles.menuDots}>···</Text>
          </TouchableOpacity>
          <Text style={styles.lives}>{lives}</Text>
        </View>
        <View style={styles.questionView}>
          <Text style={styles.question}>What is the capital of</Text>
          <Text style={styles.country}>{country}</Text>
        </View>
        <View style={styles.buttonsView}>{listAnswers}</View>
        <View style={styles.adView} />
      </View>
      {menu}
    </View>
  );
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
    fontSize: 30,
  },
  menu: {
    marginTop: '7%',
  },
  menuDots: {
    fontSize: 30,
    fontWeight: '900',
    marginTop: '8%',
  },
  lives: {
    fontSize: 30,
  },
  questionView: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: '10%',
  },
  question: {
    fontSize: 30,
    textAlign: 'center',
  },
  buttonsView: {
    flex: 5,
    alignItems: 'center',
    justifyContent: 'center',
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
  },
  adView: {
    flex: 1,
  },
  finalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFB041',
  },
  finalText: {
    fontSize: 30,
    textAlign: 'center',
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
});
