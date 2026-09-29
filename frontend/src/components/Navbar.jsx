import React from 'react';
import { Compass, Award, BarChart2, Cpu, Zap, Map, FileText, CheckSquare, Sparkles } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, hasAssessment, onOpenAssessment }) {
  const navItems = [
    { id: 'landing', label: 'Home', icon: Compass },
    ...(hasAssessment ? [
      { id: 'dna', label: 'Career DNA', icon: Cpu },
      { id: 'explorer', label: 'Career Explorer', icon: Compass },
      { id: 'gaps', label: 'Skill Gaps', icon: BarChart2 },
      { id: 'simulator', label: 'What-If Simulator', icon: Zap },
      { id: 'roadmap', label: 'Roadmap & Missions', icon: Map },
      { id: 'industry', label: 'Industry Pulse', icon: Sparkles },
      { id: 'passport', label: 'Career Passport', icon: Award }
    ] : [
      { id: 'industry', label: 'Industry Pulse', icon: Sparkles }
    ])
  ];

  return (
    <header style={{
      background: 'rgba(9, 13, 22, 0.85)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderBottom: '1px solid var(--border-color)',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }} className="no-print">
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '74px'
      }}>
        {/* Logo & Tagline */}
        <div 
          onClick={() => setActiveTab('landing')}
          style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', cursor: 'pointer' }}
        >
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: 'var(--gradient-accent)',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 20px rgba(99, 102, 241, 0.5)',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <Compass size={24} />
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.35rem', letterSpacing: '-0.02em' }}>
              <span className="gradient-text">Pathwise</span>
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '-2px' }}>
              Know where you are. Discover where you can go.
            </div>
          </div>
        </div>

        {/* Nav Links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', overflowX: 'auto', padding: '0.5rem 0' }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  padding: '0.5rem 0.95rem',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.875rem',
                  fontWeight: isActive ? 600 : 500,
                  color: isActive ? '#ffffff' : 'var(--text-secondary)',
                  background: isActive ? 'rgba(99, 102, 241, 0.2)' : 'transparent',
                  border: '1px solid',
                  borderColor: isActive ? 'rgba(99, 102, 241, 0.4)' : 'transparent',
                  whiteSpace: 'nowrap',
                  boxShadow: isActive ? '0 0 15px rgba(99, 102, 241, 0.2)' : 'none'
                }}
              >
                <Icon size={16} color={isActive ? '#818cf8' : 'var(--text-muted)'} />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* CTA Button */}
        <div>
          <button 
            onClick={onOpenAssessment}
            className="btn btn-primary"
            style={{ fontSize: '0.875rem', padding: '0.55rem 1.15rem' }}
          >
            {hasAssessment ? 'Retake Assessment' : 'Map My Career'}
          </button>
        </div>
      </div>
    </header>
  );
}
