# TaskFlow — Modern To-Do & Task Management Dashboard

TaskFlow is a modern, responsive, and fully featured task management web application built with **React.js**, **Tailwind CSS**, and **Lucide React**. It provides an intuitive, high-performance interface for tracking daily goals, projects, and personal priorities with persistent browser storage and dark mode support.

---

## ✨ Features

- **Modern Dashboard UI**: Clean aesthetic with subtle gradients (indigo, purple, slate), cards with rounded corners, and smooth transitions.
- **Header & Navbar**:
  - TaskFlow branding with checkmark emblem and version indicator.
  - Live localized date display.
  - Light/Dark mode switcher with persistent preference.
  - Responsive mobile hamburger navigation.
  - "New Task" quick action button.
- **Task Creation & Editing (`TaskForm`)**:
  - Title input with required validation and error indicators.
  - Multiline description textarea for rich notes.
  - Category selector: Personal, Work, Study, Shopping, Other.
  - Priority selector: Low, Medium, High.
  - Due date picker with automatic smart default.
  - Edit mode with pre-filled inputs and cancel support.
- **Interactive Task Management (`TaskCard` & `TaskList`)**:
  - Custom checkbox for instant completion toggle with strikethrough effect.
  - Visual Overdue alert badge and top highlight bar for missed deadlines.
  - "Due Today" highlight badges.
  - Category and priority badges with distinct color palettes.
  - Edit and Delete action buttons with smooth hover reveals.
  - Confirmation modal dialog before deleting tasks.
- **Dashboard Statistics (`Statistics`)**:
  - 4 dynamic metric cards: Total Tasks, Completed Tasks, Pending Tasks, and High Priority.
  - Real-time automatic updates on all task CRUD operations.
- **Search, Filters & Sorting (`SearchFilter`)**:
  - Instant text search across titles and descriptions.
  - Status filters: All Tasks, Active Tasks, Completed Tasks.
  - Category dropdown filter.
  - Priority dropdown filter.
  - Sorting options: Newest First, Oldest First, Due Date, and Priority.
  - Clear all completed tasks action (with confirmation dialog).
  - Animated progress bar showing overall completion percentage.
- **Responsive Sidebar Navigation (`Sidebar`)**:
  - Desktop sticky sidebar and mobile drawer with backdrop overlay.
  - Quick views: All Tasks, Due Today, In Progress, High Priority, Completed.
  - Category counter breakdown.
  - Productivity progress widget.
- **Local Storage Persistence**:
  - Automatic synchronization of all tasks to browser `localStorage`.
  - Realistic starter data for first-time visitors.
  - Persistent theme preference across page reloads.
- **Toast Notifications**:
  - Non-intrusive feedback on task creation, completion, deletion, and updates.

---

## 🏗️ Project Architecture

```
taskflow/
├── public/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx        # Top navigation, brand, live date & theme toggle
│   │   ├── Sidebar.jsx       # Responsive navigation drawer & category counts
│   │   ├── Dashboard.jsx     # Main container orchestrating stats, form & list
│   │   ├── TaskForm.jsx      # Task creation & editing form with validation
│   │   ├── TaskList.jsx      # List renderer with empty state screens
│   │   ├── TaskCard.jsx      # Individual task card with badges & actions
│   │   ├── Statistics.jsx    # 4 metrics cards for dashboard overview
│   │   ├── SearchFilter.jsx  # Search bar, filter pills, sorting & progress bar
│   │   ├── Footer.jsx        # Footer with metadata and tech stack badges
│   │   ├── ConfirmModal.jsx  # Reusable modal for destructive confirmations
│   │   └── Toast.jsx         # Auto-dismissing notification toasts
│   ├── utils/
│   │   ├── constants.js      # Category configurations, priorities & sort options
│   │   └── storage.js        # LocalStorage helpers, date formatters & seed data
│   ├── App.jsx               # Application root state & handlers
│   ├── index.css             # Tailwind CSS & global styles
│   └── main.jsx              # React DOM entry point
├── index.html
├── package.json
├── tailwind.config.js / @tailwindcss/vite
└── vite.config.js
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm

### Installation & Run

1. Navigate to the project directory:
   ```bash
   cd taskflow
   ```

2. Start the local development server:
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:5173` (or the URL displayed in your terminal).

3. Build for production:
   ```bash
   npm run build
   ```

4. Run linter:
   ```bash
   npm run lint
   ```

---

## 🎨 Tech Stack
- **Framework**: React 19 (Functional components, `useState`, `useEffect`, `useMemo`)
- **Bundler**: Vite
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Persistence**: Browser `localStorage`
