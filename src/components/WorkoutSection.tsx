import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { EXERCISE_LIBRARY, WORKOUT_PROGRAMS } from '../data/exercises';
import { Exercise, WorkoutProgram } from '../types';
import { Dumbbell, Eye, Timer, Flame, CheckCircle, FlameKindling, Info, Library } from 'lucide-react';

export default function WorkoutSection() {
  const [activeTab, setActiveTab] = useState<'programs' | 'library'>('programs');
  const [muscleFilter, setMuscleFilter] = useState<'all' | 'chest' | 'back' | 'legs' | 'shoulders' | 'arms' | 'core' | 'full_body'>('all');
  const [selectedProgram, setSelectedProgram] = useState<WorkoutProgram | null>(null);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);

  const filteredExercises = EXERCISE_LIBRARY.filter(ex => {
    if (muscleFilter === 'all') return true;
    return ex.targetMuscle === muscleFilter;
  });

  // Lookup helper for exercise names
  const getExerciseName = (id: string) => {
    const ex = EXERCISE_LIBRARY.find(e => e.id === id);
    return ex ? ex.name : id;
  };

  const getExerciseObj = (id: string) => {
    return EXERCISE_LIBRARY.find(e => e.id === id);
  };

  return (
    <div id="workout_section_root" className="my-6 space-y-8">
      {/* Sub header controls */}
      <div className="flex justify-between items-center bg-white dark:bg-neutral-900 p-4 rounded-2xl border border-neutral-100 dark:border-neutral-800 shadow-sm flex-wrap gap-4">
        <div className="flex gap-2">
          <button
            id="btn_workout_programs_tab"
            onClick={() => { setActiveTab('programs'); setSelectedProgram(null); }}
            className={`px-4 py-2 text-sm font-bold rounded-xl transition flex items-center gap-2 ${
              activeTab === 'programs'
                ? 'bg-emerald-500 text-white shadow-md'
                : 'text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
            }`}
          >
            <Dumbbell className="w-4 h-4" /> Workout Splits & Plans
          </button>
          <button
            id="btn_exercise_library_tab"
            onClick={() => { setActiveTab('library'); setSelectedExercise(null); }}
            className={`px-4 py-2 text-sm font-bold rounded-xl transition flex items-center gap-2 ${
              activeTab === 'library'
                ? 'bg-emerald-500 text-white shadow-md'
                : 'text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
            }`}
          >
            <Library className="w-4 h-4" /> Exercise Library
          </button>
        </div>

        {activeTab === 'library' && (
          <div className="flex gap-1.5 overflow-x-auto max-w-full pb-1 sm:pb-0">
            {['all', 'chest', 'back', 'legs', 'shoulders', 'arms'].map(muscle => (
              <button
                key={muscle}
                id={`btn_muscle_filter_${muscle}`}
                onClick={() => setMuscleFilter(muscle as any)}
                className={`px-2.5 py-1 text-xs font-semibold capitalize rounded-lg transition shrink-0 ${
                  muscleFilter === muscle
                    ? 'bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-950 shadow-sm'
                    : 'text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                }`}
              >
                {muscle}
              </button>
            ))}
          </div>
        )}
      </div>

      {activeTab === 'programs' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Workout programs side panel list */}
          <div className="lg:col-span-1 space-y-4 max-h-[600px] overflow-y-auto pr-2">
            <h3 className="text-lg font-bold text-neutral-800 dark:text-neutral-100 flex items-center gap-2">
              <FlameKindling className="w-5 h-5 text-emerald-500" /> Active Splits
            </h3>
            {WORKOUT_PROGRAMS.map(prog => (
              <button
                key={prog.id}
                id={`btn_workout_prog_card_${prog.id}`}
                onClick={() => setSelectedProgram(prog)}
                className={`w-full text-left p-4 rounded-xl border transition flex flex-col justify-between h-40 ${
                  selectedProgram?.id === prog.id
                    ? 'border-emerald-500 bg-emerald-500/5 dark:bg-emerald-500/10'
                    : 'border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 hover:border-neutral-300'
                }`}
              >
                <div>
                  <div className="flex justify-between items-start mb-1">
                    <span className={`px-2 py-0.5 text-[10px] font-black tracking-wider uppercase rounded-full ${
                      prog.category === 'muscle_gain'
                        ? 'bg-sky-500/10 text-sky-600'
                        : 'bg-emerald-500/10 text-emerald-600'
                    }`}>
                      {prog.category.replace('_', ' ')}
                    </span>
                    <span className="text-xs font-mono text-neutral-400">{prog.frequency}</span>
                  </div>
                  <h4 className="font-bold text-neutral-800 dark:text-neutral-200 text-sm md:text-base line-clamp-1">{prog.name}</h4>
                  <p className="text-xs text-neutral-500 mt-1 line-clamp-2">{prog.description}</p>
                </div>

                <div className="flex justify-between items-center border-t border-neutral-100 dark:border-neutral-850 pt-2 text-[10px] text-neutral-400 font-mono">
                  <span>Split Cycle: <span className="font-bold">{prog.durationDays} Days</span></span>
                  <span className="text-emerald-500 font-bold hover:underline">Launch Routine →</span>
                </div>
              </button>
            ))}
          </div>

          {/* Active Workout Program details panel */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {selectedProgram ? (
                <motion.div
                  key={selectedProgram.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-white dark:bg-neutral-950 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-6"
                >
                  <div className="flex justify-between items-start border-b border-neutral-100 dark:border-neutral-800 pb-4 flex-wrap gap-4">
                    <div>
                      <span className={`px-2 py-0.5 text-[10px] font-black tracking-wider uppercase rounded-full ${
                        selectedProgram.category === 'muscle_gain'
                          ? 'bg-sky-500/10 text-sky-600'
                          : 'bg-emerald-500/10 text-emerald-600'
                      }`}>
                        {selectedProgram.category.replace('_', ' ')}
                      </span>
                      <h3 className="text-2xl font-black text-neutral-800 dark:text-neutral-100 mt-2">{selectedProgram.name}</h3>
                      <p className="text-sm text-neutral-500 mt-1">{selectedProgram.description}</p>
                    </div>
                    <div className="text-right font-mono">
                      <p className="text-sm text-neutral-400">FREQUENCY</p>
                      <p className="text-xl font-bold text-emerald-500">{selectedProgram.frequency}</p>
                    </div>
                  </div>

                  {/* Exercises Checklist */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-4">Core Exercises Breakdown</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {selectedProgram.exercises.map((item, idx) => {
                        const originalEx = getExerciseObj(item.exerciseId);
                        return (
                          <div key={idx} className="p-4 rounded-xl border border-neutral-100 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/40 hover:bg-neutral-50 dark:hover:bg-neutral-900/60 transition flex flex-col justify-between">
                            <div>
                              <div className="flex justify-between items-start">
                                <h5 className="font-bold text-sm text-neutral-800 dark:text-neutral-200">{getExerciseName(item.exerciseId)}</h5>
                                <span className="px-1.5 py-0.5 rounded text-[8px] font-mono font-bold uppercase bg-neutral-200 dark:bg-neutral-800 text-neutral-500">
                                  {originalEx?.targetMuscle || 'body'}
                                </span>
                              </div>
                              {originalEx?.description && (
                                <p className="text-xs text-neutral-500 mt-1 line-clamp-2">{originalEx.description}</p>
                              )}
                            </div>

                            <div className="flex justify-between items-center border-t border-neutral-100 dark:border-neutral-800/80 pt-3 mt-3">
                              <span className="text-xs font-bold font-mono text-emerald-500">
                                {item.sets && item.reps ? `${item.sets} Sets x ${item.reps} Reps` : `${item.durationMin} Min Duration`}
                              </span>
                              <button
                                id={`btn_view_ex_details_${item.exerciseId}`}
                                onClick={() => {
                                  const obj = getExerciseObj(item.exerciseId);
                                  if (obj) {
                                    setActiveTab('library');
                                    setSelectedExercise(obj);
                                  }
                                }}
                                className="text-[10px] font-bold text-neutral-400 hover:text-emerald-500 flex items-center gap-1 transition"
                              >
                                <Eye className="w-3.5 h-3.5" /> Guide
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div className="bg-neutral-100/50 dark:bg-neutral-950/20 rounded-2xl border border-dashed border-neutral-200 dark:border-neutral-800 p-12 text-center text-neutral-400 h-96 flex flex-col justify-center items-center">
                  <Dumbbell className="w-12 h-12 text-neutral-300 mb-3 animate-bounce" />
                  <p className="font-bold text-sm">No workout split selected</p>
                  <p className="text-xs text-neutral-400 mt-1">Select one of our specialized home/gym programs on the left to see complete exercise schedules.</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      ) : (
        /* Exercise library database tab */
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Exercises directory sidebar */}
          <div className="md:col-span-1 space-y-4 max-h-[500px] overflow-y-auto pr-2">
            <h3 className="text-lg font-bold text-neutral-800 dark:text-neutral-100 flex items-center gap-2">
              <Library className="w-5 h-5 text-emerald-500" /> Movement Library
            </h3>
            <div className="space-y-2">
              {filteredExercises.map(ex => (
                <button
                  key={ex.id}
                  id={`btn_ex_lib_card_${ex.id}`}
                  onClick={() => setSelectedExercise(ex)}
                  className={`w-full text-left p-3 rounded-xl border transition flex items-center justify-between ${
                    selectedExercise?.id === ex.id
                      ? 'border-emerald-500 bg-emerald-500/5'
                      : 'border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 hover:border-neutral-300'
                  }`}
                >
                  <div>
                    <h4 className="font-bold text-sm text-neutral-800 dark:text-neutral-200">{ex.name}</h4>
                    <span className="text-[10px] font-mono text-neutral-400 capitalize">{ex.category} • {ex.targetMuscle}</span>
                  </div>
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold capitalize bg-neutral-100 dark:bg-neutral-800 text-neutral-500">
                    {ex.difficulty}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Exercise guide breakdown */}
          <div className="md:col-span-2">
            <AnimatePresence mode="wait">
              {selectedExercise ? (
                <motion.div
                  key={selectedExercise.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-white dark:bg-neutral-950 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-6"
                >
                  <div className="flex justify-between items-start border-b border-neutral-100 dark:border-neutral-800 pb-4 flex-wrap gap-4">
                    <div>
                      <span className="px-2 py-0.5 text-[10px] font-black tracking-wider uppercase bg-emerald-500/10 text-emerald-600 rounded-full">
                        {selectedExercise.category} Training
                      </span>
                      <h3 className="text-2xl font-black text-neutral-800 dark:text-neutral-100 mt-2">{selectedExercise.name}</h3>
                      <p className="text-sm text-neutral-500 mt-1">{selectedExercise.description}</p>
                    </div>
                    <div className="flex items-center gap-2 bg-emerald-500/10 text-emerald-600 px-3 py-1.5 rounded-xl font-mono text-xs font-bold">
                      <Flame className="w-4 h-4 fill-emerald-500/20" /> {selectedExercise.caloriesBurnedPerMin} cal/min
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-150 dark:border-neutral-800 space-y-3">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
                        <Dumbbell className="w-4 h-4 text-emerald-500" /> Bio details
                      </h4>
                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between">
                          <span className="text-neutral-500">Target Muscle:</span>
                          <span className="font-bold capitalize text-neutral-800 dark:text-neutral-100">{selectedExercise.targetMuscle}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-500">Difficulty Threshold:</span>
                          <span className="font-bold capitalize text-neutral-800 dark:text-neutral-100">{selectedExercise.difficulty}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-500">Required Gear:</span>
                          <span className="font-bold text-neutral-800 dark:text-neutral-100">{selectedExercise.equipment.join(', ')}</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-150 dark:border-neutral-800 space-y-2 flex flex-col justify-center">
                      <div className="flex items-start gap-2.5 text-xs">
                        <Info className="w-5 h-5 text-emerald-500 shrink-0" />
                        <div>
                          <p className="font-bold text-neutral-700 dark:text-neutral-200">Execution Tip</p>
                          <p className="text-neutral-500 dark:text-neutral-400 leading-relaxed mt-0.5">Control the negative (eccentric) part of the movement for at least 3 seconds to trigger maximum mechanical tension and target hypertrophy.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Step by step directions */}
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400">Step by Step Coaching Instructions</h4>
                    <ol className="space-y-2 text-xs">
                      {selectedExercise.instructions.map((step, sIdx) => (
                        <li key={sIdx} className="flex gap-3 bg-neutral-50/50 dark:bg-neutral-900/30 p-3 rounded-lg border border-neutral-100 dark:border-neutral-850">
                          <span className="font-mono font-bold text-emerald-500 shrink-0">0{sIdx + 1}.</span>
                          <span className="text-neutral-700 dark:text-neutral-300 font-medium leading-relaxed">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </motion.div>
              ) : (
                <div className="bg-neutral-100/50 dark:bg-neutral-950/20 rounded-2xl border border-dashed border-neutral-200 dark:border-neutral-800 p-12 text-center text-neutral-400 h-96 flex flex-col justify-center items-center">
                  <Library className="w-12 h-12 text-neutral-300 mb-3" />
                  <p className="font-bold text-sm">No exercise selected</p>
                  <p className="text-xs text-neutral-400 mt-1">Select an exercise from our comprehensive Movement Library on the left to see instructions, muscles targeted, and execution tips.</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}
    </div>
  );
}
