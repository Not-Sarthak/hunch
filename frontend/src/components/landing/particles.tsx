import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  update: () => void;
  draw: (ctx: CanvasRenderingContext2D) => void;
}

class ParticleImpl implements Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  private targetAlpha: number;

  constructor(private canvas: HTMLCanvasElement) {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.vx = (Math.random() - 0.5) * 0.2;
    this.vy = (Math.random() - 0.5) * 0.2;
    this.radius = Math.random() * 1.5 + 0.5;
    this.alpha = 0;
    this.targetAlpha = Math.random() * 0.5 + 0.2;
  }

  update(): void {
    this.x += this.vx;
    this.y += this.vy;

    const diff = this.targetAlpha - this.alpha;
    if (Math.abs(diff) > 0.01) {
      this.alpha += diff * 0.05;
    }

    if (this.x < 0 || this.x > this.canvas.width) this.vx = -this.vx;
    if (this.y < 0 || this.y > this.canvas.height) this.vy = -this.vy;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(111, 219, 181, ${this.alpha})`;
    ctx.fill();
  }
}

export const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);

    const particles: Particle[] = Array.from(
      { length: 20 },
      () => new ParticleImpl(canvas)
    );

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.update();
        p.draw(ctx);
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", setCanvasSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10"
    />
  );
};
