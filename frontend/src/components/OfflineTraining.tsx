import { motion } from "framer-motion";
import { MapPin, ArrowRight, Users, Award, Clock, Target, ChevronRight, Building2, Zap, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const OfflineTrainingSection = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="mt-32 relative"
    >
      {/* Main Container */}
      <div className="relative group">
        {/* Outer Glow */}
        <motion.div
          className="absolute -inset-1 bg-gradient-to-r from-[#00ff9d] via-cyan-500 to-[#00ff9d] rounded-[2rem] opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-700"
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          style={{ backgroundSize: "200% 200%" }}
        />

        <div className="relative p-8 sm:p-12 lg:p-16 bg-gradient-to-br from-gray-900/80 via-black/60 to-gray-900/80 border border-[#00ff9d]/20 backdrop-blur-2xl rounded-[2rem] overflow-hidden shadow-2xl">
          
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden rounded-[2rem]">
            {/* Gradient Orbs */}
            <motion.div
              className="absolute -top-40 -right-40 w-80 h-80 bg-[#00ff9d] opacity-10 rounded-full blur-[100px]"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.15, 0.1]
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 opacity-10 rounded-full blur-[100px]"
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.15, 0.1, 0.15]
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            />

            {/* Animated Grid */}
            <motion.div
              className="absolute inset-0 bg-[linear-gradient(rgba(0,255,157,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,157,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"
              animate={{
                backgroundPosition: ["0px 0px", "40px 40px"]
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />

            {/* Shimmer Effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00ff9d]/5 to-transparent"
              animate={{
                x: ["-100%", "100%"]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
            />
          </div>

          {/* Content */}
          <div className="relative z-10">
            
            {/* Header Section */}
            <div className="text-center mb-12">
              {/* Badge */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-[#00ff9d]/10 via-cyan-500/5 to-[#00ff9d]/10 border border-[#00ff9d]/30 backdrop-blur-xl mb-8 shadow-lg shadow-[#00ff9d]/10"
              >
                <motion.div
                  animate={{ 
                    y: [0, -4, 0],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Building2 size={20} className="text-[#00ff9d]" />
                </motion.div>
                <span className="text-xs font-bold tracking-[0.2em] uppercase bg-gradient-to-r from-[#00ff9d] to-cyan-400 bg-clip-text text-transparent">
                  Premium Campus
                </span>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Zap size={16} className="text-[#00ff9d]" />
                </motion.div>
              </motion.div>

              {/* Title */}
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="text-3xl sm:text-4xl lg:text-5xl font-black mb-6 leading-tight"
              >
                <span className="text-white">Offline </span>
                <span className="relative inline-block">
                  <span className="relative z-10 bg-gradient-to-r from-[#00ff9d] via-cyan-400 to-[#00ff9d] bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                    Classroom Training
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-[#00ff9d]/20 to-cyan-400/20 blur-2xl"
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [0.5, 0.8, 0.5]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                </span>
              </motion.h3>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="text-base sm:text-lg text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed"
              >
                Experience hands-on learning in our state-of-the-art cybersecurity labs with industry experts
              </motion.p>

              {/* Location Link */}
              <motion.a
                href="https://maps.app.goo.gl/QRfJaQ7qjNwWbqbP8"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#00ff9d] to-cyan-500 rounded-full text-black font-bold text-sm sm:text-base uppercase tracking-wider shadow-lg shadow-[#00ff9d]/30 hover:shadow-[#00ff9d]/50 transition-all relative overflow-hidden group/btn"
              >
                {/* Shimmer */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{ x: ["-200%", "200%"] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />

                <MapPin size={20} className="relative z-10" />
                <span className="relative z-10">Mumbai Campus</span>
                <motion.div
                  className="relative z-10"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight size={20} />
                </motion.div>
              </motion.a>
            </div>

            {/* Features Grid */}
            <div className="grid max-sm:grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              {[
                {
                  icon: <Users size={24} />,
                  title: "Small Batches",
                  desc: "Max 15 students",
                  color: "from-[#00ff9d] to-cyan-400"
                },
                {
                  icon: <Award size={24} />,
                  title: "Expert Mentors",
                  desc: "Industry veterans",
                  color: "from-cyan-400 to-blue-400"
                },
                {
                  icon: <Shield size={24} />,
                  title: "Real Labs",
                  desc: "Hands-on practice",
                  color: "from-blue-400 to-purple-400"
                },
                {
                  icon: <Target size={24} />,
                  title: "Job Ready",
                  desc: "Career focused",
                  color: "from-purple-400 to-pink-400"
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="relative group/card"
                >
                  <div className="relative p-6 bg-gradient-to-b from-gray-800/40 to-black/40 border border-white/10 rounded-2xl backdrop-blur-sm overflow-hidden hover:border-[#00ff9d]/30 transition-all duration-500">
                    
                    {/* Hover Glow */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-[#00ff9d]/0 to-cyan-500/0 group-hover/card:from-[#00ff9d]/5 group-hover/card:to-cyan-500/5 transition-all duration-500"
                    />

                    {/* Icon */}
                    <div className="relative z-10 mb-4">
                      <motion.div
                        className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} p-[2px]`}
                        whileHover={{ rotate: 5 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="w-full h-full rounded-xl bg-black/80 flex items-center justify-center text-white">
                          {feature.icon}
                        </div>
                      </motion.div>
                    </div>

                    {/* Content */}
                    <h4 className="relative z-10 text-white font-bold text-lg mb-2">
                      {feature.title}
                    </h4>
                    <p className="relative z-10 text-gray-400 text-sm">
                      {feature.desc}
                    </p>

                    {/* Corner Accent */}
                    <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-[#00ff9d]/0 group-hover/card:border-[#00ff9d]/30 transition-all duration-500 rounded-br-2xl" />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Schedule Info Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1 }}
              className="relative p-6 bg-gradient-to-r from-black/40 via-gray-900/40 to-black/40 border border-[#00ff9d]/10 rounded-2xl backdrop-blur-sm"
            >
              <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                
                {/* Left - Info Pills */}
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
                  {[
                    { icon: <Clock size={16} />, text: "Flexible timings" },
                    { icon: <Users size={16} />, text: "Weekend batches" },
                    { icon: <Zap size={16} />, text: "Fast-track options" }
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 1.1 + i * 0.05 }}
                      className="flex items-center gap-2 px-4 py-2 bg-[#00ff9d]/5 border border-[#00ff9d]/20 rounded-full"
                    >
                      <span className="text-[#00ff9d]">{item.icon}</span>
                      <span className="text-sm text-gray-300">{item.text}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Right - CTA */}
                <Link to="/contact">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative px-8 py-4 bg-gradient-to-r from-gray-800 to-black border-2 border-[#00ff9d]/30 hover:border-[#00ff9d] rounded-full text-white font-bold text-sm uppercase tracking-wider transition-all overflow-hidden group/cta shadow-lg hover:shadow-[#00ff9d]/20"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-[#00ff9d]/0 via-[#00ff9d]/20 to-[#00ff9d]/0"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.6 }}
                    />
                    <span className="relative z-10 flex items-center gap-2">
                      Contact for Schedules
                      <ChevronRight size={18} className="group-hover/cta:translate-x-1 transition-transform" />
                    </span>
                  </motion.button>
                </Link>
              </div>
            </motion.div>

            {/* Bottom Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1.2 }}
              className="mt-8 flex flex-wrap items-center justify-center gap-8 text-center"
            >
              {[
                { value: "500+", label: "Students Trained" },
                { value: "95%", label: "Placement Rate" },
                { value: "24/7", label: "Lab Access" }
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1.3 + i * 0.1 }}
                  className="relative"
                >
                  <div className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-[#00ff9d] to-cyan-400 bg-clip-text text-transparent mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-500 uppercase tracking-wider">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>

          </div>

          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-32 h-32 border-t-2 border-l-2 border-[#00ff9d]/20 rounded-tl-[2rem]" />
          <div className="absolute bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 border-[#00ff9d]/20 rounded-br-[2rem]" />
        </div>
      </div>
    </motion.div>
  );
};

export default OfflineTrainingSection;