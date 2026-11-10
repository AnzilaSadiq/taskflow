import React, { useState } from 'react';
import {
  Plus,
  Edit3,
  Tag,
  AlertCircle,
  X,
  CheckCircle,
} from 'lucide-react';
import { CATEGORIES, PRIORITIES } from '../utils/constants';
import { formatDateInput } from '../utils/storage';

export default function TaskForm({
  onSubmitTask,
  editingTask,
  onCancelEdit,
  isOpen = true,
}) {
  const [title, setTitle] = useState(editingTask?.title || '');
  const [description, setDescription] = useState(editingTask?.description || '');
  const [category, setCategory] = useState(editingTask?.category || 'Personal');
  const [priority, setPriority] = useState(editingTask?.priority || 'Medium');
  const [dueDate, setDueDate] = useState(() => {
    if (editingTask?.dueDate) return editingTask.dueDate;
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return formatDateInput(tomorrow);
  });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanTitle = title.trim();

    if (!cleanTitle) {
      setError('Please provide a task title to continue.');
      return;
    }

    setError('');
    onSubmitTask({
      title: cleanTitle,
      description: description.trim(),
      category,
      priority,
      dueDate,
    });

    if (!editingTask) {
      setTitle('');
      setDescription('');
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      setDueDate(formatDateInput(tomorrow));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-5 sm:p-6 shadow-sm hover:shadow-md transition-all duration-200 mb-8">
      {/* Form Header */}
      <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400">
            {editingTask ? <Edit3 className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              {editingTask ? 'Edit Task' : 'Add New Task'}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {editingTask
                ? 'Update task properties and click save changes.'
                : 'Organize your day with a clear goal and due date.'}
            </p>
          </div>
        </div>

        {editingTask && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
            <span>Cancel</span>
          </button>
        )}
      </div>

      {/* Validation Error banner */}
      {error && (
        <div className="mb-4 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900/50 flex items-center gap-2.5 text-xs text-rose-700 dark:text-rose-300 animate-in fade-in">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Form Inputs */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title Input */}
        <div>
          <label
            htmlFor="task-title"
            className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wide"
          >
            Task Title <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <input
              id="task-title"
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (error) setError('');
              }}
              placeholder="e.g., Deliver client presentation deck..."
              className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
            />
          </div>
        </div>

        {/* Description Input */}
        <div>
          <label
            htmlFor="task-desc"
            className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wide"
          >
            Description <span className="text-slate-400 text-[11px] font-normal">(Optional)</span>
          </label>
          <div className="relative">
            <textarea
              id="task-desc"
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add key notes, links, or specific checklist details..."
              className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all resize-y min-h-[72px]"
            />
          </div>
        </div>

        {/* 3 Columns: Category, Priority, Due Date */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
          {/* Category Dropdown */}
          <div>
            <label
              htmlFor="task-category"
              className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wide"
            >
              Category
            </label>
            <div className="relative">
              <select
                id="task-category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full appearance-none px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-slate-100 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 cursor-pointer pr-9"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.id} className="dark:bg-slate-800">
                    {cat.label}
                  </option>
                ))}
              </select>
              <Tag className="w-4 h-4 text-slate-400 absolute right-3 top-3 pointer-events-none" />
            </div>
          </div>

          {/* Priority Dropdown */}
          <div>
            <label
              htmlFor="task-priority"
              className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wide"
            >
              Priority
            </label>
            <div className="relative">
              <select
                id="task-priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full appearance-none px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-slate-100 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 cursor-pointer pr-9"
              >
                {PRIORITIES.map((p) => (
                  <option key={p.id} value={p.id} className="dark:bg-slate-800">
                    {p.label}
                  </option>
                ))}
              </select>
              <div className="absolute right-3 top-3.5 w-2.5 h-2.5 rounded-full pointer-events-none border border-slate-300 dark:border-slate-600 bg-current text-indigo-500" />
            </div>
          </div>

          {/* Due Date Picker */}
          <div>
            <label
              htmlFor="task-duedate"
              className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wide"
            >
              Due Date
            </label>
            <div className="relative">
              <input
                id="task-duedate"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-slate-100 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-3">
          {editingTask && (
            <button
              type="button"
              onClick={onCancelEdit}
              className="px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              Cancel
            </button>
          )}

          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-md shadow-indigo-500/25 active:scale-95 transition-all cursor-pointer"
          >
            {editingTask ? (
              <>
                <CheckCircle className="w-4 h-4" />
                <span>Save Changes</span>
              </>
            ) : (
              <>
                <Plus className="w-4 h-4 stroke-[2.5]" />
                <span>Add Task</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
