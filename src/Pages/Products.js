import React, { useState, useMemo, Suspense, useRef, useEffect, useCallback } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, useGLTF, OrbitControls, Stars } from '@react-three/drei';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Navbar from '../Components/Navbar';
import { useCart } from "../Components/CartContext";

// --- PRODUCTS (exactly as you provided) ---
const products = [
    {
        id: 1, name: 'Monster Original', price: 99, flavor: 'Original', type: 'Classic', packSize: 'Single can',
        description: 'The classic, unmistakable flavor that started it all. A powerful punch of energy to fuel your hustle.',
        modelPath: `${process.env.PUBLIC_URL}/Products/monster_energy_drink.glb`, modelGlowColor: '#90EE90', scale: [0.3, 0.3, 0.3], position: [0.01, -0.6, 0.2], camera: [0, 0, 3],
    },
    {
        id: 2, name: 'Cosmic Pink', price: 200, flavor: 'Cosmic Pink', type: 'Juice', packSize: 'Single can',
        description: 'A vibrant blend of exotic juices with a cosmic twist. Out of this world flavor and energy.',
        modelPath: `${process.env.PUBLIC_URL}/Products/pink.glb`, modelGlowColor: '#ff69b4', scale: 0.04, position: [0, -0.5, 0], camera: [0, 0, 3],
    },
    {
        id: 3, name: 'Ultra Sunrise', price: 299, flavor: 'Citrus', type: 'Ultra', packSize: 'Pack of 4',
        description: 'A refreshing citrus blend with zero sugar. The perfect way to start your day with a boost of energy.',
        modelPath: `${process.env.PUBLIC_URL}/Products/orange.glb`, modelGlowColor: '#ff8c00', scale: 8, position: [0, -0.6, 0], camera: [0, 0, 3],
    },
    {
        id: 4, name: 'Zero Ultra', price: 90, flavor: 'Zero Sugar', type: 'Ultra', packSize: 'Single can',
        description: 'Crisp, clean, and refreshing with zero sugar. All the energy without the calories.',
        modelPath: `${process.env.PUBLIC_URL}/Products/monster_zero_ultra.glb`, modelGlowColor: '#B0B0B0', scale: 0.34, position: [0, -0.5, 0], camera: [0, 0, 3],
    },
    {
        id: 5, name: 'Pallidum', price: 250, flavor: 'Cherry Web', type: 'Limited Edition', packSize: 'Single can',
        description: 'A limited edition flavor with a bold cherry taste. Unleash your inner hero.',
        modelPath: `${process.env.PUBLIC_URL}/Products/palladium_energy_drink.glb`, modelGlowColor: '#ff0000', scale: 0.1, position: [0, -0.6, 0], camera: [0, 0, 3],
    },
    {
        id: 6, name: 'Red Bull Classic', price: 110, flavor: 'Original', type: 'Classic', packSize: 'Single can',
        description: 'The iconic formula that gives you wings. The original and still the best.',
        modelPath: `${process.env.PUBLIC_URL}/Products/red_bull_energy_drink_can.glb`, modelGlowColor: '#ff1493', scale: 15.4, position: [0.08, -0.2, 0], camera: [0, 0, 4.5],
    },
    {
        id: 7, name: 'LIT Energy', price: 300, flavor: 'Classic Surge', type: 'Performance', packSize: 'Pack of 12',
        description: 'Engineered for peak performance. A smooth, sustained energy boost with zero crash.',
        modelPath: `${process.env.PUBLIC_URL}/Products/lit.glb`, modelGlowColor: '#00d8ff', scale: 0.8, position: [0, -0.7, 0], camera: [0, 0, 3],
    },
    {
        id: 8, name: 'Black Monster', price: 220, flavor: 'Original', type: 'Classic', packSize: 'Single can',
        description: 'The same great Monster taste in a sleek, black can. Unleash the beast.',
        modelPath: `${process.env.PUBLIC_URL}/Products/black_monster_energy_drink.glb`, modelGlowColor: '#50C878', scale: 6.35, position: [0, 0.01, 0], camera: [0, 0, 3],
    },
    {
        id: 9, name: 'Guoba Chili', price: 180, flavor: 'Spicy Chili', type: 'Exotic', packSize: 'Single can',
        description: 'A fiery blend of chili and spices for a unique energy experience. Feel the heat.',
        modelPath: `${process.env.PUBLIC_URL}/Products/guoba_chili_energy_drink.glb`, modelGlowColor: '#D22B2B', scale: 0.35, position: [0, -0.7, 0], camera: [0, 0, 3],
    },
    {
        id: 10, name: 'Kendu Energy', price: 160, flavor: 'Tropical Punch', type: 'Classic', packSize: 'Single can',
        description: 'A refreshing tropical punch flavor that transports you to paradise with every sip.',
        modelPath: `${process.env.PUBLIC_URL}/Products/kendu_energy_drink_can.glb`, modelGlowColor: '#32CD32', scale: 1.6, position: [0, -0.7, 0], camera: [0, 0, 3],
    },
    {
        id: 11, name: 'Palladium Energy', price: 270, flavor: 'Silver Rush', type: 'Premium', packSize: 'Single can',
        description: 'A premium energy drink with a smooth, silver rush flavor for the discerning palate.',
        modelPath: `${process.env.PUBLIC_URL}/Products/palladium_energy_drink.glb`, modelGlowColor: '#C0C0C0', scale: 0.08, position: [0, -0.6, 0], camera: [0, 0, 3],
    },
    {
        id: 12, name: 'Energy 500ml', price: 130, flavor: 'Classic Boost', type: 'Classic', packSize: '500ml can',
        description: 'More of the classic boost you love. The perfect size for when you need extra energy.',
        modelPath: `${process.env.PUBLIC_URL}/Products/energy_drink_500ml.glb`, modelGlowColor: '#FFD700', scale: 8.2, position: [0, -0.7, 0], camera: [0, 0, 3],
    },
    {
        id: 13, name: 'Game Ready', price: 199, flavor: 'Gaming Fuel', type: 'Performance', packSize: 'Single can',
        description: 'Formulated for gamers. Enhance your focus and reaction time for peak gaming performance.',
        modelPath: `${process.env.PUBLIC_URL}/Products/energy_drink_game_ready_model.glb`, modelGlowColor: '#00FF7F', scale: 0.06, position: [0, -0.8, 0], camera: [0, 0, 3],
    },
    {
        id: 14, name: 'Gla Energy', price: 175, flavor: 'Berry Frost', type: 'Cool Series', packSize: 'Single can',
        description: 'A cool and refreshing berry frost flavor that provides a smooth, icy energy boost.',
        modelPath: `${process.env.PUBLIC_URL}/Products/gla.glb`, modelGlowColor: '#1E90FF', scale: 7.25, position: [0, -0.6, 0], camera: [0, 0, 3],
    },
    {
        id: 15, name: 'Energy Classic', price: 100, flavor: 'Classic', type: 'Standard', packSize: 'Single can',
        description: 'The standard for energy. A simple, no-frills energy drink for everyday use.',
        modelPath: `${process.env.PUBLIC_URL}/Products/energy_drink.glb`, modelGlowColor: '#FFFF00', scale: 0.15, position: [0, -0.6, 0], camera: [0, 0, 3],
    },
];

const flavors = ['Original', 'Cosmic Pink', 'Citrus', 'Zero Sugar', 'Cherry Web', 'Classic Surge', 'Spicy Chili', 'Tropical Punch', 'Silver Rush', 'Classic Boost', 'Gaming Fuel', 'Berry Frost', 'Classic'];
const types = ['Classic', 'Juice', 'Ultra', 'Limited Edition', 'Performance', 'Exotic', 'Premium', 'Cool Series', 'Standard'];
const packSizes = ['Single can', 'Pack of 4', 'Pack of 12', '500ml can'];
const priceRanges = [
    { label: '₹50-₹99', min: 50, max: 99 },
    { label: '₹100-₹199', min: 100, max: 199 },
    { label: '₹200-₹299', min: 200, max: 299 },
    { label: '₹300+', min: 300, max: Infinity },
];
const PRODUCTS_PER_PAGE = 8;

// --- icons ---
const ArrowRightIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg> );
const ChevronRightIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg> );
const PlusIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg> );
const MinusIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" /></svg> );

// --- 3D ---
const AnimatedCan = React.memo(({ config }) => {
  const { scene } = useGLTF(config.modelPath);
  const modelRef = useRef();
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (modelRef.current) {
      modelRef.current.rotation.y = t * 0.4;
      modelRef.current.position.y = (config.position[1] || 0) + Math.sin(t * 1.2) * 0.05;
    }
  });
  return <primitive ref={modelRef} object={scene} scale={config.scale} position={config.position} />;
});

const ProductScene = React.memo(({ config, controls = true }) => (
  <Canvas camera={{ position: config.camera || [0, 0, 3.5], fov: 50 }}>
    <Suspense fallback={null}>
      <ambientLight intensity={0.8} />
      <directionalLight color={config.modelGlowColor} position={[4, 4, 2]} intensity={3} />
      <directionalLight color="#ffffff" position={[-4, -2, 5]} intensity={1.5} />
      <Environment preset="city" />
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <AnimatedCan config={config} />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate={!controls} autoRotateSpeed={0.5} />
    </Suspense>
  </Canvas>
));

// --- UI ---
const FilterCheckbox = ({ label, id, checked, onChange }) => (
  <div className="flex items-center space-x-3">
    <input id={id} type="checkbox" checked={checked} onChange={onChange} className="h-4 w-4 rounded bg-neutral-700 border-neutral-600 text-lime-500 focus:ring-lime-500 cursor-pointer" />
    <label htmlFor={id} className="text-neutral-300 hover:text-white cursor-pointer">{label}</label>
  </div>
);

const Sidebar = ({ filters, onFilterChange }) => {
  const handleCheckboxChange = (category, value) => {
    const currentValues = filters[category];
    const newValues = currentValues.includes(value)
      ? currentValues.filter(item => item !== value)
      : [...currentValues, value];
    onFilterChange(category, newValues);
  };
  const handlePriceChange = (range) => {
    onFilterChange('price', filters.price?.label === range.label ? null : range);
  };
  const resetFilters = (category) => {
    onFilterChange(category, category === 'price' ? null : []);
  };
  return (
    <aside className="w-full md:w-64 lg:w-72 bg-neutral-900 p-6 rounded-xl self-start border border-neutral-800 flex-shrink-0">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4"><h3 className="font-bold text-lg text-white">Flavor</h3><button onClick={() => resetFilters('flavors')} className="text-neutral-400 hover:text-white text-sm">Reset</button></div>
        <div className="space-y-3">{flavors.map(flavor => <FilterCheckbox key={flavor} id={flavor.toLowerCase().replace(' ','-')} label={flavor} checked={filters.flavors.includes(flavor)} onChange={() => handleCheckboxChange('flavors', flavor)} />)}</div>
      </div>
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4"><h3 className="font-bold text-lg text-white">Type</h3><button onClick={() => resetFilters('types')} className="text-neutral-400 hover:text-white text-sm">Reset</button></div>
        <div className="space-y-3">{types.map(type => <FilterCheckbox key={type} id={type.toLowerCase().replace(' ','-')} label={type} checked={filters.types.includes(type)} onChange={() => handleCheckboxChange('types', type)} />)}</div>
      </div>
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4"><h3 className="font-bold text-lg text-white">Pack Size</h3><button onClick={() => resetFilters('packSizes')} className="text-neutral-400 hover:text-white text-sm">Reset</button></div>
        <div className="space-y-3">{packSizes.map(size => <FilterCheckbox key={size} id={size.replace(' ','-').toLowerCase()} label={size} checked={filters.packSizes.includes(size)} onChange={() => handleCheckboxChange('packSizes', size)} />)}</div>
      </div>
      <div>
        <div className="flex justify-between items-center mb-4"><h3 className="font-bold text-lg text-white">Price</h3><button onClick={() => resetFilters('price')} className="text-neutral-400 hover:text-white text-sm">Reset</button></div>
        <div className="grid grid-cols-2 gap-2">{priceRanges.map(range => (<button key={range.label} onClick={() => handlePriceChange(range)} className={`px-2 py-1 text-sm rounded-md transition-colors ${filters.price?.label === range.label ? 'bg-lime-400 text-neutral-900 font-bold' : 'bg-neutral-700 text-neutral-300 hover:bg-neutral-600'}`}>{range.label}</button>))}</div>
      </div>
    </aside>
  );
};

const DiscountSection = () => {
  const [email, setEmail] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const handleSubmit = () => {
    if (!email.trim()) return alert("Please enter your email!");
    setShowNotification(true);
    setEmail("");
  };
  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0 md:space-x-8 p-6 bg-neutral-900 border border-neutral-800 rounded-2xl shadow-xl shadow-lime-500/5 relative overflow-hidden">
        <div>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-2">Pure Energy, Big Discount</h2>
          <p className="text-neutral-400 text-lg">Save up to 50% off on your first order</p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <input type="email" placeholder="Your email address" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-neutral-800 text-white placeholder-neutral-500 px-4 py-3 rounded-lg w-full sm:w-auto flex-grow focus:outline-none focus:ring-2 focus:ring-lime-400 border border-neutral-700" />
            <button onClick={handleSubmit} className="bg-lime-400 hover:bg-lime-500 text-neutral-900 font-bold py-3 px-6 rounded-lg transition-transform transform hover:scale-105 whitespace-nowrap">Get Coupon</button>
          </div>
        </div>
        <div className="w-48 h-48 md:w-56 md:h-56 flex-shrink-0 overflow-hidden">
          <motion.video src="/avatars/mon.webm" className="w-[264px] h-52 rounded-xl object-cover border border-white/20 shadow-lg shadow-green-500/20" autoPlay loop muted playsInline initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.8, duration: 0.5 }} />
        </div>
      </div>
      <AnimatePresence>
        {showNotification && (
          <motion.div className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm z-50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div initial={{ scale: 0.8, opacity: 0, y: 50 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.8, opacity: 0, y: 50 }} transition={{ type: "spring", stiffness: 100, damping: 15 }} className="bg-neutral-900 border border-lime-400/30 rounded-2xl p-8 text-center max-w-sm mx-auto shadow-xl shadow-lime-400/10">
              <h3 className="text-2xl font-bold text-white mb-2">🎉 Congratulations!</h3>
              <p className="text-neutral-300 mb-6">We’ve sent a <span className="text-lime-400 font-semibold">30% OFF</span> coupon to your email for your first purchase.</p>
              <button onClick={() => setShowNotification(false)} className="bg-lime-400 hover:bg-lime-500 text-neutral-900 font-bold py-2 px-6 rounded-lg transition-transform transform hover:scale-105">Okay</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const ProductCard = ({ product, onProductSelect }) => (
  <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 group relative overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 ease-in-out shadow-lg hover:shadow-lime-400/10 hover:border-lime-400/50">
    <div className="aspect-square bg-neutral-800 rounded-xl mb-4 flex items-center justify-center overflow-hidden">
      <Suspense fallback={<div className="w-full h-full bg-neutral-800 animate-pulse" />}>
        <ProductScene config={product} controls={false} />
      </Suspense>
    </div>
    <div className="flex justify-between items-center">
      <div><h4 className="font-bold text-white text-lg">{product.name}</h4></div>
      <div className="absolute top-6 left-6 bg-black bg-opacity-50 text-white text-sm font-semibold py-1 px-3 rounded-full backdrop-blur-sm">₹{product.price}</div>
      <button onClick={() => onProductSelect(product)} className="bg-neutral-800 h-12 w-12 rounded-full flex items-center justify-center text-white hover:bg-lime-400 hover:text-black transition-colors">
        <ArrowRightIcon />
      </button>
    </div>
  </div>
);

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
  return (
    <div className="flex justify-center items-center space-x-2 mt-12">
      {pageNumbers.map(number => (
        <button key={number} onClick={() => onPageChange(number)} className={`h-10 w-10 rounded-lg flex items-center justify-center font-bold transition-colors ${currentPage === number ? 'bg-lime-400 text-neutral-900' : 'bg-neutral-800 text-neutral-200 hover:bg-neutral-700'}`}>{number}</button>
      ))}
    </div>
  );
};

const ProductsGrid = ({ products, currentPage, totalPages, onPageChange, onProductSelect }) => (
  <div className="mt-12">
    <h3 className="text-3xl font-bold text-white mb-6">Popular Products</h3>
    {products.length > 0 ? (
      <>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map(p => <ProductCard key={p.id} product={p} onProductSelect={onProductSelect} />)}
        </div>
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
      </>
    ) : (
      <div className="text-center py-16 bg-neutral-900/50 rounded-lg mt-8">
        <p className="text-neutral-400 text-lg">No products match your filters.</p>
        <p className="text-neutral-500 text-sm mt-2">Try adjusting your selection.</p>
      </div>
    )}
  </div>
);

const AccordionItem = ({ title, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="border-t border-neutral-700">
      <button onClick={() => setIsOpen(!isOpen)} className="flex justify-between items-center w-full py-4 text-left">
        <h4 className="font-bold text-white text-lg">{title}</h4>
        <div className="text-white">{isOpen ? <MinusIcon /> : <PlusIcon />}</div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: 'easeInOut' }} className="overflow-hidden">
            <div className="pb-4 text-neutral-300 text-sm pr-6">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { cart, addItem, increment, decrement } = useCart(); // need cart + inc/dec

  const product = useMemo(() => products.find(p => p.id === Number(id)), [id]);

  // Is this product already in cart?
  const cartItem = useMemo(
    () => (product ? cart.find(i => i.id === product.id) : null),
    [cart, product]
  );

  useEffect(() => {
    if (product) { useGLTF.preload(product.modelPath); }
  }, [product]);

  const handleAddToCart = () => {
    if (!product) return;
    if (!cartItem) addItem(product, 1); // first add -> UI flips to +/- controls
  };

  const handleBuyNow = () => {
    if (!product) return;
    if (!cartItem) addItem(product, 1); // ensure it's in cart
    navigate("/cart");                  // go to cart
  };

  if (!product) {
    return (
      <div className="text-center py-20 text-neutral-400">
        Product not found.{" "}
        <button onClick={() => navigate("/products")} className="text-lime-400 hover:underline">
          Go back
        </button>
      </div>
    );
  }

  return (
    <motion.div
      key="product-detail"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="pt-40 pb-16 px-4 sm:px-8 max-w-screen-xl mx-auto min-h-screen"
    >
      <div className="flex items-center text-sm text-neutral-400 mb-8">
        <button onClick={() => navigate("/")} className="hover:text-white">Home</button>
        <ChevronRightIcon />
        <button onClick={() => navigate("/products")} className="hover:text-white">Drinks</button>
        <ChevronRightIcon />
        <span className="text-white">{product.name}</span>
      </div>

      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl flex flex-col md:flex-row overflow-hidden shadow-lg">
        <div className="w-full md:w-1/2 h-[50vh] md:h-[600px] bg-neutral-800 flex items-center justify-center p-4">
          <Suspense fallback={<div className="w-full h-full bg-neutral-800 animate-pulse" />}>
            <ProductScene
              config={{ ...product, camera: [0, 0, (product.camera?.[2] || 3) + 1] }}
              controls={true}
            />
          </Suspense>
        </div>

        <div className="w-full md:w-1/2 p-8 lg:p-12 flex flex-col justify-between">
          <div>
            <h1
              className="text-4xl lg:text-5xl font-bold text-white mb-2"
              style={{ textShadow: `0 0 15px ${product.modelGlowColor}, 0 0 25px ${product.modelGlowColor}` }}
            >
              {product.name}
            </h1>
            <p className="text-2xl font-extrabold text-lime-400 mb-6">₹{product.price}</p>

            {/* === Action row === */}
            <div className="flex items-center gap-4 mb-8">
              {/* If not in cart -> Add to Cart; else -> quantity controls */}
              {!cartItem ? (
                <button
                  onClick={handleAddToCart}
                  className="px-6 py-3 rounded-lg font-bold bg-lime-400 hover:bg-lime-500 text-neutral-900 min-w-[150px] transition-all"
                >
                  Add to Cart
                </button>
              ) : (
                <div className="flex items-center gap-3 bg-neutral-800 rounded-lg p-2 border border-neutral-700">
                  <button
                    onClick={() => decrement(product.id)}
                    className="px-3 py-2 rounded-md bg-neutral-700 hover:bg-neutral-600 text-white"
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <span className="w-10 text-center font-bold text-white">
                    {cartItem.quantity}
                  </span>
                  <button
                    onClick={() => increment(product.id)}
                    className="px-3 py-2 rounded-md bg-neutral-700 hover:bg-neutral-600 text-white"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              )}

              {/* Buy Now -> ensure in cart, then navigate to /cart */}
              <button
                onClick={handleBuyNow}
                className="px-6 py-3 rounded-lg font-bold bg-neutral-700 text-white hover:bg-neutral-600 min-w-[150px] transition-colors"
              >
                Buy Now
              </button>
            </div>

            <h3 className="font-bold text-xl text-white mb-3">Description</h3>
            <p className="text-neutral-300 text-base mb-6">{product.description}</p>

            <div className="space-y-2 text-neutral-300 text-sm">
              <p><span className="font-semibold text-white">Type:</span> {product.type}</p>
              <p><span className="font-semibold text-white">Flavor:</span> {product.flavor}</p>
              <p><span className="font-semibold text-white">Pack Size:</span> {product.packSize}</p>
            </div>
          </div>

          <div className="mt-8">
            <AccordionItem title="Shipping" defaultOpen={true}>
              <p>🚚 Ships in 2-3 business days. Free shipping on orders over ₹500.</p>
            </AccordionItem>
            <AccordionItem title="Reviews">
              <p>No reviews yet. Be the first to share your thoughts!</p>
            </AccordionItem>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ProductsHome = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [filters, setFilters] = useState({ flavors: [], types: [], packSizes: [], price: null });
  const [paginationPage, setPaginationPage] = useState(1);

  useEffect(() => { products.forEach(p => useGLTF.preload(p.modelPath)); }, []);

  const handleFilterChange = useCallback((category, value) => {
    setFilters(prev => ({ ...prev, [category]: value }));
    setPaginationPage(1);
  }, []);

  const handleProductSelect = useCallback((product) => {
    navigate(`/products/${product.id}`);
  }, [navigate]);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const { flavors: selectedFlavors, types: selectedTypes, packSizes: selectedSizes, price } = filters;
      if (selectedFlavors.length > 0 && !selectedFlavors.includes(product.flavor)) return false;
      if (selectedTypes.length > 0 && !selectedTypes.includes(product.type)) return false;
      if (selectedSizes.length > 0 && !selectedSizes.includes(product.packSize)) return false;
      if (price) { if (product.price < price.min || product.price > price.max) return false; }
      return true;
    });
  }, [filters]);

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice((paginationPage - 1) * PRODUCTS_PER_PAGE, paginationPage * PRODUCTS_PER_PAGE);

  return (
    <main className="container mx-auto max-w-screen-2xl p-4 sm:p-8 pt-42">
      <div className="flex flex-col md:flex-row gap-8 lg:gap-12 mt-20">
        <Sidebar filters={filters} onFilterChange={handleFilterChange} />
        <div className="flex-1">
          <DiscountSection />
          <ProductsGrid
            products={paginatedProducts}
            currentPage={paginationPage}
            totalPages={totalPages}
            onPageChange={setPaginationPage}
            onProductSelect={handleProductSelect}
          />
        </div>
      </div>
    </main>
  );
};

export default function ProductsPage() {
  const params = useParams(); // if there is :id it will exist
  return (
    <div className="bg-neutral-950 text-neutral-200 min-h-screen font-sans">
      <Navbar />
      <AnimatePresence mode="wait">
        {params.id ? <ProductDetailPage key="detail" /> : <ProductsHome key="list" />}
      </AnimatePresence>
    </div>
  );
}
