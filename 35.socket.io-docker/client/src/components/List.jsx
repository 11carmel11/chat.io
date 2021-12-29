import React from "react";
import { ListGroup, Card } from "react-bootstrap";

export default function List({ list }) {
  return (
    <Card
      style={{
        width: "18rem",
        position: "absolute",
        right: "0px",
        top: "0px",
        bottom: "50vh",
        overflowY: "scroll",
      }}
    >
      <Card.Body>
        <div
          style={{
            position: "sticky",
            right: "0px",
            top: "0px",
            zIndex: 9999,
          }}
        >
          <Card.Title>logged users:</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            Card Subtitle - change!!🗑
          </Card.Subtitle>
        </div>
        <Card.Text>
          <ListGroup variant="flush">
            {list.map((person, i) => (
              <ListGroup.Item key={person + i}>{person}</ListGroup.Item>
            ))}
          </ListGroup>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
