import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      welcome_to_react: "Welcome to React and react-i18next",
    },
  },
  fr: {
    translation: {
      welcome_to_react: "Kontol BASUR",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "fr",

  interpolation: {
    escapeValue: false,
  },
});

export { i18n };
