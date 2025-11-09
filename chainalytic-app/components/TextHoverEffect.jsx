// components/TextHoverEffect.jsx
'use client';
import { motion } from 'framer-motion';

const TextHoverEffect = ({ 
  children, 
  className = '', 
  hoverColor = 'text-gray-300',
  defaultColor = 'text-gray-400'
}) => {
  return (
    <motion.span
      className={`hover-text-effect ${defaultColor} hover:${hoverColor} transition-colors duration-300 cursor-none ${className}`}
      whileHover={{ 
        color: hoverColor.replace('hover:', ''),
        transition: { duration: 0.2 }
      }}
    >
      {children}
    </motion.span>
  );
};

export default TextHoverEffect;