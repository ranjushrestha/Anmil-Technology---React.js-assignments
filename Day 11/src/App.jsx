import React, { useState } from "react";
import InputComponent from "./InputComponent";
import ButtonComponent from "./ButtonComponent";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="app-container">
      <h1>My Form</h1>
      <InputComponent label="First Name" placeholder="Enter first name" />
      <InputComponent label="Last Name" placeholder="Enter last name" />
      <InputComponent label="Email" placeholder="Enter your email" />

      <div className="button-group">
        <ButtonComponent buttonText="Submit" variant="primary" type="submit" />
        <ButtonComponent buttonText="Cancel" variant="secondary" type="button" />
      </div>
    </div>
  );
}

export default App;
