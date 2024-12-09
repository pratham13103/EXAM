import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Signup } from './pages/Signup'
import { Signin } from './pages/Signin'
import './App.css'
import { Exam } from './pages/Exam'
import AdminDashboard from "./pages/AdminDashboard";
import { ScheduledExams } from './pages/ScheduledExams';


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path='/' element={<Signup/>} />
          <Route path='/signup' element={<Signup/>} />
          <Route path='/signin' element={<Signin/>} />
          <Route path='/exam' element={<Exam/>} />
          <Route path="/scheduled-exams" element={<ScheduledExams />} />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App