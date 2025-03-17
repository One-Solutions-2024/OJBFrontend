import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getJobById } from '../services/jobService';
import "./JobDetail.css";

const JobDetail = () => {
  const { id, slug } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [clickCount, setClickCount] = useState(0); // new state variable for click count

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const data = await getJobById(id, slug);
        setJob(data);
      } catch (error) {
        console.error('Fetch error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id, slug]);

  if (loading) return <div className='loading'><div className="loader"></div></div>;
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
        {job.description && (
          <div className="meta-item">
            <span>Description</span>
            <p>{job.description}</p>
          </div>
        )}
      </div>

      <div className="actions">
      <span className='click-count'>* Over {clickCount} People clicked to Apply</span>

        <div className="apply-link-container">
          <a
            href={job.apply_link}
            target="_blank"
            rel="noopener noreferrer"
            className="image-apply-link"
            onClick={() => setClickCount(clickCount + 1)} // update click count
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
