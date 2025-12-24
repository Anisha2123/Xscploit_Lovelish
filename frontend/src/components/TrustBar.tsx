import { motion } from "framer-motion";
// import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import JanuaryOfferPromo from "./Promos/JanuaryOfferPromo";
import "../App.css"
import NewYearStickyBar from "./Promos/NewYearStickyBar";
const TrustShowcase = () => {

   const particles = useRef(
    [...Array(12)].map(() => ({
      top: Math.random() * 100,
      left: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 2 + Math.random() * 2,
    }))
  );

  const targetTime = useRef(
    new Date(Date.now() + 2 * 24 * 60 * 60 * 1000 + 14 * 60 * 60 * 1000 + 32 * 60 * 1000)
  );

  const formatTime = (ms: number) => {
    const totalSeconds = Math.max(Math.floor(ms / 1000), 0);

    const days = Math.floor(totalSeconds / (24 * 3600));
    const hours = Math.floor((totalSeconds % (24 * 3600)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${String(days).padStart(2, "0")}d 
            ${String(hours).padStart(2, "0")}h 
            ${String(minutes).padStart(2, "0")}m 
            ${String(seconds).padStart(2, "0")}s`;
  };

  const [timeLeft, setTimeLeft] = useState(
    formatTime(targetTime.current.getTime() - Date.now())
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(formatTime(targetTime.current.getTime() - Date.now()));
    }, 1000); // updates every second

    return () => clearInterval(interval);
  }, []);
  return (
     <section className="relative py-10 bg-[#080b0e]">
      <div className="max-w-7xl mx-auto px-6">

   <JanuaryOfferPromo />
        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-10">

          {/* ================= WEBINAR ================= */}
      <motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  className="
    relative
    bg-[#0b0f14]
    border border-white/10
    rounded-2xl
    overflow-hidden
    h-[400px]
    flex flex-col
  "
>
  {/* TOP META */}
  <div className="flex items-center justify-between px-8 pt-6">
    <span className="text-[11px] uppercase tracking-widest text-red-400">
      Live Webinar
    </span>

    <span className="text-[11px] text-gray-400">
      Limited to <span className="text-red-400">100 seats</span>
    </span>
  </div>

  {/* IMAGE */}
  <div className="relative mt-4 h-48 bg-[#111827]">
    <img
      src="/images/webinar.png"
      alt="Ethical Hacking Webinar"
      loading="eager"
      decoding="async"
      fetchpriority="high"
      className="absolute inset-0 w-full h-full object-cover opacity-95"
    />

    {/* Subtle overlay */}
    <div className="absolute inset-0 bg-[#080b0e]/35" />

    {/* Countdown */}
    <div
      className="absolute bottom-4 left-1/2 -translate-x-1/2 
                 px-4 py-1.5 rounded-lg 
                 border border-white/10 
                 text-[11px] font-mono text-red-400 
                 bg-black/40 backdrop-blur-sm"
    >
      Starts in {timeLeft}
    </div>
  </div>

  {/* CONTENT */}
  <div className="px-8 py-6 flex flex-col flex-1 ">
    <h3 className="text-xl font-medium text-white leading-snug mb-2">
      Getting Started with Ethical Hacking
    </h3>

    {/* CTA — pinned */}
    <button
      disabled
      className="
        mt-auto
        w-full
        py-3
        rounded-lg
        border border-white/10
        text-sm
        text-gray-300
        bg-white/[0.02]
        cursor-not-allowed
      "
    >
      Registration Opens Soon
    </button>
  </div>
</motion.div>




          {/* ================= ANDROID ================= */}
      <motion.div
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ delay: 0.1 }}
  className="
    relative
    bg-[#0b0f14]
    border border-white/10
    rounded-2xl
    overflow-hidden
    h-[400px]
    flex flex-col
  "
>
  {/* TOP META */}
  <div className="absolute top-5 left-5 z-20">
    <span className="px-3 py-1 text-[11px] uppercase tracking-widest 
                     rounded-full border border-emerald-500/30 
                     text-emerald-400 bg-emerald-500/10">
      Launching Soon
    </span>
  </div>

  <div className="absolute top-5 right-5 z-20 
                  px-3 py-1 rounded-full 
                  border border-white/15 
                  bg-black/40 text-[11px] text-gray-300">
    ₹2,999
  </div>

  {/* IMAGE */}
  <div className="relative h-62 bg-[#111827]">
    <img
      src="/images/android-hacking.png"
      alt="Android Hacking"
      loading="eager"
      decoding="async"
      fetchpriority="high"
      className="absolute h-62 inset-0 w-full object-cover opacity-95"
    />
    <div className="absolute inset-0 bg-[#080b0e]/35" />
  </div>

  {/* CONTENT */}
  <div className="p-6 flex flex-col flex-1">
    <h3 className="text-xl font-medium text-white leading-snug">
      Android Hacking
    </h3>

    {/* CTA — pinned */}
    <button
      disabled
      className="
        mt-auto
        w-full
        py-2.5
        rounded-lg
        border border-white/10
        text-sm
        tracking-wide
        text-gray-300
        bg-white/[0.02]
        cursor-not-allowed
      "
    >
      Early Access Opening Soon
    </button>
  </div>
</motion.div>



          {/* ================= KALI ================= */}
      <motion.div
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ delay: 0.2 }}
  className="
    relative
    bg-[#0b0f14]
    border border-white/10
    rounded-2xl
    overflow-hidden
    h-[400px]
    flex flex-col
  "
>
    {/* TOP META */}
  <div className="absolute top-5 left-5 z-20">
    <span className="px-3 py-1 text-[11px] uppercase tracking-widest 
                     rounded-full border border-emerald-500/30 
                     text-emerald-400 bg-emerald-500/10">
      Launching Soon
    </span>
  </div>

  <div className="absolute top-5 right-5 z-20 
                  px-3 py-1 rounded-full 
                  border border-white/15 
                  bg-black/40 text-[11px] text-gray-300">
    ₹3,999
  </div>
  {/* IMAGE */}
  <div className="relative h-62 bg-[#111827]">
    <img
      src="/images/promotions/kali-linux.webp"
      alt="Kali Linux Mastery"
      loading="eager"
      decoding="async"
      fetchpriority="high"
      className="absolute inset-0 w-full h-62 object-cover opacity-65"
    />
    <div className="absolute inset-0 bg-[#080b0e]/35" />
  </div>

  {/* CONTENT */}
  <div className="p-6 flex flex-col flex-1">
    <h3 className="text-lg font-medium text-white">
      Kali Linux Mastery
    </h3>

    {/* CTA pinned */}
    <button
      disabled
      className="
        mt-auto
        w-full
        py-2.5
        rounded-lg
        border border-white/10
        text-sm
        tracking-wide
        text-gray-300
        bg-white/[0.02]
        cursor-not-allowed
      "
    >
      Launching Shortly
    </button>
  </div>
</motion.div>




        </div>
        <NewYearStickyBar />
      </div>
    </section>
  );
};

export default TrustShowcase;

/* ---------- CARD ---------- */

const PromoCard = ({
  tag,
  title,
  desc,
  image,
  highlight = false,
}: {
  tag: string;
  title: string;
  desc: string;
  image: string;
  highlight?: boolean;
}) => {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 200 }}
      className={`relative rounded-2xl overflow-hidden border 
        ${highlight ? "border-[#00ff9d55]" : "border-white/10"}
        bg-[#0a0f14]`}
    >
      {/* image */}
      <div className="h-44 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover opacity-80"
        />
      </div>

      {/* content */}
      <div className="p-6 space-y-3">
        <span className="text-xs uppercase tracking-widest text-[#00ff9d]">
          {tag}
        </span>

        <h3 className="text-lg font-semibold text-white">
          {title}
        </h3>

        <p className="text-sm text-gray-400 leading-relaxed">
          {desc}
        </p>
      </div>

      {/* glow for webinar */}
      {highlight && (
        <div className="absolute inset-0 pointer-events-none border border-[#00ff9d33] rounded-2xl shadow-[0_0_40px_#00ff9d22]" />
      )}
    </motion.div>
  );
};
