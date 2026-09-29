import React from 'react';
import { ArrowRight, CheckCircle2, Cpu, Map, BarChart2, Zap, Award, Sparkles, Compass } from 'lucide-react';

export default function LandingPage({ onStartAssessment, onExploreCareers }) {
  return (
    <div style={{ paddingBottom: '5rem', position: 'relative', overflow: 'hidden' }}>
      {/* Background Ambient Glow Orbs */}
      <div style={{
        position: 'absolute',
        top: '-150px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '700px',
        height: '450px',
        background: 'radial-gradient(circle, rgba(99, 102, 241, 0.25) 0%, rgba(139, 92, 246, 0.1) 40%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      {/* Hero Section */}
      <section style={{
        padding: '6rem 0 4rem 0',
        textAlign: 'center',
        position: 'relative',
        zIndex: 1
      }}>
        <div className="container" style={{ maxWidth: '900px' }}>
          <div 
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', padding: '0.4rem 1rem', fontSize: '0.85rem' }} 
            className="badge badge-indigo"
          >
            <Sparkles size={16} color="#818cf8" /> NEXT-GEN AI CAREER GUIDANCE PLATFORM
          </div>

          <h1 style={{
            fontSize: 'clamp(2.5rem, 5.5vw, 4.2rem)',
            letterSpacing: '-0.03em',
            marginBottom: '1.5rem',
            lineHeight: 1.1,
            fontWeight: 700
          }}>
            Build a career path that fits <span className="gradient-text">YOU.</span>
          </h1>

          <p style={{
            fontSize: '1.2rem',
            color: 'var(--text-secondary)',
            marginBottom: '2.75rem',
            lineHeight: 1.6,
            fontWeight: 400,
            maxWidth: '780px',
            margin: '0 auto 2.75rem auto'
          }}>
            Understand your strengths, discover suitable career paths, identify your skill gaps, and get a roadmap designed around your goals.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
            <button 
              onClick={onStartAssessment} 
              className="btn btn-primary"
              style={{ padding: '0.95rem 2rem', fontSize: '1.05rem', borderRadius: 'var(--radius-sm)' }}
            >
              Map My Career <ArrowRight size={20} />
            </button>
            <button 
              onClick={onExploreCareers} 
              className="btn btn-secondary"
              style={{ padding: '0.95rem 2rem', fontSize: '1.05rem', borderRadius: 'var(--radius-sm)' }}
            >
              Explore Careers
            </button>
          </div>

          {/* Workflow Visualization */}
          <div className="card" style={{
            marginTop: '4rem',
            padding: '2rem',
            background: 'rgba(15, 23, 42, 0.75)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: 'var(--radius-xl)',
            boxShadow: 'var(--shadow-lg), 0 0 30px rgba(99, 102, 241, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            flexWrap: 'wrap'
          }}>
            {[
              { label: 'You', sub: 'Profile & Strengths', step: '01' },
              { label: 'Skills', sub: 'Current Levels', step: '02' },
              { label: 'Career', sub: 'Explainable Fit', step: '03' },
              { label: 'Roadmap', sub: 'Adaptive Plan', step: '04' },
              { label: 'Progress', sub: 'Missions & Passport', step: '05' }
            ].map((s, idx, arr) => (
              <React.Fragment key={s.label}>
                <div style={{ textAlign: 'center', flex: 1, minWidth: '110px' }}>
                  <div style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    background: 'var(--gradient-accent)',
                    color: '#ffffff',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 0.6rem auto',
                    boxShadow: '0 0 15px rgba(99, 102, 241, 0.4)',
                    border: '1px solid rgba(255, 255, 255, 0.2)'
                  }}>
                    {s.step}
                  </div>
                  <div style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--text-primary)' }}>{s.label}</div>
                  <div style={{ fontSize: '0.775rem', color: 'var(--text-muted)' }}>{s.sub}</div>
                </div>
                {idx < arr.length - 1 && (
                  <div style={{ color: 'rgba(99, 102, 241, 0.5)', fontWeight: 300, fontSize: '1.5rem' }}>→</div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* Differentiator Section */}
      <section className="container" style={{ padding: '4rem 0 2rem 0', position: 'relative', zIndex: 1 }}>
        <div style={{
          textAlign: 'center',
          maxWidth: '700px',
          margin: '0 auto 3.5rem auto'
        }}>
          <h2 style={{ fontSize: '2.1rem', marginBottom: '0.85rem', letterSpacing: '-0.02em' }}>
            Not just career recommendations.
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
            A personalized path from where you are to where you want to be.
          </p>
        </div>

        <div className="grid-3">
          {/* Card 1 */}
          <div className="card">
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: 'var(--radius-sm)',
              background: 'rgba(99, 102, 241, 0.15)',
              color: '#818cf8',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1.25rem',
              border: '1px solid rgba(99, 102, 241, 0.3)'
            }}>
              <Cpu size={24} />
            </div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.65rem' }}>Explainable Career DNA</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.925rem', lineHeight: 1.6 }}>
              We don't just throw percentages at you. Pathwise breaks down 7 core skill dimensions so you see exactly why a role fits your unique profile.
            </p>
          </div>

          {/* Card 2 */}
          <div className="card">
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: 'var(--radius-sm)',
              background: 'rgba(139, 92, 246, 0.15)',
              color: '#c084fc',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1.25rem',
              border: '1px solid rgba(139, 92, 246, 0.3)'
            }}>
              <Zap size={24} />
            </div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.65rem' }}>Interactive What-If Simulator</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.925rem', lineHeight: 1.6 }}>
              Test how boosting specific target skills (like Java or DSA) projects your future career readiness in real-time before committing time.
            </p>
          </div>

          {/* Card 3 */}
          <div className="card">
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: 'var(--radius-sm)',
              background: 'rgba(16, 185, 129, 0.15)',
              color: '#34d399',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1.25rem',
              border: '1px solid rgba(16, 185, 129, 0.3)'
            }}>
              <Map size={24} />
            </div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.65rem' }}>Adaptive 12-Week Roadmap</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.925rem', lineHeight: 1.6 }}>
              Get a phase-by-phase learning plan that adjusts to your available daily study time (30 mins/day to 3+ hours/day) with trackable missions.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
