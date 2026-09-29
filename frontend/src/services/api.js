const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api';

export async function submitAssessment(profileData) {
  try {
    const res = await fetch(`${API_BASE}/assessment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(profileData)
    });
    if (res.ok) return await res.json();
  } catch (err) {
    console.warn('Backend API connection offline, using client fallback', err);
  }
  return fallbackAssessmentResult(profileData);
}

export async function fetchCareers() {
  try {
    const res = await fetch(`${API_BASE}/careers`);
    if (res.ok) return await res.json();
  } catch (err) {
    console.warn('Backend offline, using fallback careers', err);
  }
  return { success: true, careers: FALLBACK_CAREERS };
}

export async function fetchSkillGaps(profile, careerId) {
  try {
    const res = await fetch(`${API_BASE}/skill-gaps`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ profile, career_id: careerId })
    });
    if (res.ok) return await res.json();
  } catch (err) {
    console.warn('Backend offline for skill gaps', err);
  }
  return {
    success: true,
    career_title: "Software Engineer",
    fit_score: 87,
    skill_gaps: [
      { skill: "Data Structures", current: 42, target: 85, gap: 43, why_it_matters: "Core problem solving requirement for technical interviews.", action: "Complete foundational DSA modules" },
      { skill: "Backend Development", current: 50, target: 80, gap: 30, why_it_matters: "Building scalable REST APIs and handling database persistence.", action: "Build 1 REST API project" },
      { skill: "Git/GitHub", current: 35, target: 75, gap: 40, why_it_matters: "Version control and team collaboration.", action: "Create and publish GitHub repository" }
    ]
  };
}

export async function runWhatIfSimulation(profile, careerId, simulatedImprovements) {
  try {
    const res = await fetch(`${API_BASE}/what-if`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ profile, career_id: careerId, simulated_improvements: simulatedImprovements })
    });
    if (res.ok) return await res.json();
  } catch (err) {
    console.warn('Backend offline for what-if', err);
  }

  // Client side fallback calculation
  const totalBoost = Object.values(simulatedImprovements).reduce((acc, curr) => acc + (curr - 40), 0);
  const fitDelta = Math.min(22, Math.max(4, Math.round(totalBoost * 0.2)));
  return {
    success: true,
    simulation: {
      career_title: "Software Engineer",
      simulated_skills: simulatedImprovements,
      before_fit: 64,
      after_fit: Math.min(96, 64 + fitDelta),
      fit_delta: fitDelta,
      before_readiness: 58,
      after_readiness: Math.min(94, 58 + fitDelta),
      readiness_delta: fitDelta,
      disclaimer: "This is an ESTIMATED SIMULATION based on your selected skill improvements. It is not a guaranteed prediction."
    }
  };
}

export async function fetchRoadmap(profile, careerId) {
  try {
    const res = await fetch(`${API_BASE}/roadmap`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ profile, career_id: careerId })
    });
    if (res.ok) return await res.json();
  } catch (err) {
    console.warn('Backend offline for roadmap', err);
  }
  return {
    success: true,
    roadmap: {
      career_title: "Software Engineer",
      time_label: "Balanced Pace (1 hr/day)",
      total_weeks: 12,
      phases: FALLBACK_ROADMAP_PHASES
    }
  };
}

export async function toggleMissionStatus(user_id, mission_id, completed) {
  try {
    const res = await fetch(`${API_BASE}/missions/toggle`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id, mission_id, completed })
    });
    if (res.ok) return await res.json();
  } catch (err) {
    console.warn('Backend offline for mission toggle', err);
  }
  return { success: true, mission_id, completed };
}

export async function fetchIndustryPulse() {
  try {
    const res = await fetch(`${API_BASE}/industry-pulse`);
    if (res.ok) return await res.json();
  } catch (err) {
    console.warn('Backend offline for industry pulse', err);
  }
  return {
    success: true,
    is_curated_demo: true,
    label: "Curated Industry Intelligence Dataset",
    trends: FALLBACK_TRENDS
  };
}

export async function queryAiAssistant(prompt, profile, careerTitle, dna) {
  try {
    const res = await fetch(`${API_BASE}/ai-assistant`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt, profile, career_title: careerTitle, dna })
    });
    if (res.ok) return await res.json();
  } catch (err) {
    console.warn('Backend offline for AI assistant', err);
  }
  return {
    success: true,
    source: "client-fallback",
    response: `Based on your profile as a ${profile?.branch || 'CS'} student targeting ${careerTitle || 'Software Engineering'}:\n\n1. Focus on bridging your Data Structures gap first.\n2. Dedicate your ${profile?.time_per_day || '1 hour/day'} available time consistently.\n3. Complete practice missions to earn badges on your Career Passport!`
  };
}

/* Fallback Mock Datasets */
const FALLBACK_CAREERS = [
  {
    career_id: "software-engineer",
    title: "Software Engineer",
    category: "Software Engineering",
    description: "Design, build, and maintain scalable software applications and APIs.",
    fit_score: 87,
    readiness_score: 72,
    why_it_fits: ["✓ Strong problem solving foundation", "✓ Good programming language familiarity", "✓ High alignment with tech preferences"],
    top_matching_strengths: ["Problem Solving", "Technical Foundation", "Analytical Thinking"],
    skill_gaps: [
      { skill: "Data Structures", current: 42, target: 85, gap: 43, why_it_matters: "Crucial for algorithmic problem solving and interview screening.", action: "Complete array & string modules" },
      { skill: "Backend Development", current: 50, target: 80, gap: 30, why_it_matters: "Required for microservices and persistent database connections.", action: "Build REST API endpoint" },
      { skill: "Git/GitHub", current: 35, target: 75, gap: 40, why_it_matters: "Industry standard for version control.", action: "Create public project repo" }
    ],
    typical_projects: ["Full-Stack Web App", "High-Throughput Microservice", "Database Optimization Tool"],
    next_action: "Complete Data Structures foundation module",
    salary_range: "$85,000 - $145,000 / yr",
    demand_level: "High"
  },
  {
    career_id: "data-analyst",
    title: "Data Analyst",
    category: "Data Analytics",
    description: "Extract actionable insights from complex data through visualization and SQL queries.",
    fit_score: 81,
    readiness_score: 68,
    why_it_fits: ["✓ High analytical thinking score", "✓ Good SQL interest", "✓ Strong interest in data patterns"],
    top_matching_strengths: ["Analytical Thinking", "SQL", "Communication"],
    skill_gaps: [
      { skill: "Advanced SQL", current: 55, target: 85, gap: 30, why_it_matters: "Complex window functions and ETL aggregations.", action: "Practice SQL join challenges" },
      { skill: "Power BI / Tableau", current: 30, target: 80, gap: 50, why_it_matters: "Executive dashboard storytelling.", action: "Build sales dashboard project" }
    ],
    typical_projects: ["Customer Churn Dashboard", "Sales Performance Tracker"],
    next_action: "Complete Window Functions SQL module",
    salary_range: "$70,000 - $115,000 / yr",
    demand_level: "High"
  }
];

const FALLBACK_ROADMAP_PHASES = [
  {
    phase: "PHASE 1",
    title: "Foundation & Core Gaps",
    weeks: "Weeks 1-3",
    focus: "Bridging primary skill gaps in Data Structures & Algorithms",
    tasks: [
      { id: "m1", title: "Master Arrays & String Manipulation Logic", phase: "PHASE 1", description: "Learn two-pointer and sliding window algorithms." },
      { id: "m2", title: "Solve 5 Baseline Algorithmic Practice Problems", phase: "PHASE 1", description: "Practice on LeetCode/HackerRank." },
      { id: "m3", title: "Create GitHub Project Repository & Version Control Workflow", phase: "PHASE 1", description: "Commit solution code cleanly." }
    ]
  },
  {
    phase: "PHASE 2",
    title: "Core Technical Skills",
    weeks: "Weeks 4-6",
    focus: "Building RESTful services and relational database queries",
    tasks: [
      { id: "m4", title: "Construct 1 Functional REST API Endpoint", phase: "PHASE 2", description: "Handle JSON requests and database queries." },
      { id: "m5", title: "Implement SQL Database Schema & CRUD Operations", phase: "PHASE 2", description: "Design relational tables with constraints." }
    ]
  }
];

const FALLBACK_TRENDS = [
  {
    category: "Software Engineering",
    description: "High demand for full-stack developers skilled in microservices, cloud-native architectures, and modern web frameworks.",
    growing_skills: ["TypeScript", "Next.js", "Docker", "Go", "GraphQL"],
    key_tools: ["Git", "Postman", "VS Code", "Docker"],
    emerging_tech: ["AI-Assisted Coding Tools", "Serverless Computing"],
    certification_tips: "Focus on AWS Certified Developer Associate.",
    hiring_demand_score: 92
  }
];

function fallbackAssessmentResult(profileData) {
  const defaultDna = {
    dimensions: {
      "Technical Foundation": 74,
      "Problem Solving": 82,
      "Analytical Thinking": 78,
      "Communication": 70,
      "Creativity": 65,
      "Leadership": 68,
      "Adaptability": 75
    },
    strongest_trait: "Problem Solving",
    biggest_opportunity: "Data Structures & Algorithms",
    current_readiness: 64
  };

  return {
    success: true,
    assessment_id: 1,
    dna: defaultDna,
    recommended_careers: FALLBACK_CAREERS,
    primary_career: FALLBACK_CAREERS[0],
    roadmap: {
      career_title: "Software Engineer",
      time_label: "Balanced Pace (1 hr/day)",
      total_weeks: 12,
      phases: FALLBACK_ROADMAP_PHASES
    },
    missions: FALLBACK_ROADMAP_PHASES[0].tasks
  };
}
