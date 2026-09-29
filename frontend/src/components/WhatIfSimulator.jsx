import React, { useState, useEffect } from 'react';
import { Zap, ArrowRight, Info, RefreshCw, CheckCircle, TrendingUp } from 'lucide-react';
import { runWhatIfSimulation } from '../services/api';

export default function WhatIfSimulator({ selectedCareer, profileData, onViewRoadmap }) {
  const [simulatedSkills, setSimulatedSkills] = useState({});
  const [simulationResult, setSimulationResult] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedCareer) {
      const initial = {};
      selectedCareer.important_skills.forEach((skill) => {
        const gapObj = (selectedCareer.skill_gaps || []).find(g => g.skill === skill);
        initial[skill] = gapObj ? gapObj.current : 65;
      });
      setSimulatedSkills(initial);
      executeSimulation(initial);
    }
  }, [selectedCareer]);

  const handleSliderChange = (skill, val) => {
    const next = { ...simulatedSkills, [skill]: parseInt(val) };
    setSimulatedSkills(next);
    executeSimulation(next);
  };

  const executeSimulation = async (improvements) => {
    if (!selectedCareer) return;
    setLoading(true);
    const res = await runWhatIfSimulation(profileData, selectedCareer.career_id, improvements);
    if (res.success && res.simulation) {
      setSimulationResult(res.simulation);
    }
    setLoading(false);
  };

  const resetSimulation = () => {
    if (selectedCareer) {
      const reset = {};
      selectedCareer.important_skills.forEach((skill) => {
        const gapObj = (selectedCareer.skill_gaps || []).find(g => g.skill === skill);
        reset[skill] = gapObj ? gapObj.current : 65;
      });
      setSimulatedSkills(reset);
      executeSimulation(reset);
    }
  };

  if (!selectedCareer) {
    return (
      <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>
        <h2>No career selected for What-If Simulation.</h2>
        <p style={{ color: 'var(--text-secondary)' }}>Select a career from Career Explorer first.</p>
      </div>
    );
  }

  const beforeFit = simulationResult ? simulationResult.before_fit : selectedCareer.fit_score;
  const afterFit = simulationResult ? simulationResult.after_fit : selectedCareer.fit_score;
  const fitDelta = afterFit - beforeFit;

  return (
    <div className="container" style={{ padding: '3.5rem 0' }}>
      {/* Header */}
      <div style={{ marginBottom: '2.5rem' }}>
        <div className="badge badge-indigo" style={{ marginBottom: '0.65rem' }}>
          WHAT IF I IMPROVE?
        </div>
        <h1 style={{ fontSize: '2.5rem', letterSpacing: '-0.02em', marginBottom: '0.65rem' }}>
          What-If Career Readiness Simulator
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '800px' }}>
          Simulate how dedicating effort to specific skills boosts your estimated readiness for <strong style={{ color: '#ffffff' }}>{selectedCareer.title}</strong>.
        </p>
      </div>

      {/* Prominent Disclaimer Banner */}
      <div style={{
        background: 'rgba(245, 158, 11, 0.12)',
        border: '1px solid rgba(245, 158, 11, 0.3)',
        borderRadius: 'var(--radius-md)',
        padding: '1.15rem 1.35rem',
        marginBottom: '2.25rem',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '0.85rem'
      }}>
        <Info size={22} color="#fbbf24" style={{ flexShrink: 0, marginTop: '2px' }} />
        <div style={{ fontSize: '0.9rem', color: '#fbbf24', lineHeight: 1.6 }}>
          <strong>SIMULATION ESTIMATE NOTICE:</strong> This tool calculates a projected readiness score based on your simulated skill target improvements. It is designed for scenario planning and is <em>not a guaranteed prediction of career outcomes</em>.
        </div>
      </div>

      {/* Main Interactive Grid */}
      <div className="grid-2">
        {/* Left: Skill Improvement Sliders */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.75rem' }}>
            <h3 style={{ fontSize: '1.25rem', color: '#ffffff' }}>Adjust Skill Levels</h3>
            <button onClick={resetSimulation} className="btn btn-secondary" style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem' }}>
              <RefreshCw size={14} /> Reset Sliders
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
            {selectedCareer.important_skills.map((skill) => {
              const currentVal = simulatedSkills[skill] || 50;
              const gapObj = (selectedCareer.skill_gaps || []).find(g => g.skill === skill);
              const baselineVal = gapObj ? gapObj.current : 50;
              const targetVal = gapObj ? gapObj.target : 85;

              return (
                <div key={skill}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem', marginBottom: '0.45rem' }}>
                    <span style={{ fontWeight: 600, color: '#ffffff' }}>{skill}</span>
                    <span style={{ color: currentVal > baselineVal ? '#818cf8' : 'var(--text-secondary)', fontWeight: 600 }}>
                      {baselineVal}% {currentVal > baselineVal && `➔ ${currentVal}%`}
                    </span>
                  </div>

                  <input
                    type="range"
                    min={baselineVal}
                    max="98"
                    value={currentVal}
                    onChange={(e) => handleSliderChange(skill, e.target.value)}
                  />

                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.775rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                    <span>Baseline: {baselineVal}%</span>
                    <span>Target: {targetVal}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Projected Readiness Dashboard */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Comparison Card */}
          <div className="card" style={{
            background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.9) 0%, rgba(99, 102, 241, 0.25) 100%)',
            border: '1px solid rgba(99, 102, 241, 0.4)',
            boxShadow: '0 0 35px rgba(99, 102, 241, 0.3)',
            textAlign: 'center',
            padding: '2.5rem 1.5rem'
          }}>
            <div style={{ fontSize: '0.85rem', color: '#a5b4fc', fontWeight: 700, letterSpacing: '0.05em', marginBottom: '0.75rem' }}>
              PROJECTED CAREER READINESS
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.75rem', margin: '1.25rem 0' }}>
              <div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>BEFORE</div>
                <div style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
                  {beforeFit}%
                </div>
              </div>

              <div style={{ fontSize: '2rem', color: '#818cf8', fontWeight: 700 }}>
                ➔
              </div>

              <div>
                <div style={{ fontSize: '0.8rem', color: '#a5b4fc', fontWeight: 600 }}>SIMULATED</div>
                <div style={{ fontSize: '3.5rem', fontWeight: 700, fontFamily: 'var(--font-heading)' }} className="gradient-text">
                  {afterFit}%
                </div>
              </div>
            </div>

            {fitDelta > 0 && (
              <div className="badge badge-emerald" style={{ fontSize: '0.95rem', padding: '0.45rem 1rem', margin: '0 auto' }}>
                <TrendingUp size={18} /> Projected Readiness Gain: +{fitDelta}%
              </div>
            )}
          </div>

          {/* Workflow Diagram */}
          <div className="card" style={{ padding: '1.5rem' }}>
            <h4 style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1.15rem' }}>
              Simulation Pipeline
            </h4>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.875rem' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontWeight: 600, color: '#ffffff' }}>Current Profile</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{beforeFit}% Readiness</div>
              </div>
              <div style={{ color: '#818cf8', fontWeight: 700 }}>➔</div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontWeight: 600, color: '#818cf8' }}>Skill Sprints</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Target Sliders</div>
              </div>
              <div style={{ color: '#818cf8', fontWeight: 700 }}>➔</div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontWeight: 600, color: '#34d399' }}>Projected Profile</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{afterFit}% Readiness</div>
              </div>
            </div>
          </div>

          <button onClick={onViewRoadmap} className="btn btn-primary" style={{ padding: '0.95rem', fontSize: '1rem' }}>
            Build Roadmap Based On Simulation <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
