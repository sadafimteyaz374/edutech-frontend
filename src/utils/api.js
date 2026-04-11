const BASE_URL = 'http://localhost:5000/api';

const getHeaders = (token) => ({
  'Content-Type': 'application/json',
  ...(token && { Authorization: `Bearer ${token}` }),
});

export const api = {
  register: async (data) => {
    const res = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    return res.json();
  },

  login: async (data) => {
    const res = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    return res.json();
  },

  predict: async (data, token) => {
    const res = await fetch(`${BASE_URL}/predict`, {
      method: 'POST',
      headers: getHeaders(token),
      body: JSON.stringify(data),
    });
    return res.json();
  },

  getHistory: async (email, token) => {
    const res = await fetch(`${BASE_URL}/history`, {
      method: 'GET',
      headers: getHeaders(token),
    });
    return res.json();
  },

  getFeatures: async () => {
    const res = await fetch(`${BASE_URL}/features`);
    return res.json();
  },

  health: async () => {
    const res = await fetch(`${BASE_URL}/health`);
    return res.json();
  },
};