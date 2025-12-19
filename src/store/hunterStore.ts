import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Hunter, DailyQuest } from '../types/hunter';
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

interface HunterStore {
  hunter: Hunter | null;
  hasBooted: boolean;
  levelUpFlag: boolean;
  
  // Actions
  initializeHunter: (name?: string) => void;
  setHasBooted: (value: boolean) => void;
  addExp: (amount: number) => void;
  completeQuest: (questId: string) => void;
  updateStreak: () => void;
  resetDailyQuests: () => void;
  clearLevelUpFlag: () => void;
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
      console.error('Failed to persist to localStorage');
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

        let newExp = hunter.exp + amount;
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
          // If rehydration fails, initialize new hunter
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
          } catch {
            // If validation fails, create new hunter
            state.hunter = createNewHunter();
          }
        }
      },
    }
  )
);

