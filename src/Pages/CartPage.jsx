// src/Pages/CartPage.jsx
import React, { Suspense, useEffect } from "react";
import { motion } from "framer-motion";
import { useCart } from "../Components/CartContext";
import Navbar from "../Components/Navbar";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, OrbitControls, Stars, useGLTF } from "@react-three/drei";
import { useNavigate } from "react-router-dom";

/* ============================================================
   STRIPE (NO BACKEND) CONFIG
   ------------------------------------------------------------
   Set these in your .env and RESTART dev server.

   For CRA (Create React App):
     REACT_APP_STRIPE_PAYMENT_LINK_CART=https://buy.stripe.com/...
     REACT_APP_STRIPE_BUY_BUTTON_ID=buy_btn_...
     REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_live_...

   For Vite:
     VITE_STRIPE_PAYMENT_LINK_CART=https://buy.stripe.com/...
     VITE_STRIPE_BUY_BUTTON_ID=buy_btn_...
     VITE_STRIPE_PUBLISHABLE_KEY=pk_live_...
   ============================================================ */
const viteEnv = typeof import.meta !== "undefined" ? import.meta.env : undefined;
const STRIPE_PAYMENT_LINK_CART = "https://buy.stripe.com/test_14A8wJ1nX9J77PCaWOa7C00";

const STRIPE_BUY_BUTTON_ID =
  (viteEnv && viteEnv.VITE_STRIPE_BUY_BUTTON_ID) ||
  process.env.REACT_APP_STRIPE_BUY_BUTTON_ID ||
  "";

const STRIPE_PUBLISHABLE_KEY =
  (viteEnv && viteEnv.VITE_STRIPE_PUBLISHABLE_KEY) ||
  process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY ||
  "";

// Optional: per-item “Buy Now” links by product id
const paymentLinksMap = {
  // 1: "https://buy.stripe.com/your_item_link_1",
  // 2: "https://buy.stripe.com/your_item_link_2",
  // ...
};

/** Mini 3D viewer for cart items */
const MiniModel = ({ item }) => {
  // Preload on mount for snappier rendering
  useEffect(() => {
    try {
      if (item?.modelPath) useGLTF.preload(item.modelPath);
    } catch (_) {}
  }, [item?.modelPath]);

  const Model = () => {
    const { scene } = useGLTF(item.modelPath);
    useFrame(({ clock }) => {
      const t = clock.getElapsedTime();
      // gentle float; rotation handled by OrbitControls autoRotate
      scene.position.y = (item.position?.[1] || 0) + Math.sin(t * 1.4) * 0.03;
    });
    return (
      <primitive
        object={scene}
        scale={item.scale ?? 0.2}
        position={item.position ?? [0, -0.5, 0]}
      />
    );
  };

  return (
    <Canvas camera={{ position: item.camera || [0, 0, 3.2], fov: 50 }} className="rounded-lg">
      <Suspense fallback={null}>
        <ambientLight intensity={0.8} />
        <directionalLight
          color={item.modelGlowColor || "#a3e635"} // lime glow
          position={[3, 3, 2]}
          intensity={2.5}
        />
        <directionalLight color="#ffffff" position={[-4, -2, 5]} intensity={1} />
        <Environment preset="city" />
        <Stars radius={80} depth={40} count={3000} factor={3} saturation={0} fade />
        <Model />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.8} />
      </Suspense>
    </Canvas>
  );
};

/** Optional Stripe Buy Button wrapper (embed) */
const StripeBuyButton = () => {
  useEffect(() => {
    if (!STRIPE_BUY_BUTTON_ID || !STRIPE_PUBLISHABLE_KEY) return;
    const s = document.createElement("script");
    s.src = "https://js.stripe.com/v3/buy-button.js";
    s.async = true;
    document.body.appendChild(s);
    return () => document.body.removeChild(s);
  }, []);

  if (!STRIPE_BUY_BUTTON_ID || !STRIPE_PUBLISHABLE_KEY) return null;

  return (
    <stripe-buy-button
      buy-button-id={STRIPE_BUY_BUTTON_ID}
      publishable-key={STRIPE_PUBLISHABLE_KEY}
    />
  );
};

const CartPage = () => {
  const { cart, increment, decrement, removeItem, clearCart, subtotal } = useCart();
  const navigate = useNavigate();

  const delivery = subtotal > 500 ? 0 : 49; // simple rule
  const total = subtotal + delivery;

  // Whole-cart checkout using a static Payment Link
  const handleCheckout = () => {
    if (!STRIPE_PAYMENT_LINK_CART) {
      alert(
        "Add a Stripe Payment Link in your env.\nVite: VITE_STRIPE_PAYMENT_LINK_CART\nCRA: REACT_APP_STRIPE_PAYMENT_LINK_CART"
      );
      return;
    }
    window.location.href = STRIPE_PAYMENT_LINK_CART;
  };

  // Per-item “Buy Now”; falls back to cart link if item link missing
  const handleItemBuyNow = (productId) => {
    const link = paymentLinksMap[productId] || STRIPE_PAYMENT_LINK_CART;
    if (!link) {
      alert("No Payment Link configured. Add item link in paymentLinksMap or set cart link.");
      return;
    }
    window.location.href = link;
  };

  return (
    <div className="bg-neutral-950 text-neutral-200 min-h-screen">
      <Navbar />
      <main className="max-w-6xl mx-auto pt-28 p-4 md:p-6">
        <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-6 tracking-tight">
          Your Cart
        </h1>

        {cart.length === 0 ? (
          <div className="p-10 border border-neutral-800 rounded-2xl bg-neutral-900/70 text-neutral-300 text-center">
            <p className="text-lg">Your cart is empty.</p>
            <button
              onClick={() => navigate("/products")}
              className="mt-5 inline-flex items-center px-5 py-3 rounded-lg font-semibold
                         bg-gradient-to-r from-lime-400 to-green-500 text-neutral-900
                         shadow-lg shadow-lime-500/25 hover:shadow-xl hover:shadow-lime-500/30
                         hover:from-lime-300 hover:to-green-400 transition-all"
            >
              Browse Products
            </button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Items */}
            <div className="lg:col-span-2 space-y-5">
              {cart.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col sm:flex-row gap-4 p-4 rounded-2xl bg-neutral-900/70 border border-neutral-800
                             shadow-xl shadow-black/30 backdrop-blur-sm"
                >
                  {/* 3D preview */}
                  <div className="sm:w-40 sm:h-40 w-full h-48 bg-neutral-950 rounded-xl overflow-hidden border border-neutral-800">
                    {item.modelPath ? (
                      <MiniModel item={item} />
                    ) : (
                      <div className="w-full h-full grid place-items-center text-neutral-500">
                        No Preview
                      </div>
                    )}
                  </div>

                  {/* Info + controls */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-bold text-white">{item.name}</h3>
                        <p className="text-sm text-neutral-400 mt-1">
                          {item.type} • {item.flavor} • {item.packSize}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-lime-400 font-bold text-xl">
                          ₹{item.price}
                          <span className="text-xs text-neutral-400 font-semibold"> / item</span>
                        </div>
                      </div>
                    </div>

                    {/* Qty controls */}
                    <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                      <div className="flex items-center gap-2 bg-neutral-800/50 rounded-xl p-2 border border-neutral-700/80">
                        {/* − */}
                        <button
                          onClick={() => decrement(item.id)}
                          className="px-3.5 py-2 rounded-md font-bold text-neutral-300
                                     bg-neutral-900 hover:bg-red-900/50 hover:text-red-400
                                     border border-neutral-700 hover:border-red-700
                                     transition-colors active:scale-95"
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>

                        {/* qty */}
                        <span
                          className="px-5 py-2 min-w-[60px] text-center rounded-lg font-bold tracking-wider text-lime-300
                                     bg-lime-900/50 border border-lime-500/30
                                     shadow-[0_0_10px_rgba(163,230,53,0.2)]
                                     select-none"
                        >
                          {item.quantity}
                        </span>

                        {/* + */}
                        <button
                          onClick={() => increment(item.id)}
                          className="px-3.5 py-2 rounded-md font-bold text-neutral-300
                                     bg-neutral-900 hover:bg-green-900/50 hover:text-green-400
                                     border border-neutral-700 hover:border-green-700
                                     transition-colors active:scale-95"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleItemBuyNow(item.id)}
                          className="px-4 py-2 rounded-lg font-semibold
                                     bg-gradient-to-r from-cyan-400 to-emerald-400 text-neutral-900
                                     shadow-[0_0_14px_rgba(34,211,238,0.35)]
                                     hover:from-cyan-300 hover:to-emerald-300 transition-all"
                          title="Buy this item only"
                        >
                          Buy Now
                        </button>

                        <div className="pl-3 ml-3 border-l border-neutral-800 text-right">
                          <div className="text-sm text-neutral-400">Line Total</div>
                          <div className="text-white font-bold text-lg">₹{item.price * item.quantity}</div>
                        </div>

                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-sm text-red-500 hover:text-red-400 font-medium transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}

              <button
                onClick={clearCart}
                className="mt-1 text-sm text-red-500 hover:text-red-400 font-medium transition-colors"
              >
                Clear cart
              </button>
            </div>

            {/* Summary */}
            <div className="p-5 rounded-2xl bg-neutral-900/70 border border-neutral-800 h-fit
                          lg:sticky lg:top-24 shadow-xl shadow-black/30 backdrop-blur-sm">
              <h2 className="font-bold text-2xl text-white mb-4">Order Summary</h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-neutral-400">Subtotal</span>
                  <span className="text-white">₹{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Delivery</span>
                  <span className="text-white">{delivery === 0 ? "Free" : `₹${delivery}`}</span>
                </div>

                <div className="mt-2 rounded-lg bg-lime-900/50 border border-lime-500/30 px-3 py-2 text-xs text-lime-300">
                  {subtotal >= 500
                    ? "You’ve unlocked free shipping 🚚"
                    : `Add ₹${Math.max(0, 500 - subtotal)} more for free shipping`}
                </div>

                <hr className="border-neutral-800 my-2" />
                <div className="flex justify-between text-xl font-extrabold">
                  <span className="text-white">Total</span>
                  <span className="text-lime-400">₹{total}</span>
                </div>
              </div>

              {/* Option A: Payment Link redirect */}
              <button
                onClick={handleCheckout}
                className="w-full mt-5 py-3 rounded-lg font-bold text-neutral-900
                           bg-gradient-to-r from-lime-400 to-green-500
                           hover:from-lime-300 hover:to-green-400
                           shadow-lg shadow-lime-500/25 hover:shadow-xl hover:shadow-lime-500/35 
                           transition-all"
              >
                Checkout (Stripe)
              </button>

              {/* Option B: Stripe Buy Button (optional embed) */}
              <div className="mt-3">
                <StripeBuyButton />
              </div>

              <button
                onClick={() => navigate("/products")}
                className="w-full mt-3 py-3 rounded-lg font-semibold text-white bg-neutral-800/80 hover:bg-neutral-700/80 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default CartPage;
