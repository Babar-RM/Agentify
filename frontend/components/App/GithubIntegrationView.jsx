'use client';
import { useState } from 'react';
import { registerUser } from '@/lib/api';

const GithubIntegrationView = ({ userEmail, onConnectionSuccess }) => {
  const [repoUrl, setRepoUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // 1. Call API (It auto-detects email now, no need to pass it)
      const result = await registerUser(repoUrl);
      
      if (result.success) {
        // 2. SUCCESS: Call the prop function to switch to Dashboard
        if (typeof onConnectionSuccess === 'function') {
            onConnectionSuccess();
        } else {
            // Backup reload if prop is missing
            window.location.reload(); 
        }
      } else {
        setError(result.error || "Connection failed");
      }
      
    } catch (err) {
      console.error(err);
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-8">
      <div className="max-w-2xl w-full bg-slate-800 p-8 rounded-2xl shadow-2xl border border-slate-700">
        <h2 className="text-4xl font-bold mb-4 text-center text-white">Connect Your Code</h2>
        <p className="mb-8 text-gray-400 text-center text-lg">
          Paste your LeetCode solutions repository URL. We will analyze it and build your profile.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <input
            type="url"
            placeholder="https://github.com/username/leetcode-solutions"
            value={repoUrl}
            onChange={(e) => setRepoUrl(e.target.value)}
            className="p-4 rounded-xl bg-slate-700 border-2 border-slate-600 text-white placeholder-gray-500 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500 outline-none w-full text-lg transition-all"
            required
            disabled={loading}
          />
          
          {error && (
            <div className="bg-red-900/50 border-2 border-red-500 text-red-300 p-4 rounded-lg text-center">
              <p className="font-semibold">{error}</p>
            </div>
          )}

          <button 
            type="submit" 
            disabled={loading || !repoUrl.trim()}
            className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 disabled:from-gray-600 disabled:to-gray-700 rounded-xl font-bold text-lg transition-all disabled:cursor-not-allowed shadow-lg text-white transform hover:scale-[1.02] active:scale-[0.98]"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-3">
                <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Analyzing...
              </span>
            ) : (
              'Connect & Start Journey'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default GithubIntegrationView;