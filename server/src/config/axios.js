const axios = require('axios');

const customAxios = axios.create({
  baseURL: 'http://api.example.com', 
  timeout: 5000, 
  headers: {
    'Content-Type': 'application/json', 
  },
});

customAxios.interceptors.request.use((config) => {
  return config;
}, (error) => {
  console.error('Request error:', error);
  return Promise.reject(error);
});

customAxios.interceptors.response.use((response) => {
  return response;
}, (error) => {
  console.error('Response error:', error);
  return Promise.reject(error);
});

module.exports = customAxios;
