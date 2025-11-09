// components/SolutionsSection.jsx
'use client';
import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import TextType from './TextType';

const SolutionsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.3 });
  const [hoveredCard, setHoveredCard] = useState(null);

  const solutions = [
    {
      title: 'AI VULNERABILITY SCANNING',
      description: 'Advanced machine learning algorithms detecting complex smart contract vulnerabilities in real-time.',
    },
    {
      title: 'AUTOMATED CODE REVIEW', 
      description: 'AI-powered static and dynamic analysis for comprehensive smart contract security assessment.',
    },
    {
      title: 'SECURITY SCORING',
      description: 'Comprehensive risk assessment and security scoring for smart contracts and DeFi protocols.',
    }
  ];

  return (
    <section className="min-h-screen py-20 px-4 bg-black relative overflow-hidden" ref={ref}>
      {/* Background similar to DataVisualization */}
      <div className="absolute inset-0 z-0">
        {/* Dark grunge texture overlay */}
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gray-900 via-black to-black" />
        
        {/* Subtle grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:100px_100px]" />
        
        {/* Dark vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />
        
        {/* Floating elements */}
        <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-gray-800/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/3 w-64 h-64 bg-gray-700/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header Section with TextType Animation */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          {/* Main Heading with TextType Animation */}
          <div className="mb-8">
            <TextType
              as="h1"
              text={["AI SMART CONTRACT", "AUTOMATED AUDIT", "SECURITY SCANNING", "VULNERABILITY DETECTION"]}
              typingSpeed={100}
              deletingSpeed={80}
              pauseDuration={1500}
              loop={true}
              className="text-7xl md:text-8xl font-black leading-none tracking-tight text-gray-200"
              showCursor={true}
              cursorCharacter="▊"
              cursorClassName="text-cyan-400 ml-2"
              startOnVisible={true}
            />
          </div>

          {/* Subheading with TextType Animation */}
          <div className="h-20 md:h-24 mb-12">
            <TextType
              as="p"
              text={[
                "ai-powered security\nfor smart contracts",
                "automated vulnerability\ndetection systems", 
                "machine learning\nsecurity analysis",
                "real-time threat\ndetection platforms"
              ]}
              typingSpeed={60}
              deletingSpeed={40}
              pauseDuration={2000}
              loop={true}
              className="text-2xl md:text-3xl text-gray-300 font-light leading-relaxed"
              showCursor={true}
              cursorCharacter="▊"
              cursorClassName="text-cyan-400 ml-1"
              startOnVisible={true}
              initialDelay={500}
            />
          </div>

          <motion.p
            className="text-gray-400 mb-12 text-lg leading-relaxed font-light max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Advanced AI-driven smart contract auditing platform that detects vulnerabilities, 
            optimizes code, and ensures maximum security for your blockchain projects.
          </motion.p>
        </motion.div>

        {/* Feature cards - Simple like DataVisualization */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-32"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {solutions.map((solution, index) => (
            <motion.div
              key={index}
              className="group relative bg-transparent border border-gray-800/50 rounded-none p-8 hover:border-gray-600/50 transition-all duration-500"
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 1 + index * 0.2 }}
            >
              <h4 className="text-xl font-light text-gray-300 mb-3">
                {solution.title}
              </h4>
              <p className="text-gray-500 font-light text-sm leading-relaxed">
                {solution.description}
              </p>
              
              <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-gradient-to-r from-cyan-500/50 to-purple-500/50 group-hover:w-full transition-all duration-500" />
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <div className="bg-transparent border border-gray-800/50 rounded-none p-12 max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold mb-6 text-gray-200">
              Ready to Secure Your Smart Contracts?
            </h3>
            <p className="text-gray-400 mb-8 text-lg font-light">
              Join leading DeFi protocols and blockchain projects using our AI-powered security platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                className="px-8 py-4 bg-transparent border border-gray-600 rounded-lg font-light text-gray-300 text-sm tracking-wider hover:border-gray-400 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="flex items-center gap-2">
                  START FREE AUDIT
                </span>
              </motion.button>
              <motion.button
                className="px-8 py-4 bg-white/5 backdrop-blur-md border border-white/20 rounded-lg font-light text-white text-sm tracking-wider hover:border-white/40 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="flex items-center gap-2">
                  VIEW API DOCS
                </span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gray-600/20 rounded-full"
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [0, -15, 0],
              opacity: [0, 0.3, 0],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.7,
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default SolutionsSection;