import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useHunterStore } from '../store/hunterStore';
import { FitnessGoal, DifficultyPreference } from '../types/hunter';
import { GlassPanel } from './GlassPanel';

const FITNESS_GOALS: { value: FitnessGoal; label: string; description: string; icon: string }[] = [
  {
    value: 'balanced',
    label: 'Balanced',
    description: 'Build strength, endurance, and flexibility equally',
    icon: '⚖️',
  },
  {
    value: 'muscle-gain',
    label: 'Muscle Gain',
    description: 'Focus on hypertrophy and strength building',
    icon: '💪',
  },
  {
    value: 'fat-loss',
    label: 'Fat Loss',
    description: 'High-intensity training for maximum calorie burn',
    icon: '🔥',
  },
  {
    value: 'mobility',
    label: 'Mobility & Flexibility',
    description: 'Improve range of motion and movement quality',
    icon: '🧘',
  },
];

const DIFFICULTY_OPTIONS: { value: DifficultyPreference; label: string; description: string }[] = [
  {
    value: 'easy',
    label: 'Easy',
    description: '3-4 workouts per week, 20-30 minutes each',
  },
  {
    value: 'normal',
    label: 'Normal',
    description: '4-5 workouts per week, 30-45 minutes each',
  },
  {
    value: 'hard',
    label: 'Hard',
    description: '5-6 workouts per week, 45-60 minutes each',
  },
];

export const Onboarding = () => {
  const navigate = useNavigate();
  const { completeOnboarding } = useHunterStore();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [name, setName] = useState('');
  const [goal, setGoal] = useState<FitnessGoal | null>(null);
  const [difficulty, setDifficulty] = useState<DifficultyPreference | null>(null);

  const handleComplete = () => {
    if (name && goal && difficulty) {
      completeOnboarding(name, goal, difficulty);
      navigate('/dashboard');
    }
  };

  return (
    <div 
      style={{
        minHeight: '100vh',
        width: '100vw',
        backgroundColor: '#0a0a0a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        position: 'relative',
        zIndex: 1,
        color: '#ffffff',
      }}
    >
      <div className="max-w-4xl w-full" style={{ maxWidth: '56rem', width: '100%' }}>
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <GlassPanel hover={false}>
                <h2 style={{
                  fontFamily: 'Orbitron, sans-serif',
                  fontSize: '1.875rem',
                  color: '#00ffff',
                  marginBottom: '1rem',
                }}>
                  WELCOME, HUNTER
                </h2>
                <p style={{
                  color: '#d1d5db',
                  marginBottom: '1.5rem',
                  fontFamily: 'Rajdhani, sans-serif',
                }}>
                  Before you begin your journey, we need to know your name.
                </p>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full px-4 py-3 bg-black/30 border border-system-cyan/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-system-cyan focus:shadow-cyan-glow-sm transition-all font-rajdhani text-lg"
                  autoFocus
                />
                <motion.button
                  onClick={() => name.trim() && setStep(2)}
                  disabled={!name.trim()}
                  className="mt-6 w-full py-3 bg-system-cyan/20 border-2 border-system-cyan rounded-lg font-orbitron text-system-cyan hover:bg-system-cyan/30 hover:shadow-cyan-glow transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: name.trim() ? 1.02 : 1 }}
                  whileTap={{ scale: name.trim() ? 0.98 : 1 }}
                >
                  CONTINUE
                </motion.button>
              </GlassPanel>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <GlassPanel hover={false}>
                <h2 className="font-orbitron text-3xl text-system-cyan mb-4">
                  SELECT YOUR GOAL
                </h2>
                <p className="text-gray-300 mb-6 font-rajdhani">
                  Choose the path that aligns with your fitness objectives.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {FITNESS_GOALS.map((fg) => (
                    <motion.button
                      key={fg.value}
                      onClick={() => setGoal(fg.value)}
                      className={`p-6 rounded-lg border-2 transition-all text-left ${
                        goal === fg.value
                          ? 'border-system-cyan bg-system-cyan/10 shadow-cyan-glow-sm'
                          : 'border-system-cyan/30 bg-black/20 hover:border-system-cyan/60'
                      }`}
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="text-4xl mb-2">{fg.icon}</div>
                      <div className="font-orbitron text-xl text-system-cyan mb-1">
                        {fg.label}
                      </div>
                      <div className="text-sm text-gray-400 font-rajdhani">
                        {fg.description}
                      </div>
                    </motion.button>
                  ))}
                </div>
                <div className="flex gap-4">
                  <motion.button
                    onClick={() => setStep(1)}
                    className="flex-1 py-3 bg-black/30 border-2 border-system-cyan/30 rounded-lg font-orbitron text-system-cyan/80 hover:border-system-cyan/60 transition-all"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    BACK
                  </motion.button>
                  <motion.button
                    onClick={() => goal && setStep(3)}
                    disabled={!goal}
                    className="flex-1 py-3 bg-system-cyan/20 border-2 border-system-cyan rounded-lg font-orbitron text-system-cyan hover:bg-system-cyan/30 hover:shadow-cyan-glow transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: goal ? 1.02 : 1 }}
                    whileTap={{ scale: goal ? 0.98 : 1 }}
                  >
                    CONTINUE
                  </motion.button>
                </div>
              </GlassPanel>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <GlassPanel hover={false}>
                <h2 className="font-orbitron text-3xl text-system-cyan mb-4">
                  SELECT DIFFICULTY
                </h2>
                <p className="text-gray-300 mb-6 font-rajdhani">
                  Choose your training intensity. You can adjust this later.
                </p>
                <div className="space-y-4 mb-6">
                  {DIFFICULTY_OPTIONS.map((opt) => (
                    <motion.button
                      key={opt.value}
                      onClick={() => setDifficulty(opt.value)}
                      className={`w-full p-6 rounded-lg border-2 transition-all text-left ${
                        difficulty === opt.value
                          ? 'border-system-cyan bg-system-cyan/10 shadow-cyan-glow-sm'
                          : 'border-system-cyan/30 bg-black/20 hover:border-system-cyan/60'
                      }`}
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="font-orbitron text-xl text-system-cyan mb-1">
                        {opt.label}
                      </div>
                      <div className="text-sm text-gray-400 font-rajdhani">
                        {opt.description}
                      </div>
                    </motion.button>
                  ))}
                </div>
                <div className="flex gap-4">
                  <motion.button
                    onClick={() => setStep(2)}
                    className="flex-1 py-3 bg-black/30 border-2 border-system-cyan/30 rounded-lg font-orbitron text-system-cyan/80 hover:border-system-cyan/60 transition-all"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    BACK
                  </motion.button>
                  <motion.button
                    onClick={handleComplete}
                    disabled={!difficulty}
                    className="flex-1 py-3 bg-system-cyan/20 border-2 border-system-cyan rounded-lg font-orbitron text-system-cyan hover:bg-system-cyan/30 hover:shadow-cyan-glow transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: difficulty ? 1.02 : 1 }}
                    whileTap={{ scale: difficulty ? 0.98 : 1 }}
                  >
                    BEGIN JOURNEY
                  </motion.button>
                </div>
              </GlassPanel>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

