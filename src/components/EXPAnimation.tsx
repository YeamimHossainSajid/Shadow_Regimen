import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface EXPAnimationProps {
  amount: number;
  x?: number;
  y?: number;
  onComplete?: () => void;
}

export const EXPAnimation = ({ amount, x = 0, y = 0, onComplete }: EXPAnimationProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onComplete?.();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: y, x: x, scale: 0.5 }}
          animate={{ opacity: 1, y: y - 100, x: x, scale: 1.2 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 2, ease: 'easeOut' }}
          style={{
            position: 'fixed',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
            zIndex: 10000,
          }}
        >
          <div style={{
            fontFamily: 'Orbitron, sans-serif',
            fontSize: '2rem',
            color: '#00ffff',
            textShadow: '0 0 20px #00ffff, 0 0 40px #00ffff',
            fontWeight: 'bold',
            whiteSpace: 'nowrap',
          }}>
            +{amount} EXP
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

interface FloatingEXPProps {
  amount: number;
  position: { x: number; y: number };
  onComplete?: () => void;
}

export const FloatingEXP = ({ amount, position, onComplete }: FloatingEXPProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onComplete?.();
    }, 1500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: position.y, x: position.x, scale: 0.8 }}
          animate={{ 
            opacity: [0, 1, 1, 0],
            y: position.y - 80,
            x: position.x,
            scale: [0.8, 1.2, 1.2, 0.8],
          }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          style={{
            position: 'fixed',
            pointerEvents: 'none',
            zIndex: 9999,
          }}
        >
          <div style={{
            fontFamily: 'Orbitron, sans-serif',
            fontSize: '1.5rem',
            color: '#00ffff',
            textShadow: '0 0 15px #00ffff, 0 0 30px #00ffff',
            fontWeight: 'bold',
            whiteSpace: 'nowrap',
          }}>
            +{amount} EXP
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

