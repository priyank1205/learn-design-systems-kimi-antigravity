'use client';

import { useParams, useRouter } from 'next/navigation';
import { LEVELS } from '@/lib/levels';
import { useGameStore } from '@/lib/store';
import { useState, useEffect } from 'react';
import { CheckCircle2, Lock, ArrowLeft } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';
import QuizEngine, { Question } from '@/components/QuizEngine';
import BossChecker from '@/components/BossChecker';

const DUMMY_QUESTIONS: Question[] = [
  {
    question: "What is a design system primarily caching?",
    options: ["Images", "Decisions", "CSS files", "React components"],
    correctIndex: 1
  },
  {
    question: "How does a system affect decision math?",
    options: ["Increases O(N*M) to O(N^2)", "Has no effect", "Collapses O(N*M) to O(N)", "Reduces designers to O(1)"],
    correctIndex: 2
  }
];

// Dummy theory content for MVP - in reality this would be loaded from .md files
const DUMMY_THEORY = `
# A design system is cached decisions. 

Every recurring UI question ("which blue? how much padding?") answered once and reused, instead of re-decided per screen.

Decision math: *N* designers × *M* screens produce O(N·M) ad-hoc decisions; a system collapses that to O(N). Inconsistency isn't an aesthetic flaw — it's compounding maintenance cost and eroded user trust.
`;

export default function LevelPage() {
  const params = useParams();
  const router = useRouter();
  const { unlockedLevels, completedNodes, addXp } = useGameStore();
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<'learn' | 'practice' | 'boss'>('learn');

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const id = params?.id as string;
  const level = LEVELS.find(l => l.id === id);

  if (!level) {
    return <div>Level not found.</div>;
  }

  const isUnlocked = level.index <= unlockedLevels;

  if (!isUnlocked) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem' }}>
        <Lock size={48} style={{ margin: '0 auto 1rem', color: 'var(--text-secondary)' }} />
        <h2>Level Locked</h2>
        <p>Complete the previous boss to unlock this level.</p>
        <button onClick={() => router.push('/')} className="secondary-btn" style={{ marginTop: '2rem' }}>
          Back to Map
        </button>
      </div>
    );
  }

  const handleFinishReading = () => {
    if (!completedNodes[\`\${level.id}-theory\`]) {
      useGameStore.getState().markNodeCompleted(\`\${level.id}-theory\`);
      addXp(10);
      setActiveTab('practice');
    }
  };

  return (
    <div className="animate-fade-in" style={{ maxWidth: '900px', margin: '0 auto', paddingTop: '1rem' }}>
      <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
        <ArrowLeft size={16} /> Back to Map
      </Link>

      <div style={{ marginBottom: '2rem' }}>
        <div style={{ fontSize: '0.875rem', color: 'var(--accent-primary)', fontWeight: '600', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Level {level.index}
        </div>
        <h1 style={{ fontSize: '2.5rem' }}>{level.title}</h1>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '1rem', borderBottom: '1px solid var(--border-subtle)', marginBottom: '2rem' }}>
        {(['learn', 'practice', 'boss'] as const).map(tab => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{ 
              padding: '0.75rem 1.5rem', 
              color: activeTab === tab ? 'var(--accent-primary)' : 'var(--text-secondary)',
              borderBottom: activeTab === tab ? '2px solid var(--accent-primary)' : '2px solid transparent',
              fontWeight: activeTab === tab ? '600' : '500',
              textTransform: 'capitalize',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            {tab}
            {completedNodes[\`\${level.id}-\${tab === 'learn' ? 'theory' : tab}\`] && (
              <CheckCircle2 size={16} color="var(--accent-success)" />
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="glass-panel" style={{ padding: '2rem' }}>
        {activeTab === 'learn' && (
          <div className="animate-fade-in">
            <div style={{ prose: 'true', lineHeight: '1.7' }}>
              <ReactMarkdown>{DUMMY_THEORY}</ReactMarkdown>
            </div>
            {!completedNodes[\`\${level.id}-theory\`] && (
              <div style={{ marginTop: '3rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
                <button onClick={handleFinishReading} className="primary-btn">
                  Finish Reading (+10 XP)
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'practice' && (
          <div className="animate-fade-in">
            <h3>Practice Drills</h3>
            <p>Complete the drills to unlock the boss.</p>
            <div style={{ marginTop: '2rem', padding: '1rem', background: 'var(--bg-base)', borderRadius: 'var(--radius-md)' }}>
              {!completedNodes[`${level.id}-practice`] ? (
                <QuizEngine 
                  questions={DUMMY_QUESTIONS}
                  onPass={() => {
                    useGameStore.getState().markNodeCompleted(`${level.id}-practice`);
                    addXp(15);
                  }}
                  onFail={() => {
                    // Do nothing on fail, let them retry
                  }}
                />
              ) : (
                <div style={{ textAlign: 'center', padding: '2rem' }}>
                   <CheckCircle2 size={48} color="var(--accent-success)" style={{ margin: '0 auto 1rem' }} />
                   <h3>Drills Completed!</h3>
                   <button onClick={() => setActiveTab('boss')} className="primary-btn" style={{ marginTop: '1rem' }}>
                     Proceed to Boss
                   </button>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'boss' && (
          <div className="animate-fade-in">
            <h3>Boss Fight</h3>
            <p>Upload your artifact to defeat the boss and unlock the next level.</p>
            <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'var(--bg-base)', borderRadius: 'var(--radius-md)' }}>
              <BossChecker levelId={level.id} levelIndex={level.index} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
