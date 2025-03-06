import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export const getJobs = async () => {
  const response = await axios.get(`${API_BASE_URL}/jobs`);
  return response.data;
};

export const getJobById = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/jobs/${id}`);
  return response.data;
};
