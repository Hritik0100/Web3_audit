// components/Footer.jsx
'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';

const Footer = () => {
  const [email, setEmail] = useState('');

  const footerLinks = {
    solutions: [
      { name: 'AI Vulnerability Scanning', href: '#' },
      { name: 'Automated Code Review', href: '#' },
      { name: 'Security Scoring', href: '#' },
      { name: 'Real-time Monitoring', href: '#' },
    ],
    company: [
      { name: 'About', href: '#' },
      { name: 'Careers', href: '#' },
      { name: 'Partners', href: '#' },
      { name: 'Contact', href: '#' },
    ],
    resources: [
      { name: 'Documentation', href: '#' },
      { name: 'API Reference', href: '#' },
      { name: 'Case Studies', href: '#' },
      { name: 'Webinars', href: '#' },
    ],
    legal: [
      { name: 'Privacy', href: '#' },
      { name: 'Terms', href: '#' },
      { name: 'Security', href: '#' },
      { name: 'Compliance', href: '#' },
    ],
  };

  return (
    <footer className="relative bg-black border-t border-gray-800/50 overflow-hidden">
      {/* Dark textured background - Same as other sections */}
      <div className="absolute inset-0 z-0">
        {/* Dark grunge texture overlay */}
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gray-900 via-black to-black" />
        
        {/* Subtle grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:100px_100px]" />
        
        {/* Dark vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />
        
        {/* Floating elements */}
        <div className="absolute bottom-20 left-10 w-32 h-32 bg-gray-800/10 rounded-full blur-3xl" />
        <div className="absolute top-10 right-20 w-40 h-40 bg-gray-700/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-20">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-gray-200 mb-6">AI AUDIT</h3>
              <p className="text-gray-400 leading-relaxed mb-8 text-sm font-light max-w-md">
                Advanced AI-powered smart contract auditing platform securing the future of decentralized applications and blockchain protocols.
              </p>

              {/* Newsletter */}
              <div className="mb-8">
                <form className="flex flex-col sm:flex-row gap-3 max-w-md">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email for security updates"
                    className="flex-1 px-4 py-3 bg-transparent border border-gray-700 rounded-lg text-white placeholder-gray-500 text-sm focus:outline-none focus:border-gray-500 transition-all duration-300 font-light"
                  />
                  <motion.button
                    type="submit"
                    className="px-6 py-3 bg-transparent border border-gray-600 rounded-lg font-light text-gray-300 text-sm tracking-wider hover:border-gray-400 transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    SUBSCRIBE
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([category, links], categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="text-sm font-light mb-6 text-gray-400 uppercase tracking-wider">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link, linkIndex) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: (categoryIndex * 0.1) + (linkIndex * 0.05) }}
                    viewport={{ once: true }}
                  >
                    <a
                      href={link.href}
                      className="text-gray-500 hover:text-gray-300 transition-colors duration-300 text-sm font-light hover:translate-x-1 transform inline-block"
                    >
                      {link.name}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom Section */}
        <motion.div
          className="border-t border-gray-800/50 pt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            {/* Copyright */}
            <div className="text-gray-500 text-sm font-light">
              © 2024 AI Audit. All rights reserved.
            </div>

            {/* Additional Info */}
            <div className="flex items-center gap-6 text-gray-500 text-sm font-light">
              <span>Built for smart contract security</span>
              <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
              <span>v2.1.0</span>
            </div>

            {/* Simple Social Links */}
            <div className="flex items-center gap-4">
              {['Twitter', 'LinkedIn', 'GitHub'].map((social, index) => (
                <motion.a
                  key={social}
                  href="#"
                  className="text-gray-500 hover:text-gray-300 transition-colors duration-300 text-sm font-light"
                  whileHover={{ y: -1 }}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  {social}
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Floating particles - Same as other sections */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gray-600/20 rounded-full"
            style={{
              left: `${20 + i * 20}%`,
              top: `${40 + (i % 2) * 30}%`,
            }}
            animate={{
              y: [0, -10, 0],
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
    </footer>
  );
};

export default Footer;