

import Hero from "../components/Hero";
import Courses from "../components/Courses";
import Lab from "../components/Lab";
import AboutUs from "../components/AboutUs";
import Pricing from "../components/Pricing";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import TrustBar from "../components/TrustBar";
import LearningPath from "../components/LearningPath";
import WhyXsploit from "../components/WhyXsploit";
import Testimonials from "../components/Testimonials";
import CTA from "../components/CTA";
import Contact from "./Contact";
import LabsGrid from "../components/LabGrid";
// import '../App.css'

const Xsploit = () => {

  return (
   <>
   {/* <Navbar/> */}
   <Hero />
   <TrustBar/>
   <Courses/>
   <LearningPath />
   <WhyXsploit />
   <LabsGrid />
   <AboutUs/>
   <Testimonials />
   <CTA />
   {/* <Pricing/> */}
   {/* <Footer/> */}
   </>
  )
}

export default Xsploit;
