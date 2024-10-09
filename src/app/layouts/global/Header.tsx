import type { ChangeEvent } from "react";
import { changeLanguage } from "i18next";

import { useTypedNavigate, useTypedTranslation } from "@shared";

export default function Header (): JSX.Element {
  const navigate = useTypedNavigate();
  const t = useTypedTranslation();

  const handleChangeLanguage = (event: ChangeEvent<HTMLSelectElement>): void => {
    void changeLanguage(event.target.value);
  };

  return (
    <div>
      <h2>{t("header")}</h2>
      <select onChange={handleChangeLanguage}>
        <option value="en">{"EN"}</option>
        <option value="uk">{"UK"}</option>
      </select>
      <button type="button" onClick={() => navigate("/")}>
        Home
      </button>
      <button type="button" onClick={() => navigate("/cart")}>
        Shopping cart
      </button>
      <button type="button" onClick={() => navigate("/favorite")}>
        Favorites
      </button>
      <button type="button" onClick={() => navigate("/profile")}>
        Profile
      </button>
    </div>
  );
}
