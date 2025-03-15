// src/components/JobCard.js
import React from 'react';
import './JobCard.css';

const JobCard = ({ job }) => {
  // Parse the job's posting date and calculate the difference from today.
  const jobDate = new Date(job.date_posted);
  const now = new Date();
  const diffTime = now - jobDate; // difference in milliseconds
  const diffDays = diffTime / (1000 * 60 * 60 * 24);
  // Consider a job "recent" if it was posted today or yesterday.
  const isRecent = diffDays < 2;

  return (
    <div
      className={`job-card ${isRecent ? 'highlight' : ''}`}
      onClick={() => window.open(`/jobs/${job.id}/${job.url}`, '_blank')}
    >
      <div className="company-logo">
        <img 
          src={job.image_link}
          alt={job.companyname} 
          className="company-card-logo"
          onError={(e) => { e.target.onerror = null; e.target.src = '/placeholder.png'; }}
        />
      </div>
      <div>
        <h4>{job.title.slice(0, 20)}</h4>
        <span className="company">{job.companyname.slice(0,20)}</span>
      </div>
      <div>
        <span className="location">{job.location.slice(0,20)}</span>
        <span>{job.salary}</span>
      </div>
      <div className="details">
        <span className="date">
          {new Date(job.date_posted).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          })}
        </span>
      </div>
    </div>
  );
};

export default JobCard;
