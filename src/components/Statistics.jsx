import React from 'react';
import {
  ListTodo,
  CheckCircle2,
  Clock,
  Flame,
  TrendingUp,
} from 'lucide-react';

export default function Statistics({ tasks = [] }) {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const pending = total - completed;
  const highPriority = tasks.filter((t) => t.priority === 'High' && !t.completed).length;
  const completionPercentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  const cards = [
    {
      title: 'Total Tasks',
      value: total,
      subtext: total === 1 ? '1 active item logged' : `${total} items tracked`,
      icon: ListTodo,
      iconBg: 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/80 dark:text-indigo-400',
      borderAccent: 'hover:border-indigo-300 dark:hover:border-indigo-700',
      gradient: 'from-indigo-500/10 to-transparent',
    },
    {
      title: 'Completed Tasks',
      value: completed,
      subtext: `${completionPercentage}% completion rate`,
      icon: CheckCircle2,
      iconBg: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/80 dark:text-emerald-400',
      borderAccent: 'hover:border-emerald-300 dark:hover:border-emerald-700',
      gradient: 'from-emerald-500/10 to-transparent',
    },
    {
      title: 'Pending Tasks',
      value: pending,
      subtext: pending === 0 ? 'All tasks complete!' : `${pending} tasks remaining`,
      icon: Clock,
      iconBg: 'bg-amber-50 text-amber-600 dark:bg-amber-950/80 dark:text-amber-400',
      borderAccent: 'hover:border-amber-300 dark:hover:border-amber-700',
      gradient: 'from-amber-500/10 to-transparent',
    },
    {
      title: 'High Priority',
      value: highPriority,
      subtext: highPriority > 0 ? 'Requires urgent focus' : 'No critical blockers',
      icon: Flame,
      iconBg: 'bg-rose-50 text-rose-600 dark:bg-rose-950/80 dark:text-rose-400',
      borderAccent: 'hover:border-rose-300 dark:hover:border-rose-700',
      gradient: 'from-rose-500/10 to-transparent',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-8">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div
            key={idx}
            className={`relative overflow-hidden rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 p-5 shadow-xs hover:shadow-md transition-all duration-200 ${card.borderAccent}`}
          >
            {/* Subtle corner gradient */}
            <div
              className={`absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-gradient-to-br ${card.gradient} blur-xl pointer-events-none`}
            />

            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  {card.title}
                </p>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                    {card.value}
                  </span>
                </div>
              </div>
              <div className={`p-3 rounded-2xl ${card.iconBg} ring-1 ring-black/5 dark:ring-white/5`}>
                <Icon className="w-6 h-6 stroke-[2.2]" />
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span className="truncate">{card.subtext}</span>
              <TrendingUp className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            </div>
          </div>
        );
      })}
    </div>
  );
}
