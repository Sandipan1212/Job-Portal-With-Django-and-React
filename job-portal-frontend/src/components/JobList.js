import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchJobs } from "../services/api";
import { FaSearch } from "react-icons/fa"; // ✅ Import Search Icon
import "./JobList.css"; // ✅ Import CSS

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchJobs().then(setJobs);
  }, []);

  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="job-page">
      <div className="job-list-container">
        <h1>Available Jobs</h1>

        {/* 🔍 Search Input with Icon */}
        <div className="search-container">
          <FaSearch className="search-icon" />  {/* 👈 Search Icon */}
          <input
            type="text"
            placeholder="Search jobs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        {filteredJobs.length === 0 ? (
          <p className="no-jobs">No jobs found</p>
        ) : (
          <div className="job-grid">
            {filteredJobs.map((job) => (
              <div key={job.id} className="job-card">
                <h3>{job.title}</h3>
                <p>{job.description}</p>
                <p><strong>Company:</strong> {job.company_name}</p>
                <p><strong>Location:</strong> {job.location}</p>

                <button className="apply-button" onClick={() => navigate(`/apply/${job.id}`)}>
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default JobList;
