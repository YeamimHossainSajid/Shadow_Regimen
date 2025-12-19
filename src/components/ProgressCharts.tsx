import { useMemo } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useHunterStore } from '../store/hunterStore';
import { GlassPanel } from './GlassPanel';

export const ProgressCharts = () => {
  const { hunter } = useHunterStore();

  if (!hunter) return null;

  // Prepare weekly data (last 7 days)
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
      
      days.push({
        date: date.toLocaleDateString('en-US', { weekday: 'short' }),
        workouts: dayWorkouts.length,
        exp: dayWorkouts.reduce((sum, w) => sum + w.expGained, 0),
        minutes: dayWorkouts.reduce((sum, w) => sum + w.duration, 0),
      });
    }
    
    return days;
  }, [hunter.workouts]);

  // Prepare stat progression (last 10 workouts)
  const statData = useMemo(() => {
    const recentWorkouts = hunter.workouts.slice(-10);
    return recentWorkouts.map((w, idx) => ({
      workout: `W${idx + 1}`,
      STR: w.statGains.str,
      VIT: w.statGains.vit,
      DEX: w.statGains.dex,
      INT: w.statGains.int,
    }));
  }, [hunter.workouts]);

  const chartColor = '#00ffff';

  return (
    <div className="space-y-6">
      {/* Weekly Activity Chart */}
      <GlassPanel hover={false}>
        <h2 className="font-orbitron text-2xl text-system-cyan mb-4">
          WEEKLY ACTIVITY
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={weeklyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#00ffff20" />
            <XAxis dataKey="date" stroke="#00ffff80" style={{ fontSize: '12px' }} />
            <YAxis stroke="#00ffff80" style={{ fontSize: '12px' }} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#0a0a0a',
                border: '1px solid #00ffff',
                borderRadius: '8px',
                color: '#00ffff',
              }}
            />
            <Bar dataKey="workouts" fill={chartColor} name="Workouts" />
            <Bar dataKey="exp" fill="#00cccc" name="EXP Gained" />
          </BarChart>
        </ResponsiveContainer>
      </GlassPanel>

      {/* Stat Progression Chart */}
      <GlassPanel hover={false}>
        <h2 className="font-orbitron text-2xl text-system-cyan mb-4">
          STAT PROGRESSION
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={statData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#00ffff20" />
            <XAxis dataKey="workout" stroke="#00ffff80" style={{ fontSize: '12px' }} />
            <YAxis stroke="#00ffff80" style={{ fontSize: '12px' }} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#0a0a0a',
                border: '1px solid #00ffff',
                borderRadius: '8px',
                color: '#00ffff',
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
  );
};

