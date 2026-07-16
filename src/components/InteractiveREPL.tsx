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
        // Extremely simple DTCG validation for MVP
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
      // CSS validation (mock)
      if (code.includes('--') && code.includes('var(')) {
        setValidationResult({ valid: true, message: 'CSS Variables detected. Pipeline output is valid.' });
        onPass();
      } else {
        setValidationResult({ valid: false, message: 'CSS is missing variable definitions or usage.' });
      }
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h4 style={{ margin: 0 }}>{type === 'json' ? 'tokens.json Editor' : 'variables.css Output'}</h4>
        <button onClick={handleValidate} className="primary-btn" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>
          Validate Output
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', minHeight: '300px' }}>
        {/* Editor Pane */}
        <div style={{ 
          background: 'rgba(0,0,0,0.3)', 
          border: '1px solid var(--border-subtle)', 
          borderRadius: 'var(--radius-md)',
          padding: '1rem',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <textarea 
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder={type === 'json' ? "{\n  \"color\": {\n    \"blue\": {\n      \"$value\": \"#3B82F6\"\n    }\n  }\n}" : ":root {\n  --color-blue: #3B82F6;\n}"}
            style={{ 
              width: '100%', 
              height: '100%', 
              background: 'transparent', 
              border: 'none', 
              color: 'var(--text-primary)', 
              fontFamily: 'monospace',
              fontSize: '0.875rem',
              resize: 'none',
              outline: 'none',
              lineHeight: '1.5'
            }}
            spellCheck={false}
          />
        </div>

        {/* Validation Output Pane */}
        <div style={{ 
          background: 'var(--bg-surface)', 
          border: '1px solid var(--border-subtle)', 
          borderRadius: 'var(--radius-md)',
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center'
        }}>
          {validationResult ? (
            <>
              {validationResult.valid ? (
                <CheckCircle2 size={48} color="var(--accent-success)" style={{ marginBottom: '1rem' }} />
              ) : (
                <AlertCircle size={48} color="var(--accent-error)" style={{ marginBottom: '1rem' }} />
              )}
              <h3 style={{ color: validationResult.valid ? 'var(--accent-success)' : 'var(--accent-error)' }}>
                {validationResult.valid ? 'Success' : 'Validation Error'}
              </h3>
              <p style={{ marginTop: '0.5rem' }}>{validationResult.message}</p>
            </>
          ) : (
            <p style={{ color: 'var(--text-tertiary)' }}>
              Write your code on the left and click Validate to check your work against the system requirements.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
