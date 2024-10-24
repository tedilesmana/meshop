// src/i18n.js
import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as RNLocalize from 'react-native-localize';
import en from './en.json';
import id from './id.json';

// Detect device language
const getDeviceLanguage = () => {
  const locales = RNLocalize.getLocales();
  return locales[0]?.languageTag || 'en';
};

const languageDetector: any = {
  type: 'languageDetector',
  async: true,
  detect: async (callback: any) => {
    await AsyncStorage.getItem('user-language', (err, language) => {
      if (err || !language) {
        const deviceLanguage = getDeviceLanguage();
        callback(deviceLanguage);
      } else {
        callback(language);
      }
    });
  },
  init: () => {},
  cacheUserLanguage: (language: any) => {
    AsyncStorage.setItem('user-language', language);
  },
};

// Initialize i18n
i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    resources: {
      en: {translation: en},
      id: {translation: id},
    },
    fallbackLng: 'en', // Ensure there's a fallback language
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: true, // Enable Suspense for loading translations
    },
  });

export default i18n;
