import React, { Suspense, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import SplashScreen from "./Pages/SplashScreen";

// Lazy load heavy pages
const About = React.lazy(() => import("./Pages/About"));
const Products = React.lazy(() => import("./Pages/Products"));          // list & detail (we'll also route /products/:id to this)
const Collaborate = React.lazy(() => import("./Pages/Collaborate"));
const Contact = React.lazy(() => import("./Pages/Contact"));
const Signup = React.lazy(() => import("./Pages/Signup"));
const CartPage = React.lazy(() => import("./Pages/CartPage"));          // 🔹 NEW: /cart

// 🔹 Preload function for images & GLTFs
const preloadAssets = async () => {
  const images = [
    "/collabs/f11.gif",
    "/collabs/f22.gif",
    "/collabs/f33.gif",
    "https://picsum.photos/500/500?grayscale",
    "https://picsum.photos/600/600?grayscale",
  ];

  const models = [
    "/models/drink1.gltf",
    "/models/drink2.gltf",
    // (optional) Add your product models here to warm cache:
    // "/Products/monster_energy_drink.glb",
    // "/Products/pink.glb",
    // ...
  ];

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

    // Simulate splash duration (tweak if needed)
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <SplashScreen />; // 👈 Show splash first
  }

  return (
    <Suspense fallback={<div className="text-white p-10 text-center">Loading...</div>}>
      <Routes>
        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* Core pages */}
        <Route path="/about" element={<About />} />
        <Route path="/collaborate" element={<Collaborate />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signup" element={<Signup />} />

        {/* Products */}
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<Products />} />   {/* 🔹 Detail route mapped to same component */}

        {/* Cart */}
        <Route path="/cart" element={<CartPage />} />           {/* 🔹 NEW: /cart route */}

        {/* 404 */}
        <Route
          path="*"
          element={
            <div className="min-h-screen flex items-center justify-center text-white">
              404 - Not Found
            </div>
          }
        />
      </Routes>
    </Suspense>
  );
};

export default App;
