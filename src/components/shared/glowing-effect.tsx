import { useEffect, useRef } from "react";

interface GlowingEffectProps {
  spread?: number;
  glow?: boolean;
  disabled?: boolean;
  proximity?: number;
  inactiveZone?: number;
  borderWidth?: number;
}

export function GlowingEffect({
  spread = 40,
  glow = true,
  disabled = false,
  proximity = 64,
  inactiveZone = 0.01,
  borderWidth = 1,
}: GlowingEffectProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mousePosition = useRef({ x: 0, y: 0 });
  const animationFrameId = useRef<number | null>(null);

  useEffect(() => {
    if (disabled) return;

    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mousePosition.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleMouseLeave = () => {
      mousePosition.current = { x: -100, y: -100 };
    };

    document.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    startAnimation();

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [disabled, spread, glow, proximity, inactiveZone, borderWidth]);

  const startAnimation = () => {
    const container = containerRef.current;
    if (!container) return;

    const render = () => {
      if (!container) return;

      const { width, height } = container.getBoundingClientRect();
      const { x, y } = mousePosition.current;

      // Calculate distance from mouse to center of container
      const centerX = width / 2;
      const centerY = height / 2;
      const distanceFromCenter = Math.sqrt(
        Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2)
      );

      // Only apply effect if mouse is close enough to the container
      if (distanceFromCenter < proximity) {
        const gradientX = ((x / width) * 100).toFixed(2);
        const gradientY = ((y / height) * 100).toFixed(2);

        // Apply gradient effect
        container.style.background = glow
          ? `radial-gradient(${spread}rem circle at ${gradientX}% ${gradientY}%, hsl(var(--primary) / 0.15), transparent ${inactiveZone}%)`
          : "none";

        // Apply border effect
        container.style.border = `${borderWidth}px solid hsl(var(--primary) / 0.5)`;
      } else {
        container.style.background = "none";
        container.style.border = `${borderWidth}px solid transparent`;
      }

      animationFrameId.current = requestAnimationFrame(render);
    };

    render();
  };

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 rounded-[inherit] pointer-events-none"
    />
  );
}
