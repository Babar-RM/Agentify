'use client';
import { useState, useEffect } from 'react';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { getUser } from '@/lib/api';
import DashboardView from './DashboardView';
import GithubIntegrationView from './GithubIntegrationView';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [appState, setAppState] = useState('loading'); // 'loading' | 'onboarding' | 'dashboard'

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        
        // OPTIMIZATION: Check local storage first to prevent UI flicker
        // If we previously confirmed this user has a repo, go straight to dashboard
        const isKnownUser = typeof window !== 'undefined' && localStorage.getItem(`has_repo_${firebaseUser.email}`);
        const justOnboarded = typeof window !== 'undefined' && localStorage.getItem('just_onboarded');

        if (isKnownUser || justOnboarded) {
            setAppState('dashboard');
            // We can return early or let the DB check happen silently in background
            // to update fresh data, but UI stays on Dashboard.
        }

        try {
          // Check backend
          const dbUser = await getUser(firebaseUser.email);
          
          if (dbUser && dbUser.github_repo_url) {
            // Success: Mark this user locally as "known" for next time
            if (typeof window !== 'undefined') {
                localStorage.setItem(`has_repo_${firebaseUser.email}`, 'true');
            }
            setAppState('dashboard');
          } else {
            // Only if DB explicitly says "No repo" AND we aren't flagged as just onboarded
            if (!justOnboarded) {
                setAppState('onboarding');
            }
          }
        } catch (error) {
          console.error("Backend check failed", error);
          // If we knew the user before, stay on dashboard. Else onboarding.
          if (!isKnownUser && !justOnboarded) {
              setAppState('onboarding');
          }
        }
      } else {
        setUser(null);
        setAppState('loading'); 
      }
    });

    return () => unsubscribe();
  }, []);

  if (appState === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  // State 1: Connect Form (Only for genuinely new users)
  if (appState === 'onboarding') {
    if (!user) return <div className="min-h-screen bg-gray-900"/>;
    
    return (
      <GithubIntegrationView 
        userEmail={user.email} 
        onConnectionSuccess={() => {
            // Set flags so we never see this again
            if (typeof window !== 'undefined') {
                localStorage.setItem('just_onboarded', 'true');
                localStorage.setItem(`has_repo_${user.email}`, 'true');
            }
            setAppState('dashboard');
        }} 
      />
    );
  }

  // State 2: Dashboard
  return <DashboardView user={user} />;
}