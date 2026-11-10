import React from 'react';
import { Sparkles, Plus } from 'lucide-react';
import Statistics from './Statistics';
import TaskForm from './TaskForm';
import SearchFilter from './SearchFilter';
import TaskList from './TaskList';

export default function Dashboard({
  tasks,
  filteredTasks,
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  categoryFilter,
  onCategoryFilterChange,
  priorityFilter,
  onPriorityFilterChange,
  sortBy,
  onSortByChange,
  onClearCompleted,
  isFormOpen,
  onToggleForm,
  editingTask,
  onSubmitTask,
  onCancelEdit,
  onToggleComplete,
  onStartEdit,
  onStartDelete,
  onResetFilters,
}) {
  const completedCount = tasks.filter((t) => t.completed).length;
  const pendingCount = tasks.length - completedCount;

  return (
    <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* Welcome & Overview Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Dashboard Overview
            </h1>
            <span className="p-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
              <Sparkles className="w-5 h-5" />
            </span>
          </div>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            {pendingCount === 0
              ? '✨ Fantastic job! All your planned tasks are completed.'
              : `You have ${pendingCount} pending task${pendingCount === 1 ? '' : 's'} to tackle.`}
          </p>
        </div>

        {/* Quick New Task Toggle Button if form is collapsed */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onToggleForm}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-md shadow-indigo-500/20 active:scale-95 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>{isFormOpen && !editingTask ? 'Hide Form' : 'Add New Task'}</span>
          </button>
        </div>
      </div>

      {/* 4 Statistics Cards */}
      <Statistics tasks={tasks} />

      {/* Task Creation & Edit Form */}
      {(isFormOpen || editingTask) && (
        <div id="task-form-section">
          <TaskForm
            key={editingTask ? editingTask.id : 'new-task'}
            onSubmitTask={onSubmitTask}
            editingTask={editingTask}
            onCancelEdit={onCancelEdit}
            isOpen={true}
          />
        </div>
      )}

      {/* Search, Filter, Sort & Progress Bar Controls */}
      <SearchFilter
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
        statusFilter={statusFilter}
        onStatusFilterChange={onStatusFilterChange}
        categoryFilter={categoryFilter}
        onCategoryFilterChange={onCategoryFilterChange}
        priorityFilter={priorityFilter}
        onPriorityFilterChange={onPriorityFilterChange}
        sortBy={sortBy}
        onSortByChange={onSortByChange}
        onClearCompleted={onClearCompleted}
        completedCount={completedCount}
        totalCount={tasks.length}
      />

      {/* Task List Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <span>Tasks List</span>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
            {filteredTasks.length} {filteredTasks.length === 1 ? 'task' : 'tasks'}
          </span>
        </h2>
      </div>

      {/* Task Cards List */}
      <TaskList
        tasks={filteredTasks}
        totalTasksCount={tasks.length}
        onToggleComplete={onToggleComplete}
        onEdit={onStartEdit}
        onDelete={onStartDelete}
        onResetFilters={onResetFilters}
        onOpenNewTask={() => onToggleForm(true)}
      />
    </div>
  );
}
