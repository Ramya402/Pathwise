import React, { useState, useEffect } from 'react';
import { Award, Printer, CheckCircle, ShieldCheck, Sparkles, MapPin, Calendar, ArrowRight } from 'lucide-react';

export default function CareerPassport({ selectedCareer, profileData, dnaData }) {
  const [passportData, setPassportData] = useState(null);

  useEffect(() => {
    if (selectedCareer && profileData) {
      const dna = dnaData || {
        current_readiness: 64,
        strongest_trait: "Problem Solving"
      };
      
      const gaps = selectedCareer.skill_gaps || [];
      const biggestGap = gaps.length > 0 ? gaps[0].skill : "Data Structures";

      const badges = ["Explorer Baseline"];
      if (dna.current_readiness >= 60) badges.push("Tech Builder");
      if (selectedCareer.fit_score >= 80) badges.push("High Fit Candidate");
      badges.push("Portfolio Ready");

      setPassportData({
        user_name: profileData.name || "Alex Johnson",
        degree: profileData.degree || "B.Tech",
        branch: profileData.branch || "Computer Science",
        current_year: profileData.current_year || "3rd Year",
        career_direction: selectedCareer.title,
        career_fit: selectedCareer.fit_score,
        current_readiness: dna.current_readiness,
        top_strength: dna.strongest_trait || "Problem Solving",
        biggest_gap: biggestGap,
        roadmap_duration: "12 Weeks",
        next_mission: selectedCareer.next_action || "Complete Data Structures foundation",
        badges: badges
      });
    }
  }, [selectedCareer, profileData, dnaData]);

  const handlePrint = () => {
    window.print();
  };

  if (!passportData) {
    return (
      <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>
        <h2>No Career Passport generated yet.</h2>
        <p style={{ color: 'var(--text-secondary)' }}>Complete your skill assessment and select a career path.</p>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '3.5rem 0' }}>
      {/* Header */}
      <div className="no-print" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
        <div>
          <div className="badge badge-indigo" style={{ marginBottom: '0.65rem' }}>
            TRACK & SHARE
          </div>
          <h1 style={{ fontSize: '2.5rem', letterSpacing: '-0.02em', marginBottom: '0.65rem' }}>
            Your Career Passport
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
            A verified executive snapshot of your career readiness, strengths, and milestones.
          </p>
        </div>

        <button onClick={handlePrint} className="btn btn-primary" style={{ padding: '0.85rem 1.75rem', fontSize: '1rem' }}>
          <Printer size={18} /> Download / Print Passport
        </button>
      </div>

      {/* Printable Passport Card */}
      <div className="card" style={{
        maxWidth: '900px',
        margin: '0 auto',
        padding: '3rem',
        borderRadius: 'var(--radius-xl)',
        border: '1px solid rgba(99, 102, 241, 0.4)',
        boxShadow: '0 0 45px rgba(99, 102, 241, 0.25)',
        background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.9) 100%)',
        position: 'relative'
      }}>
        {/* Top Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '1.75rem', marginBottom: '2.25rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', fontWeight: 700, fontSize: '1.35rem', fontFamily: 'var(--font-heading)' }} className="gradient-text">
              <Award size={28} color="#818cf8" /> PATHWISE CAREER PASSPORT
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.2rem', letterSpacing: '0.05em' }}>
              OFFICIAL READINESS & SKILL DENSITY PROFILE
            </div>
          </div>

          <div>
            <span className="badge badge-emerald" style={{ padding: '0.45rem 0.95rem', fontSize: '0.85rem' }}>
              ✓ VERIFIED PROFILE
            </span>
          </div>
        </div>

        {/* User & Career Info */}
        <div className="grid-2" style={{ marginBottom: '2.25rem', gap: '1.75rem' }}>
          <div>
            <div style={{ fontSize: '0.775rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em' }}>STUDENT CANDIDATE</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#ffffff', marginTop: '0.2rem' }}>
              {passportData.user_name}
            </div>
            <div style={{ fontSize: '0.925rem', color: 'var(--text-secondary)' }}>
              {passportData.degree} in {passportData.branch} ({passportData.current_year})
            </div>
          </div>

          <div>
            <div style={{ fontSize: '0.775rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em' }}>TARGET CAREER DIRECTION</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#818cf8', marginTop: '0.2rem' }}>
              {passportData.career_direction}
            </div>
            <div style={{ fontSize: '0.925rem', color: 'var(--text-secondary)' }}>
              Role Fit Alignment: <strong style={{ color: '#ffffff' }}>{passportData.career_fit}%</strong>
            </div>
          </div>
        </div>

        {/* 4 Metric Boxes */}
        <div className="grid-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.15rem', marginBottom: '2.25rem' }}>
          <div style={{ background: 'rgba(15, 23, 42, 0.7)', border: '1px solid var(--border-color)', padding: '1.15rem', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700, letterSpacing: '0.05em' }}>READINESS</div>
            <div style={{ fontSize: '2rem', fontWeight: 700, color: '#818cf8', fontFamily: 'var(--font-heading)' }}>
              {passportData.current_readiness}%
            </div>
          </div>

          <div style={{ background: 'rgba(15, 23, 42, 0.7)', border: '1px solid var(--border-color)', padding: '1.15rem', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700, letterSpacing: '0.05em' }}>TOP STRENGTH</div>
            <div style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff', marginTop: '0.4rem' }}>
              {passportData.top_strength}
            </div>
          </div>

          <div style={{ background: 'rgba(15, 23, 42, 0.7)', border: '1px solid var(--border-color)', padding: '1.15rem', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700, letterSpacing: '0.05em' }}>PRIMARY GAP</div>
            <div style={{ fontSize: '1rem', fontWeight: 700, color: '#fbbf24', marginTop: '0.4rem' }}>
              {passportData.biggest_gap}
            </div>
          </div>

          <div style={{ background: 'rgba(15, 23, 42, 0.7)', border: '1px solid var(--border-color)', padding: '1.15rem', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700, letterSpacing: '0.05em' }}>DURATION</div>
            <div style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff', marginTop: '0.4rem' }}>
              {passportData.roadmap_duration}
            </div>
          </div>
        </div>

        {/* Badges Earned */}
        <div style={{ marginBottom: '2.25rem' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.85rem' }}>
            EARNED CANDIDATE BADGES
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
            {passportData.badges.map((b) => (
              <span key={b} className="badge badge-indigo" style={{ padding: '0.45rem 0.95rem', fontSize: '0.875rem' }}>
                <ShieldCheck size={16} /> {b}
              </span>
            ))}
          </div>
        </div>

        {/* Recommended Next Action */}
        <div style={{ background: 'rgba(99, 102, 241, 0.15)', padding: '1.15rem 1.35rem', borderRadius: 'var(--radius-md)', border: '1px solid rgba(99, 102, 241, 0.3)' }}>
          <div style={{ fontSize: '0.775rem', color: '#a5b4fc', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            CURRENT HIGH-PRIORITY ACTION
          </div>
          <div style={{ fontSize: '1rem', color: '#ffffff', fontWeight: 600, marginTop: '0.25rem' }}>
            → {passportData.next_mission}
          </div>
        </div>
      </div>
    </div>
  );
}
