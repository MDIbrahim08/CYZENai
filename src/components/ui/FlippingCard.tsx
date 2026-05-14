import React from "react";
import { cn } from "@/lib/utils";

interface FlippingCardProps {
  className?: string;
  height?: number | string;
  width?: number | string;
  frontContent?: React.ReactNode;
  backContent?: React.ReactNode;
}

export function FlippingCard({
  className,
  frontContent,
  backContent,
  height = "100%",
  width = "100%",
}: FlippingCardProps) {
  return (
    <div
      className="group/flipping-card [perspective:1000px] w-full"
      style={
        {
          "--height": typeof height === 'number' ? `${height}px` : height,
          "--width": typeof width === 'number' ? `${width}px` : width,
        } as React.CSSProperties
      }
    >
      <div
        className={cn(
          "relative rounded-2xl transition-all duration-700 [transform-style:preserve-3d] group-hover/flipping-card:[transform:rotateY(180deg)]",
          "h-[var(--height)] w-[var(--width)] min-h-[300px]",
          className
        )}
      >
        {/* Front Face */}
        <div 
          className="absolute inset-0 h-full w-full rounded-[inherit] bg-[#11111a] border border-white/10 [backface-visibility:hidden] z-20"
          style={{ transform: "rotateY(0deg)" }}
        >
          <div className="h-full w-full p-6 flex flex-col">
            {frontContent}
          </div>
        </div>

        {/* Back Face */}
        <div 
          className="absolute inset-0 h-full w-full rounded-[inherit] bg-[#11111a] border border-white/10 [backface-visibility:hidden] z-10"
          style={{ transform: "rotateY(180deg)" }}
        >
          <div className="h-full w-full p-6 flex flex-col justify-center items-center text-center">
            {backContent}
          </div>
        </div>
      </div>
    </div>
  );
}
