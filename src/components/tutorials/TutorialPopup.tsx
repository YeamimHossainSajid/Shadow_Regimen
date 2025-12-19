import { motion, AnimatePresence } from 'framer-motion';
import { ExerciseTutorial } from '../../utils/tutorialData';
import { useHunterStore } from '../../store/hunterStore';
import { useTutorialStore } from '../../store/tutorialStore';
import { useNotificationStore } from '../../store/notificationStore';
import { calculateWorkoutRewards } from '../../utils/workoutCalculations';
import { EXPAnimation } from './EXPAnimation';
import { useState } from 'react';

interface TutorialPopupProps {
  exercise: ExerciseTutorial | null;
  onClose: () => void;
  onComplete?: (x: number, y: number) => void;
}

const TYPE_COLORS = {
  Strength: '#00ffff',
  Cardio: '#ff6b6b',
  Mobility: '#4ecdc4',
};

export const TutorialPopup = ({ exercise, onClose }: TutorialPopupProps) => {
  const { logWorkout } = useHunterStore();
  const { addCompletedExercise, hasCompletedExercise } = useTutorialStore();
  const { addNotification } = useNotificationStore();
  const [showExpAnimation, setShowExpAnimation] = useState(false);
  const [expPosition, setExpPosition] = useState({ x: 0, y: 0 });

  if (!exercise) return null;

  const isCompleted = hasCompletedExercise(exercise.id);
  const typeColor = TYPE_COLORS[exercise.type];

  const handleComplete = (e: React.MouseEvent) => {
    if (isCompleted) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    // Calculate workout rewards
    const duration = exercise.duration || (exercise.reps ? exercise.reps * 0.5 : 5);
    const workoutType = exercise.type === 'Strength' ? 'strength' : 
                       exercise.type === 'Cardio' ? 'cardio' : 'mobility';
    
    const { expGained } = calculateWorkoutRewards(
      workoutType,
      duration,
      exercise.intensity
    );

    // Mark as completed first (to prevent double completion)
    addCompletedExercise(exercise.id, expGained);

    // Log the workout (this will add EXP and update stats)
    logWorkout(workoutType, duration, exercise.intensity, `Completed: ${exercise.name}`);

    // Show EXP animation
    setExpPosition({ x, y });
    setShowExpAnimation(true);

    // Show notification
    addNotification(`Exercise Complete: ${exercise.name}! +${expGained} EXP`, 'exp');

    // Auto-close after a moment
    setTimeout(() => {
      onClose();
    }, 1500);
  };

  return (
    <>
      <AnimatePresence>
        {exercise && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                zIndex: 9998,
              }}
            />

            {/* Popup */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              style={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '90%',
                maxWidth: '600px',
                maxHeight: '90vh',
                backgroundColor: 'rgba(10, 10, 10, 0.95)',
                border: `2px solid ${typeColor}`,
                borderRadius: '1rem',
                padding: '2rem',
                zIndex: 9999,
                overflowY: 'auto',
                boxShadow: `0 0 40px ${typeColor}80`,
              }}
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  border: '2px solid #00ffff',
                  backgroundColor: 'transparent',
                  color: '#00ffff',
                  cursor: 'pointer',
                  fontSize: '1.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(0, 255, 255, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                ×
              </button>

              {/* Header */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                marginBottom: '1.5rem',
              }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  backgroundColor: `${typeColor}20`,
                  border: `2px solid ${typeColor}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2rem',
                }}>
                  {exercise.type === 'Strength' && '💪'}
                  {exercise.type === 'Cardio' && '🏃'}
                  {exercise.type === 'Mobility' && '🧘'}
                </div>
                <div style={{ flex: 1 }}>
                  <h2 style={{
                    fontFamily: 'Orbitron, sans-serif',
                    fontSize: '1.75rem',
                    color: typeColor,
                    marginBottom: '0.25rem',
                  }}>
                    {exercise.name}
                  </h2>
                  <div style={{
                    fontSize: '0.875rem',
                    color: '#9ca3af',
                    fontFamily: 'monospace',
                    textTransform: 'uppercase',
                  }}>
                    {exercise.type} • {exercise.reps ? `${exercise.reps} reps` : `${exercise.duration} min`}
                  </div>
                </div>
              </div>

              {/* Steps */}
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{
                  fontFamily: 'Orbitron, sans-serif',
                  fontSize: '1.125rem',
                  color: '#00ffff',
                  marginBottom: '1rem',
                }}>
                  INSTRUCTIONS
                </h3>
                <ol style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                }}>
                  {exercise.steps.map((step, index) => (
                    <li key={index} style={{
                      marginBottom: '0.75rem',
                      paddingLeft: '1.5rem',
                      position: 'relative',
                      color: '#ffffff',
                      fontFamily: 'Rajdhani, sans-serif',
                      lineHeight: '1.6',
                    }}>
                      <span style={{
                        position: 'absolute',
                        left: 0,
                        color: typeColor,
                        fontFamily: 'monospace',
                        fontWeight: 'bold',
                      }}>
                        {index + 1}.
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>

              {/* Tips */}
              {exercise.tips && exercise.tips.length > 0 && (
                <div style={{
                  marginBottom: '1.5rem',
                  padding: '1rem',
                  backgroundColor: 'rgba(0, 255, 255, 0.05)',
                  border: '1px solid rgba(0, 255, 255, 0.3)',
                  borderRadius: '0.5rem',
                }}>
                  <h3 style={{
                    fontFamily: 'Orbitron, sans-serif',
                    fontSize: '1rem',
                    color: '#00ffff',
                    marginBottom: '0.75rem',
                  }}>
                    TIPS
                  </h3>
                  <ul style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: 0,
                  }}>
                    {exercise.tips.map((tip, index) => (
                      <li key={index} style={{
                        marginBottom: '0.5rem',
                        color: '#d1d5db',
                        fontFamily: 'Rajdhani, sans-serif',
                        fontSize: '0.875rem',
                      }}>
                        • {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Warnings */}
              {exercise.warnings && exercise.warnings.length > 0 && (
                <div style={{
                  marginBottom: '1.5rem',
                  padding: '1rem',
                  backgroundColor: 'rgba(255, 0, 0, 0.1)',
                  border: '1px solid rgba(255, 0, 0, 0.3)',
                  borderRadius: '0.5rem',
                }}>
                  <h3 style={{
                    fontFamily: 'Orbitron, sans-serif',
                    fontSize: '1rem',
                    color: '#ff0000',
                    marginBottom: '0.75rem',
                  }}>
                    WARNINGS
                  </h3>
                  <ul style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: 0,
                  }}>
                    {exercise.warnings.map((warning, index) => (
                      <li key={index} style={{
                        marginBottom: '0.5rem',
                        color: '#ffaaaa',
                        fontFamily: 'Rajdhani, sans-serif',
                        fontSize: '0.875rem',
                      }}>
                        ⚠ {warning}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Complete Button */}
              <motion.button
                onClick={handleComplete}
                disabled={isCompleted}
                style={{
                  width: '100%',
                  padding: '1rem',
                  backgroundColor: isCompleted ? 'rgba(0, 255, 0, 0.2)' : `${typeColor}20`,
                  border: `2px solid ${isCompleted ? '#00ff00' : typeColor}`,
                  borderRadius: '0.5rem',
                  color: isCompleted ? '#00ff00' : typeColor,
                  fontFamily: 'Orbitron, sans-serif',
                  fontSize: '1.125rem',
                  cursor: isCompleted ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s',
                }}
                whileHover={isCompleted ? {} : { 
                  scale: 1.02,
                  boxShadow: `0 0 20px ${typeColor}80`,
                }}
                whileTap={isCompleted ? {} : { scale: 0.98 }}
              >
                {isCompleted ? '✓ COMPLETED' : `MARK COMPLETE (+${exercise.expReward} EXP)`}
              </motion.button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* EXP Animation */}
      {showExpAnimation && (
        <EXPAnimation
          amount={exercise.expReward}
          x={expPosition.x}
          y={expPosition.y}
          onComplete={() => setShowExpAnimation(false)}
        />
      )}
    </>
  );
};

