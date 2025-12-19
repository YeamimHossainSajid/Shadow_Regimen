import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useHunterStore } from '../store/hunterStore';
import { useWorkoutStore } from '../stores/workoutStore';
import { GlassPanel } from './GlassPanel';
import { QuestPanel } from './QuestPanel';
import { LevelPathway } from './LevelPathway';
import { ExerciseCard } from './fitness/ExerciseCard';

export const Dashboard = () => {
  const { hunter } = useHunterStore();
  const { getRecommendedExercise, getCompletedToday } = useWorkoutStore();

  if (!hunter) return null;

  const progress = (hunter.exp / hunter.expToNextLevel) * 100;
  const recommendedExercise = getRecommendedExercise(hunter.level);
  const completedToday = getCompletedToday();
  const completedIds = new Set(completedToday.map((ce) => ce.exerciseId));

  const stats = [
    { label: 'STR', value: hunter.stats.str, color: '#00ffff', icon: '⚔️' },
    { label: 'VIT', value: hunter.stats.vit, color: '#ff6b6b', icon: '❤️' },
    { label: 'DEX', value: hunter.stats.dex, color: '#4ecdc4', icon: '⚡' },
    { label: 'INT', value: hunter.stats.int, color: '#ffd700', icon: '🧠' },
  ];

  const statMax = 100;
  const hasPenaltyQuests = hunter.penaltyQuests.filter((pq) => !pq.completed).length > 0;

  return (
    <div style={{
      minHeight: '100vh',
      width: '100%',
      backgroundColor: '#0a0a0a',
      color: '#ffffff',
      padding: '2rem 1rem',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Animated Background Grid */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 0.05,
        backgroundImage: `
          linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px',
        pointerEvents: 'none',
      }} />

      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        width: '100%',
        position: 'relative',
        zIndex: 1,
      }}>
        {/* Hero Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            marginBottom: '3rem',
            textAlign: 'center',
            position: 'relative',
          }}
        >
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '2rem',
            flexWrap: 'wrap',
          }}>
            {/* Level Badge */}
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              style={{
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                border: '4px solid #00ffff',
                background: 'linear-gradient(135deg, rgba(0, 255, 255, 0.1) 0%, rgba(0, 255, 255, 0.05) 100%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 30px rgba(0, 255, 255, 0.5), inset 0 0 20px rgba(0, 255, 255, 0.1)',
                position: 'relative',
              }}
            >
              <div style={{
                fontFamily: 'Orbitron, sans-serif',
                fontSize: '3rem',
                fontWeight: 'bold',
                color: '#00ffff',
                textShadow: '0 0 20px #00ffff',
                lineHeight: 1,
              }}>
                {hunter.level}
              </div>
              <div style={{
                fontFamily: 'monospace',
                fontSize: '0.75rem',
                color: '#9ca3af',
                marginTop: '0.25rem',
                textTransform: 'uppercase',
              }}>
                Level
              </div>
              {/* Rank Badge */}
              <div style={{
                position: 'absolute',
                bottom: '-10px',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: '#0a0a0a',
                border: '2px solid #00ffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.25rem',
                fontWeight: 'bold',
                color: '#00ffff',
                boxShadow: '0 0 15px #00ffff',
              }}>
                {hunter.rank}
              </div>
            </motion.div>

            {/* Hunter Info */}
            <div style={{ flex: 1, minWidth: '300px' }}>
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                style={{
                  fontFamily: 'Orbitron, sans-serif',
                  fontSize: 'clamp(2rem, 5vw, 4rem)',
                  color: '#00ffff',
                  marginBottom: '0.5rem',
                  textShadow: '0 0 20px #00ffff, 0 0 40px rgba(0, 255, 255, 0.5)',
                  letterSpacing: '0.1em',
                }}
              >
                {hunter.name.toUpperCase()}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                style={{
                  fontFamily: 'Rajdhani, sans-serif',
                  fontSize: '1.25rem',
                  color: '#9ca3af',
                  marginBottom: '1rem',
                }}
              >
                ID: <span style={{ color: '#00ffff', fontFamily: 'monospace' }}>{hunter.id}</span>
              </motion.p>
              
              {/* EXP Progress Bar */}
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                style={{
                  width: '100%',
                  maxWidth: '500px',
                  margin: '0 auto',
                }}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '0.5rem',
                  fontFamily: 'monospace',
                  fontSize: '0.875rem',
                }}>
                  <span style={{ color: '#9ca3af' }}>EXP: {hunter.exp}</span>
                  <span style={{ color: '#00ffff' }}>{progress.toFixed(1)}%</span>
                  <span style={{ color: '#9ca3af' }}>{hunter.expToNextLevel} EXP</span>
                </div>
                <div style={{
                  height: '12px',
                  backgroundColor: 'rgba(0, 255, 255, 0.1)',
                  borderRadius: '6px',
                  overflow: 'hidden',
                  border: '1px solid rgba(0, 255, 255, 0.3)',
                  position: 'relative',
                }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ delay: 0.5, duration: 1, ease: 'easeOut' }}
                    style={{
                      height: '100%',
                      background: 'linear-gradient(90deg, #00ffff 0%, #00ccff 100%)',
                      boxShadow: '0 0 20px rgba(0, 255, 255, 0.8)',
                      position: 'relative',
                    }}
                  >
                    <motion.div
                      animate={{
                        boxShadow: [
                          '0 0 10px rgba(0, 255, 255, 0.5)',
                          '0 0 20px rgba(0, 255, 255, 0.8)',
                          '0 0 10px rgba(0, 255, 255, 0.5)',
                        ],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                      style={{
                        position: 'absolute',
                        right: 0,
                        top: 0,
                        bottom: 0,
                        width: '4px',
                        backgroundColor: '#ffffff',
                        boxShadow: '0 0 10px #ffffff',
                      }}
                    />
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem',
          marginBottom: '2rem',
        }}>
          {/* Stats Panel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <GlassPanel hover={false}>
              <h2 style={{
                fontFamily: 'Orbitron, sans-serif',
                fontSize: '1.5rem',
                color: '#00ffff',
                marginBottom: '1.5rem',
                textAlign: 'center',
                textShadow: '0 0 10px #00ffff',
              }}>
                STATISTICS
              </h2>
              <div style={{
                display: 'grid',
                gap: '1.25rem',
              }}>
                {stats.map((stat, index) => {
                  const statPercent = Math.min(100, (stat.value / statMax) * 100);
                  return (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                    >
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '0.5rem',
                      }}>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.75rem',
                        }}>
                          <span style={{ fontSize: '1.5rem' }}>{stat.icon}</span>
                          <span style={{
                            fontFamily: 'Orbitron, sans-serif',
                            fontSize: '1rem',
                            color: '#ffffff',
                            fontWeight: '600',
                          }}>
                            {stat.label}
                          </span>
                        </div>
                        <span style={{
                          fontFamily: 'monospace',
                          fontSize: '1.125rem',
                          color: stat.color,
                          fontWeight: 'bold',
                        }}>
                          {stat.value.toFixed(1)}
                        </span>
                      </div>
                      <div style={{
                        height: '8px',
                        backgroundColor: 'rgba(0, 255, 255, 0.1)',
                        borderRadius: '4px',
                        overflow: 'hidden',
                        border: `1px solid ${stat.color}40`,
                      }}>
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${statPercent}%` }}
                          transition={{ delay: 0.4 + index * 0.1, duration: 0.8 }}
                          style={{
                            height: '100%',
                            backgroundColor: stat.color,
                            boxShadow: `0 0 10px ${stat.color}`,
                          }}
                        />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
              
              {/* Quick Stats Footer */}
              <div style={{
                marginTop: '2rem',
                paddingTop: '1.5rem',
                borderTop: '1px solid rgba(0, 255, 255, 0.2)',
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '1rem',
                textAlign: 'center',
              }}>
                <div>
                  <div style={{
                    fontFamily: 'Orbitron, sans-serif',
                    fontSize: '1.5rem',
                    color: '#00ffff',
                  }}>
                    {hunter.streak}
                  </div>
                  <div style={{
                    fontSize: '0.75rem',
                    color: '#9ca3af',
                    fontFamily: 'monospace',
                    textTransform: 'uppercase',
                  }}>
                    Streak
                  </div>
                </div>
                <div>
                  <div style={{
                    fontFamily: 'Orbitron, sans-serif',
                    fontSize: '1.5rem',
                    color: '#00ffff',
                  }}>
                    {hunter.totalWorkouts}
                  </div>
                  <div style={{
                    fontSize: '0.75rem',
                    color: '#9ca3af',
                    fontFamily: 'monospace',
                    textTransform: 'uppercase',
                  }}>
                    Workouts
                  </div>
                </div>
                <div>
                  <div style={{
                    fontFamily: 'Orbitron, sans-serif',
                    fontSize: '1.5rem',
                    color: '#00ffff',
                  }}>
                    {hunter.totalMinutes}
                  </div>
                  <div style={{
                    fontSize: '0.75rem',
                    color: '#9ca3af',
                    fontFamily: 'monospace',
                    textTransform: 'uppercase',
                  }}>
                    Minutes
                  </div>
                </div>
              </div>
            </GlassPanel>
          </motion.div>

          {/* Quests Panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <QuestPanel />
          </motion.div>

          {/* Recommended Workout */}
          {recommendedExercise && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <GlassPanel hover={false}>
                <h2 style={{
                  fontFamily: 'Orbitron, sans-serif',
                  fontSize: '1.25rem',
                  color: '#00ffff',
                  marginBottom: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}>
                  <span style={{ fontSize: '1.5rem' }}>⭐</span>
                  NEXT MISSION
                </h2>
                <Link to="/workouts" style={{ textDecoration: 'none' }}>
                  <ExerciseCard
                    exercise={recommendedExercise}
                    onClick={() => {}}
                    isCompleted={completedIds.has(recommendedExercise.id)}
                  />
                </Link>
              </GlassPanel>
            </motion.div>
          )}
        </div>

        {/* Bottom Section - Level Pathway */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          style={{ marginBottom: '2rem' }}
        >
          <LevelPathway />
        </motion.div>

        {/* Penalty Quests Warning */}
        {hasPenaltyQuests && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7 }}
          >
            <GlassPanel
              hover={false}
              style={{
                borderColor: 'rgba(255, 0, 0, 0.5)',
                backgroundColor: 'rgba(255, 0, 0, 0.1)',
                boxShadow: '0 0 30px rgba(255, 0, 0, 0.3)',
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '1.5rem',
              }}>
                <div style={{
                  fontSize: '3rem',
                  animation: 'pulse 2s infinite',
                }}>
                  ⚠️
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{
                    fontFamily: 'Orbitron, sans-serif',
                    fontSize: '1.5rem',
                    color: '#ff0000',
                    marginBottom: '1rem',
                    textShadow: '0 0 10px #ff0000',
                  }}>
                    PENALTY QUEST ACTIVE
                  </h3>
                  {hunter.penaltyQuests
                    .filter((pq) => !pq.completed)
                    .map((pq) => (
                      <div key={pq.id} style={{
                        marginBottom: '1rem',
                        padding: '1rem',
                        backgroundColor: 'rgba(255, 0, 0, 0.1)',
                        border: '1px solid rgba(255, 0, 0, 0.3)',
                        borderRadius: '0.5rem',
                      }}>
                        <p style={{
                          fontFamily: 'Rajdhani, sans-serif',
                          fontSize: '1rem',
                          color: '#ffffff',
                          marginBottom: '0.5rem',
                        }}>
                          {pq.description}
                        </p>
                        <div style={{
                          display: 'flex',
                          gap: '1rem',
                          fontFamily: 'monospace',
                          fontSize: '0.875rem',
                          color: '#ffaaaa',
                        }}>
                          <span>Task: {pq.mandatoryTask}</span>
                          <span>•</span>
                          <span>EXP Penalty: -{pq.expPenalty}%</span>
                        </div>
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
