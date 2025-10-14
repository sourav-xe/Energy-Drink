import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

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
  const [index, setIndex] = useState(0);

  // Auto move every 2.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // Function to calculate card position (rotation + offset)
  const getCardStyle = (i) => {
    const offset = i - index;
    let rotation = offset * 12; // how much it tilts
    let y = Math.abs(offset) * 10;
    let scale = 1 - Math.abs(offset) * 0.1;
    let x = offset * 220; // horizontal spacing

    // Wrap-around for seamless infinite loop
    if (offset > images.length / 2) rotation = rotation - images.length * 12;
    if (offset < -images.length / 2) rotation = rotation + images.length * 12;

    return { x, rotate: rotation, scale, y };
  };

  return (
    <div className="w-full min-h-screen bg-black flex items-center justify-center overflow-hidden">
      <div className="relative flex items-center justify-center">
        {images.map((item, i) => {
          const style = getCardStyle(i);
          return (
            <motion.div
              key={item.id}
              className="absolute flex flex-col items-center gap-4"
              animate={style}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              style={{
                zIndex: 100 - Math.abs(i - index),
              }}
            >
              <div className="w-64 h-80 rounded-2xl shadow-xl overflow-hidden">
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-xl font-bold text-white">{item.title}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default FlavourCarousel;
