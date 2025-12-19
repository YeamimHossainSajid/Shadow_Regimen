import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassPanel } from './GlassPanel';

interface Tutorial {
  id: string;
  title: string;
  category: 'warmup' | 'progressive' | 'recovery' | 'mobility';
  content: string[];
}

const TUTORIALS: Tutorial[] = [
  {
    id: 'warmup',
    title: 'Warm-Up Guidelines',
    category: 'warmup',
    content: [
      'Always warm up for 5-10 minutes before intense exercise',
      'Start with light cardio (walking, jogging in place)',
      'Include dynamic stretches: arm circles, leg swings, torso twists',
      'Gradually increase intensity to prepare your body',
      'A proper warm-up reduces injury risk and improves performance',
    ],
  },
  {
    id: 'progressive',
    title: 'Progressive Overload Principles',
    category: 'progressive',
    content: [
      'Progressive overload is the key to continuous improvement',
      'Increase difficulty gradually: more reps, more weight, or longer duration',
      'Track your progress to ensure you\'re challenging yourself',
      'Aim for 2-5% improvement per week',
      'If a workout feels too easy, it\'s time to progress',
      'Listen to your body and progress safely',
    ],
  },
  {
    id: 'recovery',
    title: 'Recovery & Hydration',
    category: 'recovery',
    content: [
      'Recovery is when your body adapts and grows stronger',
      'Aim for 7-9 hours of quality sleep per night',
      'Stay hydrated: drink water before, during, and after workouts',
      'Allow 48 hours between intense sessions for the same muscle groups',
      'Active recovery (light walking, stretching) can aid recovery',
      'Nutrition matters: eat protein and carbs post-workout',
    ],
  },
  {
    id: 'mobility',
    title: 'Mobility Basics',
    category: 'mobility',
    content: [
      'Mobility improves movement quality and reduces injury risk',
      'Stretch after workouts when muscles are warm',
      'Hold static stretches for 30-90 seconds',
      'Never force a stretch - discomfort is okay, pain is not',
      'Focus on major muscle groups: hips, shoulders, spine',
      'Consistency beats intensity: 10 minutes daily > 1 hour weekly',
    ],
  },
];

export const Tutorials = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const selectedTutorial = TUTORIALS.find((t) => t.id === selectedCategory);

  return (
    <div className="space-y-6">
      <GlassPanel hover={false}>
        <h2 className="font-orbitron text-2xl text-system-cyan mb-4">
          FITNESS TUTORIALS
        </h2>
        <p className="text-sm text-gray-400 mb-6 font-rajdhani">
          Learn the fundamentals of effective training.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {TUTORIALS.map((tutorial) => (
            <motion.button
              key={tutorial.id}
              onClick={() => setSelectedCategory(tutorial.id === selectedCategory ? null : tutorial.id)}
              className={`p-4 rounded-lg border-2 text-left transition-all ${
                selectedCategory === tutorial.id
                  ? 'border-system-cyan bg-system-cyan/10 shadow-cyan-glow-sm'
                  : 'border-system-cyan/30 bg-black/20 hover:border-system-cyan/60'
              }`}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="font-orbitron text-lg text-system-cyan mb-2">
                {tutorial.title}
              </div>
              <div className="text-xs text-gray-400 font-mono capitalize">
                {tutorial.category}
              </div>
            </motion.button>
          ))}
        </div>
      </GlassPanel>

      {/* Tutorial Details */}
      <AnimatePresence>
        {selectedTutorial && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <GlassPanel hover={false}>
              <h3 className="font-orbitron text-xl text-system-cyan mb-4">
                {selectedTutorial.title}
              </h3>
              <ul className="space-y-3">
                {selectedTutorial.content.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-system-cyan font-mono">•</span>
                    <span className="text-gray-300 font-rajdhani text-sm flex-1">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </GlassPanel>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

