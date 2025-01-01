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

export const getAllShopPromotion = async () => {
    try {
        const res = await axios.get(
            `${BACKEND_API_URL}/v1/shopPromotion/get_all_shop_promotions`,
            {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            }
        );
        return res.data;
    } catch (err) {
        console.error("Error getAllShopPromotion:", err);
        throw err;
    }
};

export const createPromotion = async (name, description, percentDiscount, startDate, endDate, stock, isActive) => {
    try {
        const res = await axios.post(
            `${BACKEND_API_URL}/v1/shopPromotion/create_shop_promotion`,
            { name, description, percentDiscount, startDate, endDate, stock, isActive },
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