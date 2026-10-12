import React, { useState } from 'react';
import { Sun, Moon } from 'lucide-react';

type Theme = 'light' | 'dark';

// index.html sets data-theme before first paint; this button flips it and remembers the choice
export const ThemeToggle: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [theme, setTheme] = useState<Theme>(
    () => (document.documentElement.getAttribute('data-theme') as Theme) || 'dark'
  );

  const toggle = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    try {
      localStorage.setItem('iba_theme', next);
    } catch {
      // storage unavailable: the choice just won't persist
    }
    setTheme(next);
  };

  const label = theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme';

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className={`p-2 rounded-lg border border-accent/30 bg-line/5 text-accent-ink hover:border-accent transition-colors ${className}`}
    >
      {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
    </button>
  );
};
