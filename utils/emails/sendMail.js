import {  notification } from "antd";
import axios from "axios";
const url = process.env.NEXT_PUBLIC_API_URL_LOCAL;

export const sendEmail = async (payload) => {
  const { email, message } = payload
  const body = {
    "from": email,
    "message": message,
    "subject": "Client's message",
  }
  
  try {
    console.log(" Send Payload", body, url);
    const response = await axios.post(`${url}/contact-form`, body);
    console.log("Response", response.data);
    notification.success({ message: "Success", description: "Email sent successfully", placement: "bottomRight" });
    return response.data;
  } catch (error) {
    console.log("Error", error);
  }
};
