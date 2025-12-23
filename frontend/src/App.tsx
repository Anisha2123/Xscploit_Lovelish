


import './App.css'
import Signup from "./pages/Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Xsploit from "./pages/Xsploit";
import CourseDetails from './pages/CourseDetails';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Profile from './pages/Profile';
import Contact from './pages/Contact';
import Course from './pages/CoursesPage';
import ForgotPassword from './pages/ForgotPassword';
import NotFound from './pages/NotFound';

import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";



function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* 🔐 AUTH ROUTES (no navbar/footer) */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Route>

        {/* 🌐 MAIN APP ROUTES (with navbar/footer) */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Xsploit />} />
          <Route path="/courses" element={<Course />} />
          <Route path="/course/:courseId" element={<CourseDetails />} />
          <Route path="/profile/:userId" element={<Profile />} />
          <Route path="/contact" element={<Contact />} />
        </Route>

        {/* ❌ 404 */}
        <Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
