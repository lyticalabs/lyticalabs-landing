'use client';

import { useEffect, useState } from 'react';

export function DataVisualization() {
  const [animationProgress, setAnimationProgress] = useState(0);
  const [dataPoints, setDataPoints] = useState<number[]>([65, 80, 45, 90, 75, 60, 85, 70]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Mark as client-side to prevent hydration mismatch
    setIsClient(true);
    
    // Generate random data points for animation
    const generateDataPoints = () => {
      return Array.from({ length: 20 }, () => Math.random() * 100);
    };

    setDataPoints(generateDataPoints());

    // Animate progress
    const interval = setInterval(() => {
      setAnimationProgress((prev) => (prev + 1) % 100);
      if (Math.random() > 0.8) {
        setDataPoints(generateDataPoints());
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  // Prevent hydration mismatch by not rendering dynamic content until client-side
  if (!isClient) {
    return (
      <div className="relative w-full h-80 sm:h-96 flex items-center justify-center">
        {/* Main Visualization Container */}
        <div className="relative w-80 h-80">
          
          {/* Central Glowing Core */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-lime-400 rounded-full blur-sm animate-pulse opacity-80" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-green-400 rounded-full" />
          </div>

          {/* Static Orbiting Data Nodes for SSR */}
          {[0, 1, 2, 3, 4, 5].map((index) => {
            const angle = index * 60 * (Math.PI / 180);
            const radius = 100;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            
            return (
              <div
                key={index}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                style={{
                  transform: `translate(${x.toFixed(2)}px, ${y.toFixed(2)}px)`,
                }}
              >
                <div className="w-3 h-3 bg-green-400 rounded-full shadow-lg shadow-green-400/50" />
                
                {/* Connection Lines */}
                <svg
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                  width="200"
                  height="200"
                  style={{ overflow: 'visible' }}
                >
                  <line
                    x1={-x.toFixed(2)}
                    y1={-y.toFixed(2)}
                    x2="0"
                    y2="0"
                    stroke="url(#lineGradient)"
                    strokeWidth="1"
                    opacity="0.6"
                  />
                  <defs>
                    <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#22c55e" stopOpacity="0" />
                      <stop offset="100%" stopColor="#22c55e" stopOpacity="0.8" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            );
          })}

          {/* Static content for SSR */}
          <div className="absolute -top-6 -right-6 sm:-top-8 sm:-right-8 z-30">
            <div className="bg-gray-900/80 backdrop-blur-sm border border-green-400/30 rounded-lg p-2 sm:p-3 min-w-24 sm:min-w-32">
              <div className="flex items-end gap-1 h-12">
                {dataPoints.slice(0, 8).map((point, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-t from-green-600 to-green-400 rounded-sm transition-all duration-500 flex-1 min-h-2"
                    style={{ height: `${Math.max((point / 100) * 100, 15)}%` }}
                  />
                ))}
              </div>
              <div className="text-xs text-green-400 mt-1 text-center">Real-time Analytics</div>
            </div>
          </div>

          <div className="absolute -bottom-6 -left-6 sm:-bottom-8 sm:-left-8 z-30">
            <div className="bg-gray-900/80 backdrop-blur-sm border border-green-400/30 rounded-lg p-2 sm:p-3">
              <div className="text-2xl font-bold text-green-400">85%</div>
              <div className="text-xs text-gray-400">Processing Rate</div>
            </div>
          </div>

          <div className="absolute -bottom-6 -right-6 sm:-bottom-8 sm:-right-8 z-30">
            <div className="bg-gray-900/80 backdrop-blur-sm border border-green-400/30 rounded-lg p-2 sm:p-3 flex flex-col items-center justify-center min-h-20 sm:min-h-24">
              <div className="relative w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 32 32">
                  <circle
                    cx="16"
                    cy="16"
                    r="12"
                    fill="none"
                    stroke="rgb(75 85 99 / 0.3)"
                    strokeWidth="4"
                  />
                  <circle
                    cx="16"
                    cy="16"
                    r="12"
                    fill="none"
                    stroke="url(#pieGradient1)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeDasharray="15 75.4"
                    className="transition-all duration-500"
                  />
                  <circle
                    cx="16"
                    cy="16"
                    r="12"
                    fill="none"
                    stroke="url(#pieGradient2)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeDasharray="12 75.4"
                    strokeDashoffset="-25"
                    className="transition-all duration-500"
                  />
                  <circle
                    cx="16"
                    cy="16"
                    r="12"
                    fill="none"
                    stroke="url(#pieGradient3)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeDasharray="8 75.4"
                    strokeDashoffset="-45"
                    className="transition-all duration-500"
                  />
                  
                  <defs>
                    <linearGradient id="pieGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#22c55e" />
                      <stop offset="100%" stopColor="#84cc16" />
                    </linearGradient>
                    <linearGradient id="pieGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#10b981" />
                      <stop offset="100%" stopColor="#34d399" />
                    </linearGradient>
                    <linearGradient id="pieGradient3" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#84cc16" />
                      <stop offset="100%" stopColor="#a3e635" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div className="text-xs text-green-400 text-center">Data Distribution</div>
            </div>
          </div>

          <svg className="absolute inset-0 w-full h-full transform -rotate-90 z-10" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="rgb(75 85 99 / 0.3)"
              strokeWidth="0.5"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="url(#progressGradient)"
              strokeWidth="0.5"
              strokeLinecap="round"
              strokeDasharray="0 283"
              className="transition-all duration-300"
            />
            <defs>
              <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#22c55e" />
                <stop offset="100%" stopColor="#84cc16" />
              </linearGradient>
            </defs>
          </svg>

          {/* Static Particle Effects */}
          {Array.from({ length: 12 }).map((_, index) => {
            const delay = index * 0.5;
            return (
              <div
                key={index}
                className="absolute w-1 h-1 bg-green-400 rounded-full animate-ping"
                style={{
                  top: `${20 + (index % 4) * 20}%`,
                  left: `${10 + (index % 6) * 15}%`,
                  animationDelay: `${delay}s`,
                  animationDuration: '3s',
                }}
              />
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-80 sm:h-96 flex items-center justify-center">
      {/* Main Visualization Container */}
      <div className="relative w-80 h-80">
        
        {/* Central Glowing Core */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-lime-400 rounded-full blur-sm animate-pulse opacity-80" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-green-400 rounded-full" />
        </div>

        {/* Orbiting Data Nodes */}
        {[0, 1, 2, 3, 4, 5].map((index) => {
          const angle = (index * 60 + animationProgress * 2) * (Math.PI / 180);
          const radius = 100 + Math.sin(animationProgress * 0.05 + index) * 20;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          
          return (
            <div
              key={index}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              style={{
                transform: `translate(${x.toFixed(2)}px, ${y.toFixed(2)}px)`,
              }}
            >
              <div className="w-3 h-3 bg-green-400 rounded-full shadow-lg shadow-green-400/50" />
              
              {/* Connection Lines */}
              <svg
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                width="200"
                height="200"
                style={{ overflow: 'visible' }}
              >
                <line
                  x1={-x.toFixed(2)}
                  y1={-y.toFixed(2)}
                  x2="0"
                  y2="0"
                  stroke="url(#lineGradient)"
                  strokeWidth="1"
                  opacity="0.6"
                />
                <defs>
                  <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#22c55e" stopOpacity="0" />
                    <stop offset="100%" stopColor="#22c55e" stopOpacity="0.8" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          );
        })}

        {/* Floating Data Charts */}
        <div className="absolute -top-6 -right-6 sm:-top-8 sm:-right-8 z-30">
          <div className="bg-gray-900/80 backdrop-blur-sm border border-green-400/30 rounded-lg p-2 sm:p-3 min-w-24 sm:min-w-32">
            <div className="flex items-end gap-1 h-12">
              {dataPoints.slice(0, 8).map((point, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-t from-green-600 to-green-400 rounded-sm transition-all duration-500 flex-1 min-h-2"
                  style={{ height: `${Math.max((point / 100) * 100, 15)}%` }}
                />
              ))}
            </div>
            <div className="text-xs text-green-400 mt-1">Real-time Analytics</div>
          </div>
        </div>

        {/* Data Metrics Display */}
        <div className="absolute -bottom-6 -left-6 sm:-bottom-8 sm:-left-8 z-30">
          <div className="bg-gray-900/80 backdrop-blur-sm border border-green-400/30 rounded-lg p-2 sm:p-3">
            <div className="text-2xl font-bold text-green-400">
              {Math.floor(85 + Math.sin(animationProgress * 0.1) * 10)}%
            </div>
            <div className="text-xs text-gray-400">Processing Rate</div>
          </div>
        </div>

        {/* Thick Line Pie Chart - Bottom Right */}
        <div className="absolute -bottom-6 -right-6 sm:-bottom-8 sm:-right-8 z-30">
          <div className="bg-gray-900/80 backdrop-blur-sm border border-green-400/30 rounded-lg p-2 sm:p-3 flex flex-col items-center justify-center min-h-20 sm:min-h-24">
            <div className="relative w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 32 32">
                {/* Background circle */}
                <circle
                  cx="16"
                  cy="16"
                  r="12"
                  fill="none"
                  stroke="rgb(75 85 99 / 0.3)"
                  strokeWidth="4"
                />
                
                {/* Data segments */}
                <circle
                  cx="16"
                  cy="16"
                  r="12"
                  fill="none"
                  stroke="url(#pieGradient1)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeDasharray={`${Math.sin(animationProgress * 0.05) * 10 + 15} 75.4`}
                  className="transition-all duration-500"
                />
                <circle
                  cx="16"
                  cy="16"
                  r="12"
                  fill="none"
                  stroke="url(#pieGradient2)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeDasharray={`${Math.cos(animationProgress * 0.07) * 8 + 12} 75.4`}
                  strokeDashoffset="-25"
                  className="transition-all duration-500"
                />
                <circle
                  cx="16"
                  cy="16"
                  r="12"
                  fill="none"
                  stroke="url(#pieGradient3)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeDasharray={`${Math.sin(animationProgress * 0.03 + 1) * 6 + 8} 75.4`}
                  strokeDashoffset="-45"
                  className="transition-all duration-500"
                />
                
                <defs>
                  <linearGradient id="pieGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#22c55e" />
                    <stop offset="100%" stopColor="#84cc16" />
                  </linearGradient>
                  <linearGradient id="pieGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#34d399" />
                  </linearGradient>
                  <linearGradient id="pieGradient3" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#84cc16" />
                    <stop offset="100%" stopColor="#a3e635" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="text-xs text-green-400 text-center">Data Distribution</div>
          </div>
        </div>

        {/* Circular Progress Ring */}
        <svg className="absolute inset-0 w-full h-full transform -rotate-90 z-10" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="rgb(75 85 99 / 0.3)"
            strokeWidth="0.5"
          />
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="url(#progressGradient)"
            strokeWidth="0.5"
            strokeLinecap="round"
            strokeDasharray={`${animationProgress * 2.83} 283`}
            className="transition-all duration-300"
          />
          <defs>
            <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#22c55e" />
              <stop offset="100%" stopColor="#84cc16" />
            </linearGradient>
          </defs>
        </svg>

        {/* Particle Effects */}
        {Array.from({ length: 12 }).map((_, index) => {
          const delay = index * 0.5;
          return (
            <div
              key={index}
              className="absolute w-1 h-1 bg-green-400 rounded-full animate-ping"
              style={{
                top: `${20 + (index % 4) * 20}%`,
                left: `${10 + (index % 6) * 15}%`,
                animationDelay: `${delay}s`,
                animationDuration: '3s',
              }}
            />
          );
        })}
      </div>
    </div>
  );
} 