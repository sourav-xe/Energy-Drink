import React, { Suspense, useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, OrbitControls, Stars, useGLTF } from "@react-three/drei";
import { motion } from "framer-motion";
import Navbar from "../Components/Navbar";

const AboutCanModel = React.memo(({ modelPath, scale, position, glow }) => {
  const { scene } = useGLTF(modelPath);
  const ref = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (ref.current) {
      ref.current.rotation.y = t * 0.3;
      ref.current.position.y = position[1] + Math.sin(t * 1.5) * 0.05;
    }
  });

  return (
    <primitive
      ref={ref}
      object={scene}
      scale={scale}
      position={position}
      rotation={[0, 0, 0]}
    />
  );
});

export default function About() {
  const heroVideo = "/bg/thunder.mp4"; // reuse same video from Home
  const modelPath = "/model/lit.glb"; // central hero model

  const fadeIn = (delay = 0) => ({
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut", delay },
    },
  });

  return (
    <div className="relative bg-black text-white min-h-screen overflow-hidden font-body">
      <Navbar />

      {/* Hero Section */}
      <section className="relative w-full min-h-screen flex flex-col md:flex-row items-center justify-center">
        <video
          className="absolute inset-0 w-full h-full object-cover z-0"
          src={heroVideo}
          autoPlay
          loop
          muted
        />
        <div className="absolute inset-0 bg-black/60 z-0" />
        <motion.div
          className="relative z-10 w-full md:w-1/2 flex flex-col justify-center px-10 md:px-20"
          initial="hidden"
          animate="visible"
          variants={fadeIn(0.2)}
        >
          <motion.h2
            className="text-cyan-400 text-2xl tracking-widest mb-3 font-display uppercase"
            variants={fadeIn(0.3)}
          >
            Fueling The Future
          </motion.h2>
          <motion.h1
            className="text-6xl md:text-8xl font-display mb-4"
            variants={fadeIn(0.5)}
          >
            About <span className="text-cyan-400">LIT Energy</span>
          </motion.h1>
          <motion.p
            className="text-gray-300 text-lg max-w-md leading-relaxed"
            variants={fadeIn(0.7)}
          >
            Born from innovation and obsession with performance, LIT Energy is
            more than a drink — it's a movement. Designed for creators,
            athletes, and dreamers who refuse to slow down. Every sip delivers
            sustained focus, clean energy, and bold taste powered by our
            next-gen formula.
          </motion.p>
        </motion.div>

        <div className="relative w-full md:w-1/2 h-[70vh] z-10">
          <Canvas camera={{ fov: 45, position: [0, 0.3, 3] }}>
            <ambientLight intensity={0.5} />
            <directionalLight color="#00d8ff" position={[5, 5, 5]} intensity={2.5} />
            <Environment preset="city" />
            <Stars radius={100} depth={50} count={4000} fade speed={1} />
            <Suspense fallback={null}>
              <AboutCanModel
                modelPath={modelPath}
                scale={0.8}
                position={[0, -0.8, 0]}
                glow="#00d8ff"
              />
            </Suspense>
            <OrbitControls enableZoom={false} enablePan={false} />
          </Canvas>
        </div>
      </section>

      {/* Story Section */}
      <section className="w-full bg-[#0a0a0a] py-24 px-8 md:px-20 text-center">
        <motion.h2
          className="text-5xl md:text-6xl font-display mb-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn(0.2)}
        >
          Our <span className="text-cyan-400">Story</span>
        </motion.h2>
        <motion.p
          className="text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn(0.5)}
        >
          It started in underground labs and neon-lit streets — a mission to
          redefine energy. From Monster to Red Bull to our own LIT creation,
          we’ve chased one goal: balance taste with clean power. Our blends are
          tested under pressure, built for endurance, and engineered for those
          who never back down.
        </motion.p>
      </section>

      {/* Mission Section */}
      <section className="w-full bg-black py-24 px-8 md:px-20 flex flex-col md:flex-row items-center justify-center gap-16">
        <motion.div
          className="md:w-1/2 space-y-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn(0.3)}
        >
          <h2 className="text-5xl font-display">
            Our <span className="text-cyan-400">Mission</span>
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            We exist to **empower your energy evolution** — not just with
            caffeine, but with science. Each formula is designed to provide
            sustained vitality without crashes. From the gym to the grind, from
            the stage to the screen — LIT Energy keeps you sharp, focused, and
            unstoppable.
          </p>
          <motion.button
            className="mt-6 px-8 py-3 rounded-full border border-cyan-400 text-cyan-400 font-semibold hover:bg-cyan-400 hover:text-black transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore Products
          </motion.button>
        </motion.div>

        <div className="relative md:w-1/2 h-[400px]">
          <Canvas camera={{ position: [0, 0, 3], fov: 45 }}>
            <ambientLight intensity={0.6} />
            <directionalLight color="#00d8ff" position={[3, 3, 3]} intensity={2} />
            <Environment preset="city" />
            <Stars radius={90} depth={40} count={3000} fade speed={1} />
            <Suspense fallback={null}>
              <AboutCanModel
                modelPath="/model/orange.glb"
                scale={6}
                position={[0, -0.6, 0]}
                glow="#ff8c00"
              />
            </Suspense>
            <OrbitControls enableZoom={false} enablePan={false} />
          </Canvas>
        </div>
      </section>

      {/* Vision / Footer */}
      <section className="relative w-full bg-[#111] py-24 px-8 md:px-20 text-center">
        <motion.h2
          className="text-5xl md:text-6xl font-display mb-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn(0.2)}
        >
          The <span className="text-cyan-400">Vision</span> Ahead
        </motion.h2>
        <motion.p
          className="text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn(0.5)}
        >
          We’re pushing beyond limits — integrating new natural extracts,
          adaptive nootropics, and sustainability-first packaging. The next era
          of energy isn’t just powerful — it’s responsible, smart, and built for
          the future.
        </motion.p>
      </section>
    </div>
  );
}
