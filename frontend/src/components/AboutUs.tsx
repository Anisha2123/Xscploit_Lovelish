import React, { useState } from "react";
import { FaLinkedin, FaWhatsapp, FaInstagram, FaPhone } from "react-icons/fa";
import { motion, useScroll, useTransform } from "framer-motion";
import { Award, Users, Target, Shield, TrendingUp, CheckCircle, Zap, Globe } from "lucide-react";
import ProfessionalHighlights from "./Features";

const achievements = [
  { icon: <Award size={20} />, label: "Experience", value: "5+ Years", color: "#00ff9d" },
  { icon: <Users size={20} />, label: "Students Trained", value: "250+", color: "#00f2ff" },
  { icon: <Target size={20} />, label: "Bug Bounties", value: "15+", color: "#a855f7" },
  { icon: <Shield size={20} />, label: "Projects", value: "20+", color: "#f59e0b" },
];

const certifications = [
  { name: "CEH", full: "Certified Ethical Hacker", color: "#00ff9d" },
  { name: "OSCP", full: "Offensive Security Certified Professional", color: "#00f2ff" },
];

const expertise = [
  "Penetration Testing",
  "Bug Bounty Hunting",
  "Web Application Security",
  "Network Security",
  "Exploit Development",
  "Security Training",
];

const trustIndicators = [
  { icon: <CheckCircle size={16} />, text: "Industry Recognized Expert" },
  { icon: <Zap size={16} />, text: "Real-World Experience" },
  { icon: <Globe size={16} />, text: "Global Training Reach" },
  { icon: <TrendingUp size={16} />, text: "Proven Track Record" },
];

const AboutUs: React.FC = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section ref={containerRef} className="relative bg-gradient-to-b from-[#020617] via-[#0a0f1a] to-[#020617] text-white py-32 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" 
             style={{
               backgroundImage: `radial-gradient(circle at 2px 2px, #00ff9d 1px, transparent 0)`,
               backgroundSize: '40px 40px',
             }} 
        />
      </div>

      {/* Floating Orbs */}
      <motion.div 
        style={{ y }}
        className="absolute top-20 right-10 w-96 h-96 bg-[#00ff9d]/10 rounded-full blur-[150px]" 
      />
      <motion.div 
        style={{ y: useTransform(scrollYProgress, [0, 1], [-50, 50]) }}
        className="absolute bottom-20 left-10 w-96 h-96 bg-[#a855f7]/10 rounded-full blur-[150px]" 
      />

      {/* Scanline Effect */}
      <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(0,255,157,0.02)_0px,transparent_2px,transparent_4px)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6">
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-sm border border-[#a855f7]/30 bg-[#a855f7]/5 backdrop-blur-sm mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#a855f7] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#a855f7]"></span>
            </span>
            <span className="text-[11px] font-mono font-bold tracking-[0.15em] uppercase text-[#a855f7]">
              Meet Your Instructor
            </span>
          </div>

          {/* Title */}
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tighter mb-6">
            <span className="block text-white">LEARN FROM</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#a855f7] via-[#00ff9d] to-[#00f2ff]">
              THE EXPERT
            </span>
          </h2>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-start mb-20">
          
          {/* Left: Image & Quick Stats */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative flex flex-col items-center lg:items-start"
          >
            {/* Image Container */}
            <div className="relative group">
              {/* Glow Effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-[#a855f7]/20 via-[#00ff9d]/20 to-[#00f2ff]/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Image Frame */}
              <div className="relative bg-gradient-to-br from-[#0f1419] to-[#0a0d12] p-2 border border-white/10 group-hover:border-[#00ff9d]/50 transition-all duration-500">
                {/* Loading Skeleton */}
                {!imageLoaded && (
                  <div className="absolute inset-2 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
                )}
                
                <img
                  src="/images/dp.webp"
                  alt="Lovelish Nirmal - Cybersecurity Expert"
                  loading="eager"
                  onLoad={() => setImageLoaded(true)}
                  className={`w-full aspect-square object-cover transition-all duration-700 group-hover:scale-[1.02]
                    ${imageLoaded ? "opacity-100" : "opacity-0"}
                  `}
                />

                {/* Corner Accents */}
                <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-[#00ff9d]" />
                <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-[#00ff9d]" />
              </div>

              {/* Floating Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="absolute -bottom-6 lg:-right-6 right-1/2 lg:right-auto translate-x-1/2 lg:translate-x-0 px-6 py-4 bg-black/90 backdrop-blur-xl border border-[#00ff9d]/30 shadow-2xl"
              >
                <div className="flex items-center gap-3">
                  <div className="text-[#00ff9d]">
                    <Shield size={24} />
                  </div>
                  <div>
                    <div className="text-white font-bold text-lg">250+</div>
                    <div className="text-slate-400 text-xs font-mono">Students Trained</div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="mt-12 grid grid-cols-2 gap-3"
            >
              {trustIndicators.map((item, i) => (
                <div key={i} className="flex items-center gap-2 px-4 py-3 bg-black/40 border border-white/10 backdrop-blur-sm">
                  <div className="text-[#00ff9d]">{item.icon}</div>
                  <span className="text-xs text-slate-400">{item.text}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: Info & Details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8 text-center lg:text-left"
          >
            {/* Name & Title */}
            <div>
              <h3 className="text-4xl font-black text-white mb-2 tracking-tight">
                Lovelish Nirmal
              </h3>
              <p className="text-lg text-[#00ff9d] font-mono tracking-wide">
                Ethical Hacker & Cybersecurity Trainer
              </p>
              <div className="mt-4 h-1 w-24 bg-gradient-to-r from-[#00ff9d] to-[#00f2ff] mx-auto lg:mx-0" />
            </div>

            {/* Bio */}
            <p className="text-slate-400 leading-relaxed text-lg">
              With over <span className="text-white font-bold">5 years of hands-on experience</span> in 
              penetration testing, bug bounty programs, and real-world cybersecurity projects. 
              Successfully trained <span className="text-[#00ff9d] font-bold">250+ students globally</span> and 
              contributed to international cybersecurity initiatives.
            </p>

            {/* Certifications */}
            <div className="space-y-3">
              <h4 className="text-sm font-mono uppercase tracking-wider text-slate-500">Certifications</h4>
              <div className="space-y-2">
                {certifications.map((cert, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * i }}
                    className="flex items-center gap-3 p-4 bg-black/40 border border-white/10 hover:border-[#00ff9d]/50 transition-all group"
                  >
                    <div className="w-2 h-2 rounded-full bg-[#00ff9d] group-hover:shadow-[0_0_10px_#00ff9d]" />
                    <div>
                      <span className="text-white font-bold">{cert.name}</span>
                      <span className="text-slate-500 text-sm ml-2">— {cert.full}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Expertise Tags */}
            <div className="max-md:hidden md:block space-y-3">
              <h4 className="text-sm font-mono uppercase tracking-wider text-slate-500">Core Expertise</h4>
              <div className="  flex flex-wrap justify-center gap-2">
                {expertise.map((skill, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.05 * i }}
                    className="px-4 py-2 bg-black/40 border border-white/10 text-slate-300 text-sm font-mono
                               hover:border-[#00ff9d]/50 hover:text-[#00ff9d] transition-all cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-3 pt-4 justify-center lg:justify-start">
              {[
                { href: "https://www.linkedin.com/in/lovelish-nirmal-516a383a0/", icon: <FaLinkedin />, label: "LinkedIn", color: "#0077b5" },
                { href: "https://wa.me/919619370942", icon: <FaWhatsapp />, label: "WhatsApp", color: "#25d366" },
                { href: "https://www.instagram.com/xsploithack/", icon: <FaInstagram />, label: "Instagram", color: "#e4405f" },
                { href: "tel:+919619370942", icon: <FaPhone />, label: "Phone", color: "#00ff9d" },
              ].map((item, i) => (
                <motion.a
                  key={i}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * i }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-12 h-12 flex items-center justify-center bg-black/40 border border-white/10
                             text-slate-400 hover:text-white hover:border-[#00ff9d]/50 transition-all
                             shadow-lg hover:shadow-[0_0_20px_rgba(0,255,157,0.2)]"
                  aria-label={item.label}
                >
                  {React.cloneElement(item.icon, { size: 20 })}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Achievement Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
        >
          {achievements.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className="relative group bg-gradient-to-br from-[#0f1419] to-[#0a0d12] p-6 border border-white/10 
                         hover:border-[#00ff9d]/50 transition-all duration-500 overflow-hidden"
            >
              {/* Hover Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#00ff9d]/0 to-[#00ff9d]/0 
                              group-hover:from-[#00ff9d]/5 group-hover:to-transparent transition-all duration-500" />
              
              <div className="relative">
                <div className="text-[#00ff9d] mb-4 group-hover:scale-110 transition-transform">
                  {stat.icon}
                </div>
                <div className="text-3xl font-black text-white mb-2 font-mono">{stat.value}</div>
                <div className="text-sm text-slate-500 font-mono uppercase tracking-wider">{stat.label}</div>
              </div>

              {/* Progress Bar */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/5">
                <motion.div
                  initial={{ width: "0%" }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: i * 0.2 }}
                  className="h-full bg-gradient-to-r from-[#00ff9d] to-[#00f2ff]"
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="inline-block p-8 bg-gradient-to-br from-[#0f1419] to-[#0a0d12] border border-[#00ff9d]/30 backdrop-blur-sm">
            <p className="text-sm font-mono tracking-[0.15em] uppercase text-[#00ff9d] mb-4">
              Ready to Master Cybersecurity?
            </p>
            <p className="text-slate-400 max-w-2xl mx-auto mb-6">
              Join hundreds of students who have transformed their careers through 
              hands-on training with real-world scenarios.
            </p>
            <motion.button
              onClick={() => {
                const coursesSection = document.getElementById('courses');
                coursesSection?.scrollIntoView({ behavior: 'smooth' });
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-[#00ff9d] text-black font-bold text-sm tracking-wider uppercase
                         hover:bg-white transition-all duration-300 shadow-[0_0_30px_rgba(0,255,157,0.3)]
                         hover:shadow-[0_0_40px_rgba(0,255,157,0.5)]"
            >
              START YOUR JOURNEY →
            </motion.button>
          </div>
        </motion.div>

        {/* Professional Highlights */}
        {/* <div>
          <ProfessionalHighlights />
        </div> */}
      </div>
    </section>
  );
};

export default AboutUs;
