import axios from 'axios';

const API_URL = 'http://localhost:3001/users/';

export const updateUser = async (userData) => {
  return await axios.put(`${API_URL}update-user`, userData);
};

export const toggleUserBanStatus = async (id, action) => {
  return await axios.put(`${API_URL}${action}-user`, { id });
};
