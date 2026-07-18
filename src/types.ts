export interface UserProfile {
  age: number;
  gender: 'male' | 'female' | 'other';
  height: number; // cm
  weight: number; // kg
  targetWeight: number; // kg
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
  fitnessExperience: 'beginner' | 'intermediate' | 'advanced';
  dietStyle: 'balanced' | 'vegetarian' | 'vegan' | 'keto' | 'mediterranean' | 'high_protein' | 'low_carb' | 'halal' | 'south_asian';
  allergies: string[];
  medicalRestrictions: string[];
  waterGoal: number; // ml
  calorieGoal: number; // kcal
  proteinGoal: number; // g
  carbsGoal: number; // g
  fatGoal: number; // g
}

export interface FoodItem {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  vitamins: string[];
  minerals: string[];
  benefits: string;
  servingSize: string;
}

export interface Meal {
  name: string;
  time?: string;
  foods: { food: FoodItem; quantity: string }[];
}

export interface DietPlan {
  id: string;
  name: string;
  category: 'weight_loss' | 'weight_gain';
  description: string;
  durationDays: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  meals: {
    [key: string]: Meal[]; // e.g. "Breakfast", "Morning Snack", "Lunch", "Pre-Workout", "Post-Workout", "Dinner", "Before Sleep"
  };
  benefits: string[];
}

export interface Exercise {
  id: string;
  name: string;
  category: 'strength' | 'cardio';
  targetMuscle: 'chest' | 'back' | 'legs' | 'shoulders' | 'arms' | 'core' | 'full_body';
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  equipment: string[];
  caloriesBurnedPerMin: number;
  instructions: string[];
  demoIllustrationUrl?: string;
}

export interface WorkoutProgram {
  id: string;
  name: string;
  category: 'weight_loss' | 'muscle_gain' | 'general';
  description: string;
  durationDays: number;
  frequency: string;
  exercises: { exerciseId: string; sets?: string; reps?: string; durationMin?: number }[];
}

export interface Recipe {
  id: string;
  title: string;
  category: 'breakfast' | 'lunch' | 'dinner' | 'snacks' | 'smoothies';
  dietTags: string[];
  prepTime: number; // mins
  cookTime: number; // mins
  difficulty: 'easy' | 'medium' | 'hard';
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  ingredients: string[];
  instructions: string[];
  imageUrl: string;
}

export interface BlogArticle {
  id: string;
  title: string;
  slug: string;
  category: 'fat_loss' | 'muscle_building' | 'nutrition' | 'supplements' | 'lifestyle';
  summary: string;
  content: string;
  readTime: number;
  tags: string[];
  author: string;
  publishedAt: string;
}

export interface DailyChallenge {
  id: string;
  title: string;
  description: string;
  points: number;
  completed: boolean;
}

export interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}

export interface Habit {
  id: string;
  title: string;
  completed: boolean;
  streak: number;
}

