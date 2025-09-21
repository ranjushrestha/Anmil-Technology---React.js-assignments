import React, { useState } from "react";
import InputComponent from "./InputComponent";
import ButtonComponent from "./ButtonComponent";
import "./App.css";

function App() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  // Submit handler
  const handleSubmit = (e) => {
    e.preventDefault(); // prevent page reload
    alert(`Submitted:\nFirst Name: ${firstName}\nLast Name: ${lastName}\nEmail: ${email}`);
  };

  // Cancel handler
  const handleCancel = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
  };

  return (
    <div className="app-container">
      <h1>My Form</h1>
      <form onSubmit={handleSubmit}>
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
          <ButtonComponent buttonText="Submit" variant="primary" type="submit" />
          <ButtonComponent buttonText="Cancel" variant="secondary" type="button" onClick={handleCancel} />
        </div>
      </form>
    </div>
  );
}

export default App;
