'use client';

import { LEVELS } from '@/lib/levels';
import { useGameStore } from '@/lib/store';
import Link from 'next/link';
import { Lock, CheckCircle2, ChevronRight, Trophy, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function QuestMap() {
  const { unlockedLevels, completedNodes } = useGameStore();
  const [mounted, setMounted] = useState(false);
  const [hoveredLockedLevel, setHoveredLockedLevel] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Determine achievements based on level progress
  const hasContrastBadge = completedNodes['level-1-practice'];
  const hasCIBadge = completedNodes['level-4-practice'];

  const totalLevels = LEVELS.length;
  const highestUnlocked = Math.min(unlockedLevels, totalLevels - 1);
  const progressPercentage = (highestUnlocked / (totalLevels - 1)) * 100;

  return (
    <div className="animate-slide-up max-w-3xl m-auto py-12">
      
      {/* Header */}
      <div className="flex flex-col items-center text-center mb-16">
        <div className="flex items-center gap-2 px-4 py-1 rounded-full border border-subtle bg-surface mb-6 text-accent text-xs font-semibold uppercase tracking-widest">
          <Sparkles size={14} /> Interactive Curriculum
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Design System Quest
        </h1>
        <p className="text-lg text-secondary max-w-lg">
          From "never touched a design system" to "built, governed, and made one agent-readable."
        </p>
      </div>

      {/* Achievements / Trophy Case - Now Sleek & Horizontal */}
      <div className="surface p-4 mb-16 flex flex-col sm:flex-row items-center gap-6 justify-center">
        <div className="flex items-center gap-3 text-tertiary border-r border-subtle pr-6">
          <Trophy size={20} className="text-warning" />
          <span className="text-sm font-semibold uppercase tracking-wider">Trophies</span>
        </div>
        
        <div className="flex gap-4 flex-wrap">
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-sm border ${hasContrastBadge ? 'border-success text-success bg-success-bg' : 'border-subtle text-tertiary'}`}>
            {hasContrastBadge ? <CheckCircle2 size={14} /> : <Lock size={14} />} 
            <span className="text-sm font-medium">Contrast Champ</span>
          </div>
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-sm border ${hasCIBadge ? 'border-success text-success bg-success-bg' : 'border-subtle text-tertiary'}`}>
            {hasCIBadge ? <CheckCircle2 size={14} /> : <Lock size={14} />} 
            <span className="text-sm font-medium">Pipeline Pioneer</span>
          </div>
        </div>
      </div>

      {/* The Map / Timeline */}
      <div className="relative flex flex-col gap-8">
        
        {/* Background Track Line */}
        <div 
          className="absolute left-8 top-8 bottom-8 w-px bg-border-strong z-0 hidden sm:block" 
        />

        {/* Active Progress Line */}
        <div 
          className="absolute left-8 top-8 w-px bg-accent z-0 transition-all duration-1000 ease-out hidden sm:block"
          style={{ height: `calc(${progressPercentage}% - 2rem)` }}
        />

        {LEVELS.map((level, i) => {
          const isUnlocked = i <= unlockedLevels;
          const isCompleted = completedNodes[`${level.id}-boss`]; 

          return (
            <div key={level.id} className="relative z-10 flex flex-col sm:flex-row gap-6 group">
              
              {/* Node Indicator Container */}
              <div className="hidden sm:flex justify-center w-16 flex-shrink-0 relative">
                {/* Node Orb */}
                <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-colors duration-300 ${
                    isCompleted ? 'bg-success-bg border-success text-success' : 
                    isUnlocked ? 'bg-surface border-accent text-accent' : 
                    'bg-surface border-subtle text-tertiary'
                  }`}>
                  {isCompleted ? <CheckCircle2 size={24} /> : !isUnlocked ? <Lock size={20} /> : level.icon}
                </div>
              </div>

              {/* Node Card */}
              <div className="flex-1 relative">
                <Link 
                  href={isUnlocked ? `/level/${level.id}` : '#'} 
                  onClick={(e) => {
                    if (!isUnlocked) {
                      e.preventDefault();
                      setHoveredLockedLevel(level.id);
                    }
                  }}
                  onMouseLeave={() => setHoveredLockedLevel(null)}
                  className="block w-full"
                >
                  <div className={`surface p-6 flex justify-between items-center transition-all duration-300 ${isUnlocked ? 'surface-hover cursor-pointer' : 'opacity-70 border-dashed cursor-not-allowed'}`}>
                    <div>
                      <div className={`text-xs font-bold uppercase tracking-wider mb-2 ${isUnlocked ? 'text-accent' : 'text-tertiary'}`}>
                        Level {i} • {level.rank}
                      </div>
                      <h2 className={`text-xl mb-1 ${isUnlocked ? 'text-primary' : 'text-secondary'}`}>
                        {level.title}
                      </h2>
                      <p className={`text-sm ${isUnlocked ? 'text-secondary' : 'text-tertiary'}`}>
                        {level.description}
                      </p>
                    </div>
                    
                    {isUnlocked ? (
                      <div className="w-10 h-10 rounded-full bg-surface border border-subtle flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-black transition-colors">
                        <ChevronRight size={20} />
                      </div>
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-surface border border-subtle flex items-center justify-center text-tertiary">
                        <Lock size={16} />
                      </div>
                    )}
                  </div>
                </Link>

                {/* Locked Tooltip */}
                {!isUnlocked && hoveredLockedLevel === level.id && (
                  <div className="absolute -top-12 left-0 right-0 flex justify-center animate-slide-up z-20 pointer-events-none">
                    <div className="bg-white text-black px-4 py-2 rounded-md text-xs font-medium shadow-md">
                      Complete Level {i - 1} to unlock this module.
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
