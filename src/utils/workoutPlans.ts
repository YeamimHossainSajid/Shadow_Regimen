import { WorkoutPlan } from '../types/workoutPlan';

/**
 * Pre-defined workout plans based on fitness goals
 * These are grounded in fitness science and progressive overload principles
 */
export const WORKOUT_PLANS: WorkoutPlan[] = [
  // Balanced Plans
  {
    id: 'balanced-beginner',
    name: 'Foundation Builder',
    description: 'A well-rounded plan focusing on strength, cardio, and mobility. Perfect for building a solid fitness base.',
    goal: 'balanced',
    difficulty: 'easy',
    unlockedAt: 1,
    duration: 4,
    weeklySchedule: [
      {
        day: 1, // Monday
        workouts: [
          {
            type: 'strength',
            name: 'Upper Body Strength',
            duration: 30,
            instructions: 'Push-ups: 3 sets of 10-12, Bodyweight rows: 3 sets of 10, Plank: 3 sets of 30-60s',
            focus: 'Chest, back, core',
          },
        ],
      },
      {
        day: 2, // Tuesday
        workouts: [
          {
            type: 'cardio',
            name: 'Cardio Session',
            duration: 20,
            instructions: 'Steady-state cardio: walk, jog, or bike for 20 minutes',
            focus: 'Cardiovascular endurance',
          },
        ],
      },
      {
        day: 3, // Wednesday
        workouts: [
          {
            type: 'mobility',
            name: 'Full Body Mobility',
            duration: 25,
            instructions: 'Dynamic warm-up, full body stretching, yoga flow',
            focus: 'Flexibility and recovery',
          },
        ],
      },
      {
        day: 4, // Thursday
        workouts: [
          {
            type: 'strength',
            name: 'Lower Body Strength',
            duration: 30,
            instructions: 'Squats: 3 sets of 12-15, Lunges: 3 sets of 10 per leg, Glute bridges: 3 sets of 12',
            focus: 'Legs and glutes',
          },
        ],
      },
      {
        day: 5, // Friday
        workouts: [
          {
            type: 'cardio',
            name: 'Interval Training',
            duration: 20,
            instructions: 'High-intensity intervals: 30s work, 30s rest, repeat 10 times',
            focus: 'Anaerobic capacity',
          },
        ],
      },
    ],
    tips: [
      'Focus on form over speed',
      'Rest 60-90 seconds between sets',
      'Progressive overload: increase reps or difficulty each week',
    ],
  },
  
  // Muscle Gain Plans
  {
    id: 'muscle-hypertrophy',
    name: 'Hypertrophy Split',
    description: 'Designed for muscle growth through progressive overload and volume training.',
    goal: 'muscle-gain',
    difficulty: 'normal',
    unlockedAt: 5,
    duration: 6,
    weeklySchedule: [
      {
        day: 1,
        workouts: [
          {
            type: 'strength',
            name: 'Push Day',
            duration: 45,
            instructions: 'Push-ups variations: 4 sets, Dips: 3 sets, Shoulder press: 3 sets, Tricep work: 3 sets',
            focus: 'Chest, shoulders, triceps',
          },
        ],
      },
      {
        day: 2,
        workouts: [
          {
            type: 'strength',
            name: 'Pull Day',
            duration: 45,
            instructions: 'Pull-ups/rows: 4 sets, Bicep curls: 3 sets, Back extensions: 3 sets',
            focus: 'Back, biceps',
          },
        ],
      },
      {
        day: 3,
        workouts: [
          {
            type: 'mobility',
            name: 'Active Recovery',
            duration: 20,
            instructions: 'Light stretching and mobility work',
            focus: 'Recovery',
          },
        ],
      },
      {
        day: 4,
        workouts: [
          {
            type: 'strength',
            name: 'Leg Day',
            duration: 50,
            instructions: 'Squats: 4 sets, Lunges: 3 sets, Deadlift variations: 3 sets, Calf raises: 3 sets',
            focus: 'Full lower body',
          },
        ],
      },
      {
        day: 5,
        workouts: [
          {
            type: 'cardio',
            name: 'Light Cardio',
            duration: 20,
            instructions: 'Low-intensity steady-state cardio',
            focus: 'Recovery and conditioning',
          },
        ],
      },
    ],
    tips: [
      'Train to near failure (1-2 reps in reserve)',
      'Rest 2-3 minutes between sets',
      'Increase weight or reps weekly',
      'Eat in a slight caloric surplus for growth',
    ],
  },
  
  // Fat Loss Plans
  {
    id: 'fat-loss-hiit',
    name: 'HIIT Fat Burner',
    description: 'High-intensity interval training designed to maximize calorie burn and metabolic rate.',
    goal: 'fat-loss',
    difficulty: 'normal',
    unlockedAt: 5,
    duration: 4,
    weeklySchedule: [
      {
        day: 1,
        workouts: [
          {
            type: 'cardio',
            name: 'HIIT Circuit',
            duration: 30,
            instructions: '20s work, 10s rest: Burpees, Mountain climbers, Jump squats, High knees. 4 rounds',
            focus: 'Full body conditioning',
          },
        ],
      },
      {
        day: 2,
        workouts: [
          {
            type: 'strength',
            name: 'Full Body Strength',
            duration: 35,
            instructions: 'Compound movements: Squats, Push-ups, Rows, Planks. 3 sets each',
            focus: 'Muscle preservation',
          },
        ],
      },
      {
        day: 3,
        workouts: [
          {
            type: 'cardio',
            name: 'Steady State',
            duration: 40,
            instructions: 'Moderate-intensity cardio: run, bike, or row',
            focus: 'Aerobic base',
          },
        ],
      },
      {
        day: 4,
        workouts: [
          {
            type: 'cardio',
            name: 'HIIT Circuit',
            duration: 30,
            instructions: '20s work, 10s rest: Burpees, Mountain climbers, Jump squats, High knees. 4 rounds',
            focus: 'Full body conditioning',
          },
        ],
      },
      {
        day: 5,
        workouts: [
          {
            type: 'mobility',
            name: 'Recovery & Mobility',
            duration: 25,
            instructions: 'Full body stretching and foam rolling',
            focus: 'Recovery',
          },
        ],
      },
    ],
    tips: [
      'Maintain intensity during work periods',
      'Stay in caloric deficit for fat loss',
      'Prioritize protein intake',
      'Allow 48 hours between HIIT sessions',
    ],
  },
  
  // Mobility Plans
  {
    id: 'mobility-flow',
    name: 'Mobility Flow',
    description: 'Focus on flexibility, joint health, and movement quality. Perfect for recovery and injury prevention.',
    goal: 'mobility',
    difficulty: 'easy',
    unlockedAt: 1,
    duration: 4,
    weeklySchedule: [
      {
        day: 1,
        workouts: [
          {
            type: 'mobility',
            name: 'Upper Body Flow',
            duration: 30,
            instructions: 'Shoulder circles, arm swings, chest openers, neck stretches, wrist mobility',
            focus: 'Upper body mobility',
          },
        ],
      },
      {
        day: 2,
        workouts: [
          {
            type: 'mobility',
            name: 'Lower Body Flow',
            duration: 30,
            instructions: 'Hip circles, leg swings, quad stretches, hamstring stretches, ankle mobility',
            focus: 'Lower body mobility',
          },
        ],
      },
      {
        day: 3,
        workouts: [
          {
            type: 'mobility',
            name: 'Yoga Flow',
            duration: 35,
            instructions: 'Sun salutations, warrior poses, hip openers, spinal twists',
            focus: 'Full body integration',
          },
        ],
      },
      {
        day: 4,
        workouts: [
          {
            type: 'mobility',
            name: 'Active Recovery',
            duration: 25,
            instructions: 'Light movement, dynamic stretching, foam rolling',
            focus: 'Recovery',
          },
        ],
      },
      {
        day: 5,
        workouts: [
          {
            type: 'mobility',
            name: 'Deep Stretch',
            duration: 40,
            instructions: 'Long-hold stretches: 60-90s per muscle group, full body',
            focus: 'Flexibility',
          },
        ],
      },
    ],
    tips: [
      'Hold stretches for 30-90 seconds',
      'Breathe deeply during stretches',
      'Never force a stretch',
      'Consistency matters more than intensity',
    ],
  },
];

/**
 * Get available workout plans for a hunter
 */
export const getAvailablePlans = (
  level: number,
  goal?: 'balanced' | 'muscle-gain' | 'fat-loss' | 'mobility',
  difficulty?: 'easy' | 'normal' | 'hard'
): WorkoutPlan[] => {
  return WORKOUT_PLANS.filter((plan) => {
    if (plan.unlockedAt > level) return false;
    if (goal && plan.goal !== goal) return false;
    if (difficulty && plan.difficulty !== difficulty) return false;
    return true;
  });
};

