import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface GlassPanelProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  hover?: boolean;
  style?: React.CSSProperties;
}

/**
 * Base glassmorphism panel component
 * Provides the system UI aesthetic with cyan glow
 */
export const GlassPanel = ({ children, className = '', onClick, hover = true, style }: GlassPanelProps) => {
  const baseClasses = 'glass rounded-lg p-6 border border-system-cyan/30';
  const hoverClasses = hover 
    ? 'transition-all duration-300 hover:border-system-cyan/60 hover:shadow-cyan-glow-sm cursor-pointer' 
    : '';

  const baseStyle: React.CSSProperties = {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    border: '1px solid rgba(0, 255, 255, 0.4)',
    borderRadius: '0.5rem',
    padding: '1.5rem',
    color: '#ffffff',
    minHeight: '100px',
    ...style,
  };

  if (onClick) {
    return (
      <motion.div
        className={`${baseClasses} ${hoverClasses} ${className}`}
        style={baseStyle}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        onClick={onClick}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={`${baseClasses} ${hoverClasses} ${className}`}
      style={baseStyle}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
};

