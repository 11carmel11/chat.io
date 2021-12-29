/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState, useContext } from "react";
import TextField from "@material-ui/core/TextField";
import io from "socket.io-client";
import { nanoid } from "nanoid";
import axios from "axios";
import notyf from "../notyf";
import nameContext from "../contexts/name/context";

const server = "http://localhost:4000";

export default function Chat() {
  const { name } = useContext(nameContext);

  const [message, setMessage] = useState("");
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

  const onTextChange = ({ target: { value } }) => {
    setMessage(value);
  };

  const onMessageSubmit = (e) => {
    e.preventDefault();
    if (!message) {
      notyf.error("Please make sure you enter content");
      return;
    }
    socketRef.current.emit("message", { name, message });
    setMessage("");
  };

  const renderChat = () => {
    return chat.map(({ name, message }) => (
      <div key={nanoid()}>
        <h3>
          {name}: <span>{message}</span>
        </h3>
      </div>
    ));
  };

  return (
    <div className="card">
      <form onSubmit={onMessageSubmit}>
        <h1>Messenger</h1>
        <div>
          <TextField
            name="message"
            onChange={onTextChange}
            value={message}
            id="outlined-multiline-static"
            variant="outlined"
            label="Message"
          />
        </div>
        <button>Send Message</button>
      </form>
      <div className="render-chat">
        <h1>Chat Log</h1>
        {renderChat()}
      </div>
      <ul style={{ border: "5px solid red", display: "inline-grid" }}>
        {list.map((person, i) => (
          <li key={i}>{person}</li>
        ))}
      </ul>
    </div>
  );
}
