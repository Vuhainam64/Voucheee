import axios from "axios";
import { access_token, BACKEND_API_URL } from ".";

export const getMyVoucher = async (status, startDate, endDate) => {
    try {
        const res = await axios.get(
            `${BACKEND_API_URL}/v1/myVoucher/get_my_vouchers`,
            {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
                params: {
                    status,
                    startDate,
                    endDate,
                },
            }
        );
        return res.data;
    } catch (err) {
        console.error("Error fetching vouchers:", err);
        throw err;
    }
};
