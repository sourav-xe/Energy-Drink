import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Facebook, Twitter, Instagram, Github, Mouse } from "lucide-react";


// --- 1. Social Sidebar ---
const SocialSidebar = () => {
  const socialLinks = [
    { icon: <Facebook size={20} />, href: "#" },
    { icon: <Twitter size={20} />, href: "#" },
    { icon: <Instagram size={20} />, href: "#" },
    { icon: <Github size={20} />, href: "#" },
  ];

  return (
    <motion.div
      className="fixed left-3 md:left-6 top-[68%] -translate-y-1/2 z-50 flex flex-col gap-6"
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 1.5, staggerChildren: 0.2 }}
    >
      {socialLinks.map((link, index) => (
        <motion.a
          key={index}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-white"
          whileHover={{ scale: 1.2, color: "#00d8ff" }}
          whileTap={{ scale: 0.9 }}
        >
          {link.icon}
        </motion.a>
      ))}
    </motion.div>
  );
};

// --- 2. Right Corner Section ---
const RightCornerSection = () => {
  const avatars = ["/avatars/a1.jpg", "/avatars/a2.jpg", "/avatars/a3.jpg", "/avatars/OIP.jpg"];

  return (
    <motion.div
      className="fixed right-6 bottom-8 z-50 flex flex-col items-center gap-6"
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 1.5, duration: 0.6, ease: "easeOut" }}
    >
      <div className="flex -space-x-3">
        {avatars.map((src, i) => (
          <motion.img
            key={i}
            src={src}
            alt={`avatar-${i}`}
            className="w-10 h-10 rounded-full border-2 border-white/20 object-cover"
            whileHover={{ scale: 1.15, zIndex: 10 }}
          />
        ))}
      </div>

      <motion.video
        src="/avatars/mon.webm"
        className="w-[164px] h-32 rounded-xl object-cover border border-white/20 shadow-lg shadow-green-500/20"
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

// --- 3. Scroll Indicator ---
const ScrollIndicator = ({ showMainContent }) => (
  <AnimatePresence>
    {showMainContent && (
      <motion.div
        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ delay: 2.5, duration: 1 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <Mouse className="text-white" size={24} />
        </motion.div>
        <span className="text-xs text-white uppercase tracking-widest">Scroll Down</span>
      </motion.div>
    )}
  </AnimatePresence>
);

// --- 4. Main Layout ---
const Layout = ({ children, showMainContent }) => {
  return (
    <>
                   {/* ALWAYS fixed */}
      <SocialSidebar />       {/* ALWAYS fixed */}
      <RightCornerSection />  {/* ALWAYS fixed */}
      <ScrollIndicator showMainContent={showMainContent} /> {/* animated only when needed */}
      <main>{children}</main>
    </>
  );
};

export default Layout;
