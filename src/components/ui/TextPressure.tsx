import React, { useEffect, useRef } from 'react';

interface TextPressureProps {
  text: string;
  className?: string;
}

export const TextPressure: React.FC<TextPressureProps> = ({ text, className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const spansRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    if (!document.getElementById('roboto-flex-font')) {
      const style = document.createElement('style');
      style.id = 'roboto-flex-font';
      style.innerHTML = `
        @import url('https://fonts.googleapis.com/css2?family=Roboto+Flex:opsz,slnt,wdth,wght@8..144,-10..0,25..151,100..1000&display=swap');
        .text-pressure-font {
          font-family: 'Roboto Flex', sans-serif;
        }
      `;
      document.head.appendChild(style);
    }

    let animationFrameId: number;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const updateTypography = () => {
      if (!containerRef.current) return;
      
      const maxDistance = 300;

      spansRef.current.forEach((span) => {
        if (!span) return;

        const rect = span.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const dx = mouseX - centerX;
        const dy = mouseY - centerY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        const pressure = Math.max(0, 1 - distance / maxDistance);

        // Map pressure to font variations
        // Weight: 100 to 900
        const wght = 100 + pressure * 800;
        // Width: 50 to 150
        const wdth = 50 + pressure * 100;
        // Slant: 0 to -10 (Roboto Flex uses negative for slant)
        const slnt = pressure * -10;

        span.style.fontVariationSettings = `"wght" ${wght}, "wdth" ${wdth}, "slnt" ${slnt}`;
      });

      animationFrameId = requestAnimationFrame(updateTypography);
    };

    updateTypography();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div ref={containerRef} className={`flex text-pressure-font ${className}`}>
      {text.split('').map((char, index) => (
        <span
          key={index}
          ref={(el) => (spansRef.current[index] = el)}
          className="transition-none whitespace-pre"
          style={{ fontVariationSettings: '"wght" 100, "wdth" 50, "slnt" 0' }}
        >
          {char}
        </span>
      ))}
    </div>
  );
};
