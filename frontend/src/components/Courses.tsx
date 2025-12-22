import React, { useState, useEffect, useRef } from "react";
import { Shield, Cpu, Network, Globe, Smartphone, Brain, Bug } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { MapPin } from "lucide-react";
import { Link } from "react-router-dom";


const Courses: React.FC = () => {
  const [showMore, setShowMore] = useState(false);
  const [filter, setFilter] = useState("All");
  const titleRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, filter: "blur(10px)" },
      {
        opacity: 1,
        filter: "blur(0px)",
        duration: 1.2,
        ease: "power3.out",
      }
    );

    // Glitch animation
    gsap.to(titleRef.current, {
      textShadow: "0px 0px 10px #00ff9d, 0 0 25px #00ff9d",
      repeat: -1,
      duration: 0.3,
      yoyo: true,
    });
  }, []);

  const allCourses = [
  // {
  //   slug: "kali-linux-001",
  //   title: "KALI LINUX",
  //   desc: "Master the most powerful OS for penetration testing and forensics tools.",
  //   icon: <Shield size={42} />,
  //   duration: "2 Months",
  //   level: "Beginner",
  //   oldPrice: "₹15,000",
  //   price: "₹9,999",
  //   image:"/images/card1.png"
  // },
  {
    slug: "ceh-002",
    title: "CERTIFIED ETHICAL HACKING",
    desc: "Learn modern cyber attack techniques & defense strategies.",
    icon: <Cpu size={42} />,
    duration: "3 Months",
    level: "Intermediate",
    oldPrice: "₹25,000",
    price: "₹11,999",
    image:"/images/card1.png"
  },
  {
    slug: "network-pentest-003",
    title: "NETWORK PENETRATION TESTING",
    desc: "Attack and secure enterprise networks, routers & protocols.",
    icon: <Network size={42} />,
    duration: "2.5 Months",
    level: "Pro",
    oldPrice: "₹22,000",
    price: "₹9,999",
    image:"/images/card1.png"
  },
  {
    slug: "web-pentest-004",
    title: "WEB APP PENETRATION TESTING",
    desc: "Test, exploit & fix vulnerabilities like SQLi, XSS & Auth bypass.",
    icon: <Globe size={42} />,
    duration: "2 Months",
    level: "Intermediate",
    oldPrice: "₹20,000",
    price: "₹9,999",
    image:"/images/card1.png"
  },
  // {
  //   slug: "android-hacking-005",
  //   title: "ANDROID HACKING",
  //   desc: "Analyze APKs, reverse engineer apps, exploit mobile security.",
  //   icon: <Smartphone size={42} />,
  //   duration: "2 Months",
  //   level: "Pro",
  //   oldPrice: "₹18,000",
  //   price: "₹9,999",
  //   image:"/images/card1.png"
  // },
  {
    slug: "ai-hacking-006",
    title: "HACKING WITH AI",
    desc: "Use AI tools for exploit automation, phishing & malware analysis.",
    icon: <Brain size={42} />,
    duration: "1.5 Months",
    level: "Intermediate",
    oldPrice: "₹19,000",
    price: "₹9,999",
    image:"/images/card1.png"
  },
  {
    slug: "bug-bounty-007",
    title: "BUG BOUNTY HUNTING",
    desc: "Find real bugs on live platforms & earn rewards legally.",
    icon: <Bug size={42} />,
    duration: "2 Months",
    level: "Beginner",
    oldPrice: "₹17,000",
    price: "₹9,999",
    image:"/images/card1.png"
  },
];


  const visibleCourses = showMore ? allCourses : allCourses.slice(0, 3);

  return (
    <section className="relative py-24 px-6 bg-[#0b0d10] text-gray-200">
  <div className="max-w-7xl mx-auto">

    {/* Section Header */}
    <div className="text-center mb-16">
      <p className="text-sm uppercase tracking-widest text-[#00ff9d] mb-3">
        Training Programs
      </p>
      <h2 className="text-4xl sm:text-5xl font-semibold text-white">
        Cybersecurity Courses
      </h2>
      <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
        Industry-aligned learning paths built with real-world attack simulations and hands-on labs.
      </p>
    </div>

    {/* Filters */}
    <div className="flex justify-center gap-3 mb-14 flex-wrap">
      {["All", "Beginner", "Intermediate", "Pro"].map(tab => (
        <button
          key={tab}
          onClick={() => setFilter(tab)}
          className={`px-5 py-2 rounded-full text-sm font-medium transition
            ${
              filter === tab
                ? "bg-[#00ff9d] text-black"
                : "bg-white/5 text-gray-300 hover:bg-white/10"
            }`}
        >
          {tab}
        </button>
      ))}
    </div>

    {/* Courses Grid */}
    <div className="grid  sm:grid-cols-2 md:grid-cols-3 gap-8">
      <AnimatePresence>
        {visibleCourses
          .filter(c => filter === "All" || c.level === filter)
          .map((course) => (
            <motion.div
  key={course.title}
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0 }}
  transition={{ duration: 0.4 }}
  className="bg-[#12151c] rounded-xl border border-white/5 
             hover:border-[#00ff9d]/40 hover:-translate-y-1 
             transition-all overflow-hidden"
>
  {/* Image */}
  <div className="relative w-full h-[220px] overflow-hidden">
  <img
    src={course.image}
    alt={course.title}
    className="w-full h-full object-cover"
  />
</div>



  {/* Content */}
  <div className="p-6">
    {/* Icon */}
    <div className="text-3xl text-[#00ff9d] mb-3">
      {course.icon}
    </div>

    {/* Title */}
    <h3 className="text-xl font-semibold text-white mb-2">
      {course.title}
    </h3>

    {/* Description */}
    <p className="text-sm text-gray-400 leading-relaxed mb-5">
      {course.desc}
    </p>

    {/* Meta */}
    <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
      <span>{course.duration}</span>
      <span>{course.level}</span>
    </div>

    {/* Price */}
    <div className="flex items-center gap-3 mb-6">
      <span className="line-through text-gray-500 text-sm">
        {course.oldPrice}
      </span>
      <span className="text-lg font-semibold text-white">
        {course.price}
      </span>
    </div>

    {/* CTA */}
    <Link to={`/course/${course.slug}`}>
      <button className="w-full py-2.5 rounded-md bg-[#00ff9d] text-black font-medium hover:opacity-90 transition">
        View Course
      </button>
    </Link>
  </div>
</motion.div>

          ))}
      </AnimatePresence>
    </div>

    {/* View More */}
    {!showMore && (
      <div className="text-center mt-16">
        <button
          onClick={() => setShowMore(true)}
          className="px-8 py-3 rounded-md bg-white/5 text-gray-300 
                     hover:bg-white/10 transition"
        >
          View More Courses
        </button>
      </div>
    )}
  </div>
  {/* Offline Availability Info */}
<div className="mt-16 flex justify-center">
  <div className="max-w-3xl w-full text-center text-sm text-gray-400">
    
    <div className="flex items-center justify-center gap-2 mb-2">
      <MapPin size={14} className="text-[#00ff9d]" />
      <span>
        Offline classroom training is available for select courses in
        <span className="text-white font-medium"> Mumbai</span>.
      </span>
    </div>

    <p className="text-gray-500">
      Sessions are conducted in small batches with hands-on lab access.
      For availability and schedules,
      <Link
        to="/contact"
        className="ml-1 text-[#00ff9d] hover:underline"
      >
        contact us
      </Link>.
    </p>

  </div>
</div>

</section>

  );
};

export default Courses;
