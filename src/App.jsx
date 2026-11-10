import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';
import ConfirmModal from './components/ConfirmModal';
import Toast from './components/Toast';
import {
  loadTasksFromStorage,
  saveTasksToStorage,
  loadThemeFromStorage,
  saveThemeToStorage,
  isTaskDueToday,
} from './utils/storage';
import { PRIORITIES } from './utils/constants';

export default function App() {
  // Theme state
  const [theme, setTheme] = useState(loadThemeFromStorage);

  // Apply dark mode class to <html>
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    saveThemeToStorage(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Tasks state
  const [tasks, setTasks] = useState(loadTasksFromStorage);

  // Sync tasks to localStorage whenever modified
  useEffect(() => {
    saveTasksToStorage(tasks);
  }, [tasks]);

  // Sidebar mobile drawer state
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Form visibility & editing state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // all, active, completed, today, high, pending
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest'); // newest, oldest, dueDate, priority

  // Confirmation modal state
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    title: '',
    message: '',
    confirmText: 'Delete',
    action: null,
  });

  // Toast notification state
  const [toast, setToast] = useState(null);

  const showToast = (title, message = '', type = 'success') => {
    setToast({ title, message, type });
  };

  // Task Statistics for Sidebar & Dashboard
  const taskCounts = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.completed).length;
    const pending = total - completed;
    const high = tasks.filter((t) => t.priority === 'High' && !t.completed).length;
    const today = tasks.filter((t) => isTaskDueToday(t) && !t.completed).length;

    const byCategory = tasks.reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + 1;
      return acc;
    }, {});

    return { total, completed, pending, high, today, byCategory };
  }, [tasks]);

  const completionRate = useMemo(() => {
    if (taskCounts.total === 0) return 0;
    return Math.round((taskCounts.completed / taskCounts.total) * 100);
  }, [taskCounts]);

  // Priority mapping for sorting
  const priorityRankMap = useMemo(() => {
    return PRIORITIES.reduce((acc, p) => {
      acc[p.id] = p.rank;
      return acc;
    }, {});
  }, []);

  // Filtered & Sorted Tasks
  const filteredTasks = useMemo(() => {
    return tasks
      .filter((task) => {
        // Search Filter (Title & Description)
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = task.title.toLowerCase().includes(q);
          const matchDesc = (task.description || '').toLowerCase().includes(q);
          if (!matchTitle && !matchDesc) return false;
        }

        // Status Filter
        if (statusFilter === 'active' || statusFilter === 'pending') {
          if (task.completed) return false;
        } else if (statusFilter === 'completed') {
          if (!task.completed) return false;
        } else if (statusFilter === 'today') {
          if (task.completed || !isTaskDueToday(task)) return false;
        } else if (statusFilter === 'high') {
          if (task.completed || task.priority !== 'High') return false;
        }

        // Category Filter
        if (categoryFilter !== 'all' && task.category !== categoryFilter) {
          return false;
        }

        // Priority Filter
        if (priorityFilter !== 'all' && task.priority !== priorityFilter) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'newest') {
          return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
        }
        if (sortBy === 'oldest') {
          return new Date(a.createdAt || 0) - new Date(b.createdAt || 0);
        }
        if (sortBy === 'dueDate') {
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return a.dueDate.localeCompare(b.dueDate);
        }
        if (sortBy === 'priority') {
          const rankA = priorityRankMap[a.priority] || 0;
          const rankB = priorityRankMap[b.priority] || 0;
          return rankB - rankA;
        }
        return 0;
      });
  }, [tasks, searchQuery, statusFilter, categoryFilter, priorityFilter, sortBy, priorityRankMap]);

  // Handlers
  const handleToggleComplete = (taskId) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          const nextCompleted = !t.completed;
          showToast(
            nextCompleted ? 'Task Completed!' : 'Task Reopened',
            t.title,
            nextCompleted ? 'success' : 'info'
          );
          return {
            ...t,
            completed: nextCompleted,
            completedAt: nextCompleted ? new Date().toISOString() : null,
          };
        }
        return t;
      })
    );
  };

  const handleCreateOrUpdateTask = (formData) => {
    if (editingTask) {
      // Update existing task
      setTasks((prev) =>
        prev.map((t) =>
          t.id === editingTask.id
            ? {
                ...t,
                ...formData,
                updatedAt: new Date().toISOString(),
              }
            : t
        )
      );
      setEditingTask(null);
      showToast('Task Updated', `"${formData.title}" has been updated.`);
    } else {
      // Add new task
      const newTask = {
        id: `task-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
        ...formData,
        completed: false,
        createdAt: new Date().toISOString(),
        completedAt: null,
      };
      setTasks((prev) => [newTask, ...prev]);
      showToast('Task Added!', `"${formData.title}" was added to your list.`);
    }
  };

  const handleStartEdit = (task) => {
    setEditingTask(task);
    setIsFormOpen(true);
    // Smooth scroll to form
    const formElem = document.getElementById('task-form-section');
    if (formElem) {
      formElem.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
  };

  const handleStartDelete = (task) => {
    setConfirmModal({
      isOpen: true,
      title: 'Delete Task',
      message: `Are you sure you want to delete "${task.title}"? This action cannot be undone.`,
      confirmText: 'Delete Task',
      action: () => {
        setTasks((prev) => prev.filter((t) => t.id !== task.id));
        if (editingTask?.id === task.id) {
          setEditingTask(null);
        }
        showToast('Task Deleted', `"${task.title}" was deleted.`, 'warning');
      },
    });
  };

  const handleClearCompleted = () => {
    const count = taskCounts.completed;
    if (count === 0) return;

    setConfirmModal({
      isOpen: true,
      title: 'Clear Completed Tasks',
      message: `Are you sure you want to permanently remove all ${count} completed task${count === 1 ? '' : 's'}?`,
      confirmText: `Clear ${count} Task${count === 1 ? '' : 's'}`,
      action: () => {
        setTasks((prev) => prev.filter((t) => !t.completed));
        showToast('Cleaned Up!', `${count} completed task${count === 1 ? '' : 's'} cleared.`, 'info');
      },
    });
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setStatusFilter('all');
    setCategoryFilter('all');
    setPriorityFilter('all');
    setSortBy('newest');
  };

  const handleOpenNewTask = () => {
    setEditingTask(null);
    setIsFormOpen(true);
    const formElem = document.getElementById('task-form-section');
    if (formElem) {
      formElem.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/80 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-200">
      {/* Top Navbar */}
      <Navbar
        theme={theme}
        onToggleTheme={toggleTheme}
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
        onOpenNewTask={handleOpenNewTask}
      />

      {/* Main Layout (Sidebar + Dashboard) */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          activeFilter={statusFilter}
          onSelectFilter={(filterId) => {
            setStatusFilter(filterId);
            setIsSidebarOpen(false);
          }}
          selectedCategory={categoryFilter}
          onSelectCategory={(catId) => {
            setCategoryFilter(catId);
            setIsSidebarOpen(false);
          }}
          taskCounts={taskCounts}
          completionRate={completionRate}
        />

        {/* Dashboard Main Content */}
        <main className="flex-1 min-w-0">
          <Dashboard
            tasks={tasks}
            filteredTasks={filteredTasks}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            statusFilter={statusFilter}
            onStatusFilterChange={setStatusFilter}
            categoryFilter={categoryFilter}
            onCategoryFilterChange={setCategoryFilter}
            priorityFilter={priorityFilter}
            onPriorityFilterChange={setPriorityFilter}
            sortBy={sortBy}
            onSortByChange={setSortBy}
            onClearCompleted={handleClearCompleted}
            isFormOpen={isFormOpen}
            onToggleForm={() => setIsFormOpen((prev) => !prev)}
            editingTask={editingTask}
            onSubmitTask={handleCreateOrUpdateTask}
            onCancelEdit={handleCancelEdit}
            onToggleComplete={handleToggleComplete}
            onStartEdit={handleStartEdit}
            onStartDelete={handleStartDelete}
            onResetFilters={handleResetFilters}
          />
        </main>
      </div>

      {/* Footer */}
      <Footer />

      {/* Confirmation Modal */}
      <ConfirmModal
        isOpen={confirmModal.isOpen}
        title={confirmModal.title}
        message={confirmModal.message}
        confirmText={confirmModal.confirmText}
        onConfirm={() => {
          if (confirmModal.action) confirmModal.action();
          setConfirmModal((prev) => ({ ...prev, isOpen: false }));
        }}
        onCancel={() => setConfirmModal((prev) => ({ ...prev, isOpen: false }))}
      />

      {/* Toast Notification */}
      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}
