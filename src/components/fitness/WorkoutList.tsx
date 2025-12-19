import { useState } from 'react';
import { useWorkoutStore } from '../../stores/workoutStore';
import { useHunterStore } from '../../store/hunterStore';
import { ExerciseCard } from './ExerciseCard';
import { ExercisePopup } from './ExercisePopup';
import { GlassPanel } from '../GlassPanel';

export const WorkoutList = () => {
  const { exercises, getCompletedToday } = useWorkoutStore();
  const { hunter } = useHunterStore();
  const [selectedExercise, setSelectedExercise] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'strength' | 'cardio' | 'mobility'>('all');

  const completedToday = getCompletedToday();
  const completedIds = new Set(completedToday.map((ce) => ce.exerciseId));

  const filteredExercises = filter === 'all'
    ? exercises
    : exercises.filter((e) => e.type === filter);

  const selectedExerciseData = selectedExercise
    ? exercises.find((e) => e.id === selectedExercise)
    : null;

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
          marginBottom: '2rem',
          textAlign: 'center',
        }}>
          <h1 style={{
            fontFamily: 'Orbitron, sans-serif',
            fontSize: '3rem',
            color: '#00ffff',
            marginBottom: '1rem',
            textShadow: '0 0 10px #00ffff, 0 0 20px #00ffff',
          }}>
            BODYWEIGHT WORKOUTS
          </h1>
          <p style={{
            color: '#9ca3af',
            fontFamily: 'Rajdhani, sans-serif',
            fontSize: '1.125rem',
          }}>
            Click any exercise to view step-by-step tutorial
          </p>
        </div>

        {/* Filter Buttons */}
        <div style={{
          display: 'flex',
          gap: '1rem',
          marginBottom: '2rem',
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}>
          {(['all', 'strength', 'cardio', 'mobility'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                padding: '0.75rem 1.5rem',
                border: `2px solid ${filter === f ? '#00ffff' : 'rgba(0, 255, 255, 0.3)'}`,
                backgroundColor: filter === f ? 'rgba(0, 255, 255, 0.2)' : 'transparent',
                borderRadius: '0.5rem',
                color: filter === f ? '#00ffff' : '#9ca3af',
                fontFamily: 'Orbitron, sans-serif',
                fontSize: '0.875rem',
                cursor: 'pointer',
                textTransform: 'capitalize',
                transition: 'all 0.3s',
              }}
            >
              {f === 'all' ? 'All Exercises' : f}
            </button>
          ))}
        </div>

        {/* Recommended Exercise */}
        {hunter && (
          <div style={{ marginBottom: '2rem' }}>
            <GlassPanel hover={false}>
              <h2 style={{
                fontFamily: 'Orbitron, sans-serif',
                fontSize: '1.5rem',
                color: '#00ffff',
                marginBottom: '1rem',
              }}>
                ⭐ RECOMMENDED FOR YOU
              </h2>
              {(() => {
                const recommended = useWorkoutStore.getState().getRecommendedExercise(hunter.level);
                if (!recommended) return <div style={{ color: '#9ca3af' }}>Complete exercises to get recommendations!</div>;
                return (
                  <ExerciseCard
                    exercise={recommended}
                    onClick={() => setSelectedExercise(recommended.id)}
                    isCompleted={completedIds.has(recommended.id)}
                  />
                );
              })()}
            </GlassPanel>
          </div>
        )}

        {/* Exercise Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '1.5rem',
        }}>
          {filteredExercises.map((exercise) => (
            <ExerciseCard
              key={exercise.id}
              exercise={exercise}
              onClick={() => setSelectedExercise(exercise.id)}
              isCompleted={completedIds.has(exercise.id)}
            />
          ))}
        </div>

        {/* Exercise Popup */}
        {selectedExerciseData && (
          <ExercisePopup
            exercise={selectedExerciseData}
            onClose={() => setSelectedExercise(null)}
            onComplete={() => {
              setSelectedExercise(null);
              // Refresh to show updated completion status
            }}
          />
        )}
      </div>
    </div>
  );
};

