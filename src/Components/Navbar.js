import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Zap } from "lucide-react";

const Navbar = () => {
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [hoveredLink, setHoveredLink] = useState(null);

  const navLinks = ["Home", "Products", "About", "Contact"];

  // --- Scroll detection logic ---
  useEffect(() => {
    const controlNavbar = () => {
      // If scrolling down, hide navbar
      if (window.scrollY > lastScrollY && window.scrollY > 100) {
        setVisible(false);
      } else { // If scrolling up, show navbar
        setVisible(true);
      }
      // Remember current scroll position for the next move
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);


  return (
    <motion.nav
      // --- Animate visibility based on scroll direction ---
      animate={{ y: visible ? 0 : -120 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      
      // --- CORRECTED CENTERING AND SIZING ---
      className="fixed top-6 left-[19%] -translate-x-1/2 z-50
                 w-[90%] max-w-screen-lg  // Responsive width: 90% of screen, capped at 1024px
                 backdrop-blur-xl bg-white/5 border border-white/10
                 shadow-lg shadow-black/20 rounded-full flex justify-between
                 items-center px-8 py-3"
    >
        {/* === Logo === */}
        <motion.div
          className="flex items-center space-x-2 cursor-pointer"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Zap className="text-white w-7 h-7 drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
          <h1 className="text-white text-xl font-bold tracking-wide">
            EnergyX
          </h1>
        </motion.div>

        {/* === Nav Links with Glider Effect === */}
        <ul
          className="flex items-center space-x-2 relative"
          onMouseLeave={() => setHoveredLink(null)}
        >
          {navLinks.map((link) => (
            <li
              key={link}
              className="relative px-4 py-2 rounded-full cursor-pointer"
              onMouseEnter={() => setHoveredLink(link)}
            >
              {hoveredLink === link && (
                <motion.span
                  layoutId="glider"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="absolute inset-0 bg-white/10 rounded-full"
                />
              )}
              <span className="relative z-10 text-white text-sm font-medium">
                {link}
              </span>
            </li>
          ))}
        </ul>
    </motion.nav>
  );
};

export default Navbar;