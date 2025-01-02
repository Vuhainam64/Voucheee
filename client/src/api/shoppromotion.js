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

export const updatePromotion = async (name, description, percentDiscount, startDate, endDate, stock, isActive, id) => {
    try {
        const res = await axios.put(
            `${BACKEND_API_URL}/v1/shopPromotion/update_shop_promotion/${id}`,
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

export const updatePromotionStatus = async (id, isActive) => {
    try {
        const res = await axios.put(
            `${BACKEND_API_URL}/v1/shopPromotion/update_shop_promotion_state/${id}?isActive=${isActive}`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            }
        );
        return res.data;
    } catch (error) {
        console.error("Error updating promotion status:", error);
        throw error;
    }
};

export const deletePromotion = async (id) => {
    try {
        const res = await axios.delete(
            `${BACKEND_API_URL}/v1/shopPromotion/delete_promotion/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            }
        );
        return res.data;
    } catch (error) {
        console.error("Error updating promotion status:", error);
        throw error;
    }
};