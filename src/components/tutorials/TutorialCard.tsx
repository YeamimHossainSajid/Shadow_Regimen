import { motion } from 'framer-motion';
import { ExerciseTutorial } from '../../utils/tutorialData';
import { useTutorialStore } from '../../store/tutorialStore';

interface TutorialCardProps {
  exercise: ExerciseTutorial;
  onClick: () => void;
}

const TYPE_COLORS = {
  Strength: '#00ffff',
  Cardio: '#ff6b6b',
  Mobility: '#4ecdc4',
};

const INTENSITY_STARS = '★★★★★';

export const TutorialCard = ({ exercise, onClick }: TutorialCardProps) => {
  const { hasCompletedExercise } = useTutorialStore();
  const isCompleted = hasCompletedExercise(exercise.id);
  const typeColor = TYPE_COLORS[exercise.type];

  return (
    <motion.div
      onClick={onClick}
      style={{
        padding: '1.5rem',
        backgroundColor: isCompleted ? 'rgba(0, 255, 0, 0.1)' : 'rgba(0, 0, 0, 0.4)',
        border: `2px solid ${isCompleted ? 'rgba(0, 255, 0, 0.5)' : `${typeColor}40`}`,
        borderRadius: '0.75rem',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
      }}
      whileHover={{ 
        scale: 1.02, 
        y: -4,
        borderColor: typeColor,
        boxShadow: `0 0 20px ${typeColor}80`,
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      {isCompleted && (
        <div style={{
          position: 'absolute',
          top: '0.5rem',
          right: '0.5rem',
          fontSize: '1.5rem',
        }}>
          ✓
        </div>
      )}
      
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        marginBottom: '1rem',
      }}>
        <div style={{
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          backgroundColor: `${typeColor}20`,
          border: `2px solid ${typeColor}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.5rem',
        }}>
          {exercise.type === 'Strength' && '💪'}
          {exercise.type === 'Cardio' && '🏃'}
          {exercise.type === 'Mobility' && '🧘'}
        </div>
        <div style={{ flex: 1 }}>
          <h3 style={{
            fontFamily: 'Orbitron, sans-serif',
            fontSize: '1.25rem',
            color: typeColor,
            marginBottom: '0.25rem',
          }}>
            {exercise.name}
          </h3>
          <div style={{
            fontSize: '0.75rem',
            color: '#9ca3af',
            fontFamily: 'monospace',
            textTransform: 'uppercase',
          }}>
            {exercise.type}
          </div>
        </div>
      </div>

      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '1rem',
        paddingTop: '1rem',
        borderTop: `1px solid ${typeColor}30`,
      }}>
        <div style={{
          fontSize: '0.875rem',
          color: '#9ca3af',
          fontFamily: 'monospace',
        }}>
          {exercise.reps ? `${exercise.reps} reps` : `${exercise.duration} min`}
        </div>
        <div style={{
          fontSize: '0.875rem',
          color: typeColor,
          fontFamily: 'monospace',
        }}>
          {INTENSITY_STARS.slice(0, exercise.intensity)}
        </div>
        <div style={{
          fontSize: '0.875rem',
          color: '#00ffff',
          fontFamily: 'monospace',
        }}>
          +{exercise.expReward} EXP
        </div>
      </div>
    </motion.div>
  );
};

