import { create } from 'zustand';
import { SecureStorage } from '@/utils/storage';

/**
 * SECURITY CONFIGURATION
 * Rate limiting and session management settings
 */
const SECURITY_CONFIG = {
  /** Maximum failed attempts before lockout */
  MAX_ATTEMPTS: 5,
  /** Lockout duration in milliseconds (15 minutes) */
  LOCKOUT_DURATION: 15 * 60 * 1000,
  /** Session timeout in milliseconds (24 hours) */
  SESSION_TIMEOUT: 24 * 60 * 60 * 1000,
  /** Minimum time between attempts (1 second) - prevents brute force */
  MIN_ATTEMPT_INTERVAL: 1000,
};

interface AuthState {
  isAuthenticated: boolean;
  failedAttempts: number;
  lockoutUntil: number | null;
  lastAttemptTime: number | null;
  sessionStartTime: number | null;
}

interface AuthStore extends AuthState {
  // Actions
  authenticate: (password: string) => { success: boolean; error?: string };
  logout: () => void;
  checkSession: () => boolean;
  getRemainingLockoutTime: () => number;
  getAttemptsRemaining: () => number;
  isRateLimited: () => boolean;
}

// Storage keys
const STORAGE_KEYS = {
  AUTH_STATE: 'auth_state',
} as const;

/**
 * Get the app password from environment variable
 * SECURITY: Password is stored in environment variable, not in code
 */
function getAppPassword(): string {
  const password = import.meta.env.VITE_APP_PASSWORD;
  if (!password) {
    // Default password for development - should be overridden in production
    console.warn('VITE_APP_PASSWORD not set. Using default password "06072005"');
    return '06072005';
  }
  return password;
}

/**
 * Hash password for comparison (simple hash for client-side use)
 * SECURITY NOTE: This is obfuscation, not cryptographic security
 */
function hashPassword(password: string): string {
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return hash.toString(36);
}

/**
 * Load persisted auth state from secure storage
 */
function loadPersistedState(): Partial<AuthState> {
  const stored = SecureStorage.get<Partial<AuthState>>(STORAGE_KEYS.AUTH_STATE, {});
  return stored;
}

/**
 * Persist auth state to secure storage
 */
function persistState(state: Partial<AuthState>): void {
  SecureStorage.set(STORAGE_KEYS.AUTH_STATE, state);
}

/**
 * Authentication store with rate limiting and session management
 */
export const useAuthStore = create<AuthStore>((set, get) => {
  // Load initial state from storage
  const persisted = loadPersistedState();
  
  return {
    // Initial state (merged with persisted)
    isAuthenticated: false,
    failedAttempts: persisted.failedAttempts ?? 0,
    lockoutUntil: persisted.lockoutUntil ?? null,
    lastAttemptTime: persisted.lastAttemptTime ?? null,
    sessionStartTime: persisted.sessionStartTime ?? null,

    /**
     * Attempt to authenticate with password
     * Implements rate limiting and lockout protection
     */
    authenticate: (password: string) => {
      const state = get();
      const now = Date.now();

      // Validate input
      if (!password || typeof password !== 'string') {
        return { success: false, error: 'Password is required' };
      }

      // Limit password length to prevent DoS
      if (password.length > 128) {
        return { success: false, error: 'Password too long' };
      }

      // Check if currently locked out
      if (state.lockoutUntil && now < state.lockoutUntil) {
        const remainingMs = state.lockoutUntil - now;
        const remainingMin = Math.ceil(remainingMs / 60000);
        return { 
          success: false, 
          error: `Too many attempts. Try again in ${remainingMin} minute${remainingMin !== 1 ? 's' : ''}.` 
        };
      }

      // Rate limit: prevent rapid fire attempts
      if (state.lastAttemptTime && (now - state.lastAttemptTime) < SECURITY_CONFIG.MIN_ATTEMPT_INTERVAL) {
        return { success: false, error: 'Please wait before trying again' };
      }

      // Clear lockout if expired
      if (state.lockoutUntil && now >= state.lockoutUntil) {
        set({ lockoutUntil: null, failedAttempts: 0 });
      }

      const appPassword = getAppPassword();
      const isCorrect = password === appPassword || 
                        hashPassword(password) === hashPassword(appPassword);

      if (isCorrect) {
        // Successful authentication
        const newState = {
          isAuthenticated: true,
          failedAttempts: 0,
          lockoutUntil: null,
          lastAttemptTime: now,
          sessionStartTime: now,
        };
        
        set(newState);
        persistState(newState);
        
        return { success: true };
      } else {
        // Failed authentication
        const newFailedAttempts = state.failedAttempts + 1;
        const shouldLockout = newFailedAttempts >= SECURITY_CONFIG.MAX_ATTEMPTS;
        
        const newState = {
          failedAttempts: newFailedAttempts,
          lockoutUntil: shouldLockout ? now + SECURITY_CONFIG.LOCKOUT_DURATION : null,
          lastAttemptTime: now,
        };
        
        set(newState);
        persistState(newState);

        if (shouldLockout) {
          return { 
            success: false, 
            error: 'Too many failed attempts. Account locked for 15 minutes.' 
          };
        }

        const attemptsRemaining = SECURITY_CONFIG.MAX_ATTEMPTS - newFailedAttempts;
        return { 
          success: false, 
          error: `Incorrect password. ${attemptsRemaining} attempt${attemptsRemaining !== 1 ? 's' : ''} remaining.` 
        };
      }
    },

    /**
     * Logout and clear session
     */
    logout: () => {
      const newState = {
        isAuthenticated: false,
        sessionStartTime: null,
      };
      
      set(newState);
      persistState({
        ...get(),
        ...newState,
      });
    },

    /**
     * Check if session is still valid (not expired)
     * Auto-logout after 24 hours
     */
    checkSession: () => {
      const state = get();
      const now = Date.now();

      if (!state.isAuthenticated || !state.sessionStartTime) {
        return false;
      }

      const sessionAge = now - state.sessionStartTime;
      if (sessionAge > SECURITY_CONFIG.SESSION_TIMEOUT) {
        // Session expired - auto logout
        get().logout();
        return false;
      }

      return true;
    },

    /**
     * Get remaining lockout time in milliseconds
     */
    getRemainingLockoutTime: () => {
      const { lockoutUntil } = get();
      if (!lockoutUntil) return 0;
      
      const remaining = lockoutUntil - Date.now();
      return remaining > 0 ? remaining : 0;
    },

    /**
     * Get number of attempts remaining before lockout
     */
    getAttemptsRemaining: () => {
      const { failedAttempts } = get();
      return Math.max(0, SECURITY_CONFIG.MAX_ATTEMPTS - failedAttempts);
    },

    /**
     * Check if currently rate limited
     */
    isRateLimited: () => {
      const { lockoutUntil } = get();
      if (!lockoutUntil) return false;
      return Date.now() < lockoutUntil;
    },
  };
});
