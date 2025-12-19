import { WorkoutType, HunterStats } from '../types/hunter';

/**
 * Type modifiers for stat gains based on workout type
 * These are grounded in fitness science:
 * - Strength training primarily builds STR
 * - Cardio primarily builds VIT (cardiovascular endurance)
 * - Mobility primarily builds DEX (flexibility, coordination)
 * - All workouts contribute slightly to INT (mental discipline)
 */
const TYPE_MODIFIERS: Record<WorkoutType, HunterStats> = {
  strength: { str: 1.0, vit: 0.2, dex: 0.1, int: 0.3 },
  cardio: { str: 0.1, vit: 1.0, dex: 0.2, int: 0.3 },
  mobility: { str: 0.1, vit: 0.2, dex: 1.0, int: 0.3 },
};

/**
 * Base stat gain per minute at intensity 1
 * This represents the minimum meaningful effort
 */
const BASE_STAT_PER_MINUTE = 0.5;

/**
 * Intensity multipliers
 * 1 = Light effort (50% of base)
 * 2 = Moderate effort (100% of base)
 * 3 = Vigorous effort (150% of base)
 * 4 = High intensity (200% of base)
 * 5 = Maximum effort (250% of base)
 */
const INTENSITY_MULTIPLIERS: Record<number, number> = {
  1: 0.5,
  2: 1.0,
  3: 1.5,
  4: 2.0,
  5: 2.5,
};

/**
 * Calculate stat gains from a workout
 * Formula: duration × intensity × typeModifier × baseStatPerMinute
 * 
 * This ensures:
 * - Longer workouts = more gains
 * - Higher intensity = more gains
 * - Type-specific focus = appropriate stat distribution
 */
export const calculateWorkoutStatGains = (
  type: WorkoutType,
  duration: number,
  intensity: number
): HunterStats => {
  // Clamp intensity to valid range
  const clampedIntensity = Math.max(1, Math.min(5, Math.round(intensity)));
  const intensityMultiplier = INTENSITY_MULTIPLIERS[clampedIntensity] || 1.0;
  
  // Base calculation
  const baseGain = duration * intensityMultiplier * BASE_STAT_PER_MINUTE;
  
  // Apply type modifiers
  const modifiers = TYPE_MODIFIERS[type];
  
  return {
    str: Math.round(modifiers.str * baseGain * 10) / 10, // Round to 1 decimal
    vit: Math.round(modifiers.vit * baseGain * 10) / 10,
    dex: Math.round(modifiers.dex * baseGain * 10) / 10,
    int: Math.round(modifiers.int * baseGain * 10) / 10,
  };
};

/**
 * Calculate EXP gained from stat gains
 * EXP is derived from total stat gains, not hardcoded
 * Formula: sum of all stat gains × 2
 * 
 * This ensures EXP is always tied to actual progress
 */
export const calculateExpFromStats = (statGains: HunterStats): number => {
  const totalStats = statGains.str + statGains.vit + statGains.dex + statGains.int;
  return Math.round(totalStats * 2);
};

/**
 * Calculate total stat gains from a workout
 * Returns both stat gains and derived EXP
 */
export const calculateWorkoutRewards = (
  type: WorkoutType,
  duration: number,
  intensity: number
): {
  statGains: HunterStats;
  expGained: number;
} => {
  const statGains = calculateWorkoutStatGains(type, duration, intensity);
  const expGained = calculateExpFromStats(statGains);
  
  return {
    statGains,
    expGained,
  };
};

