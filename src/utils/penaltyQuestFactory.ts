import { PenaltyQuest } from '../types/hunter';

/**
 * Generate penalty quests when daily quests are missed
 * These are non-harmful but create accountability
 */
export const generatePenaltyQuest = (missedDays: number): PenaltyQuest => {
  const mandatoryTasks = [
    'Complete 20 push-ups',
    'Complete 30 bodyweight squats',
    'Hold plank for 1 minute',
    'Complete 10 burpees',
    'Do 5 minutes of stretching',
    'Complete 15 jumping jacks',
  ];
  
  const randomTask = mandatoryTasks[Math.floor(Math.random() * mandatoryTasks.length)];
  
  // EXP penalty scales with missed days (capped at 50% reduction)
  const expPenalty = Math.min(missedDays * 10, 50);
  
  return {
    id: `penalty-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    title: 'Accountability Quest',
    description: `You missed ${missedDays} day${missedDays > 1 ? 's' : ''} of quests. Complete this task to restore normal EXP gains.`,
    expPenalty,
    mandatoryTask: randomTask,
    createdAt: new Date(),
    completed: false,
  };
};

/**
 * Check if penalty quests should be generated
 * Returns number of missed days (0 if none)
 */
export const checkForMissedQuests = (
  lastActivityDate: string | undefined,
  dailyQuests: { completed: boolean; createdAt: Date }[]
): number => {
  if (!lastActivityDate) return 0;
  
  const today = new Date();
  const lastActivity = new Date(lastActivityDate);
  const daysSinceActivity = Math.floor(
    (today.getTime() - lastActivity.getTime()) / (1000 * 60 * 60 * 24)
  );
  
  // Check if any daily quests were incomplete
  const hasIncompleteQuests = dailyQuests.some((q) => !q.completed);
  
  // If there are incomplete quests and it's been more than 1 day, generate penalty
  if (hasIncompleteQuests && daysSinceActivity >= 1) {
    return daysSinceActivity;
  }
  
  return 0;
};

