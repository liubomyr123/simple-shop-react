import { Routing } from "./navigation";
import { withProviders } from "./providers";
import "@i18n";
import "./styles/index.scss";
import "./styles/checkbox-colors.css";

const App = (): JSX.Element => {
  return <Routing />;
};

export default withProviders(App);
