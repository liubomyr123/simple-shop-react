import { Routing } from "./navigation";
import { withProviders } from "./providers";
import "@i18n";
import "./styles/index.scss";
import "./styles/checkbox-colors.css";
import { IndexedDBService } from "@shared";

export const myDatabaseService = new IndexedDBService("myDatabase", ["products", "favorites", "orders"]);

const App = (): JSX.Element => {
  return <Routing />;
};

export default withProviders(App);
