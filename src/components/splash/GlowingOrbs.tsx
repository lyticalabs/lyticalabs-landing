'use client';

import { useEffect, useState } from 'react';

interface Orb {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  direction: number;
  color: string;
  opacity: number;
}

export function GlowingOrbs() {
  const [orbs, setOrbs] = useState<Orb[]>([]);

  useEffect(() => {
    // Generate initial orbs
    const generateOrbs = (): Orb[] => {
      const colors = ['#22c55e', '#84cc16', '#10b981', '#34d399'];
      
      return Array.from({ length: 8 }, (_, index) => ({
        id: index,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 100 + 50,
        speed: Math.random() * 0.5 + 0.2,
        direction: Math.random() * Math.PI * 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: Math.random() * 0.3 + 0.1,
      }));
    };

    setOrbs(generateOrbs());

    // Animation loop
    const animateOrbs = () => {
      setOrbs(prevOrbs => 
        prevOrbs.map(orb => {
          let newX = orb.x + Math.cos(orb.direction) * orb.speed;
          let newY = orb.y + Math.sin(orb.direction) * orb.speed;
          let newDirection = orb.direction;

          // Bounce off screen edges
          if (newX <= 0 || newX >= window.innerWidth) {
            newDirection = Math.PI - orb.direction;
            newX = Math.max(0, Math.min(window.innerWidth, newX));
          }
          
          if (newY <= 0 || newY >= window.innerHeight) {
            newDirection = -orb.direction;
            newY = Math.max(0, Math.min(window.innerHeight, newY));
          }

          return {
            ...orb,
            x: newX,
            y: newY,
            direction: newDirection,
          };
        })
      );
    };

    const interval = setInterval(animateOrbs, 50);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {orbs.map((orb) => (
        <div
          key={orb.id}
          className="absolute rounded-full blur-xl transition-all duration-1000 ease-in-out"
          style={{
            left: `${orb.x}px`,
            top: `${orb.y}px`,
            width: `${orb.size}px`,
            height: `${orb.size}px`,
            backgroundColor: orb.color,
            opacity: orb.opacity,
            transform: 'translate(-50%, -50%)',
            background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
          }}
        />
      ))}
      
      {/* Additional Static Glow Effects */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-green-400/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-32 right-32 w-48 h-48 bg-lime-400/15 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-green-500/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '4s' }} />
      <div className="absolute bottom-20 left-1/3 w-56 h-56 bg-emerald-400/8 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
    </div>
  );
} 