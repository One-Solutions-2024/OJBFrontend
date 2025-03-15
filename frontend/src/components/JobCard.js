// src/components/JobCard.js
import React from 'react';
import './JobCard.css';

const JobCard = ({ job }) => (
  <div className="job-card" onClick={() => window.open(`/job/${job.id}`, '_blank')}>
    <div className="company-logo">
      <img 
        src={`${job.image_link}`}
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

export default JobCard;
