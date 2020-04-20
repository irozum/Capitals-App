import { langData } from '../assets/langData'

export const func = {
  langToEng(lang) {
    switch (lang) {
      case 'English':
        return 'English'
      case 'Русский':
        return 'Russian'
      case 'Українська':
        return 'Ukrainian'
    }
  },

  contToEng(contList, cont) {
    const index = contList.indexOf(cont)
    const contInEng = langData.English.continents[index]
    return contInEng
  }
}