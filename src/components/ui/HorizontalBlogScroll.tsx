import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { Blog } from "@/data/blogsData";

gsap.registerPlugin(ScrollTrigger);

interface Props {
  blogs: Blog[];
  onSelect: (blog: Blog) => void;
}

export function HorizontalBlogScroll({ blogs, onSelect }: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    // Safety delay — gives React time to fully paint the DOM so widths are accurate
    const timer = setTimeout(() => {
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track) return;

      const totalScroll = track.scrollWidth - window.innerWidth;
      if (totalScroll <= 0) return; // nothing to scroll

      const ctx = gsap.context(() => {
        // Animate all cards into view with a stagger as they enter the horizontal viewport
        gsap.fromTo(
          track.querySelectorAll(".blog-h-card"),
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.08,
            ease: "power3.out",
            delay: 0.1,
          }
        );

        // Pin + horizontal scroll
        gsap.to(track, {
          x: () => -totalScroll,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            pin: true,
            scrub: 1.2,
            start: "top top",
            end: () => `+=${totalScroll}`,
            invalidateOnRefresh: true,
          },
        });
      }, section);

      return () => ctx.revert();
    }, 150);

    return () => clearTimeout(timer);
  }, [blogs]);

  return (
    <div
      ref={sectionRef}
      className="relative overflow-hidden bg-[#05070a]"
    >
      {/* Section header */}
      <div className="absolute top-0 left-0 w-full z-20 pt-10 pb-6 px-10 pointer-events-none select-none">
        <span className="text-cyan-400 text-xs font-bold tracking-widest uppercase">
          Complete Library
        </span>
        <h2 className="text-3xl md:text-4xl font-black mt-1 text-white">
          All Articles{" "}
          <span className="text-white/20 text-xl font-medium">
            — scroll to explore →
          </span>
        </h2>
      </div>

      {/* Horizontal track */}
      <div
        ref={trackRef}
        className="flex items-center gap-6 px-10 will-change-transform"
        style={{ paddingTop: "130px", paddingBottom: "60px" }}
      >
        {blogs.map((blog, i) => (
          <BlogCard key={blog.id} blog={blog} index={i} onSelect={onSelect} />
        ))}

        {/* End cap */}
        <div className="flex-shrink-0 w-56 h-[440px] rounded-3xl border border-white/5 flex flex-col items-center justify-center gap-3 text-white/20 mx-4">
          <span className="text-5xl">📚</span>
          <p className="text-sm font-semibold text-center px-4 leading-snug">
            You've explored all articles!
          </p>
        </div>
      </div>

      {/* Right-edge fade hint */}
      <div className="absolute top-0 right-0 h-full w-28 pointer-events-none bg-gradient-to-l from-[#05070a] to-transparent z-10" />
      {/* Left-edge fade */}
      <div className="absolute top-0 left-0 h-full w-10 pointer-events-none bg-gradient-to-r from-[#05070a] to-transparent z-10" />
    </div>
  );
}

/* ── Individual Card ── */
function BlogCard({
  blog,
  index,
  onSelect,
}: {
  blog: Blog;
  index: number;
  onSelect: (b: Blog) => void;
}) {
  return (
    <div
      className="blog-h-card flex-shrink-0 w-[320px] md:w-[360px] h-[460px] rounded-3xl overflow-hidden border border-white/8 bg-[#0f1218] cursor-pointer group relative flex flex-col"
      style={{ opacity: 0 }} // GSAP will animate to opacity:1
      onClick={() => onSelect(blog)}
    >
      {/* Image */}
      <div className="relative h-[200px] overflow-hidden flex-shrink-0">
        <img
          src={blog.image}
          alt={blog.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f1218] via-[#0f1218]/10 to-transparent" />
        <span className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-cyan-400 text-[10px] font-bold px-3 py-1 rounded-full border border-cyan-400/30 uppercase tracking-wider">
          {blog.is_user_blog ? "👤 Community" : blog.category}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        <div className="flex gap-3 text-[11px] text-white/30 mb-3">
          <span className="flex items-center gap-1">
            <Calendar size={10} />
            {blog.date}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Clock size={10} />
            {blog.readTime}
          </span>
        </div>

        <h3 className="font-bold text-[15px] leading-snug mb-2 line-clamp-2 group-hover:text-cyan-400 transition-colors duration-300">
          {blog.title}
        </h3>

        <p className="text-[13px] text-white/40 line-clamp-3 flex-1 leading-relaxed">
          {blog.excerpt}
        </p>

        {/* Footer */}
        <div className="mt-4 pt-4 border-t border-white/8 flex items-center justify-between">
          <span className="text-xs text-white/30 truncate max-w-[60%]">
            {blog.author}
          </span>
          <span className="flex items-center gap-1 text-cyan-400 text-[11px] font-bold uppercase tracking-wide">
            Read <ArrowRight size={12} />
          </span>
        </div>
      </div>

      {/* Hover glow border */}
      <div className="absolute inset-0 rounded-3xl border border-cyan-400/0 group-hover:border-cyan-400/40 transition-all duration-500 pointer-events-none" />
    </div>
  );
}
