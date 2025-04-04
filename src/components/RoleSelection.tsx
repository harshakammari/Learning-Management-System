import React from 'react';
import { Users, GraduationCap } from 'lucide-react';

interface RoleSelectionProps {
  onSelectRole: (role: 'student' | 'teacher') => void;
}

const RoleSelection: React.FC<RoleSelectionProps> = ({ onSelectRole }) => {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl max-w-md w-full">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-6">
          Choose Your Role
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <button
            onClick={() => onSelectRole('student')}
            className="flex flex-col items-center p-6 border-2 border-gray-200 dark:border-gray-700 rounded-lg hover:border-purple-500 dark:hover:border-purple-400 transition-colors"
          >
            <Users className="h-12 w-12 text-purple-600 dark:text-purple-400 mb-4" />
            <span className="text-lg font-medium text-gray-900 dark:text-white">Student</span>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 text-center">
              Access courses and track your progress
            </p>
          </button>
          <button
            onClick={() => onSelectRole('teacher')}
            className="flex flex-col items-center p-6 border-2 border-gray-200 dark:border-gray-700 rounded-lg hover:border-purple-500 dark:hover:border-purple-400 transition-colors"
          >
            <GraduationCap className="h-12 w-12 text-purple-600 dark:text-purple-400 mb-4" />
            <span className="text-lg font-medium text-gray-900 dark:text-white">Teacher</span>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 text-center">
              Create and manage courses
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}

export default RoleSelection;