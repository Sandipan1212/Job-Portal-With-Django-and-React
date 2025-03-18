import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import JobList from "./components/JobList";  // ✅ Corrected path
import ApplyJob from "./components/ApplyJob"; // ✅ Corrected path

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<JobList />} />
        <Route path="/apply/:jobId" element={<ApplyJob />} />
      </Routes>
    </Router>
  );
};

export default App;
