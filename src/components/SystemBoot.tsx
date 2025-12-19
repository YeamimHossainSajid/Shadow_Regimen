import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useHunterStore } from '../store/hunterStore';

const BOOT_MESSAGES = [
  '[SYSTEM INITIALIZING...]',
  '[SHADOW REGIMEN v1.0 ONLINE]',
  '[WELCOME, HUNTER]',
];

const BOOT_DURATION = 3000; // 3 seconds total
const MESSAGE_DELAY = BOOT_DURATION / BOOT_MESSAGES.length;

interface SystemBootProps {
  onBootComplete?: () => void;
}

export const SystemBoot = ({ onBootComplete }: SystemBootProps) => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const { setHasBooted } = useHunterStore();

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      // Skip animation, show all messages immediately
      setTimeout(() => {
        setIsComplete(true);
        setHasBooted(true);
        onBootComplete?.();
      }, 1000);
      return;
    }

    // Normal boot sequence
    const messageTimer = setInterval(() => {
      setCurrentMessageIndex((prev: number) => {
        if (prev < BOOT_MESSAGES.length - 1) {
          return prev + 1;
        }
        clearInterval(messageTimer);
        return prev;
      });
    }, MESSAGE_DELAY);

    // Complete boot after duration
    const completeTimer = setTimeout(() => {
      setIsComplete(true);
      setHasBooted(true);
      onBootComplete?.();
    }, BOOT_DURATION);

    return () => {
      clearInterval(messageTimer);
      clearTimeout(completeTimer);
    };
  }, [setHasBooted, onBootComplete]);

  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: prefersReducedMotion ? 0.1 : 0.5 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-system-black"
        >
          {/* Subtle grid background */}
          <div 
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `
                linear-gradient(cyan 1px, transparent 1px),
                linear-gradient(90deg, cyan 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px',
            }}
          />

          {/* CRT scanline overlay (very subtle) */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{
              background: [
                'linear-gradient(transparent 50%, rgba(0, 255, 255, 0.03) 50%)',
                'linear-gradient(transparent 50%, rgba(0, 255, 255, 0.03) 50%)',
              ],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'linear',
            }}
            style={{
              backgroundSize: '100% 4px',
            }}
          />

          {/* Boot messages */}
          <div className="relative z-10 flex flex-col items-center gap-4">
            <AnimatePresence mode="wait">
              {BOOT_MESSAGES.slice(0, currentMessageIndex + 1).map((message, index) => (
                <motion.div
                  key={index}
                  initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
                  animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                  exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
                  transition={{
                    duration: prefersReducedMotion ? 0.1 : 0.3,
                    delay: index * 0.1,
                  }}
                  className="font-orbitron text-system-cyan text-xl md:text-2xl tracking-wider"
                  style={{
                    textShadow: '0 0 10px #00ffff, 0 0 20px #00ffff',
                  }}
                >
                  {prefersReducedMotion ? (
                    message
                  ) : (
                    <TypewriterText text={message} />
                  )}
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Loading indicator */}
            <motion.div
              className="mt-8 flex gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="h-2 w-2 rounded-full bg-system-cyan"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: 'easeInOut',
                  }}
                  style={{
                    boxShadow: '0 0 10px #00ffff',
                  }}
                />
              ))}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/**
 * Typewriter effect component for boot messages
 */
interface TypewriterTextProps {
  text: string;
}

const TypewriterText = ({ text }: TypewriterTextProps) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText((prev: string) => prev + text[currentIndex]);
        setCurrentIndex((prev: number) => prev + 1);
      }, 30); // Typing speed

      return () => clearTimeout(timer);
    }
  }, [currentIndex, text]);

  // Add subtle glitch effect on random characters
  const shouldGlitch = Math.random() < 0.05 && displayedText.length > 0;

  return (
    <span className={shouldGlitch ? 'opacity-70' : ''}>
      {displayedText}
      {currentIndex < text.length && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
          className="inline-block w-0.5 h-6 bg-system-cyan ml-1"
        />
      )}
    </span>
  );
};

