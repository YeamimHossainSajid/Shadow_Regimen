export type HunterRank = 'E' | 'D' | 'C' | 'B' | 'A' | 'S';

export type QuestType = 'strength' | 'cardio' | 'mobility' | 'consistency';

export interface DailyQuest {
  id: string;
  title: string;
  description: string;
  expReward: number;
  type: QuestType;
  completed: boolean;
  createdAt: Date;
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
  streak: number;
  shadowArmy: string[];
  lastActivityDate?: string;
}

