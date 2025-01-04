import axios from "axios";
import { access_token, BACKEND_API_URL } from ".";

export const getAllRefund = async (status) => {
    try {
        const res = await axios.get(
            `${BACKEND_API_URL}/v1/refundRequest/get_supplier_refund_request?status=${status}`,
            {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            }
        );
        return res.data;
    } catch (err) {
        console.error("Error getAllPromotionByShopID:", err);
        throw err;
    }
};