import { useEffect, useRef, ReactNode, CSSProperties } from "react";

type AnimationType = "fade-up" | "fade-down" | "fade-left" | "fade-right" | "zoom-in" | "zoom-out" | "flip-up";

interface ScrollRevealProps {
  children: ReactNode;
  animation?: AnimationType;
  delay?: number;        // ms
  duration?: number;     // ms
  threshold?: number;    // 0–1
  once?: boolean;
  className?: string;
  style?: CSSProperties;
}

const getInitialTransform = (animation: AnimationType): string => {
  switch (animation) {
    case "fade-up":    return "translateY(40px)";
    case "fade-down":  return "translateY(-40px)";
    case "fade-left":  return "translateX(40px)";
    case "fade-right": return "translateX(-40px)";
    case "zoom-in":    return "scale(0.85)";
    case "zoom-out":   return "scale(1.12)";
    case "flip-up":    return "perspective(600px) rotateX(20deg) translateY(30px)";
    default:           return "translateY(40px)";
  }
};

export const ScrollReveal = ({
  children,
  animation = "fade-up",
  delay = 0,
  duration = 700,
  threshold = 0.15,
  once = true,
  className = "",
  style,
}: ScrollRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Hidden initial state via inline style
    el.style.opacity = "0";
    el.style.transform = getInitialTransform(animation);
    el.style.transition = `opacity ${duration}ms cubic-bezier(.22,1,.36,1) ${delay}ms, transform ${duration}ms cubic-bezier(.22,1,.36,1) ${delay}ms`;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = "1";
          el.style.transform = "none";
          if (once) observer.unobserve(el);
        } else if (!once) {
          el.style.opacity = "0";
          el.style.transform = getInitialTransform(animation);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [animation, delay, duration, threshold, once]);

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
};

export default ScrollReveal;
