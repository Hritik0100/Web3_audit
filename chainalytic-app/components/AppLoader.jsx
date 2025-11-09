'use client';
import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import sweepImage from './public/image/image.jpeg';

const AppLoader = () => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState('loading'); // 'loading' | 'sweep' | 'done'
  const intervalRef = useRef(null);

  useEffect(() => {
    // Smooth, slightly eased count up to 100
    const totalDurationMs = 1600;
    const stepMs = 16;
    const steps = Math.ceil(totalDurationMs / stepMs);
    let i = 0;

    intervalRef.current = setInterval(() => {
      i += 1;
      // easeOutCubic
      const t = Math.min(1, i / steps);
      const eased = 1 - Math.pow(1 - t, 3);
      const next = Math.min(100, Math.round(eased * 100));
      setProgress(next);
      if (next >= 100) {
        clearInterval(intervalRef.current);
        setTimeout(() => setPhase('sweep'), 200);
      }
    }, stepMs);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  if (phase === 'done') return null;

  return (
    <AnimatePresence>
      {/* Black cover that initially blocks the entire screen; slides away with centered logo */}
      <motion.div
        key="loader-panel"
        className="fixed inset-0 z-[100000] pointer-events-none flex items-center justify-center bg-black"
        initial={{ x: 0 }}
        animate={phase === 'sweep' ? { x: '100%' } : { x: 0 }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        onAnimationComplete={() => {
          if (phase === 'sweep') setPhase('done');
        }}
      >
        {(phase === 'loading' || phase === 'sweep') && (
          <img
            src={(sweepImage && sweepImage.src) ? sweepImage.src : sweepImage}
            alt="loader-logo"
            className="select-none"
            style={{
              width: 'clamp(80px, 18vw, 200px)',
              height: 'auto',
              objectFit: 'contain'
            }}
          />
        )}
      </motion.div>

      {/* (Logo is now inside the sliding panel so it remains during sweep) */}

      {/* Big percentage bottom-right while loading (on top of cover) */}
      {phase === 'loading' && (
        <motion.div
          key="loader-counter"
          className="fixed bottom-6 right-6 z-[100001] text-white select-none"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          style={{
            fontSize: 'clamp(24px, 5vw, 56px)',
            letterSpacing: '0.08em',
            fontWeight: 300
          }}
        >
          {progress}%
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AppLoader;


