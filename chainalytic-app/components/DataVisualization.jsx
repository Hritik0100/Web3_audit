// components/DataVisualization.jsx
'use client';
import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import ScrollVelocity from './scrolltexteffect/ScrollVelocity';

// Fixed particle positions to avoid hydration errors
const FIXED_PARTICLE_POSITIONS = [
  { left: 10, top: 20 },
  { left: 30, top: 60 },
  { left: 50, top: 10 },
  { left: 70, top: 80 },
  { left: 90, top: 40 },
  { left: 20, top: 90 },
  { left: 60, top: 30 },
  { left: 80, top: 70 },
  { left: 40, top: 50 },
  { left: 15, top: 75 }
];

const DataVisualization = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.3 });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <section className="min-h-screen py-20 px-4 bg-black relative overflow-hidden" ref={ref}>
      {/* Dark textured background */}
      <div className="absolute inset-0 z-0">
        {/* Dark grunge texture overlay */}
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gray-900 via-black to-black" />
        
        {/* Subtle grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:100px_100px]" />
        
        {/* Dark vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />
        
        {/* Floating rocks/particles */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-gray-800/20 rounded-full blur-2xl" />
        <div className="absolute bottom-40 left-40 w-40 h-40 bg-gray-700/15 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-1/3 w-24 h-24 bg-gray-600/10 rounded-full blur-xl" />
      </div>

      {/* Scrolling text background using ScrollVelocity */}
      {isClient && (
        <div className="absolute inset-0 z-0 flex flex-col justify-center opacity-30 pointer-events-none">
          <ScrollVelocity
            texts={['AI SMART CONTRACT AUDIT', 'SECURITY • VULNERABILITY • ANALYSIS', 'AUTOMATED CODE REVIEW']}
            velocity={100}
            className="text-4xl md:text-6xl font-light text-gray-300 tracking-wider mr-8"
            parallaxClassName="parallax py-4"
            scrollerClassName="scroller"
          />
        </div>
      )}

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
          >
            {/* Main Heading */}
            <motion.h1
              className="text-7xl md:text-8xl font-bold mb-8 leading-none tracking-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="text-gray-200">AI AUDIT</span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              className="text-2xl md:text-3xl text-gray-300 mb-12 font-light leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              smart contract security<br />
              powered by artificial intelligence
            </motion.p>

            {/* Description */}
            <motion.p
              className="text-gray-400 mb-12 text-lg leading-relaxed font-light max-w-md"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Advanced AI-driven analysis to detect vulnerabilities and ensure contract security.
            </motion.p>

            {/* CTA Button */}
            <motion.button
              className="group relative px-8 py-3 bg-transparent border border-gray-600 rounded-full font-light text-gray-300 text-sm tracking-wider hover:border-gray-400 transition-all duration-300 overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              whileHover={{ scale: 1.05 }}
            >
              <span className="relative z-10 flex items-center gap-2">
                AUDIT NOW
              </span>
              <div className="absolute inset-0 bg-gray-800/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.button>

            {/* Bottom tagline */}
            <motion.p
              className="text-gray-500 mt-12 text-sm font-light"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              Protecting decentralized ecosystems
            </motion.p>
          </motion.div>

          {/* Right Side - Central emblem */}
          <motion.div
            className="relative flex flex-col items-center justify-center"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {/* Top right text */}
            <motion.div
              className="absolute top-0 right-0 text-right"
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <p className="text-gray-400 text-lg md:text-xl font-light leading-tight">
                Advanced vulnerability<br />
                detection with<br />
                machine learning
              </p>
            </motion.div>

            {/* Central circular emblem */}
            <motion.div
              className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center my-16"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              {/* Outer ring with gradient accent */}
              <div className="absolute inset-0 rounded-full border-2 border-gray-700/50">
                <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-br from-cyan-500/30 to-purple-500/30 blur-xl rounded-full" />
              </div>
              
              {/* Horizontal lines through center */}
              <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 flex items-center justify-center">
                <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-gray-600 to-transparent" />
                <div className="absolute w-1/3 h-[1px] bg-gradient-to-r from-cyan-500/50 via-blue-500/50 to-purple-500/50" />
              </div>

              {/* Center AI/Neural Network icon */}
              <div className="relative z-10 w-24 h-24 flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="w-full h-full text-gray-400">
                  {/* Neural network nodes */}
                  <circle cx="30" cy="30" r="4" fill="currentColor" className="opacity-80" />
                  <circle cx="70" cy="30" r="4" fill="currentColor" className="opacity-80" />
                  <circle cx="50" cy="50" r="6" fill="currentColor" className="opacity-90" />
                  <circle cx="30" cy="70" r="4" fill="currentColor" className="opacity-80" />
                  <circle cx="70" cy="70" r="4" fill="currentColor" className="opacity-80" />
                  
                  {/* Neural connections */}
                  <path d="M30 30 L50 50 L70 30" stroke="currentColor" strokeWidth="1" fill="none" className="opacity-50" />
                  <path d="M30 70 L50 50 L70 70" stroke="currentColor" strokeWidth="1" fill="none" className="opacity-50" />
                  <path d="M30 30 L50 50 L30 70" stroke="currentColor" strokeWidth="1" fill="none" className="opacity-50" />
                  <path d="M70 30 L50 50 L70 70" stroke="currentColor" strokeWidth="1" fill="none" className="opacity-50" />
                </svg>
              </div>

              {/* Animated pulse effect */}
              <motion.div
                className="absolute inset-0 rounded-full border border-cyan-500/30"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>

            {/* Bottom left text */}
            <motion.div
              className="absolute bottom-0 left-0"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              <p className="text-gray-400 text-base md:text-lg font-light leading-tight">
                Comprehensive<br />
                smart contract<br />
                security analysis<br />
                and reporting
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Feature cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-32"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {[
            {
              title: 'AI-Powered Analysis',
              description: 'Machine learning algorithms detecting complex vulnerabilities',
            },
            {
              title: 'Real-time Scanning',
              description: 'Continuous monitoring and instant security alerts',
            },
            {
              title: 'Comprehensive Reports',
              description: 'Detailed vulnerability assessment and remediation guidance',
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="group relative bg-transparent border border-gray-800/50 rounded-none p-8 hover:border-gray-600/50 transition-all duration-500"
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 1 + index * 0.2 }}
            >
              <h4 className="text-xl font-light text-gray-300 mb-3">
                {feature.title}
              </h4>
              <p className="text-gray-500 font-light text-sm leading-relaxed">
                {feature.description}
              </p>
              
              <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-gradient-to-r from-cyan-500/50 to-purple-500/50 group-hover:w-full transition-all duration-500" />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Subtle floating particles - Fixed positions to avoid hydration */}
      <div className="absolute inset-0 pointer-events-none">
        {FIXED_PARTICLE_POSITIONS.map((position, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gray-600/20 rounded-full"
            style={{
              left: `${position.left}%`,
              top: `${position.top}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0, 0.3, 0],
            }}
            transition={{
              duration: 4 + i * 0.3,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default DataVisualization;