interface AllLocalesType {
  translation: {
    header: string;
    footer: string;
  };
}

type TranslationKeys = keyof AllLocalesType["translation"];
