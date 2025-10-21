import React from "react";
import LiquidEther from "../Components/LiquidEther";
import Navbar from "../Components/Navbar";
 import StarBorder from '../Components/StarBorder'
       import InfiniteMenu from '../Components/InfiniteMenu'

const items = [
  {
    image: 'https://picsum.photos/300/300?',
    link: 'https://google.com/',
    title: 'Item 1',
    description: 'This is pretty cool, right?'
  },
  {
    image: 'https://picsum.photos/400/400?',
    link: 'https://google.com/',
    title: 'Item 2',
    description: 'This is pretty cool, right?'
  },
  {
    image: 'https://picsum.photos/500/500?',
    link: 'https://google.com/',
    title: 'Item 3',
    description: 'This is pretty cool, right?'
  },
  {
    image: 'https://picsum.photos/600/600?',
    link: 'https://google.com/',
    title: 'Item 4',
    description: 'This is pretty cool, right?'
  }
];

const Collaborate = () => {
  const scrollToContent = () => {
    const section = document.getElementById("collab-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="bg-black text-white min-h-screen">
      {/* --- Hero Section with Liquid Effect --- */}
      <div style={{ width: "100%", height: 600, position: "relative" }}>
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

        {/* Overlay Text + Button */}
       <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-4 pointer-events-none">
  <h1
    className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-4"
    style={{ textShadow: "0 0 20px rgba(0,0,0,0.5)" }}
  >
    POWER IN Collaborations
  </h1>

  <p
    className="text-gray-200 text-lg md:text-xl font-light mb-8 leading-relaxed"
    style={{
      textShadow: "0 0 10px rgba(0,0,0,0.5)",
      maxWidth: "60%", // shrink width a bit
      minWidth: "340px", // don’t collapse too much
    }}
  >
    Explore the universe of our powerhouse partnerships from adrenaline-fueled
    events with Red Bull<br />
    to exclusive gear with Monster this is where energy meets innovation.
  </p>





 <StarBorder
  as="button"
  className="custom-class"
  color="cyan"
  speed="1s"
>
Explore More
</StarBorder>


         
        </div>
      </div>

      {/* --- Next Section --- */}


<div style={{ height: '600px', position: 'relative' }}>
  <InfiniteMenu items={items}/>
</div>
    </div>
  );
};

export default Collaborate;
