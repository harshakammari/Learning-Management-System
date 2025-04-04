import React, { useState } from 'react';
import { X, Mail, Lock, LogIn, UserPlus, Chrome } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

// Update AuthModalProps to accept initialRole
interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialRole: 'student' | 'instructor' | null; // Added prop
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, initialRole }) => {
  const [isLoginView, setIsLoginView] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // Added state
  const [localError, setLocalError] = useState<string | null>(null); // For local errors like password mismatch
  
  const { 
    signInWithGoogle, 
    signInWithEmailPassword, 
    signUpWithEmailPassword, 
    error: authError, // Error from AuthContext
    loading 
  } = useAuth();

  // Dynamically set the title based on view and initialRole
  const getTitle = () => {
    const action = isLoginView ? 'Login' : 'Sign Up';
    const role = initialRole ? (initialRole.charAt(0).toUpperCase() + initialRole.slice(1)) : ''; // Capitalize role
    return role ? `${role} ${action}` : `${action} to OracadeHub`;
  };

  const handleGoogleSignIn = async () => {
    setLocalError(null); // Clear local errors
    try {
      await signInWithGoogle(initialRole);
    } catch (err) {
      console.error("Google sign-in error:", err); 
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null); // Clear local errors on new submission

    // --- Sign Up Flow --- 
    if (!isLoginView) {
      // Check if passwords match
      if (password !== confirmPassword) {
        setLocalError("Passwords do not match.");
        return; // Stop submission
      }
      // TODO: Add CAPTCHA check here later
      try {
        await signUpWithEmailPassword(email, password, initialRole);
        // Success is handled by AuthContext state changes
      } catch (err) {
         // Error is set in AuthContext, don't need to duplicate here unless needed
         console.error("Email/Password Sign Up error caught in component:", err);
      }
    } 
    // --- Login Flow --- 
    else {
      try {
        await signInWithEmailPassword(email, password, initialRole);
        // Success is handled by AuthContext state changes
      } catch (err) {
         console.error("Email/Password Sign In error caught in component:", err);
      }
    }
  };

  // Clear state and errors when modal opens/closes or view changes
  React.useEffect(() => {
    if (isOpen) {
      setIsLoginView(true); // Default to login view
    } else {
      // Clear fields when modal closes
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setLocalError(null);
      // Note: authError from context is not cleared here, context handles it
    }
  }, [isOpen]);

  React.useEffect(() => {
    // Clear errors and confirm password when switching views
    setLocalError(null);
    setConfirmPassword(''); 
  }, [isLoginView]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white">
          <X size={24} />
        </button>
        
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">
          {getTitle()}
        </h2>

        {/* Display loading indicator */}
        {loading && (
          <div className="absolute inset-0 bg-white dark:bg-gray-800 bg-opacity-75 flex items-center justify-center z-10">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          </div>
        )}

        {/* Display combined errors (local first, then context) */}
        {(localError || authError) && (
           <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative mb-4 text-sm" role="alert">
             <span className="block sm:inline">{localError || authError}</span>
           </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="auth-email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                id="auth-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading} // Disable input when loading
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-500 dark:text-white disabled:opacity-50"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div>
            <label htmlFor="auth-password"className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
            <div className="relative">
               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                 <Lock className="h-5 w-5 text-gray-400" />
               </div>
              <input
                type="password"
                id="auth-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                disabled={loading} // Disable input when loading
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-500 dark:text-white disabled:opacity-50"
                placeholder="••••••••"
              />
            </div>
          </div>

          {/* --- Confirm Password Input (Sign Up Only) --- */} 
          {!isLoginView && (
            <div>
              <label htmlFor="auth-confirm-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Confirm Password</label>
              <div className="relative">
                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                   <Lock className="h-5 w-5 text-gray-400" />
                 </div>
                <input
                  type="password"
                  id="auth-confirm-password" 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  minLength={6}
                  disabled={loading} 
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-500 dark:text-white disabled:opacity-50"
                  placeholder="••••••••"
                />
              </div>
            </div>
          )}

          {/* TODO: Add CAPTCHA component here for Sign Up view */} 

          <button
            type="submit"
            disabled={loading} // Disable button when loading
            className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {/* Show spinner inside button when loading */}
            {loading && <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>}
            {!loading && (isLoginView ? <LogIn className="mr-2 h-5 w-5" /> : <UserPlus className="mr-2 h-5 w-5" />)}
            {isLoginView ? 'Login' : 'Sign Up'}
          </button>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300 dark:border-gray-600" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                Or continue with
              </span>
            </div>
          </div>

          <div className="mt-6">
            <button
              onClick={handleGoogleSignIn}
              disabled={loading} // Disable button when loading
              className="w-full inline-flex justify-center items-center py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {/* Optional: Show spinner if Google sign-in is loading */}
              {/* {loading && <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-500 mr-2"></div>} */}
              <Chrome className="mr-2 h-5 w-5" />
              Google
            </button>
          </div>
        </div>

        <div className="mt-6 text-center text-sm">
          <button
            onClick={() => !loading && setIsLoginView(!isLoginView)} // Prevent toggle when loading
            disabled={loading}
            className="font-medium text-purple-600 hover:text-purple-500 dark:text-purple-400 dark:hover:text-purple-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoginView ? 'Need an account? Sign Up' : 'Already have an account? Login'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthModal; 