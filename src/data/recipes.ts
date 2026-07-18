import { Recipe } from '../types';

export const HEALTHY_RECIPES: Recipe[] = [
  // BREAKFAST
  {
    id: 'r1',
    title: 'Anabolic Protein Oatmeal',
    category: 'breakfast',
    dietTags: ['high_protein', 'weight_gain', 'smoothies'],
    prepTime: 5,
    cookTime: 5,
    difficulty: 'easy',
    calories: 450,
    protein: 38,
    carbs: 52,
    fat: 10,
    ingredients: [
      '50g rolled oats',
      '200ml skimmed milk or almond milk',
      '1 scoop (30g) Whey Protein Isolate (Vanilla)',
      '1 tbsp (15g) Natural Peanut Butter',
      '30g fresh blueberries',
      'A pinch of cinnamon'
    ],
    instructions: [
      'Combine oats and milk in a pot over medium heat, cooking for 4-5 minutes until thick.',
      'Remove from heat and let cool slightly for 1 minute (prevents protein from clumping).',
      'Stir in the vanilla whey protein powder until fully smooth.',
      'Pour into a bowl, swirl in the natural peanut butter, and top with fresh blueberries and cinnamon.'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1517686469429-8bdb88b9f907?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'r2',
    title: 'Keto Avocado & Spinach Egg Scramble',
    category: 'breakfast',
    dietTags: ['keto', 'low_carb', 'weight_loss'],
    prepTime: 5,
    cookTime: 5,
    difficulty: 'easy',
    calories: 380,
    protein: 18,
    carbs: 6,
    fat: 32,
    ingredients: [
      '2 large whole eggs',
      'Half a medium avocado (sliced)',
      '1 cup (50g) baby spinach',
      '1 tsp extra virgin olive oil',
      '10g feta cheese (crumbled)',
      'Salt and cracked black pepper to taste'
    ],
    instructions: [
      'Heat olive oil in a non-stick pan over medium-low heat.',
      'Add spinach and sauté until slightly wilted (about 1 minute).',
      'Whisk eggs in a small bowl, pour into the pan, and stir gently to scramble.',
      'Once eggs are soft and cooked, plate them and garnish with avocado slices, feta cheese, and black pepper.'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=600&auto=format&fit=crop&q=80'
  },

  // LUNCH
  {
    id: 'r3',
    title: 'High-Protein Lemon Garlic Chicken Prep',
    category: 'lunch',
    dietTags: ['high_protein', 'weight_loss', 'weight_gain'],
    prepTime: 10,
    cookTime: 15,
    difficulty: 'easy',
    calories: 420,
    protein: 42,
    carbs: 35,
    fat: 9,
    ingredients: [
      '150g raw chicken breast (cut into cubes)',
      '100g cooked brown rice',
      '1 cup broccoli florets',
      '1 tbsp lemon juice',
      '2 cloves garlic (minced)',
      '1 tsp olive oil',
      'Oregano and paprika'
    ],
    instructions: [
      'Heat olive oil in a skillet, add minced garlic and sauté until fragrant.',
      'Add the cubed chicken breast, seasoning with salt, pepper, oregano, and paprika.',
      'Cook chicken for 8-10 minutes until golden and thoroughly cooked.',
      'Steam the broccoli in a separate pot or microwave for 3 minutes.',
      'Pour lemon juice over the cooked chicken and assemble your bowl with brown rice, chicken, and broccoli.'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'r4',
    title: 'Spiced Paneer & Dal Nourish Bowl',
    category: 'lunch',
    dietTags: ['vegetarian', 'high_protein', 'south_asian'],
    prepTime: 10,
    cookTime: 20,
    difficulty: 'medium',
    calories: 510,
    protein: 26,
    carbs: 58,
    fat: 18,
    ingredients: [
      '100g Paneer (low fat, cubed)',
      '1 cup (150g) cooked Dal Chana',
      '1 medium whole wheat chapati / Roti',
      '1/2 cup cucumber and tomato salad',
      '1/2 tsp turmeric and cumin powder'
    ],
    instructions: [
      'Heat a non-stick pan, spray lightly with oil, and toss paneer cubes with turmeric, cumin, and salt until browned.',
      'Warm up the cooked Dal Chana (lentil soup) in a separate pot.',
      'Lightly heat the roti.',
      'Assemble the lunch tray with the spiced paneer, warm dal, roti, and cucumber-tomato fresh salad.'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80'
  },

  // DINNER
  {
    id: 'r5',
    title: 'Omega-3 Rich Grilled Salmon & Sweet Potato',
    category: 'dinner',
    dietTags: ['mediterranean', 'high_protein', 'weight_loss'],
    prepTime: 10,
    cookTime: 15,
    difficulty: 'medium',
    calories: 490,
    protein: 34,
    carbs: 38,
    fat: 20,
    ingredients: [
      '120g Salmon fillet (skin-on)',
      '120g Sweet Potato (cubed)',
      '1.5 cups baby asparagus or spinach',
      '1 tsp avocado oil or olive oil',
      'Fresh dill and lemon wedges'
    ],
    instructions: [
      'Preheat oven or air fryer to 200°C (400°F). Toss sweet potato cubes in half the oil and roast for 15-20 minutes.',
      'Brush salmon with remaining oil, season with salt, pepper, and fresh dill.',
      'Grill salmon in a hot pan for 4-5 minutes skin-side down, flip and cook for another 3-4 minutes.',
      'Sauté or steam asparagus/spinach for 2 minutes.',
      'Serve salmon hot with lemon wedges, roasted sweet potato, and greens.'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600&auto=format&fit=crop&q=80'
  },

  // SNACKS & SMOOTHIES
  {
    id: 'r6',
    title: 'Creamy Berry-Avocado Keto Smoothie',
    category: 'smoothies',
    dietTags: ['keto', 'low_carb', 'smoothies', 'weight_loss'],
    prepTime: 5,
    cookTime: 0,
    difficulty: 'easy',
    calories: 290,
    protein: 6,
    carbs: 12,
    fat: 24,
    ingredients: [
      '1/4 medium ripe Avocado',
      '40g frozen strawberries or raspberries',
      '250ml unsweetened almond milk',
      '1 tbsp chia seeds',
      '1 packet stevia or erythritol'
    ],
    instructions: [
      'Add all ingredients into a high-speed blender.',
      'Blend for 45-60 seconds until perfectly creamy.',
      'Serve immediately in a glass with crushed ice.'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1553530979-7ee52a2670c4?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'r7',
    title: 'Peanut Butter Energy Protein Balls',
    category: 'snacks',
    dietTags: ['high_protein', 'weight_gain', 'snacks'],
    prepTime: 10,
    cookTime: 0,
    difficulty: 'easy',
    calories: 140, // per ball
    protein: 6,
    carbs: 12,
    fat: 8,
    ingredients: [
      '1 cup (100g) rolled oats',
      '1/2 cup (120g) natural creamy peanut butter',
      '1/3 cup honey or pure maple syrup',
      '1 scoop (30g) chocolate whey protein powder',
      '1 tbsp chia seeds'
    ],
    instructions: [
      'In a large mixing bowl, combine all ingredients together until a sticky dough forms.',
      'If too dry, add 1-2 tbsp of almond milk; if too wet, add a little more oats.',
      'Roll into bite-sized balls (about 10-12 total).',
      'Store in an airtight container in the freezer or fridge for a quick pre-workout bite.'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'r8',
    title: 'Anabolic Strawberry Berry-Blast Shake',
    category: 'smoothies',
    dietTags: ['high_protein', 'weight_loss', 'smoothies'],
    prepTime: 5,
    cookTime: 0,
    difficulty: 'easy',
    calories: 310,
    protein: 34,
    carbs: 32,
    fat: 3,
    ingredients: [
      '1.5 scoops (45g) Strawberry Whey Isolate',
      '100g frozen mixed berries',
      '250ml unsweetened almond milk',
      '150g fat-free Greek yogurt',
      '1 tbsp chia seeds'
    ],
    instructions: [
      'Add the unsweetened almond milk and Greek yogurt to your blender first.',
      'Add the strawberry whey protein, frozen mixed berries, and chia seeds.',
      'Blend on high speed for 40-50 seconds until completely smooth.',
      'Pour into a tall shaker bottle and enjoy immediately as a refreshing post-workout fuel.'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1553530979-7ee52a2670c4?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'r9',
    title: 'Baked Lemon Garlic Seabass Fillet',
    category: 'dinner',
    dietTags: ['mediterranean', 'high_protein', 'weight_loss'],
    prepTime: 10,
    cookTime: 12,
    difficulty: 'medium',
    calories: 350,
    protein: 41,
    carbs: 6,
    fat: 14,
    ingredients: [
      '180g fresh Seabass or Cod fillet',
      '1 tbsp extra virgin olive oil',
      '3 cloves garlic (sliced thin)',
      '1 tbsp fresh squeezed lemon juice',
      '100g asparagus spears',
      'Fresh parsley, salt, and black pepper'
    ],
    instructions: [
      'Preheat oven to 200°C (400°F) or prep your air fryer.',
      'Place seabass fillet on baking paper, rub with olive oil, lemon juice, sliced garlic, salt, and pepper.',
      'Arrange asparagus spears around the fish.',
      'Bake for 12-14 minutes until the fish flakes easily with a fork. Garnish with fresh chopped parsley before serving.'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'r10',
    title: 'High-Protein Vegan Lentil & Chickpea Curry',
    category: 'dinner',
    dietTags: ['vegetarian', 'high_protein'],
    prepTime: 15,
    cookTime: 25,
    difficulty: 'medium',
    calories: 430,
    protein: 24,
    carbs: 62,
    fat: 9,
    ingredients: [
      '120g canned brown lentils (drained)',
      '100g canned chickpeas (washed and drained)',
      '150ml light coconut milk',
      '1 medium onion & 1 tomato (chopped)',
      '1 tbsp curry powder, 1/2 tsp ginger-garlic paste',
      '1 tsp cumin seeds and fresh coriander'
    ],
    instructions: [
      'Heat oil in a deep pan, add cumin seeds, chopped onion, and ginger-garlic paste. Sauté until golden.',
      'Add chopped tomatoes and curry powder, stirring until a thick aromatic base forms.',
      'Stir in the brown lentils and chickpeas, then pour in the light coconut milk and 100ml water.',
      'Simmer on low heat for 20 minutes until curry thickens. Top with fresh chopped coriander and serve.'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'r11',
    title: 'Avocado Chicken Salad Power Bowl',
    category: 'lunch',
    dietTags: ['high_protein', 'low_carb', 'weight_loss'],
    prepTime: 10,
    cookTime: 10,
    difficulty: 'easy',
    calories: 460,
    protein: 45,
    carbs: 10,
    fat: 22,
    ingredients: [
      '160g cooked skinless chicken breast (shredded)',
      '1/2 medium ripe avocado (cubed)',
      '2 cups mixed baby salad greens (spinach, arugula)',
      '50g cherry tomatoes (halved)',
      '1 tbsp apple cider vinegar and 1 tsp olive oil',
      'Squeeze of fresh lime juice'
    ],
    instructions: [
      'In a large mixing bowl, arrange the mixed baby salad greens as your base.',
      'Add shredded cooked chicken breast and halved cherry tomatoes.',
      'Add the cubed fresh avocado gently to avoid mashing.',
      'Whisk olive oil, apple cider vinegar, and fresh lime juice together. Drizzle over the bowl, toss gently, and serve immediately.'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'r12',
    title: 'Post-Workout Banana Sweet Potato Power Oats',
    category: 'breakfast',
    dietTags: ['high_protein', 'weight_gain'],
    prepTime: 5,
    cookTime: 10,
    difficulty: 'easy',
    calories: 540,
    protein: 36,
    carbs: 82,
    fat: 10,
    ingredients: [
      '60g rolled oats',
      '80g boiled sweet potato (mashed)',
      '1 scoop (30g) Vanilla Whey Protein',
      '1/2 medium banana (sliced)',
      '150ml skimmed milk',
      '1 tbsp pumpkin seeds'
    ],
    instructions: [
      'In a saucepan, simmer rolled oats in skimmed milk for 5 minutes.',
      'Stir in the pre-boiled mashed sweet potato until smooth and creamy.',
      'Remove from heat, let cool slightly, then stir in the vanilla whey protein powder.',
      'Transfer to a serving bowl. Top with banana slices and pumpkin seeds for a crunch.'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1517686469429-8bdb88b9f907?w=600&auto=format&fit=crop&q=80'
  }
];
