// src/Components/SplashScreen.js
import React, { useEffect } from "react";
import { motion } from "framer-motion";

const SplashScreen = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (typeof onFinish === "function") {
        onFinish(); // ✅ only call if function exists
      }
    }, 3000); // duration before transition

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-black z-50"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
     <motion.video
  src="/bg/splash.mp4"
  className="w-full h-full object-cover pointer-events-none select-none"
  autoPlay
  muted
  playsInline
  loop={false}
  disablePictureInPicture // 🚫 disables PiP button
  controls={false}        // 🚫 no controls bar
  controlsList="nodownload nofullscreen noremoteplayback" // 🚫 hide more options
  onContextMenu={(e) => e.preventDefault()} // 🚫 disable right-click menu
  initial={{ opacity: 0, scale: 1.1 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 1.5 }}
/>

    </motion.div>
  );
};

export default SplashScreen;
