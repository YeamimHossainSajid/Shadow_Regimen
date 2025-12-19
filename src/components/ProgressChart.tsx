import { useMemo } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useHunterStore } from '../store/hunterStore';
import { useWorkoutStore } from '../stores/workoutStore';
import { GlassPanel } from './GlassPanel';

export const ProgressChart = () => {
  const { hunter } = useHunterStore();
  const { completedExercises } = useWorkoutStore();

  if (!hunter) return null;

  // Weekly data (last 7 days)
  const weeklyData = useMemo(() => {
    const days = [];
    const today = new Date();
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      
      const dayWorkouts = hunter.workouts.filter((w) => {
        const workoutDate = new Date(w.createdAt).toISOString().split('T')[0];
        return workoutDate === dateStr;
      });
      
      const dayExercises = completedExercises.filter((ce) => {
        const exerciseDate = new Date(ce.completedAt).toISOString().split('T')[0];
        return exerciseDate === dateStr;
      });
      
      days.push({
        date: date.toLocaleDateString('en-US', { weekday: 'short' }),
        workouts: dayWorkouts.length,
        exercises: dayExercises.length,
        exp: dayWorkouts.reduce((sum, w) => sum + w.expGained, 0) + 
             dayExercises.reduce((sum, e) => sum + e.expGained, 0),
        minutes: dayWorkouts.reduce((sum, w) => sum + w.duration, 0),
      });
    }
    
    return days;
  }, [hunter.workouts, completedExercises]);

  // Stat progression (last 10 activities)
  const statData = useMemo(() => {
    const recentWorkouts = hunter.workouts.slice(-10);
    return recentWorkouts.map((w, idx) => ({
      activity: `A${idx + 1}`,
      STR: w.statGains.str,
      VIT: w.statGains.vit,
      DEX: w.statGains.dex,
      INT: w.statGains.int,
    }));
  }, [hunter.workouts]);

  const chartColor = '#00ffff';

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
        <h1 style={{
          fontFamily: 'Orbitron, sans-serif',
          fontSize: '3rem',
          color: '#00ffff',
          marginBottom: '2rem',
          textAlign: 'center',
          textShadow: '0 0 10px #00ffff, 0 0 20px #00ffff',
        }}>
          PROGRESS ANALYTICS
        </h1>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Weekly Activity Chart */}
          <GlassPanel hover={false}>
            <h2 style={{
              fontFamily: 'Orbitron, sans-serif',
              fontSize: '1.5rem',
              color: '#00ffff',
              marginBottom: '1rem',
            }}>
              WEEKLY ACTIVITY
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#00ffff20" />
                <XAxis 
                  dataKey="date" 
                  stroke="#00ffff80" 
                  style={{ fontSize: '12px', fontFamily: 'monospace' }} 
                />
                <YAxis 
                  stroke="#00ffff80" 
                  style={{ fontSize: '12px', fontFamily: 'monospace' }} 
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0a0a0a',
                    border: '1px solid #00ffff',
                    borderRadius: '8px',
                    color: '#00ffff',
                    fontFamily: 'monospace',
                  }}
                />
                <Bar dataKey="workouts" fill={chartColor} name="Workouts" />
                <Bar dataKey="exercises" fill="#00cccc" name="Exercises" />
                <Bar dataKey="exp" fill="#00ffcc" name="EXP" />
              </BarChart>
            </ResponsiveContainer>
          </GlassPanel>

          {/* Stat Progression Chart */}
          <GlassPanel hover={false}>
            <h2 style={{
              fontFamily: 'Orbitron, sans-serif',
              fontSize: '1.5rem',
              color: '#00ffff',
              marginBottom: '1rem',
            }}>
              STAT PROGRESSION
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={statData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#00ffff20" />
                <XAxis 
                  dataKey="activity" 
                  stroke="#00ffff80" 
                  style={{ fontSize: '12px', fontFamily: 'monospace' }} 
                />
                <YAxis 
                  stroke="#00ffff80" 
                  style={{ fontSize: '12px', fontFamily: 'monospace' }} 
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0a0a0a',
                    border: '1px solid #00ffff',
                    borderRadius: '8px',
                    color: '#00ffff',
                    fontFamily: 'monospace',
                  }}
                />
                <Legend />
                <Line type="monotone" dataKey="STR" stroke="#00ffff" strokeWidth={2} name="STR" />
                <Line type="monotone" dataKey="VIT" stroke="#00cccc" strokeWidth={2} name="VIT" />
                <Line type="monotone" dataKey="DEX" stroke="#00ffcc" strokeWidth={2} name="DEX" />
                <Line type="monotone" dataKey="INT" stroke="#00ccff" strokeWidth={2} name="INT" />
              </LineChart>
            </ResponsiveContainer>
          </GlassPanel>
        </div>
      </div>
    </div>
  );
};

