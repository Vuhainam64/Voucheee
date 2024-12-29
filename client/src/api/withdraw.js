import axios from "axios";
import { access_token, BACKEND_API_URL } from ".";

export const getALLWithdraw = async (status) => {
    try {
        const res = await axios.get(
            `${BACKEND_API_URL}/v1/withdraw/get_all_withdraw_request?status=${status}`,
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

export const updateWithdrawStatusTransfering = async (Ids) => {
    try {
        const res = await axios.put(
            `${BACKEND_API_URL}/v1/withdraw/update_withdraw_request_status`,
            Ids,
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