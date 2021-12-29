import React, { useContext, useState } from "react";
import nameContext from "../contexts/name/context";
import notyf from "../notyf";

export default function Login() {
  const [name, setName] = useState("");
  const { dispatch } = useContext(nameContext);
  const handleLogin = () => {
    if (!name) {
      notyf.error("Name is required to enter the chat");
      return;
    }
    dispatch({ type: "SET_NAME", name });
  };

  const changeName = ({ target: { value } }) => {
    setName(value);
  };

  return (
    <>
      <label htmlFor="name">Enter your name to login:</label>
      <br />
      <input
        id="name"
        type="text"
        placeholder="Name"
        value={name}
        onChange={changeName}
      />
      <button type="button" onClick={handleLogin}>
        enter chat
      </button>
    </>
  );
}
