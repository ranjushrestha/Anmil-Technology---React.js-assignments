import React from "react";
import useModal from "./hooks/useModal";
import Modal from "./components/Modal";

function App() {
  const { isOpen, open, close } = useModal();

  return (
    <div>
      <button onClick={open}>Open Modal</button>

      <Modal isOpen={isOpen} onClose={close}>
        <h2>Simple Modal</h2>
        <p>Popup using portal</p>
      </Modal>
    </div>
  );
}

export default App;
