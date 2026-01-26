import { useEffect, useState, type ReactNode } from 'react';
import { useStore } from '@nanostores/react';
import { getCurrentUser, onAuthStateChange, getStoredToken } from '@auth/authService';
import { isAuthenticated, authUser, authLoading } from '@store/store';

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [checking, setChecking] = useState(true);
  const $isAuthenticated = useStore(isAuthenticated);
  const $authLoading = useStore(authLoading);

  useEffect(() => {
    // Check if user is already authenticated
    const checkAuth = async () => {
      authLoading.set(true);

      // Check for stored token
      const token = getStoredToken();
      if (!token) {
        // No token, redirect to login
        window.location.href = '/admin/login';
        return;
      }

      // Check current user
      const user = getCurrentUser();
      if (user) {
        authUser.set(user);
        isAuthenticated.set(true);
        setChecking(false);
      } else {
        // Token exists but no user, might be expired
        // Wait for auth state change listener
        setTimeout(() => {
          const currentUser = getCurrentUser();
          if (!currentUser) {
            window.location.href = '/admin/login';
          } else {
            authUser.set(currentUser);
            isAuthenticated.set(true);
            setChecking(false);
          }
        }, 1000);
      }

      authLoading.set(false);
    };

    checkAuth();

    // Set up auth state listener
    const unsubscribe = onAuthStateChange((user) => {
      if (user) {
        authUser.set(user);
        isAuthenticated.set(true);
        setChecking(false);
      } else {
        authUser.set(null);
        isAuthenticated.set(false);
        // Redirect to login if auth state changes to null
        if (!checking) {
          window.location.href = '/admin/login';
        }
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // Show loading state while checking authentication
  if (checking || $authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <svg
            className="animate-spin h-12 w-12 text-indigo-600 mx-auto"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // Show children if authenticated
  if ($isAuthenticated) {
    return <>{children}</>;
  }

  // Return null while redirecting
  return null;
}
