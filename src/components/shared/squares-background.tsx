import { useEffect, useRef } from "react";

interface SquaresProps {
  className?: string;
  direction?: "diagonal" | "horizontal" | "vertical";
  speed?: number;
  squareSize?: number;
  borderColor?: string;
  hoverFillColor?: string;
}

export function Squares({
  className = "",
  direction = "diagonal",
  speed = 1,
  squareSize = 20,
  borderColor = "#333",
  hoverFillColor = "#222",
}: SquaresProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mousePosition = useRef({ x: 0, y: 0 });
  const animationFrameId = useRef<number | null>(null);
  const squares = useRef<
    Array<{
      x: number;
      y: number;
      size: number;
      fillColor: string | null;
      transitionProgress: number;
      transitionDirection: "in" | "out";
    }>
  >([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const handleResize = () => {
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
      initSquares();
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mousePosition.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleMouseLeave = () => {
      mousePosition.current = { x: -100, y: -100 };
    };

    window.addEventListener("resize", handleResize);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    handleResize();
    startAnimation();

    return () => {
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [squareSize, borderColor, hoverFillColor]);

  const initSquares = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const { width, height } = canvas;
    const cols = Math.floor(width / squareSize);
    const rows = Math.floor(height / squareSize);

    squares.current = [];

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        squares.current.push({
          x: i * squareSize,
          y: j * squareSize,
          size: squareSize,
          fillColor: null,
          transitionProgress: 0,
          transitionDirection: "out",
        });
      }
    }
  };

  const startAnimation = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update squares based on mouse position
      squares.current.forEach((square) => {
        const dx = mousePosition.current.x - (square.x + square.size / 2);
        const dy = mousePosition.current.y - (square.y + square.size / 2);
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 100;

        if (distance < maxDistance) {
          if (square.transitionDirection === "out") {
            square.transitionDirection = "in";
          }
          square.transitionProgress = Math.min(
            square.transitionProgress + 0.1,
            1
          );
        } else {
          if (square.transitionDirection === "in") {
            square.transitionDirection = "out";
          }
          square.transitionProgress = Math.max(
            square.transitionProgress - 0.05,
            0
          );
        }

        // Draw square
        ctx.beginPath();
        ctx.rect(square.x, square.y, square.size, square.size);
        ctx.strokeStyle = borderColor;
        ctx.lineWidth = 1;

        if (square.transitionProgress > 0) {
          ctx.fillStyle = hoverFillColor;
          ctx.globalAlpha = square.transitionProgress * 0.5;
          ctx.fill();
          ctx.globalAlpha = 1;
        }

        ctx.stroke();
        ctx.closePath();
      });

      animationFrameId.current = requestAnimationFrame(render);
    };

    render();
  };

  return (
    <div ref={containerRef} className={className}>
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ display: "block" }}
      />
    </div>
  );
}
