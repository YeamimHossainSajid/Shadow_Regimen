import { motion } from 'framer-motion';
import { useHunterStore } from '../store/hunterStore';
import { useNotificationStore } from '../store/notificationStore';
import { GlassPanel } from './GlassPanel';
import { DailyQuest } from '../types/hunter';

const QUEST_TYPE_ICONS: Record<string, string> = {
  strength: '💪',
  cardio: '🏃',
  mobility: '🧘',
  consistency: '🔥',
};

export const QuestPanel = () => {
  const { hunter, completeQuest } = useHunterStore();
  const { addNotification } = useNotificationStore();

  if (!hunter) return null;

  const handleCompleteQuest = (quest: DailyQuest) => {
    completeQuest(quest.id);
    addNotification(`Quest Complete: ${quest.title}`, 'quest');
  };

  const completedCount = hunter.dailyQuests.filter((q) => q.completed).length;
  const totalCount = hunter.dailyQuests.length;
  const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  return (
    <GlassPanel hover={false}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-orbitron text-2xl text-system-cyan">DAILY QUESTS</h2>
        <span className="font-mono text-sm text-system-cyan/80">
          {completedCount}/{totalCount}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="h-2 bg-black/30 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-system-cyan"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
            style={{ boxShadow: '0 0 10px #00ffff' }}
          />
        </div>
        <p className="text-xs text-gray-400 mt-1 font-mono">
          {progress.toFixed(0)}% Complete
        </p>
      </div>

      {/* Quest List */}
      <div className="space-y-3">
        {hunter.dailyQuests.map((quest) => (
          <motion.div
            key={quest.id}
            className={`p-4 rounded-lg border-2 transition-all ${
              quest.completed
                ? 'border-green-400/30 bg-green-400/5 opacity-60'
                : 'border-system-cyan/30 bg-black/20 hover:border-system-cyan/60'
            }`}
            whileHover={quest.completed ? {} : { scale: 1.02, y: -2 }}
          >
            <div className="flex items-start gap-3">
              <div className="text-2xl">{QUEST_TYPE_ICONS[quest.type] || '📋'}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-rajdhani text-lg text-system-cyan">
                    {quest.title}
                  </h3>
                  {quest.completed && (
                    <span className="text-green-400 text-sm">✓</span>
                  )}
                </div>
                <p className="text-sm text-gray-400 mb-2">{quest.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-system-cyan/80 font-mono">
                    +{quest.expReward} EXP
                  </span>
                  {!quest.completed && (
                    <motion.button
                      onClick={() => handleCompleteQuest(quest)}
                      className="px-4 py-1.5 bg-system-cyan/20 border border-system-cyan rounded text-xs font-orbitron text-system-cyan hover:bg-system-cyan/30 transition-all"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      COMPLETE
                    </motion.button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quest Tips */}
      {completedCount === totalCount && totalCount > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-3 bg-green-400/10 border border-green-400/30 rounded-lg"
        >
          <p className="text-sm text-green-400 font-rajdhani">
            🎉 All quests completed! Great discipline, Hunter.
          </p>
        </motion.div>
      )}
    </GlassPanel>
  );
};

