import axios from "axios";
import { access_token, BACKEND_API_URL } from ".";

export const getNewestVoucher = async () => {
    try {
        const res = await axios.get(
            `${BACKEND_API_URL}/v1/voucher/get_newest_vouchers`
        );
        return res.data;
    } catch (err) {
        return null;
    }
};

export const getBestSold = async () => {
    try {
        const res = await axios.get(
            `${BACKEND_API_URL}/v1/voucher/get_best_sold_vouchers?page=1&pageSize=8`
        );
        return res.data;
    } catch (err) {
        return null;
    }
};

export const getNearVoucher = async (lon, lat) => {
    try {
        const res = await axios.get(
            `${BACKEND_API_URL}/v1/voucher/get_nearest_vouchers?lon=${lon}&lat=${lat}`
        );
        return res.data;
    } catch (err) {
        return null;
    }
};

export const getVoucherByID = async (id) => {
    try {
        const res = await axios.get(
            `${BACKEND_API_URL}/v1/voucher/get_voucher/${id}`
        );
        return res.data;
    } catch (err) {
        return null;
    }
};

export const createVoucher = async (data) => {
    try {
        const res = await axios.post(
            `${BACKEND_API_URL}/v1/voucher/create_voucher`,
            data,
            {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            }
        );
        return res.data;
    } catch (err) {
        console.error("Error creating voucher:", err);
        throw err;
    }
};

export const getSellerVoucher = async () => {
    try {
        const res = await axios.get(
            `${BACKEND_API_URL}/v1/voucher/get_seller_vouchers`,
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

export const updateVoucherActive = async (id, isActive) => {
    try {
        const res = await axios.put(
            `${BACKEND_API_URL}/v1/voucher/update_voucher_isActive/${id}?isActive=${isActive}`,
            {}, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        }
        );
        return res.data;
    } catch (err) {
        console.error("Error change active voucher:", err);
        throw err;
    }
};