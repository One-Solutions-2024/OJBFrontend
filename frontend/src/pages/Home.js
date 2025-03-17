// src/pages/Home.js
import React, { useEffect, useState } from 'react';
import JobCard from '../components/JobCard';
import { getJobs } from '../services/jobService';
import { assets } from "../assets/assets";

import "./Home.css";

const Home = () => {
  const [featuredJob, setFeaturedJob] = useState(null);
  const [allJobs, setAllJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadJobs = async () => {
      try {
        const data = await getJobs();
        setAllJobs(data); // Save all jobs
        const now = new Date();
        // Filter jobs posted within the last 2 days (today or yesterday)
        const recentJobs = data.filter(job => {
          const jobDate = new Date(job.date_posted);
          const diffDays = (now - jobDate) / (1000 * 60 * 60 * 24);
          return diffDays < 2;
        });
        let featured;
        if (recentJobs.length > 0) {
          // Pick the most recent among recent jobs
          featured = recentJobs.sort(
            (a, b) => new Date(b.date_posted) - new Date(a.date_posted)
          )[0];
        } else if (data.length > 0) {
          // Otherwise, pick the most recent job overall
          featured = data.sort(
            (a, b) => new Date(b.date_posted) - new Date(a.date_posted)
          )[0];
        }
        setFeaturedJob(featured);
      } catch (error) {
        console.error('Error loading jobs:', error);
      } finally {
        setLoading(false);
      }
    };
    loadJobs();
  }, []);

  // Remove the featured job from the list to avoid duplication.
  const jobsToShow = featuredJob ? allJobs.filter(job => job.id !== featuredJob.id) : allJobs;

  return (
    <div className="home-page">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-800">ONE JOB BOARD</h1>
        <p className="text-gray-600 head-message">Your one-stop destination for job listings</p>
      </div>
      <div className='image-log0-con'>
        <img
          src={assets.one_job_board_logo}
          className="image-logo"
          alt="company logo"
        />
         <h3>All jobs and opportunities in one place.</h3>
      <p>
        Explore the top Developer and Tester roles with our curated listings from leading companies in India.
      </p>
      </div>
     
     <div className='job-list-container'>
     {loading ? (
        <div className='loading'><div className="loader"></div></div>
      ) : (
        <>
          {featuredJob && (
            <div className="featured-job">
              <JobCard job={featuredJob} />
            </div>
          )}
          <div className="job-grid">
            <div className="job-meta-card">
              <div></div>
              <div>
                <h5>Company Name/Role</h5>
                <span className="company"></span>
              </div>
              <h5>Location</h5>
              <div className="meta-details">
                <h5>Posted


                </h5>
              </div>
            </div>
            {jobsToShow.length === 0 ? (
              <div className="no-jobs">
                <p>No jobs found. Please check back later.</p>
              </div>
            ) : (
              jobsToShow.map(job => <JobCard key={job.id} job={job} />)
            )}
          </div>
        </>
      )}
     </div>
    </div>
  );
};

export default Home;
