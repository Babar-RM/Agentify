'use client';

import React, { createContext, useState, useContext, useEffect } from 'react';
import { Page } from '../../lib/types.js';
import { auth } from '../../lib/firebase.js';
import { onAuthStateChanged, signOut } from 'firebase/auth';

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [appState, setAppState] = useState('splash');
  const [currentView, setCurrentView] = useState(Page.Dashboard);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
      
      if (user) {
        // User is signed in
        if (appState === 'splash' || appState === 'auth') {
          setAppState('main');
        }
      } else {
        // User is signed out
        setAppState('auth');
      }
    });

    return () => unsubscribe();
  }, [appState]);

  const logout = async () => {
    try {
      await signOut(auth);
      setAppState('auth');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const value = {
    appState,
    setAppState,
    currentView,
    setCurrentView,
    user,
    logout,
    loading
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};