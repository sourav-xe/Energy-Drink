

import React, { useState, useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion"; // Import useAnimation for controlled restart

const images = [
  { id: 1, src: "/crousel/fourth.jpg", title: "Juice" },
  { id: 2, src: "/crousel/monster.avif", title: "Monster Ultra" },
  { id: 3, src: "/crousel/third.jpg", title: "Original" },
  { id: 4, src: "/crousel/second.avif", title: "Mango Loco" },
  { id: 5, src: "/crousel/sting.avif", title: "Sting" },
  { id: 6, src: "/crousel/fifth.jpg", title: "Tropical" },
  { id: 7, src: "/crousel/sixth.jpg", title: "Punch" },
];

const FlavourCarousel = () => {
  const total = images.length;
  // Carousel boundaries (first 2 and last 3 are reserved for smooth transition)
  const MIN_INDEX = 2;
  const MAX_INDEX = total - 3;

  const [index, setIndex] = useState(MIN_INDEX);
  const controls = useAnimation(); // Controls for manually starting the animation

  const tilt = 5;
  const spacing = 340;
  const scaleFactor = 0.1;
  const yOffset = 38;

  const getCardStyle = (i) => {
    let offset = i - index;
    const rotation = offset * tilt;
    const y = Math.abs(offset) * yOffset;
    const scale = 1 - Math.abs(offset) * scaleFactor;
    const x = offset * spacing;

    return { x, rotate: rotation, scale, y };
  };

  const setSafeIndex = (newIndex) => {
    if (newIndex >= MIN_INDEX && newIndex <= MAX_INDEX) {
      setIndex(newIndex);
      return true;
    }
    return false;
  };

  // --- Auto-Rotation Logic with Loop and Restart ---
  const startAutoScroll = () => {
    // Clear any existing interval first
    if (window.autoScrollInterval) {
      clearInterval(window.autoScrollInterval);
    }

    const interval = setInterval(() => {
      setIndex((prev) => {
        let nextIndex = prev + 1;
        // If we hit the max boundary, loop back to the start
        if (nextIndex > MAX_INDEX) {
          nextIndex = MIN_INDEX;
        }
        return nextIndex;
      });
    }, 3000); // 3-second delay for a smoother watch

    window.autoScrollInterval = interval; // Store it on the window object for easy access
  };

  useEffect(() => {
    startAutoScroll();
    return () => clearInterval(window.autoScrollInterval);
  }, []); // Empty dependency array means it runs once on mount

  // --- DRAG END HANDLER (Enhanced) ---
  const handleDragEnd = (event, info) => {
    const dragDistance = info.offset.x;
    const dragVelocity = info.velocity.x;

    const moveThreshold = 100;
    const velocityThreshold = 500;

    let newIndex = index;
    let moved = false;

    // 1. Check for a fast "throw" (flick)
    if (dragVelocity < -velocityThreshold) {
      newIndex = index + 1;
      moved = true;
    } else if (dragVelocity > velocityThreshold) {
      newIndex = index - 1;
      moved = true;
    }
    // 2. Check for a significant drag distance
    else if (dragDistance < -moveThreshold) {
      newIndex = index + 1;
      moved = true;
    } else if (dragDistance > moveThreshold) {
      newIndex = index - 1;
      moved = true;
    }

    // Use the safe setter
    if (setSafeIndex(newIndex)) {
        // Only restart if the index *actually* changed
        startAutoScroll();
    } else if (moved) {
        // If the move was blocked by a boundary, still restart the timer
        startAutoScroll();
    }
  };

  // --- Card Hover Effects (NEW) ---
  const handleHoverStart = (i) => {
    // Only apply effect to the centered card
    if (i === index) {
        controls.start({
            rotate: [0, 1, -1, 1, 0], // Subtle shaking effect
            scale: 1.05, // Slight increase in size
            transition: {
                duration: 0.8,
                ease: "easeInOut",
            },
        });
    }
  };

  const handleHoverEnd = (i) => {
    if (i === index) {
        controls.start({
            rotate: 0,
            scale: 1,
            transition: {
                duration: 0.4,
                ease: "easeInOut",
            },
        });
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center overflow-hidden relative">
      <h1 className="text-4xl font-extrabold text-white mb-12 flex items-center gap-2">
        🧃 Monster Flavour Carousel (Enhanced) 🚀
      </h1>

      <motion.div
        className="relative w-full flex items-center justify-center h-[500px] overflow-hidden"
        // Constraints ref is not needed as dragConstraints is {left: 0, right: 0}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        // On drag start, stop the auto-scroll
        onDragStart={() => clearInterval(window.autoScrollInterval)}
        // On drag end, calculate move and restart auto-scroll
        onDragEnd={handleDragEnd}
        dragElastic={0.05}
      >
        {/* Side covers to hard block off-screen animation */}
        <div className="absolute left-0 top-0 h-full w-[25%] bg-black z-50" />
        <div className="absolute right-0 top-0 h-full w-[25%] bg-black z-50" />

        {images.map((item, i) => {
          const style = getCardStyle(i);
          let offset = i - index;

          const visible = Math.abs(offset) <= 3;
          if (!visible) return null;

          return (
            <motion.div
              key={item.id}
              className="absolute flex flex-col items-center gap-4 cursor-pointer select-none"
              onClick={() => setSafeIndex(i)}
              // Use the index's style for the main movement
              animate={style}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              style={{
                zIndex: 100 - Math.abs(offset),
                // IMPORTANT: Tell Framer Motion this div is NOT part of the parent's drag
                pointerEvents: offset === 0 ? 'auto' : 'none' 
              }}
              // Apply hover effects only on the centered card
              onHoverStart={() => handleHoverStart(i)}
              onHoverEnd={() => handleHoverEnd(i)}
            >
              <motion.div
                // The actual card element is controlled for the hover effect
                animate={i === index ? controls : undefined} 
                className={`w-64 h-80 rounded-2xl overflow-hidden transition-all duration-500 border-4 ${
                    offset === 0
                      ? "shadow-[0_0_80px_#00ff00] border-[#00ff00]"
                      : "shadow-[0_0_40px_#00ff00b3] opacity-70 hover:opacity-100 border-transparent"
                  }`}
              >
                <img
                  src={item.src}
                  alt={item.label}
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <p
                className={`text-xl font-bold italic ${
                  offset === 0 ? "text-[#00ff00]" : "text-gray-400"
                }`}
              >
                {item.label}
              </p>
            </motion.div>
          );
        })}
      </motion.div>

      {/* top/bottom fade for polish */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/80 via-transparent to-black/70 pointer-events-none"></div>
    </div>
  );
};

export default FlavourCarousel; 