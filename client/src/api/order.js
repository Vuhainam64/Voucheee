import axios from "axios";
import { access_token, BACKEND_API_URL } from ".";

export const createOrder = async (data) => {
  try {
    const res = await axios.post(
      `${BACKEND_API_URL}/v1/order/create_order`,
      data,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    return res.data;
  } catch (err) {
    console.error("Error to create order:", err);
    throw err;
  }
};

export const getOrder = async (orderID) => {
  try {
    const res = await axios.get(
      `${BACKEND_API_URL}/v1/order/get_order/${orderID}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    return res.data;
  } catch (err) {
    console.error("Error get order:", err);
    throw err;
  }
};

export const getAllOrder = async (status, startDate, endDate) => {
  try {
    const res = await axios.get(`${BACKEND_API_URL}/v1/order/get_buyer_order`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      params: {
        status,
        startDate,
        endDate,
      },
    });
    return res.data;
  } catch (err) {
    console.error("Error fetching vouchers:", err);
    throw err;
  }
};

export const getSellerOrder = async (startDate, endDate, orderId) => {
  try {
    const res = await axios.get(
      `${BACKEND_API_URL}/v1/order/get_seller_order?startDate=${startDate}&endDate=${endDate}&orderId=${orderId}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    return res.data;
  } catch (err) {
    console.error("Error get order:", err);
    throw err;
  }
};
