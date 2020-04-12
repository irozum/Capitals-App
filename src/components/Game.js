import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import Countries from '../countries.json';

export default function Game({navigation}) {
  const [countries, setCountries] = useState([...Countries]);
  const [country, setCountry] = useState('');
  const [capitals, setCapitals] = useState([]);
  const [capital, setCapital] = useState(null);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [cStyles, setCStyles] = useState({});
  const [loading, setLoading] = useState(false);

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
      for (let i = capitals_array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const x = capitals_array[i];
        capitals_array[i] = capitals_array[j];
        capitals_array[j] = x;
      }
      setCapitals(capitals_array);
    } else {
      setCountry(null);
      setCapitals(null);
    }
  }, [score, lives]);

  const handleAnswer = (answer) => {
    setLoading(true);
    if (answer === capital) {
      setCStyles({...cStyles, [answer]: {backgroundColor: '#59B86A'}});
      setTimeout(() => {
        setCStyles({});
        setScore(score + 1);
        setLoading(false);
      }, 1000);
    } else {
      setCStyles({
        ...cStyles,
        [answer]: {backgroundColor: '#D26D6A'},
        [capital]: {backgroundColor: '#59B86A'},
      });
      setTimeout(() => {
        setCStyles({});
        setLives(lives - 1);
        setLoading(false);
      }, 1000);
    }
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

  let view = (
    <View style={styles.container} pointerEvents={loading && 'none'}>
      <View style={styles.topBar}>
        <Text style={styles.score}>{score}</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Menu')}>
          <Text style={styles.menu}>···</Text>
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
  );

  if (score + (3 - lives) === Countries.length) {
    view = (
      <View style={styles.finalView}>
        <Text style={styles.finalText}>Congratulations!</Text>
        <Text style={styles.finalText}>You've answered all the questions.</Text>
      </View>
    );
  } else if (lives === 0) {
    view = (
      <View style={styles.finalView}>
        <Text style={styles.finalText}>You've lost your lives.</Text>
      </View>
    );
  }

  return view;
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
    fontSize: 30,
    fontWeight: '900',
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
    backgroundColor: '#FFB041',
  },
  finalText: {
    fontSize: 30,
    textAlign: 'center',
    test: "hello"
  },
});
