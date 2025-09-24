import { createContext, useContext } from "react";


const CardContext = createContext(null);


export const useCards = () => {
  const context = useContext(CardContext);
  if (!context) {
    throw new Error("useCards must be used within a CardProvider");
  }
  return context;
};



export default CardContext;
