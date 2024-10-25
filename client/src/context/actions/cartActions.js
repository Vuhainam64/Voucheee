export const SET_CART = (cart) => {
    return {
        type: "SET_CART",
        cart: cart,
    };
};

export const SET_CART_NULL = () => {
    return {
        type: "SET_CART_NULL",
    };
};