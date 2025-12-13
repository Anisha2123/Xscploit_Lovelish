import { ShieldCheck, Users, Terminal, Award } from "lucide-react";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";

const Stat = ({ value, label, Icon }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    const duration = 1200;
    const stepTime = Math.max(Math.floor(duration / end), 20);

    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) clearInterval(timer);
    }, stepTime);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <div className="flex flex-col items-center text-center">
      <div className="mb-4 flex items-center justify-center w-12 h-12 rounded-xl bg-[#00ff9d14]">
        <Icon className="w-6 h-6 text-[#00ff9d]" />
      </div>
      <h3 className="text-3xl font-bold text-white tracking-tight">
        {count}+
      </h3>
      <p className="text-sm text-gray-400 mt-1">{label}</p>
    </div>
  );
};

const TrustBar = () => {
  const companies = [
    { name: "Google", src: "/logos/gojek.svg" },
    { name: "Amazon", src: "/logos/googlepay.svg" },
    { name: "Microsoft", src: "/logos/esotericsoftware.svg" },
    { name: "Amazon", src: "/logos/googlepay.svg" },
    { name: "Microsoft", src: "/logos/helix.svg" },
    { name: "Amazon", src: "/logos/delta.svg" },
    { name: "Microsoft", src: "/logos/bmcsoftware.svg" },
    { name: "Meta", src: "/logos/jirasoftware.svg" },
  ];

  return (
    <section className="relative w-full bg-[#0a0d0c] py-20 overflow-hidden">
      {/* cyber scan line */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(0,255,157,0.08),transparent)] animate-pulse" />

      {/* glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#00ff9d18,transparent_60%)]" />

      <div className="relative max-w-6xl mx-auto px-6">
        {/* stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          <Stat value={10000} label="Students Trained" Icon={Users} />
          <Stat value={120} label="Security Modules" Icon={Award} />
          <Stat value={50} label="Live Labs" Icon={Terminal} />
          <Stat value={95} label="Success Rate" Icon={ShieldCheck} />
        </div>

        {/* trusted by companies */}
        <div className="mt-20 text-center">
          <p className="text-xs uppercase tracking-widest text-gray-500 mb-8">
            Trusted by learners placed at
          </p>

          <div className="flex flex-wrap justify-center items-center gap-14 opacity-70">
            {companies.map((c, i) => (
              <motion.img
                key={i}
                src={c.src}
                alt={c.name}
                className="h-7 brightness-0 invert opacity-70 hover:opacity-100 transition"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustBar;