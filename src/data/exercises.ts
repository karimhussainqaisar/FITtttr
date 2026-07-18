import { Exercise, WorkoutProgram } from '../types';

export const EXERCISE_LIBRARY: Exercise[] = [
  // STRENGTH TRAINING - CHEST
  {
    id: 'ex-bench-press',
    name: 'Barbell Bench Press',
    category: 'strength',
    targetMuscle: 'chest',
    description: 'The king of upper body exercises, targeting chest hypertrophy, shoulders, and triceps.',
    difficulty: 'intermediate',
    equipment: ['Barbell', 'Flat Bench'],
    caloriesBurnedPerMin: 6,
    instructions: [
      'Lie flat on your back on a bench.',
      'Grip the barbell with hands slightly wider than shoulder-width.',
      'Unrack the bar and lower it slowly to your mid-chest.',
      'Push the bar back up explosively, keeping your elbows slightly tucked.'
    ]
  },
  {
    id: 'ex-push-ups',
    name: 'Standard Push Ups',
    category: 'strength',
    targetMuscle: 'chest',
    description: 'A classic bodyweight movement for endurance and core stabilization.',
    difficulty: 'beginner',
    equipment: ['Bodyweight'],
    caloriesBurnedPerMin: 5,
    instructions: [
      'Start in a plank position with hands slightly wider than shoulder-width.',
      'Keep your core tight and body in a straight line.',
      'Lower your chest to the floor by bending your elbows.',
      'Push back up to the starting position.'
    ]
  },
  {
    id: 'ex-db-press',
    name: 'Dumbbell Bench Press',
    category: 'strength',
    targetMuscle: 'chest',
    description: 'Excellent exercise for balanced unilateral chest development and shoulder health.',
    difficulty: 'beginner',
    equipment: ['Dumbbells', 'Flat Bench'],
    caloriesBurnedPerMin: 5.5,
    instructions: [
      'Sit on a bench holding dumbbells on your thighs.',
      'Lie back and press the dumbbells straight up above your chest.',
      'Lower them slowly until your elbows are at 90-degree angles.',
      'Press the dumbbells back up to the peak contraction.'
    ]
  },
  {
    id: 'ex-chest-fly',
    name: 'Incline Dumbbell Fly',
    category: 'strength',
    targetMuscle: 'chest',
    description: 'Isolates the upper chest muscles with a deep muscular stretch.',
    difficulty: 'intermediate',
    equipment: ['Dumbbells', 'Incline Bench'],
    caloriesBurnedPerMin: 4.5,
    instructions: [
      'Set a bench to a 30-degree incline.',
      'Hold dumbbells above your chest with palms facing each other.',
      'Lower your arms in a wide arc until you feel a stretch in your chest.',
      'Squeeze the dumbbells back together using your chest muscles.'
    ]
  },

  // STRENGTH - BACK
  {
    id: 'ex-pull-ups',
    name: 'Pull Ups',
    category: 'strength',
    targetMuscle: 'back',
    description: 'The ultimate back developer targeting the latissimus dorsi, rhomboids, and biceps.',
    difficulty: 'advanced',
    equipment: ['Pull-up Bar'],
    caloriesBurnedPerMin: 7,
    instructions: [
      'Grip the bar with palms facing away, wider than shoulder-width.',
      'Hang with arms fully extended.',
      'Pull your shoulder blades down and pull your chest toward the bar.',
      'Lower yourself slowly back to a dead hang.'
    ]
  },
  {
    id: 'ex-lat-pulldown',
    name: 'Cable Lat Pulldown',
    category: 'strength',
    targetMuscle: 'back',
    description: 'Builds impressive back width and upper back thickness.',
    difficulty: 'beginner',
    equipment: ['Cable Pulldown Machine'],
    caloriesBurnedPerMin: 5,
    instructions: [
      'Sit on the machine and adjust the knee pad.',
      'Grip the wide bar with palms facing forward.',
      'Pull the bar down to your collarbone while squeezing your shoulder blades.',
      'Slowly return the bar to the starting position.'
    ]
  },
  {
    id: 'ex-barbell-row',
    name: 'Bent Over Barbell Row',
    category: 'strength',
    targetMuscle: 'back',
    description: 'A powerful compound movement for back thickness, spinal erectors, and grip strength.',
    difficulty: 'intermediate',
    equipment: ['Barbell'],
    caloriesBurnedPerMin: 6.5,
    instructions: [
      'Hold a barbell with a shoulder-width overhand grip.',
      'Hinge at your hips, keeping your back flat and knees slightly bent.',
      'Pull the bar to your lower ribs, keeping your elbows tucked.',
      'Slowly lower the bar back down.'
    ]
  },
  {
    id: 'ex-deadlift',
    name: 'Conventional Barbell Deadlift',
    category: 'strength',
    targetMuscle: 'full_body',
    description: 'A fundamental posterior chain movement engaging glutes, hamstrings, back, and core.',
    difficulty: 'advanced',
    equipment: ['Barbell', 'Weights'],
    caloriesBurnedPerMin: 8,
    instructions: [
      'Stand with feet hip-width apart, shin close to the barbell.',
      'Hinge forward and grip the bar with a flat back and tight lat muscles.',
      'Push through your heels, keeping the bar close to your shins.',
      'Lock out your hips at the top, then lower under control.'
    ]
  },

  // STRENGTH - LEGS
  {
    id: 'ex-squat',
    name: 'Barbell Back Squat',
    category: 'strength',
    targetMuscle: 'legs',
    description: 'The foundational lower-body strength builder targeting quads, glutes, and core.',
    difficulty: 'intermediate',
    equipment: ['Barbell', 'Squat Rack'],
    caloriesBurnedPerMin: 7.5,
    instructions: [
      'Rest the barbell on your upper back muscles (traps).',
      'Stand with feet shoulder-width apart, toes pointed slightly out.',
      'Lower your hips back and down as if sitting in a chair, keeping knees over toes.',
      'Go below parallel (if mobile), then push back up through your heels.'
    ]
  },
  {
    id: 'ex-lunge',
    name: 'Walking Dumbbell Lunges',
    category: 'strength',
    targetMuscle: 'legs',
    description: 'Improves balance, hip mobility, and single-leg strength.',
    difficulty: 'beginner',
    equipment: ['Dumbbells'],
    caloriesBurnedPerMin: 6,
    instructions: [
      'Stand tall holding a dumbbell in each hand.',
      'Step forward with one foot, lowering your hips until both knees are bent at 90 degrees.',
      'Keep your torso upright and front knee directly above your ankle.',
      'Drive forward off your front foot to step into the next lunge.'
    ]
  },

  // STRENGTH - SHOULDERS
  {
    id: 'ex-overhead-press',
    name: 'Dumbbell Shoulder Press',
    category: 'strength',
    targetMuscle: 'shoulders',
    description: 'Builds strong, stable shoulders and targets the anterior and lateral deltoids.',
    difficulty: 'intermediate',
    equipment: ['Dumbbells', 'Bench'],
    caloriesBurnedPerMin: 5,
    instructions: [
      'Sit tall on a bench holding dumbbells at shoulder height.',
      'Keep your core braced and press the weights straight up overhead.',
      'Do not arch your lower back.',
      'Lower the weights under control to shoulder level.'
    ]
  },
  {
    id: 'ex-lateral-raise',
    name: 'Dumbbell Lateral Raise',
    category: 'strength',
    targetMuscle: 'shoulders',
    description: 'The best exercise for isolation of the lateral deltoid to build shoulder width.',
    difficulty: 'beginner',
    equipment: ['Dumbbells'],
    caloriesBurnedPerMin: 4,
    instructions: [
      'Stand with a slight forward hinge holding dumbbells at your sides.',
      'Raise your arms out to the sides with a slight bend in your elbows.',
      'Bring the dumbbells to shoulder height, palms facing down.',
      'Slowly lower back to starting position.'
    ]
  },

  // STRENGTH - ARMS
  {
    id: 'ex-bicep-curl',
    name: 'Dumbbell Bicep Curl',
    category: 'strength',
    targetMuscle: 'arms',
    description: 'Isolates the biceps and increases upper arm definition.',
    difficulty: 'beginner',
    equipment: ['Dumbbells'],
    caloriesBurnedPerMin: 3.5,
    instructions: [
      'Stand tall with dumbbells at your sides, palms facing forward.',
      'Keep your elbows tucked and curl the weights up to your shoulders.',
      'Squeeze the biceps at the top of the contraction.',
      'Lower the weights slowly.'
    ]
  },
  {
    id: 'ex-tricep-pushdown',
    name: 'Cable Triceps Pushdown',
    category: 'strength',
    targetMuscle: 'arms',
    description: 'Targets the lateral and medial heads of the triceps for arm density.',
    difficulty: 'beginner',
    equipment: ['Cable Machine', 'Rope Attachment'],
    caloriesBurnedPerMin: 3.5,
    instructions: [
      'Grip the rope and stand close to the cable column.',
      'Keep your elbows pinned to your ribs.',
      'Push the rope down towards your thighs, parting the rope at the bottom.',
      'Squeeze your triceps, then slowly return to the top.'
    ]
  },

  // CARDIO EXERCISES
  {
    id: 'ex-brisk-walking',
    name: 'Brisk Walking',
    category: 'cardio',
    targetMuscle: 'full_body',
    description: 'Low-impact, highly sustainable cardiovascular aerobic fat-burning workout.',
    difficulty: 'beginner',
    equipment: ['None (Shoes only)'],
    caloriesBurnedPerMin: 4.5,
    instructions: [
      'Walk at a steady, moderately challenging pace where you can talk but not sing.',
      'Maintain upright posture and swing your arms naturally.'
    ]
  },
  {
    id: 'ex-running',
    name: 'Outdoor Running',
    category: 'cardio',
    targetMuscle: 'legs',
    description: 'High calorie burner, excellent for lung capacity and lower limb endurance.',
    difficulty: 'intermediate',
    equipment: ['None (Shoes only)'],
    caloriesBurnedPerMin: 10.5,
    instructions: [
      'Run at a moderate, conversational aerobic heart rate pace.',
      'Ensure soft heel-to-toe landing, maintaining relaxed shoulders.'
    ]
  },
  {
    id: 'ex-cycling',
    name: 'Stationary Cycling',
    category: 'cardio',
    targetMuscle: 'legs',
    description: 'Lower impact cardio preserving knee joints while training the quadriceps and calves.',
    difficulty: 'beginner',
    equipment: ['Stationary Bike'],
    caloriesBurnedPerMin: 8,
    instructions: [
      'Adjust seat height so your knee has a slight bend at the bottom of the stroke.',
      'Maintain a consistent RPM speed (e.g. 80-90 RPM).'
    ]
  },
  {
    id: 'ex-hiit',
    name: 'High Intensity Interval Training (HIIT)',
    category: 'cardio',
    targetMuscle: 'full_body',
    description: 'Short intervals of maximal effort followed by brief periods of active recovery for maximum EPOC fat burning.',
    difficulty: 'advanced',
    equipment: ['Bodyweight'],
    caloriesBurnedPerMin: 13,
    instructions: [
      'Perform 30 seconds of high-effort Jumping Jacks / Burpees.',
      'Rest for 30 seconds doing a slow march-in-place.',
      'Repeat the cycle for 15-20 total minutes.'
    ]
  },
  {
    id: 'ex-jump-rope',
    name: 'Jump Rope Workout',
    category: 'cardio',
    targetMuscle: 'legs',
    description: 'Incredible agility, calves, and systemic cardiovascular endurance builder.',
    difficulty: 'intermediate',
    equipment: ['Jump Rope'],
    caloriesBurnedPerMin: 11,
    instructions: [
      'Hold the handles with a relaxed grip.',
      'Keep elbows close to your body and turn the rope using only your wrists.',
      'Jump just high enough to clear the rope, staying on your toes.'
    ]
  }
];

export const WORKOUT_PROGRAMS: WorkoutProgram[] = [
  // WEIGHT LOSS WORKOUTS
  {
    id: 'wp-loss-beg',
    name: '7-Day Beginner Workout',
    category: 'weight_loss',
    description: 'A structured beginner-friendly program to introduce full-body resistance training and basic aerobic conditioning.',
    durationDays: 7,
    frequency: '3 Days / Week',
    exercises: [
      { exerciseId: 'ex-push-ups', sets: '3', reps: '10-12' },
      { exerciseId: 'ex-lunge', sets: '3', reps: '12 per leg' },
      { exerciseId: 'ex-lat-pulldown', sets: '3', reps: '12' },
      { exerciseId: 'ex-brisk-walking', durationMin: 20 }
    ]
  },
  {
    id: 'wp-loss-hiit',
    name: '30-Day Fat Loss Challenge',
    category: 'weight_loss',
    description: 'A high-intensity calorie incineration program alternating daily between bodyweight strength and metabolic cardio blasts.',
    durationDays: 30,
    frequency: '5 Days / Week',
    exercises: [
      { exerciseId: 'ex-hiit', durationMin: 20 },
      { exerciseId: 'ex-push-ups', sets: '4', reps: '15' },
      { exerciseId: 'ex-lunge', sets: '3', reps: '15 per leg' },
      { exerciseId: 'ex-jump-rope', durationMin: 10 }
    ]
  },
  {
    id: 'wp-loss-home',
    name: 'Home Workout Plan',
    category: 'weight_loss',
    description: 'Requires absolutely zero equipment, utilizing bodyweight gravity angles to burn calories and build clean definition.',
    durationDays: 14,
    frequency: '4 Days / Week',
    exercises: [
      { exerciseId: 'ex-push-ups', sets: '4', reps: 'Max' },
      { exerciseId: 'ex-lunge', sets: '4', reps: '15 per leg' },
      { exerciseId: 'ex-hiit', durationMin: 15 }
    ]
  },

  // MUSCLE GAIN WORKOUTS
  {
    id: 'wp-gain-ppl',
    name: 'Push Pull Legs (PPL) Split',
    category: 'muscle_gain',
    description: 'The golden standard of training frequency and synergy, grouping muscle groups by action to maximize hypertrophy and recovery.',
    durationDays: 30,
    frequency: '6 Days / Week',
    exercises: [
      { exerciseId: 'ex-bench-press', sets: '4', reps: '8-10' },
      { exerciseId: 'ex-db-press', sets: '3', reps: '10' },
      { exerciseId: 'ex-pull-ups', sets: '4', reps: '8-12' },
      { exerciseId: 'ex-barbell-row', sets: '3', reps: '10' },
      { exerciseId: 'ex-squat', sets: '4', reps: '8-10' },
      { exerciseId: 'ex-overhead-press', sets: '3', reps: '10' },
      { exerciseId: 'ex-bicep-curl', sets: '3', reps: '12' },
      { exerciseId: 'ex-tricep-pushdown', sets: '3', reps: '12' }
    ]
  },
  {
    id: 'wp-gain-bodybuilder',
    name: 'Beginner Bodybuilding Plan',
    category: 'muscle_gain',
    description: 'A balanced split focusing heavily on mastering compound foundational lifts while inducing moderate muscular hypertrophy.',
    durationDays: 14,
    frequency: '4 Days / Week',
    exercises: [
      { exerciseId: 'ex-bench-press', sets: '4', reps: '10' },
      { exerciseId: 'ex-lat-pulldown', sets: '4', reps: '12' },
      { exerciseId: 'ex-squat', sets: '4', reps: '10' },
      { exerciseId: 'ex-overhead-press', sets: '3', reps: '12' }
    ]
  }
];
