import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  GoogleAuthProvider, 
  User, 
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword as firebaseSignInWithEmailAndPassword
} from 'firebase/auth';
import { auth, db } from '../lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

type UserRole = 'student' | 'instructor';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  userRole: UserRole | null;
  signInWithGoogle: (intendedRole: UserRole | null) => Promise<void>;
  signInWithEmailPassword: (email: string, password: string, intendedRole: UserRole | null) => Promise<void>;
  signUpWithEmailPassword: (email: string, password: string, intendedRole: UserRole | null) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userRole, setUserRoleState] = useState<UserRole | null>(null);

  const ensureUserRole = async (userId: string, userEmail: string | null, intendedRole: UserRole | null) => {
    if (!intendedRole) {
      try {
        const userDoc = await getDoc(doc(db, 'users', userId));
        if (userDoc.exists() && userDoc.data().role) {
          setUserRoleState(userDoc.data().role as UserRole);
          return userDoc.data().role as UserRole;
        } else {
          setUserRoleState(null);
          return null;
        }
      } catch(err) {
        console.error("Error fetching user role:", err);
        setError("Could not verify user role."); 
        setUserRoleState(null);
        return null;
      }
    } else {
      try {
        console.log(`Ensuring role '${intendedRole}' for user ${userId}`);
        await setDoc(doc(db, 'users', userId), {
          email: userEmail,
          role: intendedRole,
          createdAt: new Date().toISOString()
        }, { merge: true });
        
        setUserRoleState(intendedRole);
        console.log(`Role '${intendedRole}' set for user ${userId}`);
        return intendedRole;
      } catch (error) {
        console.error("Set user role error:", error);
        setError(`Failed to set user role to ${intendedRole}. Please try again.`);
        setUserRoleState(null);
        return null;
      }
    }
  };

  useEffect(() => {
    setLoading(true);
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        await ensureUserRole(currentUser.uid, currentUser.email, null);
      } else {
        setUserRoleState(null);
      }
      setLoading(false);
    });

    getRedirectResult(auth).then(async (result) => {
      if (result) {
        console.log("Redirect result processed for user:", result.user.uid);
      }
    }).catch((error) => {
       if (error.code !== 'auth/cancelled-popup-request' && error.code !== 'auth/popup-closed-by-user') {
          console.error("Redirect sign-in error:", error);
          setError('Failed to complete sign-in process.');
        }
        setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signInWithGoogle = async (intendedRole: UserRole | null) => {
    setError(null);
    setLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      await ensureUserRole(result.user.uid, result.user.email, intendedRole);
    } catch (error: unknown) {
       let errorCode: string | undefined;
       if (typeof error === 'object' && error !== null && 'code' in error) {
         errorCode = (error as {code: string}).code;
       }

       if (errorCode === 'auth/popup-blocked' || errorCode === 'auth/cancelled-popup-request') {
         try {
           await signInWithRedirect(auth, provider);
         } catch (redirectError: unknown) {
           console.error("Google redirect error:", redirectError);
           setError('Failed to sign in with Google. Please try again.');
           setLoading(false);
         }
       } else if (errorCode !== 'auth/popup-closed-by-user'){
         console.error("Google popup error:", error);
         setError('Failed to sign in with Google. Please try again.');
         setLoading(false);
       } else {
         setLoading(false);
       }
    } 
  };

  const signInWithEmailPassword = async (email: string, password: string, intendedRole: UserRole | null) => {
    setError(null);
    setLoading(true);
    try {
      const userCredential = await firebaseSignInWithEmailAndPassword(auth, email, password);
      await ensureUserRole(userCredential.user.uid, userCredential.user.email, intendedRole);
    } catch (error: unknown) {
       console.error("Email Sign In error:", error);
       let message = 'Failed to sign in. Please try again later.';
       
       if (typeof error === 'object' && error !== null && 'code' in error) {
         const errorCode = (error as {code: string}).code;
         if (errorCode === 'auth/invalid-credential') {
             message = 'Login failed. User not found or password incorrect. Need an account? Try Signing Up.';
         } else if (errorCode === 'auth/user-disabled') {
             message = 'This account has been disabled.';
         }
       }
       
       setError(message);
       setLoading(false);
    }
  };

  const signUpWithEmailPassword = async (email: string, password: string, intendedRole: UserRole | null) => {
    setError(null);
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await ensureUserRole(userCredential.user.uid, userCredential.user.email, intendedRole);
    } catch (error: unknown) {
       console.error("Email Sign Up error:", error);
       let message = 'Failed to sign up. Please try again.';

       if (typeof error === 'object' && error !== null && 'code' in error) {
         const errorCode = (error as {code: string}).code;
         if (errorCode === 'auth/email-already-in-use') {
           message = 'This email address is already in use.';
         } else if (errorCode === 'auth/weak-password') {
           message = 'Password is too weak. Please choose a stronger password (at least 6 characters).';
         } else if (errorCode === 'auth/invalid-email') {
           message = 'Please enter a valid email address.';
         }
       }
       setError(message);
       setLoading(false);
    }
  };

  const signOut = async () => {
    setError(null);
    setLoading(true);
    try {
      await firebaseSignOut(auth);
      setUser(null);
      setUserRoleState(null);
    } catch (error: unknown) {
      console.error("Sign out error:", error);
      setError('Failed to sign out.');
    }
    setLoading(false);
  };

  const value = {
    user,
    loading,
    error,
    userRole,
    signInWithGoogle,
    signInWithEmailPassword,
    signUpWithEmailPassword,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};