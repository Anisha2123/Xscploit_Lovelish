import { motion } from "framer-motion";
// import { useRouter } from "next/router"; // or react-router-dom if using CRA

const CTA = () => {
//   const router = useRouter(); // for navigation

//   const handleClick = () => {
//     router.push("/courses"); // change to your courses or signup route
//   };

  return (
    <section className="relative bg-black py-18 flex items-center justify-center overflow-hidden">
      {/* subtle neon overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#00ff9d11] via-transparent to-[#00ff9d11] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center px-6 max-w-3xl"
      >
        {/* Headline */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
          Start Your <span className="text-[#00ff9d]">Cybersecurity Journey</span> Today
        </h2>

        {/* Subtext */}
        <p className="mt-4 text-gray-400 text-lg sm:text-xl">
          Hands-on labs, real CVE-based attacks, and career-ready skills await. Build your profile and master ethical hacking.
        </p>

        {/* CTA Button */}
        <button
  onClick={() => window.location.href = "/Xsploit"}
  className="mt-8 px-10 py-4 bg-[#00ff9d] text-black font-semibold rounded-xl text-lg shadow-lg hover:scale-105 transition-transform duration-300"
>
  Explore Courses
</button>


        {/* Optional trust line */}
        <div className="mt-6 flex justify-center gap-6 text-gray-400 text-sm">
          <span>1000+ Students Trained</span>
          <span>Certification Included</span>
          <span>Industry-Aligned Labs</span>
        </div>
      </motion.div>
    </section>
  );
};

export default CTA;
