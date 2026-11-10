import React from 'react';
import {
  Check,
  Calendar,
  AlertTriangle,
  Edit2,
  Trash2,
  FolderDot,
} from 'lucide-react';
import { CATEGORIES, PRIORITIES } from '../utils/constants';
import { isTaskOverdue, isTaskDueToday, formatDisplayDate } from '../utils/storage';

export default function TaskCard({
  task,
  onToggleComplete,
  onEdit,
  onDelete,
}) {
  const isOverdue = isTaskOverdue(task);
  const isDueToday = isTaskDueToday(task);

  const categoryConfig = CATEGORIES.find((c) => c.id === task.category) || {
    label: task.category || 'Other',
    bgLight: 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300',
  };

  const priorityConfig = PRIORITIES.find((p) => p.id === task.priority) || {
    label: task.priority || 'Medium',
    badgeClass: 'bg-slate-100 text-slate-700 border-slate-200',
  };

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl bg-white dark:bg-slate-900 border transition-all duration-200 p-4 sm:p-5 shadow-xs hover:shadow-md ${
        task.completed
          ? 'border-slate-200/60 dark:border-slate-800/60 bg-slate-50/50 dark:bg-slate-900/40 opacity-80'
          : isOverdue
          ? 'border-rose-300 dark:border-rose-900/80 bg-rose-50/20 dark:bg-rose-950/10'
          : 'border-slate-200/90 dark:border-slate-800 hover:border-indigo-200 dark:hover:border-indigo-800/80'
      }`}
    >
      {/* Overdue Top Accent Bar */}
      {isOverdue && !task.completed && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-500 to-amber-500" />
      )}

      <div className="flex items-start gap-3.5 sm:gap-4">
        {/* Custom Checkbox */}
        <button
          type="button"
          onClick={() => onToggleComplete(task.id)}
          aria-label={task.completed ? 'Mark task as incomplete' : 'Mark task as completed'}
          className={`mt-1 shrink-0 w-6 h-6 rounded-lg flex items-center justify-center transition-all duration-200 cursor-pointer ${
            task.completed
              ? 'bg-gradient-to-tr from-emerald-500 to-teal-500 text-white shadow-xs ring-2 ring-emerald-500/20'
              : 'border-2 border-slate-300 dark:border-slate-600 hover:border-indigo-500 dark:hover:border-indigo-400 bg-white dark:bg-slate-800'
          }`}
        >
          {task.completed && <Check className="w-4 h-4 stroke-[3]" />}
        </button>

        {/* Content Body */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3
              className={`text-base font-semibold leading-snug transition-all ${
                task.completed
                  ? 'line-through text-slate-400 dark:text-slate-500'
                  : 'text-slate-800 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400'
              }`}
            >
              {task.title}
            </h3>

            {/* Action Buttons (Edit & Delete) */}
            <div className="flex items-center gap-1 shrink-0 opacity-80 group-hover:opacity-100 transition-opacity">
              <button
                type="button"
                onClick={() => onEdit(task)}
                aria-label={`Edit ${task.title}`}
                className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                title="Edit task"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => onDelete(task)}
                aria-label={`Delete ${task.title}`}
                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                title="Delete task"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Description */}
          {task.description && (
            <p
              className={`mt-1.5 text-sm leading-relaxed whitespace-pre-wrap break-words ${
                task.completed
                  ? 'line-through text-slate-400 dark:text-slate-600'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              {task.description}
            </p>
          )}

          {/* Metadata Badges Footer */}
          <div className="mt-3.5 flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800/80">
            {/* Category Badge */}
            <span
              className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-medium border ${categoryConfig.bgLight}`}
            >
              <FolderDot className="w-3 h-3" />
              <span>{categoryConfig.label}</span>
            </span>

            {/* Priority Badge */}
            <span
              className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold border ${priorityConfig.badgeClass}`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5 opacity-80" />
              {priorityConfig.label} Priority
            </span>

            {/* Due Date Indicator */}
            {task.dueDate && (
              <span
                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium ${
                  task.completed
                    ? 'text-slate-400 dark:text-slate-500'
                    : isOverdue
                    ? 'bg-rose-100 text-rose-700 border border-rose-200 dark:bg-rose-950/70 dark:text-rose-300 dark:border-rose-800/50 font-bold'
                    : isDueToday
                    ? 'bg-amber-100 text-amber-700 border border-amber-200 dark:bg-amber-950/70 dark:text-amber-300 dark:border-amber-800/50 font-semibold'
                    : 'text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800'
                }`}
              >
                {isOverdue && !task.completed ? (
                  <AlertTriangle className="w-3 h-3 text-rose-600 dark:text-rose-400" />
                ) : (
                  <Calendar className="w-3 h-3" />
                )}
                <span>
                  {isOverdue && !task.completed
                    ? `Overdue (${formatDisplayDate(task.dueDate)})`
                    : isDueToday
                    ? 'Due Today'
                    : `Due ${formatDisplayDate(task.dueDate)}`}
                </span>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
