import { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-community/async-storage'

export function useLanguage() {
  const [lang, setLang] = useState('English')
  const [loading, setLoading] = useState(true)

  async function getLanguage() {
    const language = await AsyncStorage.getitem('lang')
    if (language) {
      setLang(language);
    } else {
      setLang('English')
    }
    setLoading(false);
  }
  useEffect(() => {
    getLanguage()
  }, [])

  return [lang, loading]
}
