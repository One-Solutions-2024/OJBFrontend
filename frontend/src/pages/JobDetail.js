import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getJobById } from '../services/jobService';

const JobDetail = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const data = await getJobById(id);
        setJob(data);
      } catch (error) {
        console.error('Fetch error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  if (loading) return <div className="loading">Loading job details...</div>;
  if (!job) return <div className="error">Job not found. <Link to="/">Back to home</Link></div>;

  return (
    <div className="job-detail">
      <h1>{job.job_title}</h1>
      <div className="meta-section">
        <p><strong>Company:</strong> {job.company}</p>
        <p><strong>Location:</strong> {job.location}</p>
        <p><strong>Posted:</strong> {new Date(job.posted_date).toLocaleDateString()}</p>
      </div>
      <div className="actions">
        <a
          href={`https://remote.co/remote-jobs/apply/${job.id}`} // Update with actual apply URL
          className="apply-button"
          target="_blank"
          rel="noopener noreferrer"
        >
          Apply Now
        </a>
        <Link to="/" className="back-button">
          &larr; Back to Listings
        </Link>
      </div>
    </div>
  );
};

export default JobDetail;