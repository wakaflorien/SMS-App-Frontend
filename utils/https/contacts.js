import axios from "axios";

export const getContacts = async () => {
    const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}contacts/all`,
    );
    return response.data.result;
};
export const deleteContact = async (id) => {
    const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}contacts/${id}`,
    );
    return response.data;
};

export const getContact = async (id) => {
    const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}contacts/${id}`,
    );
    return response.data.result;
};

export const createContact = async (payload) => {
    const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}contacts/create`, payload,
    )
    return response.data;
}
export const updateContact = async (id, payload) => {
    const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}contacts/${id}`, payload
    )
    return response.data;
}
