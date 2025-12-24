import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const TARGET_DATE = new Date("2026-01-31T23:59:59");

function getTimeLeft() {
  const diff = TARGET_DATE.getTime() - new Date().getTime();
  if (diff <= 0) return null;

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function JanuaryOfferCountdown() {
  const [time, setTime] = useState(getTimeLeft());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getTimeLeft());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!time) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="
        relative overflow-hidden rounded-2xl
        border border-white/10
        bg-gradient-to-br from-[#0b0f14] via-[#0a1411] to-[#08130f]
        px-6 py-8 md:px-10 md:py-10 mb-10
      "
    >
      {/* 🎆 NEW YEAR GLOW BACKGROUNDS */}
      <div className="absolute -top-32 -right-32 w-96 h-96 
                      bg-gradient-to-br from-amber-400/20 to-emerald-400/10 
                      blur-3xl rounded-full" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 
                      bg-gradient-to-tr from-cyan-400/15 to-emerald-400/10 
                      blur-3xl rounded-full" />

      {/* ✨ SPARKLE DOTS */}
      <div className="absolute inset-0 opacity-[0.08] 
        bg-[radial-gradient(circle_at_20%_20%,#ffffff_1px,transparent_1px),
            radial-gradient(circle_at_80%_30%,#ffffff_1px,transparent_1px),
            radial-gradient(circle_at_50%_80%,#ffffff_1px,transparent_1px)]
        bg-[size:120px_120px]" />

      <div className="relative z-10 flex max-md:flex-col md:flex-row md:items-center md:justify-between gap-8">
        {/* LEFT CONTENT */}
        <div>
          {/* NEW YEAR BADGE */}
          <span className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 
                           text-[11px] uppercase tracking-widest rounded-full
                           bg-gradient-to-r from-amber-400/20 to-emerald-400/10
                           text-amber-300 border border-amber-400/30">
            🎉 New Year Sale
          </span>

          <h2 className="text-2xl md:text-3xl font-semibold text-white leading-tight">
            Get <span className="text-emerald-400">up to 50% OFF</span>
            <span className="block text-gray-300 text-base font-normal mt-1">
              on all courses this January
            </span>
          </h2>

          <p className="mt-3 text-sm text-gray-400">
            Kickstart 2026 with industry-ready cyber skills  
            <span className="block mt-5">
              <span className="px-3 py-1 text-xs font-semibold bg-gradient-to-r from-yellow-400 via-amber-400 to-orange-300 rounded-full text-black">
  ⏰ Ends on 31th Jan
</span>


            </span>
          </p>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex flex-col items-start md:items-end gap-5">
          {/* COUNTDOWN */}
          <div className="flex gap-3">
            {[
              { label: "Days", value: time.days },
              { label: "Hrs", value: time.hours },
              { label: "Min", value: time.minutes },
              { label: "Sec", value: time.seconds },
            ].map((item) => (
              <div
                key={item.label}
                className="
                  w-14 rounded-xl
                  bg-black/50 backdrop-blur
                  border border-white/10
                  py-2 text-center
                "
              >
                <div className="text-lg font-semibold text-white">
                  {String(item.value).padStart(2, "0")}
                </div>
                <div className="text-[10px] uppercase tracking-widest text-gray-400">
                  {item.label}
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <a href ="/courses"
            className="
              px-7 py-3 rounded-xl
              text-sm font-semibold tracking-wide
              text-emerald-900
              bg-gradient-to-r from-emerald-300 via-amber-300 to-emerald-200
              shadow-[0_14px_45px_rgba(52,211,153,0.45)]
              hover:brightness-110
              transition
            "
          >
            Explore Courses
          </a>
        </div>
      </div>
    </motion.section>
  );
}
