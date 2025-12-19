import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const NAV_ITEMS = [
  { path: '/dashboard', label: 'Dashboard', icon: '🏠' },
  { path: '/workout-logger', label: 'Log Workout', icon: '💪' },
  { path: '/plans', label: 'Plans', icon: '📋' },
  { path: '/progress', label: 'Progress', icon: '📊' },
  { path: '/tutorials', label: 'Tutorials', icon: '📚' },
];

export const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-40">
      <div className="flex gap-2 bg-black/80 backdrop-blur-md border-2 border-system-cyan/30 rounded-full px-4 py-2">
        {NAV_ITEMS.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link key={item.path} to={item.path}>
              <motion.div
                className={`px-4 py-2 rounded-full transition-all ${
                  isActive
                    ? 'bg-system-cyan/20 border-2 border-system-cyan shadow-cyan-glow-sm'
                    : 'border-2 border-transparent hover:border-system-cyan/30'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="flex items-center gap-2">
                  <span>{item.icon}</span>
                  <span className={`font-rajdhani text-sm ${isActive ? 'text-system-cyan' : 'text-gray-400'}`}>
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

