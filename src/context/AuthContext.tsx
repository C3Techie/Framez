import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth, db } from '../config/firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';

const AUTH_PERSISTENCE_KEY = '@framez_auth_user';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, username: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hook to use the Auth Context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Auth Provider Component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Save user to AsyncStorage for persistence
  const saveUserToStorage = async (user: User | null) => {
    try {
      if (user) {
        const userData = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
        };
        await AsyncStorage.setItem(AUTH_PERSISTENCE_KEY, JSON.stringify(userData));
      } else {
        await AsyncStorage.removeItem(AUTH_PERSISTENCE_KEY);
      }
    } catch (error) {
      console.error('Error saving user to storage:', error);
    }
  };

  // Load user from AsyncStorage on app start
  useEffect(() => {
    const loadUserFromStorage = async () => {
      try {
        const savedUser = await AsyncStorage.getItem(AUTH_PERSISTENCE_KEY);
        if (savedUser) {
          // User data exists in storage, auth state will be updated by onAuthStateChanged
          console.log('Restored user session from storage');
        }
      } catch (error) {
        console.error('Error loading user from storage:', error);
      }
    };

    loadUserFromStorage();
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser: User | null) => {
      setUser(currentUser);
      await saveUserToStorage(currentUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  // Enhanced error handling for login
  const login = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      await saveUserToStorage(userCredential.user);
    } catch (error: any) {
      let errorMessage = 'Login failed. Please try again.';
      
      // Handle specific Firebase auth errors
      switch (error.code) {
        case 'auth/invalid-email':
          errorMessage = 'Invalid email address.';
          break;
        case 'auth/user-disabled':
          errorMessage = 'This account has been disabled.';
          break;
        case 'auth/user-not-found':
          errorMessage = 'No account found with this email.';
          break;
        case 'auth/wrong-password':
          errorMessage = 'Incorrect password. Please try again.';
          break;
        case 'auth/too-many-requests':
          errorMessage = 'Too many failed attempts. Please try again later.';
          break;
        case 'auth/network-request-failed':
          errorMessage = 'Network error. Please check your connection.';
          break;
        case 'auth/invalid-credential':
          errorMessage = 'Invalid email or password.';
          break;
        default:
          errorMessage = error.message || 'Login failed. Please try again.';
      }
      
      throw new Error(errorMessage);
    }
  };

  // Enhanced error handling for signup
  const signup = async (email: string, password: string, username: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Save username to Firestore
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        username: username,
        email: email,
        createdAt: new Date().toISOString(),
        postsCount: 0,
        followersCount: 0,
        followingCount: 0,
      });
      
      await saveUserToStorage(userCredential.user);
    } catch (error: any) {
      let errorMessage = 'Sign up failed. Please try again.';
      
      // Handle specific Firebase auth errors
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'An account with this email already exists.';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Invalid email address.';
          break;
        case 'auth/operation-not-allowed':
          errorMessage = 'Email/password accounts are not enabled.';
          break;
        case 'auth/weak-password':
          errorMessage = 'Password is too weak. Please use at least 6 characters.';
          break;
        case 'auth/network-request-failed':
          errorMessage = 'Network error. Please check your connection.';
          break;
        case 'auth/too-many-requests':
          errorMessage = 'Too many attempts. Please try again later.';
          break;
        default:
          errorMessage = error.message || 'Sign up failed. Please try again.';
      }
      
      throw new Error(errorMessage);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      await AsyncStorage.removeItem(AUTH_PERSISTENCE_KEY);
    } catch (error) {
      console.error('Error during logout:', error);
      throw error;
    }
  };

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};