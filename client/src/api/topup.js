import axios from "axios";
import { access_token, BACKEND_API_URL } from ".";

export const createTopup = async (amount) => {
    try {
        const res = await axios.post(
            `${BACKEND_API_URL}/v1/topUpRequest/create_top_up_request`,
            {
                "amount": amount
            }, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        }
        );
        return res.data;
    } catch (err) {
        console.error("Error to create topup:", err);
        throw err;
    }
};

export const getTopupStatus = async (topupID) => {
    try {
        const res = await axios.get(
            `${BACKEND_API_URL}/v1/topUpRequest/get_top_up_request_by_id/${topupID}`,
            {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            }
        );
        return res.data;
    } catch (err) {
        console.error("Error get status topup:", err);
        throw err;
    }
};