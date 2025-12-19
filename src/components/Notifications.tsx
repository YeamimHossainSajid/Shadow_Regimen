import { motion, AnimatePresence } from 'framer-motion';
import { useNotificationStore } from '../store/notificationStore';

export const Notifications = () => {
  const { notifications, removeNotification } = useNotificationStore();

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'exp':
        return 'border-system-cyan bg-system-cyan/10';
      case 'level-up':
        return 'border-system-cyan bg-system-cyan/20 shadow-cyan-glow';
      case 'achievement':
        return 'border-yellow-400 bg-yellow-400/10';
      case 'quest':
        return 'border-green-400 bg-green-400/10';
      case 'warning':
        return 'border-system-alert bg-system-alert/10';
      default:
        return 'border-system-cyan/30 bg-black/20';
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm w-full">
      <AnimatePresence>
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, x: 300, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 300, scale: 0.8 }}
            className={`p-4 rounded-lg border-2 ${getNotificationColor(notification.type)} backdrop-blur-sm`}
          >
            <div className="flex items-start justify-between gap-4">
              <p className="font-rajdhani text-sm text-white flex-1">
                {notification.message}
              </p>
              <button
                onClick={() => removeNotification(notification.id)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                ×
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

