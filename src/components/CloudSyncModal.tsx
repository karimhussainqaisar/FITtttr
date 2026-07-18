import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cloud, Lock, Mail, X, Loader2, CheckCircle, RefreshCw, LogOut, ArrowRight, ShieldCheck } from 'lucide-react';

interface CloudSyncModalProps {
  isOpen: boolean;
  onClose: () => void;
  cloudUserEmail: string | null;
  onLoginSuccess: (email: string, serverData: any) => void;
  onLogout: () => void;
  onForceSync: () => Promise<void>;
  isSyncing: boolean;
}

export default function CloudSyncModal({
  isOpen,
  onClose,
  cloudUserEmail,
  onLoginSuccess,
  onLogout,
  onForceSync,
  isSyncing
}: CloudSyncModalProps) {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const cleanEmail = email.trim();
    if (!cleanEmail || !password) {
      setError('Please fill in all fields.');
      return;
    }

    setLoading(true);
    const endpoint = activeTab === 'login' ? '/api/auth/login' : '/api/auth/register';

    // Gather current local storage data to send to server if registering
    const currentLocalData = {
      profile: JSON.parse(localStorage.getItem('fitlife_user_profile') || 'null'),
      water_log: parseInt(localStorage.getItem('fitlife_water_log') || '0'),
      steps_log: parseInt(localStorage.getItem('fitlife_steps_log') || '3400'),
      weight_logs: JSON.parse(localStorage.getItem('fitlife_weight_logs') || '[]'),
      points: parseInt(localStorage.getItem('fitlife_points') || '120'),
      streak: parseInt(localStorage.getItem('fitlife_streak') || '4'),
      challenges: JSON.parse(localStorage.getItem('fitlife_challenges') || '[]'),
      habits: JSON.parse(localStorage.getItem('fitlife_habits_tracker') || '[]')
    };

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: cleanEmail,
          password,
          data: activeTab === 'register' ? currentLocalData : undefined
        })
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Something went wrong. Please try again.');
      }

      setSuccess(activeTab === 'login' ? 'Logged in successfully!' : 'Account registered and synchronized!');
      
      setTimeout(() => {
        onLoginSuccess(cleanEmail, result.data);
        setEmail('');
        setPassword('');
        onClose();
      }, 1200);

    } catch (err: any) {
      setError(err.message || 'Connection failure. Please verify server status.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/80 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ type: 'spring', duration: 0.4 }}
        className="relative w-full max-w-md overflow-hidden border border-neutral-100 dark:border-neutral-850 bg-white dark:bg-neutral-950 rounded-3xl shadow-2xl p-6 sm:p-8"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Logged In View */}
        {cloudUserEmail ? (
          <div className="space-y-6 text-center py-4">
            <div className="mx-auto w-14 h-14 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-500 animate-pulse">
              <Cloud className="w-7 h-7" />
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-black text-neutral-800 dark:text-neutral-100 tracking-tight">Cloud Synchronised</h3>
              <p className="text-xs text-neutral-500 font-mono select-all bg-neutral-50 dark:bg-neutral-900/50 py-1.5 px-3 rounded-xl inline-block border border-neutral-100 dark:border-neutral-850">
                {cloudUserEmail}
              </p>
            </div>

            <p className="text-xs text-neutral-400 max-w-xs mx-auto leading-relaxed">
              Every dietary index, workout split, steps tracker progress, and gamified experience score is stored safely on the cloud and syncs live.
            </p>

            <div className="pt-2 border-t border-neutral-100 dark:border-neutral-850 grid grid-cols-2 gap-3">
              <button
                id="sync_btn_manual_sync"
                disabled={isSyncing}
                onClick={onForceSync}
                className="flex items-center justify-center gap-1.5 py-3 rounded-xl border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-900 text-xs font-bold text-neutral-700 dark:text-neutral-200 transition disabled:opacity-50"
              >
                {isSyncing ? (
                  <>
                    <Loader2 className="w-4 h-4 text-emerald-500 animate-spin" />
                    <span>Syncing...</span>
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-4 h-4 text-emerald-500" />
                    <span>Sync Now</span>
                  </>
                )}
              </button>

              <button
                id="sync_btn_sign_out"
                onClick={onLogout}
                className="flex items-center justify-center gap-1.5 py-3 rounded-xl bg-red-500/5 border border-red-500/10 hover:bg-red-500/10 hover:border-red-500/20 text-xs font-bold text-red-600 dark:text-red-400 transition"
              >
                <LogOut className="w-4 h-4 text-red-500" />
                <span>Disconnect</span>
              </button>
            </div>
          </div>
        ) : (
          /* Authentication Tab View */
          <div className="space-y-6">
            <div className="flex gap-2.5 items-center">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-500 flex items-center justify-center text-white">
                <Cloud className="w-5 h-5 fill-white/10" />
              </div>
              <div>
                <h3 className="text-base font-black tracking-tight text-neutral-900 dark:text-neutral-100">Cloud Sync Station</h3>
                <p className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block leading-none mt-0.5 font-bold">Cross-Device Synchronisation</p>
              </div>
            </div>

            {/* Toggle Tabs */}
            <div className="grid grid-cols-2 gap-1 bg-neutral-100 dark:bg-neutral-900 p-1 rounded-xl border border-neutral-150 dark:border-neutral-850">
              <button
                onClick={() => {
                  setActiveTab('login');
                  setError(null);
                }}
                className={`py-2 rounded-lg text-xs font-bold transition-all ${
                  activeTab === 'login'
                    ? 'bg-white dark:bg-neutral-950 text-neutral-800 dark:text-neutral-100 shadow-sm'
                    : 'text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => {
                  setActiveTab('register');
                  setError(null);
                }}
                className={`py-2 rounded-lg text-xs font-bold transition-all ${
                  activeTab === 'register'
                    ? 'bg-white dark:bg-neutral-950 text-neutral-800 dark:text-neutral-100 shadow-sm'
                    : 'text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300'
                }`}
              >
                Create Account
              </button>
            </div>

            {/* Benefits Banner */}
            <div className="p-3 bg-neutral-50 dark:bg-neutral-900/40 border border-neutral-100 dark:border-neutral-850 rounded-2xl text-[11px] text-neutral-500 leading-relaxed space-y-1">
              <p className="font-semibold text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5 text-xs">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                {activeTab === 'login' ? 'Retrieve Cloud Session' : 'Preserves current progress!'}
              </p>
              <p>
                {activeTab === 'login' 
                  ? 'Access your biometrics, diet parameters, daily habits, and achievements on any desktop or mobile device seamlessly.'
                  : 'Your current local progress will be completely saved, imported, and converted into your cloud-synchronized vault.'}
              </p>
            </div>

            {/* Feedback messages */}
            {error && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-600 dark:text-red-400">
                {error}
              </div>
            )}
            {success && (
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 font-bold">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                <span>{success}</span>
              </div>
            )}

            {/* Authentication Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-neutral-400 font-bold uppercase tracking-wider block">Email Address</label>
                <div className="relative flex items-center">
                  <Mail className="absolute left-3.5 w-4 h-4 text-neutral-400" />
                  <input
                    id="sync_input_email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-2.5 bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 rounded-xl text-xs text-neutral-800 dark:text-neutral-100 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-neutral-400 font-bold uppercase tracking-wider block">Security Password</label>
                <div className="relative flex items-center">
                  <Lock className="absolute left-3.5 w-4 h-4 text-neutral-400" />
                  <input
                    id="sync_input_password"
                    type="password"
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                    className="w-full pl-10 pr-4 py-2.5 bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 rounded-xl text-xs text-neutral-800 dark:text-neutral-100 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <button
                id="sync_btn_submit"
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-md shadow-emerald-500/10 cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    <span>Processing Cloud Vault...</span>
                  </>
                ) : (
                  <>
                    <span>{activeTab === 'login' ? 'Synchronise Device session' : 'Setup Cloud Synchronisation'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </motion.div>
    </div>
  );
}
