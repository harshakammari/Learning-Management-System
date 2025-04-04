import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute.tsx';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import StudentDashboard from './pages/StudentDashboard';
import TeacherDashboard from './pages/TeacherDashboard';
import BlogPost from './pages/BlogPost';
import { useAuth } from './contexts/AuthContext';

// Define a Layout component for pages with Navbar and Footer
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
    <Navbar />
    <main className="flex-grow">{children}</main>
    <Footer />
  </div>
);

// Define a simple Home component
const HomePage = () => (
  <>
    <Hero />
    <ContactForm />
  </>
);

// Loading component (Optional but recommended)
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600"></div>
  </div>
);

const AppContent = () => {
  const { user, userRole, loading } = useAuth();

  // Display loading indicator while checking auth state/role
  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Routes>
      {/* Public Routes only accessible when logged out */}
      <Route 
        path="/" 
        element={!user ? <Layout><HomePage /></Layout> : <Navigate to={`/${userRole}/dashboard`} replace />}
      />
      <Route 
        path="/blog/:slug" 
        element={!user ? <Layout><BlogPost /></Layout> : <Navigate to={`/${userRole}/dashboard`} replace />}
      />

      {/* Protected Dashboard Routes */}
      <Route
        path="/student/dashboard/*"
        element={
          <ProtectedRoute allowedRole="student">
            <Layout><StudentDashboard /></Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/instructor/dashboard/*"
        element={
          <ProtectedRoute allowedRole="instructor">
            <Layout><TeacherDashboard /></Layout>
          </ProtectedRoute>
        }
      />

      {/* Fallback Route */}
      {/* If logged in but role not determined yet (shouldn't happen with new logic, but safe fallback) or invalid path */}
      <Route path="*" element={<Navigate to={user && userRole ? `/${userRole}/dashboard` : "/"} replace />} />
    </Routes>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;