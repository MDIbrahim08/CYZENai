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
      <DialogContent className="max-w-2xl p-0 overflow-hidden rounded-3xl">
        {/* Video Preview */}
        <div className="relative aspect-video bg-black">
          <img
            src={video.thumbnailUrl}
            alt={video.title}
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleWatchOnPlatform}
              className="w-20 h-20 rounded-full gradient-purple flex items-center justify-center shadow-xl"
            >
              <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </motion.button>
          </div>

          {/* Duration */}
          <div className="absolute bottom-3 right-3 bg-black/80 text-white text-sm px-3 py-1.5 rounded-lg flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            {video.duration} min
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <DialogHeader>
            <DialogTitle className="font-heading text-xl text-left">
              {video.title}
            </DialogTitle>
          </DialogHeader>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              {video.platform}
            </Badge>
            <Badge variant="outline" className="bg-secondary/10 border-secondary/30 text-secondary">
              {video.relatedFormula}
            </Badge>
            <div className="flex items-center gap-0.5">
              {difficultyStars.map((filled, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    filled ? 'text-gold fill-gold' : 'text-muted-foreground/30'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Description */}
          <p className="text-text-secondary">
            {video.description}
          </p>

          {/* Creator */}
          <p className="text-sm text-muted-foreground">
            Created by: <span className="font-medium text-foreground">{video.creator}</span>
          </p>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 rounded-xl"
            >
              Back to Resources
            </Button>
            <Button
              onClick={handleWatchOnPlatform}
              className="flex-1 gradient-purple text-white rounded-xl"
            >
              Watch on {video.platform}
              <ExternalLink className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
