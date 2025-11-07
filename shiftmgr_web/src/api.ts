import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
});

export const setToken = (t: string) => {
  if (t) {
    localStorage.setItem('token', t);
    api.defaults.headers.common.Authorization = `Bearer ${t}`;
  } else {
    localStorage.removeItem('token');
    delete api.defaults.headers.common.Authorization;
  }
};

// restore token on refresh
const saved = localStorage.getItem('token');
if (saved) api.defaults.headers.common.Authorization = `Bearer ${saved}`;
