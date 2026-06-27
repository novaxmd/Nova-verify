import { useEffect, useRef } from 'react';

const TechBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    setCanvasSize();

    interface Particle {
      x: number;
      y: number;
      radius: number;
      vx: number;
      vy: number;
      alpha: number;
      color: string;
    }

    const particles: Particle[] = [];

    // Create particles with blue and green colors
    for (let i = 0; i < 80; i++) {
      const isBlue = Math.random() > 0.4;
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 0.5,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        alpha: Math.random() * 0.6 + 0.2,
        color: isBlue ? '59, 130, 246' : '34, 197, 94',
      });
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(7, 10, 18, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, i) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Draw particle with glow
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.radius * 3
        );
        gradient.addColorStop(0, `rgba(${particle.color}, ${particle.alpha})`);
        gradient.addColorStop(1, `rgba(${particle.color}, 0)`);

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius * 3, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${particle.color}, ${particle.alpha})`;
        ctx.fill();

        // Connect nearby particles
        particles.slice(i + 1).forEach((other) => {
          const dx = particle.x - other.x;
          const dy = particle.y - other.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(59, 130, 246, ${0.1 * (1 - distance / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(animate);
    };

    // Clear canvas initially
    ctx.fillStyle = 'rgba(7, 10, 18, 1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    animate();

    window.addEventListener('resize', setCanvasSize);
    return () => window.removeEventListener('resize', setCanvasSize);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      {/* Aurora gradient blobs */}
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-primary/20 blur-[120px] animate-pulse-glow" />
      <div className="absolute top-1/3 -right-40 w-[450px] h-[450px] rounded-full bg-secondary/15 blur-[120px] animate-pulse-glow" style={{ animationDelay: '1.2s' }} />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-primary/10 blur-[100px] animate-pulse-glow" style={{ animationDelay: '2.4s' }} />

      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  );
};

export default TechBackground;
