import { useState } from 'react';
import { tutorialData, ExerciseTutorial } from '../../utils/tutorialData';
import { TutorialCard } from './TutorialCard';
import { TutorialPopup } from './TutorialPopup';
import { GlassPanel } from '../GlassPanel';

export const TutorialList = () => {
  const [selectedExercise, setSelectedExercise] = useState<ExerciseTutorial | null>(null);
  const [filter, setFilter] = useState<'All' | 'Strength' | 'Cardio' | 'Mobility'>('All');

  const filteredExercises = filter === 'All' 
    ? tutorialData 
    : tutorialData.filter(ex => ex.type === filter);

  const handleCardClick = (exercise: ExerciseTutorial) => {
    setSelectedExercise(exercise);
  };

  const handleClosePopup = () => {
    setSelectedExercise(null);
  };


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
            WORKOUT TUTORIALS
          </h1>
          <p style={{
            color: '#9ca3af',
            fontFamily: 'Rajdhani, sans-serif',
            fontSize: '1.125rem',
          }}>
            Learn proper form and technique for home workouts
          </p>
        </div>

        {/* Filter Buttons */}
        <div style={{ marginBottom: '1.5rem' }}>
          <GlassPanel hover={false}>
          <div style={{
            display: 'flex',
            gap: '0.75rem',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}>
            {(['All', 'Strength', 'Cardio', 'Mobility'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: filter === type ? 'rgba(0, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.3)',
                  border: `2px solid ${filter === type ? '#00ffff' : 'rgba(0, 255, 255, 0.3)'}`,
                  borderRadius: '0.5rem',
                  color: filter === type ? '#00ffff' : '#9ca3af',
                  fontFamily: 'Orbitron, sans-serif',
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                }}
                onMouseEnter={(e) => {
                  if (filter !== type) {
                    e.currentTarget.style.borderColor = '#00ffff';
                    e.currentTarget.style.color = '#00ffff';
                  }
                }}
                onMouseLeave={(e) => {
                  if (filter !== type) {
                    e.currentTarget.style.borderColor = 'rgba(0, 255, 255, 0.3)';
                    e.currentTarget.style.color = '#9ca3af';
                  }
                }}
              >
                {type}
              </button>
            ))}
          </div>
          </GlassPanel>
        </div>

        {/* Exercise Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '1.5rem',
        }}>
          {filteredExercises.map((exercise) => (
            <TutorialCard
              key={exercise.id}
              exercise={exercise}
              onClick={() => handleCardClick(exercise)}
            />
          ))}
        </div>

        {/* Popup Modal */}
        <TutorialPopup
          exercise={selectedExercise}
          onClose={handleClosePopup}
          onComplete={() => {}}
        />
      </div>
    </div>
  );
};

