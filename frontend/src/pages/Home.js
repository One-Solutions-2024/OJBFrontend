// src/pages/Home.js
import React, { useEffect, useState } from 'react';
import JobCard from '../components/JobCard';
import { getJobs } from '../services/jobService';
import { assets } from "../assets/assets";
import "./Home.css"
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

  return (
    <div className="home-page">
      <h1>XR Job Board</h1>
      <img
        src={assets.xrjb_logo}
        className="image-logo"
        alt="comapny logo"
      />
      <h3>All XR jobs and opportunities in one place.</h3>
      <p>Explore the top XR roles with our curated listings from leading companies worldwide.</p>
      {loading ? (
        <div className="loading">Loading jobs...</div>
      ) : (
        <div className="job-grid">
          <div className="job-meta-card">
            <div>
            </div>
            <div>
              <h5>Company Name/Role</h5>
              <span className="company"></span>
            </div>
            <h5>Location</h5>
            <div className="details">
              <h5>
                Posted on
              </h5>
            </div>
          </div>
          {jobs.length > 0 ? (
            jobs.map(job => <JobCard key={job.id} job={job} />)
          ) : (
            <div className="no-jobs">
              <p>No jobs found. Please check back later.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;