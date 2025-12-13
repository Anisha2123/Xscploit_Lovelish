import React from "react";
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="relative bg-[#222930] text-[#00ff9d] py-4 px-6 font-mono overflow-hidden">
      {/* Background subtle grid lines / neon glow */}
      <div className="absolute inset-0 w-full h-full opacity-10 pointer-events-none">
        <div className="w-full h-full bg-[repeating-linear-gradient(0deg,#00ff9d11,#00ff9d11 1px,#000 1px,#000 2px)] animate-pulse"></div>
      </div>

      <div className="relative max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-12">
        {/* About */}
        <div className="flex-1">
          <h3 className="text-2xl font-bold mb-3 tracking-wider">XSPLOIT</h3>
          <p className="text-gray-300 text-sm leading-relaxed">
            Cybersecurity & Ethical Hacking Platform. Train with real-world labs,
            Capture the Flag challenges, and enhance your hacking skills.
          </p>
        </div>

        {/* Socials */}
        <div className="flex-1 flex flex-col gap-4">
          <h4 className="font-bold text-lg mb-2 tracking-wide">Connect</h4>
          <div className="flex gap-4 text-2xl">
            <a href="#" className="hover:text-white transition-colors duration-200"><FaLinkedin /></a>
            <a href="#" className="hover:text-white transition-colors duration-200"><FaGithub /></a>
            <a href="#" className="hover:text-white transition-colors duration-200"><FaTwitter /></a>
            <a href="#" className="hover:text-white transition-colors duration-200"><FaEnvelope /></a>
          </div>
        </div>
      </div>

      {/* Bottom line */}
      <div className="mt-12 border-t border-[#00ff9d33] pt-6 text-center text-gray-400 text-xs tracking-wide">
        &copy; {new Date().getFullYear()} Lovelish Nirmal. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
