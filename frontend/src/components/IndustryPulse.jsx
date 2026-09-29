import React, { useState, useEffect } from 'react';
import { Sparkles, TrendingUp, Wrench, Shield, Cpu, BookOpen, Info, Award } from 'lucide-react';
import { fetchIndustryPulse } from '../services/api';

export default function IndustryPulse() {
  const [trends, setTrends] = useState([]);
  const [activeCategory, setActiveCategory] = useState('Software Engineering');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPulse();
  }, []);

  const loadPulse = async () => {
    setLoading(true);
    const res = await fetchIndustryPulse();
    if (res.success && res.trends) {
      setTrends(res.trends);
    }
    setLoading(false);
  };

  const categories = [
    'Software Engineering',
    'Data Analytics',
    'AI / ML',
    'Cybersecurity',
    'Cloud / DevOps',
    'UI / UX Design'
  ];

  const currentTrend = trends.find(t => t.category === activeCategory) || trends[0];

  return (
    <div className="container" style={{ padding: '3rem 0' }}>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <div className="badge badge-indigo" style={{ marginBottom: '0.5rem' }}>
          INDUSTRY TREND ANALYSIS
        </div>
        <h1 style={{ fontSize: '2.2rem', letterSpacing: '-0.02em', marginBottom: '0.5rem' }}>
          Industry Pulse
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem' }}>
          Stay aligned with high-growth technical skills, tools, emerging technologies, and certification standards.
        </p>
      </div>

      {/* Dataset Label Banner */}
      <div style={{
        background: 'var(--bg-subtle)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-md)',
        padding: '0.85rem 1.25rem',
        marginBottom: '2rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        fontSize: '0.85rem',
        color: 'var(--text-secondary)'
      }}>
        <Info size={16} color="var(--accent-primary)" />
        <span>
          <strong>Dataset Source:</strong> Curated Industry Intelligence Dataset (2026 Tech Hiring Standards). Built ready for real-time live API integration.
        </span>
      </div>

      {/* Category Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.5rem', marginBottom: '2rem' }}>
        {categories.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: '0.6rem 1.1rem',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.9rem',
                fontWeight: isActive ? 600 : 500,
                color: isActive ? '#ffffff' : 'var(--text-secondary)',
                background: isActive ? 'var(--accent-primary)' : 'var(--bg-surface)',
                border: '1px solid',
                borderColor: isActive ? 'var(--accent-primary)' : 'var(--border-color)',
                whiteSpace: 'nowrap'
              }}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Main Pulse Card */}
      {currentTrend && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Top Summary Banner */}
          <div className="card" style={{ background: 'linear-gradient(135deg, #ffffff 0%, var(--accent-light) 100%)', border: '1px solid var(--border-focus)' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
              <div>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '0.35rem' }}>{currentTrend.category}</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', maxWidth: '700px' }}>
                  {currentTrend.description}
                </p>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--accent-text)', fontWeight: 600 }}>HIRING DEMAND INDEX</div>
                <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--accent-primary)', fontFamily: 'var(--font-heading)' }}>
                  {currentTrend.hiring_demand_score} / 100
                </div>
              </div>
            </div>
          </div>

          {/* Grid Breakdown */}
          <div className="grid-2">
            {/* Growing Skills */}
            <div className="card">
              <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <TrendingUp size={18} color="var(--accent-primary)" /> High-Growth Skills
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {currentTrend.growing_skills.map((skill) => (
                  <span key={skill} className="badge badge-indigo" style={{ padding: '0.4rem 0.75rem', fontSize: '0.85rem' }}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Essential Tools */}
            <div className="card">
              <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Wrench size={18} color="var(--accent-primary)" /> Essential Industry Tools
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {currentTrend.key_tools.map((tool) => (
                  <span key={tool} className="badge badge-subtle" style={{ padding: '0.4rem 0.75rem', fontSize: '0.85rem' }}>
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Emerging Tech */}
            <div className="card">
              <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Cpu size={18} color="var(--accent-primary)" /> Emerging Technologies
              </h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                {currentTrend.emerging_tech.map((tech) => (
                  <li key={tech} style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    • {tech}
                  </li>
                ))}
              </ul>
            </div>

            {/* Recommended Certifications */}
            <div className="card">
              <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Award size={18} color="var(--accent-primary)" /> Certification Tips
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                {currentTrend.certification_tips}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
