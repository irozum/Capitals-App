import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {BlurView} from '@react-native-community/blur';
import Icon from 'react-native-vector-icons/AntDesign';
Icon.loadFont();

const continents = [
  'All Continents',
  'Africa',
  'Asia',
  'Europe',
  'North America',
  'South America',
];

const languages = ['English', 'Russian'];

export default function Home({navigation}) {
  const [score, setScore] = useState(0);
  const [continent, setContinent] = useState('All Continents');
  const [continentsSelect, setContinentsSelect] = useState(false);
  const [language, setLanguage] = useState('English');
  const [languagesSelect, setLanguagesSelect] = useState(false);

  const getData = async () => {
    try {
      const storeScore = await AsyncStorage.getItem('score');
      const storeContinent = await AsyncStorage.getItem('continent');
      const storeLanguage = await AsyncStorage.getItem('language');
      setScore(storeScore ? storeScore : 0);
      setContinent(storeContinent ? storeContinent : 'All Continents');
      setLanguage(storeLanguage ? storeLanguage : 'English');
    } catch (e) {
      console.log(`Something went wrong: ${e}`);
    }
  };

  const getScore = async () => {
    try {
      const storeScore = await AsyncStorage.getItem('score');
      setScore(storeScore ? storeScore : 0);
    } catch (e) {
      console.log(`Something went wrong: ${e}`);
    }
  };

  const getContinent = async () => {
    try {
      const storeContinent = await AsyncStorage.getItem('continent');
      setContinent(storeContinent ? storeContinent : 'All Continents');
    } catch (e) {
      console.log(`Something went wrong: ${e}`);
    }
  };

  const getLanguage = async () => {
    try {
      const storeLanguage = await AsyncStorage.getItem('language');
      setLanguage(storeLanguage ? storeLanguage : 'English');
    } catch (e) {
      console.log(`Something went wrong: ${e}`);
    }
  };

  const storeLanguage = async (lang) => {
    try {
      await AsyncStorage.setItem('language', lang);
    } catch (e) {
      console.log(`Something went wrong: ${e}`);
    }
  };

  const storeContinent = async (cont) => {
    try {
      await AsyncStorage.setItem('continent', cont);
    } catch (e) {
      console.log(`Something went wrong: ${e}`);
    }
  };

  useEffect(() => {
    return navigation.addListener('focus', () => {
      getScore();
    });
  }, [navigation]);

  useEffect(() => {
    getContinent();
    getLanguage();
  }, []);

  const handleContChange = (cont) => {
    setContinent(cont);
    storeContinent(cont);
    setContinentsSelect(false);
  };

  const handleLangChange = (lang) => {
    setLanguage(lang);
    storeLanguage(lang);
    setLanguagesSelect(false);
  };

  const listContinents = continents?.map((cont) => (
    <TouchableOpacity key={cont} onPress={() => handleContChange(cont)}>
      <Text style={styles.optionText}>{cont}</Text>
    </TouchableOpacity>
  ));

  const listLanguages = languages?.map((lang) => (
    <TouchableOpacity key={lang} onPress={() => handleLangChange(lang)}>
      <Text style={styles.optionText}>{lang}</Text>
    </TouchableOpacity>
  ));

  // let continentsSelectView = null;
  let languagesSelectView = null;
  if (continentsSelect || languagesSelect) {
    languagesSelectView = (
      <TouchableWithoutFeedback
        style={styles.absolute}
        onPress={() => {
          continentsSelect
            ? setContinentsSelect(false)
            : setLanguagesSelect(false);
        }}>
        <BlurView
          style={styles.absolute}
          blurType="light"
          blurAmount={20}
          reducedTransparencyFallbackColor="white">
          <View style={[styles.blurView, styles.center]}>
            <View style={styles.flex1View} />
            <View>{continentsSelect ? listContinents : listLanguages}</View>
            <View style={styles.flex1View} />
          </View>
        </BlurView>
      </TouchableWithoutFeedback>
    );
  }

  return (
    <View style={styles.container}>
      {/* Highest score */}
      <View style={[styles.topArea, styles.center]}>
        <Text style={styles.scoreText}>Highest Score</Text>
        <Text style={styles.score}>{score}</Text>
      </View>

      <View style={styles.middleView}>
        {/* Select continent */}
        <View style={[styles.selectView, styles.center]}>
          <TouchableOpacity
            style={styles.selectBtn}
            onPress={() => setContinentsSelect(true)}>
            <Text style={styles.selectText}>
              {continent} <Icon name="caretdown" size={20} />
            </Text>
          </TouchableOpacity>
        </View>

        {/* Play button */}
        <View style={[styles.buttonsView, styles.center]}>
          <TouchableHighlight
            onPress={() => navigation.navigate('Game', {score, continent})}
            style={styles.homeButtons}>
            <Text style={styles.btnText}>Play</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.flex1View} />
      </View>

      {/* Select continent */}
      <View style={[styles.bottomView, styles.center]}>
        <TouchableOpacity
          style={styles.selectBtn}
          onPress={() => setLanguagesSelect(true)}>
          <Text style={styles.selectText}>
            {language} <Icon name="caretdown" size={20} color="black" />
          </Text>
        </TouchableOpacity>
      </View>
      {/* {continentsSelectView} */}
      {languagesSelectView}
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
    flex: 1,
  },
  scoreText: {
    fontSize: 30,
  },
  score: {
    fontSize: 40,
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
  optionText: {
    fontSize: 30,
    marginVertical: '5%',
    textAlign: 'center',
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
});
