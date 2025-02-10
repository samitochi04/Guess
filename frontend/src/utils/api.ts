import axios from "axios";

const API_URL = "http://localhost:4000/api/auth"; // Backend URL

export const signup = async (email: string, password: string) => {
  return axios.post(`${API_URL}/signup`, { email, password });
};

export const login = async (email: string, password: string) => {
  return axios.post(`${API_URL}/login`, { email, password });
};

export const getProfile = async (token: string) => {
  return axios.get(`${API_URL}/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
