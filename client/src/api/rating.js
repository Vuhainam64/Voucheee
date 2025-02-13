import axios from "axios";
import { access_token, BACKEND_API_URL } from ".";

export const getAllRatingBySeller = async (modalId, qualityStar, serviceStar, sellerStar, minAverageStar, maxAverageStar) => {
    try {
        const res = await axios.get(
            `${BACKEND_API_URL}/v1/rating/get_all_rating_by_seller`,
            {
                params: {
                    modalId,
                    qualityStar,
                    serviceStar,
                    sellerStar,
                    minAverageStar,
                    maxAverageStar
                },
                headers: {
                    Authorization: `Bearer ${access_token}`,
                }
            }
        );
        return res.data;
    } catch (err) {
        console.error("Error get order:", err);
        throw err;
    }
};

export const replyRating = async (id, content) => {
    try {
        const res = await axios.put(
            `${BACKEND_API_URL}/v1/rating/reply_rating/${id}?rep=${content}`,
            {},
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