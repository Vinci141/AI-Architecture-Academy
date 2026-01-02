
import React from 'react';
import { ArchitectureType, ARCHITECTURE_ROADMAP } from '../types';
import { Icons } from '../constants';

interface RoadmapProps {
  current: ArchitectureType;
}

export const Roadmap: React.FC<RoadmapProps> = ({ current }) => {
  const currentIndex = ARCHITECTURE_ROADMAP.indexOf(current);

  return (
    <div className="w-full py-8 px-4 overflow-x-auto">
      <div className="flex items-center min-w-max gap-4 px-8">
        {ARCHITECTURE_ROADMAP.map((type, idx) => {
          const isCompleted = idx < currentIndex;
          const isActive = idx === currentIndex;
          
          return (
            <React.Fragment key={type}>
              <div className="flex flex-col items-center group relative">
                <div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                    isActive 
                      ? 'bg-emerald-500 border-emerald-400 text-white shadow-[0_0_15px_rgba(16,185,129,0.4)] scale-110' 
                      : isCompleted 
                        ? 'bg-emerald-900/50 border-emerald-600 text-emerald-400' 
                        : 'bg-zinc-900 border-zinc-700 text-zinc-500'
                  }`}
                >
                  {isCompleted ? <Icons.Check /> : <span>{idx + 1}</span>}
                </div>
                <div className={`mt-3 text-[10px] font-bold uppercase tracking-tighter text-center w-24 leading-tight ${
                  isActive ? 'text-white' : 'text-zinc-600'
                }`}>
                  {type.split(' ')[0]}
                </div>
                
                {/* Tooltip on hover */}
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-zinc-800 text-white px-3 py-1.5 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-zinc-700 z-50">
                  {type}
                </div>
              </div>
              {idx < ARCHITECTURE_ROADMAP.length - 1 && (
                <div className={`h-[2px] w-12 rounded-full ${
                  idx < currentIndex ? 'bg-emerald-600' : 'bg-zinc-800'
                }`} />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
