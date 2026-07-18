import React, { useState, useEffect } from 'react';
import { Sparkles, Moon, Sun, Flame, Scale, LogOut, Menu, X, ShieldCheck } from 'lucide-react';
import { UserProfile } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  profile: UserProfile | null;
  activeTab: string;
  onTabChange: (tab: string) => void;
  onReset: () => void;
}

export default function Layout({ children, profile, activeTab, onTabChange, onReset }: LayoutProps) {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('fitlife_theme');
    return (saved === 'light' || saved === 'dark') ? saved : 'dark';
  });
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('fitlife_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const navItems = [
    { id: 'dashboard', label: 'My Dashboard' },
    { id: 'calculators', label: 'Metabolic Lab' },
    { id: 'diets', label: 'Diet Planner' },
    { id: 'workouts', label: 'Workout Splits' },
    { id: 'recipes', label: 'Fitness Kitchen' },
    { id: 'coach', label: 'AI Coach' },
    { id: 'blog', label: 'Science Journal' }
  ];

  return (
    <div id="fitlife_app_layout" className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-800 dark:text-neutral-100 font-sans transition-colors duration-300 flex flex-col justify-between">
      
      {/* Sticky Header */}
      <header className="sticky top-0 z-40 w-full border-b border-neutral-150 dark:border-neutral-850 bg-white/70 dark:bg-neutral-950/70 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo brand */}
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/10">
              <Flame className="w-5 h-5 fill-white/15" />
            </div>
            <div>
              <h1 id="app_brand_name" className="text-base sm:text-lg font-black tracking-tight text-neutral-900 dark:text-neutral-100">
                FitLife <span className="text-emerald-500 font-extrabold font-mono">AI</span>
              </h1>
              <span className="text-[9px] font-mono text-neutral-400 block -mt-1 leading-none uppercase tracking-widest font-black">Smart Diet & Trainer</span>
            </div>
          </div>

          {/* Desktop Nav Items */}
          {profile && (
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map(item => (
                <button
                  key={item.id}
                  id={`nav_tab_desktop_${item.id}`}
                  onClick={() => onTabChange(item.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    activeTab === item.id
                      ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 shadow-sm'
                      : 'text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          )}

          {/* Utility selectors */}
          <div className="flex items-center gap-3">
            {profile && (
              <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl text-[10px] font-mono text-neutral-500">
                <Scale className="w-3.5 h-3.5 text-emerald-500" />
                <span>{profile.weight} kg → {profile.targetWeight} kg</span>
              </div>
            )}

            {/* Theme switcher */}
            <button
              id="btn_theme_toggle"
              onClick={toggleTheme}
              className="p-2 rounded-xl border border-neutral-200 dark:border-neutral-800 text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-150 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition"
              title="Toggle Theme"
            >
              {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4 text-amber-400" />}
            </button>

            {/* Mobile menu trigger */}
            {profile && (
              <button
                id="btn_mobile_menu_toggle"
                onClick={() => setMenuOpen(!menuOpen)}
                className="lg:hidden p-2 rounded-xl border border-neutral-200 dark:border-neutral-800 text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-150 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition"
              >
                {menuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Nav Overlay Drawer */}
      {profile && menuOpen && (
        <div id="mobile_nav_drawer" className="lg:hidden fixed inset-0 z-30 bg-neutral-950/80 backdrop-blur-sm pt-16">
          <div className="bg-white dark:bg-neutral-900 p-6 border-b border-neutral-100 dark:border-neutral-850 space-y-4">
            <div className="flex flex-col gap-2">
              {navItems.map(item => (
                <button
                  key={item.id}
                  id={`nav_tab_mobile_${item.id}`}
                  onClick={() => {
                    onTabChange(item.id);
                    setMenuOpen(false);
                  }}
                  className={`w-full text-left p-3 rounded-xl font-bold text-sm transition ${
                    activeTab === item.id
                      ? 'bg-emerald-500 text-white shadow-md'
                      : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 flex justify-between items-center text-xs">
              <span className="text-neutral-400 font-mono">Calorie Limit: {profile.calorieGoal} kcal</span>
              <button
                id="btn_reset_mobile"
                onClick={() => {
                  setMenuOpen(false);
                  onReset();
                }}
                className="text-red-500 font-bold flex items-center gap-1 hover:underline"
              >
                <LogOut className="w-4 h-4" /> Log Out
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full relative">
        {children}
      </main>

      {/* Footer caveat warnings */}
      <footer className="border-t border-neutral-200 dark:border-neutral-850 bg-white dark:bg-neutral-950 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 text-center">
          <div className="flex items-center justify-center gap-2 text-xs font-mono font-bold text-neutral-400 dark:text-neutral-500">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>CLINICAL HEALTH DISCLAIMER & RESPONSIBILITY</span>
          </div>
          <p className="text-[10px] leading-relaxed text-neutral-400 dark:text-neutral-500 max-w-2xl mx-auto">
            The evaluations, calorie estimates (Mifflin-St Jeor formulas), meals schedules, and training routines computed on FitLife AI represent generalized reference guidelines. They do not constitute custom medical therapies, clinical diagnostics, or personalized healthcare regimens. Consult with a registered cardiologist, sports medicine physician, or certified dietitian before launching extreme physiological workloads or metabolic deficit strategies.
          </p>
          <div className="border-t border-neutral-100 dark:border-neutral-900 pt-4 flex justify-between items-center flex-wrap gap-4 text-[10px] font-mono text-neutral-400 dark:text-neutral-500">
            <span>© 2026 FITLIFE AI SYSTEM INC. ALL RIGHTS RESERVED.</span>
            <div className="flex gap-4">
              <a href="#" className="hover:underline">PRIVACY POLICY</a>
              <a href="#" className="hover:underline">TERMS OF COMPLIANCE</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
