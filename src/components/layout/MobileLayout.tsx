import React from 'react';
import { Outlet } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { BottomNav } from './BottomNav';

/**
 * Mobile-first layout with bottom navigation
 */
export function MobileLayout() {
  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Main Content */}
      <main className="min-h-screen">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}
