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
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80',
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
    imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80',
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
    imageUrl: 'https://images.unsplash.com/photo-1543353071-10c8ba85a904?w=800&auto=format&fit=crop&q=80',
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
    imageUrl: 'https://images.unsplash.com/photo-1522037299833-246485724249?w=800&auto=format&fit=crop&q=80',
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
    imageUrl: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=800&auto=format&fit=crop&q=80',
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
    imageUrl: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&auto=format&fit=crop&q=80',
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
    imageUrl: 'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=800&auto=format&fit=crop&q=80',
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
    imageUrl: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=800&auto=format&fit=crop&q=80',
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
    imageUrl: 'https://images.unsplash.com/photo-1601050690597-df056fb49785?w=800&auto=format&fit=crop&q=80',
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
    imageUrl: 'https://images.unsplash.com/photo-1506084868230-bb9d95c24759?w=800&auto=format&fit=crop&q=80',
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
    imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80',
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
  },
  {
    id: 'dl-paleo',
    name: 'Paleolithic Ancestral Reset',
    category: 'weight_loss',
    description: 'Ancestral lifestyle-focused menu emphasizing whole-source proteins, vegetables, tubers, and fats, while completely eliminating processed carbohydrates and dairy.',
    durationDays: 30,
    difficulty: 'intermediate',
    benefits: ['Drastically improves gut health', 'Reduces systemic inflammation', 'Promotes clean cellular energy'],
    imageUrl: 'https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?w=800&auto=format&fit=crop&q=80',
    meals: {
      Breakfast: [
        { name: 'Whole egg scramble with spinach', foods: [getFood('f3', '2 eggs'), getFood('f14', '100g')] }
      ],
      'Morning Snack': [
        { name: 'Raw sliced avocado with mineral salt', foods: [getFood('f4', '100g')] }
      ],
      Lunch: [
        { name: 'Roasted chicken breast with baked sweet potato', foods: [getFood('f1', '150g'), getFood('f9', '120g')] }
      ],
      Dinner: [
        { name: 'Wild seared Salmon with spinach', foods: [getFood('f6', '160g'), getFood('f14', '150g')] }
      ]
    }
  },
  {
    id: 'dl-low-carb',
    name: 'High-Protein Metabolic Accelerator',
    category: 'weight_loss',
    description: 'A low-carbohydrate plan optimized to quickly purge excess subcutaneous water, stabilize glucose levels, and induce heavy dietary thermogenesis.',
    durationDays: 14,
    difficulty: 'beginner',
    benefits: ['Expedites flat midsection', 'Eliminates mid-day energy crashes', 'Preserves skeletal muscle'],
    imageUrl: 'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?w=800&auto=format&fit=crop&q=80',
    meals: {
      Breakfast: [
        { name: 'Egg white and whole egg scramble', foods: [getFood('f3', '2 eggs'), getFood('f14', '50g')] }
      ],
      'Morning Snack': [
        { name: 'Non-fat Greek Yogurt with raw almonds', foods: [getFood('f7', '180g'), getFood('f8', '15g')] }
      ],
      Lunch: [
        { name: 'Double protein Grilled Chicken breast', foods: [getFood('f1', '200g'), getFood('f14', '120g')] }
      ],
      Dinner: [
        { name: 'Lemon-herb pan-fried Salmon', foods: [getFood('f6', '150g'), getFood('f4', '60g')] }
      ]
    }
  },
  {
    id: 'dl-pescatarian',
    name: 'Pescatarian Lean-Out Program',
    category: 'weight_loss',
    description: 'A premium marine-protein and clean plant-based protocol prioritizing high omega-3 fatty acids to protect joint integrity while shredded.',
    durationDays: 21,
    difficulty: 'beginner',
    benefits: ['Excellent cardiovascular profile', 'High mental focus and clarity', 'Promotes cellular hydration'],
    imageUrl: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=800&auto=format&fit=crop&q=80',
    meals: {
      Breakfast: [
        { name: 'Boiled eggs with fresh avocado slices', foods: [getFood('f3', '2 eggs'), getFood('f4', '80g')] }
      ],
      'Morning Snack': [
        { name: 'Greek Yogurt with handful of almonds', foods: [getFood('f7', '150g'), getFood('f8', '15g')] }
      ],
      Lunch: [
        { name: 'Sautéed spinach paneer and brown rice bowl', foods: [getFood('f13', '80g'), getFood('f14', '100g'), getFood('f2', '80g')] }
      ],
      Dinner: [
        { name: 'Broiled Salmon with sweet potato mash', foods: [getFood('f6', '180g'), getFood('f9', '100g')] }
      ]
    }
  },
  {
    id: 'dl-military',
    name: 'High-Intensity 3-Day Shred',
    category: 'weight_loss',
    description: 'A brief, highly structured calorie-cycling routine designed for emergency fat-loss prep before athletic contests or weight ins.',
    durationDays: 3,
    difficulty: 'intermediate',
    benefits: ['Extremely rapid metabolic shock', 'Purges subcutaneous water retention', 'Drastic weight reduction'],
    imageUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&auto=format&fit=crop&q=80',
    meals: {
      Breakfast: [
        { name: 'One boiled egg and half cup dry oats cooked', foods: [getFood('f3', '1 egg'), getFood('f5', '30g')] }
      ],
      Lunch: [
        { name: 'Single chicken breast with raw spinach', foods: [getFood('f1', '120g'), getFood('f14', '100g')] }
      ],
      Dinner: [
        { name: 'Lean Salmon fillet with water', foods: [getFood('f6', '100g')] }
      ]
    }
  },
  {
    id: 'dl-dash',
    name: 'DASH-Compliant Sodium Flush',
    category: 'weight_loss',
    description: 'A mineral-rich fat loss dietary protocol specifically configured to reduce blood pressure, drain excess water weight, and eliminate bloating.',
    durationDays: 30,
    difficulty: 'intermediate',
    benefits: ['Optimizes blood pressure levels', 'Dramatically improves vascular health', 'Flushes stagnant subcutaneous fluids'],
    imageUrl: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop&q=80',
    meals: {
      Breakfast: [
        { name: 'Greek Yogurt oatmeal bowl', foods: [getFood('f5', '40g'), getFood('f7', '120g')] }
      ],
      'Morning Snack': [
        { name: 'Raw unsalted almonds', foods: [getFood('f8', '20g')] }
      ],
      Lunch: [
        { name: 'Spiced Dal Chana soup with whole wheat roti', foods: [getFood('f12', '180g'), getFood('f11', '1 roti')] }
      ],
      Dinner: [
        { name: 'Herbed Chicken breast with baked sweet potato', foods: [getFood('f1', '140g'), getFood('f9', '100g')] }
      ]
    }
  },
  {
    id: 'dl-veg-shred',
    name: 'Plant-Based Thermogenic Shred',
    category: 'weight_loss',
    description: '100% vegetarian fat burner utilizing slow-digesting pulses, high-fiber complexes, and high protein paneer to maintain continuous metabolic burner state.',
    durationDays: 14,
    difficulty: 'beginner',
    benefits: ['Promotes profound intestinal satiety', 'Superb digestive regular motility', 'Balances daily blood lipid profiles'],
    imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80',
    meals: {
      Breakfast: [
        { name: 'Oatmeal with peanut butter dollop', foods: [getFood('f5', '45g'), getFood('f10', '15g')] }
      ],
      'Morning Snack': [
        { name: 'Light cottage cheese bowl', foods: [getFood('f13', '100g')] }
      ],
      Lunch: [
        { name: 'Dal Chana soup with steamed spinach', foods: [getFood('f12', '180g'), getFood('f14', '120g')] }
      ],
      Dinner: [
        { name: 'Sautéed paneer spinach with brown rice', foods: [getFood('f13', '100g'), getFood('f14', '100g'), getFood('f2', '60g')] }
      ]
    }
  },
  {
    id: 'dl-glycemic',
    name: 'Low-Glycemic Insulin Protocol',
    category: 'weight_loss',
    description: 'Stabilizes baseline insulin curves by utilizing low-glycemic carbs and high dietary fibers, making fat stores highly accessible for daily cellular oxidation.',
    durationDays: 30,
    difficulty: 'intermediate',
    benefits: ['Stops sweet and salty cravings completely', 'Unlocks refractory fat burning pathways', 'Sustains steady cellular mitochondrial output'],
    imageUrl: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&auto=format&fit=crop&q=80',
    meals: {
      Breakfast: [
        { name: 'Oatmeal mixed with whey isolate protein', foods: [getFood('f5', '40g'), getFood('f15', '20g')] }
      ],
      'Morning Snack': [
        { name: 'Boiled egg white with raw almonds', foods: [getFood('f3', '2 eggs'), getFood('f8', '15g')] }
      ],
      Lunch: [
        { name: 'Baked Salmon with fresh spinach', foods: [getFood('f6', '140g'), getFood('f14', '150g')] }
      ],
      Dinner: [
        { name: 'Seasoned Chicken breast with sweet potato mash', foods: [getFood('f1', '140g'), getFood('f9', '80g')] }
      ]
    }
  },
  {
    id: 'dl-carnivore',
    name: 'Carnivore Elimination Protocol',
    category: 'weight_loss',
    description: 'Highly therapeutic high-fat, high-protein animal-only diet designed to resolve gut hyper-permeability while promoting hyper-fat burning.',
    durationDays: 30,
    difficulty: 'advanced',
    benefits: ['Complete gut biome reset', 'Total eradication of physical bloating', 'Highest rates of nitrogen retention'],
    imageUrl: 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?w=800&auto=format&fit=crop&q=80',
    meals: {
      Breakfast: [
        { name: 'Scrambled eggs with butter', foods: [getFood('f3', '3 eggs')] }
      ],
      Lunch: [
        { name: 'Pan-seared Chicken breast with skin', foods: [getFood('f1', '220g')] }
      ],
      Dinner: [
        { name: 'Thick seared Salmon fillet', foods: [getFood('f6', '200g')] }
      ]
    }
  },
  {
    id: 'dl-carb-cycling',
    name: 'Athletic Carb-Cycling Protocol',
    category: 'weight_loss',
    description: 'A performance fat-burner alternating low carb days on rest intervals with moderate carb intake on intense weightlifting days.',
    durationDays: 21,
    difficulty: 'advanced',
    benefits: ['Preserves explosive athletic force output', 'Triggers acute localized lipolysis', 'Maximizes muscle glycogen loading'],
    imageUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&auto=format&fit=crop&q=80',
    meals: {
      Breakfast: [
        { name: 'Protein Oats bowl', foods: [getFood('f5', '50g'), getFood('f15', '20g')] }
      ],
      'Morning Snack': [
        { name: 'Greek Yogurt with berries', foods: [getFood('f7', '150g')] }
      ],
      Lunch: [
        { name: 'Chicken breast with baked sweet potato', foods: [getFood('f1', '160g'), getFood('f9', '120g')] }
      ],
      Dinner: [
        { name: 'Seared Salmon with steamed spinach', foods: [getFood('f6', '140g'), getFood('f14', '150g')] }
      ]
    }
  },
  {
    id: 'dl-detox',
    name: 'Superfood Antioxidant Flush',
    category: 'weight_loss',
    description: 'A micronutrient-focused light calorie detox designed to saturating cells with raw vitamins, reducing systemic physical stress, and boosting liver pathways.',
    durationDays: 7,
    difficulty: 'beginner',
    benefits: ['Radiant skin complexion', 'Profound full body detoxification', 'Unloads heavy liver congestion'],
    imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&auto=format&fit=crop&q=80',
    meals: {
      Breakfast: [
        { name: 'Super green Greek Yogurt spinach bowl', foods: [getFood('f7', '150g'), getFood('f14', '100g')] }
      ],
      'Morning Snack': [
        { name: 'Raw sliced avocado and almonds', foods: [getFood('f4', '80g'), getFood('f8', '10g')] }
      ],
      Lunch: [
        { name: 'Lentil Dal soup with spinach', foods: [getFood('f12', '150g'), getFood('f14', '80g')] }
      ],
      Dinner: [
        { name: 'Herb pan Salmon with sweet potato', foods: [getFood('f6', '120g'), getFood('f9', '80g')] }
      ]
    }
  }
];
