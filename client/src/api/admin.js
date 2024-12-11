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
export const updateUserRole = async (userID, role) => {
  try {
    // Ensure the full URL is correctly formed
    const res = await axios.put(
      `${BACKEND_API_URL}/v1/user/update_user_role`,
      { userId: userID, role: role },
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    return res.data;
  } catch (err) {
    console.error("Error updating user role:", err);
    return { success: false, message: "Failed to update user role" };
  }
};
