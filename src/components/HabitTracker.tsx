import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Plus, Trash2, Flame, Sparkles, CheckSquare, Square, Activity } from 'lucide-react';
import { Habit } from '../types';

interface HabitTrackerProps {
  onAddXP?: (xp: number) => void;
}

const DEFAULT_HABITS: Habit[] = [
  { id: 'h1', title: 'Took daily supplements', completed: false, streak: 3 },
  { id: 'h2', title: 'Hit 8-hour sleep target', completed: false, streak: 5 },
  { id: 'h3', title: 'Completed full-body stretching', completed: false, streak: 2 },
  { id: 'h4', title: 'No refined sugar today', completed: false, streak: 7 }
];

export default function HabitTracker({ onAddXP }: HabitTrackerProps) {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [newHabitTitle, setNewHabitTitle] = useState('');
  const [showAddSuccess, setShowAddSuccess] = useState(false);

  // Load habits from localStorage on mount
  useEffect(() => {
    const savedHabits = localStorage.getItem('fitlife_habits_tracker');
    if (savedHabits) {
      try {
        setHabits(JSON.parse(savedHabits));
      } catch (e) {
        setHabits(DEFAULT_HABITS);
      }
    } else {
      setHabits(DEFAULT_HABITS);
      localStorage.setItem('fitlife_habits_tracker', JSON.stringify(DEFAULT_HABITS));
    }
  }, []);

  // Save habits helper
  const saveHabits = (updatedHabits: Habit[]) => {
    setHabits(updatedHabits);
    localStorage.setItem('fitlife_habits_tracker', JSON.stringify(updatedHabits));
  };

  // Toggle habit completion
  const toggleHabit = (id: string) => {
    const updated = habits.map(h => {
      if (h.id === id) {
        const wasCompleted = h.completed;
        const newCompleted = !wasCompleted;
        const newStreak = newCompleted ? h.streak + 1 : Math.max(0, h.streak - 1);
        
        // Award or deduct small XP (e.g., 5 XP)
        if (onAddXP) {
          onAddXP(newCompleted ? 5 : -5);
        }

        return {
          ...h,
          completed: newCompleted,
          streak: newStreak
        };
      }
      return h;
    });
    saveHabits(updated);
  };

  // Add a new custom habit
  const handleAddHabit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanTitle = newHabitTitle.trim();
    if (!cleanTitle) return;

    const newHabit: Habit = {
      id: `h_${Date.now()}`,
      title: cleanTitle,
      completed: false,
      streak: 0
    };

    const updated = [...habits, newHabit];
    saveHabits(updated);
    setNewHabitTitle('');
    
    // Quick success toast animation helper
    setShowAddSuccess(true);
    setTimeout(() => setShowAddSuccess(false), 2000);
  };

  // Delete a habit
  const deleteHabit = (id: string) => {
    // If deleted habit was completed, deduct its XP contribution to maintain balance
    const habitToDelete = habits.find(h => h.id === id);
    if (habitToDelete && habitToDelete.completed && onAddXP) {
      onAddXP(-5);
    }
    const updated = habits.filter(h => h.id !== id);
    saveHabits(updated);
  };

  // Calculate stats
  const completedCount = habits.filter(h => h.completed).length;
  const totalCount = habits.length;
  const completionPercentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className="p-5 bg-white dark:bg-neutral-950 border border-neutral-100 dark:border-neutral-850 rounded-2xl shadow-sm space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h4 className="font-bold text-sm text-neutral-800 dark:text-neutral-100 flex items-center gap-2">
          <Activity className="w-5 h-5 text-emerald-500" /> Daily Habits Tracker
        </h4>
        <span className="text-[10px] font-mono bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold px-2 py-0.5 rounded-full">
          {completedCount}/{totalCount} Done
        </span>
      </div>

      {/* Progress Bar */}
      <div className="space-y-1">
        <div className="flex justify-between text-[10px] text-neutral-400 font-mono">
          <span>Habit Momentum</span>
          <span>{completionPercentage}%</span>
        </div>
        <div className="h-1.5 w-full bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-500 ease-out"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
      </div>

      {/* Habits List */}
      <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-neutral-200 dark:scrollbar-thumb-neutral-800">
        <AnimatePresence initial={false}>
          {habits.length === 0 ? (
            <div className="text-center py-6 text-neutral-400 text-[11px] border border-dashed border-neutral-200 dark:border-neutral-800 rounded-xl">
              No habits defined. Add one below to start!
            </div>
          ) : (
            habits.map((habit) => (
              <motion.div
                key={habit.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className={`flex justify-between items-center p-2.5 rounded-xl border transition-all ${
                  habit.completed
                    ? 'border-emerald-500/20 bg-emerald-500/5 text-neutral-700 dark:text-neutral-300'
                    : 'border-neutral-100 dark:border-neutral-850 bg-neutral-50/50 dark:bg-neutral-900/40 text-neutral-800 dark:text-neutral-200'
                }`}
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  {/* Custom animated checkbox */}
                  <button
                    onClick={() => toggleHabit(habit.id)}
                    className={`w-5 h-5 rounded-md flex items-center justify-center transition-all shrink-0 cursor-pointer ${
                      habit.completed
                        ? 'bg-emerald-500 border-transparent text-white'
                        : 'border border-neutral-300 dark:border-neutral-700 hover:border-emerald-500 bg-white dark:bg-neutral-900 text-transparent'
                    }`}
                  >
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </button>

                  <span className={`text-xs select-none truncate ${habit.completed ? 'line-through text-neutral-400 dark:text-neutral-500' : ''}`}>
                    {habit.title}
                  </span>
                </div>

                <div className="flex items-center gap-2 shrink-0 pl-2">
                  {/* Streak bubble */}
                  {habit.streak > 0 && (
                    <div className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-lg bg-amber-500/10 text-amber-500 font-mono text-[9px] font-bold">
                      <Flame className="w-3 h-3 fill-amber-500" />
                      <span>{habit.streak}</span>
                    </div>
                  )}

                  {/* Delete button */}
                  <button
                    onClick={() => deleteHabit(habit.id)}
                    className="p-1 rounded-md text-neutral-400 hover:text-red-500 hover:bg-red-500/10 transition cursor-pointer"
                    title="Delete habit"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      {/* Add Custom Habit Form */}
      <form onSubmit={handleAddHabit} className="space-y-2 pt-1 border-t border-neutral-100 dark:border-neutral-800">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="e.g., Hit sleep target, Took zinc..."
            value={newHabitTitle}
            onChange={(e) => setNewHabitTitle(e.target.value)}
            maxLength={40}
            className="flex-1 bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 rounded-xl px-3 py-2 text-xs text-neutral-800 dark:text-neutral-100 focus:outline-none focus:ring-1 focus:ring-emerald-500 placeholder-neutral-400"
          />
          <button
            type="submit"
            className="p-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white transition flex items-center justify-center shrink-0 shadow-sm cursor-pointer"
            title="Add Habit"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
        
        {/* Success toast micro-indicator */}
        <AnimatePresence>
          {showAddSuccess && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-[10px] text-emerald-500 font-medium flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3" /> Habit added successfully!
            </motion.p>
          )}
        </AnimatePresence>
      </form>
    </div>
  );
}
