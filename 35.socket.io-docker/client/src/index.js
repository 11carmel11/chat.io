import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import NameState from "./contexts/name/State";

ReactDOM.render(
  <React.StrictMode>
    <NameState>
      <App />
    </NameState>
  </React.StrictMode>,
  document.getElementById("root")
);
