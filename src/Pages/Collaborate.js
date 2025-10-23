import React from "react";
import LiquidEther from "../Components/LiquidEther";
import Navbar from "../Components/Navbar";
import StarBorder from "../Components/StarBorder";
import InfiniteMenu from "../Components/InfiniteMenu";
import FlyingPosters from "../Components/FlyingPosters";
// import ScrollStack, { ScrollStackItem } from "../Components/ScrollStack"; // optional

const items = [
  {
    image: "/collabs/f11.gif",
    link: "https://www.monsterenergy.com/",
    title: "Monster Energy Team",
    description:
      "High-energy crew known for their bold stunts and motorsport dominance.",
  },
  {
    image: "/collabs/image.png",
    link: "https://www.redbull.com/",
    title: "Esports",
    description: "Driven into Esports by MonsterEnergy Drink",
  },
  {
    image: "/collabs/mons12.jpg",
    link: "https://www.monsterenergy.com/",
    title: "Athletes",
    description: "Athletes redefining action sports across the globe.",
  },
  {
    image: "/collabs/monsst1.webp",
    link: "https://www.redbull.com/int-en/projects",
    title: "Labubu",
    description:
      "Creative collaborations pushing boundaries in sports, music, and culture.",
  },
  {
    image: "/collabs/ninja1.jpg",
    link: "https://www.twitch.tv/ninja",
    title: "Ninja",
    description:
      "Ninja world-renowned gamer and streamer representing Red Bull.",
  },
];

const FlyingItems = [
  "/posterCollabs/apexMonster.jpg",
  "/posterCollabs/codmonster.png",
  "/posterCollabs/monstereall.jpeg",
  "/posterCollabs/redbullcolla.jpg",
  "/posterCollabs/redbullcollab.jpg",
  "/posterCollabs/redbullcollabs.avif",
];

const Collaborate = () => {
  return (
    <div className="bg-black text-white min-h-screen overflow-x-hidden">
      {/* ===================== HERO SECTION ===================== */}
      <section className="relative w-full h-[600px] overflow-hidden">
        <Navbar />

        {/* Liquid Background */}
        <div className="absolute inset-0 z-0">
          <LiquidEther
            colors={["#5227FF", "#FF9FFC", "#B19EEF"]}
            mouseForce={20}
            cursorSize={100}
            isViscous={false}
            viscous={30}
            iterationsViscous={32}
            iterationsPoisson={32}
            resolution={0.5}
            isBounce={false}
            autoDemo={true}
            autoSpeed={0.5}
            autoIntensity={2.2}
            takeoverDuration={0.25}
            autoResumeDelay={3000}
            autoRampDuration={0.6}
          />
        </div>

        {/* Text Overlay */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-4 pointer-events-none">
          <h1
            className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-4"
            style={{ textShadow: "0 0 20px rgba(0,0,0,0.5)" }}
          >
            POWER IN COLLABORATIONS
          </h1>

          <p
            className="text-gray-200 text-lg md:text-xl font-light mb-8 leading-relaxed max-w-[60%] min-w-[340px]"
            style={{ textShadow: "0 0 10px rgba(0,0,0,0.5)" }}
          >
            Explore the universe of our powerhouse partnerships — from
            adrenaline-fueled events with Red Bull to exclusive gear with
            Monster.
          </p>

          <StarBorder as="button" className="custom-class" color="cyan" speed="1s">
            Explore More
          </StarBorder>
        </div>
      </section>

      {/* ===================== INFINITE MENU SECTION ===================== */}
      <section className="relative h-[600px] overflow-hidden">
        <InfiniteMenu items={items} />
      </section>

     {/* ===================== FLYING POSTERS SECTION ===================== */}
<section className="relative h-[1700px] overflow-hidden">
  

  {/* Posters below — still visible */}
  <div className="absolute inset-0 z-0">
    <FlyingPosters
      items={FlyingItems}
      imageProps={{ loading: "lazy", decoding: "async" }}
    />
  </div>
</section>

    </div>
  );
};

export default Collaborate;
