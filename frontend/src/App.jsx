import React, { useState } from 'react';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import AssessmentFlow from './components/AssessmentFlow';
import CareerDna from './components/CareerDna';
import CareerExplorer from './components/CareerExplorer';
import SkillGapAnalysis from './components/SkillGapAnalysis';
import WhatIfSimulator from './components/WhatIfSimulator';
import PersonalizedRoadmap from './components/PersonalizedRoadmap';
import IndustryPulse from './components/IndustryPulse';
import CareerPassport from './components/CareerPassport';
import AiAssistant from './components/AiAssistant';
import { submitAssessment } from './services/api';

// Initial realistic demo dataset
const INITIAL_DEMO_PROFILE = {
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
  scenario_interests: ['A'],
  work_style: { preference: 'building', collaboration: 'collaborative' },
  career_goals: { target_role: 'Software Engineer', preferred_industry: 'Tech SaaS' },
  time_per_day: '1 hour/day'
};

const INITIAL_DEMO_DNA = {
  dimensions: {
    'Technical Foundation': 74,
    'Problem Solving': 82,
    'Analytical Thinking': 78,
    'Communication': 70,
    'Creativity': 65,
    'Leadership': 68,
    'Adaptability': 75
  },
  strongest_trait: 'Problem Solving',
  biggest_opportunity: 'Data Structures & Algorithms',
  current_readiness: 64
};

const INITIAL_DEMO_CAREERS = [
  {
    career_id: 'software-engineer',
    title: 'Software Engineer',
    category: 'Software Engineering',
    description: 'Design, build, and maintain scalable software applications, backend services, and APIs.',
    fit_score: 87,
    readiness_score: 72,
    why_it_fits: ['✓ Strong problem solving foundation', '✓ Good programming language background', '✓ Alignment with building preferences'],
    top_matching_strengths: ['Problem Solving', 'Technical Foundation', 'Analytical Thinking'],
    important_skills: ['Data Structures', 'Java', 'Python', 'SQL', 'Git/GitHub'],
    skill_gaps: [
      { skill: 'Data Structures', current: 42, target: 85, gap: 43, why_it_matters: 'Essential for algorithmic problem solving and coding interviews.', action: 'Complete Arrays & Strings foundation module' },
      { skill: 'Backend Development', current: 50, target: 80, gap: 30, why_it_matters: 'Building persistent REST APIs and database models.', action: 'Construct 1 clean REST API endpoint' },
      { skill: 'Git/GitHub', current: 35, target: 75, gap: 40, why_it_matters: 'Industry standard version control and team workflow.', action: 'Publish complete project repository on GitHub' }
    ],
    typical_projects: ['Full-Stack Web Application', 'High-Throughput Microservice', 'Database Optimization Tool'],
    next_action: 'Complete Data Structures foundation module',
    salary_range: '$85,000 - $145,000 / yr',
    demand_level: 'High'
  },
  {
    career_id: 'data-analyst',
    title: 'Data Analyst',
    category: 'Data Analytics',
    description: 'Extract actionable business insights from datasets through visualization and SQL queries.',
    fit_score: 81,
    readiness_score: 68,
    why_it_fits: ['✓ High analytical thinking score', '✓ Strong interest in data patterns', '✓ Good SQL foundation'],
    top_matching_strengths: ['Analytical Thinking', 'SQL', 'Communication'],
    important_skills: ['SQL', 'Data Analysis', 'Python', 'Excel / BI Tools'],
    skill_gaps: [
      { skill: 'Data Analysis', current: 45, target: 85, gap: 40, why_it_matters: 'Transforming raw data with Pandas and statistical aggregations.', action: 'Practice data transformation exercises' },
      { skill: 'Excel / BI Tools', current: 35, target: 80, gap: 45, why_it_matters: 'Building executive dashboards in Tableau or Power BI.', action: 'Create sales performance dashboard' }
    ],
    typical_projects: ['Customer Churn Dashboard', 'Sales Performance Tracker'],
    next_action: 'Complete SQL Aggregation & Window Functions module',
    salary_range: '$70,000 - $115,000 / yr',
    demand_level: 'High'
  },
  {
    career_id: 'aiml-engineer',
    title: 'AI / ML Engineer',
    category: 'AI / ML',
    description: 'Develop and deploy machine learning models, neural networks, and generative AI systems.',
    fit_score: 79,
    readiness_score: 65,
    why_it_fits: ['✓ Strong mathematical and problem solving scores', '✓ High interest in pattern extraction'],
    top_matching_strengths: ['Problem Solving', 'Analytical Thinking'],
    important_skills: ['Python', 'Machine Learning', 'Data Analysis', 'Math / Statistics'],
    skill_gaps: [
      { skill: 'Machine Learning', current: 30, target: 85, gap: 55, why_it_matters: 'Training Scikit-Learn regression and neural network models.', action: 'Complete ML fundamentals sprint' }
    ],
    typical_projects: ['Predictive Maintenance Model', 'RAG Knowledge Bot'],
    next_action: 'Complete Python for Data Science crash course',
    salary_range: '$95,000 - $165,000 / yr',
    demand_level: 'Very High'
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('landing');
  const [isAssessmentOpen, setIsAssessmentOpen] = useState(false);
  const [profileData, setProfileData] = useState(INITIAL_DEMO_PROFILE);
  const [dnaData, setDnaData] = useState(INITIAL_DEMO_DNA);
  const [careers, setCareers] = useState(INITIAL_DEMO_CAREERS);
  const [selectedCareer, setSelectedCareer] = useState(INITIAL_DEMO_CAREERS[0]);

  const handleAssessmentSubmit = async (formData) => {
    setProfileData(formData);
    setIsAssessmentOpen(false);

    const res = await submitAssessment(formData);
    if (res.success) {
      if (res.dna) setDnaData(res.dna);
      if (res.recommended_careers) {
        setCareers(res.recommended_careers);
        setSelectedCareer(res.recommended_careers[0]);
      }
    }
    setActiveTab('dna');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        hasAssessment={!!profileData}
        onOpenAssessment={() => setIsAssessmentOpen(true)}
      />

      <main style={{ flex: 1 }}>
        {activeTab === 'landing' && (
          <LandingPage
            onStartAssessment={() => setIsAssessmentOpen(true)}
            onExploreCareers={() => setActiveTab('explorer')}
          />
        )}

        {activeTab === 'dna' && (
          <CareerDna
            dnaData={dnaData}
            profileData={profileData}
            onExploreCareers={() => setActiveTab('explorer')}
          />
        )}

        {activeTab === 'explorer' && (
          <CareerExplorer
            careers={careers}
            selectedCareer={selectedCareer}
            onSelectCareer={(c) => setSelectedCareer(c)}
            onAnalyzeGaps={() => setActiveTab('gaps')}
            onRunSimulator={() => setActiveTab('simulator')}
          />
        )}

        {activeTab === 'gaps' && (
          <SkillGapAnalysis
            selectedCareer={selectedCareer}
            onRunSimulator={() => setActiveTab('simulator')}
            onViewRoadmap={() => setActiveTab('roadmap')}
          />
        )}

        {activeTab === 'simulator' && (
          <WhatIfSimulator
            selectedCareer={selectedCareer}
            profileData={profileData}
            onViewRoadmap={() => setActiveTab('roadmap')}
          />
        )}

        {activeTab === 'roadmap' && (
          <PersonalizedRoadmap
            selectedCareer={selectedCareer}
            profileData={profileData}
            onTimeChange={(t) => setProfileData(prev => ({ ...prev, time_per_day: t }))}
            onViewPassport={() => setActiveTab('passport')}
          />
        )}

        {activeTab === 'industry' && (
          <IndustryPulse />
        )}

        {activeTab === 'passport' && (
          <CareerPassport
            selectedCareer={selectedCareer}
            profileData={profileData}
            dnaData={dnaData}
          />
        )}
      </main>

      {/* Assessment Conversational Modal */}
      {isAssessmentOpen && (
        <AssessmentFlow
          onSubmit={handleAssessmentSubmit}
          onCancel={() => setIsAssessmentOpen(false)}
        />
      )}

      {/* Floating AI Assistant */}
      <AiAssistant
        profileData={profileData}
        selectedCareer={selectedCareer}
        dnaData={dnaData}
      />

      {/* Clean Footer */}
      <footer style={{
        background: 'var(--bg-surface)',
        borderTop: '1px solid var(--border-color)',
        padding: '2rem 0',
        marginTop: 'auto',
        fontSize: '0.85rem',
        color: 'var(--text-muted)'
      }} className="no-print">
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <strong>Pathwise</strong> — Know where you are. Discover where you can go.
          </div>
          <div>
            AI-Powered Career & Skill Development Assistant
          </div>
        </div>
      </footer>
    </div>
  );
}
