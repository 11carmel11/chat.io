import React, { useState } from "react";
import { InputGroup, FormControl, Button } from "react-bootstrap";

export default function TextArea({ submitHandler }) {
  const [message, setMessage] = useState("");

  const onMessageSubmit = (e) => {
    submitHandler(e, message);
    setMessage("");
  };

  const onTextChange = ({ target: { value } }) => {
    setMessage(value);
  };

  return (
    <form onSubmit={onMessageSubmit} style={{ marginRight: "50vw" }}>
      <h1>Messenger</h1>
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Message"
          aria-label="Message"
          aria-describedby="basic-addon2"
          value={message}
          onChange={onTextChange}
        />
        <Button variant="outline-primary" type="submit" id="button-addon2">
          Send Message
        </Button>
      </InputGroup>
    </form>
  );
}
