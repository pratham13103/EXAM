import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface ExamFormData {
  title: string;
  date: string;
  subject: string;  // Add subject field to form data
}

export const Exam = () => {
  const [formData, setFormData] = useState<ExamFormData>({
    title: "",
    date: "",
    subject: "",  // Initialize subject field
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/exam",  // Ensure this URL matches your backend route
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log("Exam created successfully:", response.data);
      navigate("/exam");  // Redirect to another page after creation
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h1>Create Exam</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Exam Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="date">Exam Date</label>
          <input
            type="datetime-local"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="subject">Subject</label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleInputChange}
            required
          />
        </div>
        {error && <div style={{ color: "red" }}>{error}</div>}
        <div>
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Create Exam"}
          </button>
        </div>
      </form>
    </div>
  );
};
