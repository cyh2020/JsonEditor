import React from "react";
import TextArea from "./mian/TextArea"
import EditArea from "./mian/EditArea"


import "./styles.css";
import '../node_modules/font-awesome/css/font-awesome.min.css';
import 'react-fontawesome';
import "./antdFix.css"

export function App() {
  return (
    <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start", padding: "18px 3vw" }}>
      <TextArea></TextArea>
      <EditArea></EditArea>
    </div>
  );
}
