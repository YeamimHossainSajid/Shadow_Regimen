import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Hunter, DailyQuest, Workout, WorkoutType, Dungeon, PenaltyQuest } from '../types/hunter';
import { 
  calculateExpForLevel, 
  getRankFromLevel, 
  calculateStatIncreases,
  isToday,
  isYesterday,
  isConsecutiveDay,
} from '../utils/calculations';
import { createNewHunter } from '../utils/hunterFactory';
import { generateDailyQuests } from '../utils/questGenerator';
import { calculateWorkoutRewards } from '../utils/workoutCalculations';
import { checkForMissedQuests, generatePenaltyQuest } from '../utils/penaltyQuestFactory';
import { checkAchievementUnlock, createAchievement, ACHIEVEMENT_DEFINITIONS } from '../utils/achievementFactory';

interface HunterStore {
  hunter: Hunter | null;
  hasBooted: boolean;
  levelUpFlag: boolean;
  
  // Core Actions
  initializeHunter: (name?: string) => void;
  setHasBooted: (value: boolean) => void;
  addExp: (amount: number) => void;
  clearLevelUpFlag: () => void;
  
  // Quest Actions
  completeQuest: (questId: string) => void;
  resetDailyQuests: () => void;
  checkAndGeneratePenaltyQuests: () => void;
  completePenaltyQuest: (questId: string) => void;
  
  // Workout Actions
  logWorkout: (type: WorkoutType, duration: number, intensity: number, notes?: string) => void;
  
  // Dungeon Actions
  completeDungeon: (dungeonId: string) => void;
  
  // Achievement Actions
  checkAchievements: () => void;
  
  // Streak Actions
  updateStreak: () => void;
}

/**
 * Safe localStorage access with fallback
 */
const getStorage = () => {
  try {
    return typeof window !== 'undefined' ? localStorage : null;
  } catch {
    return null;
  }
};

/**
 * Custom storage implementation with error handling
 */
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
      // Storage quota exceeded or other error
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

export const useHunterStore = create<HunterStore>()(
  persist(
    (set, get) => ({
      hunter: null,
      hasBooted: false,
      levelUpFlag: false,

      initializeHunter: (name?: string) => {
        const existingHunter = get().hunter;
        if (existingHunter) {
          // Check if daily quests need reset
          const lastQuestDate = existingHunter.dailyQuests[0]?.createdAt;
          if (lastQuestDate && !isToday(lastQuestDate)) {
            set((state) => ({
              hunter: state.hunter ? {
                ...state.hunter,
                dailyQuests: generateDailyQuests(),
              } : null,
            }));
            // Check for penalty quests after reset
            get().checkAndGeneratePenaltyQuests();
          }
          return;
        }

        const newHunter = createNewHunter(name);
        set({ hunter: newHunter });
      },

      setHasBooted: (value: boolean) => {
        set({ hasBooted: value });
      },

      addExp: (amount: number) => {
        const hunter = get().hunter;
        if (!hunter) return;

        // Apply penalty if there are incomplete penalty quests
        const incompletePenalties = hunter.penaltyQuests.filter((pq) => !pq.completed);
        const penaltyReduction = incompletePenalties.reduce((sum, pq) => sum + pq.expPenalty, 0);
        const effectiveAmount = Math.max(0, amount - penaltyReduction);

        let newExp = hunter.exp + effectiveAmount;
        let newLevel = hunter.level;
        let levelUpOccurred = false;

        // Check for level ups
        while (newExp >= hunter.expToNextLevel) {
          newExp -= hunter.expToNextLevel;
          newLevel += 1;
          levelUpOccurred = true;
        }

        // Calculate new stats if leveled up
        let newStats = { ...hunter.stats };
        if (levelUpOccurred) {
          const statIncreases = calculateStatIncreases(newLevel);
          newStats = {
            str: hunter.stats.str + statIncreases.str,
            vit: hunter.stats.vit + statIncreases.vit,
            dex: hunter.stats.dex + statIncreases.dex,
            int: hunter.stats.int + statIncreases.int,
          };
        }

        const newRank = getRankFromLevel(newLevel);
        const newExpToNextLevel = calculateExpForLevel(newLevel);

        set({
          hunter: {
            ...hunter,
            level: newLevel,
            exp: newExp,
            expToNextLevel: newExpToNextLevel,
            stats: newStats,
            rank: newRank,
          },
          levelUpFlag: levelUpOccurred || get().levelUpFlag,
        });

        // Update streak on activity
        get().updateStreak();
        
        // Check achievements after level up
        if (levelUpOccurred) {
          get().checkAchievements();
        }
      },

      completeQuest: (questId: string) => {
        const hunter = get().hunter;
        if (!hunter) return;

        const quest = hunter.dailyQuests.find((q) => q.id === questId);
        if (!quest || quest.completed) return;

        const updatedQuests: DailyQuest[] = hunter.dailyQuests.map((q) =>
          q.id === questId ? { ...q, completed: true } : q
        );

        set({
          hunter: {
            ...hunter,
            dailyQuests: updatedQuests,
          },
        });

        // Award EXP
        get().addExp(quest.expReward);
        
        // Check achievements
        get().checkAchievements();
      },

      resetDailyQuests: () => {
        const hunter = get().hunter;
        if (!hunter) return;

        set({
          hunter: {
            ...hunter,
            dailyQuests: generateDailyQuests(),
          },
        });
      },

      checkAndGeneratePenaltyQuests: () => {
        const hunter = get().hunter;
        if (!hunter) return;

        const missedDays = checkForMissedQuests(hunter.lastActivityDate, hunter.dailyQuests);
        
        if (missedDays > 0) {
          // Check if penalty quest already exists for today
          const today = new Date().toISOString().split('T')[0];
          const hasTodayPenalty = hunter.penaltyQuests.some((pq) => {
            const pqDate = new Date(pq.createdAt).toISOString().split('T')[0];
            return pqDate === today && !pq.completed;
          });

          if (!hasTodayPenalty) {
            const penaltyQuest = generatePenaltyQuest(missedDays);
            set({
              hunter: {
                ...hunter,
                penaltyQuests: [...hunter.penaltyQuests, penaltyQuest],
              },
            });
          }
        }
      },

      completePenaltyQuest: (questId: string) => {
        const hunter = get().hunter;
        if (!hunter) return;

        const updatedPenalties: PenaltyQuest[] = hunter.penaltyQuests.map((pq) =>
          pq.id === questId ? { ...pq, completed: true } : pq
        );

        set({
          hunter: {
            ...hunter,
            penaltyQuests: updatedPenalties,
          },
        });
      },

      logWorkout: (type: WorkoutType, duration: number, intensity: number, notes?: string) => {
        const hunter = get().hunter;
        if (!hunter) return;

        // Calculate stat gains and EXP
        const { statGains, expGained } = calculateWorkoutRewards(type, duration, intensity);

        // Create workout record
        const workout: Workout = {
          id: `workout-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          type,
          duration,
          intensity,
          notes,
          createdAt: new Date(),
          statGains,
          expGained,
        };

        // Update hunter stats
        const newStats = {
          str: Math.round((hunter.stats.str + statGains.str) * 10) / 10,
          vit: Math.round((hunter.stats.vit + statGains.vit) * 10) / 10,
          dex: Math.round((hunter.stats.dex + statGains.dex) * 10) / 10,
          int: Math.round((hunter.stats.int + statGains.int) * 10) / 10,
        };

        set({
          hunter: {
            ...hunter,
            workouts: [...hunter.workouts, workout],
            stats: newStats,
            totalWorkouts: hunter.totalWorkouts + 1,
            totalMinutes: hunter.totalMinutes + duration,
          },
        });

        // Award EXP (this will trigger level up check and streak update)
        get().addExp(expGained);
        
        // Check achievements
        get().checkAchievements();
      },

      completeDungeon: (dungeonId: string) => {
        const hunter = get().hunter;
        if (!hunter) return;

        const dungeon = hunter.dungeons.find((d) => d.id === dungeonId);
        if (!dungeon || dungeon.completed) return;

        // Mark dungeon as completed
        const updatedDungeons: Dungeon[] = hunter.dungeons.map((d) =>
          d.id === dungeonId ? { ...d, completed: true } : d
        );

        set({
          hunter: {
            ...hunter,
            dungeons: updatedDungeons,
          },
        });

        // Award EXP
        get().addExp(dungeon.expReward);
        
        // Check achievements
        get().checkAchievements();
      },

      checkAchievements: () => {
        const hunter = get().hunter;
        if (!hunter) return;

        const unlockedAchievementIds = new Set(hunter.achievements.map((a) => a.id));
        const newAchievements = [];

        // Check each achievement definition
        for (const definition of ACHIEVEMENT_DEFINITIONS) {
          // Skip if already unlocked
          const alreadyUnlocked = hunter.achievements.some(
            (a) => a.title === definition.title
          );
          
          if (!alreadyUnlocked && checkAchievementUnlock(definition, hunter)) {
            const achievement = createAchievement(definition);
            newAchievements.push(achievement);
          }
        }

        if (newAchievements.length > 0) {
          set({
            hunter: {
              ...hunter,
              achievements: [...hunter.achievements, ...newAchievements],
            },
          });
        }
      },

      updateStreak: () => {
        const hunter = get().hunter;
        if (!hunter) return;

        const today = new Date().toISOString().split('T')[0];
        const lastActivity = hunter.lastActivityDate;

        let newStreak = hunter.streak;

        if (!lastActivity) {
          // First activity
          newStreak = 1;
        } else if (isToday(lastActivity)) {
          // Already logged today, maintain streak
          // Do nothing
        } else if (isYesterday(lastActivity)) {
          // Consecutive day
          newStreak = hunter.streak + 1;
        } else if (isConsecutiveDay(lastActivity, today)) {
          // Consecutive day (edge case)
          newStreak = hunter.streak + 1;
        } else {
          // Streak broken
          newStreak = 1;
        }

        set({
          hunter: {
            ...hunter,
            streak: newStreak,
            lastActivityDate: today,
          },
        });
        
        // Check achievements after streak update
        get().checkAchievements();
      },

      clearLevelUpFlag: () => {
        set({ levelUpFlag: false });
      },
    }),
    {
      name: 'shadow-regimen-storage',
      storage: createJSONStorage(() => customStorage),
      partialize: (state) => ({
        hunter: state.hunter,
        hasBooted: state.hasBooted,
      }),
      onRehydrateStorage: () => (state, error) => {
        if (error) {
          return;
        }
        // Validate and fix corrupted data
        if (state?.hunter) {
          try {
            // Ensure all required fields exist
            if (!state.hunter.id || !state.hunter.name) {
              state.hunter = createNewHunter();
            }
            // Validate quest dates
            if (state.hunter.dailyQuests) {
              state.hunter.dailyQuests = state.hunter.dailyQuests.map((quest) => ({
                ...quest,
                createdAt: quest.createdAt ? new Date(quest.createdAt) : new Date(),
              }));
            }
            // Validate workout dates
            if (state.hunter.workouts) {
              state.hunter.workouts = state.hunter.workouts.map((workout) => ({
                ...workout,
                createdAt: workout.createdAt ? new Date(workout.createdAt) : new Date(),
              }));
            }
            // Ensure new fields exist
            if (!state.hunter.penaltyQuests) state.hunter.penaltyQuests = [];
            if (!state.hunter.workouts) state.hunter.workouts = [];
            if (!state.hunter.achievements) state.hunter.achievements = [];
            if (state.hunter.totalWorkouts === undefined) state.hunter.totalWorkouts = state.hunter.workouts.length;
            if (state.hunter.totalMinutes === undefined) {
              state.hunter.totalMinutes = state.hunter.workouts.reduce((sum, w) => sum + w.duration, 0);
            }
          } catch {
            state.hunter = createNewHunter();
          }
        }
      },
    }
  )
);
