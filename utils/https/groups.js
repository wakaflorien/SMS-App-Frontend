import { notification } from "antd";
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

export const deleteGroup = async ({ id }) => {
  const response = await axios.delete(`${url}/groups/${id}`);
  notification.success({
    message: "Success",
    description: "Group deleted successfully",
    placement: "topRight",
  })
  return response.data;
};
export const deleteGroupContact = async ({ id, payload }) => {
  try {
    const response = await axios.post(`${url}/groups/${id}/remove-contact`, payload);
    notification.success({
      message: "Success",
      description: "Contact removed successfully",
      placement: "topRight",
    })
    return response.data;
  } catch (error) {
    notification.error({
      message: "Failed",
      description: error.response.data.error || error.response.data.message,
      placement: "topRight",
    })
  }
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
  notification.success({
    message: "Success",
    description: "Group created successfully",
    placement: "topRight",
  })
  return response.data;
};
export const addContactsToGroup = async ({ id, payload }) => {
  try {
    const response = await axios.post(`${url}/groups/${id}/contacts`, payload);
    notification.success({
      message: "Success",
      description: "Contacts added successfully",
      placement: "topRight",
    })
    return response.data;
  } catch (error) {
    notification.error({
      message: "Failed",
      description: error.response.data.error || error.response.data.message,
      placement: "topRight",
    })
  }
};

export const updateGroup = async (id, payload) => {
  const response = await axios.put(`${url}/groups/${id}`, payload);
  return response.data;
};
export const updateGroupContact = async (id, payload) => {
  const response = await axios.put(`${url}/groupContacts/add/${id}`, payload);
  return response.data;
};
