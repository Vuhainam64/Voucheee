import axios from "axios";
import { BACKEND_API_URL } from ".";

export const getBestSupplier = async () => {
    try {
        const res = await axios.get(
            `${BACKEND_API_URL}/v1/supplier/get_best_suppliers`
        );
        return res.data;
    } catch (err) {
        return null;
    }
};

