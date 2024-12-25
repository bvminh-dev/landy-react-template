import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";

import Router from "./router";
import i18n from "./translation";
import { useEffect, useState } from "react";
import Loading from "./components/Loading";

const App = () => {
  const [isI18nReady, setI18nReady] = useState(false);

  useEffect(() => {
    i18n.config().finally(() => setI18nReady(true));
  }, []);

  if (!isI18nReady) {
    return <Loading />;
  }

  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
