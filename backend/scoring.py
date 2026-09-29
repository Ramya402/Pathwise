from seed_data import CAREER_PROFILES

SKILL_LEVEL_SCORES = {
    "Beginner": 35,
    "Basic": 50,
    "Intermediate": 75,
    "Advanced": 92
}

def parse_skill_score(level):
    if isinstance(level, (int, float)):
        return max(0, min(100, float(level)))
    return SKILL_LEVEL_SCORES.get(level, 40)

def calculate_career_dna(profile):
    """
    Calculate 7 visual skill dimensions from student assessment profile.
    Transparent calculation based on technical skills, soft skills, academic performance, and work style.
    """
    tech_skills = profile.get("tech_skills", {})
    soft_skills = profile.get("soft_skills", {})
    interests = profile.get("scenario_interests", [])
    work_style = profile.get("work_style", {})
    cgpa = float(profile.get("cgpa", 7.0) or 7.0)

    # Convert tech skills to numeric 0-100 scores
    tech_scores = {k: parse_skill_score(v) for k, v in tech_skills.items()}
    
    # Technical Foundation
    if tech_scores:
        avg_tech = sum(tech_scores.values()) / len(tech_scores)
    else:
        avg_tech = 45.0
    technical_foundation = min(98, max(30, int(avg_tech)))

    # Problem Solving
    dsa_score = tech_scores.get("Data Structures", tech_scores.get("C++", tech_scores.get("Java", 45)))
    problem_solving_soft = soft_skills.get("Problem solving", 60)
    cgpa_bonus = (cgpa / 10.0) * 15
    problem_solving = min(98, max(35, int(dsa_score * 0.4 + problem_solving_soft * 0.4 + cgpa_bonus)))

    # Analytical Thinking
    sql_score = tech_scores.get("SQL", 40)
    data_score = tech_scores.get("Data Analysis", tech_scores.get("Machine Learning", 40))
    analytical_soft = soft_skills.get("Analytical thinking", 60)
    analytical_thinking = min(98, max(35, int((sql_score + data_score) / 2 * 0.5 + analytical_soft * 0.5)))

    # Communication
    comm_soft = soft_skills.get("Communication", 65)
    team_soft = soft_skills.get("Teamwork", 65)
    collab_bonus = 10 if work_style.get("collaboration") == "collaborative" else 5
    communication = min(98, max(35, int((comm_soft * 0.6 + team_soft * 0.4) + collab_bonus)))

    # Creativity
    design_tech = tech_scores.get("HTML/CSS", tech_scores.get("React", 40))
    creativity_soft = soft_skills.get("Creativity", 60)
    creativity_interest = 15 if "C" in interests or "designing" in str(interests).lower() else 5
    creativity = min(98, max(30, int(design_tech * 0.4 + creativity_soft * 0.4 + creativity_interest)))

    # Leadership
    lead_soft = soft_skills.get("Leadership", 55)
    adapt_soft = soft_skills.get("Adaptability", 60)
    leadership = min(98, max(30, int(lead_soft * 0.7 + team_soft * 0.3)))

    # Adaptability
    adaptability = min(98, max(40, int(adapt_soft * 0.7 + (cgpa / 10.0) * 25)))

    # Calculate overall baseline readiness
    current_readiness = min(98, int((technical_foundation * 0.35 + problem_solving * 0.35 + analytical_thinking * 0.15 + communication * 0.15)))

    dna = {
        "dimensions": {
            "Technical Foundation": technical_foundation,
            "Problem Solving": problem_solving,
            "Analytical Thinking": analytical_thinking,
            "Communication": communication,
            "Creativity": creativity,
            "Leadership": leadership,
            "Adaptability": adaptability
        },
        "strongest_trait": max(
            [("Problem Solving", problem_solving), ("Technical Foundation", technical_foundation), 
             ("Analytical Thinking", analytical_thinking), ("Communication", communication), 
             ("Creativity", creativity), ("Leadership", leadership)], 
            key=lambda x: x[1]
        )[0],
        "biggest_opportunity": min(
            [("Data Structures & Algorithms", problem_solving), ("Technical Depth", technical_foundation), 
             ("Data & Analytical Tools", analytical_thinking), ("Communication & Pitching", communication)], 
            key=lambda x: x[1]
        )[0],
        "current_readiness": current_readiness
    }
    return dna

def calculate_career_fits(profile, simulated_skills=None):
    """
    Calculate transparent fit scores, reasons, skill gaps, and next actions for all careers.
    Allows passing simulated_skills for What-If calculations.
    """
    dna = calculate_career_dna(profile)
    tech_skills = dict(profile.get("tech_skills", {}))

    # Apply simulated skills if provided
    if simulated_skills:
        for k, v in simulated_skills.items():
            tech_skills[k] = v

    tech_scores = {k: parse_skill_score(v) for k, v in tech_skills.items()}
    scenario_interests = profile.get("scenario_interests", [])

    results = []
    for career in CAREER_PROFILES:
        target_skills = career["target_skills"]
        match_sum = 0
        total_weight = 0

        matching_strengths = []
        skill_gaps = []

        for skill, target in target_skills.items():
            curr = tech_scores.get(skill, 25)
            # Map DNA dimensions if skill is soft/dimension
            if skill == "Problem Solving":
                curr = dna["dimensions"]["Problem Solving"]
            elif skill == "Communication":
                curr = dna["dimensions"]["Communication"]
            elif skill == "Analytical Thinking":
                curr = dna["dimensions"]["Analytical Thinking"]

            weight = target / 100.0
            diff = curr - target
            
            # Match score calculation
            if curr >= target:
                skill_match = 1.0
                matching_strengths.append(f"Strong {skill} ({curr}%)")
            else:
                ratio = curr / target
                skill_match = max(0.2, ratio)
                gap_amount = target - curr
                skill_gaps.append({
                    "skill": skill,
                    "current": curr,
                    "target": target,
                    "gap": gap_amount,
                    "why_it_matters": f"{career['title']} roles require high proficiency in {skill}.",
                    "action": f"Complete {skill} foundational modules and practice projects."
                })

            match_sum += skill_match * weight
            total_weight += weight

        # Fit score percentage
        raw_fit = (match_sum / total_weight) * 100 if total_weight > 0 else 50
        
        # Scenario Interest Bonus
        category = career["category"]
        bonus = 0
        if category == "Software Engineering" and ("A" in scenario_interests or "building" in str(profile).lower()):
            bonus = 6
        elif category == "Data Analytics" and ("B" in scenario_interests or "data" in str(profile).lower()):
            bonus = 6
        elif category == "AI / ML" and ("B" in scenario_interests or "patterns" in str(profile).lower()):
            bonus = 7
        elif category == "Cybersecurity" and ("D" in scenario_interests or "securing" in str(profile).lower()):
            bonus = 7
        elif category == "Cloud / DevOps" and ("E" in scenario_interests or "cloud" in str(profile).lower()):
            bonus = 7
        elif category == "UI / UX Design" and ("C" in scenario_interests or "designing" in str(profile).lower()):
            bonus = 7

        fit_score = min(96, max(45, int(raw_fit + bonus)))

        # Sort skill gaps by gap magnitude
        skill_gaps.sort(key=lambda x: x["gap"], reverse=True)

        # Why it fits rationale
        why_it_fits = []
        if matching_strengths:
            why_it_fits = [f"✓ {s}" for s in matching_strengths[:3]]
        else:
            why_it_fits = ["✓ Good alignment with basic profile competencies"]

        if bonus > 0:
            why_it_fits.append("✓ Strong alignment with selected work preferences")

        next_action = f"Complete {skill_gaps[0]['skill']} gap module" if skill_gaps else "Build advanced portfolio project"

        results.append({
            "career_id": career["id"],
            "title": career["title"],
            "category": career["category"],
            "description": career["description"],
            "fit_score": fit_score,
            "readiness_score": min(95, max(40, int(fit_score * 0.85))),
            "why_it_fits": why_it_fits,
            "top_matching_strengths": matching_strengths[:3],
            "important_skills": list(target_skills.keys()),
            "skill_gaps": skill_gaps[:4],
            "typical_projects": career["typical_projects"],
            "next_action": next_action,
            "salary_range": career["salary_range"],
            "demand_level": career["demand_level"]
        })

    results.sort(key=lambda x: x["fit_score"], reverse=True)
    return results

def run_what_if_simulation(profile, career_id, simulated_improvements):
    """
    Simulate projected readiness improvement when student increases target skill levels.
    """
    baseline_fits = calculate_career_fits(profile)
    simulated_fits = calculate_career_fits(profile, simulated_skills=simulated_improvements)

    target_baseline = next((c for c in baseline_fits if c["career_id"] == career_id), baseline_fits[0])
    target_simulated = next((c for c in simulated_fits if c["career_id"] == career_id), simulated_fits[0])

    before_fit = target_baseline["fit_score"]
    after_fit = target_simulated["fit_score"]
    before_readiness = target_baseline["readiness_score"]
    after_readiness = target_simulated["readiness_score"]

    return {
        "career_title": target_baseline["title"],
        "simulated_skills": simulated_improvements,
        "before_fit": before_fit,
        "after_fit": after_fit,
        "fit_delta": after_fit - before_fit,
        "before_readiness": before_readiness,
        "after_readiness": after_readiness,
        "readiness_delta": after_readiness - before_readiness,
        "projected_skill_gaps": target_simulated["skill_gaps"],
        "disclaimer": "This is an ESTIMATED SIMULATION based on your selected skill improvements. It is not a guaranteed prediction."
    }

def generate_adaptive_roadmap(profile, selected_career_id):
    """
    Generate an adaptive 12-week roadmap tailored to student skill gaps & available daily time.
    """
    time_per_day = profile.get("time_per_day", "1 hour/day")
    fits = calculate_career_fits(profile)
    career = next((c for c in fits if c["career_id"] == selected_career_id), fits[0])
    gaps = career["skill_gaps"]
    top_gap_names = [g["skill"] for g in gaps]

    # Time commitment intensity label
    if "30" in time_per_day:
        time_label = "Light Focus (30 mins/day)"
        workload_multiplier = 0.7
    elif "2" in time_per_day or "3" in time_per_day:
        time_label = "Intensive Sprint (2-3 hrs/day)"
        workload_multiplier = 1.3
    else:
        time_label = "Balanced Pace (1 hr/day)"
        workload_multiplier = 1.0

    phases = [
        {
            "phase": "PHASE 1",
            "title": "Foundation & Core Gaps",
            "weeks": "Weeks 1-3",
            "focus": f"Bridging primary skill gaps in {top_gap_names[0] if top_gap_names else 'Core Concepts'}",
            "tasks": [
                {"id": "m1", "title": f"Master {top_gap_names[0] if top_gap_names else 'Fundamentals'} Syntax & Core Logic", "phase": "PHASE 1", "description": "Review key data structures, arrays, and standard functions."},
                {"id": "m2", "title": "Solve 5 Foundational Practice Problems", "phase": "PHASE 1", "description": "Implement baseline data handling algorithms."},
                {"id": "m3", "title": "Set up GitHub Repository & Version Control Workflow", "phase": "PHASE 1", "description": "Commit daily code exercises with clean documentation."}
            ]
        },
        {
            "phase": "PHASE 2",
            "title": "Core Technical Skills",
            "weeks": "Weeks 4-6",
            "focus": f"Building competency in {top_gap_names[1] if len(top_gap_names) > 1 else 'Frameworks & Tools'}",
            "tasks": [
                {"id": "m4", "title": f"Complete {top_gap_names[1] if len(top_gap_names) > 1 else 'Backend/Database'} Deep-Dive", "phase": "PHASE 2", "description": "Build working schemas and database operations."},
                {"id": "m5", "title": "Construct 1 Clean RESTful API Endpoint", "phase": "PHASE 2", "description": "Implement request validation and JSON response structure."},
                {"id": "m6", "title": "Implement Error Handling & Unit Test Case", "phase": "PHASE 2", "description": "Ensure robustness across edge cases."}
            ]
        },
        {
            "phase": "PHASE 3",
            "title": "Hands-on Project Development",
            "weeks": "Weeks 7-9",
            "focus": f"Integrating skills into a realistic {career['title']} project",
            "tasks": [
                {"id": "m7", "title": f"Develop Project: {career['typical_projects'][0]}", "phase": "PHASE 3", "description": "Build functional application featuring user flows and persistent state."},
                {"id": "m8", "title": "Optimize Performance & Refactor Codebase", "phase": "PHASE 3", "description": "Improve query speed and remove code duplication."}
            ]
        },
        {
            "phase": "PHASE 4",
            "title": "Interview & Problem Solving Prep",
            "weeks": "Weeks 10-11",
            "focus": "Technical interviews, system design principles, and problem solving",
            "tasks": [
                {"id": "m9", "title": "Complete 10 Mock Technical Interview Challenges", "phase": "PHASE 4", "description": "Practice whiteboard problem solving under timed constraints."},
                {"id": "m10", "title": "Prepare Behavioral & Technical Story Cards", "phase": "PHASE 4", "description": "Document project trade-offs and team achievements using STAR framework."}
            ]
        },
        {
            "phase": "PHASE 5",
            "title": "Portfolio & Career Passport Readiness",
            "weeks": "Week 12",
            "focus": "Publishing portfolio, resume alignment, and applying for opportunities",
            "tasks": [
                {"id": "m11", "title": "Publish Complete Project Portfolio on GitHub & Vercel", "phase": "PHASE 5", "description": "Add architecture diagrams, README documentation, and live demo links."},
                {"id": "m12", "title": "Finalize Career Passport & Application Package", "phase": "PHASE 5", "description": "Export Pathwise Career Passport for recruiter review."}
            ]
        }
    ]

    return {
        "career_title": career["title"],
        "time_label": time_label,
        "total_weeks": 12,
        "phases": phases
    }
