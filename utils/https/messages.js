import { notification } from "antd";
import axios from "axios";
import Cookies from "js-cookie";
const token = Cookies.get("token");

// const url = process.env.NEXT_PUBLIC_API_URL;
const url = process.env.NEXT_PUBLIC_API_URL_LOCAL;

export const getMessages = async () => {
  try {
    const response = await axios.get(`${url}/messages/all`);
    return response.data.result;
  } catch (error) {
    console.log(error);
  }
};

export const sendMessage = async (payload) => {
  try {
    const response = await axios.post(`${url}/messages/sendSMS`, payload, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    if (response.data.status === "success") {
      notification.success({
        message: response.data.status,
        description: response.data.message,
        placement: "topRight",
      })
    } else {
      notification.error({
        message: response.data.status,
        description: response.data.message,
        placement: "topRight",
      })
    }
    return response.data;
  } catch (error) {
    notification.error({
      message: "Failed",
      description: `${error.response.data.message}`,
      placement: "topRight",
      className: "capitalize",
    })
  }
};
