import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Check, Sparkles, BookOpen, Cpu, Heart, Target, Clock } from 'lucide-react';

export default function AssessmentFlow({ onSubmit, onCancel }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: 'Alex Johnson',
    degree: 'B.Tech / B.E.',
    branch: 'Computer Science & Engineering',
    current_year: '3rd Year',
    cgpa: '8.2',
    strong_subjects: ['Data Structures', 'Database Systems'],
    difficult_subjects: ['Computer Networks'],
    tech_skills: {
      'Java': 'Intermediate',
      'Python': 'Basic',
      'SQL': 'Intermediate',
      'Data Structures': 'Beginner',
      'Git/GitHub': 'Basic',
      'HTML/CSS': 'Intermediate',
      'React': 'Beginner'
    },
    soft_skills: {
      'Communication': 75,
      'Problem solving': 80,
      'Teamwork': 85,
      'Leadership': 65,
      'Creativity': 70,
      'Adaptability': 80,
      'Analytical thinking': 85
    },
    scenario_interests: ['A'], // A: Building app, B: Finding patterns, C: Designing UX, D: Securing system, E: Managing cloud
    work_style: {
      preference: 'building',
      collaboration: 'collaborative'
    },
    career_goals: {
      target_role: 'Software Engineer',
      preferred_industry: 'Tech SaaS & Products'
    },
    time_per_day: '1 hour/day'
  });

  const availableTechSkills = [
    'Java', 'Python', 'C++', 'JavaScript', 'HTML/CSS', 'SQL', 
    'React', 'Machine Learning', 'Data Analysis', 'Cloud', 'Cybersecurity', 'Git/GitHub'
  ];

  const levels = ['Beginner', 'Basic', 'Intermediate', 'Advanced'];

  const scenarioQuestions = [
    {
      id: 'A',
      title: 'Building an application',
      desc: 'Writing clean code, designing logic, creating APIs and software features.'
    },
    {
      id: 'B',
      title: 'Finding patterns in data',
      desc: 'Analyzing datasets, extracting trends, building predictive algorithms.'
    },
    {
      id: 'C',
      title: 'Designing a user experience',
      desc: 'Crafting user interfaces, wireframes, micro-interactions, and accessible layouts.'
    },
    {
      id: 'D',
      title: 'Securing a system',
      desc: 'Identifying security vulnerabilities, auditing network protocols, defending against cyber attacks.'
    },
    {
      id: 'E',
      title: 'Managing cloud infrastructure',
      desc: 'Automating deployment pipelines, containerizing services with Docker, monitoring cloud uptime.'
    }
  ];

  const handleTechSkillChange = (skill, level) => {
    setFormData(prev => ({
      ...prev,
      tech_skills: {
        ...prev.tech_skills,
        [skill]: level
      }
    }));
  };

  const handleSoftSkillChange = (skill, val) => {
    setFormData(prev => ({
      ...prev,
      soft_skills: {
        ...prev.soft_skills,
        [skill]: parseInt(val)
      }
    }));
  };

  const toggleScenario = (id) => {
    setFormData(prev => {
      const curr = prev.scenario_interests;
      const next = curr.includes(id) ? curr.filter(x => x !== id) : [...curr, id];
      return { ...prev, scenario_interests: next.length > 0 ? next : ['A'] };
    });
  };

  const handleNext = () => {
    if (step < 5) setStep(step + 1);
    else onSubmit(formData);
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(15, 23, 42, 0.4)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '1rem'
    }}>
      <div className="card" style={{
        width: '100%',
        maxWidth: '720px',
        maxHeight: '90vh',
        overflowY: 'auto',
        padding: '2rem',
        borderRadius: 'var(--radius-xl)'
      }}>
        {/* Step Indicator Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--accent-primary)', fontWeight: 600, letterSpacing: '0.05em' }}>
              STEP 0{step} OF 05
            </div>
            <h2 style={{ fontSize: '1.4rem' }}>
              {step === 1 && 'Academic Profile'}
              {step === 2 && 'Skill Assessment'}
              {step === 3 && 'Scenario Interests'}
              {step === 4 && 'Work Style Preferences'}
              {step === 5 && 'Career Goals & Time'}
            </h2>
          </div>

          <button onClick={onCancel} style={{ fontSize: '1.25rem', color: 'var(--text-muted)' }}>✕</button>
        </div>

        {/* Step 1: Academic Profile */}
        {step === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.35rem' }}>Your Name</label>
              <input 
                type="text" 
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', fontSize: '0.95rem' }}
              />
            </div>
            <div className="grid-2">
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.35rem' }}>Degree</label>
                <select 
                  value={formData.degree}
                  onChange={e => setFormData({ ...formData, degree: e.target.value })}
                  style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', fontSize: '0.95rem' }}
                >
                  <option>B.Tech / B.E.</option>
                  <option>B.Sc Computer Science</option>
                  <option>BCA</option>
                  <option>M.Tech / M.E.</option>
                  <option>MCA</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.35rem' }}>Branch / Specialization</label>
                <input 
                  type="text" 
                  value={formData.branch}
                  onChange={e => setFormData({ ...formData, branch: e.target.value })}
                  style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', fontSize: '0.95rem' }}
                />
              </div>
            </div>

            <div className="grid-2">
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.35rem' }}>Current Year</label>
                <select 
                  value={formData.current_year}
                  onChange={e => setFormData({ ...formData, current_year: e.target.value })}
                  style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', fontSize: '0.95rem' }}
                >
                  <option>1st Year</option>
                  <option>2nd Year</option>
                  <option>3rd Year</option>
                  <option>4th Year / Graduating</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.35rem' }}>Current CGPA (0 - 10)</label>
                <input 
                  type="number" 
                  step="0.1"
                  min="0"
                  max="10"
                  value={formData.cgpa}
                  onChange={e => setFormData({ ...formData, cgpa: e.target.value })}
                  style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', fontSize: '0.95rem' }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Technical & Soft Skills */}
        {step === 2 && (
          <div>
            <h4 style={{ fontSize: '0.95rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>
              Rate your technical skills
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: '280px', overflowY: 'auto', paddingRight: '0.5rem', marginBottom: '1.5rem' }}>
              {availableTechSkills.map((skill) => {
                const currentLevel = formData.tech_skills[skill] || 'Beginner';
                return (
                  <div key={skill} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px dashed var(--border-color)' }}>
                    <span style={{ fontWeight: 500, fontSize: '0.9rem' }}>{skill}</span>
                    <div style={{ display: 'flex', gap: '0.35rem' }}>
                      {levels.map((lvl) => (
                        <button
                          key={lvl}
                          type="button"
                          onClick={() => handleTechSkillChange(skill, lvl)}
                          style={{
                            padding: '0.25rem 0.6rem',
                            fontSize: '0.75rem',
                            borderRadius: 'var(--radius-sm)',
                            border: '1px solid',
                            borderColor: currentLevel === lvl ? 'var(--accent-primary)' : 'var(--border-color)',
                            background: currentLevel === lvl ? 'var(--accent-light)' : 'transparent',
                            color: currentLevel === lvl ? 'var(--accent-text)' : 'var(--text-secondary)',
                            fontWeight: currentLevel === lvl ? 600 : 400
                          }}
                        >
                          {lvl}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            <h4 style={{ fontSize: '0.95rem', color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
              Soft Skills Self-Rating
            </h4>
            <div className="grid-2" style={{ gap: '0.75rem' }}>
              {Object.keys(formData.soft_skills).map((skill) => (
                <div key={skill}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.2rem' }}>
                    <span>{skill}</span>
                    <span style={{ fontWeight: 600 }}>{formData.soft_skills[skill]}%</span>
                  </div>
                  <input
                    type="range"
                    min="30"
                    max="95"
                    value={formData.soft_skills[skill]}
                    onChange={(e) => handleSoftSkillChange(skill, e.target.value)}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Scenario-based Interests */}
        {step === 3 && (
          <div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
              Which activity sounds most interesting to you? (Select all that apply)
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {scenarioQuestions.map((sq) => {
                const isSelected = formData.scenario_interests.includes(sq.id);
                return (
                  <div
                    key={sq.id}
                    onClick={() => toggleScenario(sq.id)}
                    style={{
                      padding: '1rem',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid',
                      borderColor: isSelected ? 'var(--accent-primary)' : 'var(--border-color)',
                      background: isSelected ? 'var(--accent-light)' : 'var(--bg-surface)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.85rem'
                    }}
                  >
                    <div style={{
                      width: '22px',
                      height: '22px',
                      borderRadius: '4px',
                      border: '1.5px solid',
                      borderColor: isSelected ? 'var(--accent-primary)' : 'var(--text-muted)',
                      background: isSelected ? 'var(--accent-primary)' : 'transparent',
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginTop: '2px'
                    }}>
                      {isSelected && <Check size={14} />}
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.95rem', color: isSelected ? 'var(--accent-text)' : 'var(--text-primary)' }}>
                        {sq.id}. {sq.title}
                      </div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                        {sq.desc}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 4: Work Style */}
        {step === 4 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.75rem' }}>
                Primary Work Motivation
              </label>
              <div className="grid-2">
                {[
                  { key: 'building', label: 'Building Systems', sub: 'Creating applications, features, and tools' },
                  { key: 'analyzing', label: 'Analyzing & Solving', sub: 'Finding insight in numbers and complex logic' }
                ].map(opt => (
                  <div
                    key={opt.key}
                    onClick={() => setFormData({ ...formData, work_style: { ...formData.work_style, preference: opt.key } })}
                    style={{
                      padding: '1rem',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid',
                      borderColor: formData.work_style.preference === opt.key ? 'var(--accent-primary)' : 'var(--border-color)',
                      background: formData.work_style.preference === opt.key ? 'var(--accent-light)' : 'transparent',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{opt.label}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>{opt.sub}</div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.75rem' }}>
                Team Environment Preference
              </label>
              <div className="grid-2">
                {[
                  { key: 'collaborative', label: 'Collaborative Team', sub: 'Cross-functional discussions, agile reviews' },
                  { key: 'independent', label: 'Independent Focus', sub: 'Autonomous problem solving with high focus' }
                ].map(opt => (
                  <div
                    key={opt.key}
                    onClick={() => setFormData({ ...formData, work_style: { ...formData.work_style, collaboration: opt.key } })}
                    style={{
                      padding: '1rem',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid',
                      borderColor: formData.work_style.collaboration === opt.key ? 'var(--accent-primary)' : 'var(--border-color)',
                      background: formData.work_style.collaboration === opt.key ? 'var(--accent-light)' : 'transparent',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{opt.label}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>{opt.sub}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 5: Goals & Time */}
        {step === 5 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                Target Primary Role Goal
              </label>
              <select
                value={formData.career_goals.target_role}
                onChange={e => setFormData({ ...formData, career_goals: { ...formData.career_goals, target_role: e.target.value } })}
                style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', fontSize: '0.95rem' }}
              >
                <option>Software Engineer</option>
                <option>Data Analyst</option>
                <option>AI / ML Engineer</option>
                <option>Cybersecurity Analyst</option>
                <option>Cloud / DevOps Engineer</option>
                <option>UI / UX Designer</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                Available Learning Time per Day
              </label>
              <div className="grid-2">
                {[
                  { label: '30 minutes/day', sub: 'Light steady pace' },
                  { label: '1 hour/day', sub: 'Balanced standard pace' },
                  { label: '2 hours/day', sub: 'Focused sprint pace' },
                  { label: '3+ hours/day', sub: 'Intensive immersion' }
                ].map(t => (
                  <div
                    key={t.label}
                    onClick={() => setFormData({ ...formData, time_per_day: t.label })}
                    style={{
                      padding: '0.85rem',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid',
                      borderColor: formData.time_per_day === t.label ? 'var(--accent-primary)' : 'var(--border-color)',
                      background: formData.time_per_day === t.label ? 'var(--accent-light)' : 'transparent',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{ fontWeight: 600, fontSize: '0.9rem', color: formData.time_per_day === t.label ? 'var(--accent-text)' : 'var(--text-primary)' }}>
                      {t.label}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{t.sub}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Footer Navigation */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
          {step > 1 ? (
            <button onClick={handlePrev} className="btn btn-secondary">
              <ChevronLeft size={16} /> Back
            </button>
          ) : <div />}

          <button onClick={handleNext} className="btn btn-primary">
            {step === 5 ? 'Generate My Career DNA' : 'Continue'} <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
