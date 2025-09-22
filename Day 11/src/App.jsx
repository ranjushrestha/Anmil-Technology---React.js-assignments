import React, { useState } from "react";
import InputComponent from "./Components/InputComponent";
import ButtonComponent from "./Components/ButtonComponent";
import "./App.css";

function App() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [count, setCount] = useState(0);

  function handleIncrement() {
    setCount(prev => prev + 1);
  };

  function handleDecrement() {
    setCount(prev => prev - 1);
  };

  return (
    <div className="app-container">
      <h1>My Form</h1>
      <InputComponent
        label="First Name"
        placeholder="Enter first name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <InputComponent
        label="Last Name"
        placeholder="Enter last name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <InputComponent
        label="Email"
        placeholder="Enter an email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <div className="button-group">
        <p>count = {count}</p>
        <ButtonComponent buttonText="Increase" variant="primary" onClick={handleIncrement} />
        <ButtonComponent buttonText="Decrease" variant="secondary" onClick={handleDecrement} />
      </div>
      <div>
        shared count value: {count}
      </div>
    </div>
  );
}

export default App;
