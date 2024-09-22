import axios from "axios";

export const getBankList = async () => {
  try {
    const res = await axios.get(
      `https://api.vietqr.io/v2/banks`
    );
    return res.data.data;
  } catch (err) {
    return null;
  }
};
