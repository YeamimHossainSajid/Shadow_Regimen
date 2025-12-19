export interface ExerciseTutorial {
  id: string;
  name: string;
  type: 'Strength' | 'Cardio' | 'Mobility';
  duration?: number; // minutes
  reps?: number;
  intensity: 1 | 2 | 3 | 4 | 5;
  steps: string[];
  tips?: string[];
  warnings?: string[];
  expReward: number;
}

export const tutorialData: ExerciseTutorial[] = [
  {
    id: 'pushups',
    name: 'Push-Ups',
    type: 'Strength',
    reps: 15,
    intensity: 3,
    steps: [
      'Start in a high plank position, hands shoulder-width apart.',
      'Keep your body straight from head to heels.',
      'Lower your body until your chest nearly touches the floor.',
      'Push back up to starting position.',
      'Repeat for 15 reps.'
    ],
    tips: ['Keep elbows close to body', 'Engage core', 'Breathe steadily'],
    warnings: ['Stop if you feel wrist pain', 'Modify on knees if needed'],
    expReward: 50
  },
  {
    id: 'squats',
    name: 'Bodyweight Squats',
    type: 'Strength',
    reps: 20,
    intensity: 3,
    steps: [
      'Stand with feet shoulder-width apart.',
      'Push your hips back and bend knees to lower body.',
      'Keep chest up and back straight.',
      'Lower until thighs are parallel to the floor.',
      'Push through heels to stand up.',
      'Repeat for 20 reps.'
    ],
    tips: ['Knees aligned with toes', 'Do not arch back'],
    warnings: ['Stop if knee pain occurs'],
    expReward: 50
  },
  {
    id: 'plank',
    name: 'Plank',
    type: 'Strength',
    duration: 60,
    intensity: 4,
    steps: [
      'Start on forearms and toes.',
      'Keep body straight from head to heels.',
      'Engage core and glutes.',
      'Hold position for 60 seconds.'
    ],
    tips: ['Do not sag hips', 'Breathe steadily'],
    warnings: ['Stop if lower back pain occurs'],
    expReward: 60
  },
  {
    id: 'jumping_jacks',
    name: 'Jumping Jacks',
    type: 'Cardio',
    duration: 2,
    intensity: 2,
    steps: [
      'Stand upright with feet together, arms at sides.',
      'Jump feet out while raising arms overhead.',
      'Return to starting position.',
      'Repeat continuously for 2 minutes.'
    ],
    tips: ['Maintain rhythm', 'Land softly'],
    warnings: ['Be cautious with knee issues'],
    expReward: 40
  },
  {
    id: 'mountain_climbers',
    name: 'Mountain Climbers',
    type: 'Cardio',
    duration: 1,
    intensity: 4,
    steps: [
      'Start in a high plank position.',
      'Drive one knee toward your chest, then switch quickly.',
      'Continue alternating rapidly for 1 minute.'
    ],
    tips: ['Keep hips low', 'Engage core', 'Breathe steadily'],
    warnings: ['High intensity - rest if needed'],
    expReward: 60
  },
  {
    id: 'lunges',
    name: 'Bodyweight Lunges',
    type: 'Strength',
    reps: 12,
    intensity: 3,
    steps: [
      'Stand upright, feet hip-width apart.',
      'Step forward with one leg, lowering hips until both knees are bent 90°.',
      'Push back to starting position.',
      'Switch legs, repeat 12 reps per leg.'
    ],
    tips: ['Keep torso upright', 'Knee behind toes'],
    warnings: ['Stop if knee pain occurs'],
    expReward: 50
  },
  {
    id: 'high_knees',
    name: 'High Knees',
    type: 'Cardio',
    duration: 1,
    intensity: 4,
    steps: [
      'Run in place lifting knees as high as possible.',
      'Pump arms while maintaining speed.',
      'Continue for 1 minute.'
    ],
    tips: ['Maintain pace', 'Engage core'],
    warnings: ['High intensity - pace yourself'],
    expReward: 55
  },
  {
    id: 'glute_bridge',
    name: 'Glute Bridge',
    type: 'Strength',
    reps: 15,
    intensity: 3,
    steps: [
      'Lie on back, knees bent, feet flat on floor.',
      'Lift hips until shoulders to knees form a straight line.',
      'Squeeze glutes at top, lower back down.',
      'Repeat for 15 reps.'
    ],
    tips: ['Avoid arching lower back', 'Engage glutes'],
    expReward: 50
  },
  {
    id: 'side_plank',
    name: 'Side Plank',
    type: 'Strength',
    duration: 30,
    intensity: 3,
    steps: [
      'Lie on your side, elbow under shoulder.',
      'Lift hips to form a straight line.',
      'Hold for 30 seconds per side.'
    ],
    tips: ['Keep body straight', 'Engage core'],
    warnings: ['Modify on knees if needed'],
    expReward: 45
  },
  {
    id: 'wall_sit',
    name: 'Wall Sit',
    type: 'Strength',
    duration: 45,
    intensity: 3,
    steps: [
      'Stand with back against wall.',
      'Slide down until thighs are parallel to floor.',
      'Hold for 45 seconds.'
    ],
    tips: ['Do not let knees go past toes', 'Keep back flat against wall'],
    warnings: ['Stop if knee pain occurs'],
    expReward: 50
  },
  {
    id: 'burpees',
    name: 'Burpees',
    type: 'Cardio',
    reps: 10,
    intensity: 5,
    steps: [
      'Stand upright, feet shoulder-width apart.',
      'Drop into a squat, place hands on floor.',
      'Kick feet back into plank.',
      'Return feet to squat, jump up explosively.',
      'Repeat 10 times.'
    ],
    tips: ['Maintain rhythm', 'Land softly'],
    warnings: ['Very high intensity - rest between sets if needed'],
    expReward: 70
  },
  {
    id: 'cat_cow_stretch',
    name: 'Cat-Cow Stretch',
    type: 'Mobility',
    duration: 2,
    intensity: 1,
    steps: [
      'Start on hands and knees.',
      'Arch back up (Cat), then drop belly down and lift head (Cow).',
      'Move slowly and breathe deeply.',
      'Repeat for 2 minutes.'
    ],
    tips: ['Move gently', 'Focus on breathing'],
    expReward: 30
  },
  {
    id: 'cobra_stretch',
    name: 'Cobra Stretch',
    type: 'Mobility',
    duration: 1,
    intensity: 1,
    steps: [
      'Lie face down, palms under shoulders.',
      'Press chest up, extending spine.',
      'Hold for 1 minute.'
    ],
    tips: ['Keep hips on floor', 'Breathe deeply'],
    warnings: ['Stop if lower back pain occurs'],
    expReward: 25
  },
  {
    id: 'seated_forward_fold',
    name: 'Seated Forward Fold',
    type: 'Mobility',
    duration: 2,
    intensity: 1,
    steps: [
      'Sit with legs extended.',
      'Hinge at hips to reach toward toes.',
      'Hold stretch for 2 minutes.'
    ],
    tips: ['Do not round back excessively', 'Breathe deeply'],
    warnings: ['Do not force the stretch'],
    expReward: 25
  }
];

/**
 * Get exercises by type
 */
export const getExercisesByType = (type: 'Strength' | 'Cardio' | 'Mobility'): ExerciseTutorial[] => {
  return tutorialData.filter(ex => ex.type === type);
};

/**
 * Get exercise by ID
 */
export const getExerciseById = (id: string): ExerciseTutorial | undefined => {
  return tutorialData.find(ex => ex.id === id);
};

/**
 * Alias for getExerciseById (for compatibility)
 */
export const getTutorial = getExerciseById;
