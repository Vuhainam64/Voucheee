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