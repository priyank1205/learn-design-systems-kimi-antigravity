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
      const str = JSON.stringify(data);
      if (!str.includes('"$value"') && !str.includes('"$type"')) {
        return "JSON is missing DTCG required fields like $value and $type.";
      }
      if (!str.includes('{') || !str.includes('}')) {
        return "Are you sure you included references? E.g., {color.blue.500}";
      }
      return null;
    } catch (e) {
      return "Invalid JSON. Please check your syntax.";
    }
  };

  const handleVerify = async () => {
    setVerifying(true);
    setError(null);

    await new Promise(res => setTimeout(res, 1500));

    let err = null;
    if (levelId === 'level-1') {
      err = verifyLevel1(input);
    } else {
      if (input.trim().length < 20) {
        err = "Please provide a more substantial artifact (code or JSON) to verify.";
      }
    }

    if (err) {
      setError(err);
      setVerifying(false);
    } else {
      markNodeCompleted(`${levelId}-boss`);
      addXp(levelIndex >= 7 ? 300 : 150);
      unlockLevel(levelIndex + 1);
      setVerifying(false);
    }
  };

  if (isCompleted) {
    return (
      <div className="text-center py-12">
        <CheckCircle2 size={48} className="text-success mx-auto mb-4" />
        <h3 className="text-2xl font-bold mb-2">Boss Defeated!</h3>
        <p className="text-secondary mb-8">You have completed this level's quest.</p>
        <button onClick={() => router.push('/')} className="btn btn-primary">
          Return to Curriculum
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="mb-6">
        <h3 className="text-xl font-bold mb-2">Submit Your Artifact</h3>
        <p className="text-secondary text-sm">
          Paste your tokens.json or code artifact here for programmatic verification.
        </p>
      </div>
      
      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Paste JSON or code here..."
        className="w-full min-h-[200px] bg-base border border-subtle rounded-md p-4 text-primary font-mono text-sm mb-6 focus:border-strong focus:outline-none transition-colors resize-y"
        spellCheck={false}
      />

      {error && (
        <div className="p-4 bg-error-bg border border-error rounded-sm mb-6 flex items-center gap-3 text-error font-medium">
          <ShieldAlert size={20} className="flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div className="flex justify-end">
        <button 
          onClick={handleVerify} 
          disabled={verifying || input.trim().length === 0}
          className={`btn ${verifying ? 'bg-surface text-secondary cursor-not-allowed border border-subtle' : 'btn-primary'}`} 
        >
          {verifying ? 'Verifying...' : `Verify & Defeat Boss (+${levelIndex >= 7 ? 300 : 150} XP)`}
        </button>
      </div>
    </div>
  );
}
