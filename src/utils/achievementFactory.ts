import { Achievement } from '../types/hunter';

/**
 * Achievement definitions
 * These reinforce positive fitness behaviors
 */
export const ACHIEVEMENT_DEFINITIONS: Omit<Achievement, 'id' | 'unlockedAt'>[] = [
  // Streak achievements
  {
    title: 'First Steps',
    description: 'Complete your first workout',
    category: 'workout',
  },
  {
    title: 'Solo Player',
    description: 'Maintain a 7-day streak',
    category: 'streak',
  },
  {
    title: 'Disciplined Hunter',
    description: 'Maintain a 14-day streak',
    category: 'streak',
  },
  {
    title: 'No Zero Day',
    description: '30 active days without missing',
    category: 'streak',
  },
  {
    title: 'Unbreakable',
    description: '100-day streak',
    category: 'streak',
  },
  
  // Level achievements
  {
    title: 'Awakened',
    description: 'Reach Level 5',
    category: 'level',
  },
  {
    title: 'Rising Star',
    description: 'Reach Level 10',
    category: 'level',
  },
  {
    title: 'Elite Hunter',
    description: 'Reach Level 25',
    category: 'level',
  },
  {
    title: 'High-Rank',
    description: 'Reach Level 50',
    category: 'level',
  },
  {
    title: 'Shadow Monarch',
    description: 'Reach Level 100',
    category: 'level',
  },
  
  // Workout achievements
  {
    title: 'First Dungeon Clear',
    description: 'Complete your first dungeon',
    category: 'dungeon',
  },
  {
    title: 'Dungeon Master',
    description: 'Complete 10 dungeons',
    category: 'dungeon',
  },
  {
    title: 'Centurion',
    description: 'Complete 100 workouts',
    category: 'workout',
  },
  {
    title: 'Time Warrior',
    description: 'Log 1000 total minutes',
    category: 'workout',
  },
  
  // Quest achievements
  {
    title: 'Quest Complete',
    description: 'Complete all daily quests in a day',
    category: 'quest',
  },
  {
    title: 'Perfect Week',
    description: 'Complete all daily quests for 7 days',
    category: 'quest',
  },
  
  // Special achievements
  {
    title: 'Balanced',
    description: 'Reach 50 in all stats',
    category: 'special',
  },
  {
    title: 'Powerhouse',
    description: 'Reach 100 STR',
    category: 'special',
  },
  {
    title: 'Endurance King',
    description: 'Reach 100 VIT',
    category: 'special',
  },
];

/**
 * Check if an achievement should be unlocked
 */
export const checkAchievementUnlock = (
  achievement: Omit<Achievement, 'id' | 'unlockedAt'>,
  hunter: {
    level: number;
    streak: number;
    totalWorkouts: number;
    totalMinutes: number;
    stats: { str: number; vit: number; dex: number; int: number };
    dungeons?: { completed: boolean }[];
    dailyQuests: { completed: boolean; createdAt: Date }[];
  }
): boolean => {
  switch (achievement.category) {
    case 'level':
      const levelThresholds: Record<string, number> = {
        'Awakened': 5,
        'Rising Star': 10,
        'Elite Hunter': 25,
        'High-Rank': 50,
        'Shadow Monarch': 100,
      };
      return hunter.level >= (levelThresholds[achievement.title] || 0);
      
    case 'streak':
      const streakThresholds: Record<string, number> = {
        'Solo Player': 7,
        'Disciplined Hunter': 14,
        'No Zero Day': 30,
        'Unbreakable': 100,
      };
      return hunter.streak >= (streakThresholds[achievement.title] || 0);
      
    case 'workout':
      if (achievement.title === 'First Steps') {
        return hunter.totalWorkouts >= 1;
      }
      if (achievement.title === 'Centurion') {
        return hunter.totalWorkouts >= 100;
      }
      if (achievement.title === 'Time Warrior') {
        return hunter.totalMinutes >= 1000;
      }
      return false;
      
    case 'dungeon':
      const completedDungeons = (hunter.dungeons || []).filter((d: { completed: boolean }) => d.completed).length;
      if (achievement.title === 'First Dungeon Clear') {
        return completedDungeons >= 1;
      }
      if (achievement.title === 'Dungeon Master') {
        return completedDungeons >= 10;
      }
      return false;
      
    case 'quest':
      // This would need more complex logic for quest completion tracking
      // For now, return false - can be enhanced later
      return false;
      
    case 'special':
      if (achievement.title === 'Balanced') {
        return (
          hunter.stats.str >= 50 &&
          hunter.stats.vit >= 50 &&
          hunter.stats.dex >= 50 &&
          hunter.stats.int >= 50
        );
      }
      if (achievement.title === 'Powerhouse') {
        return hunter.stats.str >= 100;
      }
      if (achievement.title === 'Endurance King') {
        return hunter.stats.vit >= 100;
      }
      return false;
      
    default:
      return false;
  }
};

/**
 * Generate a new achievement instance
 */
export const createAchievement = (
  definition: Omit<Achievement, 'id' | 'unlockedAt'>
): Achievement => {
  return {
    ...definition,
    id: `achievement-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    unlockedAt: new Date(),
  };
};

