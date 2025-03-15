import axios from 'axios';

const API_URL = 'https://xrjobsbackend.onrender.com/api';

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
    // API now expects both id and slug
    const { data } = await axios.get(`${API_URL}/jobs/${id}/${slug}`);
    return data;
  } catch (error) {
    console.error('Error fetching job:', error);
    return null;
  }
};
