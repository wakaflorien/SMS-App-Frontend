import axios from "axios";

export const loginWithEmailAndPassword = async (email, password) => {
  const response = await axios.post("/api/login", {email,password});
  return response.data;
};

export const signupWithEmailAndPassword = async (data) => {
  const res = await axios.post('/api/register',{...data});
  return res.data;
}