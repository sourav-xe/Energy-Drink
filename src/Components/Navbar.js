import React from "react";
import { motion } from "framer-motion";
import { Zap } from "lucide-react";

const Navbar = () => {
  const navLinks = ["Home", "Products", "About", "Contact"];

  return (
    // ✅ Fixed + Centered + Full responsive width
    <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-full flex justify-center">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-[70%] max-w-5xl backdrop-blur-2xl bg-white/10 border border-white/20 
                   shadow-[0_8px_32px_rgba(0,0,0,0.5),inset_0_0_10px_rgba(255,255,255,0.15)] 
                   rounded-full flex justify-between items-center px-10 py-4 relative overflow-hidden"
      >
        {/* Glass reflection */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent opacity-30 pointer-events-none rounded-full" />

        {/* === Logo === */}
        <motion.div
          className="flex items-center space-x-2 cursor-pointer z-10"
          whileHover={{ scale: 1.05, rotateY: 10 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <Zap className="text-white w-7 h-7 drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]" />
          <h1 className="text-white text-xl font-extrabold tracking-wide">
            EnergyX
          </h1>
        </motion.div>

        {/* === Nav Links === */}
        <ul className="flex items-center space-x-8 z-10">
          {navLinks.map((link, i) => (
            <motion.li
              key={i}
              className="text-white text-base font-medium cursor-pointer px-4 py-2 
                         rounded-full transition-all duration-300 relative"
              whileHover={{
                scale: 1.15,
                backgroundColor: "rgba(255,255,255,0.15)",
                boxShadow: "0 0 12px rgba(255,255,255,0.4)",
              }}
            >
              {link}
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </nav>
  );
};

export default Navbar;
