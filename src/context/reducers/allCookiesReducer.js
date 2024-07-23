function allCookiesReducer(state = null, action) {
  switch (action.type) {
    case "GET_ALL_COOKIES":
      return state;

    case "SET_ALL_COOKIES":
      return {
        ...state,
        allCookies: action.allCookies,
      };
    default:
      return state;
  }
};

export default allCookiesReducer;