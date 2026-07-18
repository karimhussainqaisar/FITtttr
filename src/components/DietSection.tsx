import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { DIET_PLANS, FOOD_DATABASE } from '../data/diets';
import { DietPlan, FoodItem, Meal } from '../types';
import { 
  Search, Sparkles, Flame, Apple, Heart, CheckCircle2, ShoppingBag, 
  Clock, Award, Info, ChevronRight, Gauge, Zap, Activity, Scale, ShieldAlert, BookOpen, Layers
} from 'lucide-react';

// Culinary & Whole Foods Cover Images dictionary
const FOOD_IMAGES: Record<string, string> = {
  f1: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=300&auto=format&fit=crop&q=80', // Chicken Breast
  f2: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=300&auto=format&fit=crop&q=80', // Rice
  f3: 'https://images.unsplash.com/photo-1506084868230-bb9d95c24759?w=300&auto=format&fit=crop&q=80', // Egg
  f4: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=300&auto=format&fit=crop&q=80', // Avocado
  f5: 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=300&auto=format&fit=crop&q=80', // Oats
  f6: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=300&auto=format&fit=crop&q=80', // Salmon
  f7: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=300&auto=format&fit=crop&q=80', // Yogurt
  f8: 'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?w=300&auto=format&fit=crop&q=80', // Almonds
  f9: 'https://images.unsplash.com/photo-1596097635121-14b63b7a0c19?w=300&auto=format&fit=crop&q=80', // Sweet Potato
  f10: 'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?w=300&auto=format&fit=crop&q=80', // Peanut Butter
  f11: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=300&auto=format&fit=crop&q=80', // Roti
  f12: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=300&auto=format&fit=crop&q=80', // Dal
  f13: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=300&auto=format&fit=crop&q=80', // Paneer/Cheese
  f14: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=300&auto=format&fit=crop&q=80', // Spinach
  f15: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=300&auto=format&fit=crop&q=80', // Whey Protein
};

// Fallback images based on plan ID or keyword
const getDietPlanFallbackImage = (id: string, name: string): string => {
  const n = name.toLowerCase();
  if (n.includes('keto')) return 'https://images.unsplash.com/photo-1522037299833-246485724249?w=800&auto=format&fit=crop&q=80';
  if (n.includes('pakistani') || n.includes('south asian')) return 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=800&auto=format&fit=crop&q=80';
  if (n.includes('mediterranean')) return 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&auto=format&fit=crop&q=80';
  if (n.includes('gain') || n.includes('bulk')) return 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=800&auto=format&fit=crop&q=80';
  if (n.includes('vegetarian')) return 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80';
  if (n.includes('fasting') || n.includes('intermittent')) return 'https://images.unsplash.com/photo-1506084868230-bb9d95c24759?w=800&auto=format&fit=crop&q=80';
  return 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80';
};

// Intelligent, high-fidelity nutrition calculator that parses custom quantities
const calculatePlanNutrition = (plan: DietPlan) => {
  let calories = 0;
  let protein = 0;
  let carbs = 0;
  let fat = 0;
  let fiber = 0;

  Object.values(plan.meals).forEach(mealsList => {
    mealsList.forEach(meal => {
      meal.foods.forEach(({ food, quantity }) => {
        let factor = 1.0;
        
        const qtyLower = quantity.toLowerCase();
        const servLower = food.servingSize.toLowerCase();
        
        // Match gram weights
        const qtyMatch = qtyLower.match(/(\d+(?:\.\d+)?)\s*g/);
        const servMatch = servLower.match(/(\d+(?:\.\d+)?)\s*g/);
        
        if (qtyMatch && servMatch) {
          const qtyNum = parseFloat(qtyMatch[1]);
          const servNum = parseFloat(servMatch[1]);
          if (servNum > 0) {
            factor = qtyNum / servNum;
          }
        } else if (qtyLower.includes('egg') && servLower.includes('egg')) {
          // Eggs parsing
          const qtyEggs = qtyLower.match(/(\d+)/);
          const servEggs = servLower.match(/(\d+)/);
          const q = qtyEggs ? parseInt(qtyEggs[1]) : 1;
          const s = servEggs ? parseInt(servEggs[1]) : 2; // default serving has 2 eggs
          factor = q / s;
        } else if (qtyLower.includes('roti') || qtyLower.includes('chapati')) {
          if (qtyLower.includes('1.5') || qtyLower.includes('1-1/2')) factor = 1.5;
          else if (qtyLower.includes('half')) factor = 0.5;
          else if (qtyLower.includes('2')) factor = 2.0;
          else factor = 1.0;
        } else if (qtyLower.includes('banana')) {
          factor = 1.0; // standard banana multiplier
        }
        
        calories += food.calories * factor;
        protein += food.protein * factor;
        carbs += food.carbs * factor;
        fat += food.fat * factor;
        fiber += food.fiber * factor;
      });
    });
  });

  return {
    calories: Math.round(calories),
    protein: Math.round(protein),
    carbs: Math.round(carbs),
    fat: Math.round(fat),
    fiber: Math.round(fiber)
  };
};

export default function DietSection() {
  const [activeTab, setActiveTab] = useState<'plans' | 'database'>('plans');
  const [planFilter, setPlanFilter] = useState<'all' | 'weight_loss' | 'weight_gain'>('all');
  const [selectedPlan, setSelectedPlan] = useState<DietPlan | null>(DIET_PLANS[0] || null);

  // Food Database State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(FOOD_DATABASE[0] || null);
  
  // Interactive expanded food ID within the meal timeline
  const [expandedFoodId, setExpandedFoodId] = useState<string | null>(null);

  const filteredPlans = DIET_PLANS.filter(plan => {
    if (planFilter === 'all') return true;
    return plan.category === planFilter;
  });

  const searchedFoods = FOOD_DATABASE.filter(food =>
    food.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div id="diet_section_root" className="my-6 space-y-8">
      {/* Sub header controls */}
      <div className="flex justify-between items-center bg-white dark:bg-neutral-900 p-4 rounded-2xl border border-neutral-150 dark:border-neutral-800 shadow-sm flex-wrap gap-4">
        <div className="flex gap-2">
          <button
            id="btn_diet_plans_tab"
            onClick={() => { setActiveTab('plans'); }}
            className={`px-4 py-2 text-xs md:text-sm font-bold rounded-xl transition flex items-center gap-2 cursor-pointer ${
              activeTab === 'plans'
                ? 'bg-emerald-500 text-white shadow-md'
                : 'text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
            }`}
          >
            <Sparkles className="w-4 h-4" /> Diet Plans & Schedules
          </button>
          <button
            id="btn_food_db_tab"
            onClick={() => { setActiveTab('database'); }}
            className={`px-4 py-2 text-xs md:text-sm font-bold rounded-xl transition flex items-center gap-2 cursor-pointer ${
              activeTab === 'database'
                ? 'bg-emerald-500 text-white shadow-md'
                : 'text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
            }`}
          >
            <Apple className="w-4 h-4" /> Whole Foods Directory
          </button>
        </div>

        {activeTab === 'plans' && (
          <div className="flex gap-2 bg-neutral-100 dark:bg-neutral-800 p-1 rounded-xl">
            {(['all', 'weight_loss', 'weight_gain'] as const).map(type => (
              <button
                key={type}
                id={`btn_diet_filter_${type}`}
                onClick={() => setPlanFilter(type)}
                className={`px-3 py-1.5 text-xs font-bold capitalize rounded-lg transition cursor-pointer ${
                  planFilter === type
                    ? 'bg-white dark:bg-neutral-900 text-emerald-500 shadow-sm'
                    : 'text-neutral-500 dark:text-neutral-400'
                }`}
              >
                {type.replace('_', ' ')}
              </button>
            ))}
          </div>
        )}
      </div>

      {activeTab === 'plans' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Diet Plans Visual List */}
          <div className="lg:col-span-1 space-y-4 max-h-[750px] overflow-y-auto pr-2">
            <h3 className="text-sm font-black uppercase tracking-wider text-neutral-400 dark:text-neutral-500 flex items-center gap-2 px-1">
              <Flame className="w-4 h-4 text-emerald-500" /> Standard Programs
            </h3>
            <div className="space-y-3">
              {filteredPlans.map(plan => {
                const planImage = plan.imageUrl || getDietPlanFallbackImage(plan.id, plan.name);
                const isSelected = selectedPlan?.id === plan.id;
                const stats = calculatePlanNutrition(plan);

                return (
                  <button
                    key={plan.id}
                    id={`btn_diet_plan_card_${plan.id}`}
                    onClick={() => { setSelectedPlan(plan); setExpandedFoodId(null); }}
                    className={`w-full text-left rounded-2xl border overflow-hidden transition flex flex-row h-28 ${
                      isSelected
                        ? 'border-emerald-500 ring-2 ring-emerald-500/10 bg-emerald-500/5 dark:bg-emerald-500/10'
                        : 'border-neutral-150 dark:border-neutral-800 bg-white dark:bg-neutral-950 hover:border-neutral-350 dark:hover:border-neutral-700 shadow-sm hover:shadow-md'
                    } cursor-pointer`}
                  >
                    {/* Cover Thumbnail */}
                    <div className="w-24 md:w-28 h-full relative shrink-0 overflow-hidden bg-neutral-100 dark:bg-neutral-900">
                      <img
                        src={planImage}
                        alt={plan.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                      <span className={`absolute top-2 left-2 px-1.5 py-0.5 text-[8px] font-black tracking-wider uppercase rounded-md shadow-sm ${
                        plan.category === 'weight_loss'
                          ? 'bg-emerald-500 text-white'
                          : 'bg-amber-500 text-white'
                      }`}>
                        {plan.category === 'weight_loss' ? 'Loss' : 'Gain'}
                      </span>
                    </div>

                    <div className="p-3 flex-1 flex flex-col justify-between min-w-0">
                      <div>
                        <div className="flex justify-between items-center mb-0.5">
                          <span className="text-[9px] font-mono font-black text-emerald-500 dark:text-emerald-400 uppercase">{plan.durationDays} Days</span>
                          <span className="text-[9px] font-mono font-bold uppercase px-1.5 py-0.5 bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 rounded-md">{plan.difficulty}</span>
                        </div>
                        <h4 className="font-extrabold text-neutral-800 dark:text-neutral-150 text-xs md:text-sm leading-tight truncate">{plan.name}</h4>
                        <p className="text-[10px] text-neutral-400 dark:text-neutral-500 line-clamp-2 leading-normal mt-0.5">{plan.description}</p>
                      </div>

                      <div className="flex justify-between items-center text-[9px] text-neutral-400 font-mono border-t border-neutral-100 dark:border-neutral-850 pt-1.5">
                        <span className="font-bold text-neutral-500 dark:text-neutral-400">{stats.calories} kcal/day</span>
                        <span className="text-emerald-500 font-bold hover:underline flex items-center">Open Info <ChevronRight className="w-3 h-3" /></span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Diet Plan Infographic details */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {selectedPlan ? (
                <motion.div
                  key={selectedPlan.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  {/* Dynamic calculated daily metrics */}
                  {(() => {
                    const stats = calculatePlanNutrition(selectedPlan);
                    const planImage = selectedPlan.imageUrl || getDietPlanFallbackImage(selectedPlan.id, selectedPlan.name);
                    
                    // Nutrition split calculations
                    const protKcal = stats.protein * 4;
                    const carbKcal = stats.carbs * 4;
                    const fatKcal = stats.fat * 9;
                    const totalMacroKcal = protKcal + carbKcal + fatKcal || 1;

                    const protPct = Math.round((protKcal / totalMacroKcal) * 100);
                    const carbPct = Math.round((carbKcal / totalMacroKcal) * 100);
                    const fatPct = Math.max(0, 100 - protPct - carbPct);

                    // Dynamic Physiological Scores
                    const satietyScore = Math.min(100, Math.round((stats.protein * 1.4 + stats.fiber * 4.2) * 1.9));
                    const insulinStability = Math.max(20, Math.round(100 - (stats.carbs / Math.max(1, stats.fiber * 1.5 + stats.protein * 0.8)) * 12));
                    const thermogenicRating = Math.min(100, Math.round((stats.protein / Math.max(1, stats.carbs + stats.fat)) * 260));

                    // SVG Circle Donut Constants (Radius 45)
                    const circ = 282.74;
                    const pOffset = 0;
                    const cOffset = (protPct / 100) * circ;
                    const fOffset = ((protPct + carbPct) / 100) * circ;

                    return (
                      <div className="space-y-6" id="infographic_container">
                        {/* HERO OVERVIEW BANNER */}
                        <div className="relative rounded-3xl overflow-hidden h-44 md:h-52 shadow-md bg-neutral-900">
                          <img 
                            src={planImage} 
                            alt={selectedPlan.name} 
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover opacity-35"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-900/60 to-transparent flex flex-col justify-end p-6 md:p-8 space-y-2">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className={`px-2.5 py-0.5 text-[9px] font-black tracking-wider uppercase rounded-md shadow-sm ${
                                selectedPlan.category === 'weight_loss'
                                  ? 'bg-emerald-500 text-white'
                                  : 'bg-amber-500 text-white'
                              }`}>
                                {selectedPlan.category.replace('_', ' ')}
                              </span>
                              <span className="text-[9px] font-mono font-bold bg-white/10 text-white/90 backdrop-blur-xs px-2 py-0.5 rounded-md">
                                {selectedPlan.durationDays} Days Duration
                              </span>
                              <span className="text-[9px] font-mono font-bold bg-white/10 text-white/90 backdrop-blur-xs px-2 py-0.5 rounded-md capitalize">
                                {selectedPlan.difficulty} Tier
                              </span>
                            </div>

                            <h3 className="text-xl md:text-2xl font-black text-white tracking-tight">{selectedPlan.name}</h3>
                            <p className="text-xs text-neutral-300 font-medium leading-relaxed max-w-xl">{selectedPlan.description}</p>
                          </div>
                        </div>

                        {/* MACROS & CLINICAL SCORECARDS GRID */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {/* MACRONUTRIENTS RADAR DONUT */}
                          <div className="bg-white dark:bg-neutral-950 p-5 rounded-3xl border border-neutral-150 dark:border-neutral-850 shadow-xs flex flex-col justify-between">
                            <div className="flex justify-between items-center mb-3">
                              <h4 className="text-xs font-black uppercase tracking-wider text-neutral-400 font-mono">Caloric Breakdown</h4>
                              <span className="text-[10px] font-bold font-mono text-neutral-500 flex items-center gap-1">
                                <Scale className="w-3.5 h-3.5 text-emerald-500" /> {stats.calories} kcal/day
                              </span>
                            </div>

                            <div className="flex flex-row items-center gap-6 py-1">
                              {/* Glowing Segmented SVG Donut Chart */}
                              <div className="relative w-28 h-28 shrink-0 flex items-center justify-center">
                                <svg width="112" height="112" viewBox="0 0 112 112" className="-rotate-90">
                                  {/* Track */}
                                  <circle cx="56" cy="56" r="45" fill="transparent" stroke="#f3f4f6" strokeWidth="11" className="dark:stroke-neutral-900" />
                                  {/* Protein slice (Sky Blue) */}
                                  {protPct > 0 && (
                                    <circle 
                                      cx="56" 
                                      cy="56" 
                                      r="45" 
                                      fill="transparent" 
                                      stroke="#0ea5e9" 
                                      strokeWidth="11" 
                                      strokeDasharray={`${(protPct / 100) * circ} ${circ}`} 
                                      strokeDashoffset={0} 
                                      strokeLinecap="butt"
                                    />
                                  )}
                                  {/* Carbs slice (Amber) */}
                                  {carbPct > 0 && (
                                    <circle 
                                      cx="56" 
                                      cy="56" 
                                      r="45" 
                                      fill="transparent" 
                                      stroke="#f59e0b" 
                                      strokeWidth="11" 
                                      strokeDasharray={`${(carbPct / 100) * circ} ${circ}`} 
                                      strokeDashoffset={-pOffset - (protPct / 100) * circ} 
                                      strokeLinecap="butt"
                                    />
                                  )}
                                  {/* Fats slice (Rose) */}
                                  {fatPct > 0 && (
                                    <circle 
                                      cx="56" 
                                      cy="56" 
                                      r="45" 
                                      fill="transparent" 
                                      stroke="#f43f5e" 
                                      strokeWidth="11" 
                                      strokeDasharray={`${(fatPct / 100) * circ} ${circ}`} 
                                      strokeDashoffset={-fOffset} 
                                      strokeLinecap="butt"
                                    />
                                  )}
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                                  <span className="text-lg font-black text-neutral-800 dark:text-neutral-100 font-mono leading-none">{stats.calories}</span>
                                  <span className="text-[8px] font-bold text-neutral-400 font-mono tracking-widest mt-0.5">DAILY KCAL</span>
                                </div>
                              </div>

                              {/* Detailed Grams Weights & Legend */}
                              <div className="flex-1 space-y-2.5">
                                {/* Protein details */}
                                <div className="flex items-center justify-between text-xs font-semibold">
                                  <div className="flex items-center gap-1.5">
                                    <span className="w-2.5 h-2.5 rounded-full bg-sky-500" />
                                    <span className="text-neutral-600 dark:text-neutral-400 text-[11px]">Protein</span>
                                  </div>
                                  <span className="font-mono text-neutral-800 dark:text-neutral-200 text-[11px]">{stats.protein}g <span className="text-[9px] text-neutral-400 font-medium">({protPct}%)</span></span>
                                </div>
                                {/* Carbs details */}
                                <div className="flex items-center justify-between text-xs font-semibold">
                                  <div className="flex items-center gap-1.5">
                                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                                    <span className="text-neutral-600 dark:text-neutral-400 text-[11px]">Carbs</span>
                                  </div>
                                  <span className="font-mono text-neutral-800 dark:text-neutral-200 text-[11px]">{stats.carbs}g <span className="text-[9px] text-neutral-400 font-medium">({carbPct}%)</span></span>
                                </div>
                                {/* Fat details */}
                                <div className="flex items-center justify-between text-xs font-semibold">
                                  <div className="flex items-center gap-1.5">
                                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                                    <span className="text-neutral-600 dark:text-neutral-400 text-[11px]">Fats</span>
                                  </div>
                                  <span className="font-mono text-neutral-800 dark:text-neutral-200 text-[11px]">{stats.fat}g <span className="text-[9px] text-neutral-400 font-medium">({fatPct}%)</span></span>
                                </div>
                                {/* Fiber details */}
                                <div className="flex items-center justify-between text-xs font-semibold pt-1 border-t border-dashed border-neutral-100 dark:border-neutral-850">
                                  <div className="flex items-center gap-1.5">
                                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                                    <span className="text-neutral-500 dark:text-neutral-400 text-[11px]">Dietary Fiber</span>
                                  </div>
                                  <span className="font-mono text-emerald-600 dark:text-emerald-400 text-[11px] font-bold">{stats.fiber}g</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* PHYSIOLOGICAL PERFORMANCE RATINGS */}
                          <div className="bg-white dark:bg-neutral-950 p-5 rounded-3xl border border-neutral-150 dark:border-neutral-850 shadow-xs flex flex-col justify-between space-y-4">
                            <h4 className="text-xs font-black uppercase tracking-wider text-neutral-400 font-mono">Physiological Impact Report</h4>
                            
                            <div className="space-y-3.5 flex-1 flex flex-col justify-center">
                              {/* Satiety Score */}
                              <div className="space-y-1">
                                <div className="flex justify-between items-center text-[10px] font-bold text-neutral-500 dark:text-neutral-400 font-mono">
                                  <span className="flex items-center gap-1"><Heart className="w-3.5 h-3.5 text-rose-500" /> DIGESTIVE SATIETY SCORE</span>
                                  <span className="text-neutral-700 dark:text-neutral-200">{satietyScore}%</span>
                                </div>
                                <div className="w-full h-2 bg-neutral-100 dark:bg-neutral-900 rounded-full overflow-hidden">
                                  <div className="h-full bg-rose-500 rounded-full" style={{ width: `${satietyScore}%` }} />
                                </div>
                              </div>

                              {/* Insulin Stability */}
                              <div className="space-y-1">
                                <div className="flex justify-between items-center text-[10px] font-bold text-neutral-500 dark:text-neutral-400 font-mono">
                                  <span className="flex items-center gap-1"><Activity className="w-3.5 h-3.5 text-emerald-500" /> GLYCEMIC INDEX STABILITY</span>
                                  <span className="text-neutral-700 dark:text-neutral-200">{insulinStability}%</span>
                                </div>
                                <div className="w-full h-2 bg-neutral-100 dark:bg-neutral-900 rounded-full overflow-hidden">
                                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${insulinStability}%` }} />
                                </div>
                              </div>

                              {/* Thermic effect */}
                              <div className="space-y-1">
                                <div className="flex justify-between items-center text-[10px] font-bold text-neutral-500 dark:text-neutral-400 font-mono">
                                  <span className="flex items-center gap-1"><Zap className="w-3.5 h-3.5 text-amber-500" /> TEF THERMIC INDEX</span>
                                  <span className="text-neutral-700 dark:text-neutral-200">{thermogenicRating}%</span>
                                </div>
                                <div className="w-full h-2 bg-neutral-100 dark:bg-neutral-900 rounded-full overflow-hidden">
                                  <div className="h-full bg-amber-500 rounded-full" style={{ width: `${thermogenicRating}%` }} />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* PLAN PHYSIOLOGICAL GOALS / BENEFITS */}
                        <div className="bg-white dark:bg-neutral-950 p-5 rounded-3xl border border-neutral-150 dark:border-neutral-850 shadow-xs">
                          <h4 className="text-xs font-black uppercase tracking-wider text-neutral-400 font-mono mb-3">Key Physiological Adaptations</h4>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            {selectedPlan.benefits.map((b, i) => (
                              <div key={i} className="p-3 rounded-2xl bg-neutral-50/50 dark:bg-neutral-900/40 border border-neutral-100 dark:border-neutral-850 flex items-center gap-2 text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                                <span>{b}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* DAILY MEAL TIMELINE INFOGRAPHIC */}
                        <div className="bg-white dark:bg-neutral-950 p-6 md:p-8 rounded-3xl border border-neutral-150 dark:border-neutral-850 shadow-xs space-y-6">
                          <div className="flex justify-between items-center border-b border-neutral-100 dark:border-neutral-850 pb-3">
                            <h4 className="text-sm font-black uppercase tracking-wider text-neutral-800 dark:text-neutral-100 flex items-center gap-2">
                              <BookOpen className="w-4.5 h-4.5 text-emerald-500" /> 24-Hour Clinical Timeline
                            </h4>
                            <span className="text-[10px] font-mono font-bold text-neutral-400">CLICK INGREDIENTS FOR METRIC DETAIL</span>
                          </div>

                          <div className="relative pl-6 md:pl-8 border-l-2 border-dashed border-neutral-200 dark:border-neutral-800 space-y-10">
                            {(Object.entries(selectedPlan.meals) as [string, Meal[]][]).map(([mealType, meals], mealIndex) => {
                              return (
                                <div key={mealType} className="relative space-y-3">
                                  {/* Timeline Node Icon/Badge */}
                                  <div className="absolute -left-[35px] md:-left-[43px] top-1.5 w-6 h-6 md:w-8 md:h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-[10px] md:text-xs shadow-md shadow-emerald-500/15">
                                    {mealIndex + 1}
                                  </div>

                                  <div className="flex justify-between items-baseline flex-wrap gap-2">
                                    <h5 className="font-extrabold text-xs text-neutral-400 dark:text-neutral-500 uppercase tracking-widest font-mono">
                                      {mealType}
                                    </h5>
                                    {meals[0]?.time && (
                                      <span className="text-[10px] font-mono font-black text-emerald-500 dark:text-emerald-400 flex items-center gap-1 bg-emerald-500/5 px-2 py-0.5 rounded-md">
                                        <Clock className="w-3 h-3" /> {meals[0].time}
                                      </span>
                                    )}
                                  </div>

                                  {meals.map((meal, mIdx) => (
                                    <div key={mIdx} className="space-y-4">
                                      <h6 className="font-black text-neutral-800 dark:text-neutral-200 text-sm md:text-base tracking-tight">
                                        {meal.name}
                                      </h6>

                                      {/* Food Ingredients Infographic Grid */}
                                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {meal.foods.map(({ food, quantity }, fIdx) => {
                                          const foodImage = FOOD_IMAGES[food.id] || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=150&auto=format&fit=crop&q=80';
                                          const isExpanded = expandedFoodId === `${mealType}-${mIdx}-${food.id}`;

                                          return (
                                            <div 
                                              key={fIdx}
                                              onClick={() => setExpandedFoodId(isExpanded ? null : `${mealType}-${mIdx}-${food.id}`)}
                                              className={`p-3 rounded-2xl border transition text-left flex flex-col justify-between cursor-pointer group ${
                                                isExpanded
                                                  ? 'border-emerald-500 bg-emerald-500/5 dark:bg-emerald-500/10'
                                                  : 'border-neutral-150 dark:border-neutral-850 bg-neutral-50/30 dark:bg-neutral-900/20 hover:border-neutral-300 dark:hover:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-900/60'
                                              }`}
                                            >
                                              <div className="flex gap-3 items-center">
                                                {/* Mini Culinary Photo */}
                                                <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 bg-neutral-100 dark:bg-neutral-800 relative shadow-inner">
                                                  <img 
                                                    src={foodImage} 
                                                    alt={food.name} 
                                                    referrerPolicy="no-referrer"
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                                  />
                                                </div>

                                                <div className="min-w-0 flex-1">
                                                  <p className="font-extrabold text-neutral-800 dark:text-neutral-200 text-xs truncate leading-tight">{food.name}</p>
                                                  <p className="text-[10px] text-neutral-400 font-mono mt-0.5">{quantity} <span className="text-[8px] text-neutral-500 font-normal">({food.servingSize})</span></p>
                                                </div>

                                                <div className="text-right shrink-0">
                                                  <span className="font-mono text-emerald-500 dark:text-emerald-400 font-black text-xs block">{food.calories}</span>
                                                  <span className="text-[7px] text-neutral-400 font-mono tracking-wider block font-bold uppercase">KCAL</span>
                                                </div>
                                              </div>

                                              {/* Macro distribution sub-labels */}
                                              <div className="flex items-center gap-2.5 text-[9px] font-mono mt-3 pt-2.5 border-t border-neutral-100/60 dark:border-neutral-850/60 text-neutral-400">
                                                <span className="flex items-center gap-1 font-semibold text-neutral-500 dark:text-neutral-400">
                                                  <span className="w-1.5 h-1.5 rounded-full bg-sky-500" /> P: {food.protein}g
                                                </span>
                                                <span className="flex items-center gap-1 font-semibold text-neutral-500 dark:text-neutral-400">
                                                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" /> C: {food.carbs}g
                                                </span>
                                                <span className="flex items-center gap-1 font-semibold text-neutral-500 dark:text-neutral-400">
                                                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500" /> F: {food.fat}g
                                                </span>
                                              </div>

                                              {/* Expandable Biological Benefits accordion */}
                                              <AnimatePresence>
                                                {isExpanded && (
                                                  <motion.div
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: 'auto' }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    className="overflow-hidden mt-3 pt-2.5 border-t border-dashed border-neutral-200 dark:border-neutral-800 space-y-2 text-[11px]"
                                                  >
                                                    <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed font-semibold">
                                                      <Info className="w-3.5 h-3.5 text-rose-500 inline mr-1" /> {food.benefits}
                                                    </p>
                                                    <div className="flex flex-wrap gap-1 mt-1">
                                                      {[...food.vitamins, ...food.minerals].slice(0, 4).map((m, idx) => (
                                                        <span key={idx} className="px-1.5 py-0.5 rounded bg-white dark:bg-neutral-950 border border-neutral-150 dark:border-neutral-800 text-[9px] font-bold text-neutral-500 font-mono">
                                                          {m}
                                                        </span>
                                                      ))}
                                                    </div>
                                                  </motion.div>
                                                )}
                                              </AnimatePresence>
                                            </div>
                                          );
                                        })}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </motion.div>
              ) : (
                <div className="bg-neutral-100/50 dark:bg-neutral-950/20 rounded-3xl border border-dashed border-neutral-200 dark:border-neutral-800 p-12 text-center text-neutral-400 h-96 flex flex-col justify-center items-center">
                  <ShoppingBag className="w-12 h-12 text-neutral-300 mb-3" />
                  <p className="font-bold text-sm">No diet program active</p>
                  <p className="text-xs text-neutral-400 mt-1">Select one of our specialized whole food programs from the standard directory.</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      ) : (
        /* Whole Foods Directory tab with visual macro gauges */
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Search Box & Left Panel */}
          <div className="md:col-span-1 space-y-4">
            <h3 className="text-sm font-black uppercase tracking-wider text-neutral-400 dark:text-neutral-500 flex items-center gap-2 px-1">
              <Apple className="w-5 h-5 text-emerald-500" /> Whole Foods Directory
            </h3>
            <div className="relative">
              <Search className="absolute left-3 top-3.5 w-4 h-4 text-neutral-400" />
              <input
                id="input_food_search"
                type="text"
                placeholder="Search chicken, rice, eggs..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-3 bg-white dark:bg-neutral-950 rounded-xl border border-neutral-200 dark:border-neutral-800 text-sm focus:outline-none focus:border-emerald-500 text-neutral-800 dark:text-neutral-100"
              />
            </div>

            <div className="space-y-2 max-h-[550px] overflow-y-auto pr-2">
              {searchedFoods.map(food => {
                const foodImage = FOOD_IMAGES[food.id] || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=150&auto=format&fit=crop&q=80';
                const isSelected = selectedFood?.id === food.id;

                return (
                  <button
                    key={food.id}
                    id={`btn_food_item_${food.id}`}
                    onClick={() => setSelectedFood(food)}
                    className={`w-full p-2.5 rounded-xl border text-left flex justify-between items-center transition cursor-pointer ${
                      isSelected
                        ? 'border-emerald-500 bg-emerald-500/5'
                        : 'border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 hover:border-neutral-300'
                    }`}
                  >
                    <div className="flex gap-2.5 items-center min-w-0">
                      <div className="w-9 h-9 rounded-lg overflow-hidden shrink-0 bg-neutral-100 dark:bg-neutral-900 shadow-inner">
                        <img 
                          src={foodImage} 
                          alt={food.name} 
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="font-extrabold text-xs text-neutral-800 dark:text-neutral-200 truncate">{food.name}</p>
                        <p className="text-[9px] text-neutral-400 font-mono mt-0.5">{food.servingSize}</p>
                      </div>
                    </div>
                    <span className="font-mono text-emerald-500 font-black text-xs shrink-0">{food.calories} kcal</span>
                  </button>
                );
              })}
              {searchedFoods.length === 0 && (
                <p className="text-xs text-neutral-400 text-center py-6">No matching foods found</p>
              )}
            </div>
          </div>

          {/* Right Panel: Food Details with graphics */}
          <div className="md:col-span-2">
            <AnimatePresence mode="wait">
              {selectedFood ? (
                <motion.div
                  key={selectedFood.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-white dark:bg-neutral-950 p-6 rounded-3xl border border-neutral-150 dark:border-neutral-850 shadow-sm space-y-6"
                >
                  {/* Visual Header with Large Image Cover */}
                  <div className="flex items-center gap-4 border-b border-neutral-100 dark:border-neutral-850 pb-5">
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden shrink-0 bg-neutral-100 dark:bg-neutral-900 shadow-md">
                      <img 
                        src={FOOD_IMAGES[selectedFood.id] || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&auto=format&fit=crop&q=80'} 
                        alt={selectedFood.name} 
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <span className="px-2 py-0.5 text-[8px] font-black tracking-widest uppercase rounded bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-mono">
                        PHYSICS WHOLE FOODS
                      </span>
                      <h3 className="text-xl md:text-2xl font-black text-neutral-800 dark:text-neutral-100 mt-1 leading-tight">{selectedFood.name}</h3>
                      <p className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider mt-0.5">Standard Serving: {selectedFood.servingSize}</p>
                    </div>
                  </div>

                  {/* Macros Metrics Gauges */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="text-center bg-emerald-500/5 dark:bg-emerald-500/10 p-3.5 rounded-2xl border border-emerald-500/10 shadow-inner">
                      <span className="text-[9px] font-mono font-bold text-neutral-400 block uppercase tracking-wider">CALORIES</span>
                      <span className="text-lg md:text-xl font-black text-emerald-600 dark:text-emerald-400 font-mono mt-0.5 block">{selectedFood.calories}</span>
                      <span className="text-[7px] font-mono text-neutral-400 block mt-0.5">kcal / serve</span>
                    </div>
                    <div className="text-center bg-sky-500/5 dark:bg-sky-500/10 p-3.5 rounded-2xl border border-sky-500/10 shadow-inner">
                      <span className="text-[9px] font-mono font-bold text-neutral-400 block uppercase tracking-wider">PROTEIN</span>
                      <span className="text-lg md:text-xl font-black text-sky-600 dark:text-sky-400 font-mono mt-0.5 block">{selectedFood.protein}g</span>
                      <span className="text-[7px] font-mono text-neutral-400 block mt-0.5">amino yield</span>
                    </div>
                    <div className="text-center bg-amber-500/5 dark:bg-amber-500/10 p-3.5 rounded-2xl border border-amber-500/10 shadow-inner">
                      <span className="text-[9px] font-mono font-bold text-neutral-400 block uppercase tracking-wider">CARBOHYDRATES</span>
                      <span className="text-lg md:text-xl font-black text-amber-600 dark:text-amber-400 font-mono mt-0.5 block">{selectedFood.carbs}g</span>
                      <span className="text-[7px] font-mono text-neutral-400 block mt-0.5">glycogen load</span>
                    </div>
                    <div className="text-center bg-rose-500/5 dark:bg-rose-500/10 p-3.5 rounded-2xl border border-rose-500/10 shadow-inner">
                      <span className="text-[9px] font-mono font-bold text-neutral-400 block uppercase tracking-wider">LIPID FATS</span>
                      <span className="text-lg md:text-xl font-black text-rose-600 dark:text-rose-400 font-mono mt-0.5 block">{selectedFood.fat}g</span>
                      <span className="text-[7px] font-mono text-neutral-400 block mt-0.5">hormone support</span>
                    </div>
                  </div>

                  {/* Micro nutrients & clinical adaptations */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-850 space-y-3.5 text-xs">
                      <p className="font-bold text-neutral-400 dark:text-neutral-500 font-mono uppercase tracking-wider">Clinical Bio-Elements</p>
                      <div className="flex flex-wrap gap-1.5">
                        {[...selectedFood.vitamins, ...selectedFood.minerals].map((vit, idx) => (
                          <span key={idx} className="px-2.5 py-1 rounded-lg bg-white dark:bg-neutral-950 border border-neutral-150 dark:border-neutral-800 font-bold text-[10px] text-neutral-600 dark:text-neutral-400 font-mono shadow-inner">
                            {vit}
                          </span>
                        ))}
                      </div>
                      <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800 flex justify-between items-center text-[11px] text-neutral-400 font-mono">
                        <span>Dietary Fiber content:</span>
                        <span className="font-extrabold text-emerald-600 dark:text-emerald-400">{selectedFood.fiber}g</span>
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-850 space-y-3.5 text-xs flex flex-col justify-between">
                      <div>
                        <p className="font-bold text-neutral-400 dark:text-neutral-500 font-mono uppercase tracking-wider flex items-center gap-1">
                          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> Physiological Advantage
                        </p>
                        <p className="text-neutral-600 dark:text-neutral-300 mt-2.5 leading-relaxed font-semibold">
                          {selectedFood.benefits}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div className="bg-neutral-100/50 dark:bg-neutral-950/20 rounded-3xl border border-dashed border-neutral-200 dark:border-neutral-800 p-12 text-center text-neutral-400 h-96 flex flex-col justify-center items-center">
                  <Apple className="w-12 h-12 text-neutral-300 mb-3" />
                  <p className="font-bold text-sm">No clinical food item selected</p>
                  <p className="text-xs text-neutral-400 mt-1">Select an item from the sidebar whole food listing to examine clinical nutrients.</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}
    </div>
  );
}
