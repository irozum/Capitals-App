import countriesEng from '../assets/countriesEng'
import countriesRus from '../assets/countriesRus'
import countriesUkr from '../assets/countriesUkr'

export const langData = {
  English: {
    continents: [
      'All Continents',
      'Africa',
      'Asia',
      'Europe',
      'North America',
      'South America',
    ],
    highestScore: 'Highest Score',
    playBtn: 'Play',
    langName: 'English',
    langList: ['English', 'Russian'],
    countries: countriesEng,
    questionTxxt: 'What is the capital of',
    winTxt: 'Congratulations!\nYou\'ve answered all the questions',
    lossTxt: 'You\'ve lost all 3 attempts.'
  },
  Russian: {
    continents: [
      'Все Материки',
      'Африка',
      'Азия',
      'Европа',
      'Северная Америка',
      'Южная Америка',
    ],
    highestScore: 'Высший бал',
    playBtn: 'Играть',
    langName: 'Русский',
    langList: ['Английский', 'Русский'],
    countries: countriesRus,
    questionText: 'Какая столица страны',
    winTxt: 'Поздравляю\nВсе вопросы были\nотвечены',
    lossTxt: 'Все 3 попытки утрачены'
  },
};
