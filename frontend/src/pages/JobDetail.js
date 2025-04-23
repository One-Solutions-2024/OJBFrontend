import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getJobById, trackJobClick } from '../services/jobService';
import { assets } from "../assets/assets";

import "./JobDetail.css";

const JobDetail = () => {
  const { id, slug } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [clickCount, setClickCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jobData = await getJobById(id, slug);
        if (jobData) {
          setJob(jobData);
          setClickCount(jobData.click_count || 0);
        }
      } catch (error) {
        console.error('Fetch error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, slug]);

  const handleApplyClick = async () => {
    try {
      const result = await trackJobClick(id);
      setClickCount(result.newCount);
    } catch (error) {
      console.error('Failed to track click:', error);
      setClickCount(prev => prev + 1);
    }
  };

  // Safely split description only when job exists
  const descriptionPoints = job?.description
    ? job.description.split("\n").map(point => point.trim()).filter(point => point)
    : [];
// in your component
if (loading) {
  return (
    <div className="ojb-loading">
      <div className="ojb-spinner-wrapper">
        <img
          src={assets.ojb_logo}
          className="ojb--logo-loading"
          alt="Loading logo"
        />
      </div>
    </div>
  );
}


  if (!job) return <div className="error">Job not found. <Link to="/">Back to home</Link></div>;

  return (
    <div className="job-detail">
      <div className="company-header">
        <img 
          src={job.image_link}
          alt={job.companyname} 
          className="company-logo-large"
        />
        <div className="job-titles">
          <h1 className="company-role">{job.title}</h1>
          <h3><strong className="company">{job.companyname.toUpperCase()}</strong></h3>
        </div>
      </div>

      <div className="job-meta">
        {job.location && (
          <div className="meta-item">
            <span>📍 Location</span>
            <p>{job.location}</p>
          </div>
        )}
        {job.job_type && (
          <div className="meta-item">
            <span>💼 Employment Type</span>
            <p>{job.job_type}</p>
          </div>
        )}
        {job.salary && (
          <div className="meta-item">
            <span>💰 Salary</span>
            <p>{job.salary}</p>
          </div>
        )}
         {job.experience && (
          <div className="meta-item">
            <span>💼 Experience</span>
            <p>{job.experience}</p>
          </div>
        )}
         {job.batch && (
          <div className="meta-item">
            <span>💼 Batch</span>
            <p>{job.batch}</p>
          </div>
        )}
        {job.date_posted && (
          <div className="meta-item">
            <span>📅 Posted</span>
            <p>
              {new Date(job.date_posted).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
        )}
      </div>
      <div className="ojb-description">
        <h3 className="ojb-description-title">Description</h3>
        <ul className="ojb-description-content">              {descriptionPoints.map((point, index) => point && <li key={index}>{point}</li>)}
        </ul>
      </div>

      <div className="actions">
        <span className='click-count'>* Over {clickCount} People clicked to Apply</span>
        <div className="apply-link-container">
          <a
            href={job.apply_link}
            target="_blank"
            rel="noopener noreferrer"
            className="image-apply-link"
            onClick={handleApplyClick}
          >
            Apply
          </a>
          <Link to="/" className="back-button">← Back</Link>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;