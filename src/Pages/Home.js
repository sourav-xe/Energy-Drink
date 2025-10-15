import React, { useState, useEffect, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, Stars, useGLTF } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import { motion as motion3d } from "framer-motion-3d";
import { useNavigate } from "react-router-dom";
import * as THREE from "three";
import Navbar from "../Components/Navbar";
import CanModel from "../Components/CanModel";
import FlavourCarousel from "../Components/FlavourCarousel";
import LabubuBanner  from "../Components/labubuBanner";

 
// ==================== DATA CONFIGURATIONS ====================
const cans = [
  {
    id: 1,
    subtitle: "Sugar Free Energy",
    title: "Zero Ultra",
    description:
      "Zero sugar. Pure focus. Designed for those who crave power with precision — crisp, cool, and relentless.",
    modelPath: "/model/monster_can/scene.gltf",
    highlightColor: "#FFD700",
    textColor: "#FFFFFF",
    glowColor: "rgba(255, 105, 180, 0.7)",
    modelGlowColor: "#ff69b4",
    scale: 2.4,
    position: [0, -0.7, 0],
    camera: [0, 0, 3], // Adjusted camera for better animation
    rotation: [0, -1.2, 0],
    bg: "/bg/monsterBg.png",
  },
  {
    id: 2,
    subtitle: "Vitalizes Body & Mind",
    title: "Red Bull",
    description:
      "Gives you wings — energize your mind and body with the taste of adrenaline and success.",
    modelPath: "/model/red_bull_energy_drink_can.glb",
    highlightColor: "#FFC700",
    textColor: "#FFFFFF",
    glowColor: "rgba(255, 20, 147, 0.8)",
    modelGlowColor: "#ff1493",
    scale: [10, 18.3, 7.7],
    position: [0.08, -0.2, 0],
    camera: [0, 0, 4.5], // Adjusted camera
    rotation: [-0.5, 1.2, 0],
    bg: "/bg/redblue.png",
  },
  {
    id: 3,
    subtitle: "Unleash The Beast",
    title: "Monster Energy",
    description:
      "A raw energy surge with the unmistakable punch of the original Monster blend.",
    modelPath: "/model/monster_energy_drink.glb",
    highlightColor: "#90EE90",
    textColor: "#FFFFFF",
    glowColor: "rgba(142, 255, 97, 0.5)",
    modelGlowColor: "#00ff00",
    scale: [0.22, 0.22, 0.22],
    position: [0.01, -0.5, 0.2],
    camera: [0, 0, 3], // Adjusted camera
    rotation: [0, -0.3, 0],
    bg: "/bg/wh.jpg",
  },
];

const heroConfig = {
  subtitle: "Harness The Storm",
  title: "LIT ENERGY",
  flavor: "Classic Surge",
  description:
    "We captured the raw, untamed power of a thunderstorm and infused it into every can. LIT Energy is more than a drink; it's pure, unadulterated power designed for those who command precision and live with intensity.",
  modelPath: "/model/lit.glb",
  highlightColor: "#00d8ff",
  textColor: "#FFFFFF",
  glowColor: "rgba(0, 216, 255, 0.4)",
  modelGlowColor: "#00d8ff",
  scale: 1,
  position: [0, -0.85, 0],
  camera: [0, 0.5, 3.5],
  rotation: [0, -0.8, 0],
  bg: "/bg/thunder.mp4",
};

const newReleases = [
  {
    id: 1,
    title: "Solar Flare",
    flavor: "Mango & Chili",
    modelPath: "/model/orange.glb",
    glowColor: "rgba(255, 140, 0, 0.5)",
    modelGlowColor: "#ff8c00",
    scale: 9,
    position: [0, -0.6, 0],
  },
  {
    id: 2,
    title: "Nebula",
    flavor: "Berry & Grape",
    modelPath: "/model/pink.glb",
    glowColor: "rgba(255, 105, 180, 0.8)",
    modelGlowColor: "#ff69b4",
    scale: 0.05,
    position: [0, -0.5, 0],
  },
  {
    id: 3,
    title: "Gecko",
    flavor: "Kiwi & Lime",
    modelPath: "/model/monster_energy_drink.glb",
    glowColor: "rgba(50, 205, 50, 0.4)",
    modelGlowColor: "#32cd32",
    scale: 0.4,
    position: [0, -0.7, 0],
  },
];

// ==================== 3D COMPONENTS ====================

// ✨ NEW: Camera controller for smooth transitions between can positions
const CameraController = ({ targetPosition }) => {
  const vec = new THREE.Vector3();
  useFrame((state) => {
    // Smoothly interpolate camera position
    state.camera.position.lerp(vec.set(...targetPosition), 0.05);
    state.camera.updateProjectionMatrix();
    // Always look at the center of the scene
    state.camera.lookAt(0, 0, 0);
  });
  return null;
};

// ✨ UPDATED: Model component with enter/exit animations
// ✨ UPDATED: Smoother, slower, and more graceful slide animations
const AnimatedShowcaseModel = ({ modelPath, scale, position, modelGlowColor }) => {
  const group = useRef();
  const [canRotate, setCanRotate] = useState(false);

  // Auto-rotation starts after a brief delay
  useEffect(() => {
    const timer = setTimeout(() => setCanRotate(true), 2000); // Increased delay to allow for slower intro
    return () => clearTimeout(timer);
  }, []);

  useFrame(() => {
    if (group.current && canRotate) {
      group.current.rotation.y += 0.003;
    }
  });

  return (
    <motion3d.group
      ref={group}
      // New can enters from a closer point on the right (x: 3)
      initial={{ x: 3, y: -0.5, scale: 0.6, rotateY: Math.PI / 4 }}
      // Animates to its target position over a longer duration with smoother easing
      animate={{
        x: position[0],
        y: position[1],
        z: position[2],
        scale: scale,
        rotateY: 0,
        // 👇 SLOWER DURATION AND SMOOTHER EASE
        transition: { duration: 1.8, ease: "easeInOut" },
      }}
      // Old can exits to a closer point on the left (x: -3)
      exit={{
        x: -3,
        y: 0.5,
        scale: 0.6,
        rotateY: -Math.PI / 4,
        // 👇 SLOWER DURATION AND SMOOTHER EASE
        transition: { duration: 1.2, ease: "easeInOut" },
      }}
    >
      <Suspense fallback={null}>
        <CanModel modelPath={modelPath} modelGlowColor={modelGlowColor} />
      </Suspense>
    </motion3d.group>
  );
};

// Animated can for the "New Releases" section
const AnimatedCan = ({ config }) => {
  const { scene } = useGLTF(config.modelPath);
  const modelRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (modelRef.current) {
      modelRef.current.rotation.y = t * 0.1;
      modelRef.current.position.y = (config.position[1] || 0) + Math.sin(t * 1.2) * 0.05;
    }
  });

  return <primitive ref={modelRef} object={scene} scale={config.scale} position={config.position} />;
};

// Reusable canvas scene for hero and new releases
const ProductScene = ({ config }) => (
  <Canvas camera={{ position: config.camera || [0, 0.6, 3.5], fov: 50 }}>
    <Suspense fallback={null}>
      <ambientLight intensity={0.5} />
      <directionalLight color={config.modelGlowColor} position={[4, 4, 2]} intensity={3} />
      <directionalLight color="#ffffff" position={[-4, -2, 5]} intensity={1.5} />
      <Environment preset="city" />
      <Stars radius={100} depth={50} count={3000} fade speed={1} />
      <AnimatedCan config={config} />
      <OrbitControls enableZoom={false} enablePan={false} />
    </Suspense>
  </Canvas>
);

// ==================== MAIN PAGE COMPONENT ====================
export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showMainContent, setShowMainContent] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      // Determine active index based on scroll position
      const newIndex = Math.min(Math.floor(window.scrollY / window.innerHeight), cans.length - 1);
      if (newIndex !== activeIndex) {
        setActiveIndex(newIndex);
      }
      
      // Hide the showcase section when scrolling to the next part
      const aboutSection = document.querySelector("#about-section");
      if (aboutSection) {
        const rect = aboutSection.getBoundingClientRect();
        setShowMainContent(rect.top > window.innerHeight * 0.5);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeIndex]);

  const activeCan = cans[activeIndex];

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <div className="bg-black text-white min-h-screen relative overflow-hidden font-montserrat">
      <Navbar />

      {/* ==================== 1. SCROLL-BASED SHOWCASE SECTION ==================== */}
      <div style={{ height: `${cans.length * 100}vh` }} />
      <AnimatePresence>
        {showMainContent && (
          <motion.div
            className="fixed inset-0 z-10 flex"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Animated Background Image */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCan.id}
                className="absolute inset-0 z-0"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                style={{
                  backgroundImage: `url(${activeCan.bg})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  filter: "brightness(0.6) saturate(1.2)",
                }}
              />
            </AnimatePresence>

            {/* Left Side: Text Content */}
            <div className="relative z-10 w-1/2 h-screen flex flex-col justify-center items-start p-16">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCan.id}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0, transition: { duration: 1, delay: 0.2, ease: "easeOut" } }}
                  exit={{ opacity: 0, x: 50, transition: { duration: 0.5, ease: "easeIn" } }}
                >
                  <h2 className="text-3xl mb-2" style={{ color: activeCan.highlightColor }}>
                    {activeCan.subtitle}
                  </h2>
                  <h1 className="text-6xl font-extrabold mb-4">{activeCan.title}</h1>
                  <p className="text-lg max-w-md text-gray-300">{activeCan.description}</p>
                </motion.div>
              </AnimatePresence>
            </div>

           {/* Right Side: 3D Model Canvas */}
<div className="w-1/2 h-screen">
  <Canvas camera={{ fov: 40 }}>
    {/* ✨ 1. Softer base light to ensure nothing is pure black */}
    <ambientLight intensity={0.5} />

    {/* ✨ 2. The main "Key" light, now colored to match the can's theme */}
    <directionalLight
      color={activeCan.modelGlowColor}
      position={[5, 5, 5]}
      intensity={2}
    />
    
    {/* ✨ 3. A "Fill" light from the opposite side to soften shadows */}
    <directionalLight
      color="#ffffff"
      position={[-5, 3, 2]}
      intensity={0.8}
    />
    
    {/* ✨ 4. A subtle "Rim" light from behind to highlight the can's edges */}
    <spotLight
      position={[0, 10, -10]}
      intensity={1.5}
      angle={0.3}
      penumbra={1}
      distance={50}
    />

    {/* ✨ 5. The MOST IMPORTANT addition for reflections! */}
    <Environment preset="city" />

    <CameraController targetPosition={activeCan.camera} />
    <AnimatePresence mode="wait">
      <AnimatedShowcaseModel key={activeCan.id} {...activeCan} />
    </AnimatePresence>
    <OrbitControls enableZoom={false} enablePan={false} />
  </Canvas>
</div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* ==================== 2. HERO SECTION ("LIT ENERGY") ==================== */}
      <section
        id="about-section"
        className="relative w-full min-h-screen bg-black text-white flex flex-col items-center justify-center"
      >
        <video
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
          src={heroConfig.bg}
          autoPlay
          loop
          muted
        />
        <div className="absolute inset-0 bg-black/50 z-0"></div>

        <div className="relative w-full max-w-7xl flex flex-col md:flex-row items-center justify-center z-20 mt-10">
          <div className="w-full md:w-1/2 h-[70vh]">
            <ProductScene config={heroConfig} />
          </div>
          <motion.div
            className="w-full md:w-1/2 px-8"
            initial="hidden"
            whileInView="visible"
            variants={sectionVariants}
          >
            <h3 className="text-cyan-400 uppercase mb-2 tracking-widest">
              {heroConfig.subtitle}
            </h3>
            <h1 className="text-6xl font-black mb-2">{heroConfig.title}</h1>
            <h2 className="text-2xl text-gray-300 mb-4">{heroConfig.flavor}</h2>
            <p className="text-gray-300 leading-relaxed">{heroConfig.description}</p>
            <motion.button
              className="mt-8 px-8 py-3 rounded-full font-bold text-black text-lg bg-gradient-to-r from-cyan-400 to-blue-500 shadow-[0_0_25px_rgba(0,216,255,0.4)]"
              whileHover={{ scale: 1.1 }}
              onClick={() => navigate("/products")}
            >
              Discover The Flavors
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* ==================== 3. NEW RELEASES SECTION ==================== */}
      <section className="relative w-full bg-[#111] py-20 px-6 flex flex-col items-center">
        <h2 className="text-4xl md:text-6xl font-black mb-6">New Releases</h2>
        <p className="text-lg text-gray-400 max-w-2xl text-center mb-16">
          Explore the cutting edge of energy — crafted with bold flavors and a relentless drive for performance.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full max-w-6xl">
          {newReleases.map((release) => (
            <motion.div
              key={release.id}
              className="flex flex-col items-center group"
              whileHover={{ scale: 1.05 }}
            >
              <div
                className="relative w-full h-[400px] rounded-lg overflow-hidden"
                style={{ boxShadow: `0 0 40px ${release.glowColor}` }}
              >
                <ProductScene config={release} />
              </div>
              <h3 className="text-2xl font-bold mt-6" style={{ color: release.modelGlowColor }}>
                {release.title}
              </h3>
              <p className="text-gray-400">{release.flavor}</p>
            </motion.div>
          ))}
        </div>
      </section>
      <FlavourCarousel/>
     <LabubuBanner />

    </div>
  );
}