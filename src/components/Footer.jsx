import React, { useState } from 'react';
import { Check, ShieldCheck, Zap } from 'lucide-react';

export default function Footer() {
  const [year] = useState(() => new Date().getFullYear().toString());

  return (
    <footer className="mt-16 border-t border-slate-200/80 dark:border-slate-800/80 bg-white/50 dark:bg-slate-900/40 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Logo and Tagline */}
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center shadow-xs">
              <Check className="w-4 h-4 text-white stroke-[3]" />
            </div>
            <span className="font-bold text-slate-800 dark:text-slate-200 text-sm">
              TaskFlow
            </span>
            <span className="text-xs text-slate-400 dark:text-slate-500">
              — Modern Task Management
            </span>
          </div>

          {/* Quick Badges */}
          <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
            <span className="inline-flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-indigo-500" />
              Fast & Responsive
            </span>
            <span className="hidden sm:inline text-slate-300 dark:text-slate-700">•</span>
            <span className="inline-flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              Local Storage Saved
            </span>
          </div>

          {/* Copyright */}
          <div className="text-xs text-slate-400 dark:text-slate-500 text-center sm:text-right">
            <span>© {year} TaskFlow. Built with React & Tailwind CSS.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
