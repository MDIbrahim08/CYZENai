import { motion } from 'framer-motion';
import { Play, ExternalLink, Clock, Star } from 'lucide-react';
import { VideoResource } from '@/data/resources';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface VideoCardProps {
  video: VideoResource;
  onWatch: (video: VideoResource) => void;
}

export const VideoCard = ({ video, onWatch }: VideoCardProps) => {
  const difficultyStars = Array.from({ length: 3 }, (_, i) => i < video.difficulty);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: -4 }}
      className="card-elevated overflow-hidden group"
    >
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden">
        <img
          src={video.thumbnailUrl}
          alt={video.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        {/* Play Button Overlay */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onWatch(video)}
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
            <Play className="w-6 h-6 text-primary fill-primary ml-1" />
          </div>
        </motion.button>

        {/* Duration Badge */}
        <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded-md flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {video.duration}
        </div>

        {/* Platform Badge */}
        <div className="absolute top-2 left-2">
          <Badge variant="secondary" className="bg-white/90 text-text-primary text-xs">
            {video.platform}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Title */}
        <h3 className="font-heading font-semibold text-base line-clamp-2 text-foreground">
          {video.title}
        </h3>

        {/* Difficulty & Formula */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-0.5">
            {difficultyStars.map((filled, i) => (
              <Star
                key={i}
                className={`w-3.5 h-3.5 ${
                  filled ? 'text-gold fill-gold' : 'text-muted-foreground/30'
                }`}
              />
            ))}
          </div>
          <Badge variant="outline" className="text-xs bg-primary/5 border-primary/20 text-primary">
            {video.relatedFormula}
          </Badge>
        </div>

        {/* Description */}
        <p className="text-sm text-text-secondary line-clamp-2">
          {video.description}
        </p>

        {/* Creator */}
        <p className="text-xs text-muted-foreground">
          {video.creator}
        </p>

        {/* Watch Button */}
        <Button
          onClick={() => onWatch(video)}
          className="w-full gradient-purple text-white rounded-xl"
          size="sm"
        >
          <Play className="w-4 h-4 mr-2 fill-current" />
          Watch Now
          <ExternalLink className="w-3 h-3 ml-2" />
        </Button>
      </div>
    </motion.div>
  );
};
