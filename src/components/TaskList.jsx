import React from 'react';
import {
  Inbox,
  SearchX,
  Plus,
  RotateCcw,
} from 'lucide-react';
import TaskCard from './TaskCard';

export default function TaskList({
  tasks = [],
  totalTasksCount = 0,
  onToggleComplete,
  onEdit,
  onDelete,
  onResetFilters,
  onOpenNewTask,
}) {
  // If no tasks exist at all in the database
  if (totalTasksCount === 0) {
    return (
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-8 sm:p-12 text-center shadow-xs">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-50 to-purple-50 dark:from-indigo-950/70 dark:to-purple-950/50 text-indigo-600 dark:text-indigo-400 mx-auto flex items-center justify-center mb-4 ring-1 ring-indigo-500/20">
          <Inbox className="w-8 h-8 stroke-[1.7]" />
        </div>
        <h3 className="text-lg font-bold text-slate-800 dark:text-white">
          No tasks found
        </h3>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
          Your workspace is clear and ready. Create your first task to start organizing your projects and daily goals!
        </p>
        <div className="mt-6">
          <button
            type="button"
            onClick={onOpenNewTask}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-md shadow-indigo-500/20 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Create First Task</span>
          </button>
        </div>
      </div>
    );
  }

  // If tasks exist, but current search or filters filtered everything out
  if (tasks.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-8 sm:p-12 text-center shadow-xs">
        <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400 mx-auto flex items-center justify-center mb-4">
          <SearchX className="w-8 h-8 stroke-[1.7]" />
        </div>
        <h3 className="text-lg font-bold text-slate-800 dark:text-white">
          No matching tasks
        </h3>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
          We couldn't find any tasks matching your current search or filter criteria.
        </p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={onResetFilters}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset Filters</span>
          </button>
        </div>
      </div>
    );
  }

  // Render list of task cards
  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onToggleComplete={onToggleComplete}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
