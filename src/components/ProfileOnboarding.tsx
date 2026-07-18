import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { UserProfile } from '../types';
import { User, Activity, Flame, ShieldAlert, Check, ArrowRight, ArrowLeft } from 'lucide-react';

interface OnboardingProps {
  onComplete: (profile: UserProfile) => void;
}

export default function ProfileOnboarding({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Partial<UserProfile>>({
    age: 26,
    gender: 'male',
    height: 175,
    weight: 75,
    targetWeight: 70,
    activityLevel: 'moderate',
    fitnessExperience: 'beginner',
    dietStyle: 'balanced',
    allergies: [],
    medicalRestrictions: [],
    waterGoal: 2500,
  });

  const nextStep = () => setStep(prev => Math.min(prev + 1, 5));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  const handleSelectDiet = (style: UserProfile['dietStyle']) => {
    setFormData(prev => ({ ...prev, dietStyle: style }));
  };

  const handleSelectGender = (gender: UserProfile['gender']) => {
    setFormData(prev => ({ ...prev, gender }));
  };

  const handleSelectActivity = (level: UserProfile['activityLevel']) => {
    setFormData(prev => ({ ...prev, activityLevel: level }));
  };

  const handleSelectExperience = (exp: UserProfile['fitnessExperience']) => {
    setFormData(prev => ({ ...prev, fitnessExperience: exp }));
  };

  const calculateTargetMacrosAndCalories = () => {
    const { age, gender, height, weight, targetWeight, activityLevel, dietStyle } = formData;
    if (!age || !height || !weight || !targetWeight) return;

    // Mifflin-St Jeor Equation
    let bmr = 0;
    if (gender === 'male') {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    // Activity multiplier
    const multipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      very_active: 1.9,
    };

    const multiplier = multipliers[activityLevel || 'moderate'];
    const tdee = Math.round(bmr * multiplier);

    // Set calorie goal depending on weight loss or gain
    let calorieGoal = tdee;
    if (targetWeight < weight) {
      calorieGoal = Math.round(tdee - 500); // 500 kcal deficit
    } else if (targetWeight > weight) {
      calorieGoal = Math.round(tdee + 400); // 400 kcal surplus
    }

    // Safeguard minimum calories
    if (gender === 'male' && calorieGoal < 1500) calorieGoal = 1500;
    if (gender !== 'male' && calorieGoal < 1200) calorieGoal = 1200;

    // Macromolecules ratios depending on diet style
    let pRatio = 0.30; // 30% protein
    let cRatio = 0.45; // 45% carbs
    let fRatio = 0.25; // 25% fats

    if (dietStyle === 'keto') {
      pRatio = 0.25;
      cRatio = 0.05;
      fRatio = 0.70;
    } else if (dietStyle === 'high_protein') {
      pRatio = 0.40;
      cRatio = 0.35;
      fRatio = 0.25;
    } else if (dietStyle === 'low_carb') {
      pRatio = 0.35;
      cRatio = 0.20;
      fRatio = 0.45;
    }

    const proteinGoal = Math.round((calorieGoal * pRatio) / 4);
    const carbsGoal = Math.round((calorieGoal * cRatio) / 4);
    const fatGoal = Math.round((calorieGoal * fRatio) / 9);
    const waterGoal = Math.round(weight * 35); // 35ml per kg of bodyweight

    const finalizedProfile: UserProfile = {
      ...(formData as UserProfile),
      calorieGoal,
      proteinGoal,
      carbsGoal,
      fatGoal,
      waterGoal,
    };

    onComplete(finalizedProfile);
  };

  const dietOptions: { id: UserProfile['dietStyle']; label: string; desc: string }[] = [
    { id: 'balanced', label: 'Balanced Diet', desc: 'Symmetric macros. Standard guidelines.' },
    { id: 'vegetarian', label: 'Vegetarian', desc: 'No meat or fish. Plant-focused options.' },
    { id: 'vegan', label: 'Vegan', desc: 'Strictly plant-based. Zero animal products.' },
    { id: 'keto', label: 'Keto / Low-Carb High-Fat', desc: 'Extremely low carbs, relies heavily on fats for fuel.' },
    { id: 'mediterranean', label: 'Mediterranean', desc: 'High monounsaturated fats and ocean fish products.' },
    { id: 'high_protein', label: 'High Protein', desc: '40% protein. Excellent for hypertrophy and tissue retention.' },
    { id: 'south_asian', label: 'Pakistani / Indian', desc: 'Halal friendly traditional South Asian cuisines.' }
  ];

  const stepVariants = {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, x: -40, transition: { duration: 0.2 } },
  };

  return (
    <div id="onboarding_container" className="max-w-xl mx-auto my-12 p-8 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 shadow-xl relative overflow-hidden">
      {/* Progress bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-neutral-100 dark:bg-neutral-800">
        <motion.div
          className="h-full bg-emerald-500"
          initial={{ width: '20%' }}
          animate={{ width: `${(step / 5) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <div className="flex justify-between items-center mb-8">
        <h2 id="onboarding_title" className="text-xl font-bold text-neutral-800 dark:text-neutral-100 flex items-center gap-2">
          <Flame className="w-5 h-5 text-emerald-500" /> Onboarding Setup ({step}/5)
        </h2>
        <span className="text-sm font-mono text-neutral-400">Step {step} of 5</span>
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            variants={stepVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-6"
          >
            <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200">First, tell us about yourself</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-600 dark:text-neutral-400 mb-2">Age (years)</label>
                <input
                  id="input_age"
                  type="number"
                  min="10"
                  max="120"
                  value={formData.age}
                  onChange={e => setFormData(p => ({ ...p, age: parseInt(e.target.value) || 25 }))}
                  className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-transparent text-neutral-800 dark:text-neutral-100 focus:outline-none focus:border-emerald-500 font-medium"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-600 dark:text-neutral-400 mb-2">Gender Identification</label>
                <div className="grid grid-cols-3 gap-3">
                  {(['male', 'female', 'other'] as const).map(g => (
                    <button
                      key={g}
                      id={`btn_gender_${g}`}
                      type="button"
                      onClick={() => handleSelectGender(g)}
                      className={`py-3 rounded-xl border font-semibold capitalize transition ${
                        formData.gender === g
                          ? 'border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                          : 'border-neutral-200 dark:border-neutral-700 text-neutral-500 hover:border-neutral-300 dark:hover:border-neutral-600'
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            variants={stepVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-6"
          >
            <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200">What are your physical stats?</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-600 dark:text-neutral-400 mb-2">Height (cm)</label>
                <input
                  id="input_height"
                  type="number"
                  min="100"
                  max="250"
                  value={formData.height}
                  onChange={e => setFormData(p => ({ ...p, height: parseInt(e.target.value) || 170 }))}
                  className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-transparent text-neutral-800 dark:text-neutral-100 focus:outline-none focus:border-emerald-500 font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-600 dark:text-neutral-400 mb-2">Current Weight (kg)</label>
                  <input
                    id="input_weight"
                    type="number"
                    min="30"
                    max="300"
                    value={formData.weight}
                    onChange={e => setFormData(p => ({ ...p, weight: parseInt(e.target.value) || 70 }))}
                    className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-transparent text-neutral-800 dark:text-neutral-100 focus:outline-none focus:border-emerald-500 font-medium"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-600 dark:text-neutral-400 mb-2">Target Weight (kg)</label>
                  <input
                    id="input_target_weight"
                    type="number"
                    min="30"
                    max="300"
                    value={formData.targetWeight}
                    onChange={e => setFormData(p => ({ ...p, targetWeight: parseInt(e.target.value) || 70 }))}
                    className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-transparent text-neutral-800 dark:text-neutral-100 focus:outline-none focus:border-emerald-500 font-medium"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            variants={stepVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-6"
          >
            <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200">How active is your lifestyle?</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-600 dark:text-neutral-400 mb-2">Daily Activity Level</label>
                <div className="space-y-2">
                  {([
                    { id: 'sedentary', label: 'Sedentary', desc: 'Little to no exercise, desk bound job' },
                    { id: 'light', label: 'Lightly Active', desc: 'Light exercise / sports 1-3 days/week' },
                    { id: 'moderate', label: 'Moderately Active', desc: 'Moderate exercise 3-5 days/week' },
                    { id: 'active', label: 'Active', desc: 'Heavy training or sports 6-7 days/week' },
                    { id: 'very_active', label: 'Extremely Active', desc: 'Very heavy training, daily double workouts or physical labor' }
                  ] as const).map(act => (
                    <button
                      key={act.id}
                      id={`btn_activity_${act.id}`}
                      type="button"
                      onClick={() => handleSelectActivity(act.id)}
                      className={`w-full p-3 rounded-xl border text-left flex justify-between items-center transition ${
                        formData.activityLevel === act.id
                          ? 'border-emerald-500 bg-emerald-500/5 dark:bg-emerald-500/10'
                          : 'border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600'
                      }`}
                    >
                      <div>
                        <p className="font-semibold text-sm text-neutral-800 dark:text-neutral-200">{act.label}</p>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400">{act.desc}</p>
                      </div>
                      {formData.activityLevel === act.id && <Check className="w-5 h-5 text-emerald-500 shrink-0" />}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-600 dark:text-neutral-400 mb-2">Fitness Training Experience</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['beginner', 'intermediate', 'advanced'] as const).map(exp => (
                    <button
                      key={exp}
                      id={`btn_exp_${exp}`}
                      type="button"
                      onClick={() => handleSelectExperience(exp)}
                      className={`py-3 rounded-xl border font-semibold capitalize transition ${
                        formData.fitnessExperience === exp
                          ? 'border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                          : 'border-neutral-200 dark:border-neutral-700 text-neutral-500 hover:border-neutral-300 dark:hover:border-neutral-600'
                      }`}
                    >
                      {exp}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div
            key="step4"
            variants={stepVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-6"
          >
            <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200">Dietary Preferences & Allergies</h3>
            <div className="max-h-72 overflow-y-auto space-y-2 pr-1">
              {dietOptions.map(opt => (
                <button
                  key={opt.id}
                  id={`btn_diet_${opt.id}`}
                  type="button"
                  onClick={() => handleSelectDiet(opt.id)}
                  className={`w-full p-3 rounded-xl border text-left flex justify-between items-center transition ${
                    formData.dietStyle === opt.id
                      ? 'border-emerald-500 bg-emerald-500/5 dark:bg-emerald-500/10'
                      : 'border-neutral-200 dark:border-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600'
                  }`}
                >
                  <div>
                    <p className="font-semibold text-sm text-neutral-800 dark:text-neutral-200">{opt.label}</p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400">{opt.desc}</p>
                  </div>
                  {formData.dietStyle === opt.id && <Check className="w-5 h-5 text-emerald-500 shrink-0" />}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {step === 5 && (
          <motion.div
            key="step5"
            variants={stepVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-6"
          >
            <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200">Awesome! Ready to lock it in?</h3>
            <div className="bg-neutral-50 dark:bg-neutral-800/50 p-4 rounded-xl border border-neutral-100 dark:border-neutral-800 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-neutral-500">Gender / Age:</span>
                <span className="font-semibold capitalize text-neutral-800 dark:text-neutral-100">{formData.gender}, {formData.age} yrs</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-neutral-500">Height / Weight:</span>
                <span className="font-semibold text-neutral-800 dark:text-neutral-100">{formData.height} cm / {formData.weight} kg</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-neutral-500">Target Weight:</span>
                <span className="font-semibold text-neutral-800 dark:text-neutral-100">{formData.targetWeight} kg</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-neutral-500">Dietary Style:</span>
                <span className="font-semibold capitalize text-neutral-800 dark:text-emerald-400">{formData.dietStyle?.replace('_', ' ')}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-neutral-500">Activity Multiplier:</span>
                <span className="font-semibold capitalize text-neutral-800 dark:text-neutral-100">{formData.activityLevel}</span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-xl bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20 text-xs leading-relaxed">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>We use the Mifflin-St Jeor equation to estimate metabolic rates. Check with a healthcare professional before making major dietary adjustments.</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex justify-between items-center mt-8 pt-4 border-t border-neutral-100 dark:border-neutral-800">
        <button
          id="btn_prev_step"
          onClick={prevStep}
          disabled={step === 1}
          className={`flex items-center gap-1 font-semibold text-sm py-2 px-4 rounded-xl border transition ${
            step === 1
              ? 'opacity-30 cursor-not-allowed border-neutral-200 text-neutral-400'
              : 'border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800'
          }`}
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        {step < 5 ? (
          <button
            id="btn_next_step"
            onClick={nextStep}
            className="flex items-center gap-1 font-semibold text-sm py-2.5 px-5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white shadow-md shadow-emerald-500/20 transition"
          >
            Continue <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            id="btn_complete_onboarding"
            onClick={calculateTargetMacrosAndCalories}
            className="flex items-center gap-1 font-bold text-sm py-3 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/30 transition"
          >
            Generate My Plan <Check className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
