import React, { Suspense, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import SplashScreen from "./Pages/SplashScreen"; // 👈 import your splash

// Lazy load heavy pages
const About = React.lazy(() => import("./Pages/About"));
const Products = React.lazy(() => import("./Pages/Products"));
const Collaborate = React.lazy(() => import("./Pages/Collaborate"));
const Contact = React.lazy(() => import("./Pages/Contact"));

// 🔹 Preload function for images & GLTFs
const preloadAssets = async () => {
  const images = [
    "/collabs/f11.gif",
    "/collabs/f22.gif",
    "/collabs/f33.gif",
    "https://picsum.photos/500/500?grayscale",
    "https://picsum.photos/600/600?grayscale",
  ];

  const models = ["/models/drink1.gltf", "/models/drink2.gltf"];

  // Preload images
  images.forEach((src) => {
    const img = new Image();
    img.src = src;
  });

  // Preload GLTFs
  if (models.length > 0) {
    const { GLTFLoader } = await import("three/examples/jsm/loaders/GLTFLoader.js");
    const loader = new GLTFLoader();
    models.forEach((url) => loader.load(url, () => {}, undefined, () => {}));
  }
};

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Start preloading while splash is visible
    preloadAssets();

    // Simulate splash duration (you can tweak this)
    const timer = setTimeout(() => setLoading(false), 3000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <SplashScreen />; // 👈 Show splash first
  }

  return (
    <Suspense fallback={<div className="text-white p-10 text-center">Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/collaborate" element={<Collaborate />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Suspense>
  );
};

export default App;
