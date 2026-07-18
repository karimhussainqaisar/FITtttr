import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HEALTHY_RECIPES } from '../data/recipes';
import { Recipe } from '../types';
import { Search, Clock, Award, Users, BookOpen, Flame, Sparkles } from 'lucide-react';

export default function RecipeSection() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'breakfast' | 'lunch' | 'dinner' | 'snacks' | 'smoothies'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  const filteredRecipes = HEALTHY_RECIPES.filter(recipe => {
    const matchesCategory = activeCategory === 'all' || recipe.category === activeCategory;
    const matchesSearch = recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.ingredients.some(ing => ing.toLowerCase().includes(searchQuery.toLowerCase())) ||
      recipe.dietTags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div id="recipe_section_root" className="my-6 space-y-6">
      {/* Recipe Header & Search */}
      <div className="bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-neutral-100 dark:border-neutral-800 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-neutral-800 dark:text-neutral-100 flex items-center gap-2">
              <BookOpen className="w-5.5 h-5.5 text-emerald-500" /> Culinary Fitness Kitchen
            </h3>
            <p className="text-xs text-neutral-500">Delicious, macro-friendly fuel crafted specifically to support high performance and weight management.</p>
          </div>

          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-3 w-4 h-4 text-neutral-400" />
            <input
              id="input_recipe_search"
              type="text"
              placeholder="Search ingredients, keto, high protein..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-neutral-50 dark:bg-neutral-950 rounded-xl border border-neutral-200 dark:border-neutral-800 text-sm focus:outline-none focus:border-emerald-500 text-neutral-800 dark:text-neutral-100 font-medium"
            />
          </div>
        </div>

        {/* Categories Pills */}
        <div className="flex gap-2 overflow-x-auto pb-1 sm:pb-0">
          {(['all', 'breakfast', 'lunch', 'dinner', 'snacks', 'smoothies'] as const).map(cat => (
            <button
              key={cat}
              id={`btn_recipe_cat_${cat}`}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 text-xs font-bold capitalize rounded-xl transition shrink-0 ${
                activeCategory === cat
                  ? 'bg-emerald-500 text-white shadow-md'
                  : 'text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Recipes Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRecipes.map(recipe => (
          <div
            key={recipe.id}
            id={`recipe_card_${recipe.id}`}
            className="bg-white dark:bg-neutral-950 rounded-2xl border border-neutral-150 dark:border-neutral-850 shadow-sm overflow-hidden hover:border-neutral-300 dark:hover:border-neutral-750 transition flex flex-col justify-between"
          >
            <div>
              {/* Recipe Image Card Header */}
              <div className="relative h-44 overflow-hidden bg-neutral-100 dark:bg-neutral-900">
                <img
                  src={recipe.imageUrl}
                  alt={recipe.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transform hover:scale-105 transition duration-500"
                />
                <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                  {recipe.dietTags.slice(0, 2).map((tag, i) => (
                    <span key={i} className="px-2 py-0.5 text-[8px] font-black uppercase rounded bg-neutral-900/85 text-emerald-400 tracking-wider">
                      {tag.replace('_', ' ')}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 space-y-3">
                <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400">
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-emerald-500" /> {recipe.prepTime + recipe.cookTime} Mins</span>
                  <span className="capitalize">{recipe.difficulty} prep</span>
                </div>
                <h4 className="font-extrabold text-neutral-800 dark:text-neutral-100 text-base leading-tight line-clamp-1">{recipe.title}</h4>

                {/* Micro macros tracker */}
                <div className="grid grid-cols-4 gap-2 py-2 bg-neutral-50 dark:bg-neutral-900/30 rounded-xl text-center border border-neutral-100/50 dark:border-neutral-800/55">
                  <div>
                    <span className="text-[8px] font-mono text-neutral-400 block uppercase">CAL</span>
                    <span className="text-xs font-black text-emerald-500 font-mono">{recipe.calories}</span>
                  </div>
                  <div>
                    <span className="text-[8px] font-mono text-neutral-400 block uppercase">PRO</span>
                    <span className="text-xs font-black text-neutral-800 dark:text-neutral-200 font-mono">{recipe.protein}g</span>
                  </div>
                  <div>
                    <span className="text-[8px] font-mono text-neutral-400 block uppercase">CARB</span>
                    <span className="text-xs font-black text-neutral-800 dark:text-neutral-200 font-mono">{recipe.carbs}g</span>
                  </div>
                  <div>
                    <span className="text-[8px] font-mono text-neutral-400 block uppercase">FAT</span>
                    <span className="text-xs font-black text-neutral-800 dark:text-neutral-200 font-mono">{recipe.fat}g</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card Footer Button */}
            <div className="p-4 pt-0">
              <button
                id={`btn_view_recipe_${recipe.id}`}
                onClick={() => setSelectedRecipe(recipe)}
                className="w-full py-2 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-950 rounded-xl text-xs font-bold hover:bg-neutral-800 dark:hover:bg-neutral-200 transition"
              >
                View Culinary Guide
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Recipe Detail Modal overlay */}
      <AnimatePresence>
        {selectedRecipe && (
          <motion.div
            id="recipe_modal_overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedRecipe(null)}
            className="fixed inset-0 z-50 bg-neutral-950/70 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              id="recipe_modal_content"
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={e => e.stopPropagation()}
              className="bg-white dark:bg-neutral-900 rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto border border-neutral-100 dark:border-neutral-850 shadow-2xl relative"
            >
              {/* Close Button */}
              <button
                id="btn_close_recipe_modal"
                onClick={() => setSelectedRecipe(null)}
                className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-neutral-950/60 text-white hover:bg-neutral-950/80 transition flex items-center justify-center font-bold"
              >
                ×
              </button>

              {/* Main Image Header */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={selectedRecipe.imageUrl}
                  alt={selectedRecipe.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex gap-1.5 mb-2">
                    {selectedRecipe.dietTags.map((tag, i) => (
                      <span key={i} className="px-2 py-0.5 rounded text-[8px] font-black tracking-wider bg-emerald-500 text-white uppercase">
                        {tag.replace('_', ' ')}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-2xl font-black text-white leading-tight">{selectedRecipe.title}</h3>
                </div>
              </div>

              {/* Content body */}
              <div className="p-6 space-y-6">
                {/* Meta details */}
                <div className="grid grid-cols-3 gap-2 text-center py-3 bg-neutral-50 dark:bg-neutral-950 rounded-2xl border border-neutral-100 dark:border-neutral-850 text-xs">
                  <div>
                    <span className="text-[10px] text-neutral-400 font-mono block uppercase">PREP TIME</span>
                    <span className="font-extrabold text-neutral-800 dark:text-neutral-100">{selectedRecipe.prepTime} mins</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-neutral-400 font-mono block uppercase">COOK TIME</span>
                    <span className="font-extrabold text-neutral-800 dark:text-neutral-100">{selectedRecipe.cookTime} mins</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-neutral-400 font-mono block uppercase">DIFFICULTY</span>
                    <span className="font-extrabold text-neutral-800 dark:text-neutral-100 capitalize">{selectedRecipe.difficulty}</span>
                  </div>
                </div>

                {/* Macro metrics */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400">Nutritional Profile (Per Serving)</h4>
                  <div className="grid grid-cols-4 gap-4">
                    <div className="bg-emerald-500/5 dark:bg-emerald-500/10 p-3 rounded-xl text-center border border-emerald-500/10">
                      <span className="text-[9px] text-neutral-400 block font-mono">CALORIES</span>
                      <span className="text-lg font-black text-emerald-600 dark:text-emerald-400 font-mono">{selectedRecipe.calories} kcal</span>
                    </div>
                    <div className="bg-sky-500/5 dark:bg-sky-500/10 p-3 rounded-xl text-center border border-sky-500/10">
                      <span className="text-[9px] text-neutral-400 block font-mono">PROTEIN</span>
                      <span className="text-lg font-black text-sky-600 dark:text-sky-400 font-mono">{selectedRecipe.protein}g</span>
                    </div>
                    <div className="bg-amber-500/5 dark:bg-amber-500/10 p-3 rounded-xl text-center border border-amber-500/10">
                      <span className="text-[9px] text-neutral-400 block font-mono">CARBS</span>
                      <span className="text-lg font-black text-amber-600 dark:text-amber-400 font-mono">{selectedRecipe.carbs}g</span>
                    </div>
                    <div className="bg-rose-500/5 dark:bg-rose-500/10 p-3 rounded-xl text-center border border-rose-500/10">
                      <span className="text-[9px] text-neutral-400 block font-mono">FATS</span>
                      <span className="text-lg font-black text-rose-600 dark:text-rose-400 font-mono">{selectedRecipe.fat}g</span>
                    </div>
                  </div>
                </div>

                {/* Ingredients & instructions split */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Ingredients */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400">Ingredients Checklist</h4>
                    <ul className="space-y-2 text-xs">
                      {selectedRecipe.ingredients.map((ing, i) => (
                        <li key={i} className="flex items-center gap-2 bg-neutral-50 dark:bg-neutral-950 p-2.5 rounded-lg border border-neutral-100 dark:border-neutral-850">
                          <input id={`check_ing_${i}`} type="checkbox" className="w-4 h-4 rounded accent-emerald-500 shrink-0 cursor-pointer" />
                          <span className="text-neutral-700 dark:text-neutral-300 font-semibold">{ing}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Directions */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400">Preparation Steps</h4>
                    <ol className="space-y-3 text-xs">
                      {selectedRecipe.instructions.map((step, i) => (
                        <li key={i} className="flex gap-2.5 items-start">
                          <span className="font-mono font-black text-emerald-500 shrink-0 mt-0.5">0{i + 1}.</span>
                          <p className="text-neutral-600 dark:text-neutral-300 font-medium leading-relaxed">{step}</p>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
