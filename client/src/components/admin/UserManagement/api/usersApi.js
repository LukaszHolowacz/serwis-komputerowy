import axios from 'axios';

const API_URL = 'http://localhost:3001/users/';

export const updateUser = async (userData) => {
  return await axios.put(`${API_URL}update-user`, userData);
};

export const toggleUserBanStatus = async (id, action) => {
  return await axios.put(`${API_URL}${action}-user`, { id });
};

export const fetchUsers = async (searchQuery, sortOrder, filter) => {
  return await axios.get(`${API_URL}search`, {
    params: { search: searchQuery, sortOrder, filter }
  });
};
