import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getJobById } from '../services/jobService';

function JobDetail() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const data = await getJobById(id);
        setJob(data);
      } catch (error) {
        console.error('Error fetching job detail:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  if (loading) {
    return <p>Loading job details...</p>;
  }

  if (!job) {
    return (
      <div>
        <p>Job not found.</p>
        <Link to="/">Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>{job.job_title}</h1>
      <p><strong>Company:</strong> {job.company}</p>
      <p><strong>Employment Type:</strong> {job.employment_type}</p>
      <p><strong>Location:</strong> {job.location}</p>
      <p><strong>Posted:</strong> {job.posted_date}</p>
      {job.salary && <p><strong>Salary:</strong> {job.salary}</p>}
      {/* Add any additional job details or instructions for applying here */}
      <button onClick={() => window.open('https://example.com/apply', '_blank')}>
        Apply Now
      </button>
      <br />
      <Link to="/">Back to Home</Link>
    </div>
  );
}

export default JobDetail;
