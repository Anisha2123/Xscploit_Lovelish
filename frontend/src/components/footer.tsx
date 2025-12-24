import React from "react";
import { motion } from "framer-motion";
import {
  FaLinkedin,
  FaInstagram,
  FaWhatsapp,
  FaPhoneAlt,
  FaEnvelope,
  FaShieldAlt,
} from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0b0f14] text-gray-400 px-6 pt-16">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-7xl mx-auto grid max-sm:grid-cols-1 md:grid-cols-4 gap-12"
      >
        {/* Brand */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white tracking-wide">
            XSPLOIT
          </h3>
          <p className="text-sm leading-relaxed">
            Secure, industry-aligned cybersecurity training platform focused on
            real-world ethical hacking and defensive security practices.
          </p>
        </div>

        {/* Platform */}
        <div className="max-sm:hidden">
          <h4 className="text-xs font-semibold text-white uppercase tracking-widest mb-4 ">
            QUICK LINKS
          </h4>
          <ul className="space-y-2 text-sm grid max-sm:grid-cols-4">
            <li><a href="/" className="hover:text-white">Home</a></li>
            <li><a href="/courses" className="hover:text-white">Courses</a></li>
            <li><a href="/contact" className="hover:text-white">Contact</a></li>
            <li><a href="/profile" className="hover:text-white">Profile</a></li>
          </ul>
        </div>

        {/* Compliance */}
        <div className="max-sm:hidden">
          <h4 className="text-xs font-semibold text-white uppercase tracking-widest mb-4">
            Compliance & Trust
          </h4>

          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-3">
              <FaShieldAlt className="text-[#00ff9d]" />
              ISO 27001 aligned security practices
            </li>
            <li className="flex items-center gap-3">
              <FaShieldAlt className="text-[#00ff9d]" />
              SOC 2 inspired infrastructure controls
            </li>
            <li className="flex items-center gap-3">
              <FaShieldAlt className="text-[#00ff9d]" />
              GDPR compliant data handling
            </li>
          </ul>

          <p className="text-xs mt-4 text-gray-500 leading-relaxed">
            Certifications listed represent alignment with global security
            standards and best practices.
          </p>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-xs font-semibold text-white uppercase tracking-widest mb-4">
            Contact
          </h4>

          <div className="space-y-3 text-sm gap-5">
            <a href="mailto:xsploithack@gmail.com" className="flex items-center gap-3 hover:text-white">
              <FaEnvelope /> xsploithack@gmail.com
            </a>

            <a href="tel:+919619370942" className="flex items-center gap-3 hover:text-white">
              <FaPhoneAlt /> +91 96193 70942
            </a>

            <a
              href="https://wa.me/919619370942"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 hover:text-white"
            >
              <FaWhatsapp /> WhatsApp Support
            </a>
          </div>

          {/* Socials */}
          <div className="flex gap-4 mt-6 text-lg">
            <a href="https://www.linkedin.com/in/lovelish-nirmal-516a383a0/" className="hover:text-white"><FaLinkedin /></a>
            <a href="https://www.instagram.com/xsploithack/" className="hover:text-white"><FaInstagram /></a>
          </div>
        </div>
      </motion.div>

      {/* Bottom */}
      <div className="mt-14 border-t border-white/10 py-6 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Xsploit. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
