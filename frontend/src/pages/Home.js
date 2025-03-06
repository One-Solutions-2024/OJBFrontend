import React, { useEffect, useState } from 'react';
import JobCard from '../components/JobCard';
import { getJobs } from '../services/jobService';

function Home() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await getJobs();
        setJobs(data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="container">
      <h1>Job Listings</h1>
      {loading ? (
        <p>Loading job listings...</p>
      ) : jobs.length === 0 ? (
        <p>No job listings available.</p>
      ) : (
        <div className="job-list">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
