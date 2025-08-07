'use client';

import { useEffect, useState } from 'react';

export function AnimatedGrid() {
  const [activeNodes, setActiveNodes] = useState<Set<string>>(new Set());

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveNodes(prev => {
        const newSet = new Set(prev);
        
        // Remove some nodes
        const nodeArray = Array.from(newSet);
        nodeArray.slice(0, Math.floor(nodeArray.length * 0.3)).forEach(node => {
          newSet.delete(node);
        });
        
        // Add new random nodes
        for (let i = 0; i < 3; i++) {
          const x = Math.floor(Math.random() * 20);
          const y = Math.floor(Math.random() * 15);
          newSet.add(`${x}-${y}`);
        }
        
        return newSet;
      });
    }, 800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 opacity-20 pointer-events-none">
      {/* Main Grid Pattern */}
      <svg className="w-full h-full" style={{ background: 'transparent' }}>
        <defs>
          <pattern
            id="grid"
            width="60"
            height="60"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 60 0 L 0 0 0 60"
              fill="none"
              stroke="rgb(34 197 94 / 0.1)"
              strokeWidth="0.5"
            />
          </pattern>
          
          <pattern
            id="dots"
            width="30"
            height="30"
            patternUnits="userSpaceOnUse"
          >
            <circle
              cx="15"
              cy="15"
              r="1"
              fill="rgb(34 197 94 / 0.15)"
            />
          </pattern>
          
          <linearGradient id="gridFade" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor="rgb(34 197 94 / 0.05)" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
        
        <rect width="100%" height="100%" fill="url(#grid)" />
        <rect width="100%" height="100%" fill="url(#dots)" />
        <rect width="100%" height="100%" fill="url(#gridFade)" />
      </svg>

      {/* Animated Data Flow Lines */}
      <div className="absolute inset-0">
        {/* Horizontal Flow Lines */}
        {[20, 40, 60, 80].map((top, index) => (
          <div
            key={`h-${index}`}
            className="absolute w-full h-px bg-gradient-to-r from-transparent via-green-400/30 to-transparent"
            style={{ 
              top: `${top}%`,
              animation: `flow-horizontal 8s linear infinite`,
              animationDelay: `${index * 2}s`
            }}
          />
        ))}
        
        {/* Vertical Flow Lines */}
        {[15, 35, 55, 75, 85].map((left, index) => (
          <div
            key={`v-${index}`}
            className="absolute w-px h-full bg-gradient-to-b from-transparent via-green-400/30 to-transparent"
            style={{ 
              left: `${left}%`,
              animation: `flow-vertical 6s linear infinite`,
              animationDelay: `${index * 1.5}s`
            }}
          />
        ))}
      </div>

      {/* Active Grid Nodes */}
      <div className="absolute inset-0">
        {Array.from({ length: 20 }, (_, x) =>
          Array.from({ length: 15 }, (_, y) => {
            const nodeKey = `${x}-${y}`;
            const isActive = activeNodes.has(nodeKey);
            
            return (
              <div
                key={nodeKey}
                className={`absolute w-2 h-2 rounded-full transition-all duration-500 ${
                  isActive 
                    ? 'bg-green-400 shadow-lg shadow-green-400/50 scale-150' 
                    : 'bg-gray-600/30 scale-75'
                }`}
                style={{
                  left: `${(x / 19) * 100}%`,
                  top: `${(y / 14) * 100}%`,
                  transform: 'translate(-50%, -50%)',
                }}
              />
            );
          })
        )}
      </div>

      {/* Circuit Board Style Elements */}
      <div className="absolute top-10 left-10">
        <svg width="200" height="100" className="opacity-30">
          <path
            d="M 0 20 Q 50 20 50 50 T 100 50 Q 150 50 150 80 T 200 80"
            stroke="rgb(34 197 94 / 0.4)"
            strokeWidth="2"
            fill="none"
            strokeDasharray="5,5"
            className="animate-pulse"
          />
          <circle cx="50" cy="50" r="3" fill="rgb(34 197 94)" className="animate-ping" />
          <circle cx="150" cy="80" r="3" fill="rgb(34 197 94)" className="animate-ping" style={{ animationDelay: '1s' }} />
        </svg>
      </div>

      <div className="absolute bottom-10 right-10">
        <svg width="150" height="80" className="opacity-30">
          <path
            d="M 0 40 L 30 40 L 30 20 L 60 20 L 60 60 L 90 60 L 90 40 L 120 40 L 120 20 L 150 20"
            stroke="rgb(34 197 94 / 0.4)"
            strokeWidth="2"
            fill="none"
            strokeDasharray="3,3"
            className="animate-pulse"
          />
          <circle cx="30" cy="20" r="2" fill="rgb(34 197 94)" className="animate-ping" style={{ animationDelay: '2s' }} />
          <circle cx="90" cy="60" r="2" fill="rgb(34 197 94)" className="animate-ping" style={{ animationDelay: '0.5s' }} />
        </svg>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes flow-horizontal {
          0% { transform: translateX(-100%); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateX(100vw); opacity: 0; }
        }
        
        @keyframes flow-vertical {
          0% { transform: translateY(-100%); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
      `}</style>
    </div>
  );
} 