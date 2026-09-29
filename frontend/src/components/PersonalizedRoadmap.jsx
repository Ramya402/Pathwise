import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { CheckSquare, Square, Clock, Calendar, MapPin, Award, RefreshCcw, Sparkles } from 'lucide-react';
import { fetchRoadmap, toggleMissionStatus } from '../services/api';

export default function PersonalizedRoadmap({ selectedCareer, profileData, onTimeChange, onViewPassport }) {
  const [roadmap, setRoadmap] = useState(null);
  const [missions, setMissions] = useState([]);
  const [selectedTime, setSelectedTime] = useState(profileData?.time_per_day || '1 hour/day');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadRoadmap(selectedTime);
  }, [selectedCareer, selectedTime]);

  const loadRoadmap = async (timeCommitment) => {
    if (!selectedCareer) return;
    setLoading(true);
    const updatedProfile = { ...profileData, time_per_day: timeCommitment };
    const res = await fetchRoadmap(updatedProfile, selectedCareer.career_id);
    if (res.success && res.roadmap) {
      setRoadmap(res.roadmap);
      const mList = [];
      res.roadmap.phases.forEach((p) => {
        p.tasks.forEach((t) => {
          mList.push({
            ...t,
            phase: p.phase,
            completed: t.completed || false
          });
        });
      });
      setMissions(mList);
    }
    setLoading(false);
  };

  const handleToggleMission = async (mId) => {
    const target = missions.find(m => m.id === mId);
    if (!target) return;
    const nextState = !target.completed;

    if (nextState) {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.8 },
        colors: ['#6366f1', '#10b981', '#ec4899']
      });
    }

    setMissions(prev => prev.map(m => m.id === mId ? { ...m, completed: nextState } : m));
    await toggleMissionStatus(profileData?.user_id || 'demo-user', mId, nextState);
  };

  const handlePaceChange = (timeLabel) => {
    setSelectedTime(timeLabel);
    if (onTimeChange) onTimeChange(timeLabel);
  };

  if (!selectedCareer) {
    return (
      <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>
        <h2>No career selected for Learning Roadmap.</h2>
        <p style={{ color: 'var(--text-secondary)' }}>Select a career path from Career Explorer first.</p>
      </div>
    );
  }

  const completedCount = missions.filter(m => m.completed).length;
  const totalCount = missions.length || 1;
  const progressPct = Math.round((completedCount / totalCount) * 100);

  return (
    <div className="container" style={{ padding: '3.5rem 0' }}>
      {/* Header & Controls */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1.5rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
        <div>
          <div className="badge badge-indigo" style={{ marginBottom: '0.65rem' }}>
            HOW DO I GET THERE?
          </div>
          <h1 style={{ fontSize: '2.5rem', letterSpacing: '-0.02em', marginBottom: '0.65rem' }}>
            Adaptive 12-Week Roadmap
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '750px' }}>
            Personalized learning path for <strong style={{ color: '#ffffff' }}>{selectedCareer.title}</strong> based on your skill gaps.
          </p>
        </div>

        {/* Time Pace Selector */}
        <div className="card" style={{ padding: '1.15rem', background: 'rgba(15, 23, 42, 0.85)' }}>
          <div style={{ fontSize: '0.775rem', color: '#a5b4fc', fontWeight: 700, letterSpacing: '0.05em', marginBottom: '0.65rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <Clock size={14} /> ADAPTIVE PACING CONTROL
          </div>
          <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap' }}>
            {['30 minutes/day', '1 hour/day', '2 hours/day', '3+ hours/day'].map((timeOpt) => (
              <button
                key={timeOpt}
                onClick={() => handlePaceChange(timeOpt)}
                style={{
                  padding: '0.4rem 0.75rem',
                  fontSize: '0.8rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid',
                  borderColor: selectedTime === timeOpt ? '#6366f1' : 'var(--border-color)',
                  background: selectedTime === timeOpt ? 'rgba(99, 102, 241, 0.2)' : 'transparent',
                  color: selectedTime === timeOpt ? '#ffffff' : 'var(--text-secondary)',
                  fontWeight: selectedTime === timeOpt ? 600 : 400
                }}
              >
                {timeOpt}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Overall Progress Widget */}
      <div className="card" style={{ marginBottom: '2.5rem', background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(99, 102, 241, 0.15) 100%)', border: '1px solid rgba(99, 102, 241, 0.3)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', color: '#ffffff' }}>Career Progress Tracker</h3>
            <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              {completedCount} of {totalCount} Career Missions Completed
            </div>
          </div>

          <div style={{ fontSize: '2.25rem', fontWeight: 700, fontFamily: 'var(--font-heading)' }} className="gradient-text">
            {progressPct}%
          </div>
        </div>

        <div className="progress-track" style={{ height: '11px' }}>
          <div className="progress-fill" style={{ width: `${progressPct}%` }} />
        </div>
      </div>

      {/* Roadmap Phase Timeline */}
      {roadmap && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {roadmap.phases.map((phase) => (
            <div key={phase.phase} className="card" style={{ position: 'relative', overflow: 'hidden' }}>
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                bottom: 0,
                width: '4px',
                background: 'var(--gradient-accent)'
              }} />

              <div style={{ paddingLeft: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.65rem', flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                    <span className="badge badge-indigo">{phase.phase}</span>
                    <h3 style={{ fontSize: '1.35rem', color: '#ffffff' }}>{phase.title}</h3>
                  </div>
                  <span style={{ fontSize: '0.875rem', color: '#a5b4fc', fontWeight: 500 }}>
                    <Calendar size={15} style={{ display: 'inline', verticalAlign: '-2px' }} /> {phase.weeks}
                  </span>
                </div>

                <p style={{ fontSize: '0.925rem', color: 'var(--text-secondary)', marginBottom: '1.35rem' }}>
                  <strong style={{ color: '#ffffff' }}>Focus:</strong> {phase.focus}
                </p>

                {/* Missions List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  {phase.tasks.map((task) => {
                    const isDone = missions.find(m => m.id === task.id)?.completed || false;
                    return (
                      <div
                        key={task.id}
                        onClick={() => handleToggleMission(task.id)}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '0.95rem',
                          padding: '0.95rem 1.15rem',
                          borderRadius: 'var(--radius-sm)',
                          border: '1px solid',
                          borderColor: isDone ? 'var(--success-border)' : 'var(--border-color)',
                          background: isDone ? 'var(--success-bg)' : 'rgba(15, 23, 42, 0.6)',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <div style={{ color: isDone ? 'var(--success-text)' : 'var(--text-muted)', marginTop: '2px' }}>
                          {isDone ? <CheckSquare size={20} /> : <Square size={20} />}
                        </div>

                        <div>
                          <div style={{
                            fontWeight: 600,
                            fontSize: '0.95rem',
                            color: isDone ? 'var(--success-text)' : '#ffffff',
                            textDecoration: isDone ? 'line-through' : 'none'
                          }}>
                            {task.title}
                          </div>
                          {task.description && (
                            <div style={{ fontSize: '0.85rem', color: isDone ? 'var(--success-text)' : 'var(--text-secondary)', marginTop: '0.2rem' }}>
                              {task.description}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Footer Passport Action */}
      <div style={{ marginTop: '3.5rem', textAlign: 'center' }}>
        <button onClick={onViewPassport} className="btn btn-primary" style={{ padding: '0.95rem 2.25rem', fontSize: '1.05rem' }}>
          <Award size={20} /> Generate Career Passport
        </button>
      </div>
    </div>
  );
}
