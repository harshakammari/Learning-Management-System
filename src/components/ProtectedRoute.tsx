import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// Define UserRole type consistent with AuthContext
type UserRole = 'student' | 'instructor'; 

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRole: UserRole; // Update prop type
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRole }) => {
  const { user, userRole, loading } = useAuth();

  if (loading) {
    // Optionally return a shared loading spinner component here too
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!user) {
    // If no user, redirect to login (which should be the root path now)
    return <Navigate to="/" replace />;
  }

  if (userRole !== allowedRole) {
    // If user has the wrong role, redirect them? Or show an unauthorized page?
    // Redirecting to root might be confusing if they are logged in.
    // For now, redirect to root.
    console.warn(`ProtectedRoute: User role '${userRole}' does not match allowed role '${allowedRole}'. Redirecting.`);
    return <Navigate to="/" replace />;
  }

  // If user exists, is not loading, and has the correct role, render children
  return <>{children}</>;
};

export default ProtectedRoute;