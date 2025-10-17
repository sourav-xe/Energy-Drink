import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const LabubuBanner = () => {
  const containerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      let progress = 1 - rect.top / windowHeight;
      if (progress < 0) progress = 0;
      if (progress > 2) progress = 2;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const leftY = -120 + scrollProgress * 240;
  const rightY = 640 - scrollProgress * 640;
  const leftX = -110;
  const leftDown = scrollProgress <= 1 ? 0 : Math.min((scrollProgress - 1) * 450, 450);

  return (
    <div ref={containerRef} className="relative w-full min-h-[200vh] overflow-hidden font-sans">
      {/* SECTION 1: Dark background with white-bordered text */}
      <section className="relative w-full h-screen flex items-center justify-center text-center bg-[#0d0d0d]">
        {/* LEFT IMAGE */}
        <motion.img
          src="/crousel/la.png"
          alt="Left Model"
          className="absolute left-[2%] bottom-0 h-[130%] object-contain z-30 pointer-events-none"
          style={{ y: leftY + leftDown, x: leftX }}
          initial={{ opacity: 0, y: -70 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />

        {/* RIGHT IMAGE */}
        <motion.img
          src="/crousel/ds.png"
          alt="Right Model"
          className="absolute right-[-8%] bottom-0 h-[130%] object-contain z-30 pointer-events-none"
          style={{ y: rightY }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />

        {/* CENTER TEXT */}
        <motion.div className="relative z-10 w-full max-w-2xl px-6">
          <motion.div
            className="inline-flex items-center px-5 py-2 mb-8 rounded-full bg-[#00ff55] text-black text-sm font-bold shadow-lg"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            ✨ BOOST ENERGY
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-extrabold mb-6 uppercase leading-snug text-[#00ff55]"
            style={{
              WebkitTextStroke: "1px white", // White border around text
              color: "#00ff55", // Keep green fill for style
            }}
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
          >
            TURNING FANTASIES <br /> INTO REALITY.
          </motion.h1>

          <motion.p
            className="text-xs md:text-sm font-semibold mb-8 tracking-widest text-[#00ff55]"
            style={{ WebkitTextStroke: "0.5px white", color: "#00ff55" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            THE FULL STRENGTH OF MONSTER COMES FROM NATURALLY INFUSED TAURINE.
          </motion.p>
        </motion.div>
      </section>

      {/* SECTION 2: Red Bull Theme */}
      <section className="relative w-full h-screen flex items-center justify-center px-8 overflow-hidden bg-gradient-to-b from-[#0f172a] via-[#1e3a8a] to-[#ef4444]">
        <motion.div
          className="absolute right-[13%] top-[5%] w-full max-w-xl text-left"
          initial={{ opacity: 0, x: 100 }}
          animate={{
            opacity: scrollProgress > 0.8 ? 1 : 0,
            x: scrollProgress > 0.8 ? 0 : 100,
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-8xl font-extrabold text-white mb-6 uppercase leading-snug">
            Challenge The Ultra <br /> Convention
          </h2>
          <p className="text-xs md:text-sm text-white/80 font-semibold mb-10 tracking-widest">
            Engineered for the moments you need to be at your peak. This isn't just an energy drink—it's the fuel for your next breakthrough.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-red-600 to-blue-600 text-white font-bold text-lg rounded-full shadow-lg inline-flex items-center gap-3 transition-all duration-300 ease-in-out"
          >
            FIND YOUR WIIINGS
            <ArrowRight size={22} />
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
};

export default LabubuBanner;
