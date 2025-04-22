import axios from 'axios';

const API_URL = 'https://ojbbackend.onrender.com/api';

export const getJobs = async () => {
  try {
    const { data } = await axios.get(`${API_URL}/jobs`);
    return data;
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return [];
  }
};

export const getJobById = async (id, slug) => {
  try {
    const { data } = await axios.get(`${API_URL}/jobs/${id}/${slug}`);
    return data;
  } catch (error) {
    console.error('Error fetching job:', error);
    return null;
  }
};
// Update trackJobClick to use full API URL
export const trackJobClick = async (jobId) => {
  const response = await fetch(`${API_URL}/jobs/${jobId}/click`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) throw new Error('Failed to track click');
  return response.json();
};

export const searchJobs = async (query, location) => {
  try {
    const { data } = await axios.get(`${API_URL}/search`, {
      params: { query, location }
    });
    return data;
  } catch (error) {
    console.error('Error searching jobs:', error);
    return [];
  }
};

export const filterJobs = async (job_type, experience, salary) => {
  try {
    const { data } = await axios.get(`${API_URL}/filter`, {
      params: { job_type, experience, salary }
    });
    return data;
  } catch (error) {
    console.error('Error filtering jobs:', error);
    return [];
  }
};