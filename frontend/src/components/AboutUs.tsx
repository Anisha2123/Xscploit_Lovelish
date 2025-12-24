import React from "react";
import { FaLinkedin, FaWhatsapp, FaInstagram, FaPhone } from "react-icons/fa";
import { motion } from "framer-motion";
import ProfessionalHighlights from "./Features";

const AboutUs: React.FC = () => {
  return (
    <section className="relative bg-[#080b0e] text-white py-20">
      {/* Container */}
      <div className="max-w-6xl mx-auto px-6">

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center text-3xl md:text-4xl font-semibold tracking-widest text-[#b084f5] mb-16"
        >
          ABOUT US
        </motion.h1>

        {/* Main Content */}
        <div className="flex max-sm:flex-col md:flex-row items-center md:items-start gap-12">

          {/* Avatar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex justify-center md:justify-start w-full md:w-1/3"
          >
            <img
              src="/images/dp.png"
              alt="Profile"
              className="max-sm:w-44 max-sm:h-44 sm:w-92 sm:h-92 rounded-lg object-cover bg-white/5"
            />
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full md:w-2/3 max-sm:text-center md:text-left"
          >
            <h2 className="text-2xl md:text-3xl font-semibold text-[#b084f5]">
              Lovelish Nirmal
            </h2>

            <p className="mt-2 text-sm tracking-wide text-[#00ff9d]">
              Ethical Hacker & Cybersecurity Trainer
            </p>

            <p className="mt-4 text-sm text-gray-300 leading-relaxed max-w-xl mx-auto md:mx-0">
              Over 5 years of experience in penetration testing, bug bounty programs,
              and real-world cybersecurity projects. Trained 250+ students globally
              and contributed to international cybersecurity initiatives.
            </p>

            {/* Stats */}
            <div className="mt-8 grid max-sm:grid-cols-2 md:grid-cols-3 gap-4 justify-center md:justify-start">
              {[
                { label: "Experience", value: "5+ Years" },
                { label: "Students", value: "250+" },
                { label: "Bug Bounties", value: "15+" },
                { label: "Projects", value: "20+" },
                { label: "Certifications", value: "CEH, OSCP" },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="px-4 py-3 bg-[#0a0f14] border border-white/10 rounded-md text-center"
                >
                  <p className="text-xs text-gray-400">{stat.label}</p>
                  <p className="mt-1 text-sm font-medium text-[#00ff9d]">
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Socials */}
            <div className="mt-8 flex max-sm:justify-center md:justify-start gap-3">
              {[
                { href: "https://www.linkedin.com/in/lovelish-nirmal-516a383a0/", icon: <FaLinkedin /> },
                { href: "https://wa.me/919619370942", icon: <FaWhatsapp /> },
                { href: "https://www.instagram.com/xsploithack/", icon: <FaInstagram /> },
                { href: "tel:+919619370942", icon: <FaPhone /> },
              ].map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 flex items-center justify-center
                             rounded-md border border-white/10
                             text-gray-400 hover:text-[#00ff9d]
                             hover:border-[#00ff9d40]
                             transition"
                >
                  {React.cloneElement(item.icon, { size: 15 })}
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Highlights */}
        <div className="mt-20">
          <ProfessionalHighlights />
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
