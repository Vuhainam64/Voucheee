const cartReducer = (state = { cart: null }, action) => {
  switch (action.type) {
    case "SET_CART":
      return {
        ...state,
        cart: action.cart,
      };
    case "SET_CART_NULL":
      return {
        ...state,
        cart: null,
      };
    default:
      return state;
  }
};

export default cartReducer;
