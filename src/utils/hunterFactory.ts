import { Hunter, HunterStats } from '../types/hunter';
import { calculateExpForLevel, getRankFromLevel } from './calculations';
import { generateDailyQuests } from './questGenerator';
import { generateDungeons } from './dungeonFactory';

/**
 * Generate a random hex string for IDs
 */
const generateRandomHex = (length: number): string => {
  return Array.from({ length }, () => 
    Math.floor(Math.random() * 16).toString(16)
  ).join('');
};

/**
 * Create a new hunter with default values
 */
export const createNewHunter = (name: string = 'Hunter'): Hunter => {
  const initialLevel = 1;
  const initialStats: HunterStats = {
    str: 10,
    vit: 10,
    dex: 10,
    int: 10,
  };
  
  return {
    id: `USER-${generateRandomHex(8).toUpperCase()}`,
    name,
    level: initialLevel,
    exp: 0,
    expToNextLevel: calculateExpForLevel(initialLevel),
    stats: initialStats,
    rank: getRankFromLevel(initialLevel),
    dailyQuests: generateDailyQuests(),
    penaltyQuests: [],
    workouts: [],
    dungeons: generateDungeons(),
    achievements: [],
    streak: 0,
    shadowArmy: [],
    totalWorkouts: 0,
    totalMinutes: 0,
  };
};

