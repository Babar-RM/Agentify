import axios from 'axios';
import { auth } from '@/lib/firebase'; 

// Use 127.0.0.1 to avoid localhost DNS issues
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  // Ensure cookies/auth headers are sent if needed
  withCredentials: true 
});

// Helper: Get email exactly as is (No forcing lowercase)
export const getAuthenticatedUserEmail = () => {
  try {
    const user = auth.currentUser;
    if (user && user.email) return user.email; // Return exact email
    if (typeof window !== 'undefined') {
        return localStorage.getItem('userEmail');
    }
    return null;
  } catch (error) {
    return null;
  }
};

// --- REGISTRATION ---
export const registerUser = async (githubUrl) => {
  try {
    const email = getAuthenticatedUserEmail();
    
    if (!email) throw new Error("User email not found. Please log in.");
    if (!githubUrl) throw new Error("GitHub URL is required.");

    // Set flag to force dashboard view immediately after this succeeds
    if (typeof window !== 'undefined') {
        localStorage.setItem('just_onboarded', 'true');
    }

    console.log(`Connecting ${email} to ${githubUrl}`);

    const response = await api.post('/api/analyze', {
      email: email, 
      github_url: githubUrl
    });

    return { success: true, data: response.data };

  } catch (error) {
    console.error("API Error:", error);
    if (error.code === "ERR_NETWORK") {
        return { success: false, error: "Backend server unreachable. Is Python running?" };
    }
    return { 
        success: false, 
        error: error.response?.data?.detail || error.message 
    };
  }
};

// --- CHECK USER STATUS (CRITICAL FIX) ---
export const getUser = async (email = null) => {
  try {
    const userEmail = email || getAuthenticatedUserEmail();
    if (!userEmail) return null;
    
    // Pass email exactly as is. Do not toLowerCase() it.
    // The backend will handle the lookup.
    const response = await api.get(`/api/user/${userEmail}`);
    return response.data;
  } catch (error) {
    // 404 is expected for new users
    if (error.response && error.response.status === 404) {
        return null;
    }
    console.error("Get user error:", error);
    return null; 
  }
};

// --- COURSES & STATS FUNCTIONS ---
export const getAllCourses = async () => {
  try { return (await api.get('/api/courses')).data; } catch (e) { return { courses: [] }; }
};
export const subscribeToCourse = async (slug) => {
  const email = getAuthenticatedUserEmail();
  return (await api.post('/api/subscribe', { email, company_slug: slug })).data;
};
export const getUserSubscriptions = async () => {
  try {
    const email = getAuthenticatedUserEmail();
    return (await api.get(`/api/my-courses/${email}`)).data;
  } catch (e) { return { subscriptions: [] }; }
};
export const getStats = async () => {
  try {
    const email = getAuthenticatedUserEmail();
    const res = await api.get(`/api/stats/${email}`);
    return { stats: { total_problems_sent: res.data.total_recommendations || 0, ...res.data } };
  } catch (e) { return null; }
};
export const unsubscribeFromCourse = async () => { throw new Error("Coming soon"); };

export default api;