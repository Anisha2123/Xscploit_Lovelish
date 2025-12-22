


import './App.css'
import Signup from "./pages/Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Xsploit from "./pages/Xsploit";
import CourseDetails from './pages/CourseDetails';
import Navbar from './components/Navbar';
import Footer from './components/footer';
import Profile from './pages/Profile';
import Contact from './pages/Contact';
import Course from './pages/CoursesPage';
import ForgotPassword from './pages/ForgotPassword';
function App() {

  return (
   <BrowserRouter>
   {/* <Hero/> */}
    <Navbar />
   <Routes>
   
    <Route path="/" element={<Login/>} />
    <Route path="/signup" element={<Signup/>} />
    <Route path="/Xsploit" element={<Xsploit/>} />
    {/* <Route path="/EthicalHacking" element={<CourseDetails/>} /> */}
    <Route path="/course/:courseId" element={<CourseDetails />} />
    <Route path="/profile/:userId" element={<Profile/>} />
    <Route path="/contact" element={<Contact/>} />
    <Route path="/courses" element={<Course/>} />
    <Route path="/forgot-password" element={<ForgotPassword/>} />
    </Routes>
    <Footer />
   {/* <Signup/> */}
   </BrowserRouter>
  )
}

export default App
