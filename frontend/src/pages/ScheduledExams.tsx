// src/pages/ScheduledExams.tsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import './ScheduledExams.css'; // Add styles for this page

interface Exam {
  id: string;
  title: string;
  subject: string;
  date: string;
}

export const ScheduledExams = () => {
  const [exams, setExams] = useState<Exam[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/exam", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setExams(response.data);
      } catch (err) {
        setError("Failed to fetch exams");
      } finally {
        setLoading(false);
      }
    };

    fetchExams();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="scheduled-exams-container">
      <h1>Scheduled Exams</h1>

      {error && <div className="error">{error}</div>}

      <table>
        <thead>
          <tr>
            <th>Exam Title</th>
            <th>Subject</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {exams.map((exam) => (
            <tr key={exam.id}>
              <td>{exam.title}</td>
              <td>{exam.subject}</td>
              <td>{new Date(exam.date).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
