import { useState } from 'react';
import { motion } from 'framer-motion';
import { useHunterStore } from '../store/hunterStore';
import { getAvailablePlans } from '../utils/workoutPlans';
import { GlassPanel } from './GlassPanel';

export const WorkoutPlanNavigator = () => {
  const { hunter } = useHunterStore();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  if (!hunter) return null;

  const availablePlans = getAvailablePlans(hunter.level, hunter.goal, hunter.difficulty);

  const selectedPlanData = availablePlans.find((p) => p.id === selectedPlan);

  return (
    <div className="space-y-6">
      <GlassPanel hover={false}>
        <h2 className="font-orbitron text-2xl text-system-cyan mb-4">
          WORKOUT PLANS
        </h2>
        <p className="text-sm text-gray-400 mb-6 font-rajdhani">
          Structured training programs tailored to your goal and level.
        </p>

        {availablePlans.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-400 font-rajdhani">
              No plans available yet. Level up to unlock more!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {availablePlans.map((plan) => (
              <motion.button
                key={plan.id}
                onClick={() => setSelectedPlan(plan.id === selectedPlan ? null : plan.id)}
                className={`p-4 rounded-lg border-2 text-left transition-all ${
                  selectedPlan === plan.id
                    ? 'border-system-cyan bg-system-cyan/10 shadow-cyan-glow-sm'
                    : 'border-system-cyan/30 bg-black/20 hover:border-system-cyan/60'
                }`}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="font-orbitron text-lg text-system-cyan mb-1">
                  {plan.name}
                </div>
                <div className="text-xs text-gray-400 mb-2 font-rajdhani">
                  {plan.description}
                </div>
                <div className="flex items-center gap-4 text-xs text-system-cyan/80 font-mono">
                  <span>{plan.duration} weeks</span>
                  <span>•</span>
                  <span>{plan.difficulty}</span>
                </div>
              </motion.button>
            ))}
          </div>
        )}
      </GlassPanel>

      {/* Plan Details */}
      {selectedPlanData && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <GlassPanel hover={false}>
            <h3 className="font-orbitron text-xl text-system-cyan mb-4">
              {selectedPlanData.name}
            </h3>
            <p className="text-gray-300 mb-6 font-rajdhani">
              {selectedPlanData.description}
            </p>

            {/* Weekly Schedule */}
            <div className="mb-6">
              <h4 className="font-rajdhani text-lg text-system-cyan mb-3">
                Weekly Schedule
              </h4>
              <div className="space-y-3">
                {selectedPlanData.weeklySchedule.map((day, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-black/20 rounded-lg border border-system-cyan/20"
                  >
                    <div className="font-mono text-sm text-system-cyan mb-2">
                      Day {day.day}
                    </div>
                    {day.workouts.map((workout, wIdx) => (
                      <div key={wIdx} className="mb-2 last:mb-0">
                        <div className="font-rajdhani text-sm text-white mb-1">
                          {workout.name} ({workout.duration} min)
                        </div>
                        <div className="text-xs text-gray-400 font-mono">
                          {workout.instructions}
                        </div>
                        <div className="text-xs text-system-cyan/80 mt-1">
                          Focus: {workout.focus}
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Tips */}
            <div>
              <h4 className="font-rajdhani text-lg text-system-cyan mb-3">Tips</h4>
              <ul className="space-y-2">
                {selectedPlanData.tips.map((tip, idx) => (
                  <li key={idx} className="text-sm text-gray-300 font-mono">
                    • {tip}
                  </li>
                ))}
              </ul>
            </div>
          </GlassPanel>
        </motion.div>
      )}
    </div>
  );
};

