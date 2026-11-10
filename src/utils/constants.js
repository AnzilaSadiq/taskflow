export const CATEGORIES = [
  { id: 'Personal', label: 'Personal', color: 'indigo', bgLight: 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/50 dark:text-indigo-300 dark:border-indigo-800/60' },
  { id: 'Work', label: 'Work', color: 'blue', bgLight: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/50 dark:text-blue-300 dark:border-blue-800/60' },
  { id: 'Study', label: 'Study', color: 'purple', bgLight: 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/50 dark:text-purple-300 dark:border-purple-800/60' },
  { id: 'Shopping', label: 'Shopping', color: 'emerald', bgLight: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800/60' },
  { id: 'Other', label: 'Other', color: 'slate', bgLight: 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700' },
];

export const PRIORITIES = [
  { id: 'Low', label: 'Low', rank: 1, badgeClass: 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800/50' },
  { id: 'Medium', label: 'Medium', rank: 2, badgeClass: 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800/50' },
  { id: 'High', label: 'High', rank: 3, badgeClass: 'bg-rose-100 text-rose-700 border-rose-200 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800/50' },
];

export const SORT_OPTIONS = [
  { id: 'newest', label: 'Newest First' },
  { id: 'oldest', label: 'Oldest First' },
  { id: 'dueDate', label: 'Due Date' },
  { id: 'priority', label: 'Priority' },
];
