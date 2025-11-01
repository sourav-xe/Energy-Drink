import React from "react";
import { motion } from "framer-motion";
import Navbar from "../Components/Navbar"; // Assuming you want the navbar here too
import {
  User,
  Mail,
  Phone,
  MessageSquare,
  Send,
  MapPin,
  Clock,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  ArrowUpRight,
  PenSquare,
} from "lucide-react"; // Importing icons for visual flair

// ==================== ANIMATION VARIANTS (Re-used/adapted from Home.jsx) ====================

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
    },
  },
};

const buttonVariants = {
  hover: {
    scale: 1.05,
    boxShadow: "0px 0px 12px rgba(0, 216, 255, 0.6)", // Matches existing glow
    transition: { duration: 0.3 },
  },
  tap: { scale: 0.95 },
};

// ==================== MAIN PAGE COMPONENT ====================

export default function Contact() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, you'd send this data to a backend or service like EmailJS
    alert("Message sent! (Simulated)");
    console.log("Form submitted!");
  };

  return (
    <motion.div
      className="bg-black text-white min-h-screen font-body"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Navbar />

      <section className="relative w-full py-16 md:py-24 px-6 md:px-12 lg:px-24 flex items-center justify-center">
        <div className="absolute inset-0 bg-black z-0"></div>{" "}
        {/* Ensures dark background */}
        <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Side: Contact Form */}
          <motion.div className="flex flex-col gap-8" variants={containerVariants}>
            <motion.h2
              className="text-5xl md:text-6xl font-extrabold font-display leading-tight"
              variants={itemVariants}
            >
              Join Us in Creating
              <br />
              <span className="text-[#00D8FF]">Something Great</span>
            </motion.h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div className="relative" variants={itemVariants}>
                  <User
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                    size={20}
                  />
                  <input
                    type="text"
                    placeholder="First Name*"
                    required
                    className="w-full pl-12 pr-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-[#00D8FF] focus:border-[#00D8FF] transition-all"
                  />
                </motion.div>
                <motion.div className="relative" variants={itemVariants}>
                  <User
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                    size={20}
                  />
                  <input
                    type="text"
                    placeholder="Last Name*"
                    required
                    className="w-full pl-12 pr-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-[#00D8FF] focus:border-[#00D8FF] transition-all"
                  />
                </motion.div>
              </div>

              {/* Email & Phone Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div className="relative" variants={itemVariants}>
                  <Mail
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                    size={20}
                  />
                  <input
                    type="email"
                    placeholder="Email*"
                    required
                    className="w-full pl-12 pr-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-[#00D8FF] focus:border-[#00D8FF] transition-all"
                  />
                </motion.div>
                <motion.div className="relative" variants={itemVariants}>
                  <Phone
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                    size={20}
                  />
                  <input
                    type="tel" // Use type="tel" for phone numbers
                    placeholder="Phone Number*"
                    required
                    className="w-full pl-12 pr-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-[#00D8FF] focus:border-[#00D8FF] transition-all"
                  />
                </motion.div>
              </div>

              {/* Subject Field */}
              <motion.div className="relative" variants={itemVariants}>
                <MessageSquare
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Subject*"
                  required
                  className="w-full pl-12 pr-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-[#00D8FF] focus:border-[#00D8FF] transition-all"
                />
              </motion.div>

              {/* Message Field */}
              <motion.div className="relative" variants={itemVariants}>
                <PenSquare
                  className="absolute left-4 top-4 text-gray-500" // Adjust icon position for textarea
                  size={20}
                />
                <textarea
                  placeholder="Message*"
                  required
                  rows={6}
                  className="w-full pl-12 pr-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-[#00D8FF] focus:border-[#00D8FF] transition-all resize-y"
                />
              </motion.div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                className="flex items-center gap-3 px-8 py-3 rounded-full font-bold text-lg bg-[#00D8FF] text-black hover:bg-[#00B0CC] transition-all duration-300 shadow-lg shadow-[#00D8FF]/30"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                Send Message <ArrowUpRight size={20} />
              </motion.button>
            </form>
          </motion.div>

          {/* Right Side: Contact Info */}
          <motion.div
            className="bg-[#6BFF00] text-black p-8 md:p-10 rounded-2xl flex flex-col justify-between relative overflow-hidden shadow-2xl shadow-[#6BFF00]/30"
            variants={itemVariants}
          >
            {/* Large arrow overlay (similar to your image) */}
            <div className="absolute top-[-40px] right-[-40px] w-40 h-40 rounded-full bg-black flex items-center justify-center opacity-90">
              <ArrowUpRight size={80} className="text-[#6BFF00]" strokeWidth={1} />
            </div>

            <div className="space-y-8">
              <h3 className="text-3xl font-bold font-display">Address</h3>
              <p className="text-xl">
                1 Monster Way Corona,
                <br />
                Corona, CA 92879
              </p>

              <div className="space-y-2">
                <h3 className="text-3xl font-bold font-display">Contact</h3>
                <p className="flex items-center gap-2 text-xl">
                  <Phone size={20} /> Phone : 1-866-322-4466
                </p>
                <p className="flex items-center gap-2 text-xl">
                  <Mail size={20} /> Email : example@email.com
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-3xl font-bold font-display">Open Time</h3>
                <p className="flex items-center gap-2 text-xl">
                  <Clock size={20} /> Mon - Fri: 8 AM - 5 PM PST
                </p>
              </div>
            </div>

            {/* Stay Connected / Social Icons */}
            <div className="mt-10 pt-8 border-t border-black/20">
              <h3 className="text-3xl font-bold font-display mb-4">
                Stay Connected
              </h3>
              <div className="flex space-x-4">
                <motion.a
                  href="#"
                  className="text-black hover:text-gray-800 transition-colors"
                  whileHover={{ scale: 1.2, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Facebook size={28} />
                </motion.a>
                <motion.a
                  href="#"
                  className="text-black hover:text-gray-800 transition-colors"
                  whileHover={{ scale: 1.2, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Twitter size={28} />
                </motion.a>
                <motion.a
                  href="#"
                  className="text-black hover:text-gray-800 transition-colors"
                  whileHover={{ scale: 1.2, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Instagram size={28} />
                </motion.a>
                <motion.a
                  href="#"
                  className="text-black hover:text-gray-800 transition-colors"
                  whileHover={{ scale: 1.2, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Youtube size={28} />
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}