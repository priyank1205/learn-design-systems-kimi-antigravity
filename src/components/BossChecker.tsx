'use client';

import { useState } from 'react';
import { useGameStore } from '@/lib/store';
import { useRouter } from 'next/navigation';
import { CheckCircle2, ShieldAlert } from 'lucide-react';

interface BossCheckerProps {
  levelId: string;
  levelIndex: number;
}

export default function BossChecker({ levelId, levelIndex }: BossCheckerProps) {
  const [input, setInput] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { addXp, markNodeCompleted, unlockLevel, completedNodes } = useGameStore();
  const router = useRouter();

  const isCompleted = completedNodes[`${levelId}-boss`];

  const verifyLevel1 = (jsonStr: string) => {
    try {
      const data = JSON.parse(jsonStr);
      // Very basic DTCG check
      const str = JSON.stringify(data);
      if (!str.includes('"$value"') && !str.includes('"$type"')) {
        return "JSON is missing DTCG required fields like $value and $type.";
      }
      if (!str.includes('{') || !str.includes('}')) {
        return "Are you sure you included references? E.g., {color.blue.500}";
      }
      return null; // Passes
    } catch (e) {
      return "Invalid JSON. Please check your syntax.";
    }
  };

  const handleVerify = async () => {
    setVerifying(true);
    setError(null);

    // Simulate network delay for verification effect
    await new Promise(res => setTimeout(res, 1500));

    let err = null;
    if (levelId === 'level-1') {
      err = verifyLevel1(input);
    } else {
      // Basic mock check for other levels
      if (input.trim().length < 20) {
        err = "Please provide a more substantial artifact (code or JSON) to verify.";
      }
    }

    if (err) {
      setError(err);
      setVerifying(false);
    } else {
      // Defeat boss
      markNodeCompleted(`${levelId}-boss`);
      addXp(levelIndex >= 7 ? 300 : 150);
      unlockLevel(levelIndex + 1);
      setVerifying(false);
    }
  };

  if (isCompleted) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <CheckCircle2 size={48} color="var(--accent-success)" style={{ margin: '0 auto 1rem' }} />
        <h3 style={{ marginBottom: '1rem' }}>Boss Defeated!</h3>
        <p style={{ color: 'var(--text-secondary)' }}>You have completed this level's quest.</p>
        <button onClick={() => router.push('/')} className="primary-btn" style={{ marginTop: '2rem' }}>
          Return to Map
        </button>
      </div>
    );
  }

  return (
    <div>
      <h3 style={{ marginBottom: '1rem' }}>Submit Your Artifact</h3>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '0.875rem' }}>
        Paste your tokens.json or code artifact here for programmatic verification.
      </p>
      
      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Paste JSON or code here..."
        style={{
          width: '100%',
          height: '200px',
          background: 'var(--bg-base)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-md)',
          padding: '1rem',
          color: 'var(--text-primary)',
          fontFamily: 'monospace',
          marginBottom: '1rem',
          resize: 'vertical'
        }}
      />

      {error && (
        <div style={{ padding: '1rem', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid var(--accent-error)', borderRadius: 'var(--radius-sm)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-error)' }}>
          <ShieldAlert size={20} />
          {error}
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button 
          onClick={handleVerify} 
          disabled={verifying || input.trim().length === 0}
          className="primary-btn" 
          style={{ background: verifying ? 'var(--bg-surface)' : 'var(--accent-primary)' }}
        >
          {verifying ? 'Verifying...' : `Verify & Defeat Boss (+${levelIndex >= 7 ? 300 : 150} XP)`}
        </button>
      </div>
    </div>
  );
}
