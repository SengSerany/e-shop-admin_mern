import axios from 'axios';

const API_URL = '/api/v1/admins';

// Register user
const register = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);

  return response.data;
};

// Login
const login = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData);
  return response.data;
};

// Handle session
const handleSession = async (endpoint) => {
  const response = await fetch(`${API_URL}/${endpoint}`);
  const data = await response.json();
  if (data.user) {
    return data.user;
  } else {
    return { _id: null, username: null };
  }
};

const logout = async () => {
  const response = await axios.delete(`${API_URL}/logout`);

  return response.data;
};

const authService = {
  register,
  login,
  handleSession,
  logout,
};

export default authService;
