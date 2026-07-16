'use client';

import { useState } from 'react';
import { MessageSquare, X, Send, Bot, User, Code2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function AITutor() {
  const [isOpen, setIsOpen] = useState(false);
  const [pairMode, setPairMode] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hi! I am your AI Tutor. Need help understanding a concept or a hint for a boss fight?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const togglePairMode = () => {
    setPairMode(!pairMode);
    if (!pairMode) {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: `**Pair Programming Mode Enabled (Driver/Navigator).**
        
I have scaffolded a Button component for you, but I made a mistake by hardcoding a value instead of using a token. As the Navigator, can you spot the violation in this code?

\`\`\`jsx
<button style={{ backgroundColor: "#3B82F6", padding: "var(--space-4)" }}>
  Submit
</button>
\`\`\`` 
      }]);
    } else {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Pair Programming Mode Disabled. Back to normal Q&A!' }]);
    }
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: 'user', content: input } as Message];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    // Mock response for MVP Pair Programming
    if (pairMode) {
      setTimeout(() => {
        if (input.includes('#3B82F6') || input.toLowerCase().includes('hardcoded') || input.toLowerCase().includes('background')) {
          setMessages(prev => [...prev, { role: 'assistant', content: 'Excellent catch! I used the raw hex `#3B82F6` instead of the semantic token `var(--color-action-primary)`. You passed the drill!' }]);
        } else {
          setMessages(prev => [...prev, { role: 'assistant', content: 'Not quite. Look closely at the `backgroundColor` property. What should it be using instead of a raw hex code?' }]);
        }
        setLoading(false);
      }, 1000);
      return;
    }

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages })
      });

      const data = await res.json();
      
      if (data.reply) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
      } else {
        setMessages(prev => [...prev, { role: 'assistant', content: 'Oops, I encountered an error. Have you set the GEMINI_API_KEY?' }]);
      }
    } catch (e) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Network error communicating with Tutor.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className="primary-btn hover-effect"
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          display: isOpen ? 'none' : 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: 'var(--shadow-glow)',
          zIndex: 50
        }}
      >
        <MessageSquare size={28} />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="glass-panel animate-fade-in" style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          width: '400px',
          height: '600px',
          maxHeight: '80vh',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 100,
          overflow: 'hidden',
          boxShadow: '0 20px 60px rgba(0,0,0,0.8)',
          background: 'rgba(11, 10, 16, 0.85)',
          backdropFilter: 'blur(16px)'
        }}>
          {/* Header */}
          <div style={{ padding: '1rem', borderBottom: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-base)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '600' }}>
              <Bot color="var(--accent-primary)" /> AI Tutor
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button 
                onClick={togglePairMode} 
                style={{ 
                  color: pairMode ? 'var(--accent-warning)' : 'var(--text-secondary)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                  fontSize: '0.75rem',
                  background: pairMode ? 'rgba(245, 158, 11, 0.1)' : 'transparent',
                  padding: '0.25rem 0.5rem',
                  borderRadius: 'var(--radius-sm)'
                }}
                title="Pair Programming Mode"
              >
                <Code2 size={16} /> Pair Mode
              </button>
              <button onClick={() => setIsOpen(false)} style={{ color: 'var(--text-secondary)' }}>
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {messages.map((m, i) => (
              <div key={i} style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: m.role === 'user' ? 'flex-end' : 'flex-start',
                gap: '0.25rem'
              }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  {m.role === 'user' ? <><User size={12}/> You</> : <><Bot size={12}/> Tutor</>}
                </div>
                <div style={{ 
                  background: m.role === 'user' ? 'var(--accent-primary)' : 'rgba(255, 255, 255, 0.05)', 
                  padding: '1rem', 
                  borderRadius: 'var(--radius-md)', 
                  border: m.role === 'user' ? 'none' : '1px solid rgba(255, 255, 255, 0.1)',
                  color: m.role === 'user' ? '#fff' : 'var(--text-primary)',
                  maxWidth: '90%',
                  fontSize: '0.95rem',
                  lineHeight: '1.6',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                }}>
                  {m.role === 'user' ? m.content : (
                    <div className="tutor-prose">
                      <style>{`
                        .tutor-prose p { margin-bottom: 0.75rem; }
                        .tutor-prose p:last-child { margin-bottom: 0; }
                        .tutor-prose code { background: rgba(0,0,0,0.3); padding: 0.2rem 0.4rem; border-radius: 4px; font-family: monospace; font-size: 0.85em; }
                        .tutor-prose pre { background: rgba(0,0,0,0.4); padding: 1rem; border-radius: 6px; overflow-x: auto; margin: 0.75rem 0; border: 1px solid var(--border-subtle); }
                        .tutor-prose pre code { background: transparent; padding: 0; }
                        .tutor-prose strong { color: var(--accent-warning); }
                      `}</style>
                      <ReactMarkdown>{m.content}</ReactMarkdown>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {loading && (
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Bot size={14} /> Tutor is thinking...
              </div>
            )}
          </div>

          {/* Input */}
          <div style={{ padding: '1rem', borderTop: '1px solid var(--border-subtle)', background: 'var(--bg-base)', display: 'flex', gap: '0.5rem' }}>
            <input 
              type="text" 
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage()}
              placeholder={pairMode ? "Spot the flaw..." : "Ask for a hint..."}
              style={{
                flex: 1,
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-sm)',
                padding: '0.75rem',
                color: 'var(--text-primary)',
                outline: 'none'
              }}
            />
            <button onClick={sendMessage} disabled={loading || !input.trim()} className="primary-btn" style={{ padding: '0.75rem', borderRadius: 'var(--radius-sm)' }}>
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
