import i18n from "i18next";
import i18nBackend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

const savedLanguage = localStorage.getItem("lang");

i18n
  .use(i18nBackend)
  .use(initReactI18next)
  .init({
    fallbackLng: "fr",
    lng: savedLanguage || "fr",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
