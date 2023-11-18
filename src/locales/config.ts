import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import ZH_CN from './zh-CN.json';
import EN from './en-US.json';
import ZH_TW from './zh-TW.json';

const resources = {
  'zh-CN': {
    translation: ZH_CN,
  },
  'en-US': {
    translation: EN,
  },
  'zh-TW': {
    translation: ZH_TW,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
