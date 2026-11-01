'use client';
import { useState, useEffect } from 'react';
import { getStats, getUserSubscriptions, getUser } from '@/lib/api';

export default function DashboardView({ user }) {
  const [stats, setStats] = useState(null);
  const [subscriptions, setSubscriptions] = useState([]);
  const [dbUser, setDbUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    // Safety: Force loading to stop after 4 seconds even if API is slow
    const safetyTimer = setTimeout(() => {
      if (isMounted && loading) setLoading(false);
    }, 4000);

    const loadDashboardData = async () => {
      if (!user?.email) return;

      try {
        const [statsData, subsData, userData] = await Promise.all([
          getStats(user.email).catch(() => null),
          getUserSubscriptions(user.email).catch(() => []),
          getUser(user.email).catch(() => null)
        ]);

        if (isMounted) {
          setStats(statsData?.stats || null);
          setSubscriptions(Array.isArray(subsData) ? subsData : (subsData?.subscriptions || []));
          setDbUser(userData);
        }
      } catch (error) {
        console.error("Critical error loading dashboard:", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadDashboardData();

    return () => { 
      isMounted = false; 
      clearTimeout(safetyTimer);
    };
  }, [user]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
        <p className="text-gray-400 animate-pulse">Loading dashboard...</p>
      </div>
    );
  }

  const displayName = dbUser?.github_username || user?.email?.split('@')[0] || 'User';

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-bold mb-2">Welcome back, {displayName}! 👋</h1>
            <p className="text-gray-400">You are all set! Check your email for daily challenges.</p>
          </div>
          <div className="text-right">
             <span className="inline-block px-4 py-2 rounded-full bg-green-500/20 text-green-400 text-sm font-semibold border border-green-500/30">● Active Status</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-800/50 border border-gray-700 p-6 rounded-2xl">
            <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-2">Active Courses</h3>
            <div className="text-4xl font-bold text-white">{subscriptions.length}</div>
          </div>
          <div className="bg-gray-800/50 border border-gray-700 p-6 rounded-2xl">
            <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-2">Problems Delivered</h3>
            <div className="text-4xl font-bold text-blue-400">{stats?.total_problems_sent || 0}</div>
          </div>
          <div className="bg-gray-800/50 border border-gray-700 p-6 rounded-2xl">
            <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-2">Current Level</h3>
            <div className="text-4xl font-bold text-purple-400 capitalize">{dbUser?.skill_level || 'Beginner'}</div>
          </div>
        </div>
      </div>
    </div>
  );
}