import { motion } from "framer-motion";
// import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const TrustShowcase = () => {
  const [timeLeft, setTimeLeft] = useState("02d 14h 32m");

  // (UI placeholder – connect real timer later)
  useEffect(() => {
    const i = setInterval(() => {
      setTimeLeft("02d 14h 31m");
    }, 60000);
    return () => clearInterval(i);
  }, []);
  return (
     <section className="relative py-10 bg-[#080b0e]">
      <div className="max-w-7xl mx-auto px-6">

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-10">

          {/* ================= WEBINAR ================= */}
         <motion.div
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  className="relative bg-[#0b0f14] border border-white/10 rounded-2xl overflow-hidden shadow-lg"
>
  {/* ===== TOP PROMO STRIP ===== */}
  <div className="absolute top-0 inset-x-0 z-30 flex items-center justify-between px-6 py-3 
                  bg-gradient-to-r from-red-600/90 to-red-500/70 backdrop-blur-md">
    <div className="flex items-center gap-3">
      <span className="text-xs font-semibold text-red-300 uppercase
    tracking-widest">
        Live Webinar
      </span>
      
    </div>

    <span className="text-xs font-medium text-white/90">
      Only <strong className="text-red-300">100 Seats</strong>
    </span>
  </div>

  {/* ===== IMAGE WRAPPER ===== */}
  <div className="relative">
    {/* ===== TIMER OVER IMAGE ===== */}
    <div className="absolute top-40 left-1/2 z-20 w-45">
      <div className="px-5 py-2 rounded-2xl 
                      bg-black/80 border border-red-500/40
                      text-red-400 font-mono text-xs
                      shadow-[0_0_25px_rgba(255,0,0,0.25)]
                      backdrop-blur-md">
         Starts in <span className="font-semibold">{timeLeft}</span>
      </div>
    </div>

    {/* IMAGE */}
    <img
      src="/images/webinar.png"
      alt="Ethical Hacking Webinar"
      className="h-52 top-0 w-full object-cover z-20 opacity-40"
    />
  </div>

  {/* ===== CONTENT ===== */}
  <div className="p-6">
    <h3 className="text-xl font-semibold text-white mb-4 leading-snug">
      Getting Started with Ethical Hacking
    </h3>

    {/* CTA */}
   <button
  className="
    w-full py-3 rounded-xl font-semibold
    uppercase
    tracking-widest
    bg-gradient-to-r from-red-700 via-red-500 to-red-400 text-sm
    hover:from-red-600 hover:via-red-500 hover:to-red-400
    text-white font-semibold tracking-wide
    shadow-[0_12px_35px_rgba(220,38,38,0.35)]
    border border-red-500/40
    transition-all duration-200
  "
>
  Coming soon
</button>




  </div>
</motion.div>



          {/* ================= ANDROID ================= */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="relative bg-[#0b0f14] border border-white/10 rounded-xl overflow-hidden"
          >
            {/* Badge */}
            <div className="absolute top-4 left-4 z-20">
              <span className="px-3 py-1 text-xs font-semibold rounded-full bg-[#7f1d1d] text-red-300">
                LAUNCHING SOON
              </span>
              
            </div>

            {/* Price */}
            <div className="absolute top-4 right-4 z-20 text-sm bg-black/60 px-3 py-1 rounded-full border border-red-500/30 text-red-400">
              ₹2,999
            </div>

            <img
              src="/images/android-hacking.png"
              alt="Android Hacking"
              className="h-52 w-full object-cover opacity-40"
            />

            <div className="p-6">
              <h3 className="text-xl font-semibold text-white mb-4 leading-snug">
                Android Hacking
              </h3>

          
<button
  className="
    w-full
    py-3
    rounded-xl
    text-sm
    font-semibold
    uppercase
    tracking-widest
    text-emerald-900
    bg-gradient-to-r from-emerald-300 to-amber-300
    shadow-md
    cursor-default
  "
>
  Early access coming soon
</button>


            </div>
          </motion.div>

          {/* ================= KALI ================= */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="relative bg-[#0b0f14] border border-white/10 rounded-xl overflow-hidden"
          >
            <div className="absolute top-4 left-4 z-20">
              <span className="px-3 py-1 text-xs font-semibold rounded-full bg-[#7f1d1d] text-red-300">
                COMING SOON
              </span>
            </div>

            <div className="absolute top-4 right-4 z-20 text-sm bg-black/60 px-3 py-1 rounded-full border border-red-500/30 text-red-400">
              ₹3,499
            </div>

            <img
              src="/images/kali-linux.png"
              alt="Kali Linux"
              className="h-52 w-full object-cover opacity-40"
            />

            <div className="p-6">
              <h3 className="text-xl font-semibold text-white mb-4 leading-snug">
                Kali Linux Mastery
              </h3>
              <button
  className="
    w-full
    py-3
    rounded-xl
    text-sm
    font-semibold
    uppercase
    tracking-widest
    text-emerald-900
    bg-gradient-to-r from-emerald-300 to-amber-300
    shadow-md
    cursor-default
  "
>
  Launching Shortly
</button>

            </div>
          </motion.div>

        </div>
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
