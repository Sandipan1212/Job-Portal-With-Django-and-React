import "./ApplyJob.css"; 
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; 

const ApplyJob = () => {
    const { jobId } = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [resume, setResume] = useState(null);
    const [coverLetter, setCoverLetter] = useState(""); 
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!resume) {
            setMessage("❌ Please upload your resume.");
            return;
        }

        const formData = new FormData();
        formData.append("job_posting", jobId);
        formData.append("user", 1); 
        formData.append("cover_letter", coverLetter); 
        formData.append("resume", resume);

        try {
            const response = await fetch("http://localhost:8000/api/job-applications/", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                setMessage("✅ Application submitted successfully!");
                setName("");
                setEmail("");
                setCoverLetter("");
                setResume(null);
            } else {
                const data = await response.json();
                console.error("Error:", data);
                setMessage("❌ Error submitting application.");
            }
        } catch (error) {
            console.error("Request failed:", error);
            setMessage("❌ Request failed. Please try again.");
        }
    };

    // return (
    //   <div className="apply-job-page">
        {/* <div className="apply-job-container"> */}
            {/* <h2>Apply for Job ID: {jobId}</h2> */}
            {/* {message && <p className={message.startsWith("✅") ? "success-message" : "error-message"}>{message}</p>} */}
{/*              */}
            {/* <form onSubmit={handleSubmit} className="apply-form" encType="multipart/form-data"> */}
                {/* <label className="form-label"> */}
                    {/* Full Name: */}
                    {/* <input type="text" name="name" className="form-input" required value={name} onChange={(e) => setName(e.target.value)} /> */}
                {/* </label> */}

                {/* <label className="form-label"> */}
                    {/* Email: */}
                    {/* <input type="email" name="email" className="form-input" required value={email} onChange={(e) => setEmail(e.target.value)} /> */}
                {/* </label> */}

                {/* <label className="form-label"> */}
                    {/* Cover Letter: */}
                    {/* <textarea */}
                        // name="coverLetter"
                        // rows="4"
                        // className="form-textarea"
                        // required
                        // value={coverLetter}
                        // onChange={(e) => setCoverLetter(e.target.value)}
                        // placeholder="Write your cover letter here..."
                    // ></textarea>
                {/* </label> */}

                {/* <label className="form-label"> */}
                    {/* Resume: */}
                    {/* <input type="file" name="resume" className="form-file" required onChange={(e) => setResume(e.target.files[0])} /> */}
                {/* </label> */}

                {/* <button type="submit" className="submit-button">Submit Application</button> */}
            {/* </form> */}
            //  ✅ Back Button
            {/* <button className="back-button" onClick={() => navigate(-1)}>⬅ Back</button> */}
        {/* </div> */}
      {/* </div> */}
    // );
// };
 return (
        <div className="apply-job-page">
            <div className="apply-job-container">
                <h2>Apply for Job ID: {jobId}</h2>
                {message && (
                    <p className={message.startsWith("✅") ? "success-message" : "error-message"}>{message}</p>
                )}
                <form className="apply-form" onSubmit={handleSubmit} encType="multipart/form-data">
                    <label className="form-label">Full Name:</label>
                    <input
                        className="form-input"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <label className="form-label">Email:</label>
                    <input
                        className="form-input"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <label className="form-label">Cover Letter:</label>
                    <textarea
                        className="form-textarea"
                        rows="4"
                        required
                        value={coverLetter}
                        onChange={(e) => setCoverLetter(e.target.value)}
                        placeholder="Write your cover letter here..."
                    ></textarea>

                    <label className="form-label">Resume:</label>
                    <input
                        className="form-file"
                        type="file"
                        required
                        onChange={(e) => setResume(e.target.files[0])}
                    />

                    <button type="submit" className="submit-button">Submit Application</button>
                </form>

                {/* Back Button */}
                <button className="back-button" onClick={() => navigate(-1)}>⬅ Back</button>
            </div>
        </div>
    );
};
export default ApplyJob;
