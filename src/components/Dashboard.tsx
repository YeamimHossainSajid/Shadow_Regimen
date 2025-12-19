import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useHunterStore } from '../store/hunterStore';
import { GlassPanel } from './GlassPanel';
import { QuestPanel } from './QuestPanel';
import { LevelPathway } from './LevelPathway';
import { WorkoutLogger } from './WorkoutLogger';

export const Dashboard = () => {
  const { hunter } = useHunterStore();

  if (!hunter) return null;

  const progress = (hunter.exp / hunter.expToNextLevel) * 100;

  return (
    <div style={{
      minHeight: '100vh',
      width: '100%',
      backgroundColor: '#0a0a0a',
      color: '#ffffff',
      padding: '1rem',
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        width: '100%',
      }}>
        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{
            fontFamily: 'Orbitron, sans-serif',
            fontSize: '3rem',
            color: '#00ffff',
            marginBottom: '0.5rem',
            textShadow: '0 0 10px #00ffff, 0 0 20px #00ffff',
          }}>
            SHADOW REGIMEN
          </h1>
          <p style={{
            color: '#9ca3af',
            fontFamily: 'Rajdhani, sans-serif',
            fontSize: '1.125rem',
          }}>
            Welcome back, <span style={{ color: '#00ffff' }}>{hunter.name}</span>
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Left Column - Profile & Stats */}
          <div className="space-y-6">
            <GlassPanel hover={false}>
              <h2 className="font-orbitron text-xl text-system-cyan mb-4">HUNTER PROFILE</h2>
              <div className="space-y-3 font-mono text-sm">
                <div>
                  <span className="text-gray-400">ID:</span>{' '}
                  <span className="text-system-cyan">{hunter.id}</span>
                </div>
                <div>
                  <span className="text-gray-400">Level:</span>{' '}
                  <span className="text-system-cyan">{hunter.level}</span>{' '}
                  <span className="text-gray-400">Rank:</span>{' '}
                  <span className="text-system-cyan">{hunter.rank}</span>
                </div>
                <div>
                  <span className="text-gray-400">EXP:</span>{' '}
                  <span className="text-system-cyan">
                    {hunter.exp} / {hunter.expToNextLevel}
                  </span>
                </div>
                <div className="pt-2 border-t border-system-cyan/20">
                  <div className="text-gray-400 mb-2">STATS</div>
                  <div className="space-y-1">
                    <div>STR: <span className="text-system-cyan">{hunter.stats.str.toFixed(1)}</span></div>
                    <div>VIT: <span className="text-system-cyan">{hunter.stats.vit.toFixed(1)}</span></div>
                    <div>DEX: <span className="text-system-cyan">{hunter.stats.dex.toFixed(1)}</span></div>
                    <div>INT: <span className="text-system-cyan">{hunter.stats.int.toFixed(1)}</span></div>
                  </div>
                </div>
                <div className="pt-2 border-t border-system-cyan/20">
                  <div>
                    <span className="text-gray-400">Streak:</span>{' '}
                    <span className="text-system-cyan">{hunter.streak} days</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Total Workouts:</span>{' '}
                    <span className="text-system-cyan">{hunter.totalWorkouts}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Total Minutes:</span>{' '}
                    <span className="text-system-cyan">{hunter.totalMinutes}</span>
                  </div>
                </div>
              </div>
            </GlassPanel>

            {/* Level Progress */}
            <GlassPanel hover={false}>
              <h2 className="font-orbitron text-xl text-system-cyan mb-4">LEVEL PROGRESS</h2>
              <div className="mb-2">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-rajdhani text-sm text-gray-300">
                    Level {hunter.level} → {hunter.level + 1}
                  </span>
                  <span className="font-mono text-xs text-system-cyan/80">
                    {progress.toFixed(1)}%
                  </span>
                </div>
                <div className="h-3 bg-black/30 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-system-cyan"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5 }}
                    style={{ boxShadow: '0 0 10px #00ffff' }}
                  />
                </div>
              </div>
            </GlassPanel>
          </div>

          {/* Middle Column - Quests & Quick Actions */}
          <div className="space-y-6">
            <QuestPanel />
            
            {/* Quick Actions */}
            <GlassPanel hover={false}>
              <h2 className="font-orbitron text-xl text-system-cyan mb-4">QUICK ACTIONS</h2>
              <div className="grid grid-cols-2 gap-3">
                <Link to="/workout-logger">
                  <motion.div
                    className="p-4 bg-system-cyan/10 border-2 border-system-cyan/30 rounded-lg text-center hover:border-system-cyan hover:shadow-cyan-glow-sm transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="text-2xl mb-2">💪</div>
                    <div className="font-rajdhani text-sm text-system-cyan">Log Workout</div>
                  </motion.div>
                </Link>
                <Link to="/plans">
                  <motion.div
                    className="p-4 bg-system-cyan/10 border-2 border-system-cyan/30 rounded-lg text-center hover:border-system-cyan hover:shadow-cyan-glow-sm transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="text-2xl mb-2">📋</div>
                    <div className="font-rajdhani text-sm text-system-cyan">Workout Plans</div>
                  </motion.div>
                </Link>
                <Link to="/progress">
                  <motion.div
                    className="p-4 bg-system-cyan/10 border-2 border-system-cyan/30 rounded-lg text-center hover:border-system-cyan hover:shadow-cyan-glow-sm transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="text-2xl mb-2">📊</div>
                    <div className="font-rajdhani text-sm text-system-cyan">Progress</div>
                  </motion.div>
                </Link>
                <Link to="/tutorials">
                  <motion.div
                    className="p-4 bg-system-cyan/10 border-2 border-system-cyan/30 rounded-lg text-center hover:border-system-cyan hover:shadow-cyan-glow-sm transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="text-2xl mb-2">📚</div>
                    <div className="font-rajdhani text-sm text-system-cyan">Tutorials</div>
                  </motion.div>
                </Link>
              </div>
            </GlassPanel>
          </div>

          {/* Right Column - Pathway */}
          <div>
            <LevelPathway />
          </div>
        </div>

        {/* Penalty Quests Warning */}
        {hunter.penaltyQuests.filter((pq) => !pq.completed).length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <GlassPanel className="border-system-alert/50 bg-system-alert/10">
              <div className="flex items-start gap-4">
                <div className="text-2xl">⚠️</div>
                <div className="flex-1">
                  <h3 className="font-orbitron text-system-alert mb-2">PENALTY QUEST ACTIVE</h3>
                  {hunter.penaltyQuests
                    .filter((pq) => !pq.completed)
                    .map((pq) => (
                      <div key={pq.id} className="mb-2">
                        <p className="text-sm text-gray-300 mb-1">{pq.description}</p>
                        <p className="text-xs text-gray-400 font-mono">
                          Task: {pq.mandatoryTask} | EXP Penalty: -{pq.expPenalty}%
                        </p>
                      </div>
                    ))}
                </div>
              </div>
            </GlassPanel>
          </motion.div>
        )}
      </div>
    </div>
  );
};

