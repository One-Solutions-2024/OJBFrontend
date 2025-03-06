// src/pages/Home.js
import React, { useEffect, useState } from 'react';
import JobCard from '../components/JobCard';
import { getJobs } from '../services/jobService';

const Home = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadJobs = async () => {
      try {
        const data = await getJobs();
        setJobs(data);
      } catch (error) {
        console.error('Error loading jobs:', error);
      } finally {
        setLoading(false);
      }
    };
    loadJobs();
  }, []);

  if (loading) return <div className="loading">Loading jobs...</div>;

  return (
    <div className="job-list">
      {jobs.length > 0 ? (
        jobs.map(job => <JobCard key={job.id} job={job} />)
      ) : (
        <div className="no-jobs">
          <p>No jobs found. Please try again later.</p>
        </div>
      )}
    </div>
  );
};

export default Home;