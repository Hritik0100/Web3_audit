// components/IOSCursor.jsx
'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const IOSCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(true);
  const [isPointer, setIsPointer] = useState(false);
  const [isHoveringText, setIsHoveringText] = useState(false);
  const [lastTextEl, setLastTextEl] = useState(null);

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
      document.body.classList.add('ios-cursor-active');
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
      // Keep native cursor hidden to avoid flicker on re-enter
      document.body.classList.add('ios-cursor-active');
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      const isClickable = 
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.style.cursor === 'pointer';
      
      setIsPointer(isClickable);

      // Check if hovering over text elements
      const isTextElement = 
        target.tagName === 'P' ||
        target.tagName === 'H1' ||
        target.tagName === 'H2' ||
        target.tagName === 'H3' ||
        target.tagName === 'H4' ||
        target.tagName === 'H5' ||
        target.tagName === 'H6' ||
        target.tagName === 'SPAN' ||
        target.classList.contains('hover-text-effect');
      
      // Remove class from previous element
      if (lastTextEl && lastTextEl !== target) {
        lastTextEl.classList.remove('ios-text-hover');
      }

      if (isTextElement) {
        target.classList.add('ios-text-hover');
        setLastTextEl(target);
      } else if (lastTextEl) {
        lastTextEl.classList.remove('ios-text-hover');
        setLastTextEl(null);
      }

      setIsHoveringText(isTextElement);
    };

    const handleMouseOut = (e) => {
      const target = e.target;
      if (target && target.classList) {
        target.classList.remove('ios-text-hover');
      }
      setIsHoveringText(false);
    };

    // Activate hidden native cursor globally on mount
    document.body.classList.add('ios-cursor-active');
    window.addEventListener('mousemove', updateMousePosition);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut, true);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut, true);
      document.body.classList.remove('ios-cursor-active');
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Main Cursor Dot */}
          <motion.div
            className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference"
            animate={{
              x: mousePosition.x - 4,
              y: mousePosition.y - 4,
              scale: isPointer ? 0.5 : 1,
            }}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 28,
              mass: 0.5,
            }}
          />
          
          {/* Outer Ring */}
          <motion.div
            className="fixed top-0 left-0 w-8 h-8 border-2 border-white rounded-full pointer-events-none z-[9998] mix-blend-difference"
            animate={{
              x: mousePosition.x - 16,
              y: mousePosition.y - 16,
              scale: isPointer ? 1.8 : (isHoveringText ? 1.5 : 1),
              opacity: isPointer ? 0.7 : (isHoveringText ? 0.8 : 1),
            }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 25,
              mass: 0.8,
            }}
          />
          
          {/* Hover Effect Ring - Only shows on text */}
          <motion.div
            className="fixed top-0 left-0 w-12 h-12 border border-white/30 rounded-full pointer-events-none z-[9997] mix-blend-difference"
            animate={{
              x: mousePosition.x - 24,
              y: mousePosition.y - 24,
              scale: isHoveringText ? 1 : 0,
              opacity: isHoveringText ? 1 : 0,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20,
            }}
          />
        </>
      )}
    </AnimatePresence>
  );
};

export default IOSCursor;