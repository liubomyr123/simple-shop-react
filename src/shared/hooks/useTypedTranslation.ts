import { useTranslation } from "react-i18next";

export const useTypedTranslation = (): ((key: TranslationKeys) => string) => useTranslation().t;
