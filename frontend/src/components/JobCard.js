import React from 'react';
import { Link } from 'react-router-dom';

function JobCard({ job }) {
  return (
    <div className="job-card">
      <h2>{job.job_title}</h2>
      <p><strong>Company:</strong> {job.company}</p>
      <p><strong>Employment Type:</strong> {job.employment_type}</p>
      <p><strong>Location:</strong> {job.location}</p>
      <p><strong>Posted:</strong> {job.posted_date}</p>
      {job.salary && <p><strong>Salary:</strong> {job.salary}</p>}
      <Link to={`/job/${job.id}`}>View Details</Link>
    </div>
  );
}

export default JobCard;
