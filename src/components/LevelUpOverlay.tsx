import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface LevelUpOverlayProps {
  newLevel: number;
  onClose: () => void;
}

export const LevelUpOverlay = ({ newLevel, onClose }: LevelUpOverlayProps) => {
  const [showParticles, setShowParticles] = useState(true);

  useEffect(() => {
    // Play level up sound
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      // Level up sound: ascending tone
      oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(800, audioContext.currentTime + 0.3);
      oscillator.type = 'sine';
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.5);
    } catch (e) {
      // Sound not available
    }

    const timer = setTimeout(() => {
      setShowParticles(false);
      setTimeout(onClose, 500);
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.95)',
          zIndex: 10000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Particle Effects */}
        {showParticles && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            overflow: 'hidden',
          }}>
            {Array.from({ length: 50 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  x: '50%',
                  y: '50%',
                  scale: 0,
                  opacity: 1,
                }}
                animate={{
                  x: `${50 + (Math.random() - 0.5) * 100}%`,
                  y: `${50 + (Math.random() - 0.5) * 100}%`,
                  scale: [0, 1, 0],
                  opacity: [1, 1, 0],
                }}
                transition={{
                  duration: 2,
                  delay: Math.random() * 0.5,
                  repeat: Infinity,
                }}
                style={{
                  position: 'absolute',
                  width: '4px',
                  height: '4px',
                  backgroundColor: '#00ffff',
                  borderRadius: '50%',
                  boxShadow: '0 0 10px #00ffff',
                }}
              />
            ))}
          </div>
        )}

        {/* Level Up Content */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          exit={{ scale: 0, rotate: 180 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          style={{
            textAlign: 'center',
            zIndex: 1,
          }}
        >
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
            }}
            style={{
              fontSize: '6rem',
              marginBottom: '1rem',
              filter: 'drop-shadow(0 0 30px #00ffff)',
            }}
          >
            ⚡
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{
              fontFamily: 'Orbitron, sans-serif',
              fontSize: '4rem',
              color: '#00ffff',
              marginBottom: '1rem',
              textShadow: '0 0 30px #00ffff, 0 0 60px #00ffff',
            }}
          >
            LEVEL UP!
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            style={{
              fontFamily: 'Orbitron, sans-serif',
              fontSize: '3rem',
              color: '#00ffff',
              marginBottom: '2rem',
              textShadow: '0 0 20px #00ffff',
            }}
          >
            Level {newLevel}
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            style={{
              fontFamily: 'Rajdhani, sans-serif',
              fontSize: '1.25rem',
              color: '#9ca3af',
            }}
          >
            Continue your journey, Hunter!
          </motion.p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

