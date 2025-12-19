import { motion } from 'framer-motion';
import { useHunterStore } from '../store/hunterStore';
import { GlassPanel } from './GlassPanel';

export const LevelPathway = () => {
  const { hunter } = useHunterStore();

  if (!hunter) return null;

  const nextLevel = hunter.level + 1;
  const expNeeded = hunter.expToNextLevel - hunter.exp;
  const expPerWorkout = 50; // Average EXP per workout
  const estimatedWorkouts = Math.ceil(expNeeded / expPerWorkout);
  const estimatedDays = Math.ceil(estimatedWorkouts / 2); // Assuming 2 workouts per day average

  // Calculate progress percentage
  const progress = (hunter.exp / hunter.expToNextLevel) * 100;

  // Get next rank threshold
  const getNextRankLevel = (currentLevel: number): number => {
    if (currentLevel < 5) return 5;
    if (currentLevel < 15) return 15;
    if (currentLevel < 25) return 25;
    if (currentLevel < 35) return 35;
    if (currentLevel < 50) return 50;
    return 100; // S rank
  };

  const nextRankLevel = getNextRankLevel(hunter.level);
  const levelsToNextRank = nextRankLevel - hunter.level;

  return (
    <GlassPanel hover={false}>
      <h2 className="font-orbitron text-2xl text-system-cyan mb-4">
        PROGRESSION PATHWAY
      </h2>

      {/* Current Level Progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="font-rajdhani text-lg text-gray-300">
            Level {hunter.level} → Level {nextLevel}
          </span>
          <span className="font-mono text-sm text-system-cyan/80">
            {hunter.exp} / {hunter.expToNextLevel} EXP
          </span>
        </div>
        <div className="h-4 bg-black/30 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-system-cyan"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
            style={{ boxShadow: '0 0 10px #00ffff' }}
          />
        </div>
        <p className="text-xs text-gray-400 mt-1 font-mono">
          {progress.toFixed(1)}% to next level
        </p>
      </div>

      {/* Estimated Time */}
      <div className="mb-6 p-4 bg-black/20 rounded-lg border border-system-cyan/20">
        <h3 className="font-rajdhani text-sm text-system-cyan mb-2">
          ESTIMATED TIME TO LEVEL {nextLevel}
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-2xl font-orbitron text-system-cyan">{estimatedWorkouts}</div>
            <div className="text-xs text-gray-400 font-mono">workouts</div>
          </div>
          <div>
            <div className="text-2xl font-orbitron text-system-cyan">{estimatedDays}</div>
            <div className="text-xs text-gray-400 font-mono">days</div>
          </div>
        </div>
      </div>

      {/* Rank Progress */}
      <div className="mb-4">
        <h3 className="font-rajdhani text-sm text-system-cyan mb-2">
          RANK PROGRESSION
        </h3>
        <div className="flex items-center gap-2">
          <span className="font-orbitron text-xl text-system-cyan">Rank {hunter.rank}</span>
          <span className="text-gray-400">→</span>
          <span className="font-orbitron text-lg text-gray-400">
            {levelsToNextRank > 0 ? `${levelsToNextRank} levels to next rank` : 'Max Rank'}
          </span>
        </div>
      </div>

      {/* Recommendations */}
      <div className="mt-6 p-4 bg-system-cyan/5 rounded-lg border border-system-cyan/20">
        <h3 className="font-rajdhani text-sm text-system-cyan mb-2">
          RECOMMENDED ACTIONS
        </h3>
        <ul className="space-y-2 text-sm text-gray-300 font-mono">
          <li>• Complete daily quests for bonus EXP</li>
          <li>• Log workouts consistently (2+ per day)</li>
          <li>• Maintain your streak for bonus rewards</li>
          <li>• Focus on balanced stat growth</li>
        </ul>
      </div>
    </GlassPanel>
  );
};

