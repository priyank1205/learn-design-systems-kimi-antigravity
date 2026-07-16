'use client';

import { LEVELS } from '@/lib/levels';
import { useGameStore } from '@/lib/store';
import Link from 'next/link';
import { Lock, CheckCircle2, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function QuestMap() {
  const { unlockedLevels, completedNodes } = useGameStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="animate-fade-in" style={{ padding: '2rem 0', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h1 style={{ fontSize: '3rem', color: 'var(--text-primary)', marginBottom: '1rem', textShadow: '0 0 40px var(--accent-glow)' }}>
          Design System Quest
        </h1>
        <p style={{ fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto' }}>
          From "never touched a design system" to "built, governed, and made one agent-readable."
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', position: 'relative' }}>
        {/* Connecting Line */}
        <div style={{ 
          position: 'absolute', 
          top: '2rem', 
          bottom: '2rem', 
          left: '2rem', 
          width: '2px', 
          background: 'var(--border-subtle)',
          zIndex: 0
        }} />

        {LEVELS.map((level, i) => {
          const isUnlocked = i <= unlockedLevels;
          // Check if all parts of a level are complete (simplified for now: just if boss is done)
          const isCompleted = completedNodes[`${level.id}-boss`]; 

          return (
            <div key={level.id} style={{ 
              display: 'flex', 
              gap: '1.5rem', 
              position: 'relative',
              zIndex: 1,
              opacity: isUnlocked ? 1 : 0.5,
              transform: isUnlocked ? 'scale(1)' : 'scale(0.98)',
              transition: 'all 0.3s ease'
            }}>
              {/* Node Indicator */}
              <div style={{ 
                width: '4rem', 
                height: '4rem', 
                borderRadius: '50%', 
                background: isCompleted ? 'var(--accent-success)' : isUnlocked ? 'var(--accent-primary)' : 'var(--bg-surface)',
                border: `2px solid ${isUnlocked ? 'transparent' : 'var(--border-subtle)'}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem',
                flexShrink: 0,
                boxShadow: isUnlocked ? 'var(--shadow-glow)' : 'none'
              }}>
                {isCompleted ? <CheckCircle2 color="white" /> : !isUnlocked ? <Lock size={20} color="var(--text-secondary)" /> : level.icon}
              </div>

              {/* Node Card */}
              <Link 
                href={isUnlocked ? `/level/${level.id}` : '#'} 
                style={{ flex: 1, pointerEvents: isUnlocked ? 'auto' : 'none' }}
              >
                <div className={`glass-panel ${isUnlocked ? 'hover-effect' : ''}`} style={{ 
                  padding: '1.5rem', 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  cursor: isUnlocked ? 'pointer' : 'default',
                  border: isUnlocked ? '1px solid var(--accent-glow)' : '1px solid var(--border-subtle)'
                }}>
                  <div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--accent-primary)', fontWeight: '600', marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Level {i} • {level.rank}
                    </div>
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{level.title}</h2>
                    <p style={{ margin: 0 }}>{level.description}</p>
                  </div>
                  {isUnlocked && <ChevronRight size={24} color="var(--text-secondary)" />}
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
