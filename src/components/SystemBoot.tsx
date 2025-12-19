import { useEffect, useState } from 'react';
import { useHunterStore } from '../store/hunterStore';

const BOOT_MESSAGES = [
  '[SYSTEM INITIALIZING...]',
  '[SHADOW REGIMEN v1.0 ONLINE]',
  '[WELCOME, HUNTER]',
];

const BOOT_DURATION = 3000;
const MESSAGE_DELAY = BOOT_DURATION / BOOT_MESSAGES.length;

export const SystemBoot = () => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const { setHasBooted } = useHunterStore();

  useEffect(() => {
    const prefersReducedMotion = typeof window !== 'undefined' 
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
      : false;
    
    if (prefersReducedMotion) {
      const timer = setTimeout(() => {
        setIsComplete(true);
        setHasBooted(true);
      }, 1000);
      return () => clearTimeout(timer);
    }

    const messageTimer = setInterval(() => {
      setCurrentMessageIndex((prev) => {
        if (prev < BOOT_MESSAGES.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, MESSAGE_DELAY);

    const completeTimer = setTimeout(() => {
      setIsComplete(true);
      setHasBooted(true);
    }, BOOT_DURATION);

    return () => {
      clearInterval(messageTimer);
      clearTimeout(completeTimer);
    };
  }, [setHasBooted]);

  if (isComplete) {
    return null;
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0a0a0a',
        color: '#00ffff',
        fontFamily: 'Orbitron, sans-serif',
      }}
    >
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '2rem',
        textAlign: 'center',
      }}>
        {BOOT_MESSAGES.slice(0, currentMessageIndex + 1).map((message, index) => (
          <div
            key={index}
            style={{
              fontSize: '1.5rem',
              color: '#00ffff',
              textShadow: '0 0 10px #00ffff, 0 0 20px #00ffff',
              letterSpacing: '0.1em',
              padding: '10px 20px',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              borderRadius: '4px',
            }}
          >
            {message}
          </div>
        ))}
        
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          marginTop: '1rem',
        }}>
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: '#00ffff',
                boxShadow: '0 0 10px #00ffff',
                animation: `pulse 1s ease-in-out infinite ${i * 0.2}s`,
              }}
            />
          ))}
        </div>
      </div>
      
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
      `}</style>
    </div>
  );
};
