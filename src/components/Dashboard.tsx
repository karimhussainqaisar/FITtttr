import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { UserProfile, DailyChallenge } from '../types';
import { Flame, Trophy, Award, Trash, Droplet, Footprints, Scale, Circle, TrendingDown, Users, CheckCircle, RefreshCw, Download, FileText, Database } from 'lucide-react';
import HabitTracker from './HabitTracker';

interface DashboardProps {
  profile: UserProfile;
  onUpdateProfile: (updated: UserProfile) => void;
  onReset: () => void;
}

interface WeightLog {
  date: string;
  weight: number;
}

export default function Dashboard({ profile, onUpdateProfile, onReset }: DashboardProps) {
  // Water state
  const [waterAmount, setWaterAmount] = useState<number>(0);
  // Steps state
  const [stepsCount, setStepsCount] = useState<number>(3400);
  // Weight history state
  const [weightLogs, setWeightLogs] = useState<WeightLog[]>([
    { date: 'Jul 12', weight: profile.weight + 2 },
    { date: 'Jul 14', weight: profile.weight + 1.2 },
    { date: 'Jul 16', weight: profile.weight + 0.5 },
    { date: 'Jul 18', weight: profile.weight },
  ]);
  const [weightInput, setWeightInput] = useState<string>('');

  // Daily challenges gamification
  const [challenges, setChallenges] = useState<DailyChallenge[]>([
    { id: 'c1', title: 'Hydration Catalyst', description: 'Log at least 2,000 ml of water', points: 30, completed: false },
    { id: 'c2', title: 'Active Pioneer', description: 'Record over 8,000 steps', points: 40, completed: false },
    { id: 'c3', title: 'Hypertrophy Sentinel', description: 'Consume your total targeted protein goal', points: 50, completed: false }
  ]);

  const [points, setPoints] = useState<number>(120);
  const [streakDays, setStreakDays] = useState<number>(4);

  // Sync state with localStorage on mount
  useEffect(() => {
    const savedWater = localStorage.getItem('fitlife_water_log');
    if (savedWater) setWaterAmount(parseInt(savedWater));

    const savedSteps = localStorage.getItem('fitlife_steps_log');
    if (savedSteps) setStepsCount(parseInt(savedSteps));

    const savedLogs = localStorage.getItem('fitlife_weight_logs');
    if (savedLogs) {
      setWeightLogs(JSON.parse(savedLogs));
    } else {
      localStorage.setItem('fitlife_weight_logs', JSON.stringify(weightLogs));
    }

    const savedPoints = localStorage.getItem('fitlife_points');
    if (savedPoints) setPoints(parseInt(savedPoints));

    const savedStreak = localStorage.getItem('fitlife_streak');
    if (savedStreak) setStreakDays(parseInt(savedStreak));

    const savedChallenges = localStorage.getItem('fitlife_challenges');
    if (savedChallenges) setChallenges(JSON.parse(savedChallenges));
  }, []);

  // Sync state helpers
  const saveWater = (amount: number) => {
    setWaterAmount(amount);
    localStorage.setItem('fitlife_water_log', amount.toString());
    // Auto check hydration challenge
    if (amount >= 2000) {
      triggerChallengeComplete('c1');
    }
  };

  const saveSteps = (count: number) => {
    setStepsCount(count);
    localStorage.setItem('fitlife_steps_log', count.toString());
    // Auto check steps challenge
    if (count >= 8000) {
      triggerChallengeComplete('c2');
    }
  };

  const triggerChallengeComplete = (id: string) => {
    setChallenges(prev => {
      const updated = prev.map(ch => {
        if (ch.id === id && !ch.completed) {
          setPoints(pts => {
            const nextPts = pts + ch.points;
            localStorage.setItem('fitlife_points', nextPts.toString());
            return nextPts;
          });
          return { ...ch, completed: true };
        }
        return ch;
      });
      localStorage.setItem('fitlife_challenges', JSON.stringify(updated));
      return updated;
    });
  };

  const addWeightLog = () => {
    const numericWeight = parseFloat(weightInput);
    if (isNaN(numericWeight) || numericWeight <= 20 || numericWeight > 300) return;

    const dateStr = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const newLog: WeightLog = { date: dateStr, weight: numericWeight };

    const nextLogs = [...weightLogs, newLog].slice(-6); // Keep last 6 logs
    setWeightLogs(nextLogs);
    localStorage.setItem('fitlife_weight_logs', JSON.stringify(nextLogs));
    setWeightInput('');

    // Update active profile current weight
    const updatedProfile: UserProfile = { ...profile, weight: numericWeight };
    onUpdateProfile(updatedProfile);
  };

  const deleteWeightLogs = () => {
    const baseLog = [{ date: 'Jul 18', weight: profile.weight }];
    setWeightLogs(baseLog);
    localStorage.setItem('fitlife_weight_logs', JSON.stringify(baseLog));
  };

  const handleAddXP = (xp: number) => {
    setPoints(pts => {
      const nextPts = Math.max(0, pts + xp);
      localStorage.setItem('fitlife_points', nextPts.toString());
      return nextPts;
    });
  };

  // SVG Weight Graph Calculations
  const minWeight = Math.min(...weightLogs.map(l => l.weight)) - 1.5;
  const maxWeight = Math.max(...weightLogs.map(l => l.weight)) + 1.5;
  const weightRange = maxWeight - minWeight || 1;

  const width = 450;
  const height = 180;
  const padding = 30;

  const pointsString = weightLogs.map((log, index) => {
    const x = padding + (index / Math.max(1, weightLogs.length - 1)) * (width - padding * 2);
    const y = height - padding - ((log.weight - minWeight) / weightRange) * (height - padding * 2);
    return `${x},${y}`;
  }).join(' ');

  // Gamification achievements definition
  const badges = [
    { id: 'b_water', title: 'Hydration Hero', desc: 'Log >= 2,000ml water in one turn', unlocked: waterAmount >= 2000, color: 'text-sky-500 bg-sky-500/10' },
    { id: 'b_steps', title: 'Century Walker', desc: 'Exceed 10,000 steps milestone', unlocked: stepsCount >= 10000, color: 'text-amber-500 bg-amber-500/10' },
    { id: 'b_streak', title: 'Iron Discipline', desc: 'Achieve a 4-day tracking streak', unlocked: streakDays >= 4, color: 'text-rose-500 bg-rose-500/10' },
    { id: 'b_points', title: 'Elite Champion', desc: 'Reach 200 gamified fitness points', unlocked: points >= 200, color: 'text-emerald-500 bg-emerald-500/10' }
  ];

  // Leaderboard mock players
  const leaderboard = [
    { name: 'Sarah Jenkins', points: 340, rank: 1, isUser: false },
    { name: 'Marcus CSCS', points: 290, rank: 2, isUser: false },
    { name: 'Elena Rostova', points: 210, rank: 3, isUser: false },
    { name: `${profile.gender === 'male' ? 'Mr.' : 'Ms.'} FitLife (You)`, points: points, rank: points >= 340 ? 1 : points >= 290 ? 2 : points >= 210 ? 3 : 4, isUser: true },
  ].sort((a, b) => b.points - a.points);

  const downloadTxtReport = () => {
    const timestamp = new Date().toLocaleString('en-US');
    const pctHydrated = Math.round((waterAmount / profile.waterGoal) * 100);
    
    let text = `========================================================================\n`;
    text += `             FITLIFE AI - PERSONAL FITNESS & DIET REPORT                \n`;
    text += `========================================================================\n`;
    text += `Generated on: ${timestamp}\n`;
    text += `User Name: FitLife Athlete\n`;
    text += `Biometrics: ${profile.gender.toUpperCase()}, ${profile.age} years old\n\n`;

    text += `BIOMETRIC SUMMARY & PARAMETERS:\n`;
    text += `------------------------------------------------------------------------\n`;
    text += `Height: ${profile.height} cm\n`;
    text += `Current Weight: ${profile.weight} kg\n`;
    text += `Target Weight: ${profile.targetWeight} kg\n`;
    text += `Daily Calorie Target: ${profile.calorieGoal} kcal\n`;
    text += `Macro Nutrients Breakdown:\n`;
    text += `  - Protein Target: ${profile.proteinGoal}g\n`;
    text += `  - Carbs Target: ${profile.carbsGoal}g\n`;
    text += `  - Fat Target: ${profile.fatGoal}g\n\n`;

    text += `DAILY TRACKING STATS & MILESTONES:\n`;
    text += `------------------------------------------------------------------------\n`;
    text += `Hydration Logged: ${waterAmount} ml / ${profile.waterGoal} ml (${pctHydrated}% of target)\n`;
    text += `Steps Logged: ${stepsCount.toLocaleString()} steps (Goal: 10,000 steps)\n`;
    text += `Current Streak: ${streakDays} Days\n`;
    text += `Earned Experience (XP): ${points} pts\n\n`;

    text += `SOMATIC WEIGHT HISTORY LOGS:\n`;
    text += `------------------------------------------------------------------------\n`;
    if (weightLogs.length === 0) {
      text += `No weight logs recorded yet.\n`;
    } else {
      weightLogs.forEach(log => {
        text += `  - ${log.date}: ${log.weight} kg\n`;
      });
    }
    text += `\n`;

    text += `DAILY CATALYSTS (CHALLENGES STATUS):\n`;
    text += `------------------------------------------------------------------------\n`;
    challenges.forEach(ch => {
      text += `- ${ch.title} [${ch.completed ? 'COMPLETED' : 'PENDING'}]\n`;
      text += `  Description: ${ch.description} (+${ch.points} XP)\n`;
    });
    text += `\n`;

    text += `UNLOCKED BADGES & ACHIEVEMENTS:\n`;
    text += `------------------------------------------------------------------------\n`;
    badges.forEach(b => {
      text += `- ${b.title} [${b.unlocked ? 'UNLOCKED' : 'LOCKED'}]\n`;
      text += `  ${b.desc}\n`;
    });
    text += `\n`;

    text += `------------------------------------------------------------------------\n`;
    text += `"Your body is a temple, keep it refined with daily discipline."\n`;
    text += `FitLife AI System - Science-Based Fitness Coaching\n`;
    text += `========================================================================\n`;

    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `fitlife_progress_report_athlete.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const downloadJsonData = () => {
    const timestamp = new Date().toISOString();
    const data = {
      appName: 'FitLife AI',
      exportTimestamp: timestamp,
      profile: {
        name: 'FitLife Athlete',
        age: profile.age,
        gender: profile.gender,
        height: profile.height,
        weight: profile.weight,
        targetWeight: profile.targetWeight,
        calorieGoal: profile.calorieGoal,
        proteinGoal: profile.proteinGoal,
        carbsGoal: profile.carbsGoal,
        fatGoal: profile.fatGoal,
        waterGoal: profile.waterGoal,
      },
      metrics: {
        waterAmountMl: waterAmount,
        stepsCount: stepsCount,
        streakDays: streakDays,
        points: points,
      },
      weightHistory: weightLogs,
      dailyChallenges: challenges,
      badges: badges.map(b => ({
        id: b.id,
        title: b.title,
        desc: b.desc,
        unlocked: b.unlocked,
      })),
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `fitlife_progress_data_athlete.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div id="dashboard_root" className="grid grid-cols-1 lg:grid-cols-3 gap-6 my-6 items-start">
      {/* LEFT COLUMN: User Stats Card & Trackers */}
      <div className="lg:col-span-2 space-y-6">

        {/* Quick welcome stats bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 bg-white dark:bg-neutral-950 rounded-2xl border border-neutral-100 dark:border-neutral-850 text-center">
            <span className="text-[10px] text-neutral-400 font-mono block uppercase">Calorie Target</span>
            <span className="text-xl font-bold font-mono text-emerald-500">{profile.calorieGoal} kcal</span>
          </div>
          <div className="p-4 bg-white dark:bg-neutral-950 rounded-2xl border border-neutral-100 dark:border-neutral-850 text-center">
            <span className="text-[10px] text-neutral-400 font-mono block uppercase">Protein goal</span>
            <span className="text-xl font-bold font-mono text-sky-400">{profile.proteinGoal}g</span>
          </div>
          <div className="p-4 bg-white dark:bg-neutral-950 rounded-2xl border border-neutral-100 dark:border-neutral-850 text-center">
            <span className="text-[10px] text-neutral-400 font-mono block uppercase">Carbs Goal</span>
            <span className="text-xl font-bold font-mono text-amber-500">{profile.carbsGoal}g</span>
          </div>
          <div className="p-4 bg-white dark:bg-neutral-950 rounded-2xl border border-neutral-100 dark:border-neutral-850 text-center">
            <span className="text-[10px] text-neutral-400 font-mono block uppercase">Fat Goal</span>
            <span className="text-xl font-bold font-mono text-rose-500">{profile.fatGoal}g</span>
          </div>
        </div>

        {/* Hydration & Steps Trackers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Water log */}
          <div className="p-5 bg-white dark:bg-neutral-950 border border-neutral-100 dark:border-neutral-850 rounded-2xl shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="font-extrabold text-sm text-neutral-800 dark:text-neutral-100 flex items-center gap-2">
                <Droplet className="w-5 h-5 text-sky-500 fill-sky-500/20" /> Hydration Tracker
              </h4>
              <span className="text-xs font-mono font-semibold text-sky-500">{waterAmount} / {profile.waterGoal} ml</span>
            </div>

            {/* Glass Visual scale */}
            <div className="h-16 w-full rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 relative overflow-hidden flex items-end">
              <div
                className="w-full bg-sky-500/30 border-t-2 border-sky-500 transition-all duration-500"
                style={{ height: `${Math.min(100, (waterAmount / profile.waterGoal) * 100)}%` }}
              />
              <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-neutral-600 dark:text-neutral-300">
                {Math.round((waterAmount / profile.waterGoal) * 100)}% Hydrated
              </div>
            </div>

            {/* Quick add triggers */}
            <div className="grid grid-cols-3 gap-2">
              <button
                id="btn_add_water_250"
                onClick={() => saveWater(waterAmount + 250)}
                className="py-1.5 px-1 rounded-lg text-[10px] font-bold border border-sky-500/20 text-sky-600 bg-sky-500/5 hover:bg-sky-500/10 transition"
              >
                +250ml
              </button>
              <button
                id="btn_add_water_500"
                onClick={() => saveWater(waterAmount + 500)}
                className="py-1.5 px-1 rounded-lg text-[10px] font-bold border border-sky-500/20 text-sky-600 bg-sky-500/5 hover:bg-sky-500/10 transition"
              >
                +500ml
              </button>
              <button
                id="btn_add_water_1000"
                onClick={() => saveWater(waterAmount + 1000)}
                className="py-1.5 px-1 rounded-lg text-[10px] font-bold border border-sky-500/20 text-sky-600 bg-sky-500/5 hover:bg-sky-500/10 transition"
              >
                +1.0L
              </button>
            </div>
          </div>

          {/* Steps log */}
          <div className="p-5 bg-white dark:bg-neutral-950 border border-neutral-100 dark:border-neutral-850 rounded-2xl shadow-sm space-y-4 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center">
                <h4 className="font-extrabold text-sm text-neutral-800 dark:text-neutral-100 flex items-center gap-2">
                  <Footprints className="w-5 h-5 text-amber-500" /> Aerobic Steps Tracker
                </h4>
                <span className="text-xs font-mono font-semibold text-amber-500">{stepsCount} / 10,000</span>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-neutral-100 dark:bg-neutral-800 h-2.5 rounded-full mt-4 overflow-hidden">
                <div
                  className="bg-amber-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, (stepsCount / 10000) * 100)}%` }}
                />
              </div>
            </div>

            {/* Slider to adjust steps log */}
            <div>
              <div className="flex justify-between text-[10px] text-neutral-400 font-mono mb-1">
                <span>Drag to log steps</span>
                <span className="font-bold">{stepsCount} steps</span>
              </div>
              <input
                id="slider_log_steps"
                type="range"
                min="0"
                max="18000"
                step="500"
                value={stepsCount}
                onChange={e => saveSteps(parseInt(e.target.value))}
                className="w-full h-1.5 bg-neutral-100 dark:bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
            </div>
          </div>
        </div>

        {/* Dynamic Weight Progress Custom Line Chart */}
        <div className="p-6 bg-white dark:bg-neutral-950 border border-neutral-100 dark:border-neutral-850 rounded-2xl shadow-sm space-y-6">
          <div className="flex justify-between items-start flex-wrap gap-4">
            <div>
              <h4 className="font-extrabold text-base text-neutral-800 dark:text-neutral-100 flex items-center gap-2">
                <Scale className="w-5 h-5 text-emerald-500" /> Somatic Weight Progress (Symmetric)
              </h4>
              <p className="text-xs text-neutral-400 mt-0.5">Visualize your body weight adjustments relative to targeted thresholds.</p>
            </div>

            <div className="flex gap-2 items-center">
              <input
                id="input_log_weight"
                type="number"
                step="0.1"
                placeholder="0.0"
                value={weightInput}
                onChange={e => setWeightInput(e.target.value)}
                className="w-20 px-2 py-1 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg text-xs focus:outline-none focus:border-emerald-500 text-center font-bold"
              />
              <button
                id="btn_submit_weight"
                onClick={addWeightLog}
                className="px-3 py-1 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-xs font-bold transition"
              >
                Log kg
              </button>
            </div>
          </div>

          {/* SVG Chart Frame */}
          <div className="w-full overflow-x-auto">
            <div className="min-w-[450px]">
              <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto text-neutral-300 dark:text-neutral-800">
                {/* Horizontal Grid lines */}
                {[0, 0.25, 0.5, 0.75, 1].map((ratio, idx) => {
                  const y = padding + ratio * (height - padding * 2);
                  const weightVal = (maxWeight - ratio * weightRange).toFixed(1);
                  return (
                    <g key={idx}>
                      <line x1={padding} y1={y} x2={width - padding} y2={y} stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 3" />
                      <text x={padding - 5} y={y + 4} textAnchor="end" className="fill-neutral-400 text-[9px] font-mono">{weightVal}</text>
                    </g>
                  );
                })}

                {/* X Axis labels */}
                {weightLogs.map((log, index) => {
                  const x = padding + (index / Math.max(1, weightLogs.length - 1)) * (width - padding * 2);
                  return (
                    <text key={index} x={x} y={height - 8} textAnchor="middle" className="fill-neutral-400 text-[9px] font-mono">
                      {log.date}
                    </text>
                  );
                })}

                {/* Draw Smooth Path Polyline */}
                {weightLogs.length > 1 && (
                  <path
                    d={`M ${pointsString}`}
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                )}

                {/* Dots on coordinate triggers */}
                {weightLogs.map((log, index) => {
                  const x = padding + (index / Math.max(1, weightLogs.length - 1)) * (width - padding * 2);
                  const y = height - padding - ((log.weight - minWeight) / weightRange) * (height - padding * 2);
                  return (
                    <g key={index}>
                      <circle cx={x} cy={y} r="5" className="fill-emerald-500 stroke-white dark:stroke-neutral-950" strokeWidth="2" />
                      {/* Tooltip text showing exact weight */}
                      <text x={x} y={y - 10} textAnchor="middle" className="fill-neutral-800 dark:fill-neutral-100 text-[10px] font-bold font-mono bg-neutral-900">
                        {log.weight}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>

          <div className="flex justify-between items-center text-[10px] font-mono text-neutral-400 pt-2 border-t border-neutral-100 dark:border-neutral-800">
            <span>Somatic weight tracking (6 data-points cap)</span>
            <button
              id="btn_clear_logs"
              onClick={deleteWeightLogs}
              className="text-neutral-400 hover:text-red-500 transition flex items-center gap-1"
            >
              <Trash className="w-3.5 h-3.5" /> Clear History
            </button>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: Gamification Achievements, Daily Challenges & Leaderboard */}
      <div className="space-y-6">

        {/* Streak Counter and points */}
        <div className="p-5 bg-gradient-to-br from-neutral-900 to-neutral-950 text-white rounded-2xl border border-neutral-800 shadow-md relative overflow-hidden">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <span className="text-[10px] text-neutral-400 uppercase tracking-wider font-mono">My Standing Status</span>
              <h4 className="text-3xl font-black text-neutral-50 tracking-tight flex items-center gap-1">
                <Trophy className="w-7 h-7 text-amber-400" /> {points} <span className="text-xs text-neutral-400 font-normal">pts</span>
              </h4>
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-center font-mono">
              <span className="text-[9px] text-rose-400 font-bold block flex items-center gap-0.5"><Flame className="w-3.5 h-3.5 fill-rose-500 text-rose-500" /> STREAK</span>
              <span className="text-lg font-black text-white">{streakDays} Days</span>
            </div>
          </div>
        </div>

        {/* Daily Habits Tracker */}
        <HabitTracker onAddXP={handleAddXP} />

        {/* Daily Challenges */}
        <div className="p-5 bg-white dark:bg-neutral-950 border border-neutral-100 dark:border-neutral-850 rounded-2xl shadow-sm space-y-4">
          <h4 className="font-bold text-sm text-neutral-800 dark:text-neutral-100 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-emerald-500" /> Daily Catalysts
          </h4>
          <div className="space-y-3">
            {challenges.map(ch => (
              <div key={ch.id} className="p-3 rounded-xl border border-neutral-100 dark:border-neutral-850 bg-neutral-50/50 dark:bg-neutral-900/40 text-xs flex justify-between items-center">
                <div className="space-y-1 pr-2">
                  <p className="font-extrabold text-neutral-800 dark:text-neutral-200">{ch.title}</p>
                  <p className="text-[10px] text-neutral-500">{ch.description}</p>
                </div>
                {ch.completed ? (
                  <span className="text-emerald-500 font-bold font-mono text-[10px] shrink-0 bg-emerald-500/10 px-2 py-1 rounded-lg">
                    + {ch.points} XP
                  </span>
                ) : (
                  <button
                    id={`btn_complete_ch_${ch.id}`}
                    onClick={() => triggerChallengeComplete(ch.id)}
                    className="text-[10px] font-bold text-neutral-500 hover:text-emerald-500 shrink-0 bg-neutral-100 dark:bg-neutral-800 px-2.5 py-1 rounded-lg hover:bg-emerald-500/10 hover:border-emerald-500/20 transition border border-transparent"
                  >
                    Log Done
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Gamification Achievements Badges */}
        <div className="p-5 bg-white dark:bg-neutral-950 border border-neutral-100 dark:border-neutral-850 rounded-2xl shadow-sm space-y-4">
          <h4 className="font-bold text-sm text-neutral-800 dark:text-neutral-100 flex items-center gap-2">
            <Award className="w-5 h-5 text-emerald-500" /> Unlockable Badges
          </h4>
          <div className="grid grid-cols-2 gap-3">
            {badges.map(b => (
              <div
                key={b.id}
                className={`p-3 rounded-xl border text-center transition flex flex-col items-center justify-between h-28 ${
                  b.unlocked
                    ? 'border-emerald-500/20 bg-emerald-500/5'
                    : 'border-neutral-100 dark:border-neutral-850 bg-neutral-50/20 opacity-40'
                }`}
              >
                <Award className={`w-8 h-8 ${b.unlocked ? 'text-emerald-500' : 'text-neutral-300'}`} />
                <div>
                  <p className="font-extrabold text-[10px] text-neutral-800 dark:text-neutral-200 leading-tight">{b.title}</p>
                  <p className="text-[8px] text-neutral-400 mt-0.5 leading-tight">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Leaderboard global ranking */}
        <div className="p-5 bg-white dark:bg-neutral-950 border border-neutral-100 dark:border-neutral-850 rounded-2xl shadow-sm space-y-4">
          <h4 className="font-bold text-sm text-neutral-800 dark:text-neutral-100 flex items-center gap-2">
            <Users className="w-5 h-5 text-emerald-500" /> Global Standings
          </h4>
          <div className="space-y-2">
            {leaderboard.map((item, index) => (
              <div
                key={index}
                className={`flex justify-between items-center p-2.5 rounded-xl text-xs transition ${
                  item.isUser ? 'bg-emerald-500/10 border border-emerald-500/20' : ''
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center font-mono font-bold text-[10px] ${
                    index === 0 ? 'bg-amber-400 text-neutral-950' : index === 1 ? 'bg-neutral-300 text-neutral-950' : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-500'
                  }`}>
                    {index + 1}
                  </span>
                  <span className={`font-semibold ${item.isUser ? 'text-emerald-600 dark:text-emerald-400 font-extrabold' : 'text-neutral-700 dark:text-neutral-300'}`}>
                    {item.name}
                  </span>
                </div>
                <span className="font-mono font-bold text-neutral-500 dark:text-neutral-400">{item.points} XP</span>
              </div>
            ))}
          </div>
        </div>

        {/* Progress Export Card */}
        <div className="p-5 bg-white dark:bg-neutral-950 border border-neutral-100 dark:border-neutral-850 rounded-2xl shadow-sm space-y-4">
          <h4 className="font-bold text-sm text-neutral-800 dark:text-neutral-100 flex items-center gap-2">
            <Download className="w-5 h-5 text-emerald-500" /> Progress Archive Desk
          </h4>
          <p className="text-[11px] text-neutral-400 leading-relaxed">
            Download your biometric indexes, somatic weight progression, XP standing, and daily catalyst checklist. Keep them for your medical counselor or personal training journal.
          </p>
          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              id="btn_download_txt"
              onClick={downloadTxtReport}
              className="py-2.5 px-3 rounded-xl text-xs font-bold border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-200 bg-neutral-50/50 dark:bg-neutral-900/50 hover:bg-emerald-500/10 hover:border-emerald-500/20 hover:text-emerald-500 transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <FileText className="w-4 h-4 shrink-0" />
              <span>Report (.TXT)</span>
            </button>
            <button
              id="btn_download_json"
              onClick={downloadJsonData}
              className="py-2.5 px-3 rounded-xl text-xs font-bold border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-200 bg-neutral-50/50 dark:bg-neutral-900/50 hover:bg-sky-500/10 hover:border-sky-500/20 hover:text-sky-500 transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <Database className="w-4 h-4 shrink-0" />
              <span>Data (.JSON)</span>
            </button>
          </div>
        </div>

        {/* Danger zone / resets */}
        <div className="text-center pt-2">
          <button
            id="btn_reset_all_data"
            onClick={onReset}
            className="text-[10px] text-neutral-400 hover:text-red-500 font-mono transition flex items-center justify-center gap-1 mx-auto"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Reset Profile & Settings
          </button>
        </div>
      </div>
    </div>
  );
}
