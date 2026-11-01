'use client';
import { useState } from 'react';
import { registerUser } from '@/lib/api';

export default function RegisterForm() {
  const [email, setEmail] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setSuccess(false);

    try {
      const result = await registerUser(email, githubUrl);
      
      if (result.success) {
        setMessage('✅ Registration successful! Check your email for welcome message.');
        setSuccess(true);
        
        // Store email in localStorage
        if (typeof window !== 'undefined') {
          localStorage.setItem('userEmail', email);
        }
        
        // Clear form
        setEmail('');
        setGithubUrl('');
        
        // Reload page after 2 seconds to show courses
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        setMessage(`❌ ${result.error || 'Registration failed'}`);
      }
    } catch (error) {
      console.error('Registration error:', error);
      setMessage(`❌ Error: ${error.response?.data?.detail || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-white rounded-2xl shadow-xl">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Join Agentify
        </h2>
        <p className="text-gray-600">
          Start receiving personalized coding challenges
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            placeholder="your.email@example.com"
            required
            disabled={loading}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            GitHub Repository URL
          </label>
          <input
            type="url"
            value={githubUrl}
            onChange={(e) => setGithubUrl(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            placeholder="https://github.com/username/repo"
            required
            disabled={loading}
          />
          <p className="text-xs text-gray-500 mt-1">
            We will analyze your code to personalize your challenges
          </p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-bold text-lg hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Analyzing GitHub...
            </span>
          ) : (
            '🚀 Start My Journey'
          )}
        </button>
      </form>

      {message && (
        <div className={`mt-5 p-4 rounded-lg ${
          success 
            ? 'bg-green-50 border-2 border-green-200 text-green-800' 
            : 'bg-red-50 border-2 border-red-200 text-red-800'
        }`}>
          <p className="font-medium">{message}</p>
        </div>
      )}

      <div className="mt-6 text-center text-sm text-gray-500">
        <p>By registering, you will receive daily coding challenges via email</p>
      </div>
    </div>
  );
}