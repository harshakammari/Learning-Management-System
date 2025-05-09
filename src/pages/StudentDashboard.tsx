import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const StudentDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        Student Dashboard
      </h1>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Welcome, {user?.email}
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Your learning journey starts here. Enrolled courses will appear below.
        </p>
        {/* Course list will be added here */}
      </div>
    </div>
  );
};

export default StudentDashboard;