import { create } from 'zustand';

export interface CompletedExercise {
  exerciseId: string;
  completedAt: Date;
  expGained: number;
}

interface TutorialStore {
  completedExercises: CompletedExercise[];
  addCompletedExercise: (exerciseId: string, expGained: number) => void;
  hasCompletedExercise: (exerciseId: string) => boolean;
  getCompletedCount: () => number;
}

export const useTutorialStore = create<TutorialStore>((set, get) => ({
  completedExercises: [],
  
  addCompletedExercise: (exerciseId: string, expGained: number) => {
    const completed: CompletedExercise = {
      exerciseId,
      completedAt: new Date(),
      expGained,
    };
    
    set((state) => ({
      completedExercises: [...state.completedExercises, completed],
    }));
  },
  
  hasCompletedExercise: (exerciseId: string) => {
    return get().completedExercises.some(ex => ex.exerciseId === exerciseId);
  },
  
  getCompletedCount: () => {
    return get().completedExercises.length;
  },
}));

