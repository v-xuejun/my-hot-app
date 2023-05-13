import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import zh from './zh.json'
import en from './en.json'

const lang = window.localStorage.getItem('lang') || 'zh'
const resources = {
  zh: {
    translation: { ...zh }
  },
  en: {
    translation: { ...en }
  }
}
console.log(resources, 'zz')
i18next.use(initReactI18next).init({
  debug: true,
  lng: lang,
  fallbackLng: 'en',
  resources
})

export default i18next
