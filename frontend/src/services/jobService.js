// src/services/jobService.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const getJobs = async () => {
  try {
    const { data } = await axios.get(`${API_URL}/jobs`);
    return data;
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return [];
  }
};

export const getJobById = async (id) => {
  try {
    const { data } = await axios.get(`${API_URL}/jobs/${id}`);
    return data;
  } catch (error) {
    console.error('Error fetching job:', error);
    return null;
  }
};