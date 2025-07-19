// src/services/userService.js
import axios from 'axios';

export const getProfile = () => {
  const token = localStorage.getItem('token');
  return axios.get('http://localhost:3000/api/users/profile', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
