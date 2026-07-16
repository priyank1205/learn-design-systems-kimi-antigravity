'use client';

import { useState } from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';

export interface Question {
  question: string;
  options: string[];
  correctIndex: number;
}

interface QuizEngineProps {
  questions: Question[];
  onPass: () => void;
  onFail: () => void;
}

export default function QuizEngine({ questions, onPass, onFail }: QuizEngineProps) {
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const handleSelect = (index: number) => {
    if (isAnswered) return;
    setSelectedOpt(index);
    setIsAnswered(true);
    
    if (index === questions[currentQ].correctIndex) {
      setScore(s => s + 1);
    }
  };

  const handleNext = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(c => c + 1);
      setSelectedOpt(null);
      setIsAnswered(false);
    } else {
      setFinished(true);
      const finalScore = score + (selectedOpt === questions[currentQ].correctIndex ? 1 : 0);
      const percentage = (finalScore / questions.length) * 100;
      if (percentage >= 80) {
        onPass();
      } else {
        onFail();
      }
    }
  };

  const handleRetry = () => {
    setCurrentQ(0);
    setSelectedOpt(null);
    setIsAnswered(false);
    setScore(0);
    setFinished(false);
  };

  if (finished) {
    const percentage = (score / questions.length) * 100;
    const passed = percentage >= 80;

    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        {passed ? (
          <CheckCircle2 size={48} color="var(--accent-success)" style={{ margin: '0 auto 1rem' }} />
        ) : (
          <XCircle size={48} color="var(--accent-error)" style={{ margin: '0 auto 1rem' }} />
        )}
        <h3 style={{ marginBottom: '1rem' }}>{passed ? 'Quiz Passed!' : 'Quiz Failed'}</h3>
        <p style={{ marginBottom: '2rem' }}>You scored {score} out of {questions.length} ({Math.round(percentage)}%).</p>
        
        {!passed && (
          <button onClick={handleRetry} className="secondary-btn">
            Try Again
          </button>
        )}
      </div>
    );
  }

  const q = questions[currentQ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
        <span>Question {currentQ + 1} of {questions.length}</span>
        <span>Score: {score}</span>
      </div>

      <h3 style={{ marginBottom: '2rem', fontSize: '1.25rem' }}>{q.question}</h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {q.options.map((opt, i) => {
          let bg = 'var(--bg-surface)';
          let border = '1px solid var(--border-subtle)';
          if (isAnswered) {
            if (i === q.correctIndex) {
              bg = 'rgba(16, 185, 129, 0.1)';
              border = '1px solid var(--accent-success)';
            } else if (i === selectedOpt) {
              bg = 'rgba(239, 68, 68, 0.1)';
              border = '1px solid var(--accent-error)';
            }
          } else if (selectedOpt === i) {
            bg = 'var(--bg-surface-hover)';
            border = '1px solid var(--accent-primary)';
          }

          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              disabled={isAnswered}
              style={{
                background: bg,
                border,
                padding: '1rem',
                borderRadius: 'var(--radius-md)',
                textAlign: 'left',
                color: 'var(--text-primary)',
                transition: 'all 0.2s ease',
                cursor: isAnswered ? 'default' : 'pointer'
              }}
              className={!isAnswered ? 'hover-effect' : ''}
            >
              {opt}
            </button>
          );
        })}
      </div>

      {isAnswered && (
        <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
          <button onClick={handleNext} className="primary-btn">
            {currentQ < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
          </button>
        </div>
      )}
    </div>
  );
}
