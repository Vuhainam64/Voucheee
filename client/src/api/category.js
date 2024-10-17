import axios from "axios";
import { BACKEND_API_URL } from ".";

export const getAllCategory = async () => {
    try {
        const res = await axios.get(
            `${BACKEND_API_URL}/v1/category/get_all_category`
        );
        return res.data;
    } catch (err) {
        return null;
    }
};
