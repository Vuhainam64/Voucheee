import axios from "axios";
import { access_token, BACKEND_API_URL } from ".";

export const getAllPromotionByShopID = async (id) => {
    try {
        const res = await axios.get(
            `${BACKEND_API_URL}/v1/shopPromotion/get_promotions_by_shop_id?shopId=${id}`,
            {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            }
        );
        return res.data;
    } catch (err) {
        console.error("Error get cart:", err);
        throw err;
    }
};