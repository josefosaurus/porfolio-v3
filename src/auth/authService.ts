import { initializeApp, type FirebaseApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  type Auth,
  type User,
} from 'firebase/auth';
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  type FirebaseStorage,
} from 'firebase/storage';
import type { LoginCredentials, AuthUser } from './types';

const firebaseConfig = {
  apiKey: import.meta.env.PUBLIC_FIREBASE_API_KEY,
  authDomain: import.meta.env.PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.PUBLIC_FIREBASE_APP_ID,
};

let app: FirebaseApp;
let auth: Auth;
let storage: FirebaseStorage;

// Initialize Firebase (only in browser)
if (typeof window !== 'undefined') {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  storage = getStorage(app);
}

const TOKEN_KEY = 'firebase_auth_token';

/**
 * Sign in with email and password
 */
export async function login(credentials: LoginCredentials): Promise<AuthUser> {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      credentials.email,
      credentials.password
    );
    const token = await userCredential.user.getIdToken();
    storeToken(token);

    return {
      uid: userCredential.user.uid,
      email: userCredential.user.email,
      displayName: userCredential.user.displayName,
    };
  } catch (error: any) {
    console.error('Login error:', error);
    throw new Error(error.message || 'Failed to login');
  }
}

/**
 * Sign out current user
 */
export async function logout(): Promise<void> {
  try {
    await signOut(auth);
    clearToken();
  } catch (error: any) {
    console.error('Logout error:', error);
    throw new Error(error.message || 'Failed to logout');
  }
}

/**
 * Get current user's ID token
 */
export async function getIdToken(): Promise<string | null> {
  const user = auth.currentUser;
  if (!user) {
    return null;
  }

  try {
    // Force refresh to ensure token is valid
    return await user.getIdToken(true);
  } catch (error) {
    console.error('Error getting ID token:', error);
    return null;
  }
}

/**
 * Store token in localStorage
 */
export function storeToken(token: string): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(TOKEN_KEY, token);
  }
}

/**
 * Get stored token from localStorage
 */
export function getStoredToken(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(TOKEN_KEY);
  }
  return null;
}

/**
 * Clear stored token from localStorage
 */
export function clearToken(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(TOKEN_KEY);
  }
}

/**
 * Listen for auth state changes
 */
export function onAuthStateChange(callback: (user: AuthUser | null) => void): () => void {
  return onAuthStateChanged(auth, (firebaseUser: User | null) => {
    if (firebaseUser) {
      const authUser: AuthUser = {
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        displayName: firebaseUser.displayName,
      };
      callback(authUser);

      // Update stored token
      firebaseUser.getIdToken().then(storeToken);
    } else {
      callback(null);
      clearToken();
    }
  });
}

/**
 * Get current authenticated user
 */
export function getCurrentUser(): AuthUser | null {
  const user = auth.currentUser;
  if (!user) {
    return null;
  }

  return {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
  };
}

/**
 * Upload image to Firebase Storage
 * @param file - The image file to upload
 * @param folder - Optional folder path (default: 'certificates')
 * @returns Promise with the download URL of the uploaded image
 */
export async function uploadImage(file: File, folder: string = 'certificates'): Promise<string> {
  if (!auth.currentUser) {
    throw new Error('User must be authenticated to upload images');
  }

  try {
    // Generate unique filename with timestamp
    const timestamp = Date.now();
    const sanitizedFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const fileName = `${timestamp}_${sanitizedFileName}`;
    const filePath = `${folder}/${fileName}`;

    // Create storage reference
    const storageRef = ref(storage, filePath);

    // Upload file
    const snapshot = await uploadBytes(storageRef, file);
    console.log('Image uploaded successfully:', snapshot.metadata.fullPath);

    // Get download URL
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error: any) {
    console.error('Error uploading image:', error);
    throw new Error(error.message || 'Failed to upload image');
  }
}
