import { useState, useEffect, useRef } from "react";
import { Shield, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { TextPressure } from "./TextPressure";

interface IntroOverlayProps {
  onEnter: () => void;
}

export const IntroOverlay = ({ onEnter }: IntroOverlayProps) => {
  const [stage, setStage] = useState<'welcome' | 'threat' | 'solution'>('welcome');
  const [showButton, setShowButton] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const startIntro = () => {
    setStage('threat');
    // Force play on user interaction
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play().catch(e => console.error("Video play failed:", e));
      }
    }, 100);
  };

  useEffect(() => {
    if (stage === 'threat') {
      const threatTimer = setTimeout(() => {
        setStage('solution');
      }, 4000);

      const buttonTimer = setTimeout(() => {
        setShowButton(true);
      }, 5000);

      return () => {
        clearTimeout(threatTimer);
        clearTimeout(buttonTimer);
      };
    }
  }, [stage]);

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center overflow-hidden"
      style={{ fontFamily: "'Architects Daughter', cursive" }}
    >
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Architects+Daughter&display=swap');
          .doodle-font { font-family: 'Architects Daughter', cursive !important; }
        `}
      </style>

      {/* Stage: Welcome */}
      <AnimatePresence mode="wait">
        {stage === 'welcome' && (
          <motion.div 
            key="welcome"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative z-20 flex flex-col items-center gap-8 text-center"
          >
            <div className="p-6 rounded-3xl bg-cyan-50 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <Shield size={64} className="text-cyan-600" />
            </div>
            <div className="space-y-2">
              <h1 className="text-5xl font-black text-black doodle-font">WELCOME TO CYZEN</h1>
              <p className="text-black/40 text-lg doodle-font tracking-widest uppercase">Encrypted Connection Established</p>
            </div>
            <button 
              onClick={startIntro}
              className="px-12 py-4 bg-black text-white rounded-2xl font-bold text-xl doodle-font hover:scale-105 active:scale-95 transition-all shadow-[0_10px_30px_rgba(0,0,0,0.3)]"
            >
              ENTER SYSTEM
            </button>
          </motion.div>
        )}

        {/* Video Stage */}
        {stage !== 'welcome' && (
          <motion.div 
            key="video-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 w-full h-full"
          >
            <video 
              ref={videoRef}
              playsInline 
              className="absolute inset-0 w-full h-full object-cover"
              onEnded={() => {
                setStage('solution');
                setShowButton(true);
              }}
              src="/intro.mp4"
            />

            {/* Overlays */}
            <AnimatePresence mode="wait">
              {stage === 'threat' ? (
                <motion.div 
                  key="threat"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex items-center justify-center z-10"
                >
                  <div className="bg-red-500 text-white px-8 py-3 rounded-xl rotate-[-2deg] shadow-lg inline-block text-2xl font-bold border-2 border-black doodle-font">
                    THREAT DETECTED!
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  key="solution"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 flex flex-col items-center justify-between h-full py-16 px-6 text-center z-10"
                >
                  <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="bg-cyan-100 text-cyan-800 px-6 py-2 rounded-full border border-cyan-300 text-sm font-bold tracking-[0.2em] doodle-font"
                  >
                    SYSTEM SECURED // THREAT NEUTRALIZED
                  </motion.div>

                  <div className="flex flex-col items-center gap-6 w-full max-w-sm">
                    <motion.p 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="text-black/70 text-3xl sm:text-4xl font-bold italic doodle-font"
                    >
                      Your Digital Guardian
                    </motion.p>

                    {showButton && (
                      <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        onClick={onEnter}
                        className="w-full group relative flex items-center justify-center gap-3 px-10 py-5 rounded-2xl bg-black text-white font-bold text-xl transition-all hover:scale-[1.02] active:scale-[0.98] border-b-8 border-gray-800 shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
                      >
                        <span className="doodle-font tracking-wide">GET STARTED</span>
                        <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
                      </motion.button>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute inset-0 pointer-events-none opacity-20 mix-blend-multiply" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/paper.png')" }} />
    </motion.div>
  );
};
