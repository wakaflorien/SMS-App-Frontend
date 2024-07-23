import axios from "axios";

const url = process.env.NEXT_PUBLIC_API_URL_LOCAL;

export const signup = async (data) => {
  const res = await axios.post(`${url}/auth/signup`, { ...data });
  return res.data;
};

export const login = async (data) => {
  const res = await axios.post(`${url}/auth/login`, { ...data });
  return res.data;
};