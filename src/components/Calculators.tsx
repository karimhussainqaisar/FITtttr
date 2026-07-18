import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calculator, HelpCircle, RefreshCw, Flame, Heart, Sparkles } from 'lucide-react';

export default function Calculators() {
  const [activeTab, setActiveTab] = useState<'bmi' | 'bmr_tdee' | 'body_fat' | 'ideal_weight'>('bmi');

  // BMI State
  const [bmiHeight, setBmiHeight] = useState(175);
  const [bmiWeight, setBmiWeight] = useState(70);
  const [bmiResult, setBmiResult] = useState(22.9);
  const [bmiCategory, setBmiCategory] = useState('Normal Weight');

  // BMR & TDEE State
  const [bmrAge, setBmrAge] = useState(26);
  const [bmrGender, setBmrGender] = useState<'male' | 'female'>('male');
  const [bmrHeight, setBmrHeight] = useState(175);
  const [bmrWeight, setBmrWeight] = useState(75);
  const [bmrActivity, setBmrActivity] = useState<'sedentary' | 'light' | 'moderate' | 'active' | 'very_active'>('moderate');
  const [bmrResultVal, setBmrResultVal] = useState(1720);
  const [tdeeResult, setTdeeResult] = useState(2666);
  const [dietGoal, setDietGoal] = useState<'lose' | 'maintain' | 'gain'>('lose');

  // Body Fat State (US Navy Method)
  const [bfGender, setBfGender] = useState<'male' | 'female'>('male');
  const [bfHeight, setBfHeight] = useState(175);
  const [bfNeck, setBfNeck] = useState(38);
  const [bfWaist, setBfWaist] = useState(85);
  const [bfHip, setBfHip] = useState(90); // Only for female
  const [bfResult, setBfResult] = useState(18.5);

  // Ideal Weight State
  const [iwHeight, setIwHeight] = useState(175);
  const [iwGender, setIwGender] = useState<'male' | 'female'>('male');
  const [iwResult, setIwResult] = useState(69.8);

  // Re-calculate BMI
  useEffect(() => {
    const heightInMeters = bmiHeight / 100;
    const bmi = parseFloat((bmiWeight / (heightInMeters * heightInMeters)).toFixed(1));
    setBmiResult(bmi);

    if (bmi < 18.5) {
      setBmiCategory('Underweight');
    } else if (bmi >= 18.5 && bmi < 25) {
      setBmiCategory('Healthy Weight');
    } else if (bmi >= 25 && bmi < 30) {
      setBmiCategory('Overweight');
    } else {
      setBmiCategory('Obese');
    }
  }, [bmiHeight, bmiWeight]);

  // Re-calculate BMR & TDEE
  useEffect(() => {
    let bmr = 0;
    if (bmrGender === 'male') {
      bmr = 10 * bmrWeight + 6.25 * bmrHeight - 5 * bmrAge + 5;
    } else {
      bmr = 10 * bmrWeight + 6.25 * bmrHeight - 5 * bmrAge - 161;
    }
    setBmrResultVal(Math.round(bmr));

    const multipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      very_active: 1.9,
    };
    const tdee = Math.round(bmr * multipliers[bmrActivity]);
    setTdeeResult(tdee);
  }, [bmrAge, bmrGender, bmrHeight, bmrWeight, bmrActivity]);

  // Re-calculate Body Fat (Navy Method)
  useEffect(() => {
    let bf = 0;
    // Log bases for calculation
    const heightInInches = bfHeight / 2.54;
    const neckInInches = bfNeck / 2.54;
    const waistInInches = bfWaist / 2.54;

    if (bfGender === 'male') {
      // US Navy formula for male: 86.010 * log10(waist - neck) - 70.041 * log10(height) + 36.76
      const logWaistNeck = Math.log10(waistInInches - neckInInches);
      const logHeight = Math.log10(heightInInches);
      if (waistInInches > neckInInches) {
        bf = 86.010 * logWaistNeck - 70.041 * logHeight + 36.76;
      }
    } else {
      // US Navy formula for female: 163.205 * log10(waist + hip - neck) - 97.684 * log10(height) - 78.387
      const hipInInches = bfHip / 2.54;
      const logWaistHipNeck = Math.log10(waistInInches + hipInInches - neckInInches);
      const logHeight = Math.log10(heightInInches);
      if ((waistInInches + hipInInches) > neckInInches) {
        bf = 163.205 * logWaistHipNeck - 97.684 * logHeight - 78.387;
      }
    }
    setBfResult(Math.max(2, parseFloat(bf.toFixed(1))));
  }, [bfGender, bfHeight, bfNeck, bfWaist, bfHip]);

  // Re-calculate Ideal Weight (Devine Formula 1974)
  useEffect(() => {
    // Height in inches
    const heightInInches = iwHeight / 2.54;
    const inchesOver5Feet = Math.max(0, heightInInches - 60);
    let iw = 0;
    if (iwGender === 'male') {
      iw = 50 + 2.3 * inchesOver5Feet;
    } else {
      iw = 45.5 + 2.3 * inchesOver5Feet;
    }
    setIwResult(parseFloat(iw.toFixed(1)));
  }, [iwHeight, iwGender]);

  return (
    <div id="calculators_suite" className="max-w-4xl mx-auto my-6 p-6 bg-neutral-50 dark:bg-neutral-900 rounded-3xl border border-neutral-100 dark:border-neutral-800 shadow-xl">
      <div className="text-center mb-8">
        <span className="px-3 py-1 text-xs font-semibold rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono tracking-wide uppercase">Interactive Health Lab</span>
        <h2 id="lab_heading" className="text-2xl md:text-3xl font-black text-neutral-800 dark:text-neutral-100 mt-2 flex items-center justify-center gap-2">
          <Calculator className="w-7 h-7 text-emerald-500" /> Precision Scientific Calculators
        </h2>
        <p className="text-sm text-neutral-500 mt-1 max-w-lg mx-auto">Analyze body composition, basic metabolic needs, and determine optimal thresholds to streamline your progression.</p>
      </div>

      {/* Tabs list */}
      <div className="flex flex-wrap gap-2 justify-center border-b border-neutral-200 dark:border-neutral-800 pb-4 mb-6">
        {[
          { id: 'bmi', label: 'BMI Index' },
          { id: 'bmr_tdee', label: 'BMR & TDEE' },
          { id: 'body_fat', label: 'Body Fat %' },
          { id: 'ideal_weight', label: 'Ideal Weight' }
        ].map(tab => (
          <button
            key={tab.id}
            id={`btn_calc_tab_${tab.id}`}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 text-sm font-semibold rounded-xl transition ${
              activeTab === tab.id
                ? 'bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-950 shadow-md'
                : 'text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Panels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Left column: Controls */}
        <div className="bg-white dark:bg-neutral-950 p-6 rounded-2xl border border-neutral-100 dark:border-neutral-800 shadow-sm space-y-6">
          {activeTab === 'bmi' && (
            <>
              <h3 className="text-lg font-bold text-neutral-800 dark:text-neutral-100">Body Mass Index Inputs</h3>
              <div>
                <div className="flex justify-between text-sm mb-2 font-semibold text-neutral-600 dark:text-neutral-400">
                  <span>Height</span>
                  <span className="font-mono text-emerald-500">{bmiHeight} cm</span>
                </div>
                <input
                  id="slider_bmi_height"
                  type="range"
                  min="120"
                  max="220"
                  value={bmiHeight}
                  onChange={e => setBmiHeight(parseInt(e.target.value))}
                  className="w-full h-2 bg-neutral-100 dark:bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2 font-semibold text-neutral-600 dark:text-neutral-400">
                  <span>Weight</span>
                  <span className="font-mono text-emerald-500">{bmiWeight} kg</span>
                </div>
                <input
                  id="slider_bmi_weight"
                  type="range"
                  min="30"
                  max="150"
                  value={bmiWeight}
                  onChange={e => setBmiWeight(parseInt(e.target.value))}
                  className="w-full h-2 bg-neutral-100 dark:bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
              </div>
            </>
          )}

          {activeTab === 'bmr_tdee' && (
            <>
              <h3 className="text-lg font-bold text-neutral-800 dark:text-neutral-100">Metabolic Rates Inputs</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-500 dark:text-neutral-400 mb-1 uppercase tracking-wide">Age</label>
                  <input
                    id="input_bmr_age"
                    type="number"
                    min="15"
                    max="80"
                    value={bmrAge}
                    onChange={e => setBmrAge(parseInt(e.target.value) || 25)}
                    className="w-full px-3 py-2 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-transparent text-sm font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-neutral-500 dark:text-neutral-400 mb-1 uppercase tracking-wide">Gender</label>
                  <select
                    id="select_bmr_gender"
                    value={bmrGender}
                    onChange={e => setBmrGender(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-transparent text-sm font-semibold text-neutral-800 dark:text-neutral-100"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-500 dark:text-neutral-400 mb-1 uppercase tracking-wide">Height (cm)</label>
                  <input
                    id="input_bmr_height"
                    type="number"
                    min="120"
                    max="220"
                    value={bmrHeight}
                    onChange={e => setBmrHeight(parseInt(e.target.value) || 170)}
                    className="w-full px-3 py-2 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-transparent text-sm font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-neutral-500 dark:text-neutral-400 mb-1 uppercase tracking-wide">Weight (kg)</label>
                  <input
                    id="input_bmr_weight"
                    type="number"
                    min="35"
                    max="200"
                    value={bmrWeight}
                    onChange={e => setBmrWeight(parseInt(e.target.value) || 70)}
                    className="w-full px-3 py-2 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-transparent text-sm font-semibold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-500 dark:text-neutral-400 mb-1 uppercase tracking-wide">Activity Level</label>
                <select
                  id="select_bmr_activity"
                  value={bmrActivity}
                  onChange={e => setBmrActivity(e.target.value as any)}
                  className="w-full px-3 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-transparent text-sm font-semibold text-neutral-800 dark:text-neutral-100"
                >
                  <option value="sedentary">Sedentary (No workouts)</option>
                  <option value="light">Lightly Active (Workouts 1-3d/wk)</option>
                  <option value="moderate">Moderately Active (Workouts 3-5d/wk)</option>
                  <option value="active">Active Daily (High volume)</option>
                  <option value="very_active">Extremely Active (Athletic/Labor)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-500 dark:text-neutral-400 mb-1 uppercase tracking-wide">Primary Target</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'lose', label: 'Fat Loss' },
                    { id: 'maintain', label: 'Maintain' },
                    { id: 'gain', label: 'Weight Gain' }
                  ].map(target => (
                    <button
                      key={target.id}
                      id={`btn_goal_${target.id}`}
                      type="button"
                      onClick={() => setDietGoal(target.id as any)}
                      className={`py-2 px-1 rounded-xl text-xs font-bold border transition ${
                        dietGoal === target.id
                          ? 'border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                          : 'border-neutral-200 dark:border-neutral-800 hover:border-neutral-300'
                      }`}
                    >
                      {target.label}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {activeTab === 'body_fat' && (
            <>
              <h3 className="text-lg font-bold text-neutral-800 dark:text-neutral-100">Body Fat Measurements (Navy)</h3>
              <div className="grid grid-cols-2 gap-3">
                <button
                  id="btn_bf_gender_male"
                  type="button"
                  onClick={() => setBfGender('male')}
                  className={`py-2.5 rounded-xl border text-sm font-bold capitalize transition ${
                    bfGender === 'male'
                      ? 'border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                      : 'border-neutral-200 dark:border-neutral-800'
                  }`}
                >
                  Male
                </button>
                <button
                  id="btn_bf_gender_female"
                  type="button"
                  onClick={() => setBfGender('female')}
                  className={`py-2.5 rounded-xl border text-sm font-bold capitalize transition ${
                    bfGender === 'female'
                      ? 'border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                      : 'border-neutral-200 dark:border-neutral-800'
                  }`}
                >
                  Female
                </button>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-neutral-500 mb-1">
                  <span>Height</span>
                  <span className="font-mono text-emerald-500">{bfHeight} cm</span>
                </div>
                <input
                  id="slider_bf_height"
                  type="range"
                  min="130"
                  max="220"
                  value={bfHeight}
                  onChange={e => setBfHeight(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-neutral-100 dark:bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="flex justify-between text-xs font-bold text-neutral-500 mb-1">
                    <span>Neck circ.</span>
                    <span className="font-mono text-emerald-500">{bfNeck} cm</span>
                  </div>
                  <input
                    id="slider_bf_neck"
                    type="range"
                    min="25"
                    max="60"
                    value={bfNeck}
                    onChange={e => setBfNeck(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-neutral-100 dark:bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                  />
                </div>
                <div>
                  <div className="flex justify-between text-xs font-bold text-neutral-500 mb-1">
                    <span>Waist circ.</span>
                    <span className="font-mono text-emerald-500">{bfWaist} cm</span>
                  </div>
                  <input
                    id="slider_bf_waist"
                    type="range"
                    min="50"
                    max="140"
                    value={bfWaist}
                    onChange={e => setBfWaist(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-neutral-100 dark:bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                  />
                </div>
              </div>

              {bfGender === 'female' && (
                <div>
                  <div className="flex justify-between text-xs font-bold text-neutral-500 mb-1">
                    <span>Hip circ.</span>
                    <span className="font-mono text-emerald-500">{bfHip} cm</span>
                  </div>
                  <input
                    id="slider_bf_hip"
                    type="range"
                    min="60"
                    max="150"
                    value={bfHip}
                    onChange={e => setBfHip(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-neutral-100 dark:bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                  />
                </div>
              )}
            </>
          )}

          {activeTab === 'ideal_weight' && (
            <>
              <h3 className="text-lg font-bold text-neutral-800 dark:text-neutral-100">Ideal Weight Parameters</h3>
              <div className="grid grid-cols-2 gap-3">
                <button
                  id="btn_iw_gender_male"
                  type="button"
                  onClick={() => setIwGender('male')}
                  className={`py-2.5 rounded-xl border text-sm font-bold capitalize transition ${
                    iwGender === 'male'
                      ? 'border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                      : 'border-neutral-200 dark:border-neutral-800'
                  }`}
                >
                  Male
                </button>
                <button
                  id="btn_iw_gender_female"
                  type="button"
                  onClick={() => setIwGender('female')}
                  className={`py-2.5 rounded-xl border text-sm font-bold capitalize transition ${
                    iwGender === 'female'
                      ? 'border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                      : 'border-neutral-200 dark:border-neutral-800'
                  }`}
                >
                  Female
                </button>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2 font-semibold text-neutral-600 dark:text-neutral-400">
                  <span>Height</span>
                  <span className="font-mono text-emerald-500">{iwHeight} cm</span>
                </div>
                <input
                  id="slider_iw_height"
                  type="range"
                  min="130"
                  max="220"
                  value={iwHeight}
                  onChange={e => setIwHeight(parseInt(e.target.value))}
                  className="w-full h-2 bg-neutral-100 dark:bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
              </div>
            </>
          )}
        </div>

        {/* Right column: Results Visualization */}
        <div className="bg-gradient-to-br from-neutral-900 to-neutral-950 text-white p-8 rounded-2xl border border-neutral-800 shadow-md flex flex-col justify-between min-h-[380px]">
          {activeTab === 'bmi' && (
            <div className="space-y-6">
              <div>
                <span className="text-xs font-semibold text-emerald-400 uppercase tracking-widest font-mono">My BMI score</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <h4 id="bmi_value" className="text-5xl md:text-6xl font-black text-neutral-50 tracking-tight">{bmiResult}</h4>
                  <span className="text-neutral-400 text-sm font-bold">kg/m²</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
                <p className="text-xs text-neutral-400 uppercase tracking-wide font-mono">Classification</p>
                <p className={`text-xl font-bold ${
                  bmiCategory === 'Healthy Weight' ? 'text-emerald-400' : 'text-amber-400'
                }`}>{bmiCategory}</p>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  {bmiCategory === 'Healthy Weight'
                    ? 'Superb! Your body mass index sits perfectly inside the physiological sweet spot. Keep supporting this with nutrient density!'
                    : 'Your score suggests you may benefit from structured calories tracking to shift back into the ideal metabolic tier.'}
                </p>
              </div>

              {/* Graphical Scale */}
              <div className="space-y-1">
                <div className="h-2 rounded-full w-full bg-gradient-to-r from-blue-400 via-emerald-400 to-red-400 relative">
                  {/* Marker indicating BMI */}
                  <div
                    className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white border-2 border-neutral-950 shadow-md"
                    style={{ left: `${Math.min(100, Math.max(0, ((bmiResult - 15) / 25) * 100))}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] font-mono text-neutral-500 pt-1">
                  <span>15.0</span>
                  <span>18.5 (Healthy)</span>
                  <span>25.0</span>
                  <span>30.0+</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'bmr_tdee' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-xs font-semibold text-emerald-400 uppercase tracking-widest font-mono block">BMR (Basal)</span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <h4 id="bmr_value" className="text-3xl font-black text-neutral-50">{bmrResultVal}</h4>
                    <span className="text-neutral-400 text-xs font-bold">kcal</span>
                  </div>
                </div>
                <div>
                  <span className="text-xs font-semibold text-emerald-400 uppercase tracking-widest font-mono block">TDEE (Active)</span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <h4 id="tdee_value" className="text-3xl font-black text-neutral-50">{tdeeResult}</h4>
                    <span className="text-neutral-400 text-xs font-bold">kcal</span>
                  </div>
                </div>
              </div>

              {/* Dynamic Targets based on Target Option */}
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
                <span className="text-xs text-neutral-400 uppercase tracking-wide font-mono block">Recommended Daily Intake</span>
                <p id="calorie_target" className="text-2xl font-bold text-emerald-400">
                  {dietGoal === 'lose' ? Math.round(tdeeResult - 500) : dietGoal === 'gain' ? Math.round(tdeeResult + 400) : tdeeResult} kcal
                </p>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  {dietGoal === 'lose' && 'Calculated at a healthy 500 calorie deficit. Safely triggers weight loss while preserving active muscle fiber integrity.'}
                  {dietGoal === 'gain' && 'Calculated with a 400 calorie surplus. Delivers anabolic nutrients required for clean muscle cell hypertrophy.'}
                  {dietGoal === 'maintain' && 'Perfect balance to sustain current structural muscle tissues and physical output thresholds.'}
                </p>
              </div>

              {/* Macros Distribution preview */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono text-neutral-500 uppercase">Estimated Macros Breakdown (Balanced):</span>
                <div className="flex gap-2">
                  <div className="flex-1 text-center bg-white/5 p-2 rounded-lg border border-white/5">
                    <span className="text-[10px] text-neutral-400 block font-mono">PROTEIN</span>
                    <span className="font-bold text-sm text-emerald-400">{Math.round((tdeeResult * 0.3) / 4)}g</span>
                  </div>
                  <div className="flex-1 text-center bg-white/5 p-2 rounded-lg border border-white/5">
                    <span className="text-[10px] text-neutral-400 block font-mono">CARBS</span>
                    <span className="font-bold text-sm text-sky-400">{Math.round((tdeeResult * 0.45) / 4)}g</span>
                  </div>
                  <div className="flex-1 text-center bg-white/5 p-2 rounded-lg border border-white/5">
                    <span className="text-[10px] text-neutral-400 block font-mono">FATS</span>
                    <span className="font-bold text-sm text-amber-400">{Math.round((tdeeResult * 0.25) / 9)}g</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'body_fat' && (
            <div className="space-y-6">
              <div>
                <span className="text-xs font-semibold text-emerald-400 uppercase tracking-widest font-mono">US Navy Estimate</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <h4 id="body_fat_value" className="text-5xl md:text-6xl font-black text-neutral-50 tracking-tight">{bfResult}%</h4>
                  <span className="text-neutral-400 text-sm font-bold">Body Fat</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
                <span className="text-xs text-neutral-400 uppercase tracking-wide font-mono block">Status Category</span>
                <p className="text-lg font-bold text-emerald-400">
                  {bfGender === 'male' ? (
                    bfResult < 6 ? 'Essential Fat' : bfResult < 14 ? 'Athlete' : bfResult < 18 ? 'Fitness' : bfResult < 25 ? 'Average' : 'High Fat'
                  ) : (
                    bfResult < 14 ? 'Essential Fat' : bfResult < 21 ? 'Athlete' : bfResult < 25 ? 'Fitness' : bfResult < 32 ? 'Average' : 'High Fat'
                  )}
                </p>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  Derived using height-to-neck-circumference ratio calculations formulated by the US Navy.
                </p>
              </div>

              {/* Health icon */}
              <div className="flex items-center gap-2 text-xs text-neutral-400 font-mono">
                <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                <span>Supports cardiovascular optimization</span>
              </div>
            </div>
          )}

          {activeTab === 'ideal_weight' && (
            <div className="space-y-6">
              <div>
                <span className="text-xs font-semibold text-emerald-400 uppercase tracking-widest font-mono">Ideal Physiological Weight</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <h4 id="ideal_weight_value" className="text-5xl md:text-6xl font-black text-neutral-50 tracking-tight">{iwResult}</h4>
                  <span className="text-neutral-400 text-sm font-bold">kg</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
                <span className="text-xs text-neutral-400 uppercase tracking-wide font-mono block">Calculation Formula</span>
                <p className="text-sm font-bold text-emerald-400">Devine Formula (1974)</p>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  Used globally by clinical dietitians and medical professionals to determine baseline lean somatic weights relative to height thresholds.
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs text-neutral-400 font-mono">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>Optimal athletic performance reference</span>
              </div>
            </div>
          )}

          <div className="mt-6 pt-4 border-t border-neutral-800 flex justify-between items-center text-[10px] font-mono text-neutral-500">
            <span>FITLIFE LAB INC</span>
            <span>2026 STANDARD v1.0</span>
          </div>
        </div>
      </div>
    </div>
  );
}
