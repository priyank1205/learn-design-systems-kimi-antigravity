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
        className={`fixed bottom-8 right-8 w-14 h-14 rounded-full flex items-center justify-center bg-primary text-black shadow-md transition-transform duration-300 hover:scale-105 z-50 ${isOpen ? 'hidden' : 'flex'}`}
      >
        <MessageSquare size={24} />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-8 right-8 w-full max-w-[400px] h-[600px] max-h-[80vh] flex flex-col z-50 overflow-hidden shadow-md bg-surface border border-subtle rounded-lg animate-slide-up">
          {/* Header */}
          <div className="p-4 border-b border-subtle flex justify-between items-center bg-base">
            <div className="flex items-center gap-2 font-semibold">
              <Bot className="text-accent" /> AI Tutor
            </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={togglePairMode} 
                className={`flex items-center gap-1 text-xs px-2 py-1 rounded-sm transition-colors ${pairMode ? 'text-warning bg-warning-bg' : 'text-secondary hover:text-primary'}`}
                title="Pair Programming Mode"
              >
                <Code2 size={16} /> Pair Mode
              </button>
              <button onClick={() => setIsOpen(false)} className="text-secondary hover:text-primary transition-colors">
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 bg-[#0A0A0A]" style={{ minHeight: 0 }}>
            {messages.map((m, i) => (
              <div key={i} className={`flex flex-col gap-1 ${m.role === 'user' ? 'self-end items-end' : 'self-start items-start'}`} style={{ minWidth: 0, maxWidth: '90%' }}>
                <div className="text-xs text-tertiary flex items-center gap-1">
                  {m.role === 'user' ? <><User size={12}/> You</> : <><Bot size={12}/> Tutor</>}
                </div>
                <div className={`p-4 rounded-md text-sm leading-relaxed overflow-hidden w-full ${m.role === 'user' ? 'bg-accent text-white' : 'bg-surface border border-subtle text-primary'}`}>
                  {m.role === 'user' ? m.content : (
                    <div className="tutor-prose" style={{ minWidth: 0 }}>
                      <style>{`
                        .tutor-prose p { margin-bottom: 0.75rem; word-wrap: break-word; }
                        .tutor-prose p:last-child { margin-bottom: 0; }
                        .tutor-prose code { background: var(--bg-base); padding: 0.2rem 0.4rem; border-radius: 4px; font-family: monospace; font-size: 0.85em; border: 1px solid var(--border-subtle); word-break: break-word; }
                        .tutor-prose pre { background: var(--bg-base); padding: 1rem; border-radius: 6px; overflow-x: auto; margin: 0.75rem 0; border: 1px solid var(--border-subtle); max-width: 100%; }
                        .tutor-prose pre code { background: transparent; padding: 0; border: none; word-break: normal; }
                        .tutor-prose strong { color: var(--accent-warning); }
                      `}</style>
                      <ReactMarkdown>{m.content}</ReactMarkdown>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {loading && (
              <div className="text-xs text-secondary flex items-center gap-2">
                <Bot size={14} className="animate-pulse" /> Tutor is thinking...
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-subtle bg-base flex gap-2">
            <input 
              type="text" 
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage()}
              placeholder={pairMode ? "Spot the flaw..." : "Ask for a hint..."}
              className="flex-1 bg-surface border border-subtle rounded-md p-3 text-primary text-sm outline-none focus:border-strong transition-colors"
            />
            <button 
              onClick={sendMessage} 
              disabled={loading || !input.trim()} 
              className={`p-3 rounded-md flex items-center justify-center transition-colors ${loading || !input.trim() ? 'bg-surface text-secondary cursor-not-allowed border border-subtle' : 'bg-primary text-black'}`}
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
