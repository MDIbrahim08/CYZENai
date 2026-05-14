import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { TimelineStep } from '@/data/careerPaths';

interface CareerTimelineProps {
  steps: TimelineStep[];
}

export const CareerTimeline = ({ steps }: CareerTimelineProps) => {
  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border" />

      <div className="space-y-4">
        {steps.map((step, index) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative flex items-start gap-4"
          >
            {/* Step indicator */}
            <div
              className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center text-lg flex-shrink-0
                ${step.isCurrent 
                  ? 'gradient-purple text-white shadow-lg ring-4 ring-primary/20' 
                  : step.isComplete 
                    ? 'bg-success text-white' 
                    : 'bg-muted text-muted-foreground'
                }`}
            >
              {step.isComplete ? (
                <Check className="w-5 h-5" />
              ) : (
                step.icon
              )}
            </div>

            {/* Content */}
            <div className={`flex-1 pt-2 ${step.isCurrent ? 'pb-2' : ''}`}>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className={`font-heading font-semibold text-sm ${step.isCurrent ? 'text-primary' : ''}`}>
                  {step.number}. {step.title}
                </h3>
                {step.isCurrent && (
                  <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">
                    You are here
                  </span>
                )}
              </div>
              <p className="text-sm text-muted-foreground mt-0.5">
                {step.duration}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
