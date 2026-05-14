import { motion } from 'framer-motion';
import { ArrowRight, Video, BookOpen } from 'lucide-react';
import { CuratedCollection } from '@/data/resources';
import { Button } from '@/components/ui/button';

interface CuratedCollectionsProps {
  collections: CuratedCollection[];
}

export const CuratedCollections = ({ collections }: CuratedCollectionsProps) => {
  return (
    <section className="space-y-4">
      <h2 className="font-heading font-semibold text-lg flex items-center gap-2">
        📌 Recommended for You
      </h2>

      <div className="space-y-3">
        {collections.map((collection, index) => (
          <motion.div
            key={collection.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`${collection.gradient} rounded-2xl p-4 text-white relative overflow-hidden`}
          >
            {/* Decorative blob */}
            <div className="absolute top-0 right-0 w-20 h-20 rounded-full bg-white/10 -translate-y-1/2 translate-x-1/2" />
            
            <div className="relative z-10">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="text-2xl mb-2">{collection.icon}</div>
                  <h3 className="font-heading font-semibold text-base">
                    {collection.title}
                  </h3>
                  <p className="text-white/80 text-sm mt-1">
                    {collection.description}
                  </p>
                  
                  {/* Resource counts */}
                  <div className="flex items-center gap-4 mt-3">
                    <div className="flex items-center gap-1.5 text-sm text-white/90">
                      <Video className="w-4 h-4" />
                      {collection.videoCount} videos
                    </div>
                    <div className="flex items-center gap-1.5 text-sm text-white/90">
                      <BookOpen className="w-4 h-4" />
                      {collection.textbookCount} textbooks
                    </div>
                  </div>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/20 rounded-full flex-shrink-0"
                >
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
