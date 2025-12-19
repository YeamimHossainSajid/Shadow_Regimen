import { useHunterStore } from '../store/hunterStore';
import { GlassPanel } from './GlassPanel';
import { getAvailablePlans } from '../utils/workoutPlans';
import { motion } from 'framer-motion';

export const Profile = () => {
  const { hunter } = useHunterStore();

  if (!hunter) {
    return (
      <div style={{
        minHeight: '100vh',
        width: '100%',
        backgroundColor: '#0a0a0a',
        color: '#ffffff',
        padding: '2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <div style={{ color: '#00ffff', fontFamily: 'monospace' }}>No hunter data found</div>
      </div>
    );
  }

  const availablePlans = getAvailablePlans(hunter.level, hunter.goal, hunter.difficulty);

  const statProgress = {
    str: Math.min(100, (hunter.stats.str / 100) * 100),
    vit: Math.min(100, (hunter.stats.vit / 100) * 100),
    dex: Math.min(100, (hunter.stats.dex / 100) * 100),
    int: Math.min(100, (hunter.stats.int / 100) * 100),
  };

  const levelProgress = (hunter.exp / hunter.expToNextLevel) * 100;

  return (
    <div style={{
      minHeight: '100vh',
      width: '100%',
      backgroundColor: '#0a0a0a',
      color: '#ffffff',
      padding: '2rem',
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        width: '100%',
      }}>
        {/* Header */}
        <div style={{
          marginBottom: '3rem',
          textAlign: 'center',
        }}>
          <h1 style={{
            fontFamily: 'Orbitron, sans-serif',
            fontSize: '3rem',
            color: '#00ffff',
            marginBottom: '1rem',
            textShadow: '0 0 10px #00ffff, 0 0 20px #00ffff',
          }}>
            HUNTER PROFILE
          </h1>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
          marginBottom: '2rem',
        }}>
          {/* Profile Picture & Basic Info */}
          <GlassPanel hover={false}>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1.5rem',
            }}>
              {/* Profile Picture - Solo Leveling Character (Sung Jin-Woo) */}
              <div style={{
                width: '200px',
                height: '200px',
                borderRadius: '50%',
                border: '3px solid #00ffff',
                overflow: 'hidden',
                boxShadow: '0 0 20px #00ffff, 0 0 40px rgba(0, 255, 255, 0.3)',
                backgroundColor: '#1a1a1a',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
              }}>
                {/* Solo Leveling Character Image */}
                <img
                  src="/solo-leveling-character.png"
                  alt="Sung Jin-Woo"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center',
                  }}
                  onError={(e) => {
                    // Fallback if image doesn't exist
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const fallback = target.nextElementSibling as HTMLElement;
                    if (fallback) fallback.style.display = 'flex';
                  }}
                />
                {/* Fallback placeholder if image not found */}
                <div style={{
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
                  display: 'none',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  color: '#00ffff',
                  fontFamily: 'monospace',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                }}>
                  <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>⚔️</div>
                  <div style={{ fontSize: '0.75rem', textAlign: 'center', padding: '0 10px' }}>
                    SHADOW<br/>MONARCH
                  </div>
                </div>
                {/* Rank Badge */}
                <div style={{
                  position: 'absolute',
                  bottom: '10px',
                  right: '10px',
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  backgroundColor: '#0a0a0a',
                  border: '2px solid #00ffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  color: '#00ffff',
                  boxShadow: '0 0 10px #00ffff',
                  zIndex: 10,
                }}>
                  {hunter.rank}
                </div>
              </div>

              <div style={{
                textAlign: 'center',
                width: '100%',
              }}>
                <h2 style={{
                  fontFamily: 'Orbitron, sans-serif',
                  fontSize: '2rem',
                  color: '#00ffff',
                  marginBottom: '0.5rem',
                }}>
                  {hunter.name}
                </h2>
                <div style={{
                  fontFamily: 'monospace',
                  fontSize: '0.875rem',
                  color: '#9ca3af',
                  marginBottom: '1rem',
                }}>
                  ID: {hunter.id}
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '1rem',
                  marginTop: '1rem',
                }}>
                  <div style={{
                    textAlign: 'center',
                  }}>
                    <div style={{
                      fontFamily: 'Orbitron, sans-serif',
                      fontSize: '1.5rem',
                      color: '#00ffff',
                    }}>
                      {hunter.level}
                    </div>
                    <div style={{
                      fontSize: '0.75rem',
                      color: '#9ca3af',
                    }}>
                      LEVEL
                    </div>
                  </div>
                  <div style={{
                    textAlign: 'center',
                  }}>
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
                    }}>
                      STREAK
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </GlassPanel>

          {/* Level Progress */}
          <GlassPanel hover={false}>
            <h3 style={{
              fontFamily: 'Orbitron, sans-serif',
              fontSize: '1.5rem',
              color: '#00ffff',
              marginBottom: '1.5rem',
            }}>
              LEVEL PROGRESSION
            </h3>
            <div style={{
              marginBottom: '1rem',
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '0.5rem',
                fontFamily: 'monospace',
                fontSize: '0.875rem',
              }}>
                <span style={{ color: '#9ca3af' }}>Level {hunter.level} → {hunter.level + 1}</span>
                <span style={{ color: '#00ffff' }}>{levelProgress.toFixed(1)}%</span>
              </div>
              <div style={{
                height: '20px',
                backgroundColor: 'rgba(0, 255, 255, 0.1)',
                borderRadius: '10px',
                overflow: 'hidden',
                border: '1px solid rgba(0, 255, 255, 0.3)',
              }}>
                <motion.div
                  style={{
                    height: '100%',
                    backgroundColor: '#00ffff',
                    boxShadow: '0 0 10px #00ffff',
                  }}
                  initial={{ width: 0 }}
                  animate={{ width: `${levelProgress}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <div style={{
                marginTop: '0.5rem',
                fontFamily: 'monospace',
                fontSize: '0.75rem',
                color: '#9ca3af',
              }}>
                {hunter.exp} / {hunter.expToNextLevel} EXP
              </div>
            </div>
            <div style={{
              marginTop: '1.5rem',
              paddingTop: '1.5rem',
              borderTop: '1px solid rgba(0, 255, 255, 0.2)',
            }}>
              <div style={{
                fontFamily: 'monospace',
                fontSize: '0.875rem',
                color: '#9ca3af',
              }}>
                <div>Rank: <span style={{ color: '#00ffff' }}>{hunter.rank}</span></div>
                <div style={{ marginTop: '0.5rem' }}>
                  Total Workouts: <span style={{ color: '#00ffff' }}>{hunter.totalWorkouts}</span>
                </div>
                <div style={{ marginTop: '0.5rem' }}>
                  Total Minutes: <span style={{ color: '#00ffff' }}>{hunter.totalMinutes}</span>
                </div>
              </div>
            </div>
          </GlassPanel>
        </div>

        {/* Stats Section */}
        <GlassPanel hover={false} className="mb-6">
          <h3 style={{
            fontFamily: 'Orbitron, sans-serif',
            fontSize: '1.5rem',
            color: '#00ffff',
            marginBottom: '1.5rem',
          }}>
            STATISTICS
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.5rem',
          }}>
            {[
              { name: 'STR', value: hunter.stats.str, progress: statProgress.str, color: '#00ffff' },
              { name: 'VIT', value: hunter.stats.vit, progress: statProgress.vit, color: '#00cccc' },
              { name: 'DEX', value: hunter.stats.dex, progress: statProgress.dex, color: '#00ffcc' },
              { name: 'INT', value: hunter.stats.int, progress: statProgress.int, color: '#00ccff' },
            ].map((stat) => (
              <div key={stat.name}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '0.5rem',
                  fontFamily: 'monospace',
                }}>
                  <span style={{ color: '#9ca3af' }}>{stat.name}</span>
                  <span style={{ color: stat.color }}>{stat.value.toFixed(1)}</span>
                </div>
                <div style={{
                  height: '8px',
                  backgroundColor: 'rgba(0, 255, 255, 0.1)',
                  borderRadius: '4px',
                  overflow: 'hidden',
                }}>
                  <motion.div
                    style={{
                      height: '100%',
                      backgroundColor: stat.color,
                      boxShadow: `0 0 5px ${stat.color}`,
                    }}
                    initial={{ width: 0 }}
                    animate={{ width: `${stat.progress}%` }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </GlassPanel>

        {/* Workout Plans Section */}
        <GlassPanel hover={false} className="mb-6">
          <h3 style={{
            fontFamily: 'Orbitron, sans-serif',
            fontSize: '1.5rem',
            color: '#00ffff',
            marginBottom: '1.5rem',
          }}>
            AVAILABLE WORKOUT PLANS
          </h3>
          {availablePlans.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '2rem',
              color: '#9ca3af',
              fontFamily: 'monospace',
            }}>
              No plans available. Level up to unlock more!
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '1rem',
            }}>
              {availablePlans.map((plan) => (
                <div
                  key={plan.id}
                  style={{
                    padding: '1rem',
                    backgroundColor: 'rgba(0, 255, 255, 0.05)',
                    border: '1px solid rgba(0, 255, 255, 0.3)',
                    borderRadius: '0.5rem',
                  }}
                >
                  <div style={{
                    fontFamily: 'Orbitron, sans-serif',
                    fontSize: '1.125rem',
                    color: '#00ffff',
                    marginBottom: '0.5rem',
                  }}>
                    {plan.name}
                  </div>
                  <div style={{
                    fontSize: '0.875rem',
                    color: '#9ca3af',
                    marginBottom: '0.5rem',
                    fontFamily: 'Rajdhani, sans-serif',
                  }}>
                    {plan.description}
                  </div>
                  <div style={{
                    display: 'flex',
                    gap: '1rem',
                    fontSize: '0.75rem',
                    color: '#9ca3af',
                    fontFamily: 'monospace',
                  }}>
                    <span>{plan.duration} weeks</span>
                    <span>•</span>
                    <span style={{ textTransform: 'capitalize' }}>{plan.difficulty}</span>
                    <span>•</span>
                    <span style={{ textTransform: 'capitalize' }}>{plan.goal}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </GlassPanel>

        {/* Achievements Section */}
        {hunter.achievements.length > 0 && (
          <GlassPanel hover={false}>
            <h3 style={{
              fontFamily: 'Orbitron, sans-serif',
              fontSize: '1.5rem',
              color: '#00ffff',
              marginBottom: '1.5rem',
            }}>
              ACHIEVEMENTS
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: '1rem',
            }}>
              {hunter.achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  style={{
                    padding: '1rem',
                    backgroundColor: 'rgba(255, 215, 0, 0.1)',
                    border: '1px solid rgba(255, 215, 0, 0.3)',
                    borderRadius: '0.5rem',
                  }}
                >
                  <div style={{
                    fontFamily: 'Orbitron, sans-serif',
                    fontSize: '1rem',
                    color: '#ffd700',
                    marginBottom: '0.25rem',
                  }}>
                    {achievement.title}
                  </div>
                  <div style={{
                    fontSize: '0.75rem',
                    color: '#9ca3af',
                    fontFamily: 'Rajdhani, sans-serif',
                  }}>
                    {achievement.description}
                  </div>
                  <div style={{
                    fontSize: '0.625rem',
                    color: '#6b7280',
                    marginTop: '0.5rem',
                    fontFamily: 'monospace',
                  }}>
                    {new Date(achievement.unlockedAt).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </GlassPanel>
        )}
      </div>
    </div>
  );
};

