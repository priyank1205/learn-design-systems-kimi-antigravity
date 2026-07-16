'use client';

import { useParams, useRouter } from 'next/navigation';
import { LEVELS } from '@/lib/levels';
import { useGameStore } from '@/lib/store';
import { useState, useEffect } from 'react';
import { CheckCircle2, Lock, ArrowLeft, Book, FileText, Video, ExternalLink, Quote, ChevronRight } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import Link from 'next/link';
import QuizEngine, { Question } from '@/components/QuizEngine';
import BossChecker from '@/components/BossChecker';
import InteractiveREPL from '@/components/InteractiveREPL';

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

const renderers = {
  h2: ({node, ...props}: any) => {
    const textChildren = Array.isArray(props.children) ? props.children : [props.children];
    const fullText = textChildren.map((c: any) => typeof c === 'string' ? c : c?.props?.children).join('');
    
    if (fullText.trim().match(/^\d+\s/)) {
      const firstSpaceIdx = fullText.indexOf(' ');
      const numberPart = fullText.slice(0, firstSpaceIdx);
      const textPart = fullText.slice(firstSpaceIdx + 1);
      return (
        <h2 className="text-2xl mt-12 mb-4 flex gap-3 items-center">
          <span className="text-accent font-bold">{numberPart}</span>
          <span className="text-primary font-semibold">{textPart}</span>
        </h2>
      );
    }
    return <h2 className="text-2xl mt-12 mb-4 text-primary font-semibold border-b border-subtle pb-2" {...props} />;
  },
  blockquote: ({node, ...props}: any) => (
    <div className="surface p-4 my-6 flex gap-4 items-start border-l-2 border-l-warning rounded-l-none">
      <Quote size={20} className="text-warning flex-shrink-0 mt-1" />
      <div className="text-secondary italic text-lg leading-relaxed">{props.children}</div>
    </div>
  ),
  p: ({node, ...props}: any) => <p className="mb-6 text-secondary text-lg leading-relaxed" {...props} />,
  strong: ({node, ...props}: any) => <strong className="text-primary font-semibold" {...props} />
};

type Step = 'theory' | 'practice' | 'boss';
const STEPS: { id: Step; label: string }[] = [
  { id: 'theory', label: '1. Theory' },
  { id: 'practice', label: '2. Drills' },
  { id: 'boss', label: '3. Boss' }
];

export default function LevelPage() {
  const params = useParams();
  const router = useRouter();
  const { unlockedLevels, completedNodes, addXp } = useGameStore();
  const [mounted, setMounted] = useState(false);
  const [activeStep, setActiveStep] = useState<Step>('theory');

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const id = params?.id as string;
  const level = LEVELS.find(l => l.id === id);

  if (!level) return <div className="container py-12 text-center text-secondary">Level not found.</div>;

  const isUnlocked = level.index <= unlockedLevels;

  if (!isUnlocked) {
    return (
      <div className="container max-w-2xl text-center py-24 animate-slide-up">
        <div className="w-20 h-20 bg-surface border border-subtle rounded-full flex items-center justify-center mx-auto mb-6 text-tertiary">
          <Lock size={32} />
        </div>
        <h2 className="text-2xl font-bold text-primary mb-4">Classified Module</h2>
        <p className="text-secondary mb-8">You must complete the previous boss to gain clearance for this module.</p>
        <button onClick={() => router.push('/')} className="btn btn-secondary">
          Return to Map
        </button>
      </div>
    );
  }

  const handleFinishReading = () => {
    if (!completedNodes[`${level.id}-theory`]) {
      useGameStore.getState().markNodeCompleted(`${level.id}-theory`);
      addXp(10);
    }
    setActiveStep('practice');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePracticePass = () => {
    if (!completedNodes[`${level.id}-practice`]) {
      useGameStore.getState().markNodeCompleted(`${level.id}-practice`);
      addXp(25);
    }
  };

  const getStepStatus = (stepId: Step) => {
    if (completedNodes[`${level.id}-${stepId}`]) return 'completed';
    if (activeStep === stepId) return 'active';
    
    // Check if the previous step is completed to see if it's locked
    if (stepId === 'practice' && !completedNodes[`${level.id}-theory`]) return 'locked';
    if (stepId === 'boss' && !completedNodes[`${level.id}-practice`]) return 'locked';
    return 'pending';
  };

  return (
    <div className="animate-slide-up max-w-3xl mx-auto py-8">
      <Link href="/" className="inline-flex items-center gap-2 text-secondary hover:text-primary transition-colors mb-8">
        <ArrowLeft size={16} /> Back to Curriculum
      </Link>

      <div className="mb-12">
        <div className="text-xs font-semibold uppercase tracking-wider mb-3 flex items-center gap-2">
          <span className="text-accent">Level {level.index}</span>
          <span className="text-border-strong">•</span>
          <span className="text-tertiary">{level.rank}</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-primary leading-tight">{level.title}</h1>
      </div>

      {/* Stepper Navigation */}
      <div className="flex items-center mb-12 relative">
        <div className="absolute top-1/2 left-0 right-0 h-px bg-border-strong -z-10 transform -translate-y-1/2"></div>
        {STEPS.map((step, idx) => {
          const status = getStepStatus(step.id);
          const isLocked = status === 'locked';
          const isCompleted = status === 'completed';
          const isActive = status === 'active';

          return (
            <div key={step.id} className="flex-1 flex justify-center bg-base relative z-0">
              <button 
                disabled={isLocked}
                onClick={() => setActiveStep(step.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-200 bg-base ${
                  isActive ? 'border-accent text-primary bg-surface' :
                  isCompleted ? 'border-success text-success bg-success-bg' :
                  isLocked ? 'border-subtle text-tertiary opacity-50 cursor-not-allowed' :
                  'border-subtle text-secondary hover:text-primary hover:border-strong cursor-pointer'
                }`}
              >
                {isCompleted ? <CheckCircle2 size={16} /> : isLocked ? <Lock size={14} /> : null}
                <span className="text-sm font-semibold">{step.label}</span>
              </button>
            </div>
          );
        })}
      </div>

      {/* Step Content */}
      <div className="pb-16 min-h-[50vh]">
        
        {/* THEORY STEP */}
        {activeStep === 'theory' && (
          <div className="animate-slide-up">
            <div className="prose">
              <ReactMarkdown 
                rehypePlugins={[rehypeRaw]}
                components={renderers}
              >
                {level.theoryMarkdown || ''}
              </ReactMarkdown>
            </div>
            
            {level.resources && level.resources.length > 0 && (
              <div className="mt-16">
                <h3 className="text-xl font-semibold mb-6 border-b border-subtle pb-2">Further Reading</h3>
                <div className="flex flex-col gap-4">
                  {level.resources.map((res, i) => (
                    <a key={i} href={res.url} target="_blank" rel="noopener noreferrer" className="surface p-4 flex flex-col gap-2 surface-hover transition-all group">
                      <div className="flex justify-between items-center text-primary font-medium">
                        <div className="flex items-center gap-3">
                          <span className="text-tertiary">
                            {res.icon === 'video' ? <Video size={18} /> : res.icon === 'article' ? <FileText size={18} /> : <Book size={18} />}
                          </span>
                          <span>{res.title}</span>
                        </div>
                        <ExternalLink size={16} className="text-tertiary group-hover:text-primary transition-colors" />
                      </div>
                      <div className="pl-8 text-sm text-secondary">
                        {res.description}
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-12 flex justify-end pt-8 border-t border-subtle">
              {!completedNodes[`${level.id}-theory`] ? (
                <button onClick={handleFinishReading} className="btn btn-primary">
                  Complete Reading (+10 XP) <ChevronRight size={16} />
                </button>
              ) : (
                <button onClick={() => {setActiveStep('practice'); window.scrollTo({ top: 0 });}} className="btn btn-secondary">
                  Proceed to Drills <ChevronRight size={16} />
                </button>
              )}
            </div>
          </div>
        )}

        {/* PRACTICE STEP */}
        {activeStep === 'practice' && (
          <div className="animate-slide-up">
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-2">Practice Drills</h3>
              <p className="text-secondary">Validate your understanding to unlock the boss battle.</p>
            </div>
            
            {!completedNodes[`${level.id}-practice`] ? (
              level.requiresRepl && level.replType ? (
                <div className="animate-slide-up">
                  <InteractiveREPL type={level.replType} onPass={handlePracticePass} />
                </div>
              ) : (
                <div className="surface p-6 rounded-lg">
                  <QuizEngine 
                    questions={DUMMY_QUESTIONS}
                    onPass={handlePracticePass}
                    onFail={() => {}}
                  />
                </div>
              )
            ) : (
              <div className="text-center py-16 surface rounded-lg">
                 <div className="w-20 h-20 bg-success-bg text-success border border-success rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 size={40} />
                 </div>
                 <h3 className="text-2xl font-bold text-success mb-2">Drills Completed!</h3>
                 <p className="text-secondary mb-8">You've mastered the theory and drills. You are ready.</p>
                 <button onClick={() => {setActiveStep('boss'); window.scrollTo({ top: 0 });}} className="btn btn-primary">
                   Proceed to Boss <ChevronRight size={16} />
                 </button>
              </div>
            )}
          </div>
        )}

        {/* BOSS STEP */}
        {activeStep === 'boss' && (
          <div className="animate-slide-up">
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-error mb-2">Boss Fight</h3>
              <p className="text-secondary">Submit your compiled artifact to defeat the boss.</p>
            </div>
            <div className="surface p-6 rounded-lg border-error/30">
              <BossChecker levelId={level.id} levelIndex={level.index} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
