'use client';

import { LEVELS } from '@/lib/levels';
import { useGameStore } from '@/lib/store';
import Link from 'next/link';
import { Lock, CheckCircle2, ChevronRight, Trophy, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function QuestMap() {
  const { unlockedLevels, completedNodes } = useGameStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Determine achievements based on level progress for MVP
  const hasContrastBadge = completedNodes['level-1-practice'];
  const hasCIBadge = completedNodes['level-4-practice'];

  // Calculate overall progress for the connecting line glow
  const totalLevels = LEVELS.length;
  const highestUnlocked = Math.min(unlockedLevels, totalLevels - 1);
  const progressPercentage = (highestUnlocked / (totalLevels - 1)) * 100;

  return (
    <div className="animate-fade-in" style={{ padding: '4rem 0 8rem', maxWidth: '800px', margin: '0 auto' }}>
      
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(139, 92, 246, 0.1)', border: '1px solid var(--accent-glow)', padding: '0.5rem 1rem', borderRadius: '2rem', marginBottom: '1.5rem', color: 'var(--accent-primary)', fontSize: '0.875rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          <Sparkles size={16} /> Interactive Curriculum
        </div>
        <h1 className="text-gradient" style={{ fontSize: '4rem', marginBottom: '1rem' }}>
          Design System Quest
        </h1>
        <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
          From "never touched a design system" to "built, governed, and made one agent-readable."
        </p>
      </div>

      {/* Trophy Case (Achievements) */}
      <div className="glass-panel" style={{ padding: '2rem', marginBottom: '4rem', display: 'flex', alignItems: 'center', gap: '2rem', position: 'relative', overflow: 'hidden' }}>
        {/* Subtle background glow for the trophy case */}
        <div style={{ position: 'absolute', top: '-50%', right: '-10%', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(245, 158, 11, 0.15) 0%, transparent 70%)', filter: 'blur(40px)', zIndex: 0 }} />
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', position: 'relative', zIndex: 1, minWidth: '150px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-warning)', fontWeight: 700, fontSize: '1.1rem' }}>
            <Trophy size={20} /> Trophy Case
          </div>
          <span style={{ fontSize: '0.875rem', color: 'var(--text-tertiary)' }}>Unlocked milestones</span>
        </div>
        
        <div style={{ display: 'flex', gap: '1rem', flex: 1, flexWrap: 'wrap', position: 'relative', zIndex: 1 }}>
          <div style={{ 
            padding: '0.75rem 1.25rem', 
            borderRadius: 'var(--radius-sm)', 
            background: hasContrastBadge ? 'rgba(16, 185, 129, 0.1)' : 'rgba(255, 255, 255, 0.03)', 
            border: `1px solid ${hasContrastBadge ? 'var(--accent-success)' : 'var(--border-subtle)'}`,
            color: hasContrastBadge ? 'var(--accent-success)' : 'var(--text-tertiary)',
            fontSize: '0.9rem',
            fontWeight: 500,
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            boxShadow: hasContrastBadge ? '0 0 20px rgba(16, 185, 129, 0.2)' : 'none',
            transition: 'all 0.3s ease'
          }}>
            {hasContrastBadge ? <CheckCircle2 size={16} /> : <Lock size={16} />} Contrast Champion
          </div>
          <div style={{ 
            padding: '0.75rem 1.25rem', 
            borderRadius: 'var(--radius-sm)', 
            background: hasCIBadge ? 'rgba(16, 185, 129, 0.1)' : 'rgba(255, 255, 255, 0.03)', 
            border: `1px solid ${hasCIBadge ? 'var(--accent-success)' : 'var(--border-subtle)'}`,
            color: hasCIBadge ? 'var(--accent-success)' : 'var(--text-tertiary)',
            fontSize: '0.9rem',
            fontWeight: 500,
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            boxShadow: hasCIBadge ? '0 0 20px rgba(16, 185, 129, 0.2)' : 'none',
            transition: 'all 0.3s ease'
          }}>
            {hasCIBadge ? <CheckCircle2 size={16} /> : <Lock size={16} />} Pipeline Pioneer
          </div>
        </div>
      </div>

      {/* The Map / Timeline */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', position: 'relative' }}>
        
        {/* Background Track Line */}
        <div style={{ 
          position: 'absolute', 
          top: '2rem', 
          bottom: '2rem', 
          left: '2rem', 
          width: '4px', 
          background: 'var(--border-subtle)',
          borderRadius: '2px',
          zIndex: 0
        }} />

        {/* Active Glow Line */}
        <div style={{ 
          position: 'absolute', 
          top: '2rem', 
          height: `calc(${progressPercentage}% - 2rem)`, 
          left: '2rem', 
          width: '4px', 
          background: 'linear-gradient(to bottom, var(--accent-secondary), var(--accent-primary))',
          borderRadius: '2px',
          zIndex: 0,
          boxShadow: '0 0 15px var(--accent-primary)',
          transition: 'height 1s ease-out'
        }} />

        {LEVELS.map((level, i) => {
          const isUnlocked = i <= unlockedLevels;
          const isCompleted = completedNodes[`${level.id}-boss`]; 

          return (
            <div key={level.id} style={{ 
              display: 'flex', 
              gap: '2rem', 
              position: 'relative',
              zIndex: 1,
              opacity: isUnlocked ? 1 : 0.4,
              filter: isUnlocked ? 'none' : 'grayscale(100%)',
              transition: 'all 0.4s ease'
            }}>
              
              {/* Node Indicator Container */}
              <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', width: '4rem', flexShrink: 0 }}>
                {/* Node Orb */}
                <div style={{ 
                  width: '4rem', 
                  height: '4rem', 
                  borderRadius: '50%', 
                  background: isCompleted ? 'linear-gradient(135deg, var(--accent-success), #059669)' : isUnlocked ? 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))' : 'var(--bg-base)',
                  border: `2px solid ${isUnlocked ? 'transparent' : 'var(--border-subtle)'}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                  boxShadow: isCompleted ? '0 0 20px rgba(16, 185, 129, 0.4)' : isUnlocked ? '0 0 30px rgba(139, 92, 246, 0.6)' : 'none',
                  zIndex: 2,
                  transition: 'all 0.3s ease'
                }}>
                  {isCompleted ? <CheckCircle2 color="white" /> : !isUnlocked ? <Lock size={20} color="var(--text-tertiary)" /> : level.icon}
                </div>
              </div>

              {/* Node Card */}
              <Link 
                href={isUnlocked ? `/level/${level.id}` : '#'} 
                style={{ flex: 1, pointerEvents: isUnlocked ? 'auto' : 'none' }}
              >
                <div className={`glass-panel ${isUnlocked ? 'hover-glow' : ''}`} style={{ 
                  padding: '2rem', 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  cursor: isUnlocked ? 'pointer' : 'default',
                  border: isUnlocked ? '1px solid rgba(255,255,255,0.15)' : '1px solid var(--border-subtle)',
                  background: isUnlocked ? 'linear-gradient(145deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%)' : 'var(--bg-surface)'
                }}>
                  <div>
                    <div style={{ 
                      fontSize: '0.8rem', 
                      color: isUnlocked ? 'var(--accent-secondary)' : 'var(--text-tertiary)', 
                      fontWeight: '700', 
                      marginBottom: '0.5rem', 
                      textTransform: 'uppercase', 
                      letterSpacing: '0.1em' 
                    }}>
                      Level {i} • {level.rank}
                    </div>
                    <h2 style={{ fontSize: '1.75rem', marginBottom: '0.5rem', color: isUnlocked ? '#fff' : 'var(--text-secondary)' }}>
                      {level.title}
                    </h2>
                    <p style={{ margin: 0, fontSize: '1rem', color: isUnlocked ? 'var(--text-secondary)' : 'var(--text-tertiary)' }}>
                      {level.description}
                    </p>
                  </div>
                  
                  {isUnlocked && (
                    <div style={{ 
                      width: '40px', 
                      height: '40px', 
                      borderRadius: '50%', 
                      background: 'rgba(255,255,255,0.05)', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      color: 'var(--accent-secondary)'
                    }}>
                      <ChevronRight size={24} />
                    </div>
                  )}
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
