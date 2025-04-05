import React, { useState } from 'react';
// import { GraduationCap } from 'lucide-react'; // Removed unused import
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import logoSrc from '../assets/Logo.png';
import AuthModal from './AuthModal';
import ConfirmModal from './ConfirmModal';

const Navbar = () => {
  const { user, userRole, signOut, error } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [initialRole, setInitialRole] = useState<'student' | 'instructor' | null>(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const openAuthModal = (role: 'student' | 'instructor') => {
    setInitialRole(role);
    setIsAuthModalOpen(true);
  };
  
  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
    setInitialRole(null);
  };

  const openConfirmModal = () => setIsConfirmModalOpen(true);
  const closeConfirmModal = () => setIsConfirmModalOpen(false);
  
  const handleSignOutConfirm = () => {
    signOut();
  };

  return (
    <>
      <nav className="bg-white shadow-lg dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <img src={logoSrc} alt="OracadeHub Logo" className="h-8 w-auto" />
                <span className="ml-2 text-2xl font-bold text-purple-600 dark:text-purple-400">
                  OracadeHub
                </span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-4">
                  {userRole && (
                    <Link
                      to={`/${userRole}/dashboard`}
                      className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
                    >
                      Dashboard
                    </Link>
                  )}
                  <span className="text-gray-700 dark:text-gray-300">
                    {user.email}
                  </span>
                  <button
                    onClick={openConfirmModal}
                    className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <>
                  <button
                    onClick={() => openAuthModal('student')}
                    className="px-4 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                  >
                    Student Login/Signup
                  </button>
                  <button
                    onClick={() => openAuthModal('instructor')}
                    className="px-4 py-2 rounded-md text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors"
                  >
                    Instructor Login/Signup
                  </button>
                </>
              )}
            </div>
          </div>
          {error && !isAuthModalOpen && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-2" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}
        </div>
      </nav>
      
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={closeAuthModal} 
        initialRole={initialRole} 
      />

      <ConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={closeConfirmModal}
        onConfirm={handleSignOutConfirm}
        title="Confirm Sign Out"
        message="Are you sure you want to sign out of your account?"
        confirmText="Sign Out"
        cancelText="Cancel"
      />
    </>
  );
}

export default Navbar;