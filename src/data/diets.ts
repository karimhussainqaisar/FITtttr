import { FoodItem, DietPlan } from '../types';

export const FOOD_DATABASE: FoodItem[] = [
  {
    id: 'f1',
    name: 'Grilled Chicken Breast',
    calories: 165,
    protein: 31,
    carbs: 0,
    fat: 3.6,
    fiber: 0,
    vitamins: ['B6', 'Niacin', 'B12'],
    minerals: ['Selenium', 'Phosphorus', 'Zinc'],
    benefits: 'High protein source perfect for building lean muscle mass and fat loss.',
    servingSize: '100g cooked'
  },
  {
    id: 'f2',
    name: 'Brown Rice',
    calories: 111,
    protein: 2.6,
    carbs: 23,
    fat: 0.9,
    fiber: 1.8,
    vitamins: ['B1', 'B3', 'B5'],
    minerals: ['Manganese', 'Magnesium', 'Selenium'],
    benefits: 'Complex carbohydrate that provides slow-release, sustained energy.',
    servingSize: '100g cooked'
  },
  {
    id: 'f3',
    name: 'Boiled Egg',
    calories: 155,
    protein: 13,
    carbs: 1.1,
    fat: 11,
    fiber: 0,
    vitamins: ['A', 'D', 'B2', 'B12'],
    minerals: ['Iron', 'Calcium', 'Zinc'],
    benefits: 'Complete protein source with essential healthy fats and vitamins.',
    servingSize: '100g (approx. 2 eggs)'
  },
  {
    id: 'f4',
    name: 'Avocado',
    calories: 160,
    protein: 2,
    carbs: 8.5,
    fat: 15,
    fiber: 6.7,
    vitamins: ['K', 'C', 'E', 'B6'],
    minerals: ['Potassium', 'Copper', 'Magnesium'],
    benefits: 'Rich in monounsaturated fats that support heart health and satiety.',
    servingSize: '100g'
  },
  {
    id: 'f5',
    name: 'Oats (Rolled)',
    calories: 389,
    protein: 16.9,
    carbs: 66,
    fat: 6.9,
    fiber: 10.6,
    vitamins: ['Thiamine', 'Folate'],
    minerals: ['Iron', 'Manganese', 'Zinc'],
    benefits: 'Rich in beta-glucan fiber, lowering cholesterol and aiding digestion.',
    servingSize: '100g dry'
  },
  {
    id: 'f6',
    name: 'Salmon Fillet',
    calories: 206,
    protein: 22,
    carbs: 0,
    fat: 12.4,
    fiber: 0,
    vitamins: ['D', 'B12', 'B6'],
    minerals: ['Selenium', 'Potassium'],
    benefits: 'Excellent source of Omega-3 fatty acids for joint and cognitive health.',
    servingSize: '100g grilled'
  },
  {
    id: 'f7',
    name: 'Greek Yogurt (0% Fat)',
    calories: 59,
    protein: 10,
    carbs: 3.6,
    fat: 0.4,
    fiber: 0,
    vitamins: ['B12', 'Riboflavin'],
    minerals: ['Calcium', 'Potassium'],
    benefits: 'High protein content plus gut-friendly probiotics for digestive health.',
    servingSize: '100g'
  },
  {
    id: 'f8',
    name: 'Almonds',
    calories: 579,
    protein: 21,
    carbs: 22,
    fat: 49,
    fiber: 12.5,
    vitamins: ['E', 'B2'],
    minerals: ['Magnesium', 'Manganese', 'Calcium'],
    benefits: 'Excellent portable snack packing healthy fats, fiber, and protein.',
    servingSize: '100g'
  },
  {
    id: 'f9',
    name: 'Sweet Potato',
    calories: 86,
    protein: 1.6,
    carbs: 20,
    fat: 0.1,
    fiber: 3,
    vitamins: ['A', 'C', 'B5', 'B6'],
    minerals: ['Potassium', 'Manganese'],
    benefits: 'Superb source of Vitamin A, complex carbs for energy and endurance.',
    servingSize: '100g baked'
  },
  {
    id: 'f10',
    name: 'Peanut Butter (Natural)',
    calories: 588,
    protein: 25,
    carbs: 20,
    fat: 50,
    fiber: 6,
    vitamins: ['B3', 'B6', 'E'],
    minerals: ['Magnesium', 'Manganese', 'Phosphorus'],
    benefits: 'Energy-dense source of healthy fats and plant-based protein.',
    servingSize: '100g'
  },
  {
    id: 'f11',
    name: 'Roti (Whole Wheat Chapati)',
    calories: 264,
    protein: 8,
    carbs: 55,
    fat: 2,
    fiber: 7,
    vitamins: ['B1', 'B3', 'Folate'],
    minerals: ['Magnesium', 'Zinc', 'Iron'],
    benefits: 'Staple South Asian carbohydrate providing essential fibers and carbs.',
    servingSize: '100g (approx. 2.5 rotis)'
  },
  {
    id: 'f12',
    name: 'Dal Chana (Chickpea Lentil Soup)',
    calories: 140,
    protein: 8,
    carbs: 22,
    fat: 2.5,
    fiber: 5,
    vitamins: ['B6', 'Folate'],
    minerals: ['Iron', 'Potassium', 'Magnesium'],
    benefits: 'High fiber, medium-protein vegetarian staple popular in Pakistan & India.',
    servingSize: '100g cooked'
  },
  {
    id: 'f13',
    name: 'Cottage Cheese (Paneer)',
    calories: 265,
    protein: 18,
    carbs: 3,
    fat: 20,
    fiber: 0,
    vitamins: ['D', 'B12'],
    minerals: ['Calcium', 'Phosphorus'],
    benefits: 'Excellent vegetarian protein source with moderate slow-digesting casein fat.',
    servingSize: '100g'
  },
  {
    id: 'f14',
    name: 'Spinach (Palak)',
    calories: 23,
    protein: 2.9,
    carbs: 3.6,
    fat: 0.4,
    fiber: 2.2,
    vitamins: ['A', 'C', 'K', 'Folate'],
    minerals: ['Iron', 'Calcium', 'Potassium'],
    benefits: 'Low-calorie nutrient-dense green aiding blood oxygenation and immunity.',
    servingSize: '100g raw'
  },
  {
    id: 'f15',
    name: 'Whey Protein Isolate',
    calories: 375,
    protein: 90,
    carbs: 3,
    fat: 1,
    fiber: 0,
    vitamins: ['B-Complex'],
    minerals: ['Calcium', 'Sodium'],
    benefits: 'Extremely fast-absorbing complete protein for post-workout muscle repair.',
    servingSize: '100g powder'
  }
];

// Helper to look up a food item
export const getFood = (id: string, quantity = '100g'): { food: FoodItem; quantity: string } => {
  const food = FOOD_DATABASE.find(f => f.id === id) || FOOD_DATABASE[0];
  return { food, quantity };
};

export const DIET_PLANS: DietPlan[] = [
  // BEGINNER WEIGHT LOSS PLANS
  {
    id: 'dl-beg-7',
    name: '7-Day Beginner Diet',
    category: 'weight_loss',
    description: 'A gentle entry into calorie restriction, focusing on wholesome, high-fiber single foods to build long-term nutrition habits.',
    durationDays: 7,
    difficulty: 'beginner',
    benefits: ['Establishes stable insulin levels', 'Teaches portion control', 'Eliminates water bloat'],
    meals: {
      Breakfast: [
        { name: 'Oatmeal with berries', foods: [getFood('f5', '40g'), getFood('f7', '100g')] }
      ],
      'Morning Snack': [
        { name: 'Boiled egg and almonds', foods: [getFood('f3', '1 egg'), getFood('f8', '15g')] }
      ],
      Lunch: [
        { name: 'Lean Chicken salad with brown rice', foods: [getFood('f1', '120g'), getFood('f2', '80g')] }
      ],
      Dinner: [
        { name: 'Pan-seared Salmon with steamed spinach', foods: [getFood('f6', '120g'), getFood('f14', '150g')] }
      ]
    }
  },
  {
    id: 'dl-beg-14',
    name: '14-Day Fat Loss Plan',
    category: 'weight_loss',
    description: 'A structured fortnight plan boosting metabolism through micro-snacking and elevated protein portions to optimize dietary thermogenesis.',
    durationDays: 14,
    difficulty: 'beginner',
    benefits: ['Activates thyroid hormones', 'Keeps mental fog at bay', 'Preserves muscular mass'],
    meals: {
      Breakfast: [
        { name: 'Scrambled eggs with spinach', foods: [getFood('f3', '2 eggs'), getFood('f14', '100g')] }
      ],
      'Morning Snack': [
        { name: 'Berries with Greek yogurt', foods: [getFood('f7', '150g')] }
      ],
      Lunch: [
        { name: 'Warm chicken bowl', foods: [getFood('f1', '150g'), getFood('f2', '50g'), getFood('f4', '50g')] }
      ],
      Dinner: [
        { name: 'Salmon and sweet potato mash', foods: [getFood('f6', '120g'), getFood('f9', '100g')] }
      ]
    }
  },
  {
    id: 'dl-beg-30',
    name: '30-Day Transformation Plan',
    category: 'weight_loss',
    description: 'A cyclical program designed for consistent, steady weight reduction while supporting intermediate workouts without physical fatigue.',
    durationDays: 30,
    difficulty: 'beginner',
    benefits: ['Reduces systemic inflammation', 'Improves digestive speed', 'Reduces visceral belly fat'],
    meals: {
      Breakfast: [
        { name: 'Protein Oatmeal', foods: [getFood('f5', '50g'), getFood('f15', '20g')] }
      ],
      'Morning Snack': [
        { name: 'Almonds', foods: [getFood('f8', '20g')] }
      ],
      Lunch: [
        { name: 'Whole wheat roti with paneer and dal', foods: [getFood('f11', '1 roti'), getFood('f13', '80g'), getFood('f12', '100g')] }
      ],
      Dinner: [
        { name: 'Grilled Chicken with sweet potato and spinach', foods: [getFood('f1', '150g'), getFood('f9', '80g'), getFood('f14', '100g')] }
      ]
    }
  },

  // SPECIALIZED DIETS
  {
    id: 'dl-keto',
    name: 'Keto Diet Plan',
    category: 'weight_loss',
    description: 'Extremely low-carb, high-fat design to trigger state of ketosis, switching your fuel source from glucose to fats.',
    durationDays: 14,
    difficulty: 'advanced',
    benefits: ['Rapid fat oxidation', 'Suppresses hunger hormones', 'High steady energy levels'],
    meals: {
      Breakfast: [
        { name: 'Eggs fried in butter with avocado', foods: [getFood('f3', '2 eggs'), getFood('f4', '100g')] }
      ],
      'Morning Snack': [
        { name: 'Roasted almonds', foods: [getFood('f8', '30g')] }
      ],
      Lunch: [
        { name: 'Bacon wrapped chicken breasts', foods: [getFood('f1', '150g'), getFood('f4', '50g')] }
      ],
      Dinner: [
        { name: 'Lemon garlic Salmon with buttered spinach', foods: [getFood('f6', '150g'), getFood('f14', '100g')] }
      ]
    }
  },
  {
    id: 'dl-pakistani',
    name: 'Pakistani / South Asian Weight Loss Diet',
    category: 'weight_loss',
    description: 'A specialized diet containing healthy, spice-infused regional dishes prepared with minimal oil to achieve fat loss goals in South Asian households.',
    durationDays: 14,
    difficulty: 'intermediate',
    benefits: ['Fits standard home cooking', 'Rich in antioxidant spices', 'Keeps diet culturally relevant'],
    meals: {
      Breakfast: [
        { name: 'Egg white palak omelette and half roti', foods: [getFood('f3', '3 egg whites'), getFood('f14', '50g'), getFood('f11', '1 half roti')] }
      ],
      'Morning Snack': [
        { name: 'A handful of spiced almonds', foods: [getFood('f8', '15g')] }
      ],
      Lunch: [
        { name: 'Lentil soup (Dal) with chicken seekh kebab', foods: [getFood('f12', '150g'), getFood('f1', '100g')] }
      ],
      Dinner: [
        { name: 'Whole wheat chapati with paneer and spinach sabzi', foods: [getFood('f11', '1 roti'), getFood('f13', '80g'), getFood('f14', '100g')] }
      ]
    }
  },
  {
    id: 'dl-mediterranean',
    name: 'Mediterranean Diet Plan',
    category: 'weight_loss',
    description: 'Heart-healthy diet focused on monounsaturated oils, seafood, organic veggies, and complex, grain-based carbohydrates.',
    durationDays: 30,
    difficulty: 'beginner',
    benefits: ['Superb for cardiovascular system', 'Longevity promotion', 'No feelings of deprivation'],
    meals: {
      Breakfast: [
        { name: 'Greek yogurt with almonds and a boiled egg', foods: [getFood('f7', '150g'), getFood('f8', '15g'), getFood('f3', '1 egg')] }
      ],
      'Morning Snack': [
        { name: 'Avocado slice with salt', foods: [getFood('f4', '80g')] }
      ],
      Lunch: [
        { name: 'Salmon and brown rice salad', foods: [getFood('f6', '120g'), getFood('f2', '100g')] }
      ],
      Dinner: [
        { name: 'Lemon herb Chicken with spinach and olive mash', foods: [getFood('f1', '120g'), getFood('f14', '150g')] }
      ]
    }
  },

  // HEALTHY WEIGHT GAIN PLANS
  {
    id: 'dg-skinny-beg',
    name: 'Skinny Beginner Weight Gain Plan',
    category: 'weight_gain',
    description: 'A progressive calorie surplus plan designed specifically for hardgainers looking to pack on quality size without storing excessive adipose body fat.',
    durationDays: 30,
    difficulty: 'beginner',
    benefits: ['Triggers rapid protein synthesis', 'Increases muscular glycogen storage', 'Overcomes hardgainer genetics'],
    meals: {
      Breakfast: [
        { name: 'Double Oats with peanut butter', foods: [getFood('f5', '80g'), getFood('f10', '30g')] }
      ],
      'Morning Snack': [
        { name: 'Banana Greek Yogurt blend', foods: [getFood('f7', '200g'), getFood('get_banana', '1 banana' as any)] }
      ],
      Lunch: [
        { name: 'Thick Paneer Roti wrap with Dal', foods: [getFood('f11', '2 rotis'), getFood('f13', '120g'), getFood('f12', '150g')] }
      ],
      'Pre-Workout': [
        { name: 'Baked Sweet Potato with almond butter', foods: [getFood('f9', '150g'), getFood('f8', '20g')] }
      ],
      'Post-Workout': [
        { name: 'Anabolic Whey Shake', foods: [getFood('f15', '40g')] }
      ],
      Dinner: [
        { name: 'Grilled Chicken, Brown Rice, Avocado bowl', foods: [getFood('f1', '200g'), getFood('f2', '150g'), getFood('f4', '100g')] }
      ],
      'Before Sleep': [
        { name: 'Cottage cheese with mixed nuts', foods: [getFood('f13', '100g'), getFood('f8', '15g')] }
      ]
    }
  },
  {
    id: 'dg-high-protein',
    name: 'High Protein Muscle Gain Plan',
    category: 'weight_gain',
    description: 'An advanced muscle building plan emphasizing maximum protein saturation and clean carbs to build dense muscular myofibrils.',
    durationDays: 30,
    difficulty: 'intermediate',
    benefits: ['Supports extreme muscle hypertrophy', 'Excellent cellular recovery', 'Increases natural growth hormones'],
    meals: {
      Breakfast: [
        { name: 'Egg white omelet and Oats', foods: [getFood('f3', '4 egg whites'), getFood('f5', '60g')] }
      ],
      'Morning Snack': [
        { name: 'Greek Yogurt with whey protein scoop', foods: [getFood('f7', '150g'), getFood('f15', '20g')] }
      ],
      Lunch: [
        { name: 'Big Salmon Brown Rice bowl', foods: [getFood('f6', '180g'), getFood('f2', '120g')] }
      ],
      'Pre-Workout': [
        { name: 'Oatmeal with peanut butter', foods: [getFood('f5', '40g'), getFood('f10', '20g')] }
      ],
      'Post-Workout': [
        { name: 'Post Workout Recovery shake', foods: [getFood('f15', '35g')] }
      ],
      Dinner: [
        { name: 'Heavy protein chicken and sweet potato', foods: [getFood('f1', '220g'), getFood('f9', '150g')] }
      ],
      'Before Sleep': [
        { name: 'Slow-digesting paneer', foods: [getFood('f13', '120g')] }
      ]
    }
  },
  {
    id: 'dg-pakistani',
    name: 'Pakistani Muscle Bulk Diet',
    category: 'weight_gain',
    description: 'Designed for South Asians to bulk cleanly using native kitchen components like whole wheat rotis, paneer, and high protein dals cooked with heart-healthy fats.',
    durationDays: 14,
    difficulty: 'beginner',
    benefits: ['Easy to procure locally', 'High calorie density', 'Rich in natural spices like turmeric'],
    meals: {
      Breakfast: [
        { name: 'Whole wheat paratha and egg bhurji', foods: [getFood('f11', '1.5 chapati'), getFood('f3', '3 eggs')] }
      ],
      'Morning Snack': [
        { name: 'Handful of almonds and dried dates', foods: [getFood('f8', '30g')] }
      ],
      Lunch: [
        { name: 'Heavy Dal Chana with boiled rice and roasted paneer', foods: [getFood('f12', '200g'), getFood('f2', '120g'), getFood('f13', '100g')] }
      ],
      'Pre-Workout': [
        { name: 'Sweet potato and boiled egg whites', foods: [getFood('f9', '120g'), getFood('f3', '2 egg whites')] }
      ],
      'Post-Workout': [
        { name: 'High speed Protein shake', foods: [getFood('f15', '30g')] }
      ],
      Dinner: [
        { name: 'Spiced Chicken breast with Roti and Spinach', foods: [getFood('f1', '180g'), getFood('f11', '2 chapati'), getFood('f14', '100g')] }
      ],
      'Before Sleep': [
        { name: 'Warm milk with honey and almonds', foods: [getFood('f8', '15g')] }
      ]
    }
  },
  {
    id: 'dl-if-168',
    name: '16:8 Intermittent Fasting Shred',
    category: 'weight_loss',
    description: 'A chrononutrition protocol restricting food consumption to an 8-hour window (e.g., 12 PM - 8 PM), boosting lipolysis, hormonal health, and insulin sensitivity.',
    durationDays: 14,
    difficulty: 'intermediate',
    benefits: ['Triggers cellular autophagy', 'Maximizes human growth hormone (HGH)', 'Drastically drops insulin spikes'],
    meals: {
      'Fast Period (16 Hours)': [
        { name: 'Black Coffee, Green Tea, or Water', foods: [getFood('f14', '0g')] }
      ],
      'Meal 1 (12:00 PM)': [
        { name: 'Greek Yogurt with sliced almonds & boiled eggs', foods: [getFood('f7', '200g'), getFood('f8', '20g'), getFood('f3', '2 eggs')] }
      ],
      'Mid-day Snack (3:30 PM)': [
        { name: 'Avocado salad bowl with Spinach', foods: [getFood('f4', '100g'), getFood('f14', '100g')] }
      ],
      'Meal 2 (7:30 PM)': [
        { name: 'Grilled Salmon with Sweet Potato & Broccoli', foods: [getFood('f6', '160g'), getFood('f9', '120g')] }
      ]
    }
  },
  {
    id: 'dg-veg-lean',
    name: 'Vegetarian Lean Muscle Builder',
    category: 'weight_gain',
    description: 'A structured high-protein plant-based nutrition template combining slow-digesting casein from paneer and legumes for maximal muscle protein synthesis.',
    durationDays: 30,
    difficulty: 'beginner',
    benefits: ['Sustained amino acid release', 'Extremely high antioxidant density', 'Optimizes digestive microbiome'],
    meals: {
      Breakfast: [
        { name: 'Thick Protein Oats with peanut butter', foods: [getFood('f5', '65g'), getFood('f10', '25g')] }
      ],
      'Morning Snack': [
        { name: 'Greek Yogurt with handful of almonds', foods: [getFood('f7', '180g'), getFood('f8', '20g')] }
      ],
      Lunch: [
        { name: 'Spiced Paneer, Dal Chana, and Chapati', foods: [getFood('f13', '100g'), getFood('f12', '150g'), getFood('f11', '1.5 roti')] }
      ],
      Dinner: [
        { name: 'Sautéed spinach with paneer cubes and brown rice', foods: [getFood('f14', '150g'), getFood('f13', '120g'), getFood('f2', '100g')] }
      ],
      'Before Sleep': [
        { name: 'Whey Protein Isolate Shake', foods: [getFood('f15', '30g')] }
      ]
    }
  }
];
