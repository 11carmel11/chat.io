import React, { useReducer } from "react";
import nameContext from "./context";
import nameReducer from "../../reducers/name";

export default function NameState({ children }) {
  const [name, dispatch] = useReducer(nameReducer, "");

  return (
    <nameContext.Provider value={{ name, dispatch }}>
      {children}
    </nameContext.Provider>
  );
}
