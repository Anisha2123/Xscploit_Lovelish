import React from "react";
import { FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";
import { motion } from "framer-motion";
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
        / / KNOW ABOUT US
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
          className="px-4 py-2 bg-[#0a0f14] border-l-4 border-[#00ff9d] rounded-r-md text-[#00ff9d] font-mono font-bold shadow-[0_0_15px_#00ff9d22] text-sm"
        >
          {stat.label}: <span className="text-gray-300">{stat.value}</span>
        </motion.div>
      ))}
    </div>

    {/* Socials */}
    <div className=" icons flex gap-12 mt-6 text-[#00ff9d] text-2xl">
      <a href="#" className="hover:text-white transition-colors duration-200 "><FaLinkedin /></a>
      <a href="#" className="hover:text-white transition-colors duration-200"><FaGithub /></a>
      <a href="#" className="hover:text-white transition-colors duration-200"><FaTwitter /></a>
    </div>
  </motion.div>
</div>


      {/* Achievements / Skills */}
      <div className="max-w-7xl mx-auto mt-20 px-6 flex flex-wrap gap-18">
  {[
    {
      title: "Certifications",
      items: ["CEH", "OSCP", "CPT"],
      color: "#b084f5",
      icon: "🛡️",
    },
    {
      title: "Key Achievements",
      items: [
        "International bug bounty contributor",
        "Workshops & conferences speaker",
        "Real-world penetration testing projects",
      ],
      color: "#00ff9d",
      icon: "🚀",
    },
    {
      title: "Community & Mentorship",
      items: [
        "Mentorship for aspiring hackers",
        "Active hacker community & forums",
        "Live Q&A sessions",
      ],
      color: "#ff7f50",
      icon: "💡",
    },
    // {
    //   title: "Tools & Skills",
    //   items: [
    //     "Kali Linux & Metasploit",
    //     "Network & Web App Pen Testing",
    //     "AI-based Recon & Automation",
    //   ],
    //   color: "#ff00ff",
    //   icon: "🖥️",
    // },
  ].map((section, idx) => (
    <motion.div
      key={idx}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: idx * 0.1 }}
      className="flex-1 min-w-[300px] max-w-[calc(50%-16px)] p-6 rounded-xl bg-[#0a0f14] border-l-4 border-opacity-50 hover:border-opacity-100 shadow-[0_0_20px_#00ff9d11] hover:shadow-[0_0_25px_#00ff9d22] transition-all duration-300"
    >
      <div className="flex items-center gap-3 mb-3">
        <span className="text-2xl">{section.icon}</span>
        <h3 className={`text-xl font-bold font-mono`} style={{ color: section.color }}>
          {section.title}
        </h3>
      </div>
      <ul className="text-gray-300 text-sm list-disc list-inside space-y-1">
        {section.items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
      <span className="absolute top-3 right-3 text-gray-500 font-mono text-xs">
        #{idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
      </span>
    </motion.div>
  ))}
</div>

    </section>
  );
};

export default AboutUs;
