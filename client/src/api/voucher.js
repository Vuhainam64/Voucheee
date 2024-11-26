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

export const createVoucherCode = async (modalId, data) => {
    try {
        const res = await axios.post(
            `${BACKEND_API_URL}/v1/voucherCode/create_voucher_code?modalId=${modalId}`,
            [
                data
            ],
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

export const getMiniSearch = async (q) => {
    try {
        const res = await axios.get(
            `${BACKEND_API_URL}/v1/voucher/get_mini_vouchers?title=${q}`
        );
        return res.data;
    } catch (err) {
        return null;
    }
};

export const searchProduct = async (params) => {
    console.log("params: ", params);
    try {
        // Lọc bỏ các giá trị undefined hoặc null
        const filteredParams = Object.fromEntries(
            Object.entries({
                page: params.page,
                pageSize: params.pageSize,
                title: params.title,
                status: params.status,
                isActive: params.isActive,
                isInStock: params.isInStock,
                minPrice: params.minPrice,
                maxPrice: params.maxPrice,
                sortVoucherEnum: params.sortVoucherEnum,
            }).filter(([_, value]) => value !== undefined && value !== null)
        );

        // Xử lý categoryIDs để lặp lại tham số
        const queryString = new URLSearchParams({
            ...filteredParams,
        });

        if (params.categoryIDs && params.categoryIDs.length) {
            params.categoryIDs.forEach((id) => queryString.append("categoryIDs", id));
        }

        const res = await axios.get(
            `${BACKEND_API_URL}/v1/voucher/get_all_voucher?${queryString.toString()}`
        );

        return res.data;
    } catch (err) {
        console.error("Error fetching vouchers:", err);
        return null;
    }
};

