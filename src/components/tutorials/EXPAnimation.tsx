import { motion } from 'framer-motion';

interface EXPAnimationProps {
  amount: number;
  x: number;
  y: number;
  onComplete: () => void;
}

export const EXPAnimation = ({ amount, x, y, onComplete }: EXPAnimationProps) => {
  return (
    <motion.div
      style={{
        position: 'fixed',
        left: x,
        top: y,
        zIndex: 10000,
        pointerEvents: 'none',
      }}
      initial={{ opacity: 1, y: 0, scale: 1 }}
      animate={{ 
        opacity: 0, 
        y: -100, 
        scale: 1.5,
      }}
      transition={{ 
        duration: 1.5,
        ease: 'easeOut',
      }}
      onAnimationComplete={onComplete}
    >
      <div style={{
        fontFamily: 'Orbitron, sans-serif',
        fontSize: '1.5rem',
        color: '#00ffff',
        textShadow: '0 0 10px #00ffff, 0 0 20px #00ffff',
        fontWeight: 'bold',
      }}>
        +{amount} EXP
      </div>
    </motion.div>
  );
};

