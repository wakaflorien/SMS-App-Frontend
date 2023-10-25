import axios from "axios";

export const getGroups = async () => {
    const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}groups/all`,
    );
    return response.data.result;
};
export const getGroupContacts = async (id) => {
    const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}groupContacts/${id}`,
    );
    return response.data.result;
};

export const getGroupsContacts = async () => {
    const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}groupContacts/all`,
    );
    return response.data.result;
};

export const deleteGroup = async (id) => {
    const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}groups/${id}`,
    );
    return response.data;
};
export const deleteGroupContact = async (id) => {
    const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}groupContacts/${id}`,
    );
    return response.data;
};

export const getGroup = async (id) => {
    const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}groups/${id}`,
    );
    return response.data.result;
};
export const getGroupContact = async (id) => {
    const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}groupContacts/${id}`,
    );
    return response.data;
};

export const createGroup = async (payload) => {
    const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}groups/create`, payload,
    )
    return response.data;
}
export const createGroupContact = async (payload) => {
    const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}groupContacts/create`, payload,
    )
    return response.data;
}

export const updateGroup = async (id, payload) => {
    const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}groups/${id}`, payload,
    )
    return response.data;
}
export const updateGroupContact = async (id, payload) => {
    const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}groupContacts/add/${id}`, payload,
    )
    return response.data;
}
