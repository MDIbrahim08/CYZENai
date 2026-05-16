import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { TimelineStep } from '@/data/careerPaths';

interface CareerTimelineProps {
  steps: TimelineStep[];
}

export const CareerTimeline = ({ steps }: CareerTimelineProps) => {
  return (
    <div className="relative pl-2">
      {/* Vertical line with gradient */}
      <div className="absolute left-6 top-2 bottom-2 w-px bg-gradient-to-b from-emerald-500/50 via-white/10 to-transparent" />

      <div className="space-y-8">
        {steps.map((step, index) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative flex items-center gap-6 group"
          >
            {/* Step indicator */}
            <div
              className={`relative z-10 w-12 h-12 rounded-xl border flex items-center justify-center text-xl flex-shrink-0 transition-all duration-300
                ${step.isCurrent 
                  ? 'bg-emerald-500 border-emerald-500 text-black shadow-[0_0_20px_rgba(16,185,129,0.4)] scale-110' 
                  : step.isComplete 
                    ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' 
                    : 'bg-[#161b22] border-white/5 text-white/20'
                }`}
            >
              {step.isComplete ? (
                <Check className="w-5 h-5 stroke-[3]" />
              ) : (
                <span className="font-heading font-black">{step.icon}</span>
              )}
              
              {/* Pulsing effect for current step */}
              {step.isCurrent && (
                <div className="absolute inset-0 rounded-xl bg-emerald-500 animate-ping opacity-20" />
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-1">
                <h3 className={`font-heading font-bold text-sm tracking-tight transition-colors ${step.isCurrent ? 'text-white' : 'text-white/40'}`}>
                  {step.title}
                </h3>
                {step.isCurrent && (
                  <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 text-[9px] uppercase font-black px-2 py-0">
                    Active Mission
                  </Badge>
                )}
              </div>
              <p className="text-[11px] font-bold uppercase tracking-widest text-white/20">
                Estimated: {step.duration}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
