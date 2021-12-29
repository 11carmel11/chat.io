import React, { useContext, useState } from "react";
import { Form, Button } from "react-bootstrap";
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
    <Form>
      <Form.Group className="mb-3" controlId="name">
        <Form.Label>Enter your name to login:</Form.Label>
        <Form.Control
          type="text"
          placeholder="Name"
          value={name}
          onChange={changeName}
        />
      </Form.Group>

      <Button type="button" onClick={handleLogin}>
        enter chat
      </Button>
    </Form>
  );
}
