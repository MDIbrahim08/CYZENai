import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Eye, EyeOff, AlertTriangle, Brain } from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

/**
 * PasswordGate Component
 * Blocks app access until correct password is entered
 * 
 * SECURITY FEATURES:
 * - Rate limiting: 5 attempts = 15 min lockout
 * - Session timeout: Auto-logout after 24 hours
 * - Input validation: Length limits, sanitization
 */
export function PasswordGate({ children }: { children: React.ReactNode }) {
  const {
    isAuthenticated,
    authenticate,
    checkSession,
    getRemainingLockoutTime,
    getAttemptsRemaining,
    isRateLimited,
  } = useAuthStore();

  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [lockoutTime, setLockoutTime] = useState(0);

  useEffect(() => {
    checkSession();
    const interval = setInterval(() => {
      checkSession();
    }, 60000);
    return () => clearInterval(interval);
  }, [checkSession]);

  useEffect(() => {
    if (isRateLimited()) {
      const interval = setInterval(() => {
        const remaining = getRemainingLockoutTime();
        setLockoutTime(remaining);
        if (remaining <= 0) setError(null);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isRateLimited, getRemainingLockoutTime, error]);

  const handlePasswordChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length > 128) return;
    if (error) setError(null);
    setPassword(value);
  }, [error]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) {
      setError('Please enter a password');
      return;
    }

    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const result = authenticate(password);
    setIsLoading(false);
    
    if (!result.success) {
      setError(result.error || 'Authentication failed');
      setPassword('');
    }
  };

  const formatLockoutTime = (ms: number): string => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  if (isAuthenticated && checkSession()) {
    return <>{children}</>;
  }

  const isLocked = isRateLimited();
  const attemptsRemaining = getAttemptsRemaining();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-sm"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="inline-flex items-center justify-center w-24 h-24 rounded-full gradient-purple shadow-colored-purple mb-6"
          >
            <Brain className="w-12 h-12 text-white" />
          </motion.div>
          
          <h1 className="font-heading text-2xl font-bold text-foreground mb-2">
            PsyStat Coach 🎓
          </h1>
          <p className="text-text-secondary text-sm">
            Enter password to continue
          </p>
        </div>

        {/* Login Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card-playful p-6"
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Password Input */}
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-foreground">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={handlePasswordChange}
                  disabled={isLocked || isLoading}
                  placeholder="Enter password"
                  className="h-14 pl-12 pr-12 rounded-2xl text-base bg-surface border-0"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            <AnimatePresence mode="wait">
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex items-start gap-3 p-4 bg-destructive/10 rounded-2xl"
                >
                  <AlertTriangle className="w-5 h-5 text-destructive flex-shrink-0" />
                  <div>
                    <p className="text-sm text-destructive">{error}</p>
                    {isLocked && lockoutTime > 0 && (
                      <p className="text-xs text-destructive/80 mt-1">
                        Try again in {formatLockoutTime(lockoutTime)}
                      </p>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Attempts Warning */}
            {!isLocked && attemptsRemaining <= 3 && attemptsRemaining > 0 && (
              <p className="text-xs text-warning text-center">
                {attemptsRemaining} attempt{attemptsRemaining !== 1 ? 's' : ''} remaining
              </p>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLocked || isLoading || !password.trim()}
              className="w-full h-14 rounded-2xl font-semibold gradient-purple shadow-colored-purple"
            >
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                />
              ) : isLocked ? (
                'Locked 🔒'
              ) : (
                'Unlock 🚀'
              )}
            </Button>
          </form>
        </motion.div>

        <p className="text-center text-xs text-text-muted mt-6">
          Session expires after 24 hours 🔐
        </p>
      </motion.div>
    </div>
  );
}
