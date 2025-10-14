import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment, Stars } from "@react-three/drei";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";

// --- CONFIGURATION ---AQ

const heroConfig = {
  id: 1,
  subtitle: "Harness The Storm",
  title: "LIT ENERGY",
  flavor: "Classic Surge",
  description:
    "We captured the raw, untamed power of a thunderstorm and infused it into every can. LIT Energy is more than a drink; it's pure, unadulterated power designed for those who command precision and live with intensity.",
  modelPath: "/model/lit.glb",
  highlightColor: "#00d8ff",
  textColor: "#FFFFFF",
  glowColor: "rgba(0, 216, 255, 0.3)",
  modelGlowColor: "#00d8ff",
  scale: 0.6,
  position: [0, -0.7, 0],
  camera: [0, 0.5, 3.5],
  rotation: [0, -0.8, 0],
  bg: "/bg/thunder.mp4",
};

const newReleases = [
  {
    id: 2,
    title: "Solar Flare",
    flavor: "Mango & Chili",
    modelPath: "/model/orange.glb", // Replace with your model
    glowColor: "rgba(255, 140, 0, 0.4)",
    modelGlowColor: "#ff8c00",
    scale: 9,
    position: [0, -0.6, 0],
  },
  {
    id: 3,
    title: "Nebula",
    flavor: "Berry & Grape",
    modelPath: "/model/pink.glb", // Replace with your model
     glowColor: "rgba(255, 105, 180, 0.6)", // 🌸 soft pink glow
//   modelGlowColor: "#ff69b4"
    modelGlowColor: "#ff69b4",
    flavourColor:"ff69b4",
    scale: 0.05,
    position: [0, -0.5, 0],
  },
  {
    id: 4,
    title: "Gecko",
    flavor: "Kiwi & Lime",
    modelPath: "/model/monster_energy_drink.glb",
    glowColor: "rgba(50, 205, 50, 0.4)",
    modelGlowColor: "#32cd32",
    scale: 0.4,
    position: [0, -0.7, 0],
  },
];

// --- REUSABLE 3D COMPONENTS ---

function AnimatedCan({ config }) {
  const { scene } = useGLTF(config.modelPath);
  const modelRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (modelRef.current) {
      // Allow rotation to be disabled via config
      if (config.static !== true) {
        modelRef.current.rotation.y =
          (config.rotation ? config.rotation[1] : 0) + t * 0.1;
      }
      modelRef.current.position.y =
        (config.position ? config.position[1] : 0) + Math.sin(t * 1.2) * 0.05;
    }
  });

  // Set initial rotation if specified
  if (config.rotation && modelRef.current) {
    modelRef.current.rotation.x = config.rotation[0];
    modelRef.current.rotation.y = config.rotation[1];
    modelRef.current.rotation.z = config.rotation[2];
  }

  return (
    <primitive
      ref={modelRef}
      object={scene}
      scale={config.scale}
      position={config.position}
    />
  );
}

function ProductScene({ config }) {
  return (
    <Canvas camera={{ position: config.camera || [0, 0.6, 3.5], fov: 50 }}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <directionalLight
          color={config.modelGlowColor}
          position={[4, 4, 2]}
          intensity={3}
        />
        <directionalLight
          color="#ffffff"
          position={[-4, -2, 5]}
          intensity={1.5}
        />
        <Environment preset="city" />
        <Stars
          radius={100}
          depth={50}
          count={5000}
          factor={4}
          saturation={0}
          fade
          speed={1}
        />
        <AnimatedCan config={config} />
        <OrbitControls enableZoom={false} enablePan={false} />
        {/* Effects removed to prevent dependency conflicts */}
      </Suspense>
    </Canvas>
  );
}

// --- MAIN PAGE COMPONENT ---

const About = () => {
  const navigate = useNavigate();
  const config = heroConfig;

  // Animation variants
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: [0.2, 0.6, 0.2, 1] },
    },
  };

  return (
    <div className="w-full bg-black text-white font-[Montserrat] overflow-x-hidden">
      {/* --- HERO SECTION --- */}
      <section className="relative w-full min-h-screen flex flex-col items-center justify-center">
        <video
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
          src={config.bg}
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="absolute inset-0 bg-black opacity-40 z-0"></div>
        <div
          className="absolute inset-0 opacity-60 pointer-events-none z-10"
          style={{
            background: `radial-gradient(circle at 40% 50%, ${config.glowColor} 0%, transparent 60%)`,
          }}
        />
        <div className="absolute top-0 left-0 w-full z-30">
          <Navbar />
        </div>

        <div className="relative w-full max-w-7xl flex flex-col md:flex-row items-center justify-center z-20 mt-16 md:mt-0 p-4">
          <motion.div
            className="relative w-full md:w-1/2 h-[60vh] md:h-screen"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <ProductScene config={config} />
          </motion.div>
          <motion.div
            className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left px-6 md:px-12"
            initial="hidden"
            animate="visible"
            variants={sectionVariants}
          >
            <motion.h3
              className="font-semibold uppercase tracking-[0.2em] text-sm md:text-base mb-2"
              style={{ color: config.highlightColor }}
              variants={itemVariants}
            >
              {config.subtitle}
            </motion.h3>
            <motion.h1
              className="text-5xl md:text-7xl font-black mb-1"
              style={{
                color: config.textColor,
                textShadow: `0 0 25px ${config.glowColor}`,
              }}
              variants={itemVariants}
            >
              {config.title}
            </motion.h1>
            <motion.h2
              className="text-2xl md:text-3xl font-bold mb-6 text-gray-300"
              style={{ textShadow: `0 0 10px rgba(0,0,0,0.5)` }}
              variants={itemVariants}
            >
              {config.flavor}
            </motion.h2>
            <motion.p
              className="text-gray-300 text-base md:text-lg leading-relaxed max-w-md"
              variants={itemVariants}
            >
              {config.description}
            </motion.p>
            <motion.button
              className="mt-8 px-8 py-3 rounded-full font-bold text-black text-lg bg-gradient-to-r from-cyan-400 to-blue-500 shadow-[0_0_25px_rgba(0,216,255,0.4)] transition-all duration-300"
              whileHover={{
                scale: 1.05,
                boxShadow: `0px 0px 30px ${config.glowColor}`,
              }}
              whileTap={{ scale: 0.95 }}
              variants={itemVariants}
              onClick={() => navigate("/products")}
            >
              Discover The Flavors
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* --- SVG WAVE DIVIDER --- */}
      <div className="relative w-full h-[150px] bg-black">
        <div
          className="absolute -top-px w-full h-full"
          style={{
            background: "linear-gradient(to bottom, #000, transparent)",
          }}
        ></div>
        <svg
          viewBox="0 0 1440 320"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute -bottom-px"
        >
          <path
            fill="#111111"
            fillOpacity="1"
            d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,149.3C672,149,768,203,864,229.3C960,256,1056,256,1152,234.7C1248,213,1344,171,1392,149.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>

      {/* --- NEW RELEASES SECTION --- */}
      <motion.section
        className="relative w-full bg-[#111111] py-20 px-4 flex flex-col items-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <motion.h2
          className="text-4xl md:text-6xl font-black text-center mb-4"
          variants={itemVariants}
        >
          New Releases
        </motion.h2>
        <motion.p
          className="text-lg text-gray-400 text-center max-w-2xl mb-16"
          variants={itemVariants}
        >
          Explore the cutting edge of energy. Our latest collection is
          engineered with unique flavor profiles and our signature performance
          blend.
        </motion.p>

        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-10">
          {newReleases.map((release, index) => (
            <motion.div
              key={release.id}
              className="flex flex-col items-center group"
              custom={index}
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: (i) => ({
                  opacity: 1,
                  y: 0,
                  transition: {
                    delay: i * 0.2,
                    duration: 0.8,
                    ease: "easeOut",
                  },
                }),
              }}
            >
              <motion.div
                className="relative w-full h-[400px] rounded-lg overflow-hidden bg-black/20 transition-all duration-500 ease-in-out group-hover:scale-105"
                style={{ boxShadow: `0 0 30px ${release.glowColor}` }}
                whileHover={{ boxShadow: `0 0 50px ${release.glowColor}` }}
              >
                <div
                  className="absolute inset-0 opacity-40"
                  style={{
                    background: `radial-gradient(circle at center, ${release.glowColor} 0%, transparent 70%)`,
                  }}
                />
                <ProductScene config={release} />
              </motion.div>
              <h3
                className="text-2xl font-bold mt-6 transition-colors duration-300 group-hover:text-white"
                style={{ color: release.modelGlowColor }}
              >
                {release.title}
              </h3>
              <p className="text-gray-400">{release.flavor}</p>
            </motion.div>
          ))}
        </div>

        <motion.button
          className="mt-20 px-10 py-4 rounded-full font-bold text-white text-lg bg-gradient-to-r from-purple-600 to-red-500 shadow-[0_0_25px_rgba(255,80,80,0.4)] transition-all duration-300"
          whileHover={{
            scale: 1.05,
            boxShadow: `0px 0px 30px rgba(255, 80, 80, 0.6)`,
          }}
          whileTap={{ scale: 0.95 }}
          variants={itemVariants}
          onClick={() => navigate("/products")}
        >
          Shop The Collection
        </motion.button>
      </motion.section>
    </div>
  );
};

export default About;
