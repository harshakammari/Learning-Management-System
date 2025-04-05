import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../lib/firebase';
import { collection, query, where, getDocs, doc, getDoc, DocumentData } from 'firebase/firestore';
import { Link } from 'react-router-dom'; // For linking to course pages later
import { Loader2, AlertTriangle } from 'lucide-react'; // Icons for loading/error

// Interface for course data (adjust as needed)
interface Course extends DocumentData {
  id: string;
  title: string;
  description: string;
  // Add other relevant fields like instructorName, thumbnail, etc.
}

const StudentDashboard = () => {
  const { user } = useAuth();
  const [enrolledCourses, setEnrolledCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      if (!user) return; // Should not happen due to ProtectedRoute, but good practice

      setLoading(true);
      setError(null);
      setEnrolledCourses([]);

      try {
        // 1. Find enrollment documents for the current student
        const enrollmentsRef = collection(db, 'enrollments');
        const q = query(enrollmentsRef, where("studentId", "==", user.uid));
        const enrollmentSnap = await getDocs(q);

        if (enrollmentSnap.empty) {
          console.log('No enrollments found for user:', user.uid);
          setLoading(false);
          return; // No courses enrolled
        }

        const courseIds = enrollmentSnap.docs.map(doc => doc.data().courseId);
        console.log('Enrolled course IDs:', courseIds);

        // 2. Fetch details for each enrolled course
        const coursePromises = courseIds.map(courseId => getDoc(doc(db, 'courses', courseId)));
        const courseSnaps = await Promise.all(coursePromises);

        const coursesData = courseSnaps
          .filter(docSnap => docSnap.exists()) // Filter out courses that might not exist
          .map(docSnap => ({
            id: docSnap.id,
            ...docSnap.data()
          } as Course));

        setEnrolledCourses(coursesData);
        console.log('Fetched courses data:', coursesData);

      } catch (err: any) {
        console.error("Error fetching enrolled courses:", err);
        setError("Failed to load your courses. Please try refreshing the page.");
      } finally {
        setLoading(false);
      }
    };

    fetchEnrolledCourses();
  }, [user]); // Re-run if user changes

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        Student Dashboard
      </h1>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Welcome, {user?.displayName || user?.email}
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Here are the courses you are currently enrolled in.
        </p>
      </div>

      {/* Enrolled Courses Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
          My Courses
        </h2>

        {loading && (
          <div className="flex justify-center items-center py-10">
            <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
            <p className="ml-3 text-gray-600 dark:text-gray-300">Loading your courses...</p>
          </div>
        )}

        {error && (
          <div className="flex items-center p-4 bg-red-100 dark:bg-red-900 border border-red-300 dark:border-red-700 rounded-md">
            <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-300 mr-3" />
            <p className="text-red-700 dark:text-red-200">{error}</p>
          </div>
        )}

        {!loading && !error && enrolledCourses.length === 0 && (
          <div className="text-center py-10">
            <p className="text-gray-500 dark:text-gray-400">You are not enrolled in any courses yet.</p>
            {/* Optional: Link to course catalog */}
            {/* <Link to="/courses" className="mt-4 inline-block text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300 font-medium">Browse Courses</Link> */}
          </div>
        )}

        {!loading && !error && enrolledCourses.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrolledCourses.map((course) => (
              <div key={course.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg shadow-md overflow-hidden transition hover:shadow-lg">
                {/* Optional: Course Thumbnail */}
                {/* <img src={course.thumbnailUrl || 'placeholder.png'} alt={course.title} className="h-40 w-full object-cover" /> */}
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 truncate">{course.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">{course.description}</p>
                  {/* Placeholder for progress */}
                  <div className="h-2 w-full bg-gray-200 dark:bg-gray-600 rounded-full mb-4">
                    <div className="h-2 bg-purple-600 rounded-full" style={{ width: `25%` }}></div> {/* Example: 25% progress */}
                  </div>
                  <Link 
                    to={`/courses/${course.id}`} // Assuming a route like /courses/:courseId exists
                    className="inline-block w-full text-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors text-sm font-medium"
                  >
                    Continue Learning
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;