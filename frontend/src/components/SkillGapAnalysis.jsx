import React from 'react';
import { AlertCircle, ArrowRight, Zap, CheckCircle2, Target } from 'lucide-react';

export default function SkillGapAnalysis({ selectedCareer, onRunSimulator, onViewRoadmap }) {
  if (!selectedCareer) {
    return (
      <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>
        <h2>No career selected for Skill Gap Analysis.</h2>
        <p style={{ color: 'var(--text-secondary)' }}>Select a career path from Career Explorer to analyze skill gaps.</p>
      </div>
    );
  }

  const gaps = selectedCareer.skill_gaps || [];

  return (
    <div className="container" style={{ padding: '3rem 0' }}>
      {/* Header */}
      <div style={{ marginBottom: '2.5rem' }}>
        <div className="badge badge-indigo" style={{ marginBottom: '0.5rem' }}>
          WHAT AM I MISSING?
        </div>
        <h1 style={{ fontSize: '2.2rem', letterSpacing: '-0.02em', marginBottom: '0.5rem' }}>
          Skill Gap Analysis — {selectedCareer.title}
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem' }}>
          Comparing your current profile against industry target expectations for <strong style={{ color: 'var(--text-primary)' }}>{selectedCareer.title}</strong>.
        </p>
      </div>

      {/* Target vs Current Comparison Bars */}
      <div className="card" style={{ marginBottom: '2.5rem' }}>
        <h3 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Target size={20} color="var(--accent-primary)" /> Current Profile vs Target Profile
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {selectedCareer.important_skills.map((skill) => {
            const gapObj = gaps.find(g => g.skill === skill);
            const currentScore = gapObj ? gapObj.current : 75;
            const targetScore = gapObj ? gapObj.target : 85;

            return (
              <div key={skill}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '0.4rem' }}>
                  <span style={{ fontWeight: 600 }}>{skill}</span>
                  <div style={{ display: 'flex', gap: '1rem', fontSize: '0.85rem' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Current: <strong>{currentScore}%</strong></span>
                    <span style={{ color: 'var(--accent-primary)' }}>Target: <strong>{targetScore}%</strong></span>
                  </div>
                </div>

                {/* Layered Bar */}
                <div style={{ position: 'relative', width: '100%', height: '10px', background: 'var(--bg-subtle)', borderRadius: '999px', overflow: 'hidden' }}>
                  {/* Target Background Fill */}
                  <div style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: `${targetScore}%`, background: 'var(--accent-light)', borderRadius: '999px' }} />
                  {/* Current Fill */}
                  <div style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: `${currentScore}%`, background: 'var(--accent-primary)', borderRadius: '999px' }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Top 3 Skill Gaps Deep Dive */}
      <div style={{ marginBottom: '2.5rem' }}>
        <h3 style={{ fontSize: '1.3rem', marginBottom: '1.25rem' }}>
          Your Top Critical Skill Gaps
        </h3>

        {gaps.length === 0 ? (
          <div className="card" style={{ background: 'var(--success-bg)', border: '1px solid var(--success-border)', padding: '1.5rem' }}>
            <h4 style={{ color: 'var(--success-text)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <CheckCircle2 size={20} /> Excellent Match! No significant skill gaps identified.
            </h4>
            <p style={{ color: 'var(--success-text)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
              Your profile satisfies the core technical target requirements for {selectedCareer.title}.
            </p>
          </div>
        ) : (
          <div className="grid-3">
            {gaps.slice(0, 3).map((gap, index) => (
              <div key={gap.skill} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                    <span className="badge badge-amber">GAP #{index + 1}</span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Delta: -{gap.gap}%</span>
                  </div>

                  <h4 style={{ fontSize: '1.15rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
                    {gap.skill}
                  </h4>

                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem', lineHeight: 1.5 }}>
                    <strong>Why it matters:</strong> {gap.why_it_matters}
                  </p>
                </div>

                <div style={{ background: 'var(--bg-subtle)', padding: '0.85rem', borderRadius: 'var(--radius-sm)' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.2rem' }}>
                    Recommended Learning Action
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--accent-text)', fontWeight: 500 }}>
                    → {gap.action}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* CTA Footer */}
      <div className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap', background: 'linear-gradient(135deg, #ffffff 0%, var(--bg-subtle) 100%)' }}>
        <div>
          <h4 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>Want to simulate improving these skills?</h4>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            Use the What-If Simulator to project your updated career readiness before starting your roadmap.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button onClick={onRunSimulator} className="btn btn-secondary">
            <Zap size={16} /> Open What-If Simulator
          </button>
          <button onClick={onViewRoadmap} className="btn btn-primary">
            View Personalized Roadmap <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
