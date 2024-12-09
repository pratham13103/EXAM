import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Signup } from './pages/Signup'
import { Signin } from './pages/Signin'
import './App.css'
import { Exam } from './pages/Exam'
import AdminDashboard from "./pages/AdminDashboard";

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/exam" element={<Exam />} />
        <Route path="/exam-creation" element={<ExamCreation />} />
        <Route path="/exam-preview" element={<ExamPreview />} />
        <Route path="/admin-dashboard/*" element={<AdminDashboard />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
