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
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      className="bg-[#161b22]/50 backdrop-blur-xl border border-white/5 rounded-3xl overflow-hidden group hover:border-emerald-500/30 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4),0_0_20px_rgba(16,185,129,0.1)] transition-all duration-500"
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

        {/* Difficulty & Tool */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-0.5">
            {difficultyStars.map((filled, i) => (
              <Star
                key={i}
                className={`w-3.5 h-3.5 ${
                  filled ? 'text-emerald-400 fill-emerald-400' : 'text-white/10'
                }`}
              />
            ))}
          </div>
          <Badge variant="outline" className="text-[10px] bg-emerald-500/5 border-emerald-500/20 text-emerald-400 uppercase font-bold tracking-tighter">
            {video.relatedTool}
          </Badge>
        </div>

        {/* Description */}
        <p className="text-xs text-white/40 line-clamp-2">
          {video.description}
        </p>

        {/* Creator */}
        <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">
          {video.creator}
        </p>

        {/* Watch Button */}
        <Button
          onClick={() => onWatch(video)}
          className="w-full bg-emerald-500 text-black hover:bg-emerald-400 rounded-xl font-bold uppercase tracking-widest text-[10px]"
          size="sm"
        >
          <Play className="w-3 h-3 mr-2 fill-current" />
          Access Intelligence
          <ExternalLink className="w-3 h-3 ml-2" />
        </Button>
      </div>
    </motion.div>
  );
};
