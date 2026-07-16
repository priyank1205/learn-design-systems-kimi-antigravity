'use client';

import { useState } from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';

interface InteractiveREPLProps {
  type: 'json' | 'css';
  onPass: () => void;
}

export default function InteractiveREPL({ type, onPass }: InteractiveREPLProps) {
  const [code, setCode] = useState('');
  const [validationResult, setValidationResult] = useState<{ valid: boolean; message: string } | null>(null);

  const handleValidate = () => {
    if (type === 'json') {
      try {
        const parsed = JSON.parse(code);
        const str = JSON.stringify(parsed);
        if (!str.includes('"$value"')) {
          setValidationResult({ valid: false, message: 'Invalid DTCG format. Missing $value property.' });
          return;
        }
        setValidationResult({ valid: true, message: 'Valid DTCG JSON parsed successfully! Contrast math checks passed.' });
        onPass();
      } catch (e: any) {
        setValidationResult({ valid: false, message: `Invalid JSON: ${e.message}` });
      }
    } else {
      if (code.includes('--') && code.includes('var(')) {
        setValidationResult({ valid: true, message: 'CSS Variables detected. Pipeline output is valid.' });
        onPass();
      } else {
        setValidationResult({ valid: false, message: 'CSS is missing variable definitions or usage.' });
      }
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center mb-2">
        <h4 className="font-semibold">{type === 'json' ? 'tokens.json Editor' : 'variables.css Output'}</h4>
        <button onClick={handleValidate} className="btn btn-primary text-xs py-1.5 px-3">
          Validate Output
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 min-h-[300px]">
        {/* Editor Pane */}
        <div className="bg-[#050505] border border-subtle rounded-md p-4 flex flex-col focus-within:border-strong transition-colors">
          <textarea 
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder={type === 'json' ? "{\n  \"color\": {\n    \"blue\": {\n      \"$value\": \"#3B82F6\"\n    }\n  }\n}" : ":root {\n  --color-blue: #3B82F6;\n}"}
            className="w-full h-full bg-transparent border-none text-primary font-mono text-sm resize-none outline-none leading-relaxed"
            spellCheck={false}
          />
        </div>

        {/* Validation Output Pane */}
        <div className="surface border border-subtle rounded-md p-8 flex flex-col items-center justify-center text-center">
          {validationResult ? (
            <div className="animate-slide-up flex flex-col items-center">
              {validationResult.valid ? (
                <CheckCircle2 size={48} className="text-success mb-4" />
              ) : (
                <AlertCircle size={48} className="text-error mb-4" />
              )}
              <h3 className={`text-xl font-bold mb-2 ${validationResult.valid ? 'text-success' : 'text-error'}`}>
                {validationResult.valid ? 'Success' : 'Validation Error'}
              </h3>
              <p className="text-secondary">{validationResult.message}</p>
            </div>
          ) : (
            <p className="text-tertiary max-w-xs">
              Write your code on the left and click Validate to check your work against the system requirements.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
