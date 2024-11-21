import axios from "axios";
import { access_token, BACKEND_API_URL } from ".";

export const getCart = async () => {
    try {
        const res = await axios.get(
            `${BACKEND_API_URL}/v1/cart/get_all_item`,
            {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            }
        );
        return res.data;
    } catch (err) {
        console.error("Error get cart:", err);
        throw err;
    }
};

export const addModalToCart = async (id, quantity) => {
    try {
        const res = await axios.post(
            `${BACKEND_API_URL}/v1/cart/add_item/${id}?quantity=${quantity}`,
            {}, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        }
        );
        return res.data;
    } catch (err) {
        console.error("Error add modal to cart:", err);
        throw err;
    }
};

export const checkout = async (data) => {
    try {
        const res = await axios.post(
            `${BACKEND_API_URL}/v1/cart/checkout`,
            data, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        }
        );
        return res.data;
    } catch (err) {
        console.error("Error add modal to cart:", err);
        throw err;
    }
};