import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface BodyweightExercise {
  id: string;
  name: string;
  type: 'strength' | 'cardio' | 'mobility';
  duration?: number; // minutes
  reps?: number;
  sets?: number;
  intensity: 1 | 2 | 3 | 4 | 5;
  expReward: number;
  statGains: {
    str: number;
    vit: number;
    dex: number;
    int: number;
  };
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  muscleGroups: string[];
}

export interface CompletedExercise {
  exerciseId: string;
  completedAt: Date;
  expGained: number;
}

interface WorkoutStore {
  exercises: BodyweightExercise[];
  completedExercises: CompletedExercise[];
  
  // Actions
  completeExercise: (exerciseId: string) => void;
  getExerciseById: (id: string) => BodyweightExercise | undefined;
  getCompletedToday: () => CompletedExercise[];
  getRecommendedExercise: (level: number) => BodyweightExercise | null;
}

// Bodyweight exercise database
const BODYWEIGHT_EXERCISES: BodyweightExercise[] = [
  // Strength Exercises
  {
    id: 'push-ups',
    name: 'Push-Ups',
    type: 'strength',
    reps: 10,
    sets: 3,
    intensity: 3,
    expReward: 50,
    statGains: { str: 2.0, vit: 0.5, dex: 0.3, int: 0.5 },
    description: 'Classic upper body strength exercise',
    difficulty: 'beginner',
    muscleGroups: ['Chest', 'Shoulders', 'Triceps'],
  },
  {
    id: 'squats',
    name: 'Bodyweight Squats',
    type: 'strength',
    reps: 15,
    sets: 3,
    intensity: 2,
    expReward: 45,
    statGains: { str: 1.8, vit: 0.8, dex: 0.5, int: 0.4 },
    description: 'Fundamental lower body exercise',
    difficulty: 'beginner',
    muscleGroups: ['Quadriceps', 'Glutes', 'Calves'],
  },
  {
    id: 'plank',
    name: 'Plank Hold',
    type: 'strength',
    duration: 1, // minutes
    sets: 3,
    intensity: 3,
    expReward: 40,
    statGains: { str: 1.5, vit: 0.5, dex: 0.8, int: 0.6 },
    description: 'Core stability and strength',
    difficulty: 'beginner',
    muscleGroups: ['Core', 'Shoulders'],
  },
  {
    id: 'lunges',
    name: 'Walking Lunges',
    type: 'strength',
    reps: 12,
    sets: 3,
    intensity: 3,
    expReward: 55,
    statGains: { str: 2.2, vit: 0.6, dex: 0.7, int: 0.5 },
    description: 'Unilateral leg strength and balance',
    difficulty: 'intermediate',
    muscleGroups: ['Quadriceps', 'Glutes', 'Hamstrings'],
  },
  {
    id: 'burpees',
    name: 'Burpees',
    type: 'cardio',
    reps: 10,
    sets: 3,
    intensity: 5,
    expReward: 80,
    statGains: { str: 1.5, vit: 3.0, dex: 1.0, int: 1.0 },
    description: 'Full-body high-intensity exercise',
    difficulty: 'advanced',
    muscleGroups: ['Full Body'],
  },
  {
    id: 'jumping-jacks',
    name: 'Jumping Jacks',
    type: 'cardio',
    duration: 2, // minutes
    intensity: 2,
    expReward: 30,
    statGains: { str: 0.3, vit: 2.0, dex: 0.8, int: 0.4 },
    description: 'Cardiovascular warm-up exercise',
    difficulty: 'beginner',
    muscleGroups: ['Full Body'],
  },
  {
    id: 'mountain-climbers',
    name: 'Mountain Climbers',
    type: 'cardio',
    duration: 1,
    sets: 3,
    intensity: 4,
    expReward: 60,
    statGains: { str: 1.0, vit: 2.5, dex: 1.2, int: 0.8 },
    description: 'Dynamic core and cardio exercise',
    difficulty: 'intermediate',
    muscleGroups: ['Core', 'Shoulders', 'Legs'],
  },
  {
    id: 'stretching',
    name: 'Full Body Stretch',
    type: 'mobility',
    duration: 10,
    intensity: 1,
    expReward: 25,
    statGains: { str: 0.2, vit: 0.3, dex: 2.5, int: 0.8 },
    description: 'Improve flexibility and range of motion',
    difficulty: 'beginner',
    muscleGroups: ['Full Body'],
  },
  {
    id: 'yoga-flow',
    name: 'Yoga Flow',
    type: 'mobility',
    duration: 15,
    intensity: 2,
    expReward: 40,
    statGains: { str: 0.5, vit: 0.8, dex: 3.0, int: 1.2 },
    description: 'Yoga sequence for mobility and mindfulness',
    difficulty: 'beginner',
    muscleGroups: ['Full Body'],
  },
  {
    id: 'pull-ups',
    name: 'Pull-Ups (or Inverted Rows)',
    type: 'strength',
    reps: 8,
    sets: 3,
    intensity: 4,
    expReward: 70,
    statGains: { str: 2.5, vit: 0.5, dex: 0.8, int: 0.6 },
    description: 'Upper body pulling strength',
    difficulty: 'intermediate',
    muscleGroups: ['Back', 'Biceps', 'Shoulders'],
  },
];

const getStorage = () => {
  try {
    return typeof window !== 'undefined' ? localStorage : null;
  } catch {
    return null;
  }
};

const customStorage = {
  getItem: (name: string): string | null => {
    const storage = getStorage();
    if (!storage) return null;
    try {
      return storage.getItem(name);
    } catch {
      return null;
    }
  },
  setItem: (name: string, value: string): void => {
    const storage = getStorage();
    if (!storage) return;
    try {
      storage.setItem(name, value);
    } catch {
      // Ignore errors
    }
  },
  removeItem: (name: string): void => {
    const storage = getStorage();
    if (!storage) return;
    try {
      storage.removeItem(name);
    } catch {
      // Ignore errors
    }
  },
};

export const useWorkoutStore = create<WorkoutStore>()(
  persist(
    (set, get) => ({
      exercises: BODYWEIGHT_EXERCISES,
      completedExercises: [],

      completeExercise: (exerciseId: string) => {
        const exercise = get().exercises.find((e) => e.id === exerciseId);
        if (!exercise) return;

        const completed: CompletedExercise = {
          exerciseId,
          completedAt: new Date(),
          expGained: exercise.expReward,
        };

        set((state) => ({
          completedExercises: [...state.completedExercises, completed],
        }));
      },

      getExerciseById: (id: string) => {
        return get().exercises.find((e) => e.id === id);
      },

      getCompletedToday: () => {
        const today = new Date().toISOString().split('T')[0];
        return get().completedExercises.filter((ce) => {
          const completedDate = new Date(ce.completedAt).toISOString().split('T')[0];
          return completedDate === today;
        });
      },

      getRecommendedExercise: (level: number) => {
        const exercises = get().exercises;
        const completedToday = get().getCompletedToday();
        const completedIds = new Set(completedToday.map((ce) => ce.exerciseId));

        // Filter out completed exercises and recommend based on level
        const available = exercises.filter((e) => !completedIds.has(e.id));

        if (available.length === 0) return null;

        // Recommend based on level and difficulty
        if (level < 5) {
          return available.find((e) => e.difficulty === 'beginner') || available[0];
        } else if (level < 15) {
          return (
            available.find((e) => e.difficulty === 'intermediate') ||
            available.find((e) => e.difficulty === 'beginner') ||
            available[0]
          );
        } else {
          return available[Math.floor(Math.random() * available.length)];
        }
      },
    }),
    {
      name: 'shadow-regimen-workouts',
      storage: createJSONStorage(() => customStorage),
      partialize: (state) => ({
        completedExercises: state.completedExercises,
      }),
      onRehydrateStorage: () => (state) => {
        if (state?.completedExercises) {
          state.completedExercises = state.completedExercises.map((ce) => ({
            ...ce,
            completedAt: new Date(ce.completedAt),
          }));
        }
      },
    }
  )
);

