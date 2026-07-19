export interface ColorTheme {
  id: string;
  name: string;
  primaryHex: string;
  secondaryHex: string;
  glowHex: string;
  lightHex: string;
  gradientFrom: string;
  gradientTo: string;
  textColor: string; // for badge or preview text
}

export const MODERN_THEMES: ColorTheme[] = [
  {
    id: 'emerald-vitality',
    name: 'Emerald Vitality',
    primaryHex: '#10b981', // emerald-500
    secondaryHex: '#14b8a6', // teal-500
    glowHex: 'rgba(16, 185, 129, 0.2)',
    lightHex: 'rgba(16, 185, 129, 0.1)',
    gradientFrom: 'from-emerald-500',
    gradientTo: 'to-teal-500',
    textColor: 'text-emerald-500'
  },
  {
    id: 'ocean-breeze',
    name: 'Ocean Breeze',
    primaryHex: '#3b82f6', // blue-500
    secondaryHex: '#06b6d4', // cyan-500
    glowHex: 'rgba(59, 130, 246, 0.2)',
    lightHex: 'rgba(59, 130, 246, 0.1)',
    gradientFrom: 'from-blue-500',
    gradientTo: 'to-cyan-500',
    textColor: 'text-blue-500'
  },
  {
    id: 'coral-sunset',
    name: 'Coral Sunset',
    primaryHex: '#f43f5e', // rose-500
    secondaryHex: '#f97316', // orange-500
    glowHex: 'rgba(244, 63, 94, 0.2)',
    lightHex: 'rgba(244, 63, 94, 0.1)',
    gradientFrom: 'from-rose-500',
    gradientTo: 'to-orange-500',
    textColor: 'text-rose-500'
  },
  {
    id: 'cyber-violet',
    name: 'Cyber Violet',
    primaryHex: '#8b5cf6', // violet-500
    secondaryHex: '#ec4899', // pink-500
    glowHex: 'rgba(139, 92, 246, 0.2)',
    lightHex: 'rgba(139, 92, 246, 0.1)',
    gradientFrom: 'from-violet-500',
    gradientTo: 'to-pink-500',
    textColor: 'text-violet-500'
  },
  {
    id: 'nordic-glacier',
    name: 'Nordic Glacier',
    primaryHex: '#0ea5e9', // sky-500
    secondaryHex: '#64748b', // slate-500
    glowHex: 'rgba(14, 165, 233, 0.2)',
    lightHex: 'rgba(14, 165, 233, 0.1)',
    gradientFrom: 'from-sky-500',
    gradientTo: 'to-slate-500',
    textColor: 'text-sky-500'
  },
  {
    id: 'autumn-amber',
    name: 'Autumn Amber',
    primaryHex: '#f59e0b', // amber-500
    secondaryHex: '#ea580c', // orange-600
    glowHex: 'rgba(245, 158, 11, 0.2)',
    lightHex: 'rgba(245, 158, 11, 0.1)',
    gradientFrom: 'from-amber-500',
    gradientTo: 'to-orange-600',
    textColor: 'text-amber-500'
  },
  {
    id: 'forest-moss',
    name: 'Forest Moss',
    primaryHex: '#16a34a', // green-600
    secondaryHex: '#0f766e', // teal-700
    glowHex: 'rgba(22, 163, 74, 0.2)',
    lightHex: 'rgba(22, 163, 74, 0.1)',
    gradientFrom: 'from-green-600',
    gradientTo: 'to-teal-700',
    textColor: 'text-green-600'
  },
  {
    id: 'crimson-steel',
    name: 'Crimson Steel',
    primaryHex: '#ef4444', // red-500
    secondaryHex: '#475569', // slate-600
    glowHex: 'rgba(239, 68, 68, 0.2)',
    lightHex: 'rgba(239, 68, 68, 0.1)',
    gradientFrom: 'from-red-500',
    gradientTo: 'to-slate-600',
    textColor: 'text-red-500'
  },
  {
    id: 'royal-orchid',
    name: 'Royal Orchid',
    primaryHex: '#a855f7', // purple-500
    secondaryHex: '#6366f1', // indigo-500
    glowHex: 'rgba(168, 85, 247, 0.2)',
    lightHex: 'rgba(168, 85, 247, 0.1)',
    gradientFrom: 'from-purple-500',
    gradientTo: 'to-indigo-500',
    textColor: 'text-purple-500'
  },
  {
    id: 'midnight-obsidian',
    name: 'Midnight Obsidian',
    primaryHex: '#334155', // slate-700
    secondaryHex: '#1e293b', // slate-800
    glowHex: 'rgba(51, 65, 85, 0.2)',
    lightHex: 'rgba(51, 65, 85, 0.1)',
    gradientFrom: 'from-slate-700',
    gradientTo: 'to-neutral-800',
    textColor: 'text-slate-400'
  }
];

export function applyThemeVariables(themeId: string) {
  const theme = MODERN_THEMES.find(t => t.id === themeId) || MODERN_THEMES[0];
  const root = window.document.documentElement;
  
  root.style.setProperty('--brand-primary', theme.primaryHex);
  root.style.setProperty('--brand-secondary', theme.secondaryHex);
  root.style.setProperty('--brand-glow', theme.glowHex);
  root.style.setProperty('--brand-light', theme.lightHex);
  
  localStorage.setItem('fitlife_color_theme_id', theme.id);
}
