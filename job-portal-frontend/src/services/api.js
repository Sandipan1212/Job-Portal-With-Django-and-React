import axios from "axios";

const API_URL = "http://localhost:8000/api";

export const fetchJobs = async () => {
  try {
    const response = await axios.get(`${API_URL}/job-postings/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return [];
  }
};
