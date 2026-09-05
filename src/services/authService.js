import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { auth, isFirebaseConfigured } from './firebase';

const DEMO_ADMIN_STORAGE_KEY = 'rani_matrimony_demo_admin_user';

export async function loginAdmin(email, password) {
  if (isFirebaseConfigured && auth) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const adminUid = import.meta.env.VITE_ADMIN_UID;
      if (adminUid && adminUid !== 'your_admin_user_uid_here') {
        if (userCredential.user.uid !== adminUid) {
          await signOut(auth);
          throw new Error('This account is not authorized as an administrator.');
        }
      }
      return userCredential.user;
    } catch (error) {
      if (error.code === 'auth/invalid-credential' || error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        throw new Error('Invalid email or password. Please check your credentials.');
      } else if (error.code === 'auth/too-many-requests') {
        throw new Error('Too many failed login attempts. Please try again later.');
      }
      throw error;
    }
  } else {
    // Demo Mode Fallback for local testing before .env setup
    if (email === 'admin@ranimatrimony.com' && password === 'Admin@123') {
      const demoUser = {
        uid: 'demo-admin-uid-123',
        email: 'admin@ranimatrimony.com',
        displayName: 'Rani Matrimony Admin'
      };
      localStorage.setItem(DEMO_ADMIN_STORAGE_KEY, JSON.stringify(demoUser));
      return demoUser;
    } else {
      throw new Error('Invalid demo credentials. Use: admin@ranimatrimony.com / Admin@123');
    }
  }
}

export async function logoutAdmin() {
  if (isFirebaseConfigured && auth) {
    await signOut(auth);
  } else {
    localStorage.removeItem(DEMO_ADMIN_STORAGE_KEY);
  }
}

export function subscribeToAuth(callback) {
  if (isFirebaseConfigured && auth) {
    return onAuthStateChanged(auth, (user) => {
      callback(user);
    });
  } else {
    // Check local storage demo auth
    const stored = localStorage.getItem(DEMO_ADMIN_STORAGE_KEY);
    const user = stored ? JSON.parse(stored) : null;
    callback(user);
    return () => {};
  }
}

export function getCurrentUser() {
  if (isFirebaseConfigured && auth) {
    return auth.currentUser;
  }
  const stored = localStorage.getItem(DEMO_ADMIN_STORAGE_KEY);
  return stored ? JSON.parse(stored) : null;
}
