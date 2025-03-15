// src/pages/Home.js
import React, { useEffect, useState } from 'react';
import JobCard from '../components/JobCard';
import { getJobs } from '../services/jobService';
import { assets } from "../assets/assets";
import "./Home.css";

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
      <h1>ONE Job Board</h1>
      <img
        src={assets.one_job_board_logo}
        className="image-logo"
        alt="company logo"
      />
      <h3>All jobs and opportunities in one place.</h3>
      <p>Explore the top Developer and Tester roles with our curated listings from leading companies India.</p>
      {loading ? (
        <div className="loading">Loading jobs...</div>
      ) : (
        <div className="job-grid">
          <div className="job-meta-card">
            <div></div>
            <div>
              <h5>Company Name/Role</h5>
              <span className="company"></span>
            </div>
            <h5>Location</h5>
            <div className="details">
              <h5>Posted on</h5>
            </div>
          </div>
          {jobs.length === 0 ? (
            <div className="no-jobs">
              <p>No jobs found. Please check back later.</p>
            </div>
          ) : (
            jobs.map(job => <JobCard key={job.id} job={job} />)
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
