import axios from "axios";

// const url = process.env.NEXT_PUBLIC_API_URL;
const url = process.env.NEXT_PUBLIC_API_URL_LOCAL;




export const getContacts = async () => {
    const response = await axios.get(
        `${url}/contacts/all`,
    );
    return response.data.result;
};
export const deleteContact = async (id) => {
    const response = await axios.delete(
        `${url}/contacts/${id}`,
    );
    return response.data;
};

export const getContact = async (id) => {
    const response = await axios.get(
        `${url}/contacts/${id}`,
    );
    return response.data.result;
};

export const createContact = async (payload) => {
    const response = await axios.post(
        `${url}/contacts/create`, payload,
    )
    return response.data;
}
export const updateContact = async (id, payload) => {
    const response = await axios.put(
        `${url}/contacts/${id}`, payload
    )
    return response.data;
}
