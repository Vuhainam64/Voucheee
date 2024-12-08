import axios from "axios";
import { access_token, BACKEND_API_URL } from ".";

export const getAllUser = async () => {
  try {
    const res = await axios.get(`${BACKEND_API_URL}/v1/user/get_all_user`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    return res.data;
  } catch (err) {
    return null;
  }
};
