import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const testimonials = [
  {
    quote: "This platform helped me understand how real-world hacking actually works. The labs feel realistic, not scripted.",
    name: "Ankit Sharma",
    role: "Computer Science Student",
    image: "/images/t1.jpg",
  },
  {
    quote: "The CVE-based labs gave me confidence to analyze vulnerabilities instead of blindly following tutorials.",
    name: "Rohit Verma",
    role: "Aspiring Security Analyst",
    image: "/images/t2.jpg",
  },
  {
    quote: "Xsploit is more about thinking like an attacker than just running tools. That mindset shift was huge for me.",
    name: "Sneha Kulkarni",
    role: "Final Year Engineering Student",
    image: "/images/t3.jpg",
  },
  {
    quote: "The hands-on labs and realistic scenarios helped me secure my first internship in cybersecurity!",
    name: "Trisha Mehra",
    role: "Cybersecurity Intern",
    image: "/images/t4.jpg",
  },
];

const Testimonials = () => {
  const [index, setIndex] = useState(0);

  // auto-slide every 6s
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const current = testimonials[index];

  return (
    <section className="relative bg-black py-12 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-center text-4xl sm:text-5xl font-semibold text-white mb-16">What Students Say</h2>

        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row items-center gap-12 bg-[#0a0a0a] rounded-3xl p-12 shadow-lg border border-[#00ff9d22]"
          >
            {/* Image */}
            <img
              src={current.image}
              alt={current.name}
              className="w-36 h-36 md:w-48 md:h-48 rounded-full object-cover border-4 border-[#00ff9d33] shadow-lg"
            />

            {/* Quote + Info */}
            <div className="flex-1 text-center md:text-left">
              <p className="text-xl sm:text-2xl text-gray-200 leading-relaxed mb-6">“{current.quote}”</p>
              <p className="text-white font-semibold text-lg">{current.name}</p>
              <p className="text-gray-500 text-sm">{current.role}</p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Dots */}
        <div className="flex justify-center mt-12 gap-3">
          {testimonials.map((_, i) => (
            <span
              key={i}
              className={`w-3 h-3 rounded-full transition-colors ${
                i === index ? "bg-[#00ff9d]" : "bg-[#00ff9d33]"
              }`}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
