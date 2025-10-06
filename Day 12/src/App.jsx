import React from "react";
import Navbar from "./components/Navbar";
import CardList from "./components/CardList";
import CartSection from "./components/CartSection"; 

const App = () => {
  return (
    <div>
      <Navbar />
      <CardList />     
      <CartSection /> 
    </div>
  );
};

export default App;
