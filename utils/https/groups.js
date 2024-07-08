import axios from "axios";

// const url = process.env.NEXT_PUBLIC_API_URL;
const url = process.env.NEXT_PUBLIC_API_URL_LOCAL;

export const getGroups = async () => {
  const response = await axios.get(`${url}/groups/all`);
  return response.data.result;
};
export const getGroupContacts = async (id) => {
  const response = await axios.get(`${url}/groupContacts/${id}`);
  return response.data.result;
};

export const getGroupsContacts = async () => {
  const response = await axios.get(`${url}/groupContacts/all`);
  return response.data.result;
};

export const deleteGroup = async (id) => {
  const response = await axios.delete(`${url}/groups/${id}`);
  return response.data;
};
export const deleteGroupContact = async (id) => {
  const response = await axios.delete(`${url}/groupContacts/${id}`);
  return response.data;
};

export const getGroup = async (id) => {
  const response = await axios.get(`${url}/groups/${id}`);
  return response.data.result;
};
export const getGroupContact = async (id) => {
  const response = await axios.get(`${url}/groupContacts/${id}`);
  return response.data;
};

export const createGroup = async (payload) => {
  const response = await axios.post(`${url}/groups/create`, payload);
  return response.data;
};
export const createGroupContact = async (payload) => {
  const response = await axios.post(`${url}/groupContacts/create`, payload);
  return response.data;
};

export const updateGroup = async (id, payload) => {
  const response = await axios.put(`${url}/groups/${id}`, payload);
  return response.data;
};
export const updateGroupContact = async (id, payload) => {
  const response = await axios.put(`${url}/groupContacts/add/${id}`, payload);
  return response.data;
};
