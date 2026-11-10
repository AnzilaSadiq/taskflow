import React, { useEffect } from 'react';
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';

export default function Toast({ toast, onClose }) {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      onClose();
    }, 3200);
    return () => clearTimeout(timer);
  }, [toast, onClose]);

  if (!toast) return null;

  const typeConfig = {
    success: {
      icon: CheckCircle2,
      border: 'border-emerald-500/30',
      bg: 'bg-emerald-50 dark:bg-emerald-950/80',
      text: 'text-emerald-900 dark:text-emerald-100',
      iconColor: 'text-emerald-600 dark:text-emerald-400',
    },
    warning: {
      icon: AlertTriangle,
      border: 'border-amber-500/30',
      bg: 'bg-amber-50 dark:bg-amber-950/80',
      text: 'text-amber-900 dark:text-amber-100',
      iconColor: 'text-amber-600 dark:text-amber-400',
    },
    info: {
      icon: Info,
      border: 'border-indigo-500/30',
      bg: 'bg-indigo-50 dark:bg-indigo-950/80',
      text: 'text-indigo-900 dark:text-indigo-100',
      iconColor: 'text-indigo-600 dark:text-indigo-400',
    },
  };

  const config = typeConfig[toast.type || 'success'] || typeConfig.success;
  const Icon = config.icon;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm w-full animate-bounce-in shadow-xl rounded-xl overflow-hidden pointer-events-auto">
      <div className={`flex items-start gap-3 p-4 border ${config.border} ${config.bg} backdrop-blur-md shadow-lg rounded-xl`}>
        <Icon className={`w-5 h-5 mt-0.5 shrink-0 ${config.iconColor}`} />
        <div className="flex-1 min-w-0">
          <p className={`text-sm font-semibold ${config.text}`}>
            {toast.title || 'Notification'}
          </p>
          {toast.message && (
            <p className={`text-xs mt-0.5 opacity-90 ${config.text}`}>
              {toast.message}
            </p>
          )}
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close notification"
          className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors p-1 -mr-1 -mt-1 rounded-lg"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
