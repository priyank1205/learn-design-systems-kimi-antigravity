'use client';

import Link from 'next/link';
import { useGameStore } from '@/lib/store';
import { Flame, Star, Trophy } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Navigation() {
  const { xp, streak, getRank } = useGameStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav className="glass-panel" style={{ margin: '1rem', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Link href="/">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
            DS
          </div>
          <span style={{ fontWeight: '600', fontSize: '1.25rem', letterSpacing: '-0.02em' }}>Quest</span>
        </div>
      </Link>

      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
        {mounted && (
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-warning)' }}>
              <Flame size={20} />
              <span style={{ fontWeight: '600' }}>{streak} Day{streak !== 1 ? 's' : ''}</span>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-primary)' }}>
              <Star size={20} />
              <span style={{ fontWeight: '600' }}>{xp} XP</span>
            </div>

            <Link href="/profile">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--bg-surface)', padding: '0.5rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', cursor: 'pointer' }} className="secondary-btn">
                <Trophy size={16} />
                <span style={{ fontSize: '0.875rem', fontWeight: '500' }}>{getRank()}</span>
              </div>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
