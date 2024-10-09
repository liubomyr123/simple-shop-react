import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import { en } from "./locales/en";
import { uk } from "./locales/uk";

// eslint-disable-next-line @typescript-eslint/no-floating-promises
i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { ...en },
      uk: { ...uk },
    },
    debug: true,
    lng: "en",
  });
