import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Exercise, WorkoutProgram } from '../types';
import { 
  Check, 
  X, 
  Info, 
  Flame, 
  TrendingUp, 
  Clock, 
  Dumbbell, 
  Sparkles, 
  ShieldAlert,
  Gauge,
  Zap,
  RotateCcw
} from 'lucide-react';

// ==========================================
// 1. BIOMECHANICAL MUSCLE GROUP DIAGRAM
// ==========================================
interface MuscleGroupDiagramProps {
  muscle: string;
  className?: string;
}

export function MuscleGroupDiagram({ muscle, className = '' }: MuscleGroupDiagramProps) {
  const normMuscle = muscle.toLowerCase().trim();

  // Helper to determine if a muscle is active
  const isActive = (m: string) => {
    if (normMuscle === 'full_body' || normMuscle === 'full body') return true;
    return normMuscle === m;
  };

  return (
    <div className={`p-4 bg-neutral-100/50 dark:bg-neutral-900/50 rounded-2xl border border-neutral-200/60 dark:border-neutral-800/80 flex flex-col items-center justify-center relative overflow-hidden ${className}`}>
      <div className="absolute top-2 left-3 flex items-center gap-1">
        <span className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-ping" />
        <span className="text-[9px] font-mono font-black text-neutral-400 dark:text-neutral-500 uppercase tracking-widest">Target Heatmap</span>
      </div>

      <div className="w-full max-w-[200px] flex justify-around gap-6 py-4">
        {/* Front Body SVG */}
        <div className="flex flex-col items-center">
          <span className="text-[8px] font-mono text-neutral-400 dark:text-neutral-500 uppercase font-bold mb-1">Anterior</span>
          <svg viewBox="0 0 100 220" className="w-20 h-44 drop-shadow-sm">
            {/* Background mannequin */}
            <g className="fill-neutral-200 dark:fill-neutral-800 stroke-neutral-300 dark:stroke-neutral-700 stroke-[1.5]">
              {/* Head */}
              <circle cx="50" cy="20" r="12" />
              {/* Neck */}
              <rect x="47" y="32" width="6" height="10" rx="1" />
              {/* Spine / Torso Outline */}
              <path d="M 30,42 L 70,42 L 66,110 L 34,110 Z" />
              {/* Hips */}
              <path d="M 34,110 L 66,110 L 60,135 L 40,135 Z" />
              {/* Left Arm */}
              <path d="M 28,44 L 16,90 L 12,120 C 10,123 15,123 16,120 L 22,90 L 30,55 Z" />
              {/* Right Arm */}
              <path d="M 72,44 L 84,90 L 88,120 C 90,123 85,123 84,120 L 78,90 L 70,55 Z" />
              {/* Left Leg */}
              <path d="M 40,135 L 36,175 L 32,210 C 31,213 36,215 38,210 L 44,175 L 48,135 Z" />
              {/* Right Leg */}
              <path d="M 60,135 L 64,175 L 68,210 C 69,213 64,215 62,210 L 56,175 L 52,135 Z" />
            </g>

            {/* Muscle Overlays Front */}
            <g className="transition-all duration-500">
              {/* Chest (Pectorals) */}
              <path 
                d="M 32,46 C 40,46 48,48 50,55 C 52,48 60,46 68,46 C 65,65 52,65 50,65 C 48,65 35,65 32,46 Z"
                className={`transition-colors duration-350 ${isActive('chest') ? 'fill-brand-primary/80 stroke-brand-primary' : 'fill-transparent stroke-transparent'}`}
                strokeWidth="1"
              />
              {/* Arms (Biceps/Brachii Front) */}
              <path 
                d="M 21,65 C 19,75 19,85 19,90" 
                className={`transition-colors duration-350 ${isActive('arms') ? 'stroke-brand-primary stroke-[4] stroke-linecap-round' : 'stroke-transparent'}`}
              />
              <path 
                d="M 79,65 C 81,75 81,85 81,90" 
                className={`transition-colors duration-350 ${isActive('arms') ? 'stroke-brand-primary stroke-[4] stroke-linecap-round' : 'stroke-transparent'}`}
              />
              {/* Core (Abs/Rectus Abdominis) */}
              <rect 
                x="44" y="68" width="12" height="36" rx="2"
                className={`transition-colors duration-350 ${isActive('core') ? 'fill-brand-primary/70 stroke-brand-primary' : 'fill-transparent stroke-transparent'}`}
                strokeWidth="1"
              />
              {/* Legs (Quads / Front Thighs) */}
              <path 
                d="M 37,140 L 45,140 L 42,175 L 35,175 Z"
                className={`transition-colors duration-350 ${isActive('legs') ? 'fill-brand-primary/80 stroke-brand-primary' : 'fill-transparent stroke-transparent'}`}
                strokeWidth="1"
              />
              <path 
                d="M 55,140 L 63,140 L 65,175 L 58,175 Z"
                className={`transition-colors duration-350 ${isActive('legs') ? 'fill-brand-primary/80 stroke-brand-primary' : 'fill-transparent stroke-transparent'}`}
                strokeWidth="1"
              />
              {/* Shoulders (Anterior Deltoids) */}
              <circle 
                cx="30" cy="45" r="4.5"
                className={`transition-colors duration-350 ${isActive('shoulders') ? 'fill-brand-primary/80 stroke-brand-primary' : 'fill-transparent stroke-transparent'}`}
              />
              <circle 
                cx="70" cy="45" r="4.5"
                className={`transition-colors duration-350 ${isActive('shoulders') ? 'fill-brand-primary/80 stroke-brand-primary' : 'fill-transparent stroke-transparent'}`}
              />
            </g>
          </svg>
        </div>

        {/* Back Body SVG */}
        <div className="flex flex-col items-center">
          <span className="text-[8px] font-mono text-neutral-400 dark:text-neutral-500 uppercase font-bold mb-1">Posterior</span>
          <svg viewBox="0 0 100 220" className="w-20 h-44 drop-shadow-sm">
            {/* Background mannequin */}
            <g className="fill-neutral-200 dark:fill-neutral-800 stroke-neutral-300 dark:stroke-neutral-700 stroke-[1.5]">
              {/* Head */}
              <circle cx="50" cy="20" r="12" />
              {/* Neck */}
              <rect x="47" y="32" width="6" height="10" rx="1" />
              {/* Spine / Torso Outline */}
              <path d="M 30,42 L 70,42 L 66,110 L 34,110 Z" />
              {/* Hips / Glutes Outline */}
              <path d="M 34,110 L 66,110 L 60,135 L 40,135 Z" />
              {/* Left Arm */}
              <path d="M 28,44 L 16,90 L 12,120 C 10,123 15,123 16,120 L 22,90 L 30,55 Z" />
              {/* Right Arm */}
              <path d="M 72,44 L 84,90 L 88,120 C 90,123 85,123 84,120 L 78,90 L 70,55 Z" />
              {/* Left Leg */}
              <path d="M 40,135 L 36,175 L 32,210 C 31,213 36,215 38,210 L 44,175 L 48,135 Z" />
              {/* Right Leg */}
              <path d="M 60,135 L 64,175 L 68,210 C 69,213 64,215 62,210 L 56,175 L 52,135 Z" />
            </g>

            {/* Muscle Overlays Back */}
            <g className="transition-all duration-500">
              {/* Back (Latissimus Dorsi & Rhomboids) */}
              <path 
                d="M 33,52 L 67,52 L 60,94 L 40,94 Z"
                className={`transition-colors duration-350 ${isActive('back') ? 'fill-brand-primary/80 stroke-brand-primary' : 'fill-transparent stroke-transparent'}`}
                strokeWidth="1"
              />
              {/* Shoulders (Posterior Deltoids) */}
              <path 
                d="M 28,44 C 28,44 26,49 29,52 L 34,46 Z"
                className={`transition-colors duration-350 ${isActive('shoulders') ? 'fill-brand-primary/80 stroke-brand-primary' : 'fill-transparent stroke-transparent'}`}
                strokeWidth="1"
              />
              <path 
                d="M 72,44 C 72,44 74,49 71,52 L 66,46 Z"
                className={`transition-colors duration-350 ${isActive('shoulders') ? 'fill-brand-primary/80 stroke-brand-primary' : 'fill-transparent stroke-transparent'}`}
                strokeWidth="1"
              />
              {/* Arms (Triceps Back) */}
              <path 
                d="M 23,62 L 23,80" 
                className={`transition-colors duration-350 ${isActive('arms') ? 'stroke-brand-primary stroke-[3.5] stroke-linecap-round' : 'stroke-transparent'}`}
              />
              <path 
                d="M 77,62 L 77,80" 
                className={`transition-colors duration-350 ${isActive('arms') ? 'stroke-brand-primary stroke-[3.5] stroke-linecap-round' : 'stroke-transparent'}`}
              />
              {/* Glutes / Legs Back (Hamstrings) */}
              <path 
                d="M 35,112 C 40,128 48,128 48,112 C 48,128 58,128 65,112 C 60,135 40,135 35,112 Z"
                className={`transition-colors duration-350 ${isActive('legs') ? 'fill-brand-primary/60 stroke-brand-primary' : 'fill-transparent stroke-transparent'}`}
                strokeWidth="0.5"
              />
              <path 
                d="M 36,140 L 44,140 L 40,175 L 34,175 Z"
                className={`transition-colors duration-350 ${isActive('legs') ? 'fill-brand-primary/70 stroke-brand-primary' : 'fill-transparent stroke-transparent'}`}
                strokeWidth="1"
              />
              <path 
                d="M 56,140 L 64,140 L 66,175 L 60,175 Z"
                className={`transition-colors duration-350 ${isActive('legs') ? 'fill-brand-primary/70 stroke-brand-primary' : 'fill-transparent stroke-transparent'}`}
                strokeWidth="1"
              />
            </g>
          </svg>
        </div>
      </div>

      <div className="text-center">
        <span className="text-[11px] font-bold text-neutral-700 dark:text-neutral-300 capitalize">{normMuscle.replace('_', ' ')} Activation</span>
        <p className="text-[9px] text-neutral-400 mt-0.5 max-w-[150px]">
          {normMuscle === 'chest' && 'Heavy pectoralis major tension with anterior deltoid engagement.'}
          {normMuscle === 'back' && 'Latissimus dorsi contraction, pulling scapular fibers together.'}
          {normMuscle === 'legs' && 'Quadriceps femoris, hamstrings, and gluteus maximus concentric load.'}
          {normMuscle === 'shoulders' && 'Front/medial deltoid load requiring core vertical stability.'}
          {normMuscle === 'arms' && 'Focused bicep/tricep elbow extension or flexion mechanics.'}
          {normMuscle === 'core' && 'Isometric intra-abdominal pressure and core brace action.'}
          {normMuscle === 'full_body' && 'Compound multi-joint systemic neural recruitment.'}
          {normMuscle === 'all' && 'Select an exercise below to view specific biomechanical muscle loads.'}
        </p>
      </div>
    </div>
  );
}

// ==========================================
// 2. INTERACTIVE VECTOR EXERCISE VISUALIZER
// ==========================================
interface ExerciseVisualizerProps {
  exerciseId: string;
}

export function ExerciseVisualizer({ exerciseId }: ExerciseVisualizerProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isContracted, setIsContracted] = useState(false);

  // Auto loop the contraction phases for dynamic illustration effect
  React.useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setIsContracted(prev => !prev);
    }, 1800);
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="p-5 bg-neutral-100/50 dark:bg-neutral-900/50 rounded-2xl border border-neutral-200/60 dark:border-neutral-800/80 flex flex-col items-center justify-between min-h-[220px] relative overflow-hidden">
      {/* Visualizer header */}
      <div className="w-full flex justify-between items-center text-[10px] font-mono font-bold text-neutral-400">
        <span className="flex items-center gap-1.5 uppercase tracking-wider">
          <Zap className="w-3.5 h-3.5 text-amber-500 animate-pulse" /> Kinetic Engine
        </span>
        <button 
          onClick={() => setIsPlaying(!isPlaying)}
          className="px-2 py-0.5 rounded-md bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 hover:text-brand-primary flex items-center gap-1 transition text-[9px]"
        >
          <RotateCcw className={`w-3 h-3 ${isPlaying ? 'animate-spin' : ''}`} />
          {isPlaying ? 'Looping' : 'Paused'}
        </button>
      </div>

      {/* SVG Canvas Area */}
      <div className="my-3 flex items-center justify-center h-32 w-full relative">
        <svg viewBox="0 0 160 120" className="w-44 h-32 text-neutral-800 dark:text-neutral-200">
          {/* Ground platform line */}
          <line x1="10" y1="105" x2="150" y2="105" className="stroke-neutral-300 dark:stroke-neutral-700 stroke-[2] stroke-dasharray-[3]" />

          {/* SQUAT / LEG EXERCISES */}
          {['ex-squat', 'ex-lunge'].includes(exerciseId) && (
            <g className="transition-all duration-700">
              {/* Stand / Squatting Mannequin */}
              {/* Hips */}
              <circle cx="80" cy={isContracted ? "75" : "55"} r="5" className="fill-brand-primary stroke-neutral-900 dark:stroke-neutral-100 stroke-[1]" />
              {/* Spine / Head */}
              <line x1="80" y1={isContracted ? "75" : "55"} x2="80" y2={isContracted ? "50" : "30"} className="stroke-brand-primary stroke-[4]" />
              <circle cx="80" cy={isContracted ? "42" : "22"} r="7" className="fill-brand-secondary" />
              {/* Left Leg: Hip -> Knee -> Foot */}
              <polyline 
                points={isContracted ? "80,75 62,85 70,105" : "80,55 72,80 72,105"} 
                className="stroke-brand-primary stroke-[5] fill-none stroke-round" 
              />
              {/* Right Leg: Hip -> Knee -> Foot */}
              <polyline 
                points={isContracted ? "80,75 98,85 90,105" : "80,55 88,80 88,105"} 
                className="stroke-brand-primary stroke-[5] fill-none stroke-round" 
              />
              {/* Barbell across upper back */}
              <line x1="50" y1={isContracted ? "54" : "34"} x2="110" y2={isContracted ? "54" : "34"} className="stroke-neutral-400 dark:stroke-neutral-600 stroke-[4]" />
              {/* Weights */}
              <rect x="42" y={isContracted ? "46" : "26"} width="8" height="16" rx="1" className="fill-neutral-500" />
              <rect x="110" y={isContracted ? "46" : "26"} width="8" height="16" rx="1" className="fill-neutral-500" />
            </g>
          )}

          {/* CHEST PRESS / PUSHUP EXERCISES */}
          {['ex-bench-press', 'ex-db-press', 'ex-push-ups', 'ex-chest-fly'].includes(exerciseId) && (
            <g className="transition-all duration-700">
              {/* Bench */}
              <line x1="30" y1="85" x2="130" y2="85" className="stroke-neutral-300 dark:stroke-neutral-700 stroke-[4]" />
              <line x1="45" y1="85" x2="45" y2="105" className="stroke-neutral-300 dark:stroke-neutral-700 stroke-[3]" />
              <line x1="115" y1="85" x2="115" y2="105" className="stroke-neutral-300 dark:stroke-neutral-700 stroke-[3]" />

              {/* Torso lying down */}
              <rect x="50" y="77" width="60" height="8" rx="2" className="fill-brand-secondary" />
              {/* Head */}
              <circle cx="43" cy="79" r="6" className="fill-brand-secondary" />

              {/* Arms pressing up */}
              {/* Left Shoulder to Elbow to Hand */}
              <polyline 
                points={isContracted ? "70,77 70,40 70,40" : "70,77 58,72 58,58"} 
                className="stroke-brand-primary stroke-[4.5] fill-none stroke-round" 
              />
              <polyline 
                points={isContracted ? "90,77 90,40 90,40" : "90,77 102,72 102,58"} 
                className="stroke-brand-primary stroke-[4.5] fill-none stroke-round" 
              />

              {/* Barbell / Dumbbells */}
              {exerciseId === 'ex-bench-press' ? (
                <>
                  <line x1="45" y1={isContracted ? "38" : "56"} x2="115" y2={isContracted ? "38" : "56"} className="stroke-neutral-400 dark:stroke-neutral-600 stroke-[3]" />
                  <circle cx="45" cy={isContracted ? "38" : "56"} r="8" className="fill-neutral-500" />
                  <circle cx="115" cy={isContracted ? "38" : "56"} r="8" className="fill-neutral-500" />
                </>
              ) : (
                <>
                  {/* Dumbbells */}
                  <rect x="54" y={isContracted ? "32" : "50"} width="8" height="6" rx="1" className="fill-neutral-500" />
                  <rect x="98" y={isContracted ? "32" : "50"} width="8" height="6" rx="1" className="fill-neutral-500" />
                </>
              )}
            </g>
          )}

          {/* PULL UPS / LAT PULLDOWNS / BACK ROWS */}
          {['ex-pull-ups', 'ex-lat-pulldown', 'ex-barbell-row', 'ex-deadlift'].includes(exerciseId) && (
            <g className="transition-all duration-700">
              {/* Pull-up Rig structure if pull-ups */}
              {exerciseId === 'ex-pull-ups' && (
                <>
                  <line x1="20" y1="20" x2="140" y2="20" className="stroke-neutral-300 dark:stroke-neutral-700 stroke-[3]" />
                  <line x1="30" y1="20" x2="30" y2="105" className="stroke-neutral-300 dark:stroke-neutral-700 stroke-[2]" />
                  <line x1="130" y1="20" x2="130" y2="105" className="stroke-neutral-300 dark:stroke-neutral-700 stroke-[2]" />
                </>
              )}

              {/* Body hanging and pulling */}
              {/* Torso */}
              <line x1="80" y1={isContracted ? "35" : "55"} x2="80" y2={isContracted ? "75" : "90"} className="stroke-brand-secondary stroke-[4]" />
              {/* Head */}
              <circle cx="80" cy={isContracted ? "23" : "43"} r="6.5" className="fill-brand-secondary" />

              {/* Arms holding bar */}
              <polyline 
                points={isContracted ? "80,35 68,26 60,20" : "80,55 64,40 60,20"} 
                className="stroke-brand-primary stroke-[4] fill-none stroke-round" 
              />
              <polyline 
                points={isContracted ? "80,35 92,26 100,20" : "80,55 96,40 100,20"} 
                className="stroke-brand-primary stroke-[4] fill-none stroke-round" 
              />

              {/* Legs hanging bent */}
              <polyline 
                points={isContracted ? "80,75 75,90 85,98" : "80,90 75,100 82,104"} 
                className="stroke-brand-secondary/80 stroke-[4] fill-none stroke-round" 
              />
            </g>
          )}

          {/* ARMS / BICEP CURL / TRICEP EXTENSION */}
          {['ex-bicep-curl', 'ex-tricep-pushdown', 'ex-lateral-raise', 'ex-overhead-press'].includes(exerciseId) && (
            <g className="transition-all duration-700">
              {/* Torso standing */}
              <line x1="80" y1="50" x2="80" y2="95" className="stroke-brand-secondary stroke-[5]" />
              <circle cx="80" cy="38" r="7.5" className="fill-brand-secondary" />
              {/* Legs standing */}
              <line x1="74" y1="95" x2="74" y2="105" className="stroke-neutral-400 stroke-[4.5]" />
              <line x1="86" y1="95" x2="86" y2="105" className="stroke-neutral-400 stroke-[4.5]" />

              {/* Dynamic Arm & Weight */}
              {exerciseId === 'ex-bicep-curl' ? (
                <>
                  {/* Elbow stay static, Forearm curl */}
                  <polyline 
                    points={isContracted ? "80,52 92,68 85,42" : "80,52 92,68 98,90"} 
                    className="stroke-brand-primary stroke-[4.5] fill-none stroke-round" 
                  />
                  {/* Dumbbell */}
                  <circle cx={isContracted ? "85" : "98"} cy={isContracted ? "38" : "92"} r="5.5" className="fill-neutral-500" />
                </>
              ) : (
                <>
                  {/* Tricep pushing down */}
                  <polyline 
                    points={isContracted ? "80,52 92,65 92,88" : "80,52 92,65 74,52"} 
                    className="stroke-brand-primary stroke-[4.5] fill-none stroke-round" 
                  />
                  {/* Bar / Rope grip */}
                  <circle cx={isContracted ? "92" : "74"} cy={isContracted ? "90" : "50"} r="4" className="fill-neutral-500" />
                </>
              )}
            </g>
          )}

          {/* CARDIO / RUNNING / CYCLING / JUMP ROPE */}
          {['ex-running', 'ex-cycling', 'ex-brisk-walking', 'ex-hiit', 'ex-jump-rope'].includes(exerciseId) && (
            <g className="transition-all duration-700">
              {/* Running / Cycling Mannequin */}
              {/* Torso leaning forward */}
              <line x1="75" y1="55" x2="85" y2="85" className="stroke-brand-secondary stroke-[4.5]" />
              <circle cx="82" cy="40" r="7" className="fill-brand-secondary" />

              {/* Legs moving in cycle */}
              {/* Leg 1 */}
              <polyline 
                points={isContracted ? "85,85 70,95 85,105" : "85,85 102,92 90,105"} 
                className="stroke-brand-primary stroke-[4.5] fill-none stroke-round" 
              />
              {/* Leg 2 */}
              <polyline 
                points={isContracted ? "85,85 102,92 90,105" : "85,85 70,95 85,105"} 
                className="stroke-brand-primary/60 stroke-[4.5] fill-none stroke-round" 
              />

              {/* Arms swinging */}
              <polyline 
                points={isContracted ? "78,55 92,65 90,75" : "78,55 64,65 74,78"} 
                className="stroke-brand-secondary stroke-[3.5] fill-none stroke-round" 
              />

              {/* Spinning wheel or lines to simulate motion */}
              {exerciseId === 'ex-cycling' && (
                <>
                  <circle cx="65" cy="98" r="14" className="stroke-neutral-300 dark:stroke-neutral-700 fill-none stroke-[2]" />
                  <circle cx="115" cy="98" r="14" className="stroke-neutral-300 dark:stroke-neutral-700 fill-none stroke-[2]" />
                </>
              )}

              {exerciseId === 'ex-jump-rope' && (
                <ellipse cx="85" cy="72" rx="30" ry="42" className="stroke-brand-primary/40 stroke-[1.5] fill-none stroke-dasharray-[4]" />
              )}
            </g>
          )}
        </svg>
      </div>

      <div className="text-center font-mono">
        <span className="px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider bg-brand-light text-brand-primary">
          {isContracted ? 'Peak Contraction' : 'Eccentric Extension'}
        </span>
      </div>
    </div>
  );
}

// ==========================================
// 3. CALORIE BURN proyected & MET INFOGRAPHIC
// ==========================================
interface CalorieBurnInfographicProps {
  caloriesPerMin: number;
}

export function CalorieBurnInfographic({ caloriesPerMin }: CalorieBurnInfographicProps) {
  const met = Math.round((caloriesPerMin * 60) / 75 * 10) / 10; // estimate MET
  const intervals = [15, 30, 45, 60];

  return (
    <div className="p-5 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-150 dark:border-neutral-850 shadow-sm space-y-4">
      <div className="flex justify-between items-center">
        <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
          <Flame className="w-4 h-4 text-brand-primary" /> Projected Calories Burned
        </h4>
        <div className="text-[10px] font-mono bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded-lg text-neutral-500 font-bold">
          EST. MET: <span className="text-brand-primary font-black">{met}x</span>
        </div>
      </div>

      {/* Burn projections */}
      <div className="space-y-2.5">
        {intervals.map(min => {
          const burned = Math.round(caloriesPerMin * min);
          const maxPossible = 13 * 60; // based on max 13cal/min
          const percentage = Math.min(100, (burned / maxPossible) * 100);

          return (
            <div key={min} className="space-y-1">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-neutral-500 font-bold flex items-center gap-1">
                  <Clock className="w-3 h-3 text-neutral-400" /> {min} Minutes Session
                </span>
                <span className="font-extrabold text-neutral-800 dark:text-neutral-200">
                  {burned} <span className="text-[10px] text-neutral-400 font-normal">kcal</span>
                </span>
              </div>
              <div className="h-2 w-full bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className="h-full bg-gradient-to-r from-brand-primary to-brand-secondary rounded-full"
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex gap-2 p-3 bg-brand-light/20 dark:bg-brand-light/10 border border-brand-primary/10 rounded-xl">
        <Gauge className="w-5 h-5 text-brand-primary shrink-0 mt-0.5" />
        <p className="text-[10px] text-neutral-500 dark:text-neutral-400 leading-relaxed">
          Projections are calculated based on a metabolic average 75kg body weight. Calorie burn rates vary according to real heart rate training zones (aerobic vs anaerobic thresholds).
        </p>
      </div>
    </div>
  );
}

// ==========================================
// 4. COACH FORM DO'S & DONT'S
// ==========================================
interface FormDoDontCardsProps {
  exerciseId: string;
}

export function FormDoDontCards({ exerciseId }: FormDoDontCardsProps) {
  // Config map for Dos and Donts per exercise
  const COACH_TIPS: Record<string, { do: string[]; dont: string[] }> = {
    'ex-bench-press': {
      do: [
        'Keep feet firmly planted on the floor for leg drive.',
        'Slightly arch your lower back and squeeze scapula.',
        'Keep elbows tucked at a 45-degree angle to save shoulders.'
      ],
      dont: [
        'Do not flare elbows wide out at a 90-degree angle.',
        'Never lift your hips or glutes off the bench.',
        'Do not bounce the heavy bar off your sternum.'
      ]
    },
    'ex-push-ups': {
      do: [
        'Keep core and glutes fully squeezed to lock the spine.',
        'Elbows should point backwards (arrowhead shape).',
        'Inhale on the way down, exhale as you push.'
      ],
      dont: [
        'Do not let your hips sag toward the ground.',
        'Do not look forward; keep neck neutral pointing down.',
        'Do not execute half-reps; go chest to floor.'
      ]
    },
    'ex-squat': {
      do: [
        'Drive knees outwards to track with your toes.',
        'Keep chest up high and bracing core throughout.',
        'Push hips back and sink below parallel levels.'
      ],
      dont: [
        'Do not allow knees to cave inward (valgus collapse).',
        'Do not let your heels lift off the ground.',
        'Never round your lower back at the bottom (butt wink).'
      ]
    },
    'ex-pull-ups': {
      do: [
        'Lead with your chest and pull down through your elbows.',
        'Engage scapula fully before starting the pull.',
        'Control the negative slow eccentric slide down.'
      ],
      dont: [
        'Do not use excessive body kick/kipping unless specialized.',
        'Do not shrug shoulders up; keep them depressed.',
        'Do not cross legs backward; keep legs forward for core.'
      ]
    },
    default: {
      do: [
        'Keep your spine in neutral vertical alignment.',
        'Exhale during concentric execution (effort phase).',
        'Focus on mindful brain-muscle contractive focus.'
      ],
      dont: [
        'Do not use momentum to swing heavy weight.',
        'Never lock out joint sockets aggressively.',
        'Do not hold your breath during heavy sets.'
      ]
    }
  };

  const tips = COACH_TIPS[exerciseId] || COACH_TIPS.default;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {/* DO CARD */}
      <div className="p-4 rounded-xl border border-emerald-500/10 bg-emerald-500/[0.02] dark:bg-emerald-500/[0.04] space-y-3">
        <h4 className="text-xs font-black uppercase tracking-wider text-emerald-600 flex items-center gap-1.5">
          <Check className="w-4 h-4 text-emerald-500" /> Dynamic Form Do's
        </h4>
        <ul className="space-y-2">
          {tips.do.map((tip, idx) => (
            <li key={idx} className="flex gap-2 items-start text-xs text-neutral-600 dark:text-neutral-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-1.5" />
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* DONT CARD */}
      <div className="p-4 rounded-xl border border-red-500/10 bg-red-500/[0.02] dark:bg-red-500/[0.04] space-y-3">
        <h4 className="text-xs font-black uppercase tracking-wider text-red-600 flex items-center gap-1.5">
          <X className="w-4 h-4 text-red-500" /> Strict Form Dont's
        </h4>
        <ul className="space-y-2">
          {tips.dont.map((tip, idx) => (
            <li key={idx} className="flex gap-2 items-start text-xs text-neutral-600 dark:text-neutral-400">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0 mt-1.5" />
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// ==========================================
// 5. VOLUME CALCULATOR & SPLIT INFO
// ==========================================
interface ProgramDashboardInfographicProps {
  program: WorkoutProgram;
}

export function ProgramDashboardInfographic({ program }: ProgramDashboardInfographicProps) {
  const [liftWeight, setLiftWeight] = useState<number>(60);
  const totalExercises = program.exercises.length;

  // Calculate simulated weekly load or metrics
  const estimatedStrengthSets = program.exercises.filter(ex => !ex.durationMin).length;
  const estimatedCardioMinutes = program.exercises.reduce((acc, ex) => acc + (ex.durationMin || 0), 0);

  // Dynamic tonnage calculation based on adjustable slider
  const totalRepsPerSet = 10; // average reps
  const estimatedSetsPerEx = 3.5; // average sets
  const calculatedTonnage = Math.round(estimatedStrengthSets * estimatedSetsPerEx * totalRepsPerSet * liftWeight);

  // Muscle percentage breakdown split
  const isGain = program.category === 'muscle_gain';
  const muscleShares = isGain 
    ? { Chest: 30, Back: 25, Legs: 25, Shoulders: 10, Arms: 10 } 
    : { Chest: 15, Back: 15, Legs: 35, Core: 25, Arms: 10 };

  return (
    <div className="p-5 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800/80 rounded-2xl space-y-6">
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-brand-primary" /> Program Dashboard & Analytics
        </h4>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-brand-light text-brand-primary font-bold">
          {program.frequency}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Muscle group distribution chart */}
        <div className="space-y-3">
          <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wide">Target Muscle Group Distribution</span>
          <div className="space-y-2">
            {Object.entries(muscleShares).map(([m, share]) => (
              <div key={m} className="space-y-1">
                <div className="flex justify-between text-[11px] font-mono">
                  <span className="text-neutral-500 capitalize">{m}</span>
                  <span className="font-bold text-neutral-700 dark:text-neutral-300">{share}%</span>
                </div>
                <div className="h-1.5 w-full bg-neutral-200/60 dark:bg-neutral-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-brand-primary rounded-full transition-all duration-1000"
                    style={{ width: `${share}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dynamic training tonnage calculator */}
        <div className="space-y-3 bg-white dark:bg-neutral-950 p-4 rounded-xl border border-neutral-150 dark:border-neutral-850 flex flex-col justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-neutral-500 uppercase">
              <Dumbbell className="w-3.5 h-3.5 text-brand-primary" /> Volume Estimator
            </div>
            <p className="text-[10px] text-neutral-400">Estimate your mechanical work (total tonnage moved) per workout cycle based on weight load:</p>
          </div>

          {estimatedStrengthSets > 0 ? (
            <div className="space-y-3 my-2">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-neutral-400">Weight Load:</span>
                <span className="font-extrabold text-brand-primary">{liftWeight} kg</span>
              </div>
              <input 
                type="range" 
                min="10" 
                max="180" 
                step="5"
                value={liftWeight}
                onChange={(e) => setLiftWeight(Number(e.target.value))}
                className="w-full h-1 bg-neutral-200 dark:bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-brand-primary"
              />
              <div className="bg-brand-light p-2.5 rounded-lg border border-brand-primary/10 flex justify-between items-center">
                <span className="text-[9px] font-black uppercase text-neutral-500">Calculated Volume:</span>
                <span className="text-sm font-black text-brand-primary font-mono">{calculatedTonnage.toLocaleString()} kg</span>
              </div>
            </div>
          ) : (
            <div className="p-3 text-center border border-dashed border-neutral-200 dark:border-neutral-800 rounded-lg text-[10px] text-neutral-400">
              No strength training exercises in this metabolic conditioning program.
            </div>
          )}

          <div className="flex justify-around items-center border-t border-neutral-100 dark:border-neutral-850 pt-2 text-[10px] text-neutral-400 font-mono">
            <div>
              <p>STRENGTH LIFTS</p>
              <p className="font-extrabold text-xs text-neutral-700 dark:text-neutral-300">{estimatedStrengthSets} movements</p>
            </div>
            <div className="border-l border-neutral-200 h-6" />
            <div>
              <p>CARDIO CONDITIONING</p>
              <p className="font-extrabold text-xs text-neutral-700 dark:text-neutral-300">{estimatedCardioMinutes > 0 ? `${estimatedCardioMinutes} min` : 'None'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
