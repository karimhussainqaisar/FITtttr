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
import { Sparkles, Trophy, Heart } from 'lucide-react';

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
        </motion.div>
      )}
    </AnimatePresence>
  );
}
