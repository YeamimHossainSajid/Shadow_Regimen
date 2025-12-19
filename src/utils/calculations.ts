import { HunterRank } from '../types/hunter';

/**
 * Calculate EXP required for a given level
 * Formula: level² × 100
 */
export const calculateExpForLevel = (level: number): number => {
  return Math.pow(level, 2) * 100;
};

/**
 * Calculate total EXP needed to reach a specific level
 */
export const calculateTotalExpForLevel = (targetLevel: number): number => {
  let totalExp = 0;
  for (let i = 1; i < targetLevel; i++) {
    totalExp += calculateExpForLevel(i);
  }
  return totalExp;
};

/**
 * Determine hunter rank based on level
 */
export const getRankFromLevel = (level: number): HunterRank => {
  if (level >= 50) return 'S';
  if (level >= 35) return 'A';
  if (level >= 25) return 'B';
  if (level >= 15) return 'C';
  if (level >= 5) return 'D';
  return 'E';
};

/**
 * Calculate stat increases on level up
 * Each stat increases by a base amount plus level-based bonus
 */
export const calculateStatIncreases = (currentLevel: number): {
  str: number;
  vit: number;
  dex: number;
  int: number;
} => {
  const baseIncrease = 2;
  const levelBonus = Math.floor(currentLevel / 5);
  
  return {
    str: baseIncrease + levelBonus,
    vit: baseIncrease + levelBonus,
    dex: baseIncrease + levelBonus,
    int: baseIncrease + levelBonus,
  };
};

/**
 * Check if a date is today
 */
export const isToday = (date: Date | string): boolean => {
  const checkDate = typeof date === 'string' ? new Date(date) : date;
  const today = new Date();
  return (
    checkDate.getDate() === today.getDate() &&
    checkDate.getMonth() === today.getMonth() &&
    checkDate.getFullYear() === today.getFullYear()
  );
};

/**
 * Check if a date is yesterday
 */
export const isYesterday = (date: Date | string): boolean => {
  const checkDate = typeof date === 'string' ? new Date(date) : date;
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return (
    checkDate.getDate() === yesterday.getDate() &&
    checkDate.getMonth() === yesterday.getMonth() &&
    checkDate.getFullYear() === yesterday.getFullYear()
  );
};

/**
 * Check if two dates are consecutive days
 */
export const isConsecutiveDay = (date1: Date | string, date2: Date | string): boolean => {
  const d1 = typeof date1 === 'string' ? new Date(date1) : date1;
  const d2 = typeof date2 === 'string' ? new Date(date2) : date2;
  const diffTime = Math.abs(d2.getTime() - d1.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays === 1;
};

