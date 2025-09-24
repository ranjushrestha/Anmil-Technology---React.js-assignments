import { useReducer } from "react";
import CardContext from "./CardContext";
import { cardReducer, initialState } from "./CardReducer.jsx";
import PropTypes from "prop-types";

const CardProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cardReducer, initialState);

  return (
    <CardContext value={{ state, dispatch }}>
      {children}
    </CardContext>
  );
};

CardProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export default CardProvider;
