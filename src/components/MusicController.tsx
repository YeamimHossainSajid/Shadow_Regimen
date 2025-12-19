import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { GlassPanel } from './GlassPanel';

interface MusicControllerProps {
  className?: string;
}

export const MusicController = ({ className = '' }: MusicControllerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element for background music
    // Using a placeholder - user can add their own music file
    const audio = new Audio();
    // For now, we'll use a data URL or let user add music file
    // In production, add: audio.src = '/music/background-music.mp3';
    audio.loop = true;
    audio.volume = isMuted ? 0 : volume;
    
    audioRef.current = audio;

    if (isPlaying && !isMuted) {
      audio.play().catch(() => {
        // Auto-play blocked, user needs to interact first
        setIsPlaying(false);
      });
    }

    return () => {
      if (audio) {
        audio.pause();
        audio.src = '';
      }
    };
  }, [isPlaying, volume, isMuted]);

  const handlePlayPause = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(() => {
        // Auto-play blocked
        setIsPlaying(false);
      });
      setIsPlaying(true);
    }
  };

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : newVolume;
    }
  };

  const handleMute = () => {
    setIsMuted(!isMuted);
    if (audioRef.current) {
      audioRef.current.volume = !isMuted ? 0 : volume;
    }
  };

  return (
    <div className={className} style={{ position: 'relative' }}>
      <GlassPanel hover={false} className="p-3">
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
        }}>
          {/* Play/Pause Button */}
          <motion.button
            onClick={handlePlayPause}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              border: '2px solid #00ffff',
              backgroundColor: isPlaying ? 'rgba(0, 255, 255, 0.2)' : 'transparent',
              color: '#00ffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.25rem',
              cursor: 'pointer',
              transition: 'all 0.3s',
            }}
            whileHover={{ scale: 1.1, boxShadow: '0 0 15px #00ffff' }}
            whileTap={{ scale: 0.9 }}
          >
            {isPlaying ? '⏸️' : '▶️'}
          </motion.button>

          {/* Volume Slider */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            flex: 1,
          }}>
            <span style={{ fontSize: '1rem' }}>🔊</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={isMuted ? 0 : volume}
              onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
              style={{
                flex: 1,
                height: '4px',
                background: 'rgba(0, 255, 255, 0.2)',
                borderRadius: '2px',
                outline: 'none',
                cursor: 'pointer',
              }}
            />
            <span style={{
              fontFamily: 'monospace',
              fontSize: '0.75rem',
              color: '#00ffff',
              minWidth: '30px',
            }}>
              {Math.round((isMuted ? 0 : volume) * 100)}%
            </span>
          </div>

          {/* Mute Button */}
          <motion.button
            onClick={handleMute}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              border: '1px solid rgba(0, 255, 255, 0.3)',
              backgroundColor: isMuted ? 'rgba(255, 0, 0, 0.2)' : 'transparent',
              color: isMuted ? '#ff0000' : '#00ffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.875rem',
              cursor: 'pointer',
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isMuted ? '🔇' : '🔊'}
          </motion.button>
        </div>
      </GlassPanel>
    </div>
  );
};

