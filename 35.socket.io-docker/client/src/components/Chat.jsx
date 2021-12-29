/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState, useContext } from "react";
import { Card } from "react-bootstrap";
import io from "socket.io-client";
import { nanoid } from "nanoid";
import axios from "axios";
import notyf from "../notyf";
import nameContext from "../contexts/name/context";
import List from "./List";
import TextArea from "./TextArea";

const server = "http://localhost:4000";

export default function Chat() {
  const { name } = useContext(nameContext);

  const [chat, setChat] = useState([]);
  const [list, setList] = useState([]);

  const socketRef = useRef();

  useEffect(() => {
    axios.post(`${server}?name=${name}`);

    socketRef.current = io.connect(server);

    socketRef.current.on("loggedList", (loggedList) => {
      setList(loggedList);
    });

    socketRef.current.on("joined", (person) => {
      notyf.success(`${person} has just joined the chat`);
    });

    socketRef.current.on("disconnected", (person) => {
      notyf.success(`${person} has just left the chat`);
    });

    socketRef.current.on("messageBack", (messageObj) => {
      setChat((prevState) => [...prevState, messageObj]);
    });
    // return () => socketRef.current.disconnect();
  }, []);

  const onMessageSubmit = (e, message) => {
    e.preventDefault();
    if (!message) {
      notyf.error("Please make sure you enter content");
      return;
    }
    socketRef.current.emit("message", { name, message });
  };

  const renderChat = () => {
    return chat.map(({ name, message }) => (
      <Card.Body key={nanoid()}>
        <Card.Title>{name}:</Card.Title>
        <Card.Text>{message}</Card.Text>
      </Card.Body>
    ));
  };

  return (
    <div>
      <TextArea submitHandler={onMessageSubmit} />

      <Card style={{ width: "25rem", overflowY: "scroll", height: "75vh" }}>
        <Card.Header>Chat Log:</Card.Header>
        {renderChat()}
      </Card>

      <List list={list} />
    </div>
  );
}

/**
 <Card style={{ width: '30rem' }}>
  <Card.Body>
    <Card.Title>{name}:</Card.Title>
    <Card.Text>
       {message}
    </Card.Text>
  </Card.Body>
</Card>
 */
