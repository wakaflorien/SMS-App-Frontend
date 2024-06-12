import axios from "axios";

const url = process.env.NEXT_PUBLIC_API_URL_LOCAL;
console.log(url);

export const loginWithEmailAndPassword = async (email, password) => {
  const response = await axios.post("/api/login", { email, password });
  return response.data;
};

export const signupWithEmailAndPassword = async (data) => {
  const res = await axios.post("/api/register", { ...data });
  return res.data;
};

export const signup = async (data) => {
  const res = await axios.post(`${url}/auth/signup`, { ...data });
  return res.data;
};

export const login = async (data) => {
  const res = await axios.post(`${url}/auth/login`, { ...data });
  return res.data;
};
