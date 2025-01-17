import axios from "axios";
import { access_token, BACKEND_API_URL } from ".";

export const getSupplierOutTransaction = async ({ status, fromDate, toDate, updateId } = {}) => {
    try {
        const res = await axios.get(
            `${BACKEND_API_URL}/v1/walletTransaction/get_supplier_out_transaction`,
            {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
                params: {
                    ...(status && { status }),
                    ...(fromDate && { fromDate }),
                    ...(toDate && { toDate }),
                    ...(updateId && { updateId }),
                },
            }
        );
        return res.data;
    } catch (err) {
        console.error("Error getSupplierOutTransaction:", err);
        throw err;
    }
};

