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
    <nav className="surface flex justify-between items-center px-8 py-4 m-4 mb-8">
      <Link href="/">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center font-bold rounded-md bg-white text-black w-8 h-8">
            DS
          </div>
          <span className="font-semibold text-xl tracking-tight text-primary">Quest</span>
        </div>
      </Link>

      <div className="flex items-center gap-8">
        {mounted && (
          <>
            <div className="flex items-center gap-2 text-warning font-semibold">
              <Flame size={18} />
              <span>{streak} Day{streak !== 1 ? 's' : ''}</span>
            </div>
            
            <div className="flex items-center gap-2 text-accent font-semibold">
              <Star size={18} />
              <span>{xp} XP</span>
            </div>

            <Link href="/profile">
              <div 
                className="btn btn-secondary flex items-center gap-2 group border transition-all duration-300"
                style={{ 
                  borderRadius: '999px',
                  paddingLeft: '0.35rem', 
                  paddingRight: '1rem',
                  borderColor: 'rgba(255,255,255,0.1)'
                }}
              >
                <div 
                  className="rounded-full flex items-center justify-center transition-all duration-300 flex-shrink-0"
                  style={{ width: '28px', height: '28px', background: 'rgba(129, 140, 248, 0.15)', border: '1px solid rgba(129, 140, 248, 0.3)' }}
                >
                  <Trophy size={14} className="text-accent" />
                </div>
                <span className="font-semibold tracking-tight" style={{ color: 'var(--text-primary)' }}>
                  Priyank
                </span>
              </div>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
