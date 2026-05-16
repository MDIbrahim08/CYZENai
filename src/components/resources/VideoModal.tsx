import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Clock, Star } from 'lucide-react';
import { VideoResource } from '@/data/resources';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface VideoModalProps {
  video: VideoResource | null;
  isOpen: boolean;
  onClose: () => void;
}

export const VideoModal = ({ video, isOpen, onClose }: VideoModalProps) => {
  if (!video) return null;

  const difficultyStars = Array.from({ length: 3 }, (_, i) => i < video.difficulty);

  const handleWatchOnPlatform = () => {
    window.open(video.videoUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden rounded-3xl bg-[#0a0a0f] border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
        {/* Video Preview */}
        <div className="relative aspect-video bg-black/40">
          <img
            src={video.thumbnailUrl}
            alt={video.title}
            className="w-full h-full object-cover opacity-50 transition-opacity group-hover:opacity-60"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleWatchOnPlatform}
              className="w-20 h-20 rounded-full bg-emerald-500 flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.5)]"
            >
              <svg className="w-8 h-8 text-black ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </motion.button>
          </div>

          {/* Duration */}
          <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg flex items-center gap-1.5 border border-white/10">
            <Clock className="w-3 h-3" />
            {video.duration}
          </div>
        </div>

        {/* Content */}
        <div className="p-8 space-y-6">
          <DialogHeader>
            <DialogTitle className="font-heading text-2xl text-left text-white tracking-tight">
              {video.title}
            </DialogTitle>
          </DialogHeader>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-3">
            <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 text-[10px] font-bold uppercase tracking-widest px-3 py-1">
              {video.platform}
            </Badge>
            <Badge variant="outline" className="bg-white/5 border-white/10 text-white/40 text-[10px] font-bold uppercase tracking-widest px-3 py-1">
              Target Tool: {video.relatedTool}
            </Badge>
            <div className="flex items-center gap-1 ml-auto">
              {difficultyStars.map((filled, i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 ${
                    filled ? 'text-emerald-400 fill-emerald-400' : 'text-white/10'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Description */}
          <p className="text-white/40 text-sm leading-relaxed">
            {video.description}
          </p>

          <div className="flex items-center justify-between pt-4 border-t border-white/5">
            <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">
              Author: <span className="text-white/60">{video.creator}</span>
            </p>
            
            <div className="flex gap-3">
              <Button
                variant="ghost"
                onClick={onClose}
                className="rounded-xl text-white/40 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest px-6"
              >
                Dismiss
              </Button>
              <Button
                onClick={handleWatchOnPlatform}
                className="bg-emerald-500 text-black hover:bg-emerald-400 rounded-xl font-bold uppercase tracking-widest text-xs px-8 shadow-[0_0_20px_rgba(16,185,129,0.2)]"
              >
                Begin Training
                <ExternalLink className="w-3 h-3 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
