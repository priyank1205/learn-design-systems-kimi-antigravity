'use client';

import { useGameStore, RANKS } from '@/lib/store';
import { LEVELS } from '@/lib/levels';
import { Trophy, Star, Flame, CheckCircle2, Lock, ArrowLeft, Download, Eye } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function ProfilePage() {
  const { xp, streak, getRank, unlockedLevels, completedNodes } = useGameStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const currentRank = getRank();
  const currentRankIndex = RANKS.indexOf(currentRank);
  const nextRank = RANKS[Math.min(currentRankIndex + 1, RANKS.length - 1)];
  const progressToNextRank = ((unlockedLevels + 1) / RANKS.length) * 100;

  return (
    <div className="animate-slide-up max-w-4xl mx-auto py-8">
      <Link href="/" className="inline-flex items-center gap-2 text-secondary hover:text-primary transition-colors mb-8">
        <ArrowLeft size={16} /> Back to Map
      </Link>

      <div className="flex flex-col md:flex-row gap-8 mb-16 items-start">
        {/* Stats Column */}
        <div className="surface p-8 flex-1 w-full">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 rounded-full bg-surface-hover border border-subtle flex items-center justify-center">
              <Trophy size={32} className="text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold mb-1">{currentRank}</h1>
              <p className="text-secondary text-sm">Design System Explorer</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-base p-4 rounded-md border border-subtle">
              <div className="text-secondary text-xs font-semibold uppercase tracking-wider mb-2">Total XP</div>
              <div className="flex items-center gap-2 text-2xl font-bold text-accent">
                <Star size={24} /> {xp}
              </div>
            </div>
            <div className="bg-base p-4 rounded-md border border-subtle">
              <div className="text-secondary text-xs font-semibold uppercase tracking-wider mb-2">Current Streak</div>
              <div className="flex items-center gap-2 text-2xl font-bold text-warning">
                <Flame size={24} /> {streak}
              </div>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-sm mb-2 font-medium">
              <span className="text-secondary">Rank Progress</span>
              <span className="text-primary">Next: {nextRank}</span>
            </div>
            <div className="w-full h-2 bg-base rounded-full overflow-hidden border border-subtle">
              <div 
                className="h-full bg-primary transition-all duration-1000 ease-out" 
                style={{ width: `${progressToNextRank}%` }}
              />
            </div>
          </div>
        </div>

        {/* Artifact Vault Column */}
        <div className="flex-[2] w-full">
          <div className="mb-8">
            <h2 className="text-2xl font-bold flex items-center gap-2 mb-2">
              Portfolio Vault
            </h2>
            <p className="text-secondary">
              Artifacts you've built and verified are stored here for your final portfolio.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {LEVELS.map(level => {
              const isBossCompleted = completedNodes[`${level.id}-boss`];
              return (
                <div key={level.id} className={`surface p-6 flex items-center gap-4 transition-all duration-300 ${isBossCompleted ? 'surface-hover' : 'opacity-60'}`}>
                  <div className={`w-12 h-12 rounded-lg flex flex-shrink-0 items-center justify-center border ${
                    isBossCompleted ? 'bg-success-bg border-success text-success' : 'bg-base border-dashed border-subtle text-tertiary'
                  }`}>
                    {isBossCompleted ? <CheckCircle2 size={24} /> : <Lock size={20} />}
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg mb-1">{level.title} Artifact</h4>
                    <p className="text-sm text-secondary">
                      {isBossCompleted ? 'Verified and securely stored in your portfolio.' : 'Defeat the boss to unlock and store this artifact.'}
                    </p>
                  </div>
                  
                  {isBossCompleted && (
                    <div className="flex gap-2">
                       <button className="btn btn-secondary">
                         <Eye size={16} />
                       </button>
                       <button className="btn btn-primary">
                         <Download size={16} />
                       </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
