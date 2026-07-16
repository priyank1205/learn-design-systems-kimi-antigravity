'use client';

import { useGameStore, RANKS } from '@/lib/store';
import { LEVELS } from '@/lib/levels';
import { Trophy, Star, Flame, CheckCircle2, Lock, ArrowLeft } from 'lucide-react';
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
    <div className="animate-fade-in" style={{ maxWidth: '900px', margin: '0 auto', paddingTop: '1rem' }}>
      <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
        <ArrowLeft size={16} /> Back to Map
      </Link>

      <div style={{ display: 'flex', gap: '2rem', marginBottom: '4rem', alignItems: 'flex-start' }}>
        {/* Stats Column */}
        <div className="glass-panel" style={{ flex: 1, padding: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--bg-surface)', border: '2px solid var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Trophy size={32} color="var(--accent-primary)" />
            </div>
            <div>
              <h1 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>{currentRank}</h1>
              <p style={{ margin: 0 }}>Design System Explorer</p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
            <div style={{ background: 'var(--bg-base)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Total XP</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.5rem', fontWeight: '600', color: 'var(--accent-primary)' }}>
                <Star size={24} /> {xp}
              </div>
            </div>
            <div style={{ background: 'var(--bg-base)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Current Streak</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.5rem', fontWeight: '600', color: 'var(--accent-warning)' }}>
                <Flame size={24} /> {streak}
              </div>
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Rank Progress</span>
              <span style={{ color: 'var(--accent-primary)' }}>Next: {nextRank}</span>
            </div>
            <div style={{ width: '100%', height: '8px', background: 'var(--bg-base)', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${progressToNextRank}%`, background: 'var(--accent-primary)', transition: 'width 0.5s ease' }} />
            </div>
          </div>
        </div>

        {/* Artifact Vault Column */}
        <div style={{ flex: 2 }}>
          <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            Portfolio Vault
          </h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
            Artifacts you've built and verified are stored here for your final portfolio.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {LEVELS.map(level => {
              const isBossCompleted = completedNodes[`${level.id}-boss`];
              return (
                <div key={level.id} className="glass-panel" style={{ 
                  padding: '1.5rem', 
                  display: 'flex', 
                  alignItems: 'center',
                  gap: '1rem',
                  opacity: isBossCompleted ? 1 : 0.5
                }}>
                  <div style={{ 
                    width: '40px', height: '40px', borderRadius: '8px',
                    background: isBossCompleted ? 'rgba(16, 185, 129, 0.1)' : 'var(--bg-base)',
                    border: isBossCompleted ? '1px solid var(--accent-success)' : '1px dashed var(--border-subtle)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>
                    {isBossCompleted ? <CheckCircle2 color="var(--accent-success)" /> : <Lock color="var(--text-secondary)" size={20} />}
                  </div>
                  <div>
                    <h4 style={{ margin: 0, fontSize: '1rem' }}>{level.title} Artifact</h4>
                    <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                      {isBossCompleted ? 'Verified and securely stored.' : 'Complete the boss fight to unlock.'}
                    </p>
                  </div>
                  {isBossCompleted && (
                    <button className="secondary-btn hover-effect" style={{ marginLeft: 'auto', padding: '0.5rem 1rem' }}>
                      View Artifact
                    </button>
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
