import React, { useContext } from "react";

import nameContext from "./contexts/name/context";
import Login from "./components/Login";
import Chat from "./components/Chat";

function App() {
  const { name } = useContext(nameContext);
  return name ? <Chat /> : <Login />;
}

export default App;
