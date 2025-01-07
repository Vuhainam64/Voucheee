import axios from "axios";
import { access_token, BACKEND_API_URL } from ".";

export const getAllUser = async () => {
  try {
    const res = await axios.get(
      `${BACKEND_API_URL}/v1/user/get_all_user?pageSize=50`,
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
export const updateUserRole = async (userID, role, supplierId) => {
  try {
    // Ensure the full URL is correctly formed
    const res = await axios.put(
      `${BACKEND_API_URL}/v1/user/update_user_role`,
      { userId: userID, role: role, supplierId: supplierId },
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    console.log(userID, role, supplierId);
    return res.data;
  } catch (err) {
    console.error("Error updating user role:", err);
    return { success: false, message: "Failed to update user role" };
  }
};

export const banUser = async (userID, Reason) => {
  try {
    // Ensure the full URL is correctly formed
    const res = await axios.put(
      `${BACKEND_API_URL}/v1/user/ban_user?userId=${userID}&reason=${Reason}`,
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
  // console.log(userData);
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
export const getOrderDashboard = async () => {
  try {
    const res = await axios.get(
      `https://api.vouchee.shop/api/v1/dashboard/get_order_dashboard`,
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
export const getWalletTransactionDashboard = async () => {
  try {
    const res = await axios.get(
      `https://api.vouchee.shop/api/v1/dashboard/get_wallet_transaction`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    console.log(res.data);
    return res.data;
  } catch (err) {
    return null;
  }
};
export const getTransactionDashboard = async () => {
  try {
    const res = await axios.get(
      `https://api.vouchee.shop/api/v1/wallet/get_dashboard_transaction`,
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

export const getAllSupplier = async () => {
  try {
    const res = await axios.get(
      `https://api.vouchee.shop/api/v1/supplier/get_all_supplier`,
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
export const getAllOrder = async () => {
  try {
    const res = await axios.get(
      `https://api.vouchee.shop/api/v1/order/get_all_order`,
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
export const getDetaiOrder = async (id) => {
  try {
    const res = await axios.get(
      `https://api.vouchee.shop/api/v1/order/get_order/${id}`,
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
export const getAllPartnerTransaction = async (id) => {
  try {
    const res = await axios.get(
      `https://api.vouchee.shop/api/v1/partnerTransaction/get_all_partner_transaction`,
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

export const getAllRefund = async (id) => {
  try {
    const res = await axios.get(
      `https://api.vouchee.shop/api/v1/refundRequest/get_all_refund_request`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    console.log("refund: ", res.data);
    return res.data;
  } catch (err) {
    return null;
  }
};
export const getDetaiRefund = async (id) => {
  try {
    const res = await axios.get(
      `https://api.vouchee.shop/api/v1/refundRequest/get_refund_request/${id}`,
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
export const createSupplier = async (name) => {
  console.log(name);
  try {
    const res = await axios.post(
      `https://api.vouchee.shop/api/v1/supplier/create_supplier`,
      name,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    return res.data;
  } catch (err) {
    return null;
  }
};

export const getAllTopup = async () => {
  try {
    const res = await axios.get(
      `https://api.vouchee.shop/api/v1/topUpRequest/get_all_top_up_requests`,
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
export const getAllWithdraw = async () => {
  try {
    const res = await axios.get(
      `https://api.vouchee.shop/api/v1/withdraw/get_all_withdraw_request`,
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
export const getAllVoucher = async () => {
  try {
    const res = await axios.get(
      `https://api.vouchee.shop/api/v1/voucher/get_all_voucher`,
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
