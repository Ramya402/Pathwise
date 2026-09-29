import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { Sparkles, Award, Target, TrendingUp, CheckCircle, ArrowRight, Cpu } from 'lucide-react';

export default function CareerDna({ dnaData, profileData, onExploreCareers }) {
  if (!dnaData || !dnaData.dimensions) {
    return (
      <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>
        <h2>No Career DNA generated yet.</h2>
        <p style={{ color: 'var(--text-secondary)', margin: '1rem 0' }}>Complete the skill assessment to view your DNA profile.</p>
      </div>
    );
  }

  const chartData = Object.entries(dnaData.dimensions).map(([key, value]) => ({
    dimension: key,
    score: value,
    fullMark: 100
  }));

  return (
    <div className="container" style={{ padding: '3.5rem 0' }}>
      {/* Header */}
      <div style={{ marginBottom: '2.5rem' }}>
        <div className="badge badge-indigo" style={{ marginBottom: '0.65rem' }}>
          ASSESS & UNDERSTAND
        </div>
        <h1 style={{ fontSize: '2.5rem', letterSpacing: '-0.02em', marginBottom: '0.65rem' }}>
          Your Career DNA
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '800px' }}>
          A transparent multi-dimensional breakdown of your academic skills, technical competencies, and cognitive work traits.
        </p>
      </div>

      {/* Grid Layout */}
      <div className="grid-2" style={{ alignItems: 'center' }}>
        {/* Left: Recharts Radar Chart */}
        <div className="card" style={{ padding: '2rem 1.25rem 1.25rem 1.25rem', textAlign: 'center', background: 'rgba(15, 23, 42, 0.85)' }}>
          <h3 style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
            <Cpu size={20} color="#818cf8" /> Skill Dimension Vector Map
          </h3>
          <div style={{ width: '100%', height: '360px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="75%" data={chartData}>
                <PolarGrid stroke="rgba(255, 255, 255, 0.12)" />
                <PolarAngleAxis dataKey="dimension" tick={{ fill: '#cbd5e1', fontSize: 11, fontWeight: 500 }} />
                <Radar
                  name="Career DNA"
                  dataKey="score"
                  stroke="#818cf8"
                  fill="#6366f1"
                  fillOpacity={0.35}
                  strokeWidth={2.5}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right: Key Insights Metrics */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.35rem' }}>
          {/* Readiness Card */}
          <div className="card" style={{
            background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(99, 102, 241, 0.2) 100%)',
            border: '1px solid rgba(99, 102, 241, 0.4)',
            boxShadow: '0 0 30px rgba(99, 102, 241, 0.25)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#a5b4fc', letterSpacing: '0.02em' }}>
                ESTIMATED BASELINE READINESS
              </span>
              <Award size={24} color="#818cf8" />
            </div>
            <div style={{ fontSize: '3rem', fontWeight: 700, fontFamily: 'var(--font-heading)' }} className="gradient-text">
              {dnaData.current_readiness}%
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.35rem', lineHeight: 1.5 }}>
              Calculated transparently from your technical levels, academic profile, and soft skill dimensions.
            </p>
          </div>

          {/* Strongest Trait */}
          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.35rem' }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#34d399', boxShadow: '0 0 8px #34d399' }} />
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.05em' }}>
                YOUR STRONGEST TRAIT
              </span>
            </div>
            <div style={{ fontSize: '1.35rem', fontWeight: 700, color: '#ffffff' }}>
              {dnaData.strongest_trait}
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
              This domain gives you a distinct competitive advantage when targeting technical positions.
            </p>
          </div>

          {/* Biggest Opportunity */}
          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.35rem' }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#fbbf24', boxShadow: '0 0 8px #fbbf24' }} />
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.05em' }}>
                BIGGEST GROWTH OPPORTUNITY
              </span>
            </div>
            <div style={{ fontSize: '1.35rem', fontWeight: 700, color: '#ffffff' }}>
              {dnaData.biggest_opportunity}
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
              Targeting this area during your roadmap will unlock significant career readiness gains.
            </p>
          </div>

          <button onClick={onExploreCareers} className="btn btn-primary" style={{ marginTop: '0.5rem', width: '100%', padding: '0.85rem' }}>
            View Recommended Career Paths <ArrowRight size={18} />
          </button>
        </div>
      </div>

      {/* Dimension Breakdown Bar List */}
      <div style={{ marginTop: '3.5rem' }}>
        <h3 style={{ fontSize: '1.4rem', marginBottom: '1.5rem', letterSpacing: '-0.01em' }}>Dimension Breakdown</h3>
        <div className="grid-2">
          {Object.entries(dnaData.dimensions).map(([dim, score]) => (
            <div key={dim} className="card" style={{ padding: '1.35rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.65rem' }}>
                <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>{dim}</span>
                <span style={{ fontWeight: 700, color: '#818cf8' }}>{score}%</span>
              </div>
              <div className="progress-track">
                <div className="progress-fill" style={{ width: `${score}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
