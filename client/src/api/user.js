import axios from "axios";
import { access_token, BACKEND_API_URL } from ".";

export const updateUserBank = async (bankAccount, bankNumber, bankName) => {
    try {
        const res = await axios.put(
            `${BACKEND_API_URL}/v1/user/update_user_bank`,
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

export const getUser = async () => {
    try {
        const res = await axios.get(
            `${BACKEND_API_URL}/v1/user/get_current_user`, {
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