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
    langList: ['English', 'Russian', 'Ukrainian'],
    countries: countriesEng,
    questionTxxt: 'What is the capital of',
    winTxt: 'Congratulations!\nYou\'ve answered all the questions',
    lossTxt: 'You\'ve lost all 3 attempts'
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
    langList: ['Английский', 'Русский', 'Украинский'],
    countries: countriesRus,
    questionText: 'Какая столица',
    winTxt: 'Поздравляю\nВсе вопросы были\nотвечены',
    lossTxt: 'Все 3 попытки утрачены'
  },
  Ukrainian: {
    continents: [
      'Всі Материки',
      'Африка',
      'Азія',
      'Європа',
      'Північна Америка',
      'Південна Америка'
    ],
    highestScore: 'Найвищий бал',
    playBtn: 'Грати',
    langName: 'Українська',
    langList: ['Англійська', 'Россійська', 'Українська'],
    countries: countriesUkr,
    questionTxxt: 'Яка столиця',
    winTxt: 'Вітаю!\nВсі питання були відгадані',
    lossTxt: 'Всі 3 спроби втрачені'
  },
};
