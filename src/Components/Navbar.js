import React, { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [hoveredLink, setHoveredLink] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "About", path: "/about" },
    { name: "Collaborate", path: "/collaborate" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      {/* LEFT: Logo */}
      <motion.div
        className="fixed left-8 top-6 z-[100] flex items-center cursor-pointer group"
        onClick={() => navigate("/")}
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.img
          src="/logo192.png"
          alt="Logo"
          className="w-10 h-10 rounded-full border border-white/30 object-cover
                     shadow-[0_0_15px_rgba(0,255,255,0.4)] group-hover:shadow-[0_0_25px_rgba(0,255,255,0.8)]
                     transition-all duration-300"
          whileHover={{ scale: 1.1 }}
        />
        <span className="ml-2 text-white font-semibold text-lg
                         drop-shadow-[0_0_10px_rgba(0,255,255,0.6)] group-hover:text-cyan-400 transition-all">
          EnergyX
        </span>
      </motion.div>

      {/* CENTER: Nav Links */}
      <motion.nav
        className="fixed top-6 left-1/2 -translate-x-1/2
                   z-[90] px-6 py-3 backdrop-blur-xl bg-white/5 border border-white/10
                   shadow-lg shadow-black/20 rounded-full flex items-center justify-center"
      >
        <ul
          className="flex items-center space-x-6 relative"
          onMouseLeave={() => setHoveredLink(null)}
        >
          {navLinks.map((link) => (
            <li
              key={link.name}
              className="relative px-4 py-2 rounded-full cursor-pointer"
              onMouseEnter={() => setHoveredLink(link.name)}
              onClick={() => navigate(link.path)}
            >
              {(hoveredLink === link.name || location.pathname === link.path) && (
                <motion.span
                  layoutId="glider"
                  className="absolute inset-0 bg-white/10 rounded-full"
                />
              )}
              <span
                className={`relative z-10 text-sm font-medium ${
                  location.pathname === link.path ? "text-cyan-400" : "text-white"
                }`}
              >
                {link.name}
              </span>
            </li>
          ))}
        </ul>
      </motion.nav>

      {/* RIGHT: Buttons */}
      <motion.div
        className="fixed right-8 top-6 z-[100] flex items-center gap-4"
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.button
          onClick={() => navigate("/signin")}
          className="px-4 py-2 text-sm font-semibold rounded-full border border-white/20
                     text-white hover:text-cyan-400 hover:border-cyan-400 transition-all duration-300
                     shadow-[0_0_10px_rgba(0,255,255,0.4)] hover:shadow-[0_0_20px_rgba(0,255,255,0.8)]"
          whileHover={{ scale: 1.05 }}
        >
          Sign In
        </motion.button>

        <motion.button
          className="p-2 rounded-full border border-white/20 text-white hover:text-cyan-400 hover:border-cyan-400
                     shadow-[0_0_10px_rgba(0,255,255,0.4)] hover:shadow-[0_0_20px_rgba(0,255,255,0.8)] transition-all"
          whileHover={{ scale: 1.1 }}
        >
          <ShoppingCart size={20} />
        </motion.button>
      </motion.div>
    </>
  );
};

export default Navbar;
