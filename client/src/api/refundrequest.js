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

export const updateRefundStatus = async (id, reason, status) => {
    try {
        const res = await axios.put(
            `${BACKEND_API_URL}/v1/refundRequest/update_refund_request_status/${id}`,
            { reason, status },
            {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            }
        );
        return res.data;
    } catch (err) {
        console.error("Error createPromotion:", err);
        throw err;
    }
};