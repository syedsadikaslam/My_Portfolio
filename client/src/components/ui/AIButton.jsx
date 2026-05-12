

import React from 'react';

const AIButton = ({ children, className = "" }) => {
  return (
    <div className={`relative inline-block group cursor-pointer ${className}`}>
      {/* 1. Subtle Outer Glow (Hover Only) */}
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-500 rounded-full blur-md opacity-0 group-hover:opacity-50 transition duration-500"></div>

      {/* 2. The Main Border Container */}
      <div className="relative p-[1.5px] rounded-full overflow-hidden bg-zinc-800">
        
        {/* Animated Gradient Background (Border) */}
        <div className="absolute inset-0 w-[200%] h-[200%] animate-[spin_4s_linear_infinite] opacity-100 bg-[conic-gradient(from_0deg,#1e40af,#a855f7,#ef4444,#f97316,#22c55e,#1e40af)] [margin:-50%] group-hover:animate-[spin_2s_linear_infinite]"></div>

        {/* 3. The Inner Background (Dark Layer) */}
        <div className="relative px-1 py-0.5 bg-zinc-950 rounded-full flex items-center justify-center overflow-hidden">
          
          {/* Top Edge Highlight (3D Effect) */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

          {/* User's Original Content (Link or Button) */}
          <div className="relative z-10 transition-transform duration-300 group-hover:scale-[1.02]">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIButton;