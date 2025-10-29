import React, { useState, useEffect, useRef } from "react";
import { motion, useInView, animate, AnimatePresence } from "framer-motion";
import {
  Droplets,
  Zap,
  BrainCircuit,
  Calendar,
  ChevronsRight,
  ShoppingBag,
  Beaker,
  Map,
  Trophy,
  Gamepad2,
  Music,
  Milestone,
} from "lucide-react";
import Navbar from "../Components/Navbar"; // Adjust path if necessary

// ==================== Animated Counter Component ====================
const AnimatedStatCounter = ({ to, prefix = "", suffix = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, to, {
        duration: 2,
        ease: "easeOut",
        onUpdate(value) {
          setDisplayValue(Math.floor(value));
        },
      });
      return () => controls.stop();
    }
  }, [isInView, to]);

  return (
    <p
      ref={ref}
      className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-lime-400 to-green-500 mb-1"
    >
      {prefix}
      {displayValue}
      {suffix}
    </p>
  );
};

// ==================== Main About Page Component ====================
export default function About() {
  // State for the tabbed interfaces remains the same
  const [activeTabRedBull, setActiveTabRedBull] = useState("formula");
  const [activeTabMonster, setActiveTabMonster] = useState("formula");

  // Data objects remain the same
  const redBullData = {
    formula: {
      icon: <Beaker />,
      title: "The Formula Breakdown",
      content:
        "Red Bull's effectiveness comes from a core combination of high-quality ingredients designed for performance.",
      points: [
        { icon: <Zap />, text: "80mg of caffeine per 8.4 fl oz can." },
        { icon: <BrainCircuit />, text: "Taurine, an essential amino acid." },
        { icon: <Droplets />, text: "B-Group Vitamins for energy metabolism." },
        {
        icon: <Zap  />,
        text: "Also available in a Sugar-Free version using sucralose and acesulfame K — offering the same effect with zero sugar content.",
      },
      ],
    },
    history: {
      icon: <Calendar />,
      title: "The Origin Story",
      content:
        "In 1982, Dietrich Mateschitz discovered a Thai drink, Krating Daeng, and adapted it for the Western market. Red Bull GmbH was founded in 1987, creating an entirely new product category. The first Red Bull cans hit shelves in Austria in 1987, marking the birth of the global energy drink industry Within just a few years, Red Bull became a symbol of innovation, targeting students, athletes, and night-shift workers",
      points: [],
    },
    marketing: {
      icon: <Map />,
      title: "Marketing an Empire",
      content:
        "Red Bull's strategy is built on creating culture, not just ads. They host spectacular extreme sports events, own sports teams, and function as a media house, embodying their 'Gives You Wings' slogan. Created Red Bull Media House — a full-scale global content platform producing films, documentaries, music, and live events that amplify brand storytelling",  
      points: [],
    },
  };
  const monsterData = {
  formula: {
    icon: <Beaker />,
    title: 'The "Energy Blend"',
    content:
      "Monster's formula is more complex, featuring a proprietary 'Energy Blend' for a different kind of kick. It is designed for endurance and sustained alertness, making it popular among gamers, athletes, and night-shift workers.",
    points: [
      { icon: <Zap />, text: "160mg of caffeine per 16 fl oz can." },
      {
        icon: <BrainCircuit />,
        text: "Includes Taurine, Panax Ginseng, and L-Carnitine for focus and stamina.",
      },
      {
        icon: <ShoppingBag />,
        text: "A larger can size (16 fl oz) is standard, giving more volume than competitors.",
      },
      {
        icon: <Droplets />,
        text: "Contains B-Vitamins and sugars that help convert food into usable energy efficiently.",
      },
    ],
  },

  history: {
    icon: <Calendar />,
    title: "Brand History",
    content:
      "Launched by Hansen Natural in 2002, Monster Energy was designed to be a direct competitor to Red Bull, offering a larger can for a similar price and a more aggressive, edgy brand image. The brand quickly positioned itself as the drink for extreme sports enthusiasts and rebellious youth. Over the years, Monster expanded globally, gaining recognition in motorsports, action sports, and esports communities. Its bold marketing and distinctive can design helped create a strong, recognizable brand identity.",
    points: [
      {
        icon: <Map />,
        text: "Started with a focus on energy and endurance, targeting athletes and students.",
      },
      {
        icon: <Trophy />,
        text: "Global expansion helped it become one of the top-selling energy drinks worldwide.",
      },
      {
        icon: <Gamepad2 />,
        text: "Maintains a loyal fanbase through event sponsorships and edgy branding.",
      },
    ],
  },

  marketing: {
    icon: <Map />,
    title: "A Different Marketing Beast",
    content:
      "Monster embeds itself in existing subcultures, heavily sponsoring motorsports, action sports, esports athletes, and rock bands. Their approach is more grassroots and community-focused, often partnering directly with niche groups. By blending extreme sports with music and gaming, Monster cultivates authentic engagement. This strategy has helped the brand resonate deeply with fans who see it as part of their lifestyle, rather than just a beverage.",
    points: [
      {
        icon: <Zap />,
        text: "Sponsors high-profile athletes and extreme sports events to maintain credibility in the adrenaline space.",
      },
      {
        icon: <Music />,
        text: "Supports music festivals, rock bands, and local events to engage cultural communities.",
      },
      {
        icon: <Gamepad2 />,
        text: "Invests in esports and gaming events to connect with younger, digitally-savvy audiences.",
      },
    ],
  },
};

  const TabButton = ({ label, icon, isActive, onClick }) => (
    <button
      onClick={onClick}
      className={`flex-1 p-3 text-sm font-semibold rounded-lg transition-colors duration-300 flex items-center justify-center gap-2 ${
        isActive
          ? "bg-white/10 text-white"
          : "bg-transparent text-neutral-400 hover:bg-white/5"
      }`}
    >
      {" "}
      {icon} {label}{" "}
    </button>
  );

  const timelineEvents = [
    {
      year: 1987,
      brand: "Red Bull",
      event:
        "Red Bull officially launches in Austria, creating the modern energy drink market.",
    },
    {
      year: 2002,
      brand: "Monster",
      event:
        "Monster Energy is launched by Hansen Natural Corp, targeting the US market with a 16oz can.",
    },
    {
      year: 2004,
      brand: "Red Bull",
      event:
        "Red Bull enters Formula 1, purchasing the Jaguar Racing team to create Red Bull Racing.",
    },
    {
      year: 2009,
      brand: "Monster",
      event:
        "Monster becomes a title sponsor in AMA Supercross, solidifying its motorsports presence.",
    },
    {
      year: 2012,
      brand: "Red Bull",
      event:
        'The "Stratos" project sees Felix Baumgartner break the sound barrier during a freefall from the stratosphere.',
    },
    {
      year: 2015,
      brand: "Monster",
      event:
        "Coca-Cola acquires a 16.7% stake in Monster, greatly expanding its global distribution network.",
    },
  ];

  const culturalImpacts = [
    {
      icon: <Trophy />,
      title: "Extreme Sports",
      description:
        "They didn't just sponsor sports; they professionalized them, turning niche hobbies like snowboarding and FMX into global spectacles.",
    },
    {
      icon: <Gamepad2 />,
      title: "Gaming & Esports",
      description:
        "Early investors in esports, sponsoring top gamers like Ninja and major tournaments, making energy drinks synonymous with gaming culture.",
    },
    {
      icon: <Music />,
      title: "Music Scene",
      description:
        "From the Red Bull Music Academy to sponsoring countless festivals like Warped Tour, they connected with youth culture through music.",
    },
    {
      icon: <Milestone />,
      title: "Lifestyle Branding",
      description:
        "They pioneered the concept of selling a lifestyle, not just a product. Consumers buy into the high-energy, high-performance identity.",
    },
  ];

  const logos = [
    "/crouselLogo/1.jpg",
    "/crouselLogo/2.jpg",
    "/crouselLogo/3.jpg",
    "/crouselLogo/4.jpg",
    "/crouselLogo/5.jpg",
    "/crouselLogo/6.jpg",
    "/crouselLogo/7.jpg",
    "/crouselLogo/9.png",
    "/crouselLogo/monsLogo.png",
  ];

  const StatRow = ({ metric, rbValue, mValue, isAnimated = false }) => (
    <div className="flex justify-between items-center py-4 border-b border-neutral-800">
      <div className="w-2/5 text-center text-lg font-semibold">{rbValue}</div>
      <div className="w-1/5 text-center text-sm text-neutral-400 uppercase">
        {metric}
      </div>
      <div className="w-2/5 text-center text-lg font-semibold">{mValue}</div>
    </div>
  );

  return (
    <div className="bg-black text-neutral-200 min-h-screen font-sans overflow-x-hidden">
      <div className="absolute inset-0 z-0 opacity-40">
        <div className="absolute bottom-0 left-[-20%] right-[-20%] top-[20%] h-[1000px] w-[140%] rounded-full bg-gradient-radial from-lime-500/40 via-black to-black animate-pulse-slow"></div>
        <div className="absolute bottom-[-40%] left-[20%] right-[20%] h-[800px] w-[60%] rounded-full bg-gradient-radial from-cyan-500/30 via-black to-black animate-pulse-slow animation-delay-3000"></div>
      </div>

      <div className="relative z-10">
        <Navbar />
        <main className="container mx-auto max-w-6xl p-4 sm:p-8 pt-24 sm:pt-32">
          <motion.section
            className="text-center mb-20"
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
          >
            <motion.h1
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.8, ease: "easeOut" },
                },
              }}
              className="text-5xl md:text-8xl font-black text-white mb-4 tracking-tighter"
            >
              Titans of Energy
            </motion.h1>
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.8, ease: "easeOut" },
                },
              }}
              className="text-lg text-neutral-300 max-w-3xl mx-auto"
            >
              A deep dive into the brands that built an industry. Explore the
              history, science, and culture behind Red Bull and Monster.
            </motion.p>
          </motion.section>

          <motion.div
            className="space-y-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={{
              visible: { transition: { staggerChildren: 0.4 } },
            }}
          >
            {/* === Red Bull Section === */}
            <motion.div
              variants={{
                hidden: { opacity: 0, x: -50 },
                visible: {
                  opacity: 1,
                  x: 0,
                  transition: { duration: 0.8, ease: "easeOut" },
                },
              }}
              className="grid md:grid-cols-12 gap-8 items-stretch"
            >
              {/* Left Card */}
              <div className="md:col-span-5 flex flex-col justify-center items-center bg-neutral-900/50 border border-blue-500/40 rounded-2xl backdrop-blur-md p-8 shadow-[0_0_25px_rgba(59,130,246,0.3)] transition-all hover:shadow-[0_0_45px_rgba(59,130,246,0.6)]">
                <div className="relative">
                  <div className="absolute inset-0 blur-2xl bg-gradient-to-r from-red-500 via-blue-500 to-blue-400 opacity-30 rounded-2xl"></div>
                  <img
                    src="/abt1.jpg"
                    alt="Red Bull Logo"
                    className="relative w-56 h-auto rounded-xl object-contain drop-shadow-[0_0_20px_rgba(59,130,246,0.5)]"
                  />
                </div>
                <h2 className="text-4xl font-extrabold text-white text-center mt-6">
                  Gives You Wings
                </h2>
              </div>

              {/* Right Info */}
              {/* Right Info */}
              <div className="md:col-span-7 bg-neutral-900/60 border border-neutral-800 rounded-2xl p-6 pt-4 backdrop-blur-sm flex flex-col justify-start shadow-[0_0_30px_rgba(0,0,0,0.4)]">
                {/* Tabs */}
                <div className="flex bg-neutral-800/60 p-1 rounded-xl mb-6 sticky top-0 z-10 shadow-inner">
                  <TabButton
                    label="Formula"
                    icon={<Beaker size={16} />}
                    isActive={activeTabRedBull === "formula"}
                    onClick={() => setActiveTabRedBull("formula")}
                  />
                  <TabButton
                    label="History"
                    icon={<Calendar size={16} />}
                    isActive={activeTabRedBull === "history"}
                    onClick={() => setActiveTabRedBull("history")}
                  />
                  <TabButton
                    label="Marketing"
                    icon={<Map size={16} />}
                    isActive={activeTabRedBull === "marketing"}
                    onClick={() => setActiveTabRedBull("marketing")}
                  />
                </div>

                {/* Animated Tab Content */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTabRedBull}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="mt-1 space-y-4"
                  >
                    <h3 className="text-2xl font-semibold text-white mb-3 flex items-center gap-2 drop-shadow-[0_0_10px_rgba(255,255,255,0.15)]">
                      {redBullData[activeTabRedBull].icon}
                      {redBullData[activeTabRedBull].title}
                    </h3>

                    <p className="text-neutral-300 mb-4 leading-relaxed text-[15px]">
                      {redBullData[activeTabRedBull].content}
                    </p>

                    <div className="space-y-3">
                      {redBullData[activeTabRedBull].points.map(
                        (point, index) => (
                          <div
                            key={index}
                            className="flex items-start gap-3 text-neutral-200 hover:text-white transition-colors duration-200"
                          >
                            <div className="text-blue-400 drop-shadow-[0_0_8px_rgba(59,130,246,0.5)] mt-[3px]">
                              {point.icon}
                            </div>
                            <span className="leading-snug">
                              <span className="text-blue-400/90 font-medium">
                                {point.highlight}
                              </span>{" "}
                              {point.text}
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>

            {/* === Monster Section === */}
            <motion.div
              variants={{
                hidden: { opacity: 0, x: 50 },
                visible: {
                  opacity: 1,
                  x: 0,
                  transition: { duration: 0.8, ease: "easeOut" },
                },
              }}
              className="grid md:grid-cols-12 gap-8 items-stretch"
            >
             {/* Left Info */}
<div className="md:col-span-7 bg-neutral-900/50 border border-neutral-800 rounded-2xl p-6 pt-4 backdrop-blur-sm flex flex-col justify-start order-2 md:order-1">
  {/* Tabs */}
  <div className="flex bg-neutral-800/50 p-1 rounded-xl mb-4">
    <TabButton
      label="Formula"
      icon={<Beaker size={16} />}
      isActive={activeTabMonster === "formula"}
      onClick={() => setActiveTabMonster("formula")}
    />
    <TabButton
      label="History"
      icon={<Calendar size={16} />}
      isActive={activeTabMonster === "history"}
      onClick={() => setActiveTabMonster("history")}
    />
    <TabButton
      label="Marketing"
      icon={<Map size={16} />}
      isActive={activeTabMonster === "marketing"}
      onClick={() => setActiveTabMonster("marketing")}
    />
  </div>

  <AnimatePresence mode="wait">
    <motion.div
      key={activeTabMonster}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
    >
      <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
        {monsterData[activeTabMonster].icon}
        {monsterData[activeTabMonster].title}
      </h3>
      <p className="text-neutral-400 mb-4">
        {monsterData[activeTabMonster].content}
      </p>
      <div className="space-y-2">
        {monsterData[activeTabMonster].points.map((point, index) => (
          <div
            key={index}
            className="flex items-center gap-3 text-neutral-300"
          >
            <div className="text-lime-400">{point.icon}</div>
            <span>{point.text}</span>
          </div>
        ))}
      </div>
    </motion.div>
  </AnimatePresence>
</div>


              {/* Right Card */}
              <div className="md:col-span-5 flex flex-col justify-center items-center bg-neutral-900/50 border border-lime-500/40 rounded-2xl backdrop-blur-md p-8 shadow-[0_0_25px_rgba(132,204,22,0.3)] hover:shadow-[0_0_45px_rgba(132,204,22,0.6)] order-1 md:order-2 transition-all">
                <div className="relative">
                  <div className="absolute inset-0 blur-2xl bg-gradient-to-r from-lime-400 to-green-500 opacity-30 rounded-2xl"></div>
                  <img
                    src="/mabt1.jpg"
                    alt="Monster Logo"
                    className="relative w-56 h-auto rounded-xl object-contain drop-shadow-[0_0_20px_rgba(132,204,22,0.5)]"
                  />
                </div>
                <h2 className="text-4xl font-extrabold text-white text-center mt-6">
                  Unleash The Beast
                </h2>
              </div>
            </motion.div>
          </motion.div>
          
         {/* === NEW SECTION WITH IMAGE TAG === */}
<motion.section
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.3 }}
  transition={{ duration: 0.8, ease: "easeOut" }}
  className="py-20"
>
  {/* This div is now the container for the image and overlay */}
  <div
    className="relative min-h-[400px] md:min-h-[500px] rounded-3xl border border-neutral-800 overflow-hidden"
  >
    {/* The image is now a proper <img> tag with motion properties */}
    <motion.img
      src="/bg/monsterbanner.jpg"
      alt="Monster Energy banner with claw marks"
      className="absolute inset-0 w-full h-full object-cover"
      initial={{ scale: 1.1, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
    />
    
    {/* The overlay still sits on top of the image */}
    <div className="absolute inset-0 bg-black/50"></div>
  </div>
</motion.section> 

          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1 }}
            className="py-20"
          >
            <h2 className="text-center text-4xl md:text-5xl font-bold text-white mb-4">
              A Rivalry For The Ages
            </h2>
            <p className="text-center text-lg text-neutral-400 mb-12 max-w-2xl mx-auto">
              Follow the key moments that defined the battle for energy drink
              supremacy.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {timelineEvents.map((item, index) => {
                const brandClass =
                  item.brand === "Red Bull"
                    ? "border-t-blue-500 hover:shadow-blue-500/30"
                    : item.brand === "Monster"
                    ? "border-t-lime-500 hover:shadow-lime-500/30"
                    : "border-t-purple-500 hover:shadow-purple-500/30";

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`bg-neutral-900/50 border border-neutral-800 border-t-4 ${brandClass} rounded-xl p-6 flex flex-col h-full hover:bg-neutral-800/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg`}
                  >
                    <p className="text-3xl font-bold text-white mb-2">
                      {item.year}
                    </p>
                    <h3
                      className={`font-semibold text-lg mb-4 ${
                        item.brand === "Red Bull"
                          ? "text-blue-400"
                          : "text-lime-400"
                      }`}
                    >
                      {item.brand}
                    </h3>
                    <p className="text-neutral-400 text-sm flex-grow">
                      {item.event}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1 }}
            className="py-20"
          >
            <h2 className="text-center text-4xl md:text-5xl font-bold text-white mb-4">
              More Than a Drink
            </h2>
            <p className="text-center text-lg text-neutral-400 mb-12 max-w-2xl mx-auto">
              These brands didn't just sell beverages; they shaped entire
              cultures.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {culturalImpacts.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-neutral-900/50 border border-neutral-800 p-6 rounded-2xl text-center backdrop-blur-sm hover:-translate-y-2 hover:shadow-lg hover:shadow-lime-500/30 transition-all duration-300"
                >
                  <div className="inline-block p-4 bg-neutral-800 rounded-full mb-4 text-lime-400">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-neutral-400 text-sm">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          <section className="py-20">
            <h2 className="text-center text-4xl md:text-5xl font-bold text-white mb-12">
              Our Favorite Energy Drinks
            </h2>
            <div className="relative w-full overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
              <div className="flex w-max animate-marquee">
                {[...logos, ...logos].map((logo, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 w-64 mx-4 flex items-center justify-center"
                  >
                    <img
                      src={logo}
                      alt={`Energy Drink Logo ${index + 1}`}
                      className="max-h-24 object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* === UPDATED "VS" FACE-OFF SECTION === */}
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1 }}
            className="py-20"
          >
            <h2 className="text-center text-4xl md:text-5xl font-bold text-white mb-12">
              Head-to-Head: The Final Showdown
            </h2>

            <div className="max-w-4xl mx-auto bg-neutral-900/50 border border-neutral-800 rounded-2xl p-8 backdrop-blur-sm">
              {/* Titles */}
              <div className="flex justify-between items-end mb-2 relative">
                {/* Red Bull */}
                <div className="w-1/3 text-center">
                  <h3 className="text-3xl font-extrabold bg-gradient-to-r from-red-500 via-red-400 to-blue-500 bg-clip-text text-transparent">
                    Red Bull
                  </h3>
                </div>

                {/* VS */}
                <div className="absolute left-1/2 -translate-x-1/2 translate-y-4">
                  <span className="text-3xl font-black bg-gradient-to-r from-red-500 via-blue-500 to-green-500 bg-clip-text text-transparent">
                    VS
                  </span>
                </div>

                {/* Monster */}
                <div className="w-1/3 text-center">
                  <h3 className="text-3xl font-extrabold text-green-400">
                    Monster
                  </h3>
                </div>
              </div>

              {/* Stats */}
              <div className="flex flex-col gap-3 mt-4">
                <StatRow
                  metric="Founded"
                  rbValue={
                    <span className="bg-gradient-to-r from-red-500 via-red-400 to-blue-500 bg-clip-text text-transparent font-semibold">
                      <AnimatedStatCounter to={1987} />
                    </span>
                  }
                  mValue={
                    <span className="text-green-400 font-semibold">
                      <AnimatedStatCounter to={2002} />
                    </span>
                  }
                />
                <StatRow
                  metric="Std. Can Size"
                  rbValue={
                    <span className="bg-gradient-to-r from-red-500 via-red-400 to-blue-500 bg-clip-text text-transparent font-semibold">
                      8.4 fl oz
                    </span>
                  }
                  mValue={
                    <span className="text-green-400 font-semibold">
                      16 fl oz
                    </span>
                  }
                />
                <StatRow
                  metric="Caffeine / 16oz"
                  rbValue={
                    <span className="bg-gradient-to-r from-red-500 via-red-400 to-blue-500 bg-clip-text text-transparent font-semibold">
                      ~<AnimatedStatCounter to={151} />
                      mg
                    </span>
                  }
                  mValue={
                    <span className="text-green-400 font-semibold">
                      ~<AnimatedStatCounter to={160} />
                      mg
                    </span>
                  }
                />
                <StatRow
                  metric="Varieties"
                  rbValue={
                    <span className="bg-gradient-to-r from-red-500 via-red-400 to-blue-500 bg-clip-text text-transparent font-semibold">
                      ~<AnimatedStatCounter to={30} />+
                    </span>
                  }
                  mValue={
                    <span className="text-green-400 font-semibold">
                      ~<AnimatedStatCounter to={34} />+
                    </span>
                  }
                />
                <StatRow
                  metric="Slogan"
                  rbValue={
                    <span className="italic bg-gradient-to-r from-red-500 via-red-400 to-blue-500 bg-clip-text text-transparent">
                      "Gives You Wings"
                    </span>
                  }
                  mValue={
                    <span className="italic text-green-400">
                      "Unleash The Beast"
                    </span>
                  }
                />
              </div>
            </div>
          </motion.section>
        </main>
      </div>
    </div>
  );
}