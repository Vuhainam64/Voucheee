import axios from "axios";
import { baseURL, usertoken } from ".";

export const loginWithEmailPass = async (account, password) => {
  try {
    const res = await axios.post(`${baseURL}/Auth/login`, {
      account,
      password,
    });
    return res.data;
  } catch (err) {
    return null;
  }
};
