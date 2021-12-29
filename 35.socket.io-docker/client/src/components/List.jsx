import React from "react";
import { ListGroup, Card } from "react-bootstrap";

export default function List({ list, choose }) {
  return (
    <Card
      style={{
        width: "18rem",
        position: "absolute",
        right: "0px",
        top: "0px",
        bottom: "50vh",
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
            Click a user to send direct message
          </Card.Subtitle>
        </div>
        <ListGroup
          variant="flush"
          style={{ overflowY: "scroll", height: "35vh" }}
        >
          {list.map(({ name, id }, i) => {
            return (
              <ListGroup.Item
                key={id}
                variant={i % 2 ? "light" : "dark"}
                id={id}
                onClick={() => {
                  choose({ name, id });
                }}
                style={{ cursor: "pointer" }}
              >
                {name}
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      </Card.Body>
    </Card>
  );
}
