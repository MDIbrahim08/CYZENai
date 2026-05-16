import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { VideoResource } from "@/data/resources"

interface PortfolioGalleryProps {
  title?: string;
  videos: VideoResource[];
  onVideoClick: (video: VideoResource) => void;
  className?: string;
  maxHeight?: number;
  spacing?: string;
  /**
   * Whether to pause marquee animation on hover (mobile only)
   * @default true
   */
  pauseOnHover?: boolean;
  /**
   * Number of times to repeat the content in marquee (mobile only)
   * @default 4
   */
  marqueeRepeat?: number;
}

export function PortfolioGallery({
  title = "Intelligence Archive",
  videos,
  onVideoClick,
  className = "",
  maxHeight = 120,
  spacing = "-space-x-72 md:-space-x-80",
  pauseOnHover = true,
  marqueeRepeat = 4
}: PortfolioGalleryProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  
  return (
    <section
      aria-label={title}
      className={`relative py-12 px-4 ${className}`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Desktop 3D overlapping layout - hidden on mobile */}
        <div className="hidden md:block relative overflow-hidden h-[450px]">
          <div className={`flex ${spacing} pb-8 pt-40 items-end justify-center`}>
            {videos.map((video, index) => {
              const totalVideos = videos.length
              const middle = Math.floor(totalVideos / 2)
              const distanceFromMiddle = Math.abs(index - middle)
              const staggerOffset = maxHeight - distanceFromMiddle * 20

              const zIndex = totalVideos - index

              const isHovered = hoveredIndex === index
              const isOtherHovered = hoveredIndex !== null && hoveredIndex !== index

              // When hovering: hovered card moves to consistent top position, others move to baseline
              const yOffset = isHovered ? -140 : isOtherHovered ? 0 : -staggerOffset

              return (
                <motion.div
                  key={video.id}
                  className="group cursor-pointer flex-shrink-0"
                  style={{
                    zIndex: zIndex,
                  }}
                  initial={{
                    transform: `perspective(5000px) rotateY(-45deg) translateY(200px)`,
                    opacity: 0,
                  }}
                  animate={{
                    transform: `perspective(5000px) rotateY(-45deg) translateY(${yOffset}px)`,
                    opacity: 1,
                  }}
                  transition={{
                    duration: 0.3,
                    delay: index * 0.05,
                    ease: [0.23, 1, 0.32, 1],
                  }}
                  onHoverStart={() => setHoveredIndex(index)}
                  onHoverEnd={() => setHoveredIndex(null)}
                  onClick={() => onVideoClick(video)}
                >
                  <div
                    className="relative aspect-video w-64 md:w-80 lg:w-96 rounded-2xl overflow-hidden border border-white/10 transition-all duration-500 group-hover:border-emerald-500/50 group-hover:shadow-[0_0_30px_rgba(16,185,129,0.2)]"
                    style={{
                      boxShadow: `
                        rgba(0, 0, 0, 0.01) 0.796192px 0px 0.796192px 0px,
                        rgba(0, 0, 0, 0.03) 2.41451px 0px 2.41451px 0px,
                        rgba(0, 0, 0, 0.08) 6.38265px 0px 6.38265px 0px,
                        rgba(0, 0, 0, 0.25) 20px 0px 20px 0px
                      `,
                    }}
                  >
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                      <p className="text-emerald-400 text-[10px] font-black uppercase tracking-widest mb-1">{video.category}</p>
                      <h4 className="text-white font-heading font-bold text-sm leading-tight">{video.title}</h4>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Mobile marquee layout */}
        <div className="block md:hidden relative pb-8">
          <div
            className={cn(
              "group flex overflow-hidden p-2 [--duration:40s] [--gap:1rem] [gap:var(--gap)]",
              "flex-row"
            )}
          >
            {Array(marqueeRepeat)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    "flex shrink-0 justify-around [gap:var(--gap)]",
                    "animate-marquee flex-row",
                    {
                      "group-hover:[animation-play-state:paused]": pauseOnHover,
                    }
                  )}
                >
                  {videos.map((video) => (
                    <div
                      key={`${i}-${video.id}`}
                      className="group cursor-pointer flex-shrink-0"
                      onClick={() => onVideoClick(video)}
                    >
                      <div
                        className="relative aspect-video w-64 rounded-xl overflow-hidden border border-white/10"
                      >
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  )
}
