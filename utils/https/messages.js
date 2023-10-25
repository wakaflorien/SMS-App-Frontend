import axios from "axios";

export const getMessages = async () => {
    const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}messages/all`,
    );
    return response.data.result;
};

export const sendMessage = async (payload) => {
    const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}messages/sendSMS`, payload,
    )
    return response.data;
}
