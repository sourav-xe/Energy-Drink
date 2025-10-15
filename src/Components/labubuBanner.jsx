import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const LabubuBanner = () => {
  const bgColor = "bg-[#8B5E3C]";
  const textColor = "text-[#36171a]";

  const containerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Track scroll relative to banner
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Normalize progress: 0 (banner top visible) → 1 (banner scrolled past)
      let progress = 1 - rect.top / windowHeight;
      if (progress < 0) progress = 0;
      if (progress > 1) progress = 1;

      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // initialize on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

const leftY = -120 + scrollProgress * 240;  // moves 240px total
const rightY = 120 - scrollProgress * 240; // moves 240px total


  const handleButtonClick = () => console.log("Drink it up!");

  return (
    <div
      ref={containerRef}
      className={`relative w-full min-h-[100vh] ${bgColor} overflow-hidden font-sans`}
    >
      <section className="relative w-full h-screen flex items-center justify-center text-center">
        {/* LEFT IMAGE */}
        <motion.img
          src="/crousel/la.png"
          alt="Left Model"
          className="absolute left-[-10%] bottom-0 h-[130%] object-contain z-30 pointer-events-none"
           style={{ 
    y: leftY, 
    // rotate: -10 + scrollProgress * 20  // tilt effect: starts -10° → +10° as you scroll
  }}
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />

        {/* RIGHT IMAGE */}
        <motion.img
          src="/crousel/ds.png"
          alt="Right Model"
          className="absolute right-[-10%] bottom-0 h-[130%] object-contain z-30 pointer-events-none"
          style={{ y: rightY,}}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />

        {/* CENTER TEXT */}
        <motion.div className="relative z-10 w-full max-w-2xl px-6">
          <motion.div
            className="inline-flex items-center px-5 py-2 mb-8 rounded-full bg-[#9f50e0] text-white text-sm font-bold shadow-lg"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            ✨ BOOST ENERGY
          </motion.div>

          <motion.h1
            className={`text-5xl md:text-7xl lg:text-8xl font-extrabold mb-6 ${textColor} uppercase leading-snug`}
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
          >
            TURNING FANTASIES <br /> INTO REALITY.
          </motion.h1>

          <motion.p
            className={`text-xs md:text-sm ${textColor} font-semibold mb-8 tracking-widest`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            THE FULL STRENGTH OF MONSTER COMES FROM NATURALLY INFUSED TAURINE.
          </motion.p>

          <motion.button
            onClick={handleButtonClick}
            className="inline-flex items-center space-x-2 px-8 py-3 bg-white text-[#36171a] font-bold rounded-full border-2 border-[#36171a] shadow-md hover:bg-[#f3f3f3] transition-transform duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Drink It Up</span>
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
};

export default LabubuBanner;
