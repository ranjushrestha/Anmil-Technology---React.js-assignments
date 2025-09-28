export const initialState = {
  cart: [],
};

export const cardReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
     
      const newItem = { ...action.payload, cartId: Date.now() + Math.random() };
      return { ...state, cart: [...state.cart, newItem] };

    case "REMOVE_FROM_CART":
      
      return {
        ...state,
        cart: state.cart.filter(item => item.cartId !== action.payload),
      };

    default:
      return state;
  }
};
