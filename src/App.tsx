import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Layout from './components/Layout';
import ProfileOnboarding from './components/ProfileOnboarding';
import Calculators from './components/Calculators';
import DietSection from './components/DietSection';
import WorkoutSection from './components/WorkoutSection';
import RecipeSection from './components/RecipeSection';
import BlogSection from './components/BlogSection';
import Dashboard from './components/Dashboard';
import AICoach from './components/AICoach';
import { UserProfile } from './types';
import { Sparkles, Trophy, Heart, Droplet, Bell, X } from 'lucide-react';

export default function App() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [loading, setLoading] = useState<boolean>(true);

  // Sync profile state with localStorage
  useEffect(() => {
    try {
      const savedProfile = localStorage.getItem('fitlife_user_profile');
      if (savedProfile) {
        setProfile(JSON.parse(savedProfile));
      }
    } catch (e) {
      console.error('Error restoring session:', e);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleOnboardingComplete = (newProfile: UserProfile) => {
    setProfile(newProfile);
    localStorage.setItem('fitlife_user_profile', JSON.stringify(newProfile));
    setActiveTab('dashboard');
  };

  const handleUpdateProfile = (updatedProfile: UserProfile) => {
    setProfile(updatedProfile);
    localStorage.setItem('fitlife_user_profile', JSON.stringify(updatedProfile));
  };

  const [showWaterToast, setShowWaterToast] = useState(false);

  // Periodic automated reminder system for water intake
  useEffect(() => {
    if (!profile) return;

    const intervalMinutes = profile.waterReminderInterval || 0;
    if (intervalMinutes <= 0) {
      setShowWaterToast(false);
      return;
    }

    // Set initial last reminder time if not present
    if (!localStorage.getItem('fitlife_last_water_reminder')) {
      localStorage.setItem('fitlife_last_water_reminder', Date.now().toString());
    }

    const checkReminder = () => {
      const lastReminderStr = localStorage.getItem('fitlife_last_water_reminder');
      const lastReminder = lastReminderStr ? parseInt(lastReminderStr) : Date.now();
      const intervalMs = intervalMinutes * 60 * 1000;
      const now = Date.now();

      if (now - lastReminder >= intervalMs) {
        setShowWaterToast(true);
      }
    };

    // Run initial check immediately
    checkReminder();

    // Check every 4 seconds
    const timerId = setInterval(checkReminder, 4000);

    return () => clearInterval(timerId);
  }, [profile?.waterReminderInterval, profile]);

  const handleLogWaterFromToast = () => {
    // 1. Log 250ml water
    const savedWater = localStorage.getItem('fitlife_water_log');
    const currentWater = savedWater ? parseInt(savedWater) : 0;
    const nextWater = currentWater + 250;
    localStorage.setItem('fitlife_water_log', nextWater.toString());

    // 2. Award +5 XP
    const savedPoints = localStorage.getItem('fitlife_points');
    const currentPoints = savedPoints ? parseInt(savedPoints) : 120;
    const nextPoints = currentPoints + 5;
    localStorage.setItem('fitlife_points', nextPoints.toString());

    // 3. Reset reminder time
    localStorage.setItem('fitlife_last_water_reminder', Date.now().toString());

    // 4. Dismiss toast
    setShowWaterToast(false);

    // 5. Notify Dashboard / active listeners
    window.dispatchEvent(new Event('fitlife_state_updated'));
  };

  const handleDismissToast = () => {
    // Reset reminder time to now to wait another full interval
    localStorage.setItem('fitlife_last_water_reminder', Date.now().toString());
    setShowWaterToast(false);
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset your biometric parameters? This will delete all tracked metrics, hydration logs, and achievements.')) {
      localStorage.removeItem('fitlife_user_profile');
      localStorage.removeItem('fitlife_water_log');
      localStorage.removeItem('fitlife_steps_log');
      localStorage.removeItem('fitlife_weight_logs');
      localStorage.removeItem('fitlife_points');
      localStorage.removeItem('fitlife_streak');
      localStorage.removeItem('fitlife_challenges');
      setProfile(null);
      setActiveTab('dashboard');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-950 flex flex-col items-center justify-center text-white">
        <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="font-mono text-xs text-neutral-400">Restoring biometric parameters...</p>
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      {!profile ? (
        /* Onboarding Flow Screen */
        <motion.div
          key="onboarding_viewport"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          className="min-h-screen bg-neutral-950 text-white flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
        >
          {/* Subtle abstract ambient glow backdrops */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl -z-10 animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl -z-10 animate-pulse delay-700" />

          <div className="max-w-md w-full mx-auto space-y-6 text-center">
            <div className="flex justify-center items-center gap-2">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-500 flex items-center justify-center text-white shadow-xl shadow-emerald-500/20">
                <Sparkles className="w-6 h-6 fill-white/10" />
              </div>
              <div className="text-left">
                <h2 className="text-xl font-black tracking-tight text-white leading-none">FitLife AI</h2>
                <span className="text-[9px] font-mono text-neutral-400 uppercase tracking-wider font-extrabold">Smart Diet & Exercise Planner</span>
              </div>
            </div>

            <p className="text-xs text-neutral-400 max-w-sm mx-auto leading-relaxed">
              Unlock clinical Mifflin-St Jeor calculators, customized training schedules, recipe directories, and real-time personal coaches.
            </p>
          </div>

          <div className="max-w-2xl w-full mx-auto mt-8 bg-neutral-900/60 backdrop-blur-xl p-6 sm:p-10 rounded-3xl border border-neutral-800 shadow-2xl relative">
            <ProfileOnboarding onComplete={handleOnboardingComplete} />
          </div>
        </motion.div>
      ) : (
        /* Main Dashboard Core Layout */
        <motion.div
          key="dashboard_viewport"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Layout
            profile={profile}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            onReset={handleReset}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
              >
                {activeTab === 'dashboard' && (
                  <Dashboard
                    profile={profile}
                    onUpdateProfile={handleUpdateProfile}
                    onReset={handleReset}
                  />
                )}
                {activeTab === 'calculators' && <Calculators />}
                {activeTab === 'diets' && <DietSection />}
                {activeTab === 'workouts' && <WorkoutSection />}
                {activeTab === 'recipes' && <RecipeSection />}
                {activeTab === 'coach' && <AICoach profile={profile} />}
                {activeTab === 'blog' && <BlogSection />}
              </motion.div>
            </AnimatePresence>
          </Layout>

          {/* Floating Water Toast Notification Alert */}
          <AnimatePresence>
            {showWaterToast && (
              <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
                className="fixed bottom-6 right-6 z-50 max-w-sm w-[340px] bg-neutral-900 dark:bg-neutral-950 border border-sky-500/30 dark:border-sky-500/20 text-white rounded-2xl shadow-2xl p-4 space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-xl bg-sky-500/15 border border-sky-500/20 flex items-center justify-center text-sky-400 shrink-0 animate-pulse">
                      <Droplet className="w-5 h-5 fill-sky-400/20" />
                    </div>
                    <div>
                      <h5 className="text-xs font-black tracking-wide text-neutral-100 flex items-center gap-1.5 uppercase font-mono">
                        <Bell className="w-3.5 h-3.5 text-amber-400" /> Hydration Alert
                      </h5>
                      <p className="text-[11px] text-neutral-400 leading-relaxed mt-1">
                        Discipline check! Rehydrate your system now to keep your metabolism performing at maximum efficiency.
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleDismissToast}
                    className="p-1 rounded-lg text-neutral-400 hover:text-neutral-200 hover:bg-white/5 transition"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="flex gap-2 justify-end text-xs font-bold pt-1">
                  <button
                    onClick={handleDismissToast}
                    className="px-3 py-1.5 rounded-xl border border-neutral-800 text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/40 transition text-[10px]"
                  >
                    Dismiss
                  </button>
                  <button
                    onClick={handleLogWaterFromToast}
                    className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-sky-500 to-teal-500 hover:from-sky-600 hover:to-teal-600 text-white transition flex items-center gap-1 text-[10px] shadow-md shadow-sky-500/10 cursor-pointer"
                  >
                    <Droplet className="w-3 h-3 fill-white/10" />
                    <span>Log 250ml (+5 XP)</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
