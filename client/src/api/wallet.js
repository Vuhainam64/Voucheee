import axios from "axios";
import { access_token, BACKEND_API_URL } from ".";

export const getSellerWallet = async () => {
    try {
        const res = await axios.get(
            `${BACKEND_API_URL}/v1/wallet/get_seller_wallet`,
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

export const getSellerTransaction = async () => {
    try {
        const res = await axios.get(
            `${BACKEND_API_URL}/v1/wallet/get_seller_transactions`,
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