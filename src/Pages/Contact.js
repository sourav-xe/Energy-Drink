import React, { useEffect } from 'react';
import Navbar from '../Components/Navbar';

// This component injects the keyframe animations into the document's head.
// This is a clean way to handle CSS animations within a React component.
const StyleInjector = () => {
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes float {
        0% {
          transform: translateZ(0) translateY(0);
        }
        50% {
          transform: translateZ(-20px) translateY(-10px);
        }
        100% {
          transform: translateZ(0) translateY(0);
        }
      }
      
      @keyframes glow {
        0% {
          text-shadow: 0 0 5px #00aaff, 0 0 10px #00aaff, 0 0 20px #00aaff, 0 0 40px #0055ff, 0 0 80px #0055ff;
        }
        50% {
          text-shadow: 0 0 10px #00aaff, 0 0 20px #00aaff, 0 0 40px #00aaff, 0 0 80px #0055ff, 0 0 120px #0055ff;
        }
        100% {
          text-shadow: 0 0 5px #00aaff, 0 0 10px #00aaff, 0 0 20px #00aaff, 0 0 40px #0055ff, 0 0 80px #0055ff;
        }
      }
    `;
    document.head.appendChild(style);
    
    // Cleanup function to remove the style when the component unmounts
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return null; // This component doesn't render anything itself
};


const Contact = () => {
  // --- STYLES ---
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100%',
    backgroundColor: '#0d0d0d', // A deep, dark background
    color: '#e0e0e0',
    fontFamily: "'Orbitron', sans-serif", // Futuristic font
    overflow: 'hidden',
    perspective: '800px', // Creates the 3D space
  };

  const contentWrapperStyle = {
    textAlign: 'center',
    transformStyle: 'preserve-3d', // Enables 3D transformations for children
    animation: 'float 6s ease-in-out infinite', // Apply the floating animation
  };

  const titleStyle = {
    fontSize: 'clamp(2.5rem, 10vw, 6rem)', // Responsive font size
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: '0.5rem',
    color: '#ffffff',
    animation: 'glow 2.5s ease-in-out infinite', // Apply the glowing animation
    transform: 'translateZ(20px)', // Pushes the text forward in 3D space
  };

  const subtitleStyle = {
    fontSize: 'clamp(1rem, 4vw, 1.5rem)',
    marginTop: '1rem',
    letterSpacing: '0.1rem',
    color: '#a0a0a0',
    transform: 'translateZ(10px)', // Slightly less forward than the title
  };

  return (
    <>
    <Navbar/>
      <StyleInjector />
      <div style={containerStyle}>
        <div style={contentWrapperStyle}>
          <h1 style={titleStyle}>
            Coming Soon
          </h1>
          <p style={subtitleStyle}>
            Our new page is under construction. Stay tuned for something amazing!
          </p>
        </div>
      </div>
    </>
  );
};

export default Contact;