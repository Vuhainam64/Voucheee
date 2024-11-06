import axios from "axios";
import { access_token, BACKEND_API_URL } from ".";

export const updateModalActive = async (id, isActive) => {
    try {
        const res = await axios.put(
            `${BACKEND_API_URL}/v1/modal/update_modal_isActive/${id}?isActive=${isActive}`,
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