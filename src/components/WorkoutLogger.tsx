import { useState } from 'react';
import { motion } from 'framer-motion';
import { useHunterStore } from '../store/hunterStore';
import { useNotificationStore } from '../store/notificationStore';
import { calculateWorkoutRewards } from '../utils/workoutCalculations';
import { WorkoutType } from '../types/hunter';
import { GlassPanel } from './GlassPanel';

const WORKOUT_TYPES: { value: WorkoutType; label: string; icon: string }[] = [
  { value: 'strength', label: 'Strength', icon: '💪' },
  { value: 'cardio', label: 'Cardio', icon: '🏃' },
  { value: 'mobility', label: 'Mobility', icon: '🧘' },
];

export const WorkoutLogger = () => {
  const { logWorkout } = useHunterStore();
  const { addNotification } = useNotificationStore();
  const [type, setType] = useState<WorkoutType>('strength');
  const [duration, setDuration] = useState<number>(30);
  const [intensity, setIntensity] = useState<number>(3);
  const [notes, setNotes] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    
    // Small delay for UX feedback
    await new Promise((resolve) => setTimeout(resolve, 300));
    
    // Calculate expected EXP gain for notification
    const { expGained } = calculateWorkoutRewards(type, duration, intensity);
    
    logWorkout(type, duration, intensity, notes || undefined);
    
    addNotification(`Workout logged! +${expGained} EXP`, 'exp');
    
    // Reset form
    setDuration(30);
    setIntensity(3);
    setNotes('');
    setIsSubmitting(false);
  };

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <GlassPanel className="max-w-2xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <h2 className="font-orbitron text-2xl text-system-cyan mb-4">Log Workout</h2>
          <p className="text-sm text-gray-400 font-mono">
            Record your training session to gain stats and EXP
          </p>
        </div>

        {/* Workout Type */}
        <div>
          <label className="block text-sm font-rajdhani text-system-cyan/80 mb-2">
            Workout Type
          </label>
          <div className="grid grid-cols-3 gap-3">
            {WORKOUT_TYPES.map((wt) => (
              <motion.button
                key={wt.value}
                type="button"
                onClick={() => setType(wt.value)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  type === wt.value
                    ? 'border-system-cyan bg-system-cyan/10 shadow-cyan-glow-sm'
                    : 'border-system-cyan/30 bg-black/20'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="text-2xl mb-1">{wt.icon}</div>
                <div className="font-rajdhani text-sm">{wt.label}</div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Duration */}
        <div>
          <label className="block text-sm font-rajdhani text-system-cyan/80 mb-2">
            Duration: {duration} minutes
          </label>
          <input
            type="range"
            min="5"
            max="120"
            step="5"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            className="w-full h-2 bg-system-cyan/20 rounded-lg appearance-none cursor-pointer accent-system-cyan"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>5 min</span>
            <span>120 min</span>
          </div>
        </div>

        {/* Intensity */}
        <div>
          <label className="block text-sm font-rajdhani text-system-cyan/80 mb-2">
            Intensity: {intensity} {intensity === 1 ? 'star' : 'stars'}
          </label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <motion.button
                key={star}
                type="button"
                onClick={() => setIntensity(star)}
                className={`text-2xl transition-all ${
                  star <= intensity
                    ? 'text-system-cyan drop-shadow-[0_0_8px_rgba(0,255,255,0.8)]'
                    : 'text-gray-600'
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                ★
              </motion.button>
            ))}
          </div>
          <div className="text-xs text-gray-500 mt-2 font-mono">
            {intensity === 1 && 'Light effort'}
            {intensity === 2 && 'Moderate effort'}
            {intensity === 3 && 'Vigorous effort'}
            {intensity === 4 && 'High intensity'}
            {intensity === 5 && 'Maximum effort'}
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm font-rajdhani text-system-cyan/80 mb-2">
            Notes (optional)
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Record any details about your workout..."
            className="w-full px-4 py-2 bg-black/30 border border-system-cyan/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-system-cyan focus:shadow-cyan-glow-sm transition-all font-mono text-sm"
            rows={3}
          />
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 bg-system-cyan/20 border-2 border-system-cyan rounded-lg font-orbitron text-system-cyan hover:bg-system-cyan/30 hover:shadow-cyan-glow transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
          whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
        >
          {isSubmitting ? 'PROCESSING...' : 'LOG WORKOUT'}
        </motion.button>
      </form>
    </GlassPanel>
    </div>
  );
};

