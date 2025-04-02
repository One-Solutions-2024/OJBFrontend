// src/components/JobCard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './JobCard.css';

const JobCard = ({ job }) => {
  const navigate = useNavigate();
  // Parse the job's posting date and calculate the difference from today.
  const jobDate = new Date(job.date_posted);
  const now = new Date();
  const diffTime = now - jobDate; // difference in milliseconds
  const diffDays = diffTime / (1000 * 60 * 60 * 24);
  // Consider a job "recent" if it was posted today or yesterday.
  const isRecent = diffDays < 2;
  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };


  return (
    <div
      className={`job-card ${isRecent ? 'highlight' : ''}`}
      onClick={() => navigate(`/jobs/${job.id}/${job.url}`)}
    >
     <div className='small_device-row'>
     <div className="company-logo">
        <img
          src={job.image_link}
          alt={job.companyname}
          className="company-card-logo"
          onError={(e) => { e.target.onerror = null; e.target.src = '/placeholder.png'; }}
        />
      </div>
      <div className='small_device_title'>
      <span className='job-title'>{job.title.slice(0,25)}</span>
      <span className="company">{capitalize(job.companyname).slice(0,23)}</span>
   
      </div>
     </div>
     <div className='immage-title-container'>
     <div className='title-company-container'>
        <span className='job-title'>{job.title.slice(0,25)}</span>
        <span className="company">{capitalize(job.companyname).slice(0,25)}</span>
      </div>
      <div className='location-salary-container'>
        <span className="location">📍{job.location.slice(0, 20)}</span>
        <span className='salary'>💰{job.salary}</span>
      </div>
      <div className="details">
        <span className="date">📅
          {new Date(job.date_posted).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          })}
        </span>
      </div>
     </div>
    </div>
  );
};

export default JobCard;
