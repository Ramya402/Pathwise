import React, { useState } from 'react';
import { MessageSquare, Send, X, Bot, User, Sparkles, Minimize2 } from 'lucide-react';
import { queryAiAssistant } from '../services/api';

export default function AiAssistant({ profileData, selectedCareer, dnaData }) {
  const [isOpen, setIsOpen] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: `Hello! I'm your Pathwise AI Assistant. Ask me anything about your skill gaps, portfolio projects, or study pace!`
    }
  ]);
  const [loading, setLoading] = useState(false);

  const quickChips = [
    'What should I learn next?',
    'Why was I recommended this career?',
    'What project should I build?',
    'I only have one hour per day. What should I do?'
  ];

  const handleSend = async (customText) => {
    const textToSend = customText || prompt;
    if (!textToSend.trim()) return;

    const newMsgs = [...messages, { sender: 'user', text: textToSend }];
    setMessages(newMsgs);
    if (!customText) setPrompt('');
    setLoading(true);

    const careerTitle = selectedCareer ? selectedCareer.title : 'Software Engineer';
    const res = await queryAiAssistant(textToSend, profileData, careerTitle, dnaData);

    setMessages([...newMsgs, { sender: 'bot', text: res.response || 'I am ready to help you with your career goals!' }]);
    setLoading(false);
  };

  return (
    <div className="no-print" style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 999 }}>
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.65rem',
            padding: '0.85rem 1.35rem',
            borderRadius: '999px',
            background: 'var(--accent-primary)',
            color: '#ffffff',
            boxShadow: '0 8px 24px rgba(79, 70, 229, 0.35)',
            fontWeight: 600,
            fontSize: '0.925rem'
          }}
        >
          <Bot size={20} /> Ask Pathwise AI
        </button>
      ) : (
        <div className="card" style={{
          width: '380px',
          height: '520px',
          borderRadius: 'var(--radius-lg)',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: 'var(--shadow-lg)',
          border: '1px solid var(--border-color)',
          padding: 0,
          overflow: 'hidden',
          background: '#ffffff'
        }}>
          {/* Header */}
          <div style={{
            padding: '1rem 1.25rem',
            background: 'var(--accent-primary)',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Bot size={20} />
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>Pathwise AI Assistant</div>
                <div style={{ fontSize: '0.725rem', opacity: 0.85 }}>Context-Aware Career Guide</div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} style={{ color: '#ffffff', opacity: 0.85 }}>
              <X size={18} />
            </button>
          </div>

          {/* Messages Area */}
          <div style={{
            flex: 1,
            padding: '1rem',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.85rem',
            background: 'var(--bg-main)'
          }}>
            {messages.map((m, idx) => (
              <div
                key={idx}
                style={{
                  alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '85%',
                  padding: '0.75rem 0.95rem',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.85rem',
                  lineHeight: 1.5,
                  whiteSpace: 'pre-line',
                  background: m.sender === 'user' ? 'var(--accent-primary)' : 'var(--bg-surface)',
                  color: m.sender === 'user' ? '#ffffff' : 'var(--text-primary)',
                  border: m.sender === 'user' ? 'none' : '1px solid var(--border-color)',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                {m.text}
              </div>
            ))}
            {loading && (
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                Pathwise AI is thinking...
              </div>
            )}
          </div>

          {/* Quick Prompt Chips */}
          <div style={{ padding: '0.5rem 0.75rem', background: 'var(--bg-surface)', borderTop: '1px solid var(--border-color)', display: 'flex', gap: '0.35rem', overflowX: 'auto' }}>
            {quickChips.map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(chip)}
                style={{
                  padding: '0.25rem 0.55rem',
                  fontSize: '0.725rem',
                  borderRadius: 'var(--radius-sm)',
                  background: 'var(--bg-subtle)',
                  color: 'var(--text-secondary)',
                  border: '1px solid var(--border-color)',
                  whiteSpace: 'nowrap'
                }}
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <form
            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
            style={{
              padding: '0.75rem',
              background: 'var(--bg-surface)',
              borderTop: '1px solid var(--border-color)',
              display: 'flex',
              gap: '0.5rem'
            }}
          >
            <input
              type="text"
              placeholder="Ask a question..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              style={{
                flex: 1,
                padding: '0.55rem 0.85rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-color)',
                fontSize: '0.85rem'
              }}
            />
            <button type="submit" className="btn btn-primary" style={{ padding: '0.55rem 0.85rem' }}>
              <Send size={16} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
