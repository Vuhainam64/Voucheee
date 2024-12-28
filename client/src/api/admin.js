import axios from "axios";
import { access_token, BACKEND_API_URL } from ".";

export const getAllUser = async () => {
  try {
    const res = await axios.get(`${BACKEND_API_URL}/v1/user/get_all_user`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    console.log(res.data);
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

export const banUser = async (userID, reason) => {
  try {
    // Ensure the full URL is correctly formed
    const res = await axios.put(
      `${BACKEND_API_URL}/v1/user/ban_user?userId=${userID}&reason=${reason}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    return res.data;
  } catch (err) {
    console.error("Error ban user :", err);
    return { success: false, message: "Failed to ban user" };
  }
};

export const unBanUser = async (userID) => {
  try {
    // Ensure the full URL is correctly formed
    const res = await axios.put(
      `${BACKEND_API_URL}/v1/user/ban_user?userId=${userID}&isBan=false`,
      {},
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    return res.data;
  } catch (err) {
    console.error("Error ban user :", err);
    return { success: false, message: "Failed to ban user" };
  }
};

export const getCurrentUser = async () => {
  try {
    const res = await axios.get(
      `https://api.vouchee.shop/api/v1/user/get_current_user`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    return res.data;
  } catch (err) {
    return null;
  }
};

export const createUser = async (userData) => {
  try {
    const response = await axios.post(
      `${BACKEND_API_URL}/v1/user/create_user`,
      userData,
      {
        headers: {
          "Content-Type": "application/json-patch+json",
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error creating user:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const updateUser = async (userData) => {
  console.log(userData);
  try {
    const response = await axios.post(
      `${BACKEND_API_URL}/v1/user/update_user`,
      userData,
      {
        headers: {
          "Content-Type": "application/json-patch+json",
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error creating user:",
      error.response?.data || error.message
    );
    throw error;
  }
};
export const deleteUser = async (userID) => {
  try {
    const res = await axios.put(
      `${BACKEND_API_URL}/v1/user/delete_user/${userID}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    return res.data;
  } catch (err) {
    console.error("Error ban user :", err);
    return { success: false, message: "Failed to ban user" };
  }
};
export const reActiveUser = async (userID) => {
  try {
    const res = await axios.put(
      `${BACKEND_API_URL}/v1/user/reactive_user?userId=${userID}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    return res.data;
  } catch (err) {
    console.error("Error reactive user :", err);
    return { success: false, message: "Failed to reactive user" };
  }
};
export const updateUserStatus = async (userId, status) => {
  try {
    const response = await axios.patch(
      `https://api.vouchee.shop/api/v1/user/update_status/${userId}`,
      { status },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer YOUR_ACCESS_TOKEN`, // Replace with actual Bearer token
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
