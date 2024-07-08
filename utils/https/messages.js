import axios from "axios";
import Cookies from "js-cookie";
const token = Cookies.get("token");

// const url = process.env.NEXT_PUBLIC_API_URL;
const url = process.env.NEXT_PUBLIC_API_URL_LOCAL;

export const getMessages = async () => {
  const response = await axios.get(`${url}/messages/all`);
  return response.data.result;
};

export const sendMessage = async (payload) => {
  const response = await axios.post(`${url}/messages/sendSMS`, payload, {
    headers: {
        authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
