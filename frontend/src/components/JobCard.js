// src/components/JobCard.js
import React from 'react';
import { Link } from 'react-router-dom';

const JobCard = ({ job }) => (
  <div className="job-card">
    <h3>{job.title}</h3>
    <div className="meta">
      <span className="company">{job.company}</span>
      <span className="location">{job.location}</span>
    </div>
    <div className="details">
      <span className="source">{job.source}</span>
      <span className="date">{new Date(job.date_posted).toLocaleDateString()}</span>
    </div>
    <div className="actions">
      <Link to={`/job/${job.id}`} className="view-details">
        View Details
      </Link>
      <a href={job.url} target="_blank" rel="noopener" className="apply">
        Apply Now
      </a>
    </div>
  </div>
);

export default JobCard;