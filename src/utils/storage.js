const STORAGE_KEY = 'taskflow_tasks_v1';
const THEME_KEY = 'taskflow_theme';

// Format helper to YYYY-MM-DD
export const formatDateInput = (date) => {
  const d = new Date(date);
  const month = `${d.getMonth() + 1}`.padStart(2, '0');
  const day = `${d.getDate()}`.padStart(2, '0');
  const year = d.getFullYear();
  return [year, month, day].join('-');
};

// Generates relative dates for initial mock tasks
const getRelativeDate = (offsetDays) => {
  const now = new Date();
  now.setDate(now.getDate() + offsetDays);
  return formatDateInput(now);
};

export const INITIAL_TASKS = [
  {
    id: 'task-1',
    title: 'Finalize Q4 Product Roadmap & Goals',
    description: 'Review milestone deliverables with design and engineering leads, align on sprint priorities, and share the final deck with leadership.',
    category: 'Work',
    priority: 'High',
    dueDate: getRelativeDate(1),
    completed: false,
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    completedAt: null,
  },
  {
    id: 'task-2',
    title: 'Prepare System Design Architecture Notes',
    description: 'Synthesize distributed caching strategies, database sharding tradeoffs, and failover mechanisms for the upcoming tech review.',
    category: 'Study',
    priority: 'Medium',
    dueDate: getRelativeDate(3),
    completed: false,
    createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
    completedAt: null,
  },
  {
    id: 'task-3',
    title: 'Weekly Grocery & Organic Essentials',
    description: 'Restock fresh produce, Greek yogurt, almond milk, ground coffee, and olive oil for the week.',
    category: 'Shopping',
    priority: 'Low',
    dueDate: getRelativeDate(0), // Today
    completed: false,
    createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
    completedAt: null,
  },
  {
    id: 'task-4',
    title: 'Schedule Annual Dental Checkup',
    description: 'Call the dental clinic to confirm routine cleaning appointment and update insurance coverage info.',
    category: 'Personal',
    priority: 'Medium',
    dueDate: getRelativeDate(-2), // Overdue
    completed: false,
    createdAt: new Date(Date.now() - 3600000 * 72).toISOString(),
    completedAt: null,
  },
  {
    id: 'task-5',
    title: 'Refactor Tailwind CSS Design System Components',
    description: 'Ensure color contrast meets WCAG AAA standards, harmonize spacing tokens, and verify dark mode palette consistency.',
    category: 'Work',
    priority: 'High',
    dueDate: getRelativeDate(-1),
    completed: true,
    createdAt: new Date(Date.now() - 3600000 * 96).toISOString(),
    completedAt: new Date(Date.now() - 3600000 * 10).toISOString(),
  },
];

export const loadTasksFromStorage = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_TASKS));
      return INITIAL_TASKS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : INITIAL_TASKS;
  } catch (err) {
    console.error('Error loading tasks from localStorage:', err);
    return INITIAL_TASKS;
  }
};

export const saveTasksToStorage = (tasks) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (err) {
    console.error('Error saving tasks to localStorage:', err);
  }
};

export const loadThemeFromStorage = () => {
  try {
    const theme = localStorage.getItem(THEME_KEY);
    if (theme === 'dark' || theme === 'light') {
      return theme;
    }
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  } catch {
    return 'light';
  }
};

export const saveThemeToStorage = (theme) => {
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch (err) {
    console.error('Error saving theme to localStorage:', err);
  }
};

// Check if a task is overdue (dueDate is in the past, and task is not completed)
export const isTaskOverdue = (task) => {
  if (!task.dueDate || task.completed) return false;
  const todayStr = formatDateInput(new Date());
  return task.dueDate < todayStr;
};

// Check if a task is due today
export const isTaskDueToday = (task) => {
  if (!task.dueDate) return false;
  const todayStr = formatDateInput(new Date());
  return task.dueDate === todayStr;
};

// Format nice display date: "Nov 12, 2026"
export const formatDisplayDate = (dateString) => {
  if (!dateString) return 'No due date';
  try {
    const parts = dateString.split('-');
    if (parts.length === 3) {
      const year = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const day = parseInt(parts[2], 10);
      const date = new Date(year, month, day);
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    }
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return dateString;
  }
};
