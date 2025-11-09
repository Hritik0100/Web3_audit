// components/TrustedBy.jsx
'use client';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import CountUp from './CountUp';

const TrustedBy = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const partners = [
    { name: 'Ethereum Foundation', industry: 'Blockchain' },
    { name: 'Polygon Labs', industry: 'Layer 2' },
    { name: 'Chainlink', industry: 'Oracle' },
    { name: 'Uniswap Labs', industry: 'DeFi' },
    { name: 'Aave Companies', industry: 'Lending' },
    { name: 'OpenZeppelin', industry: 'Security' },
    { name: 'ConsenSys', industry: 'Development' },
    { name: 'Arbitrum Foundation', industry: 'Layer 2' },
  ];

  const testimonials = [
    {
      quote: "The AI-powered vulnerability detection has helped us identify critical security flaws that traditional tools missed.",
      author: "Alex Thompson",
      role: "Security Lead",
      company: "Uniswap Labs"
    },
    {
      quote: "Automated smart contract auditing reduced our security review time by 70% while improving accuracy.",
      author: "Maria Rodriguez",
      role: "CTO",
      company: "Aave Companies"
    },
    {
      quote: "The real-time monitoring system detected a potential exploit before it could impact our users.",
      author: "David Kim",
      role: "Head of Security",
      company: "Polygon Labs"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="min-h-screen py-20 px-4 bg-black relative overflow-hidden"
      style={{
        backgroundImage: "url('/images/logo.jpeg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Dark textured background - reduced opacity so background image is visible */}
      <div className="absolute inset-0 z-0">
        {/* Dark grunge texture overlay */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gray-900 via-black to-black" />
        
        {/* Subtle grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:100px_100px]" />
        
        {/* Dark vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)]" />
        
        {/* Floating elements */}
        <div className="absolute top-20 left-20 w-48 h-48 bg-gray-800/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-gray-700/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h1
            className="text-7xl md:text-8xl font-black mb-8 leading-none tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <span className="text-gray-200">TRUSTED</span>
          </motion.h1>

          <motion.p
            className="text-2xl md:text-3xl text-gray-300 mb-12 font-light leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            by leading blockchain<br />
            projects and protocols
          </motion.p>

          <motion.p
            className="text-gray-400 mb-12 text-lg leading-relaxed font-light max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
          >
            Join top DeFi protocols and blockchain projects worldwide that rely on our AI-powered 
            smart contract auditing and security solutions.
          </motion.p>
        </motion.div>

        {/* Stats Row with CountUp Animation */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          {[
            { value: 10000, label: 'Contracts Audited', suffix: '+' },
            { value: 500, label: 'Projects Secured', suffix: '+' },
            { value: 99.8, label: 'Accuracy Rate', suffix: '%' },
            { value: 24, label: 'Support', suffix: '/7' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-3xl md:text-4xl font-bold text-gray-200 mb-2">
                <CountUp
                  from={0}
                  to={stat.value}
                  duration={2.5}
                  delay={0.5 + index * 0.2}
                  separator=","
                  className="count-up-text"
                />
                {stat.suffix}
              </div>
              <div className="text-gray-500 text-sm font-light">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Partners Grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          {partners.map((partner, index) => (
            <motion.div
              key={partner.name}
              className="group relative bg-transparent border border-gray-800/50 rounded-none p-6 hover:border-gray-600/50 transition-all duration-500 cursor-pointer"
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-center">
                <h4 className="text-lg font-light text-gray-300 mb-2 group-hover:text-white transition-colors duration-300">
                  {partner.name}
                </h4>
                <div className="text-gray-500 text-xs font-light">
                  {partner.industry}
                </div>
              </div>
              
              {/* Hover line */}
              <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-gradient-to-r from-cyan-500/50 to-purple-500/50 group-hover:w-full transition-all duration-500" />
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonials */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          viewport={{ once: true }}
        >
          <div className="bg-transparent border border-gray-800/50 rounded-none p-8 md:p-12 max-w-4xl mx-auto">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <blockquote className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed font-light">
                "{testimonials[currentIndex].quote}"
              </blockquote>
              
              <div className="flex flex-col items-center">
                <div className="text-white font-light mb-1">{testimonials[currentIndex].author}</div>
                <div className="text-gray-500 text-sm font-light mb-1">{testimonials[currentIndex].role}</div>
                <div className="text-cyan-400 text-sm font-light">{testimonials[currentIndex].company}</div>
              </div>
            </motion.div>

            {/* Testimonial Navigation */}
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-gray-400 scale-125'
                      : 'bg-gray-700 hover:bg-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Bottom Trust Badge */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-4 text-gray-500 text-sm font-light">
            <div className="w-16 h-[1px] bg-gray-700"></div>
            ENTERPRISE GRADE SECURITY
            <div className="w-16 h-[1px] bg-gray-700"></div>
          </div>
        </motion.div>
      </div>

      {/* Floating particles - Same as other sections */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gray-600/20 rounded-full"
            style={{
              left: `${15 + i * 15}%`,
              top: `${30 + (i % 2) * 40}%`,
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

export default TrustedBy;