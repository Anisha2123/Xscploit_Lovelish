


import './App.css'
import Signup from "./pages/Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Xsploit from "./pages/Xsploit";
import CourseDetails from './pages/CourseDetails';

function App() {

  return (
   <BrowserRouter>
   {/* <Hero/> */}
   <Routes>
    <Route path="/" element={<Login/>} />
    <Route path="/signup" element={<Signup/>} />
    <Route path="/Xsploit" element={<Xsploit/>} />
    {/* <Route path="/EthicalHacking" element={<CourseDetails/>} /> */}
    <Route path="/course/:courseId" element={<CourseDetails />} />

    </Routes>
   {/* <Signup/> */}
   </BrowserRouter>
  )
}

export default App
