import { Dungeon, DungeonDifficulty, WorkoutType } from '../types/hunter';
import { calculateExpFromStats, calculateWorkoutStatGains } from './workoutCalculations';

/**
 * Dungeon templates with real workout plans
 * Each dungeon is a structured workout session
 */
const DUNGEON_TEMPLATES: Record<DungeonDifficulty, Array<Omit<Dungeon, 'id' | 'completed'>>> = {
  'instant': [
    {
      name: 'Quick Burst',
      description: 'A rapid 10-minute bodyweight circuit',
      difficulty: 'instant',
      duration: 10,
      workoutPlan: [
        {
          type: 'strength',
          sets: 3,
          reps: 10,
          instructions: 'Push-ups: 3 sets of 10',
        },
        {
          type: 'strength',
          sets: 3,
          reps: 15,
          instructions: 'Bodyweight squats: 3 sets of 15',
        },
        {
          type: 'mobility',
          duration: 2,
          instructions: 'Stretch: 2 minutes full body',
        },
      ],
      expReward: 0, // Calculated dynamically
      unlockedAt: 1,
    },
  ],
  'easy': [
    {
      name: 'Foundation Gate',
      description: 'A beginner-friendly 20-minute session',
      difficulty: 'easy',
      duration: 20,
      workoutPlan: [
        {
          type: 'strength',
          sets: 3,
          reps: 12,
          instructions: 'Push-ups: 3 sets of 12',
        },
        {
          type: 'strength',
          sets: 3,
          reps: 15,
          instructions: 'Bodyweight squats: 3 sets of 15',
        },
        {
          type: 'cardio',
          duration: 5,
          instructions: 'Light jogging in place: 5 minutes',
        },
        {
          type: 'mobility',
          duration: 5,
          instructions: 'Full body stretching: 5 minutes',
        },
      ],
      expReward: 0,
      unlockedAt: 1,
    },
    {
      name: 'Endurance Path',
      description: 'Build cardiovascular foundation',
      difficulty: 'easy',
      duration: 20,
      workoutPlan: [
        {
          type: 'cardio',
          duration: 15,
          instructions: 'Steady-state cardio: 15 minutes (walk, jog, or bike)',
        },
        {
          type: 'mobility',
          duration: 5,
          instructions: 'Cool-down stretching: 5 minutes',
        },
      ],
      expReward: 0,
      unlockedAt: 1,
    },
  ],
  'normal': [
    {
      name: 'Strength Chamber',
      description: 'A focused 35-minute strength session',
      difficulty: 'normal',
      duration: 35,
      workoutPlan: [
        {
          type: 'strength',
          sets: 4,
          reps: 10,
          instructions: 'Push-ups: 4 sets of 10',
        },
        {
          type: 'strength',
          sets: 4,
          reps: 12,
          instructions: 'Bodyweight squats: 4 sets of 12',
        },
        {
          type: 'strength',
          sets: 3,
          reps: 8,
          instructions: 'Plank: 3 sets, hold for 30-60 seconds',
        },
        {
          type: 'cardio',
          duration: 10,
          instructions: 'High-intensity intervals: 10 minutes',
        },
        {
          type: 'mobility',
          duration: 5,
          instructions: 'Recovery stretching: 5 minutes',
        },
      ],
      expReward: 0,
      unlockedAt: 5,
    },
    {
      name: 'Cardio Arena',
      description: 'Intense 40-minute cardiovascular challenge',
      difficulty: 'normal',
      duration: 40,
      workoutPlan: [
        {
          type: 'cardio',
          duration: 30,
          instructions: 'Sustained cardio: 30 minutes (run, bike, or row)',
        },
        {
          type: 'mobility',
          duration: 10,
          instructions: 'Full body mobility: 10 minutes',
        },
      ],
      expReward: 0,
      unlockedAt: 5,
    },
  ],
  'high-rank': [
    {
      name: 'Elite Trial',
      description: 'A comprehensive 50-minute high-intensity session',
      difficulty: 'high-rank',
      duration: 50,
      workoutPlan: [
        {
          type: 'strength',
          sets: 5,
          reps: 15,
          instructions: 'Push-ups: 5 sets of 15',
        },
        {
          type: 'strength',
          sets: 5,
          reps: 20,
          instructions: 'Bodyweight squats: 5 sets of 20',
        },
        {
          type: 'strength',
          sets: 4,
          reps: 12,
          instructions: 'Lunges: 4 sets of 12 per leg',
        },
        {
          type: 'cardio',
          duration: 20,
          instructions: 'High-intensity intervals: 20 minutes',
        },
        {
          type: 'mobility',
          duration: 10,
          instructions: 'Deep stretching and recovery: 10 minutes',
        },
      ],
      expReward: 0,
      unlockedAt: 15,
    },
  ],
};

/**
 * Calculate EXP reward for a dungeon based on its workout plan
 */
const calculateDungeonExp = (dungeon: Omit<Dungeon, 'id' | 'completed'>): number => {
  let totalExp = 0;
  
  // Calculate stat gains for each workout in the plan
  // Assume average intensity of 3 (vigorous) for structured workouts
  dungeon.workoutPlan.forEach((workout) => {
    if (workout.duration) {
      const statGains = calculateWorkoutStatGains(workout.type, workout.duration, 3);
      totalExp += calculateExpFromStats(statGains);
    } else if (workout.sets && workout.reps) {
      // Estimate duration: sets × reps × 0.5 minutes per rep
      const estimatedDuration = workout.sets * workout.reps * 0.5;
      const statGains = calculateWorkoutStatGains(workout.type, estimatedDuration, 3);
      totalExp += calculateExpFromStats(statGains);
    }
  });
  
  // Add bonus for completing a structured dungeon
  return Math.round(totalExp * 1.2); // 20% bonus for structured workouts
};

/**
 * Generate all available dungeons
 */
export const generateDungeons = (): Dungeon[] => {
  const dungeons: Dungeon[] = [];
  
  Object.entries(DUNGEON_TEMPLATES).forEach(([difficulty, templates]) => {
    templates.forEach((template, index) => {
      const expReward = calculateDungeonExp(template);
      dungeons.push({
        ...template,
        id: `dungeon-${difficulty}-${index}`,
        expReward,
        completed: false,
      });
    });
  });
  
  return dungeons;
};

/**
 * Get available dungeons for a hunter's level
 */
export const getAvailableDungeons = (level: number, allDungeons: Dungeon[]): Dungeon[] => {
  return allDungeons.filter((dungeon) => dungeon.unlockedAt <= level);
};

