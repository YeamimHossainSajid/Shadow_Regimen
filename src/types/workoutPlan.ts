import { WorkoutType } from './hunter';

export interface WorkoutPlan {
  id: string;
  name: string;
  description: string;
  goal: 'balanced' | 'muscle-gain' | 'fat-loss' | 'mobility';
  difficulty: 'easy' | 'normal' | 'hard';
  unlockedAt: number; // level requirement
  duration: number; // weeks
  weeklySchedule: {
    day: number; // 1-7 (Monday-Sunday)
    workouts: {
      type: WorkoutType;
      name: string;
      duration: number;
      instructions: string;
      focus: string;
    }[];
  }[];
  tips: string[];
}

