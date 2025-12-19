export type HunterRank = 'E' | 'D' | 'C' | 'B' | 'A' | 'S';

export type QuestType = 'strength' | 'cardio' | 'mobility' | 'consistency';

export type WorkoutType = 'strength' | 'cardio' | 'mobility';

export type DungeonDifficulty = 'easy' | 'normal' | 'high-rank' | 'instant';

export interface DailyQuest {
  id: string;
  title: string;
  description: string;
  expReward: number;
  type: QuestType;
  completed: boolean;
  createdAt: Date;
}

export interface PenaltyQuest {
  id: string;
  title: string;
  description: string;
  expPenalty: number;
  mandatoryTask: string;
  createdAt: Date;
  completed: boolean;
}

export interface Workout {
  id: string;
  type: WorkoutType;
  duration: number; // minutes
  intensity: number; // 1-5 stars
  notes?: string;
  createdAt: Date;
  statGains: {
    str: number;
    vit: number;
    dex: number;
    int: number;
  };
  expGained: number;
}

export interface Dungeon {
  id: string;
  name: string;
  description: string;
  difficulty: DungeonDifficulty;
  duration: number; // minutes
  workoutPlan: {
    type: WorkoutType;
    sets?: number;
    reps?: number;
    duration?: number;
    instructions: string;
  }[];
  expReward: number;
  unlockedAt: number; // level requirement
  completed: boolean;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon?: string;
  unlockedAt: Date;
  category: 'streak' | 'level' | 'workout' | 'quest' | 'dungeon' | 'special';
}

export interface HunterStats {
  str: number;
  vit: number;
  dex: number;
  int: number;
}

export interface Hunter {
  id: string;
  name: string;
  level: number;
  exp: number;
  expToNextLevel: number;
  stats: HunterStats;
  rank: HunterRank;
  dailyQuests: DailyQuest[];
  penaltyQuests: PenaltyQuest[];
  workouts: Workout[];
  dungeons: Dungeon[];
  achievements: Achievement[];
  activeTitle?: string;
  streak: number;
  shadowArmy: string[];
  lastActivityDate?: string;
  totalWorkouts: number;
  totalMinutes: number;
}

