import React from "react";
import ReactDOM from "react-dom";
// import App from "./App";
import Login from "./components/Login";
import NameState from "./contexts/name/State";

ReactDOM.render(
  <React.StrictMode>
    <NameState>
      {/* <App /> */}
      <Login />
    </NameState>
  </React.StrictMode>,
  document.getElementById("root")
);
