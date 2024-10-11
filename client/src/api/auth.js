import axios from "axios";
import { BACKEND_API_URL } from ".";

export const getUserInfo = async (token) => {
    try {
        const res = await axios.post(
            `${BACKEND_API_URL}/v1/auth/login_with_google_token?token=${token}`
        );
        return res.data;
    } catch (err) {
        return null;
    }
};

