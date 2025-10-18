import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, ShoppingCart, Facebook, Twitter, Instagram, Github, Mouse } from 'lucide-react';

// --- 1. Navbar Component (Your new layout) ---
const Navbar = () => {
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [hoveredLink, setHoveredLink] = useState(null);
  const navLinks = ["Home", "Products", "About", "Contact"];

  useEffect(() => {
    const controlNavbar = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 100) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      setLastScrollY(window.scrollY);
    };
    window.addEventListener("scroll", controlNavbar);
    return () => window.removeEventListener("scroll", controlNavbar);
  }, [lastScrollY]);

  return (
    <motion.nav
      animate={{ y: visible ? 0 : -120 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="fixed top-4 left-[17%] -translate-x-1/2 z-[100] w-[90%] max-w-screen-lg backdrop-blur-xl bg-white/5 border border-white/10 shadow-lg shadow-black/20 rounded-full flex items-center px-8 py-3"
    >
      <motion.div className="flex items-center space-x-2 cursor-pointer" whileHover={{ scale: 1.05 }}>
        <Zap className="text-white w-7 h-7 drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
        <h1 className="text-white text-xl font-bold tracking-wide">EnergyX</h1>
      </motion.div>
      <div className="flex items-center gap-x-4 ml-auto">
        <ul className="hidden md:flex items-center space-x-2 relative" onMouseLeave={() => setHoveredLink(null)}>
          {navLinks.map((link) => (
            <li key={link} className="relative px-4 py-2 rounded-full cursor-pointer" onMouseEnter={() => setHoveredLink(link)}>
              {hoveredLink === link && <motion.span layoutId="glider" className="absolute inset-0 bg-white/10 rounded-full" />}
              <span className="relative z-10 text-white text-sm font-medium">{link}</span>
            </li>
          ))}
        </ul>
        <motion.button className="relative flex items-center justify-center bg-cyan-500/20 border border-cyan-500 rounded-full w-12 h-12 text-cyan-400" whileHover={{ scale: 1.1, boxShadow: '0 0 20px rgba(0, 216, 255, 0.5)' }} whileTap={{ scale: 0.9 }}>
          <ShoppingCart size={20} />
          <span className="absolute -top-1 -right-1 bg-cyan-500 text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">3</span>
        </motion.button>
      </div>
    </motion.nav>
  );
};

// --- 2. Social Sidebar Component (Your new layout) ---
const SocialSidebar = () => {
  const socialLinks = [
    { icon: <Facebook size={20} />, href: '#' }, { icon: <Twitter size={20} />, href: '#' },
    { icon: <Instagram size={20} />, href: '#' }, { icon: <Github size={20} />, href: '#' },
  ];
  return (
    <motion.div className="fixed left-3 md:left-6 top-[68%] -translate-y-1/2 z-50 flex flex-col gap-6" initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 1.5, staggerChildren: 0.2 }}>
      {socialLinks.map((link, index) => (
        <motion.a key={index} href={link.href} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white" variants={{ hidden: { x: -20, opacity: 0 }, visible: { x: 0, opacity: 1 } }} whileHover={{ scale: 1.2, color: '#00d8ff' }} whileTap={{ scale: 0.9 }}>
          {link.icon}
        </motion.a>
      ))}
    </motion.div>
  );
};

// --- 3. UPDATED: Right Corner Section (avatars + video) ---
const RightCornerSection = () => {
  const avatars = [ '/avatars/a1.jpg', '/avatars/a2.jpg', '/avatars/a3.jpg','/avatars/OIP.jpg', ];
  
  return (
    <motion.div className="fixed right-6 bottom-8 z-50 flex flex-col items-center gap-6" initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 1.5, duration: 0.6, ease: 'easeOut' }}>
      {/* Avatar Row */}
      <div className="flex -space-x-3">
        {avatars.map((src, i) => (
          <motion.img key={i} src={src} alt={`avatar-${i}`} className="w-10 h-10 rounded-full border-2 border-white/20 object-cover" whileHover={{ scale: 1.15, zIndex: 10 }} />
        ))}
      </div>

      {/* NEW: Video Element */}
      <motion.video
        src="/avatars/mon.webm"
        className="w-[164px] h-32 rounded-xl object-cover border border-white/20 shadow-lg shadow-green-500/20" // Changed to w-[64px]
        autoPlay
        loop
        muted
        playsInline
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      />
    </motion.div>
  );
};

// --- 4. Scroll Indicator (Unchanged) ---
const ScrollIndicator = () => (
  <motion.div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5, duration: 1 }} exit={{ opacity: 0 }}>
    <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}>
      <Mouse className="text-white" size={24} />
    </motion.div>
    <span className="text-xs text-white uppercase tracking-widest">Scroll Down</span>
  </motion.div>
);

// --- 5. Main Layout (Updated to include RightCornerSection) ---
const Layout = ({ children, showMainContent }) => {
  return (
    <>
      <Navbar />
      <SocialSidebar />
      <RightCornerSection />
      <AnimatePresence>{showMainContent && <ScrollIndicator />}</AnimatePresence>
      <main>{children}</main>
    </>
  );
};

export default Layout;