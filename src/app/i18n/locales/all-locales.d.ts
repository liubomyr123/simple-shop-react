interface AllLocalesType {
  translation: {
    header: string;
    footer: string;
    home: string;
    blog: string;
    contact_us: string;
  };
}

type TranslationKeys = keyof AllLocalesType["translation"];
