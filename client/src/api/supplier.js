import axios from "axios";
import { access_token, BACKEND_API_URL } from ".";

export const getBestSupplier = async () => {
    try {
        const res = await axios.get(
            `${BACKEND_API_URL}/v1/supplier/get_best_suppliers`
        );
        return res.data;
    } catch (err) {
        return null;
    }
};

export const getAllSupplier = async () => {
    try {
        const res = await axios.get(
            `${BACKEND_API_URL}/v1/supplier/get_all_supplier`
        );
        return res.data;
    } catch (err) {
        return null;
    }
};

export const getSupplierDashboard = async () => {
    try {
        const res = await axios.get(
            `${BACKEND_API_URL}/v1/supplier/get_supplier_dashboard`,
            {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            }
        );
        return res.data;
    } catch (err) {
        console.error("Error get modal:", err);
        throw err;
    }
};

export const getSupplierTransaction = async (status) => {
    try {
        const res = await axios.get(
            `${BACKEND_API_URL}/v1/supplier/get_supplier_transaction?status=${status}`,
            {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            }
        );
        return res.data;
    } catch (err) {
        console.error("Error get modal:", err);
        throw err;
    }
};

export const updateSupplierBank = async (bankAccount, bankNumber, bankName) => {
    try {
        const res = await axios.put(
            `${BACKEND_API_URL}/v1/user/update_supplier_bank`,
            {
                bankAccount,
                bankNumber,
                bankName
            },
            {
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