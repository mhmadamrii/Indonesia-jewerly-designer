import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { lang } from "./lang";

const resources = {
  en: {
    translation: lang.en,
  },
  id: {
    translation: lang.id,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "id",

  interpolation: {
    escapeValue: false,
  },
});

export { i18n };
