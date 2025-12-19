import { motion } from 'framer-motion';
import { BodyweightExercise } from '../../stores/workoutStore';
import { GlassPanel } from '../GlassPanel';

interface ExerciseCardProps {
  exercise: BodyweightExercise;
  onClick: () => void;
  isCompleted?: boolean;
}

export const ExerciseCard = ({ exercise, onClick, isCompleted = false }: ExerciseCardProps) => {
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'strength':
        return '#00ffff';
      case 'cardio':
        return '#ff6b6b';
      case 'mobility':
        return '#4ecdc4';
      default:
        return '#00ffff';
    }
  };

  const getIntensityStars = (intensity: number) => {
    return '★'.repeat(intensity) + '☆'.repeat(5 - intensity);
  };

  return (
    <motion.div
      onClick={onClick}
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      style={{ cursor: 'pointer' }}
    >
      <GlassPanel
        hover={true}
        className={isCompleted ? 'opacity-60' : ''}
        style={{
          borderColor: isCompleted ? 'rgba(0, 255, 0, 0.5)' : `rgba(0, 255, 255, 0.3)`,
          backgroundColor: isCompleted ? 'rgba(0, 255, 0, 0.05)' : 'rgba(0, 0, 0, 0.4)',
        }}
      >
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '0.75rem',
        }}>
          <div style={{ flex: 1 }}>
            <h3 style={{
              fontFamily: 'Orbitron, sans-serif',
              fontSize: '1.25rem',
              color: getTypeColor(exercise.type),
              marginBottom: '0.5rem',
              textTransform: 'capitalize',
            }}>
              {exercise.name}
              {isCompleted && <span style={{ marginLeft: '0.5rem', color: '#00ff00' }}>✓</span>}
            </h3>
            <div style={{
              display: 'inline-block',
              padding: '0.25rem 0.5rem',
              backgroundColor: `${getTypeColor(exercise.type)}20`,
              border: `1px solid ${getTypeColor(exercise.type)}40`,
              borderRadius: '0.25rem',
              fontSize: '0.75rem',
              fontFamily: 'Rajdhani, sans-serif',
              color: getTypeColor(exercise.type),
              marginBottom: '0.5rem',
              textTransform: 'capitalize',
            }}>
              {exercise.type}
            </div>
          </div>
          <div style={{
            textAlign: 'right',
            fontFamily: 'monospace',
            fontSize: '0.875rem',
            color: '#00ffff',
          }}>
            <div style={{ fontWeight: 'bold' }}>+{exercise.expReward}</div>
            <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>EXP</div>
          </div>
        </div>

        <div style={{
          display: 'flex',
          gap: '1rem',
          marginBottom: '0.75rem',
          fontFamily: 'monospace',
          fontSize: '0.875rem',
          color: '#9ca3af',
        }}>
          {exercise.reps && (
            <div>
              <span style={{ color: '#00ffff' }}>{exercise.reps}</span> reps
            </div>
          )}
          {exercise.sets && (
            <div>
              <span style={{ color: '#00ffff' }}>{exercise.sets}</span> sets
            </div>
          )}
          {exercise.duration && (
            <div>
              <span style={{ color: '#00ffff' }}>{exercise.duration}</span> min
            </div>
          )}
        </div>

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <div>
            <div style={{
              fontSize: '0.75rem',
              color: '#9ca3af',
              marginBottom: '0.25rem',
              fontFamily: 'Rajdhani, sans-serif',
            }}>
              Intensity
            </div>
            <div style={{
              color: '#00ffff',
              fontSize: '0.875rem',
            }}>
              {getIntensityStars(exercise.intensity)}
            </div>
          </div>
          <div style={{
            fontSize: '0.75rem',
            color: '#9ca3af',
            fontFamily: 'monospace',
            textTransform: 'capitalize',
          }}>
            {exercise.difficulty}
          </div>
        </div>

        {exercise.description && (
          <div style={{
            marginTop: '0.75rem',
            paddingTop: '0.75rem',
            borderTop: '1px solid rgba(0, 255, 255, 0.2)',
            fontSize: '0.875rem',
            color: '#d1d5db',
            fontFamily: 'Rajdhani, sans-serif',
          }}>
            {exercise.description}
          </div>
        )}
      </GlassPanel>
    </motion.div>
  );
};

