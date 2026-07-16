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
      <div className="text-center py-12">
        {passed ? (
          <CheckCircle2 size={48} className="text-success mx-auto mb-4" />
        ) : (
          <XCircle size={48} className="text-error mx-auto mb-4" />
        )}
        <h3 className="text-2xl font-bold mb-4">{passed ? 'Quiz Passed!' : 'Quiz Failed'}</h3>
        <p className="text-secondary mb-8">You scored {score} out of {questions.length} ({Math.round(percentage)}%).</p>
        
        {!passed && (
          <button onClick={handleRetry} className="btn btn-secondary">
            Try Again
          </button>
        )}
      </div>
    );
  }

  const q = questions[currentQ];

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center mb-8 text-sm font-semibold tracking-wider uppercase text-tertiary">
        <span>Question {currentQ + 1} of {questions.length}</span>
        <span>Score: {score}</span>
      </div>

      <h3 className="text-xl font-medium mb-8 leading-relaxed">{q.question}</h3>

      <div className="flex flex-col gap-3">
        {q.options.map((opt, i) => {
          let bgClass = 'bg-surface';
          let borderClass = 'border-subtle';
          let textClass = 'text-primary';
          
          if (isAnswered) {
            if (i === q.correctIndex) {
              bgClass = 'bg-success-bg';
              borderClass = 'border-success';
              textClass = 'text-success';
            } else if (i === selectedOpt) {
              bgClass = 'bg-error-bg';
              borderClass = 'border-error';
              textClass = 'text-error';
            } else {
              bgClass = 'bg-base opacity-50';
            }
          } else if (selectedOpt === i) {
            bgClass = 'bg-surface-active';
            borderClass = 'border-accent';
          }

          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              disabled={isAnswered}
              className={`p-4 rounded-md border text-left transition-all duration-200 ${bgClass} ${borderClass} ${textClass} ${!isAnswered ? 'hover:bg-surface-hover hover:border-strong cursor-pointer' : 'cursor-default'}`}
            >
              {opt}
            </button>
          );
        })}
      </div>

      {isAnswered && (
        <div className="mt-8 flex justify-end animate-slide-up">
          <button onClick={handleNext} className="btn btn-primary">
            {currentQ < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
          </button>
        </div>
      )}
    </div>
  );
}
