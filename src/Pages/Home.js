import React, { useState, useEffect, useRef, Suspense, lazy } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, Stars, useGLTF } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import { motion as motion3d } from "framer-motion-3d";
import { useNavigate } from "react-router-dom";
import * as THREE from "three";
import Navbar from "../Components/Navbar";
import CanModel from "../Components/CanModel";

// ==================== LAZY LOADING ====================
const FlavourCarousel = lazy(() => import("../Components/FlavourCarousel"));
const LabubuBanner = lazy(() => import("../Components/labubuBanner"));

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
    modelGlowColor: "#ff69b4",
    scale: 2.4,
    position: [0, -0.7, 0],
    camera: [0, 0, 3],
    rotation: [0, -1.2, 0],
    bg: "/bg/monsterBg.png",
    scrollHeight: 100,
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
    modelGlowColor: "#ff1493",
    scale: [10, 18.3, 7.7],
    position: [0.08, -0.2, 0],
    camera: [0, 0, 4.5],
    rotation: [-0.5, 1.2, 0],
    bg: "/bg/redblue.png",
    scrollHeight: 100,
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
    modelGlowColor: "#00ff00",
    scale: [0.22, 0.22, 0.22],
    position: [0.01, -0.5, 0.2],
    camera: [0, 0, 3],
    rotation: [0, -0.3, 0],
    bg: "/bg/wh.jpg",
    scrollHeight: 150,
  },
];

const heroConfig = {
  subtitle: "THE FUTURE OF ENERGY",
  title: "LIT ENERGY",
  flavor: "CLASSIC SURGE",
  description:
    "Engineered for peak performance. Our revolutionary blend delivers a smooth, sustained energy boost with zero crash, fueling your focus and ambition. This isn't just energy. It's an upgrade.",
  modelPath: "/model/lit.glb",
  highlightColor: "#00d8ff",
  textColor: "#FFFFFF",
  modelGlowColor: "#00d8ff",
  scale: 1,
  position: [0, -0.85, 0],
  camera: [0, 0.5, 3.5],
  rotation: [0, -4.8, 0],
  bg: "/bg/thunder.mp4",
  scrollHeight: 100,
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
const CameraController = ({ targetPosition }) => {
  const vec = new THREE.Vector3();
  useFrame((state) => {
    state.camera.position.lerp(vec.set(...targetPosition), 0.05);
    state.camera.lookAt(0, 0, 0);
    state.camera.updateProjectionMatrix();
  });
  return null;
};

const ScrollShowcaseModel = ({ modelPath, scale, position, modelGlowColor }) => {
  const group = useRef();
  const [canRotate, setCanRotate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setCanRotate(true), 2000);
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
      initial={{ x: 3, y: -0.5, scale: 0.6, rotateY: Math.PI / 4 }}
      animate={{
        x: position[0],
        y: position[1],
        z: position[2],
        scale: scale,
        rotateY: 0,
        transition: { duration: 1.8, ease: "easeInOut" },
      }}
      exit={{
        x: -3,
        y: 0.5,
        scale: 0.6,
        rotateY: -Math.PI / 4,
        transition: { duration: 1.2, ease: "easeInOut" },
      }}
    >
      <Suspense fallback={null}>
        <CanModel modelPath={modelPath} modelGlowColor={modelGlowColor} />
      </Suspense>
    </motion3d.group>
  );
};

// ==================== [FIX 1] UPDATED HeroModel Component ====================
const HeroModel = ({ config }) => {
  const { scene } = useGLTF(config.modelPath);
  const modelRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (modelRef.current) {
      // This idle animation runs every frame
      // It controls the slow rotation and bobbing
      modelRef.current.rotation.y = t * 0.6;
      modelRef.current.position.y = config.position[1] + Math.sin(t * 1.2) * 0.05;
    }
  });

  // 1. Define variants for the animation
  const modelVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { 
      scale: config.scale, 
      opacity: 1,
      // 2. Move transition into the variant
      transition: { duration: 4.5, delay: 0.5, ease: "easeOut" }
    },
  };

  return (
    <motion3d.primitive
      ref={modelRef}
      object={scene}
      position={config.position}
      
      // 3. Use variants, but remove whileInView.
      // The 'animate' prop ("hidden" or "visible") will be inherited
      // from the parent motion.div in the Home component.
      variants={modelVariants}
    />
  );
};
// ===================================================================

const AnimatedCan = React.memo(({ config }) => {
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
});

const ProductScene = React.memo(({ config }) => (
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
));

// ==================== MAIN PAGE COMPONENT ====================
export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showMainContent, setShowMainContent] = useState(true);
  const navigate = useNavigate();

  const cumulativeHeights = cans.map((can, i) =>
    cans.slice(0, i + 1).reduce((sum, c) => sum + (c.scrollHeight || 100), 0)
  );

  // ==================== NEW Optimization: Preload Models ====================
  useEffect(() => {
    // This runs once and starts downloading all models in the background
    cans.forEach(can => useGLTF.preload(can.modelPath));
    heroConfig.modelPath && useGLTF.preload(heroConfig.modelPath);
    newReleases.forEach(release => useGLTF.preload(release.modelPath));
  }, []); // Empty dependency array ensures this runs only once on mount
  // ========================================================================

  useEffect(() => {
    const handleScroll = () => {
      const scrollYvh = (window.scrollY / window.innerHeight) * 100;
      let newIndex = 0;
      for (let i = 0; i < cumulativeHeights.length; i++) {
        if (scrollYvh < cumulativeHeights[i]) {
          newIndex = i;
          break;
        }
      }
      if (newIndex !== activeIndex) setActiveIndex(newIndex);

      const aboutSection = document.querySelector("#about-section");
      if (aboutSection) {
        const rect = aboutSection.getBoundingClientRect();
        setShowMainContent(rect.top > window.innerHeight * 0.5);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeIndex, cumulativeHeights]);

  const activeCan = cans[activeIndex];

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut", delay: i * 0.2 },
    }),
  };

  return (
    <div className="bg-black text-white min-h-screen relative overflow-hidden font-body">
      <Navbar />

      {/* ========== SCROLL-BASED SHOWCASE ========= */}
      <div
        style={{
          height: `${cans.reduce((sum, can) => sum + (can.scrollHeight || 100), 0)}vh`,
        }}
      />
      <AnimatePresence>
        {showMainContent && (
          <motion.div
            className="fixed inset-0 z-10 flex"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Background */}
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

            {/* Text */}
            <div className="relative z-10 w-1/2 h-screen flex flex-col justify-center items-start p-16">
              <motion.h2
                className="text-3xl mb-2 font-display tracking-wider" 
                style={{ color: activeCan.highlightColor }}
                custom={0}
                initial="hidden"
                animate="visible"
                variants={textVariants}
              >
                {activeCan.subtitle}
              </motion.h2>
              <motion.h1
                className="text-7xl font-display mb-4" 
                custom={1}
                initial="hidden"
                animate="visible"
                variants={textVariants}
              >
                {activeCan.title}
              </motion.h1>
              <motion.p
                className="text-lg max-w-md text-gray-300"
                custom={2}
                initial="hidden"
                animate="visible"
                variants={textVariants}
              >
                {activeCan.description}
              </motion.p>
            </div>

            {/* 3D Model */}
            <div className="w-1/2 h-screen">
              <Canvas camera={{ fov: 40 }}>
                <ambientLight intensity={0.5} />
                <directionalLight color={activeCan.modelGlowColor} position={[5, 5, 5]} intensity={2} />
                <directionalLight color="#ffffff" position={[-5, 3, 2]} intensity={0.8} />
                <spotLight position={[0, 10, -10]} intensity={1.5} angle={0.3} penumbra={1} distance={50} />
                <Suspense fallback={null}> {/* Added Suspense here */}
                  <Environment preset="city" />
                  <CameraController targetPosition={activeCan.camera} />
                  <AnimatePresence mode="wait">
                    <ScrollShowcaseModel key={activeCan.id} {...activeCan} />
                  </AnimatePresence>
                  <OrbitControls enableZoom={false} enablePan={false} />
                </Suspense>
              </Canvas>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========== [FIX 2] HERO SECTION (UPDATED) ========= */}
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

        {/* THIS IS THE FIX: 
          The whileInView logic is moved to this parent motion.div.
          This is a real DOM element, so IntersectionObserver will work.
          The 'animate' state ("hidden" or "visible") will be passed down
          to all children, including HeroModel and the text elements.
        */}
        <motion.div 
          className="relative w-full max-w-7xl flex flex-col md:flex-row items-center justify-center z-20 mt-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.3 }}
        >
          {/* This div no longer needs motion props,
            but HeroModel inside will inherit from the parent.
          */}
          <div className="w-full md:w-1/2 h-[70vh]">
            <Canvas camera={{ fov: 50, position: heroConfig.camera }}>
              <Suspense fallback={null}>
                <ambientLight intensity={0.5} />
                <directionalLight color={heroConfig.modelGlowColor} position={[4, 4, 2]} intensity={3} />
                <directionalLight color="#ffffff" position={[-4, -2, 5]} intensity={1.5} />
                <Environment preset="city" />
                <Stars radius={100} depth={50} count={3000} fade speed={1} />
                {/* HeroModel will inherit "animate" state from the parent motion.div */}
                <HeroModel config={heroConfig} />
                <OrbitControls enableZoom={false} enablePan={false} />
              </Suspense>
            </Canvas>
          </div>

          {/* This div also inherits from the parent.
            The child text elements will animate based on textVariants.
          */}
          <motion.div
            className="w-full md:w-1/2 px-8"
          >
            <motion.h3
              className="text-cyan-400 uppercase mb-2 tracking-widest text-2xl font-display"
              custom={0}
              variants={textVariants}
            >
              {heroConfig.subtitle}
            </motion.h3>
            <motion.h1 
              className="text-8xl font-display mb-2" 
              custom={1} 
              variants={textVariants}
            >
              {heroConfig.title}
            </motion.h1>
            <motion.h2 
              className="text-3xl text-gray-300 mb-4 font-display" 
              custom={2} 
              variants={textVariants}
            >
              {heroConfig.flavor}
            </motion.h2>
            <motion.p 
              className="text-gray-300 leading-relaxed text-lg" 
              custom={3} 
              variants={textVariants}
            >
              {heroConfig.description}
            </motion.p>
         <motion.button
  className="relative mt-8 px-8 py-3 rounded-full font-bold text-white text-lg overflow-hidden"
  whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(255,255,255,0.6)" }}
  whileTap={{ scale: 0.95 }}
  onClick={() => navigate("/products")}
  style={{
    background: "radial-gradient(circle at 20% 20%, #6b5bff, #1e1e3f, #000)", // galaxy effect
    border: "1px solid rgba(255,255,255,0.2)",
  }}
>
  {/* Animated star border */}
  <span className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
    <span className="absolute w-2 h-2 bg-white rounded-full top-1/4 left-1/3 animate-star"></span>
    <span className="absolute w-1.5 h-1.5 bg-white rounded-full top-1/2 left-2/3 animate-star"></span>
    <span className="absolute w-1.5 h-1.5 bg-white rounded-full top-3/4 left-1/4 animate-star"></span>
  </span>

  {/* Button text */}
  Discover The Flavors
</motion.button>

          </motion.div>
        </motion.div>
      </section>

      {/* ==================== 3. NEW RELEASES SECTION ==================== */}
      <section className="relative w-full bg-[#111] py-20 px-6 flex flex-col items-center">
        <h2 className="text-4xl md:text-6xl font-black mb-6 font-display">New Releases</h2>
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
              <h3 className="text-3xl font-bold mt-6 font-display" style={{ color: release.modelGlowColor }}>
                {release.title}
              </h3>
              <p className="text-gray-400 text-lg">{release.flavor}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ==================== LAZY LOADED COMPONENTS ==================== */}
      <Suspense fallback={<div className="w-full h-screen bg-black flex items-center justify-center text-white">Loading...</div>}>
        <FlavourCarousel />
        <LabubuBanner />
      </Suspense>
    </div>
  );
}