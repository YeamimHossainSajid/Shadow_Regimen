import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MusicControllerProps {
  className?: string;
}

export const MusicController = ({ className = '' }: MusicControllerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.4);
  const [isMuted, setIsMuted] = useState(false);
  const [showVolume, setShowVolume] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hasInteractedRef = useRef(false);

  // Initialize audio on mount
  useEffect(() => {
    const audio = new Audio();
    
    // Try local file first, then fallback to online source
    // Place your music file in: public/music/background.mp3
    audio.src = '/music/background.mp3';
    
    // Fallback: If local file doesn't exist, you can use an online source
    // Example: Replace with your own music URL
    // audio.src = 'https://your-music-url.com/background.mp3';
    
    audio.addEventListener('error', () => {
      // If local file fails, log for user to add their music
      console.log('Background music not found. Add your music file to /public/music/background.mp3');
      console.log('Or update the audio.src in MusicController.tsx with your music URL');
    });
    
    audio.loop = true;
    audio.volume = isMuted ? 0 : volume;
    audioRef.current = audio;

    // Auto-play after first user interaction
    const handleFirstInteraction = () => {
      if (!hasInteractedRef.current && audioRef.current) {
        hasInteractedRef.current = true;
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch(() => {
            // Auto-play blocked, will need manual play
          });
      }
    };

    // Listen for any user interaction
    document.addEventListener('click', handleFirstInteraction, { once: true });
    document.addEventListener('keydown', handleFirstInteraction, { once: true });

    return () => {
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
      if (audio) {
        audio.pause();
        audio.src = '';
      }
    };
  }, []);

  // Update audio state
  useEffect(() => {
    if (!audioRef.current) return;
    
    audioRef.current.volume = isMuted ? 0 : volume;
    
    if (isPlaying && hasInteractedRef.current) {
      audioRef.current.play().catch(() => {
        setIsPlaying(false);
      });
    } else if (!isPlaying) {
      audioRef.current.pause();
    }
  }, [isPlaying, volume, isMuted]);

  const handlePlayPause = () => {
    hasInteractedRef.current = true;
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    setIsMuted(false);
  };

  const handleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div className={className} style={{ position: 'relative' }}>
      {/* Minimalistic Music Control */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
      }}>
        {/* Play/Pause Button - Minimalistic */}
        <motion.button
          onClick={handlePlayPause}
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            border: '1px solid rgba(0, 255, 255, 0.4)',
            backgroundColor: isPlaying ? 'rgba(0, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.3)',
            color: '#00ffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.875rem',
            cursor: 'pointer',
            transition: 'all 0.2s',
            backdropFilter: 'blur(8px)',
          }}
          whileHover={{ 
            scale: 1.1, 
            boxShadow: '0 0 15px rgba(0, 255, 255, 0.5)',
            borderColor: '#00ffff',
          }}
          whileTap={{ scale: 0.95 }}
          onHoverStart={() => setShowVolume(true)}
          onHoverEnd={() => setShowVolume(false)}
        >
          {isPlaying ? '⏸' : '▶'}
        </motion.button>

        {/* Volume Control - Shows on hover */}
        <AnimatePresence>
          {showVolume && (
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              exit={{ opacity: 0, width: 0 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                overflow: 'hidden',
              }}
            >
              {/* Mute Toggle */}
              <motion.button
                onClick={handleMute}
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  border: '1px solid rgba(0, 255, 255, 0.3)',
                  backgroundColor: isMuted ? 'rgba(255, 0, 0, 0.2)' : 'transparent',
                  color: isMuted ? '#ff0000' : '#00ffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.75rem',
                  cursor: 'pointer',
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {isMuted ? '🔇' : '🔊'}
              </motion.button>

              {/* Volume Slider */}
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                style={{
                  width: '80px',
                  height: '3px',
                  background: 'rgba(0, 255, 255, 0.2)',
                  borderRadius: '2px',
                  outline: 'none',
                  cursor: 'pointer',
                  WebkitAppearance: 'none',
                }}
                // Custom slider styling
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(0, 255, 255, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(0, 255, 255, 0.2)';
                }}
                onMouseDown={(e) => {
                  const slider = e.currentTarget;
                  const rect = slider.getBoundingClientRect();
                  const percent = (e.clientX - rect.left) / rect.width;
                  handleVolumeChange(Math.max(0, Math.min(1, percent)));
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
