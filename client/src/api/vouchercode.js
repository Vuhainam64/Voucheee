import axios from "axios";
import { access_token, BACKEND_API_URL } from ".";

export const updateStatusVoucherCode = async (id, status) => {
    try {
        const res = await axios.put(
            `${BACKEND_API_URL}/v1/voucherCode/update_status_voucher_code/${id}?status=${status}`,
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

export const getAllVoucherConvert = async () => {
    try {
        const res = await axios.get(
            `${BACKEND_API_URL}/v1/voucherCode/get_supplier_voucher_code?status=0`,
            {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            }
        );
        return res.data;
    } catch (err) {
        console.error("Error get voucher:", err);
        throw err;
    }
};

export const updateListCodeStatusConverting = async (codeIds) => {
    try {
        const res = await axios.put(
            `${BACKEND_API_URL}/v1/voucherCode/update_list_code_status_converting_voucher_code`,
            codeIds,
            {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                    'Content-Type': 'application/json-patch+json',
                },
            }
        );
        return res.data;
    } catch (err) {
        console.error("Error updating voucher code status:", err);
        throw err;
    }
};

export const getAllVoucherConverting = async () => {
    try {
        const res = await axios.get(
            `${BACKEND_API_URL}/v1/voucherCode/get_supplier_voucher_code_converting`,
            {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            }
        );
        return res.data;
    } catch (err) {
        console.error("Error get voucher:", err);
        throw err;
    }
};

export const getVoucherConvertingByID = async (ID) => {
    try {
        const res = await axios.get(
            `${BACKEND_API_URL}/v1/voucherCode/get_voucher_code_by_Update/${ID}`,
            {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            }
        );
        return res.data;
    } catch (err) {
        console.error("Error get voucher:", err);
        throw err;
    }
};

export const convertNewCode = async (data) => {
    try {
        const res = await axios.put(
            `${BACKEND_API_URL}/v1/voucherCode/update_code_voucher_code`,
            data, {
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