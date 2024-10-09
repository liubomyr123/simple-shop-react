import { useTypedTranslation } from "@shared";

export default function Footer (): JSX.Element {
  const t = useTypedTranslation();

  return (
    <footer>
      <h2>{t("footer")}</h2>
    </footer>
  );
}
