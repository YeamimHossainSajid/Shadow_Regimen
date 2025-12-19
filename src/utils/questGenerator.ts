import { DailyQuest, QuestType } from '../types/hunter';

const QUEST_TEMPLATES: Record<QuestType, Array<{ title: string; description: string; expReward: number }>> = {
  strength: [
    { title: 'Iron Will', description: 'Complete 3 sets of push-ups', expReward: 50 },
    { title: 'Mountain Breaker', description: 'Perform 50 squats', expReward: 60 },
    { title: 'Steel Grip', description: 'Hold plank for 2 minutes', expReward: 70 },
    { title: 'Titan\'s Resolve', description: 'Complete 100 push-ups total', expReward: 100 },
  ],
  cardio: [
    { title: 'Wind Runner', description: 'Run for 20 minutes', expReward: 80 },
    { title: 'Endurance Trial', description: 'Complete 30 minutes of cardio', expReward: 100 },
    { title: 'Speed Demon', description: 'Sprint intervals: 5 sets', expReward: 90 },
    { title: 'Marathon Mindset', description: 'Walk 10,000 steps', expReward: 70 },
  ],
  mobility: [
    { title: 'Flexibility Master', description: 'Complete 15-minute stretching session', expReward: 40 },
    { title: 'Yoga Flow', description: 'Practice yoga for 20 minutes', expReward: 50 },
    { title: 'Range of Motion', description: 'Full body mobility routine', expReward: 60 },
  ],
  consistency: [
    { title: 'Daily Ritual', description: 'Log any workout today', expReward: 30 },
    { title: 'Hunter\'s Discipline', description: 'Complete 3 different quest types', expReward: 150 },
    { title: 'System Sync', description: 'Check in for 3 consecutive days', expReward: 200 },
  ],
};

/**
 * Generate random daily quests
 * Returns 4-6 quests with variety across types
 */
export const generateDailyQuests = (): DailyQuest[] => {
  const quests: DailyQuest[] = [];
  const questCount = 4 + Math.floor(Math.random() * 3); // 4-6 quests
  
  // Ensure at least one quest from each major type
  const requiredTypes: QuestType[] = ['strength', 'cardio', 'mobility', 'consistency'];
  const usedTypes = new Set<QuestType>();
  
  // Add one from each required type
  requiredTypes.forEach((type) => {
    const templates = QUEST_TEMPLATES[type];
    const template = templates[Math.floor(Math.random() * templates.length)];
    quests.push({
      id: `quest-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      title: template.title,
      description: template.description,
      expReward: template.expReward,
      type,
      completed: false,
      createdAt: new Date(),
    });
    usedTypes.add(type);
  });
  
  // Fill remaining slots with random quests
  while (quests.length < questCount) {
    const types = Object.keys(QUEST_TEMPLATES) as QuestType[];
    const randomType = types[Math.floor(Math.random() * types.length)];
    const templates = QUEST_TEMPLATES[randomType];
    const template = templates[Math.floor(Math.random() * templates.length)];
    
    quests.push({
      id: `quest-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      title: template.title,
      description: template.description,
      expReward: template.expReward,
      type: randomType,
      completed: false,
      createdAt: new Date(),
    });
  }
  
  return quests;
};

