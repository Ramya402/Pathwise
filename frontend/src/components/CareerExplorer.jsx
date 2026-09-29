import React from 'react';
import { CheckCircle2, AlertTriangle, ArrowRight, Zap, Briefcase, DollarSign, TrendingUp } from 'lucide-react';

export default function CareerExplorer({ careers, selectedCareer, onSelectCareer, onAnalyzeGaps, onRunSimulator }) {
  if (!careers || careers.length === 0) {
    return (
      <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>
        <h2>No career recommendations found.</h2>
        <p style={{ color: 'var(--text-secondary)' }}>Please complete the skill assessment first.</p>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '3.5rem 0' }}>
      {/* Header */}
      <div style={{ marginBottom: '2.5rem' }}>
        <div className="badge badge-indigo" style={{ marginBottom: '0.65rem' }}>
          EXPLORE & IDENTIFY
        </div>
        <h1 style={{ fontSize: '2.5rem', letterSpacing: '-0.02em', marginBottom: '0.65rem' }}>
          Recommended Career Paths
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '800px' }}>
          Every recommendation is calculated transparently from your academic profile, skill self-assessment, and scenario answers.
        </p>
      </div>

      {/* Career Cards Stack */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {careers.map((c) => {
          const isSelected = selectedCareer && selectedCareer.career_id === c.career_id;
          return (
            <div 
              key={c.career_id}
              className="card"
              style={{
                border: isSelected ? '2px solid #6366f1' : '1px solid var(--border-color)',
                boxShadow: isSelected ? '0 0 30px rgba(99, 102, 241, 0.25)' : 'var(--shadow-md)',
                background: isSelected ? 'linear-gradient(180deg, rgba(30, 41, 59, 0.85) 0%, rgba(15, 23, 42, 0.95) 100%)' : 'var(--bg-surface)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                position: 'relative'
              }}
            >
              {isSelected && (
                <div 
                  className="badge badge-indigo"
                  style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', padding: '0.4rem 0.85rem' }}
                >
                  ACTIVE SELECTION
                </div>
              )}

              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                <div style={{ maxWidth: '650px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '0.4rem' }}>
                    <h2 style={{ fontSize: '1.6rem', color: '#ffffff' }}>{c.title}</h2>
                    <span className="badge badge-subtle">{c.category}</span>
                  </div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.975rem', lineHeight: 1.6 }}>
                    {c.description}
                  </p>
                </div>

                {/* Fit Score Badge */}
                <div style={{
                  textAlign: 'right',
                  padding: '0.75rem 1.25rem',
                  background: 'rgba(99, 102, 241, 0.15)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid rgba(99, 102, 241, 0.3)'
                }}>
                  <div style={{ fontSize: '0.75rem', color: '#a5b4fc', fontWeight: 700, letterSpacing: '0.05em' }}>CAREER FIT</div>
                  <div style={{ fontSize: '2.5rem', fontWeight: 700, fontFamily: 'var(--font-heading)' }} className="gradient-text">
                    {c.fit_score}%
                  </div>
                </div>
              </div>

              {/* Breakdown Grid */}
              <div className="grid-2" style={{ gap: '1.5rem', marginBottom: '1.5rem', background: 'rgba(30, 41, 59, 0.5)', padding: '1.35rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                {/* Why It Fits */}
                <div>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: 600, color: '#ffffff', marginBottom: '0.65rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <CheckCircle2 size={18} color="#34d399" /> WHY IT FITS YOU:
                  </h4>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    {c.why_it_fits.map((reason, idx) => (
                      <li key={idx} style={{ fontSize: '0.9rem', color: '#cbd5e1' }}>
                        {reason}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Skill Gaps Summary */}
                <div>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: 600, color: '#ffffff', marginBottom: '0.65rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <AlertTriangle size={18} color="#fbbf24" /> TOP SKILL GAPS:
                  </h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
                    {c.skill_gaps && c.skill_gaps.length > 0 ? (
                      c.skill_gaps.slice(0, 3).map((gap) => (
                        <span key={gap.skill} className="badge badge-amber">
                          △ {gap.skill} ({gap.current}% → {gap.target}%)
                        </span>
                      ))
                    ) : (
                      <span className="badge badge-emerald">✓ Minimal skill gaps identified</span>
                    )}
                  </div>

                  <div style={{ fontSize: '0.825rem', color: 'var(--text-muted)', marginTop: '0.85rem' }}>
                    <strong style={{ color: '#ffffff' }}>Next Action:</strong> {c.next_action}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                  <span><DollarSign size={15} color="#818cf8" style={{ display: 'inline', verticalAlign: '-2px' }} /> {c.salary_range}</span>
                  <span><TrendingUp size={15} color="#34d399" style={{ display: 'inline', verticalAlign: '-2px' }} /> Demand: {c.demand_level}</span>
                </div>

                <div style={{ display: 'flex', gap: '0.85rem' }}>
                  <button 
                    onClick={() => {
                      onSelectCareer(c);
                      onRunSimulator(c);
                    }}
                    className="btn btn-outline"
                    style={{ fontSize: '0.9rem' }}
                  >
                    <Zap size={16} /> What-If Simulator
                  </button>
                  <button 
                    onClick={() => {
                      onSelectCareer(c);
                      onAnalyzeGaps(c);
                    }}
                    className="btn btn-primary"
                    style={{ fontSize: '0.9rem' }}
                  >
                    Analyze Skill Gaps <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
