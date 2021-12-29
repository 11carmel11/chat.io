import React from "react";

export default function List({ list }) {
  return (
    <ul style={{ border: "5px solid red", display: "inline-grid" }}>
      {list.map((person, i) => (
        <li key={i}>{person}</li>
      ))}
    </ul>
  );
}
