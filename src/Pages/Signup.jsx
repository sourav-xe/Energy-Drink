import React from "react";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic form validation
    const form = e.target;
    const username = form.username.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value.trim();
    const confirmPassword = form["confirm-password"].value.trim();

    if (!username || !email || !password || !confirmPassword) {
      alert("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Redirect to home page
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[radial-gradient(ellipse_at_center,_#4b0000_0%,_#000000_70%)] text-white p-4">
      <div className="flex w-full max-w-5xl h-auto md:h-[600px] bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl shadow-lg overflow-hidden">
        
        {/* Left Side: Image Section */}
        <div className="hidden md:flex flex-1 items-center justify-center p-8">
          <img
            src="/can.png"
            alt="Energy Drink Can"
            className="max-h-[80%] object-contain rotate-[10deg] 
                       [filter:drop-shadow(0_0_15px_#00ff00)_drop-shadow(0_0_45px_#00ff00)]"
          />
        </div>

        {/* Right Side: Form Section */}
        <div className="flex-1 p-8 md:p-12 flex items-center justify-center">
          <form
            className="w-full max-w-sm p-8 border-2 border-[#6fff50] rounded-lg shadow-[0_0_20px_rgba(111,255,80,0.5)]"
            onSubmit={handleSubmit}
          >
            <h2 className="text-2xl font-bold text-center text-[#6fff50] mb-6 tracking-wider">
              CREATE ACCOUNT
            </h2>

            {/* Username Input */}
            <div className="mb-4">
              <label htmlFor="username" className="block text-xs text-gray-300 mb-1 tracking-wide">
                USERNAME
              </label>
              <input
                type="text"
                id="username"
                name="username"
                required
                className="w-full p-2 bg-gray-800/50 border border-gray-700 rounded text-white
                           focus:outline-none focus:border-[#6fff50] focus:ring-1 focus:ring-[#6fff50]"
              />
            </div>

            {/* Email Input */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-xs text-gray-300 mb-1 tracking-wide">
                EMAIL
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full p-2 bg-gray-800/50 border border-gray-700 rounded text-white
                           focus:outline-none focus:border-[#6fff50] focus:ring-1 focus:ring-[#6fff50]"
              />
            </div>

            {/* Password Input */}
            <div className="mb-4">
              <label htmlFor="password" className="block text-xs text-gray-300 mb-1 tracking-wide">
                PASSWORD
              </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                className="w-full p-2 bg-gray-800/50 border border-gray-700 rounded text-white
                           focus:outline-none focus:border-[#6fff50] focus:ring-1 focus:ring-[#6fff50]"
              />
            </div>

            {/* Confirm Password Input */}
            <div className="mb-6">
              <label htmlFor="confirm-password" className="block text-xs text-gray-300 mb-1 tracking-wide">
                CONFIRM PASSWORD
              </label>
              <input
                type="password"
                id="confirm-password"
                name="confirm-password"
                required
                className="w-full p-2 bg-gray-800/50 border border-gray-700 rounded text-white
                           focus:outline-none focus:border-[#6fff50] focus:ring-1 focus:ring-[#6fff50]"
              />
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center justify-between mb-6">
              <label htmlFor="remember" className="flex items-center text-sm text-gray-300 cursor-pointer">
                <input
                  type="checkbox"
                  id="remember"
                  className="mr-2 accent-[#6fff50]"
                />
                Remember me
              </label>
            </div>

            {/* Sign Up Button */}
            <button
              type="submit"
              className="w-full py-3 bg-[#6fff50] text-black font-bold uppercase tracking-wide rounded
                         shadow-[0_0_10px_rgba(111,255,80,0.5)] 
                         hover:bg-[#8cff7a] 
                         hover:shadow-[0_0_20px_rgba(111,255,80,0.8)]
                         transition-all duration-300"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
