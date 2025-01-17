import axios from "axios";
import { access_token, BACKEND_API_URL } from ".";

export const getALLWithdraw = async (status, BankName, BankNumber, note, StartDate, EndDate) => {
    try {
        const res = await axios.get(
            `${BACKEND_API_URL}/v1/withdraw/get_all_withdraw_request`,
            {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
                params: {
                    status,
                    BankName,
                    BankNumber,
                    note,
                    StartDate,
                    EndDate
                }
            }
        );
        return res.data;
    } catch (err) {
        console.error("Error getALLWithdraw:", err);
        throw err;
    }
};

export const getChartTransaction = async () => {
    try {
        const res = await axios.get(
            `${BACKEND_API_URL}/v1/withdraw/get_withdraw_transactions_chart_admin`,
            {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            }
        );
        return res.data;
    } catch (err) {
        console.error("Error getALLWithdraw:", err);
        throw err;
    }
};

export const updateWithdrawStatusTransfering = async (data) => {
    try {
        const res = await axios.put(
            `${BACKEND_API_URL}/v1/withdraw/update_withdraw_request_status`,
            data,
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

export const getAllTranfering = async () => {
    try {
        const res = await axios.get(
            `${BACKEND_API_URL}/v1/withdraw/get_withdraw_transactions_by_update_id`,
            {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            }
        );
        return res.data;
    } catch (err) {
        console.error("Error getAllTranfering:", err);
        throw err;
    }
};

export const createWithdraw = async (walletType, amount) => {
    try {
        const res = await axios.post(
            `${BACKEND_API_URL}/v1/withdraw/create_withdraw_request?walletType=${walletType}`,
            { amount },
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