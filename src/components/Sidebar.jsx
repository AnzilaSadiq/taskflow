import React from 'react';
import {
  LayoutDashboard,
  Clock,
  Flame,
  Calendar,
  FolderDot,
  CheckCheck,
  X,
  Sparkles,
} from 'lucide-react';
import { CATEGORIES } from '../utils/constants';

export default function Sidebar({
  isOpen,
  onClose,
  activeFilter,
  onSelectFilter,
  selectedCategory,
  onSelectCategory,
  taskCounts,
  completionRate,
}) {
  const navItems = [
    {
      id: 'all',
      label: 'All Tasks',
      icon: LayoutDashboard,
      count: taskCounts.total,
      color: 'text-indigo-600 dark:text-indigo-400',
    },
    {
      id: 'today',
      label: 'Due Today',
      icon: Calendar,
      count: taskCounts.today,
      color: 'text-blue-600 dark:text-blue-400',
    },
    {
      id: 'pending',
      label: 'In Progress',
      icon: Clock,
      count: taskCounts.pending,
      color: 'text-amber-600 dark:text-amber-400',
    },
    {
      id: 'high',
      label: 'High Priority',
      icon: Flame,
      count: taskCounts.high,
      color: 'text-rose-600 dark:text-rose-400',
    },
    {
      id: 'completed',
      label: 'Completed',
      icon: CheckCheck,
      count: taskCounts.completed,
      color: 'text-emerald-600 dark:text-emerald-400',
    },
  ];

  const handleNavClick = (id) => {
    onSelectFilter(id);
    onSelectCategory('all');
    if (window.innerWidth < 768) {
      onClose();
    }
  };

  const handleCategoryClick = (catId) => {
    onSelectCategory(catId);
    if (window.innerWidth < 768) {
      onClose();
    }
  };

  const sidebarContent = (
    <div className="flex flex-col h-full overflow-y-auto p-4 sm:p-5 select-none">
      {/* Mobile Close Header */}
      <div className="flex md:hidden items-center justify-between pb-4 mb-2 border-b border-slate-200 dark:border-slate-800">
        <span className="font-bold text-slate-800 dark:text-white text-base">Navigation</span>
        <button
          type="button"
          onClick={onClose}
          className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Views */}
      <div className="space-y-1">
        <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">
          Views
        </p>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeFilter === item.id && selectedCategory === 'all';
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleNavClick(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/60 dark:to-purple-950/40 text-indigo-700 dark:text-indigo-300 font-semibold shadow-xs border border-indigo-200/60 dark:border-indigo-800/40'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-600 dark:text-indigo-400' : item.color}`} />
                <span>{item.label}</span>
              </div>
              <span
                className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                  isActive
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                }`}
              >
                {item.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Categories Section */}
      <div className="mt-8 space-y-1">
        <div className="flex items-center justify-between px-3 mb-2">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
            Categories
          </p>
          {selectedCategory !== 'all' && (
            <button
              type="button"
              onClick={() => onSelectCategory('all')}
              className="text-[11px] font-medium text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>

        {CATEGORIES.map((cat) => {
          const isCatActive = selectedCategory === cat.id;
          const count = taskCounts.byCategory[cat.id] || 0;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => handleCategoryClick(cat.id)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm transition-all duration-150 cursor-pointer ${
                isCatActive
                  ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-semibold border border-indigo-200/60 dark:border-indigo-800/40'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <FolderDot className={`w-3.5 h-3.5 ${isCatActive ? 'text-indigo-600' : 'text-slate-400'}`} />
                <span>{cat.label}</span>
              </div>
              <span className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Productivity Card at Bottom */}
      <div className="mt-auto pt-6">
        <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-transparent border border-indigo-200/50 dark:border-indigo-900/40 relative overflow-hidden">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-1.5 rounded-lg bg-indigo-600 text-white shadow-xs">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
              Productivity
            </span>
          </div>
          <div className="flex items-baseline justify-between text-xs mb-1.5">
            <span className="text-slate-500 dark:text-slate-400">Completion</span>
            <span className="font-extrabold text-indigo-600 dark:text-indigo-400">{completionRate}%</span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-indigo-500 to-purple-600 h-full rounded-full transition-all duration-500"
              style={{ width: `${completionRate}%` }}
            />
          </div>
          <p className="mt-2.5 text-[11px] text-slate-500 dark:text-slate-400">
            {completionRate === 100
              ? '🎉 All caught up! Amazing work.'
              : `${taskCounts.completed} of ${taskCounts.total} tasks finished.`}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden md:block w-64 shrink-0 bg-white dark:bg-slate-900 border-r border-slate-200/80 dark:border-slate-800/80 transition-colors duration-200">
        <div className="sticky top-16 h-[calc(100vh-4rem)]">
          {sidebarContent}
        </div>
      </aside>

      {/* Mobile Drawer (Slide-over with overlay) */}
      {isOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-950/50 backdrop-blur-xs transition-opacity duration-200"
            onClick={onClose}
            aria-hidden="true"
          />
          {/* Drawer Panel */}
          <aside className="relative w-72 max-w-[85vw] h-full bg-white dark:bg-slate-900 shadow-2xl z-50 flex flex-col transform transition-transform duration-200">
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
}
