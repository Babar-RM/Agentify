'use client';
import { useState, useEffect } from 'react';
import { 
  getAllCourses, 
  subscribeToCourse, 
  unsubscribeFromCourse, 
  getUserSubscriptions,
  getAuthenticatedUserEmail 
} from '@/lib/api';

export default function CourseList() {
  const [courses, setCourses] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState('');
  const [actionLoading, setActionLoading] = useState({});

  useEffect(() => {
    // Get authenticated user email
    const email = getAuthenticatedUserEmail();
    if (email) {
      setUserEmail(email);
      loadData();
    } else {
      setLoading(false);
    }
  }, []);

  const loadData = async () => {
    try {
      const [coursesData, subsData] = await Promise.all([
        getAllCourses(),
        getUserSubscriptions() // No need to pass email, it gets from auth
      ]);

      setCourses(coursesData.courses || []);
      setSubscriptions(subsData.subscriptions || []);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubscribe = async (courseId) => {
    setActionLoading(prev => ({ ...prev, [courseId]: true }));
    try {
      // No need to pass email, it gets from auth automatically
      await subscribeToCourse(courseId);
      alert(`✅ Successfully subscribed! You'll start receiving course emails tomorrow at 9 AM.`);
      loadData();
    } catch (error) {
      alert(`❌ Error: ${error.response?.data?.detail || error.message}`);
    } finally {
      setActionLoading(prev => ({ ...prev, [courseId]: false }));
    }
  };

  const handleUnsubscribe = async (courseId) => {
    if (!confirm('Are you sure you want to unsubscribe? You\'ll resume receiving behavior-based emails.')) return;
    
    setActionLoading(prev => ({ ...prev, [courseId]: true }));
    try {
      // No need to pass email, it gets from auth automatically
      await unsubscribeFromCourse(courseId);
      alert('✅ Unsubscribed successfully! You\'ll resume receiving personalized behavior emails at 8 AM.');
      loadData();
    } catch (error) {
      alert(`❌ Error: ${error.response?.data?.detail || error.message}`);
    } finally {
      setActionLoading(prev => ({ ...prev, [courseId]: false }));
    }
  };

  const isSubscribed = (courseId) => {
    return subscriptions.some(sub => sub.course_id === courseId);
  };

  if (!userEmail) {
    return (
      <div className="text-center p-12 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl">
        <div className="text-6xl mb-4">🔒</div>
        <h3 className="text-2xl font-bold text-gray-800 mb-2">
          Login Required
        </h3>
        <p className="text-gray-600">
          Please login to view and enroll in company courses
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="text-center p-12">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-blue-600"></div>
        <p className="mt-4 text-gray-600">Loading courses...</p>
      </div>
    );
  }

  const companyColors = {
    'Google': { bg: 'from-blue-500 to-blue-600', badge: 'bg-blue-100 text-blue-800' },
    'Amazon': { bg: 'from-orange-500 to-orange-600', badge: 'bg-orange-100 text-orange-800' },
    'Meta': { bg: 'from-blue-600 to-blue-700', badge: 'bg-blue-100 text-blue-800' },
    'Microsoft': { bg: 'from-green-600 to-green-700', badge: 'bg-green-100 text-green-800' }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold text-gray-800 mb-3">
          🎯 Company Interview Courses
        </h2>
        <p className="text-gray-600 text-lg">
          30-day structured programs from top tech companies
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Logged in as: <span className="font-semibold text-blue-600">{userEmail}</span>
        </p>
      </div>

      {subscriptions.length > 0 && (
        <div className="mb-8 p-6 bg-green-50 border-2 border-green-200 rounded-xl">
          <p className="text-green-800 font-semibold text-center">
            ✅ You are enrolled in {subscriptions.length} course{subscriptions.length !== 1 ? 's' : ''}! 
            Check <span className="font-bold">{userEmail}</span> daily at 9 AM for problems.
          </p>
        </div>
      )}

      {subscriptions.length === 0 && (
        <div className="mb-8 p-6 bg-blue-50 border-2 border-blue-200 rounded-xl">
          <p className="text-blue-800 font-semibold text-center">
            📧 Currently receiving personalized problems at <span className="font-bold">{userEmail}</span> (8 AM daily)
            <br />
            <span className="text-sm">Subscribe to any course to switch to company-specific problems</span>
          </p>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {courses.map((course) => {
          const colors = companyColors[course.company_name] || { bg: 'from-gray-500 to-gray-600', badge: 'bg-gray-100 text-gray-800' };
          const subscribed = isSubscribed(course.id);
          const loading = actionLoading[course.id];

          return (
            <div key={course.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all transform hover:scale-[1.02]">
              <div className={`bg-gradient-to-r ${colors.bg} p-6 text-white`}>
                <h3 className="font-bold text-2xl mb-1">{course.company_name}</h3>
                <p className="text-sm opacity-90">Interview Prep</p>
              </div>
              
              <div className="p-6">
                <h4 className="font-bold text-lg mb-3 text-gray-800">
                  {course.course_name}
                </h4>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {course.description}
                </p>
                
                <div className="flex items-center justify-between mb-5">
                  <span className={`${colors.badge} px-3 py-1 rounded-full text-xs font-bold uppercase`}>
                    {course.difficulty}
                  </span>
                  <span className="text-gray-600 text-sm font-semibold">
                    📅 {course.duration_days} days
                  </span>
                </div>

                {subscribed ? (
                  <div className="space-y-2">
                    <button
                      disabled
                      className="w-full bg-green-500 text-white py-3 rounded-lg font-bold cursor-default shadow-md"
                    >
                      ✓ Enrolled
                    </button>
                    <button
                      onClick={() => handleUnsubscribe(course.id)}
                      disabled={loading}
                      className="w-full bg-red-100 text-red-600 py-2 rounded-lg font-semibold hover:bg-red-200 disabled:opacity-50 transition-colors text-sm"
                    >
                      {loading ? 'Processing...' : 'Unsubscribe'}
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => handleSubscribe(course.slug)}
                    disabled={loading}
                    className={`w-full bg-gradient-to-r ${colors.bg} text-white py-3 rounded-lg font-bold hover:opacity-90 disabled:opacity-50 transition-all shadow-md hover:shadow-lg`}
                  >
                    {loading ? 'Processing...' : 'Enroll Now →'}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-10 p-6 bg-blue-50 border-2 border-blue-200 rounded-xl">
        <div className="flex items-start gap-4">
          <div className="text-3xl">💡</div>
          <div>
            <h3 className="font-bold text-blue-900 mb-2">How It Works</h3>
            <ul className="text-blue-800 text-sm space-y-1">
              <li>• <strong>No subscription:</strong> Receive personalized problems at <span className="font-semibold">{userEmail}</span> (8 AM daily)</li>
              <li>• <strong>With subscription:</strong> Receive company-specific problems at <span className="font-semibold">{userEmail}</span> (9 AM daily)</li>
              <li>• <strong>Unsubscribe anytime:</strong> Resume personalized problems automatically</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}