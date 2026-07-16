'use client';

import { useGameStore, RANKS } from '@/lib/store';
import { LEVELS } from '@/lib/levels';
import { Trophy, Star, Flame, CheckCircle2, Lock, ArrowLeft, Download, Eye, Sparkles } from 'lucide-react';
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
    <div className="relative pt-8 pb-16 overflow-hidden" style={{ minHeight: '100vh' }}>
      {/* Dynamic Background Effects */}
      <div 
        className="absolute top-0 left-0 w-full h-full pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle at 20% 30%, rgba(129, 140, 248, 0.15) 0%, transparent 40%), radial-gradient(circle at 80% 70%, rgba(236, 72, 153, 0.15) 0%, transparent 40%)',
          filter: 'blur(60px)'
        }}
      />

      <div className="animate-slide-up max-w-5xl mx-auto px-4 relative z-10">
        <Link href="/" className="inline-flex items-center gap-2 text-secondary hover:text-primary transition-colors mb-8 font-medium">
          <ArrowLeft size={16} /> Back to Map
        </Link>

        <div className="flex flex-col md:flex-row gap-8 mb-16 items-start w-full">
          {/* Profile Card */}
          <div 
            className="w-full relative overflow-hidden"
            style={{
              flex: '1 1 35%',
              background: 'linear-gradient(145deg, rgba(30, 30, 35, 0.7) 0%, rgba(15, 15, 18, 0.9) 100%)',
              backdropFilter: 'blur(40px)',
              WebkitBackdropFilter: 'blur(40px)',
              borderRadius: '28px',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              boxShadow: '0 30px 60px -15px rgba(0, 0, 0, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
              padding: '2.5rem'
            }}
          >
            {/* Ambient Background Glows */}
            <div 
              className="absolute pointer-events-none" 
              style={{ top: '-100px', left: '-100px', width: '250px', height: '250px', background: 'var(--accent-primary)', opacity: 0.15, filter: 'blur(60px)', borderRadius: '50%' }} 
            />
            <div 
              className="absolute pointer-events-none" 
              style={{ bottom: '-100px', right: '-100px', width: '250px', height: '250px', background: '#ec4899', opacity: 0.1, filter: 'blur(60px)', borderRadius: '50%' }} 
            />
            
            <div className="flex flex-col items-center text-center gap-3 mb-12 relative z-10">
              <div 
                className="rounded-full flex items-center justify-center mb-2"
                style={{
                  width: '96px', height: '96px',
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.02) 100%)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.3), inset 0 2px 10px 0 rgba(255,255,255,0.1)'
                }}
              >
                <Trophy size={44} className="text-accent" style={{ filter: 'drop-shadow(0 0 12px rgba(129, 140, 248, 0.6))' }} />
              </div>
              
              <div>
                <h1 className="text-4xl font-bold mb-2 tracking-tight text-white" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
                  Priyank
                </h1>
                <div className="flex items-center justify-center gap-2 font-medium">
                  <span 
                    className="rounded-full animate-pulse flex-shrink-0"
                    style={{ width: '8px', height: '8px', background: '#10B981', boxShadow: '0 0 12px rgba(16,185,129,0.8)' }}
                  ></span>
                  <span className="text-secondary tracking-wider uppercase text-xs font-semibold">{currentRank}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-12 relative z-10">
              <div 
                className="p-6 flex flex-col items-center justify-center transition-all duration-300"
                style={{ 
                  borderRadius: '16px',
                  background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.01) 100%)', 
                  border: '1px solid rgba(255,255,255,0.06)',
                  boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.04)'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.background = 'linear-gradient(180deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.02) 100%)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.background = 'linear-gradient(180deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.01) 100%)'; }}
              >
                <div 
                  className="text-4xl font-bold text-accent mb-2" 
                  style={{ textShadow: '0 0 24px rgba(129, 140, 248, 0.4)' }}
                >
                  {xp}
                </div>
                <div className="text-tertiary text-xs font-semibold uppercase tracking-widest flex items-center gap-2">
                  <Star size={12} /> XP
                </div>
              </div>
              
              <div 
                className="p-6 flex flex-col items-center justify-center transition-all duration-300"
                style={{ 
                  borderRadius: '16px',
                  background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.01) 100%)', 
                  border: '1px solid rgba(255,255,255,0.06)',
                  boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.04)'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.background = 'linear-gradient(180deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.02) 100%)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.background = 'linear-gradient(180deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.01) 100%)'; }}
              >
                <div 
                  className="text-4xl font-bold text-warning mb-2" 
                  style={{ textShadow: '0 0 24px rgba(245, 158, 11, 0.4)' }}
                >
                  {streak}
                </div>
                <div className="text-tertiary text-xs font-semibold uppercase tracking-widest flex items-center gap-2">
                  <Flame size={12} /> Streak
                </div>
              </div>
            </div>

            <div className="relative z-10">
              <div className="flex justify-between text-xs mb-3 font-semibold tracking-wider uppercase">
                <span className="text-tertiary">Progress</span>
                <span className="text-accent">{nextRank}</span>
              </div>
              <div 
                className="w-full rounded-full overflow-hidden relative"
                style={{ height: '6px', background: 'rgba(255,255,255,0.05)', boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.5)' }}
              >
                <div 
                  className="absolute top-0 left-0 h-full rounded-full transition-all duration-1000 ease-out" 
                  style={{ 
                    width: `${progressToNextRank}%`,
                    background: 'linear-gradient(90deg, var(--accent-primary) 0%, #a78bfa 100%)',
                    boxShadow: '0 0 10px rgba(129, 140, 248, 0.8)'
                  }}
                />
              </div>
            </div>
          </div>

          {/* Artifact Vault Column */}
          <div className="w-full" style={{ flex: '1 1 65%' }}>
            <div className="mb-8 flex justify-between items-end">
              <div>
                <h2 
                  className="text-3xl font-bold flex items-center gap-3 mb-2 tracking-tight"
                  style={{ 
                    background: 'linear-gradient(135deg, #fff 0%, #a1a1aa 100%)', 
                    WebkitBackgroundClip: 'text', 
                    WebkitTextFillColor: 'transparent',
                    textShadow: '0 2px 10px rgba(0,0,0,0.5)'
                  }}
                >
                  <Sparkles className="text-accent" size={28} style={{ filter: 'drop-shadow(0 0 10px rgba(129, 140, 248, 0.6))', WebkitTextFillColor: 'initial' }} /> Portfolio Vault
                </h2>
                <p className="text-secondary text-sm md:text-base font-medium">
                  Artifacts you've built and verified are securely stored here for your final portfolio.
                </p>
              </div>
            </div>

            <div className="flex flex-col" style={{ gap: '1rem' }}>
              {LEVELS.map((level, index) => {
                const isBossCompleted = completedNodes[`${level.id}-boss`];
                return (
                  <div 
                    key={level.id} 
                    className="flex md:flex-row transition-all duration-300 relative overflow-hidden group"
                    style={{
                      padding: '1.25rem',
                      gap: '1.25rem',
                      alignItems: 'center',
                      background: isBossCompleted 
                        ? 'linear-gradient(90deg, rgba(16, 185, 129, 0.05) 0%, rgba(30, 30, 35, 0.4) 100%)' 
                        : 'linear-gradient(90deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%)',
                      border: '1px solid',
                      borderColor: isBossCompleted ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                      backdropFilter: 'blur(10px)',
                      borderRadius: '16px',
                      boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.05)',
                      animationDelay: `${index * 100}ms`
                    }}
                    onMouseEnter={(e) => {
                       e.currentTarget.style.transform = 'translateY(-2px)';
                       e.currentTarget.style.boxShadow = '0 10px 30px -10px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)';
                       if (isBossCompleted) {
                         e.currentTarget.style.background = 'linear-gradient(90deg, rgba(16, 185, 129, 0.08) 0%, rgba(30, 30, 35, 0.6) 100%)';
                       } else {
                         e.currentTarget.style.background = 'linear-gradient(90deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)';
                       }
                    }}
                    onMouseLeave={(e) => {
                       e.currentTarget.style.transform = 'translateY(0)';
                       e.currentTarget.style.boxShadow = 'inset 0 1px 0 rgba(255, 255, 255, 0.05)';
                       if (isBossCompleted) {
                         e.currentTarget.style.background = 'linear-gradient(90deg, rgba(16, 185, 129, 0.05) 0%, rgba(30, 30, 35, 0.4) 100%)';
                       } else {
                         e.currentTarget.style.background = 'linear-gradient(90deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%)';
                       }
                    }}
                  >
                    {isBossCompleted && (
                      <div 
                        className="absolute top-0 left-0 w-1 h-full"
                        style={{ background: 'linear-gradient(180deg, #10B981 0%, transparent 100%)', boxShadow: '0 0 10px #10B981' }}
                      />
                    )}
                    
                    <div 
                      className="w-12 h-12 flex flex-shrink-0 items-center justify-center border transition-all"
                      style={{
                        borderRadius: '12px',
                        background: isBossCompleted ? 'rgba(16, 185, 129, 0.1)' : 'rgba(255,255,255,0.02)',
                        borderColor: isBossCompleted ? 'rgba(16, 185, 129, 0.3)' : 'rgba(255,255,255,0.05)',
                        color: isBossCompleted ? '#10B981' : 'rgba(255,255,255,0.2)',
                        boxShadow: isBossCompleted ? '0 0 20px rgba(16,185,129,0.2), inset 0 1px 0 rgba(16,185,129,0.3)' : 'inset 0 1px 0 rgba(255,255,255,0.05)'
                      }}
                    >
                      {isBossCompleted ? <CheckCircle2 size={24} style={{ filter: 'drop-shadow(0 0 8px rgba(16,185,129,0.8))' }} /> : <Lock size={20} />}
                    </div>
                    
                    <div className="flex-1 w-full">
                      <h4 
                        className={`font-semibold text-lg mb-1 tracking-tight ${isBossCompleted ? 'text-white' : 'text-secondary'}`}
                        style={{ textShadow: isBossCompleted ? '0 2px 4px rgba(0,0,0,0.5)' : 'none' }}
                      >
                        {level.title} <span className={isBossCompleted ? 'text-accent opacity-80' : 'opacity-50'}>Artifact</span>
                      </h4>
                      <p className={`text-sm ${isBossCompleted ? 'text-secondary' : 'text-tertiary'}`}>
                        {isBossCompleted ? 'Verified and securely stored in your portfolio.' : 'Defeat the boss to unlock and store this artifact.'}
                      </p>
                    </div>
                    
                    {isBossCompleted && (
                      <div className="flex gap-2 w-full md:w-auto mt-4 md:mt-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                         <button 
                           className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all text-sm"
                           style={{ 
                             background: 'linear-gradient(180deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)', 
                             color: 'var(--text-primary)', 
                             border: '1px solid rgba(255,255,255,0.15)',
                             boxShadow: '0 4px 12px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.1)'
                           }}
                           onMouseEnter={(e) => {
                             e.currentTarget.style.background = 'linear-gradient(180deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.08) 100%)';
                             e.currentTarget.style.transform = 'translateY(-1px)';
                           }}
                           onMouseLeave={(e) => {
                             e.currentTarget.style.background = 'linear-gradient(180deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)';
                             e.currentTarget.style.transform = 'translateY(0)';
                           }}
                         >
                           <Eye size={16} /> View
                         </button>
                         <button 
                           className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all text-black text-sm"
                           style={{ 
                             background: 'linear-gradient(180deg, #fff 0%, #e4e4e7 100%)', 
                             border: '1px solid rgba(255,255,255,0.2)',
                             boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
                           }}
                           onMouseEnter={(e) => {
                             e.currentTarget.style.background = 'linear-gradient(180deg, #fff 0%, #f4f4f5 100%)';
                             e.currentTarget.style.transform = 'translateY(-1px)';
                           }}
                           onMouseLeave={(e) => {
                             e.currentTarget.style.background = 'linear-gradient(180deg, #fff 0%, #e4e4e7 100%)';
                             e.currentTarget.style.transform = 'translateY(0)';
                           }}
                         >
                           <Download size={16} /> Export
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
    </div>
  );
}
