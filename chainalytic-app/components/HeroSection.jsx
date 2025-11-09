'use client';
import Spline from '@splinetool/react-spline';
import { motion } from 'framer-motion';

const HeroSection = () => {
  const handleGetStarted = () => {
    window.open('http://localhost:3001/login', '_blank');
  };

  return (
    <section className="relative min-h-screen bg-black overflow-hidden">
      {/* Spline Background with responsive container */}
      <div className="absolute inset-0 w-full h-full">
        <Spline
          scene="https://prod.spline.design/dGLNfcXy9SdPfPnp/scene.splinecode"
          className="w-full h-full"
        />
      </div>

      {/* Overlay Content - Responsive positioning */}
      <div className="absolute inset-0 flex items-end justify-center pb-8 md:pb-12 lg:pb-20 px-4">
        <div className="text-center w-full max-w-md md:max-w-lg">
          {/* Get Started Button - Responsive sizing */}
          <motion.button
            onClick={handleGetStarted}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative w-full md:w-auto px-4 py-3 md:px-6 md:py-3 bg-black 
                     hover:bg-gray-900
                     text-white font-medium text-sm md:text-base tracking-wide
                     rounded-lg
                     transition-all duration-200 ease-out
                     border-2 border-white
                     hover:border-gray-300
                     focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              Get Started
              <svg 
                className="w-4 h-4 transition-transform group-hover:translate-x-1" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </motion.button>

          {/* Optional: Additional responsive text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-gray-300 mt-4 text-xs md:text-sm font-light"
          >
            Secure your smart contracts with AI-powered auditing
          </motion.p>
        </div>
      </div>

      {/* Mobile-specific adjustments */}
      <div className="md:hidden absolute bottom-4 left-4 right-4">
        {/* Safety spacer for mobile devices */}
      </div>
    </section>
  );
};

export default HeroSection;