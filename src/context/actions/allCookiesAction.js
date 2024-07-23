export const setAllCookies = (data) => {
  return {
    type: "SET_ALL_COOKIES",
    allCookies: data,
  };
};

export const getAllCookies = () => {
  return {
    type: "GET_ALL_Cookies",
  };
};