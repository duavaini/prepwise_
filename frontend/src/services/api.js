import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const signup = (data) => API.post('/auth/signup', data);
export const login = (data) => API.post('/auth/login', data);
export const getProfile = () => API.get('/user/profile');
export const updateProfile = (data) => API.put('/user/profile', data);
export const getCompanies = () => API.get('/companies');
export const getCompany = (slug) => API.get(`/companies/${slug}`);
export const runAnalysis = (companySlug) => API.post(`/analysis/${companySlug}`);
export const getCachedAnalysis = (companySlug) => API.get(`/analysis/${companySlug}/cached`);
export const getExperiences = (params) => API.get('/experiences', { params });
export const submitExperience = (data) => API.post('/experiences', data);
export const upvoteExperience = (id) => API.post(`/experiences/${id}/upvote`);

export default API;
