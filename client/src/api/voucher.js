import axios from "axios";
import { BACKEND_API_URL } from ".";

export const getNewestVoucher = async () => {
    try {
        const res = await axios.get(
            `${BACKEND_API_URL}/v1/voucher/get_newest_vouchers`
        );
        return res.data;
    } catch (err) {
        return null;
    }
};

export const getBestSold = async () => {
    try {
        const res = await axios.get(
            `${BACKEND_API_URL}/v1/voucher/get_best_sold_vouchers?page=1&pageSize=8`
        );
        return res.data;
    } catch (err) {
        return null;
    }
};

