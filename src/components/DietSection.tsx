import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { DIET_PLANS, FOOD_DATABASE } from '../data/diets';
import { DietPlan, FoodItem, Meal } from '../types';
import { Search, Sparkles, Flame, Apple, Heart, CheckCircle2, ShoppingBag } from 'lucide-react';

export default function DietSection() {
  const [activeTab, setActiveTab] = useState<'plans' | 'database'>('plans');
  const [planFilter, setPlanFilter] = useState<'all' | 'weight_loss' | 'weight_gain'>('all');
  const [selectedPlan, setSelectedPlan] = useState<DietPlan | null>(null);

  // Food Database State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);

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
      <div className="flex justify-between items-center bg-white dark:bg-neutral-900 p-4 rounded-2xl border border-neutral-100 dark:border-neutral-800 shadow-sm flex-wrap gap-4">
        <div className="flex gap-2">
          <button
            id="btn_diet_plans_tab"
            onClick={() => { setActiveTab('plans'); setSelectedPlan(null); }}
            className={`px-4 py-2 text-sm font-bold rounded-xl transition flex items-center gap-2 ${
              activeTab === 'plans'
                ? 'bg-emerald-500 text-white shadow-md'
                : 'text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
            }`}
          >
            <Sparkles className="w-4 h-4" /> Diet Plans & Schedules
          </button>
          <button
            id="btn_food_db_tab"
            onClick={() => { setActiveTab('database'); setSelectedFood(null); }}
            className={`px-4 py-2 text-sm font-bold rounded-xl transition flex items-center gap-2 ${
              activeTab === 'database'
                ? 'bg-emerald-500 text-white shadow-md'
                : 'text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
            }`}
          >
            <Apple className="w-4 h-4" /> Nutrition Database
          </button>
        </div>

        {activeTab === 'plans' && (
          <div className="flex gap-2 bg-neutral-100 dark:bg-neutral-800 p-1 rounded-xl">
            {(['all', 'weight_loss', 'weight_gain'] as const).map(type => (
              <button
                key={type}
                id={`btn_diet_filter_${type}`}
                onClick={() => setPlanFilter(type)}
                className={`px-3 py-1.5 text-xs font-semibold capitalize rounded-lg transition ${
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
          {/* Diet Plans List */}
          <div className="lg:col-span-1 space-y-4 max-h-[600px] overflow-y-auto pr-2">
            <h3 className="text-lg font-bold text-neutral-800 dark:text-neutral-100 flex items-center gap-2">
              <Flame className="w-5 h-5 text-emerald-500" /> Standard Programs
            </h3>
            {filteredPlans.map(plan => (
              <button
                key={plan.id}
                id={`btn_diet_plan_card_${plan.id}`}
                onClick={() => setSelectedPlan(plan)}
                className={`w-full text-left p-4 rounded-xl border transition flex flex-col justify-between h-40 ${
                  selectedPlan?.id === plan.id
                    ? 'border-emerald-500 bg-emerald-500/5 dark:bg-emerald-500/10'
                    : 'border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 hover:border-neutral-300'
                }`}
              >
                <div>
                  <div className="flex justify-between items-start mb-1">
                    <span className={`px-2 py-0.5 text-[10px] font-black tracking-wider uppercase rounded-full ${
                      plan.category === 'weight_loss'
                        ? 'bg-emerald-500/10 text-emerald-600'
                        : 'bg-amber-500/10 text-amber-600'
                    }`}>
                      {plan.category.replace('_', ' ')}
                    </span>
                    <span className="text-xs font-mono text-neutral-400">{plan.durationDays} Days</span>
                  </div>
                  <h4 className="font-bold text-neutral-800 dark:text-neutral-200 text-sm md:text-base line-clamp-1">{plan.name}</h4>
                  <p className="text-xs text-neutral-500 mt-1 line-clamp-2">{plan.description}</p>
                </div>

                <div className="flex justify-between items-center border-t border-neutral-100 dark:border-neutral-850 pt-2 text-[10px] text-neutral-400 font-mono">
                  <span>Level: <span className="font-bold capitalize">{plan.difficulty}</span></span>
                  <span className="text-emerald-500 font-bold hover:underline">View Schedule →</span>
                </div>
              </button>
            ))}
          </div>

          {/* Active Diet Plan Details Panel */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {selectedPlan ? (
                <motion.div
                  key={selectedPlan.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-white dark:bg-neutral-950 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-6"
                >
                  <div className="flex justify-between items-start border-b border-neutral-100 dark:border-neutral-800 pb-4 flex-wrap gap-4">
                    <div>
                      <span className={`px-2 py-0.5 text-[10px] font-black tracking-wider uppercase rounded-full ${
                        selectedPlan.category === 'weight_loss'
                          ? 'bg-emerald-500/10 text-emerald-600'
                          : 'bg-amber-500/10 text-amber-600'
                      }`}>
                        {selectedPlan.category.replace('_', ' ')}
                      </span>
                      <h3 className="text-2xl font-black text-neutral-800 dark:text-neutral-100 mt-2">{selectedPlan.name}</h3>
                      <p className="text-sm text-neutral-500 mt-1">{selectedPlan.description}</p>
                    </div>
                    <div className="text-right font-mono">
                      <p className="text-sm text-neutral-400">DURATION</p>
                      <p className="text-xl font-bold text-emerald-500">{selectedPlan.durationDays} Days</p>
                    </div>
                  </div>

                  {/* Plan Benefits */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">Physiological Goals</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedPlan.benefits.map((b, i) => (
                        <span key={i} className="px-3 py-1.5 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-150 dark:border-neutral-800 text-xs font-semibold text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> {b}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Daily Meal Schedule */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-4">Complete 24H Meal Schedule</h4>
                    <div className="space-y-4">
                      {(Object.entries(selectedPlan.meals) as [string, Meal[]][]).map(([mealType, meals]) => (
                        <div key={mealType} className="p-4 rounded-xl border border-neutral-100 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/40 hover:bg-neutral-50 dark:hover:bg-neutral-900/60 transition">
                          <h5 className="font-bold text-xs text-neutral-400 uppercase tracking-widest font-mono mb-2">{mealType}</h5>
                          {meals.map((meal, mIdx) => (
                            <div key={mIdx} className="space-y-3">
                              <p className="font-bold text-sm text-neutral-800 dark:text-neutral-200">{meal.name}</p>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                                {meal.foods.map((item, fIdx) => (
                                  <div key={fIdx} className="bg-white dark:bg-neutral-950 p-2.5 rounded-lg border border-neutral-100 dark:border-neutral-850 flex items-center justify-between text-xs">
                                    <div>
                                      <p className="font-semibold text-neutral-700 dark:text-neutral-300">{item.food.name}</p>
                                      <p className="text-[10px] text-neutral-400 font-mono mt-0.5">{item.quantity} ({item.food.servingSize})</p>
                                    </div>
                                    <span className="font-mono text-emerald-500 font-bold">{item.food.calories} kcal</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div className="bg-neutral-100/50 dark:bg-neutral-950/20 rounded-2xl border border-dashed border-neutral-200 dark:border-neutral-800 p-12 text-center text-neutral-400 h-96 flex flex-col justify-center items-center">
                  <ShoppingBag className="w-12 h-12 text-neutral-300 mb-3" />
                  <p className="font-bold text-sm">No diet plan currently selected</p>
                  <p className="text-xs text-neutral-400 mt-1">Select one of our specialized weight-loss or muscle building templates to view active schedules.</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      ) : (
        /* Nutrition Database Search tab */
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Search Box & Left Panel */}
          <div className="md:col-span-1 space-y-4">
            <h3 className="text-lg font-bold text-neutral-800 dark:text-neutral-100 flex items-center gap-2">
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

            <div className="space-y-2 max-h-[450px] overflow-y-auto pr-2">
              {searchedFoods.map(food => (
                <button
                  key={food.id}
                  id={`btn_food_item_${food.id}`}
                  onClick={() => setSelectedFood(food)}
                  className={`w-full p-3 rounded-xl border text-left flex justify-between items-center transition ${
                    selectedFood?.id === food.id
                      ? 'border-emerald-500 bg-emerald-500/5'
                      : 'border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 hover:border-neutral-300'
                  }`}
                >
                  <div>
                    <p className="font-semibold text-sm text-neutral-800 dark:text-neutral-200">{food.name}</p>
                    <p className="text-[10px] text-neutral-400 font-mono mt-0.5">{food.servingSize}</p>
                  </div>
                  <span className="font-mono text-emerald-500 font-bold text-xs">{food.calories} kcal</span>
                </button>
              ))}
              {searchedFoods.length === 0 && (
                <p className="text-xs text-neutral-400 text-center py-6">No matching foods found</p>
              )}
            </div>
          </div>

          {/* Right Panel: Food Details */}
          <div className="md:col-span-2">
            <AnimatePresence mode="wait">
              {selectedFood ? (
                <motion.div
                  key={selectedFood.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-white dark:bg-neutral-950 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-6"
                >
                  <div>
                    <h3 className="text-2xl font-black text-neutral-800 dark:text-neutral-100">{selectedFood.name}</h3>
                    <p className="text-xs font-mono text-neutral-400 mt-1 uppercase">Standard Unit: {selectedFood.servingSize}</p>
                  </div>

                  {/* Macros Metrics Gauge */}
                  <div className="grid grid-cols-4 gap-4">
                    <div className="text-center bg-emerald-500/5 dark:bg-emerald-500/10 p-3 rounded-xl border border-emerald-500/10">
                      <span className="text-[10px] font-mono text-neutral-400 block uppercase">CALORIES</span>
                      <span className="text-xl font-bold text-emerald-600 dark:text-emerald-400 font-mono">{selectedFood.calories}</span>
                    </div>
                    <div className="text-center bg-sky-500/5 dark:bg-sky-500/10 p-3 rounded-xl border border-sky-500/10">
                      <span className="text-[10px] font-mono text-neutral-400 block uppercase">PROTEIN</span>
                      <span className="text-xl font-bold text-sky-600 dark:text-sky-400 font-mono">{selectedFood.protein}g</span>
                    </div>
                    <div className="text-center bg-amber-500/5 dark:bg-amber-500/10 p-3 rounded-xl border border-amber-500/10">
                      <span className="text-[10px] font-mono text-neutral-400 block uppercase">CARBS</span>
                      <span className="text-xl font-bold text-amber-600 dark:text-amber-400 font-mono">{selectedFood.carbs}g</span>
                    </div>
                    <div className="text-center bg-rose-500/5 dark:bg-rose-500/10 p-3 rounded-xl border border-rose-500/10">
                      <span className="text-[10px] font-mono text-neutral-400 block uppercase">FAT</span>
                      <span className="text-xl font-bold text-rose-600 dark:text-rose-400 font-mono">{selectedFood.fat}g</span>
                    </div>
                  </div>

                  {/* Micro nutrients */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 space-y-2 text-xs">
                      <p className="font-bold text-neutral-500 font-mono uppercase tracking-wider">Vitamins & Minerals</p>
                      <div className="flex flex-wrap gap-1">
                        {[...selectedFood.vitamins, ...selectedFood.minerals].map((vit, idx) => (
                          <span key={idx} className="px-2 py-1 rounded-lg bg-white dark:bg-neutral-950 border border-neutral-150 dark:border-neutral-850 font-semibold text-neutral-700 dark:text-neutral-300">
                            {vit}
                          </span>
                        ))}
                      </div>
                      <p className="text-[10px] text-neutral-400 mt-2 font-mono">Fiber Content: {selectedFood.fiber}g</p>
                    </div>

                    <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 space-y-2 text-xs flex flex-col justify-between">
                      <div>
                        <p className="font-bold text-neutral-500 font-mono uppercase tracking-wider flex items-center gap-1">
                          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> Physiological Benefit
                        </p>
                        <p className="text-neutral-600 dark:text-neutral-300 mt-2 leading-relaxed font-medium">
                          {selectedFood.benefits}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div className="bg-neutral-100/50 dark:bg-neutral-950/20 rounded-2xl border border-dashed border-neutral-200 dark:border-neutral-800 p-12 text-center text-neutral-400 h-96 flex flex-col justify-center items-center">
                  <Apple className="w-12 h-12 text-neutral-300 mb-3" />
                  <p className="font-bold text-sm">No food selected from directory</p>
                  <p className="text-xs text-neutral-400 mt-1">Select any item from the directory sidebar to review micro/macronutrients and physical benefits.</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}
    </div>
  );
}
