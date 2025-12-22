import React from "react";
import { FaLinkedin, FaGithub, FaTwitter, FaWhatsapp, FaInstagram, FaPhone } from "react-icons/fa";
import { motion } from "framer-motion";
import ProfessionalHighlights from "./Features"
import "../App.css"
const AboutUs: React.FC = () => {
  return (
    <section className="relative py-15 bg-[#080b0e] text-white overflow-hidden">
      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-5xl md:text-6xl font-extrabold text-center mb-16 font-mono text-[#b084f5] tracking-widest"
      >
        // KNOW ABOUT US
      </motion.h1>

      <div className="cards flex flex-col md:flex-row w-full mx-auto gap-12 p-5">
  {/* Left: Avatar */}
  <motion.div
    initial={{ opacity: 0, x: -50 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.7 }}
    className="left1 w-full md:w-1/3 flex justify-center"
  >
    <div className="w-48 h-48 rounded-full bg-[#0a0f14] border-4 border-[#00ff9d] flex items-center justify-center text-6xl font-bold text-[#00ff9d] relative shadow-[0_0_40px_#00ff9d33]">
      LN
      <span className="absolute inset-0 rounded-full border border-[#00ff9d44] animate-ping"></span>
    </div>
  </motion.div>

  {/* Right: Info */}
  <motion.div
    initial={{ opacity: 0, x: 50 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.7 }}
    className=" w-full md:w-2/3 flex flex-col gap-4"
  >
    <h2 className="text-4xl font-extrabold font-mono text-[#b084f5] tracking-wide">
      Lovelish Nirmal
    </h2>
    <p className="text-[#00ff9d] font-mono font-semibold tracking-wide">
      Ethical Hacker & Cybersecurity Trainer
    </p>
    <p className="text-gray-300 text-sm leading-relaxed">
      Over 5 years of experience in penetration testing, bug bounty programs, and real-world cybersecurity projects. Trained 250+ students globally and contributed to international cybersecurity programs.
    </p>

    {/* Key Stats */}
    <div className="flex flex-wrap gap-4 mt-4">
      {[
        { label: "Experience", value: "5+ Years" },
        { label: "Students Trained", value: "250+" },
        { label: "Bug Bounties", value: "15+" },
        { label: "Global Projects", value: "20+" },
        { label: "Certifications", value: "CEH, OSCP" },
      ].map((stat, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 * idx }}
          className="max-sm:w-60 sm:w-60 px-4 py-2 bg-[#0a0f14] border-l-4 border-[#00ff9d] rounded-r-md text-[#00ff9d] font-mono font-bold shadow-[0_0_15px_#00ff9d22] text-sm"
        >
          {stat.label}: <span className="text-gray-300">{stat.value}</span>
        </motion.div>
      ))}
    </div>

    {/* Socials */}
    <div className=" icons flex gap-12 mt-6 text-[#00ff9d] text-2xl">
  {/* LinkedIn */}
  <a
    href="https://www.linkedin.com/in/your-profile"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="LinkedIn"
    className="hover:text-white transition-colors duration-200"
  >
    <FaLinkedin />
  </a>

  {/* WhatsApp */}
  <a
    href="https://wa.me/919619370942"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="WhatsApp"
    className="hover:text-white transition-colors duration-200"
  >
    <FaWhatsapp />
  </a>

  {/* Instagram */}
  <a
    href="https://www.instagram.com/your-handle"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Instagram"
    className="hover:text-white transition-colors duration-200"
  >
    <FaInstagram />
  </a>

  {/* Phone */}
  <a
    href="tel:+919619370942"
    aria-label="Call"
    className="hover:text-white transition-colors duration-200"
  >
    <FaPhone />
  </a>


    </div>
  </motion.div>
</div>


      {/* Achievements / Skills */}
      <ProfessionalHighlights />
    </section>
  );
};

export default AboutUs;
