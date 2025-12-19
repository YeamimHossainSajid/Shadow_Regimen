import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const NAV_ITEMS = [
  { path: '/dashboard', label: 'Dashboard', icon: '🏠' },
  { path: '/profile', label: 'Profile', icon: '👤' },
  { path: '/workouts', label: 'Workouts', icon: '💪' },
  { path: '/plans', label: 'Plans', icon: '📋' },
  { path: '/progress', label: 'Progress', icon: '📊' },
];

export const Navigation = () => {
  const location = useLocation();

  return (
    <nav style={{
      position: 'fixed',
      bottom: '1rem',
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 40,
    }}>
      <div style={{
        display: 'flex',
        gap: '0.5rem',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: '2px solid rgba(0, 255, 255, 0.3)',
        borderRadius: '9999px',
        padding: '0.5rem 1rem',
      }}>
        {NAV_ITEMS.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link key={item.path} to={item.path}>
              <motion.div
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '9999px',
                  transition: 'all 0.3s',
                  border: isActive ? '2px solid #00ffff' : '2px solid transparent',
                  backgroundColor: isActive ? 'rgba(0, 255, 255, 0.2)' : 'transparent',
                  boxShadow: isActive ? '0 0 10px rgba(0, 255, 255, 0.5)' : 'none',
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  whiteSpace: 'nowrap',
                }}>
                  <span>{item.icon}</span>
                  <span style={{
                    fontFamily: 'Rajdhani, sans-serif',
                    fontSize: '0.75rem',
                    color: isActive ? '#00ffff' : '#9ca3af',
                  }}>
                    {item.label}
                  </span>
                </div>
              </motion.div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

