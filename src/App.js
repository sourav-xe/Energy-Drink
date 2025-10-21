import React, { Suspense, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";

// Lazy load heavy pages
const About = React.lazy(() => import("./Pages/About"));
const Products = React.lazy(() => import("./Pages/Products"));
const Collaborate = React.lazy(() => import("./Pages/Collaborate"));

// 🔹 Preload function for images & GLTFs
const preloadAssets = async () => {
  // Image URLs you use in different pages
  const images = [
    "/collabs/f11.gif",
    "/collabs/f22.gif",
    "/collabs/f33.gif",
    "https://picsum.photos/500/500?grayscale",
    "https://picsum.photos/600/600?grayscale",
  ];

  // GLTF model URLs used in Products/Collaborate/etc.
  const models = [
    "/models/drink1.gltf",
    "/models/drink2.gltf",
  ];

  // Preload images
  images.forEach((src) => {
    const img = new Image();
    img.src = src;
  });

  // Preload GLTF models (lazy load only when needed)
  if (models.length > 0) {
    const { GLTFLoader } = await import("three/examples/jsm/loaders/GLTFLoader.js");
    const loader = new GLTFLoader();
    models.forEach((url) => loader.load(url, () => {}, undefined, () => {}));
  }
};

const App = () => {
  useEffect(() => {
    // 👇 Preload in background after Home mounts
    const timeout = setTimeout(() => {
      preloadAssets();
    }, 2000); // start preloading after 2 seconds of Home load
    return () => clearTimeout(timeout);
  }, []);

  return (
    <Suspense fallback={<div className="text-white p-10 text-center">Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/Products" element={<Products />} />
        <Route path="/Collaborate" element={<Collaborate />} />
      </Routes>
    </Suspense>
  );
};

export default App;
