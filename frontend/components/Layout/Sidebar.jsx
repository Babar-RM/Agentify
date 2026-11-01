'use client';
import React from 'react';
import { useAppContext } from '../../app/context/AppContext';
import { NAVIGATION_ITEMS, AGENTIFY_LOGO } from '../../lib/constants';

const Sidebar = () => {
  const { currentView, setCurrentView } = useAppContext();

  return (
    <nav className="hidden md:flex flex-col w-64 h-screen p-4 sidebar-glass">
      <div className="mb-10 px-2 pt-2">
        {AGENTIFY_LOGO}
      </div>
      <ul className="flex flex-col space-y-2">
        {NAVIGATION_ITEMS.map((item) => (
          <li key={item.id}>
            <button
              onClick={() => setCurrentView(item.id)}
              className={`flex items-center w-full text-left p-3 rounded-lg transition-all duration-200 ${
                currentView === item.id
                  ? 'active-link-glow text-white font-semibold'
                  : 'text-slate-400 hover:bg-slate-700/50 hover:text-white'
              }`}
            >
              <span className={`mr-4 ${currentView === item.id ? 'text-neon-cyan' : ''}`}>{item.icon}</span>
              {item.label}
            </button>
          </li>
        ))}
      </ul>
      <div className="mt-auto p-4 text-center text-xs text-slate-500">
        Agentify &copy; 2025
      </div>
    </nav>
  );
};

export default Sidebar;
