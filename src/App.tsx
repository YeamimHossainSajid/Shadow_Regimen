import { useEffect } from 'react';
import { SystemBoot } from './components/SystemBoot';
import { WorkoutLogger } from './components/WorkoutLogger';
import { GlassPanel } from './components/GlassPanel';
import { useHunterStore } from './store/hunterStore';

function App() {
  const { hasBooted, hunter, initializeHunter, checkAndGeneratePenaltyQuests } = useHunterStore();

  useEffect(() => {
    if (hasBooted && !hunter) {
      initializeHunter();
    }
    if (hasBooted && hunter) {
      // Check for penalty quests on load
      checkAndGeneratePenaltyQuests();
    }
  }, [hasBooted, hunter, initializeHunter, checkAndGeneratePenaltyQuests]);

  return (
    <div className="min-h-screen bg-system-black text-white">
      <SystemBoot />
      
      {hasBooted && (
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <h1 className="font-orbitron text-5xl text-system-cyan mb-8 text-center neon-text">
            SHADOW REGIMEN
          </h1>
          
          {hunter && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              {/* Hunter Profile */}
              <GlassPanel hover={false} className="lg:col-span-1">
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

              {/* Main Content Area */}
              <div className="lg:col-span-2 space-y-6">
                {/* Penalty Quests Warning */}
                {hunter.penaltyQuests.filter((pq) => !pq.completed).length > 0 && (
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
                )}

                {/* Workout Logger */}
                <WorkoutLogger />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;

