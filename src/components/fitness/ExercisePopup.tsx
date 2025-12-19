import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BodyweightExercise } from '../../stores/workoutStore';
import { getTutorial } from '../../utils/tutorialData';
import { useHunterStore } from '../../store/hunterStore';
import { useWorkoutStore } from '../../stores/workoutStore';
import { useNotificationStore } from '../../store/notificationStore';
import { FloatingEXP } from '../EXPAnimation';

interface ExercisePopupProps {
  exercise: BodyweightExercise;
  onClose: () => void;
  onComplete: () => void;
}

export const ExercisePopup = ({ exercise, onClose, onComplete }: ExercisePopupProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showCompletion, setShowCompletion] = useState(false);
  const { addExp } = useHunterStore();
  const { completeExercise } = useWorkoutStore();
  const { addNotification } = useNotificationStore();
  const [floatingExp, setFloatingExp] = useState<{ amount: number; position: { x: number; y: number } } | null>(null);

  const tutorial = getTutorial(exercise.id);

  const handleComplete = () => {
    // Play completion sound
    playSound('complete');

    // Complete exercise
    completeExercise(exercise.id);

    // Award EXP and stats
    addExp(exercise.expReward);

    // Show floating EXP
    const rect = document.getElementById('complete-button')?.getBoundingClientRect();
    if (rect) {
      setFloatingExp({
        amount: exercise.expReward,
        position: { x: rect.left + rect.width / 2, y: rect.top },
      });
    }

    // Show notification
    addNotification(`Completed: ${exercise.name}! +${exercise.expReward} EXP`, 'exp');

    // Show completion state
    setShowCompletion(true);

    // Close after delay
    setTimeout(() => {
      onComplete();
      onClose();
    }, 2000);
  };

  const playSound = (type: 'complete' | 'click') => {
    try {
      // Create audio context for sound effects
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      if (type === 'complete') {
        oscillator.frequency.value = 800;
        oscillator.type = 'sine';
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.3);
      } else {
        oscillator.frequency.value = 400;
        oscillator.type = 'square';
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
      }
    } catch (e) {
      // Sound not available, continue silently
    }
  };

  if (showCompletion) {
    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10000,
          }}
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            style={{
              textAlign: 'center',
              color: '#00ffff',
            }}
          >
            <div style={{
              fontSize: '4rem',
              marginBottom: '1rem',
            }}>✓</div>
            <div style={{
              fontFamily: 'Orbitron, sans-serif',
              fontSize: '2rem',
              marginBottom: '0.5rem',
              textShadow: '0 0 20px #00ffff',
            }}>
              EXERCISE COMPLETE!
            </div>
            <div style={{
              fontFamily: 'monospace',
              fontSize: '1.25rem',
              color: '#9ca3af',
            }}>
              +{exercise.expReward} EXP Gained
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <>
      <AnimatePresence>
        {floatingExp && (
          <FloatingEXP
            amount={floatingExp.amount}
            position={floatingExp.position}
            onComplete={() => setFloatingExp(null)}
          />
        )}
      </AnimatePresence>

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
          backdropFilter: 'blur(4px)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem',
        }}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            border: '2px solid #00ffff',
            borderRadius: '1rem',
            padding: '2rem',
            maxWidth: '600px',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            boxShadow: '0 0 30px rgba(0, 255, 255, 0.5)',
          }}
        >
          {/* Header */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1.5rem',
          }}>
            <h2 style={{
              fontFamily: 'Orbitron, sans-serif',
              fontSize: '1.75rem',
              color: '#00ffff',
              margin: 0,
            }}>
              {exercise.name}
            </h2>
            <button
              onClick={onClose}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                border: '1px solid rgba(0, 255, 255, 0.3)',
                backgroundColor: 'transparent',
                color: '#00ffff',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.25rem',
              }}
            >
              ×
            </button>
          </div>

          {/* Exercise Info */}
          <div style={{
            display: 'flex',
            gap: '1rem',
            marginBottom: '1.5rem',
            padding: '1rem',
            backgroundColor: 'rgba(0, 255, 255, 0.05)',
            borderRadius: '0.5rem',
            border: '1px solid rgba(0, 255, 255, 0.2)',
          }}>
            {exercise.reps && (
              <div style={{ fontFamily: 'monospace', fontSize: '0.875rem', color: '#9ca3af' }}>
                <span style={{ color: '#00ffff' }}>{exercise.reps}</span> reps
              </div>
            )}
            {exercise.sets && (
              <div style={{ fontFamily: 'monospace', fontSize: '0.875rem', color: '#9ca3af' }}>
                <span style={{ color: '#00ffff' }}>{exercise.sets}</span> sets
              </div>
            )}
            {exercise.duration && (
              <div style={{ fontFamily: 'monospace', fontSize: '0.875rem', color: '#9ca3af' }}>
                <span style={{ color: '#00ffff' }}>{exercise.duration}</span> min
              </div>
            )}
            <div style={{ fontFamily: 'monospace', fontSize: '0.875rem', color: '#9ca3af', marginLeft: 'auto' }}>
              +<span style={{ color: '#00ffff' }}>{exercise.expReward}</span> EXP
            </div>
          </div>

          {/* Tutorial Steps */}
          {tutorial && (
            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{
                fontFamily: 'Orbitron, sans-serif',
                fontSize: '1.25rem',
                color: '#00ffff',
                marginBottom: '1rem',
              }}>
                How to Perform
              </h3>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
              }}>
                {tutorial.steps.map((step: string, index: number) => (
                  <div
                    key={index}
                    style={{
                      padding: '0.75rem',
                      backgroundColor: index === currentStep ? 'rgba(0, 255, 255, 0.1)' : 'rgba(0, 255, 255, 0.05)',
                      border: `1px solid ${index === currentStep ? '#00ffff' : 'rgba(0, 255, 255, 0.2)'}`,
                      borderRadius: '0.5rem',
                      fontFamily: 'Rajdhani, sans-serif',
                      color: '#ffffff',
                    }}
                  >
                    <span style={{
                      color: '#00ffff',
                      fontFamily: 'monospace',
                      marginRight: '0.5rem',
                    }}>
                      {index + 1}.
                    </span>
                    {step}
                  </div>
                ))}
              </div>
              <div style={{
                display: 'flex',
                gap: '0.5rem',
                marginTop: '1rem',
                justifyContent: 'center',
              }}>
                <button
                  onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                  disabled={currentStep === 0}
                  style={{
                    padding: '0.5rem 1rem',
                    border: '1px solid rgba(0, 255, 255, 0.3)',
                    backgroundColor: currentStep === 0 ? 'transparent' : 'rgba(0, 255, 255, 0.1)',
                    color: currentStep === 0 ? '#666' : '#00ffff',
                    borderRadius: '0.5rem',
                    cursor: currentStep === 0 ? 'not-allowed' : 'pointer',
                    fontFamily: 'Rajdhani, sans-serif',
                  }}
                >
                  Previous
                </button>
                <button
                  onClick={() => setCurrentStep(Math.min(tutorial.steps.length - 1, currentStep + 1))}
                  disabled={currentStep === tutorial.steps.length - 1}
                  style={{
                    padding: '0.5rem 1rem',
                    border: '1px solid rgba(0, 255, 255, 0.3)',
                    backgroundColor: currentStep === tutorial.steps.length - 1 ? 'transparent' : 'rgba(0, 255, 255, 0.1)',
                    color: currentStep === tutorial.steps.length - 1 ? '#666' : '#00ffff',
                    borderRadius: '0.5rem',
                    cursor: currentStep === tutorial.steps.length - 1 ? 'not-allowed' : 'pointer',
                    fontFamily: 'Rajdhani, sans-serif',
                  }}
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {/* Tips */}
          {tutorial && tutorial.tips && tutorial.tips.length > 0 && (
            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{
                fontFamily: 'Orbitron, sans-serif',
                fontSize: '1.125rem',
                color: '#4ecdc4',
                marginBottom: '0.75rem',
              }}>
                💡 Tips
              </h3>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
              }}>
                {tutorial.tips.map((tip: string, index: number) => (
                  <li
                    key={index}
                    style={{
                      padding: '0.5rem',
                      fontFamily: 'Rajdhani, sans-serif',
                      fontSize: '0.875rem',
                      color: '#d1d5db',
                      marginBottom: '0.25rem',
                    }}
                  >
                    • {tip}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Warnings */}
          {tutorial && tutorial.warnings && tutorial.warnings.length > 0 && (
            <div style={{
              marginBottom: '1.5rem',
              padding: '1rem',
              backgroundColor: 'rgba(255, 0, 0, 0.1)',
              border: '1px solid rgba(255, 0, 0, 0.3)',
              borderRadius: '0.5rem',
            }}>
              <h3 style={{
                fontFamily: 'Orbitron, sans-serif',
                fontSize: '1.125rem',
                color: '#ff6b6b',
                marginBottom: '0.75rem',
              }}>
                ⚠️ Warnings
              </h3>
              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
              }}>
                {tutorial.warnings.map((warning: string, index: number) => (
                  <li
                    key={index}
                    style={{
                      padding: '0.5rem',
                      fontFamily: 'Rajdhani, sans-serif',
                      fontSize: '0.875rem',
                      color: '#ffcccc',
                      marginBottom: '0.25rem',
                    }}
                  >
                    • {warning}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Complete Button */}
          <motion.button
            id="complete-button"
            onClick={handleComplete}
            style={{
              width: '100%',
              padding: '1rem',
              backgroundColor: 'rgba(0, 255, 255, 0.2)',
              border: '2px solid #00ffff',
              borderRadius: '0.5rem',
              color: '#00ffff',
              fontFamily: 'Orbitron, sans-serif',
              fontSize: '1.125rem',
              cursor: 'pointer',
              boxShadow: '0 0 20px rgba(0, 255, 255, 0.3)',
            }}
            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(0, 255, 255, 0.5)' }}
            whileTap={{ scale: 0.95 }}
          >
            COMPLETE EXERCISE
          </motion.button>
        </motion.div>
      </motion.div>
    </>
  );
};

