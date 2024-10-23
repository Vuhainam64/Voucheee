import axios from "axios";
import { BACKEND_API_URL } from ".";

export const getBrand = async (id) => {
    try {
        const res = await axios.get(
            `${BACKEND_API_URL}/v1/brand/get_brand/${id}`
        );
        return res.data;
    } catch (err) {
        return null;
    }
};

export const getAllBrands = async () => {
    try {
        const res = await axios.get(
            `${BACKEND_API_URL}/v1/brand/get_all_brand`
        );
        return res.data;
    } catch (err) {
        return null;
    }
};

export const getBrandByName = async (name) => {
    try {
        const res = await axios.get(
            `${BACKEND_API_URL}/v1/brand/get_brand_by_name?name=${name}`
        );
        return res.data;
    } catch (err) {
        return null;
    }
};