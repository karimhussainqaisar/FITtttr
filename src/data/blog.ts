import { BlogArticle } from '../types';

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    id: 'b1',
    title: 'The Science of Caloric Deficit: How Fat Loss Actually Works',
    slug: 'science-of-caloric-deficit',
    category: 'fat_loss',
    summary: 'Explore the thermodynamic laws of energy balance, metabolic adaptation, and why extreme caloric restriction often backfires.',
    content: `
### Energy Balance and the First Law of Thermodynamics

At its absolute core, fat loss is governed by the laws of thermodynamics. To lose adipose tissue, you must create an energy deficit. This means your energy expenditure (TDEE - Total Daily Energy Expenditure) must exceed your energy intake.

However, the human body is not a simple calculator; it is an active, complex biological organism. When you consume fewer calories than you burn, your body mobilizes stored triglycerides from fat cells to make up the energy difference, causing them to shrink.

### Components of Total Daily Energy Expenditure (TDEE)

Your TDEE is composed of four distinct layers:
1. **Basal Metabolic Rate (BMR):** The energy required to keep you alive and functioning at complete rest (60-70% of TDEE).
2. **Non-Exercise Activity Thermogenesis (NEAT):** Energy expended during general daily movement like fidgeting, walking, and standing (15-30% of TDEE).
3. **Thermic Effect of Food (TEF):** The energy spent digesting and processing the foods you eat (about 10% of TDEE, significantly higher for protein).
4. **Exercise Activity Thermogenesis (EAT):** The energy burned during structured workouts (only 5-10% of TDEE).

### Why Extreme Deficits Backfire

When you place your body in an excessively large caloric deficit (e.g. cutting calories by 50% overnight), your body triggers a survival mechanism known as **metabolic adaptation** (or adaptive thermogenesis):
- Your thyroid hormones (T3 and T4) decrease.
- Your leptin levels drop, sending intense hunger signals to your brain.
- Your NEAT subconsciously decreases—you stand less, walk less, and feel lethargic, reducing your daily calorie burn automatically.

### The Ideal Strategy

For healthy, sustainable, long-term fat loss, aim for a **moderate caloric deficit of 15% to 25%** below your TDEE (typically a 300 to 500 calorie deficit daily). This allows you to lose fat while preserving valuable, metabolism-boosting skeletal muscle mass. Pair this with high protein intake (1.6g to 2.2g per kg of bodyweight) to maximize TEF and satiety.
`,
    readTime: 5,
    tags: ['Fat Loss', 'Thermodynamics', 'Metabolism', 'Calorie Deficit'],
    author: 'Dr. Sarah Jenkins, PhD (Nutrition)',
    publishedAt: '2026-06-15'
  },
  {
    id: 'b2',
    title: 'Hypertrophy Training Demystified: The 3 Drivers of Muscle Growth',
    slug: 'hypertrophy-training-demystified',
    category: 'muscle_building',
    summary: 'Understand the biological pathways behind skeletal muscle hypertrophy: mechanical tension, metabolic stress, and muscle damage.',
    content: `
### How Muscle Growth Occurs (Hypertrophy)

Skeletal muscle hypertrophy is the increase in the size of muscle fibers. To stimulate this adaptive response, you must subject the muscle to mechanical demands that exceed its current threshold, forcing cellular remodeling.

Scientific literature defines three primary mechanisms that initiate the hypertrophy cascade:

#### 1. Mechanical Tension
This is the most critical driver of muscle growth. Mechanical tension occurs when a muscle contracts against a heavy load through a full range of motion. The mechanoreceptors on the muscle cell membranes detect this physical stretching and tension, converting it into chemical growth signals (activating the mTOR pathway).
- **How to optimize:** Lift weights that represent 60% to 85% of your one-rep max, and focus on **progressive overload**—consistently adding weight or reps over time.

#### 2. Metabolic Stress
Have you ever felt "the pump"? That is metabolic stress. It is caused by the accumulation of metabolites (like lactate, hydrogen ions, and inorganic phosphate) in the muscle fibers during high-repetition training, which restricts oxygen flow (ischemia) and causes cellular swelling.
- **How to optimize:** Keep rest periods relatively short (60-90 seconds) and train in the 10-15 repetition range, focusing on continuous tension.

#### 3. Muscle Damage
Localized microscopic tears in the muscle fibers (sarcomeres) occur during heavy training, particularly during the eccentric (lowering) phase of a lift. This micro-damage triggers an inflammatory response, activating satellite cells to fuse with existing muscle fibers to repair and reinforce them.
- **How to optimize:** Focus on a slow, controlled eccentric phase (2-4 seconds) when lowering the weights.

### The Golden Training Frequency

For optimal muscle hypertrophy, research suggests training each muscle group **2 to 3 times per week** with a volume of **10 to 20 working sets per muscle group weekly**, pushing close to muscular failure (leaving 1 to 3 repetitions in reserve).
`,
    readTime: 6,
    tags: ['Hypertrophy', 'Muscle Building', 'Progressive Overload', 'Strength Training'],
    author: 'Coach Marcus Vance, CSCS',
    publishedAt: '2026-07-01'
  },
  {
    id: 'b3',
    title: 'The Truth About Micronutrients: Vitamins & Minerals for Optimal Performance',
    slug: 'truth-about-micronutrients',
    category: 'nutrition',
    summary: 'Beyond calories and macros, discover how key micronutrients regulate energy production, joint integrity, and cognitive focus.',
    content: `
### The Overlooked Foundation of Fitness

While tracking macronutrients (proteins, carbohydrates, and fats) is crucial for regulating body composition, **micronutrients** (vitamins and minerals) are the critical co-factors that unlock and convert those macros into usable physical energy.

Without sufficient micronutrients, cellular metabolism slows down, muscle contraction efficiency decreases, and recovery times skyrocket.

### Essential Micronutrients for Fitness Enthusiasts

#### 1. Magnesium (The Muscle Relaxer)
Magnesium is involved in over 300 enzymatic reactions in the human body, including ATP (cellular energy) production, muscle contraction, and protein synthesis. It helps transport oxygen to muscles and plays a critical role in neuromuscular relaxation.
- **Food sources:** Spinach, pumpkin seeds, almonds, dark chocolate.

#### 2. Vitamin D3 (The Steroid Hormone)
Technically a hormone rather than a vitamin, Vitamin D3 binds to receptors on muscle cells, directly influencing protein synthesis and strength output. It is also vital for calcium absorption, maintaining bone density, and regulating testosterone levels.
- **Food sources & activation:** Sunlight exposure, salmon, whole eggs, fortified milks.

#### 3. Zinc (The Recovery Booster)
Zinc is essential for cellular division and growth, making it a critical player in muscular repair after heavy weight training. It supports immune system function and is a key building block for natural anabolic hormone synthesis.
- **Food sources:** Beef, chickpeas, pumpkin seeds, lentils.

### Actionable Dietary Rule

To secure a complete spectrum of micronutrients without tedious tracking, follow the **"Eat the Rainbow"** rule. Include at least 3 different colors of whole vegetables and fruits in your daily meals. The natural pigments in food correspond to specific nutrient families.
`,
    readTime: 4,
    tags: ['Nutrition', 'Micronutrients', 'Vitamins', 'Recovery'],
    author: 'Elena Rostova, Registered Dietitian',
    publishedAt: '2026-07-12'
  }
];
