import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

from database import init_db, save_assessment, get_latest_assessment, get_user_missions, save_user_missions, update_mission_status
from seed_data import CAREER_PROFILES, INDUSTRY_TRENDS
from scoring import calculate_career_dna, calculate_career_fits, run_what_if_simulation, generate_adaptive_roadmap
from ai_service import get_contextual_ai_response

load_dotenv()

app = Flask(__name__)
CORS(app)

# Initialize Database
init_db()

@app.route("/api/health", methods=["GET"])
def health_check():
    return jsonify({"status": "ok", "app": "Pathwise API", "version": "1.0.0"})

@app.route("/api/assessment", methods=["POST"])
def submit_assessment():
    try:
        data = request.json or {}
        user_id = data.get("user_id", "demo-user")
        
        dna = calculate_career_dna(data)
        assessment_id = save_assessment(user_id, data, dna)
        
        careers = calculate_career_fits(data)
        selected_career = careers[0]
        roadmap_data = generate_adaptive_roadmap(data, selected_career["career_id"])
        
        # Save initial missions
        flat_missions = []
        for phase in roadmap_data["phases"]:
            for t in phase["tasks"]:
                flat_missions.append({
                    "id": t["id"],
                    "title": t["title"],
                    "phase": phase["phase"],
                    "completed": False,
                    "description": t.get("description", "")
                })
        save_user_missions(user_id, selected_career["career_id"], flat_missions)

        return jsonify({
            "success": True,
            "assessment_id": assessment_id,
            "dna": dna,
            "recommended_careers": careers,
            "primary_career": selected_career,
            "roadmap": roadmap_data,
            "missions": flat_missions
        })
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 400

@app.route("/api/assessment/latest", methods=["GET"])
def fetch_latest_assessment():
    user_id = request.args.get("user_id", "demo-user")
    latest = get_latest_assessment(user_id)
    if not latest:
        return jsonify({"success": False, "message": "No assessment found"}), 44
    return jsonify({"success": True, "assessment": latest})

@app.route("/api/careers", methods=["GET"])
def get_careers():
    return jsonify({"success": True, "careers": CAREER_PROFILES})

@app.route("/api/career-recommendations", methods=["POST"])
def get_career_recommendations():
    data = request.json or {}
    careers = calculate_career_fits(data)
    return jsonify({"success": True, "recommendations": careers})

@app.route("/api/skill-gaps", methods=["POST"])
def get_skill_gaps():
    data = request.json or {}
    career_id = data.get("career_id", "software-engineer")
    profile = data.get("profile", {})
    
    careers = calculate_career_fits(profile)
    career = next((c for c in careers if c["career_id"] == career_id), careers[0])
    
    return jsonify({
        "success": True,
        "career_title": career["title"],
        "fit_score": career["fit_score"],
        "skill_gaps": career["skill_gaps"],
        "top_matching_strengths": career["top_matching_strengths"]
    })

@app.route("/api/what-if", methods=["POST"])
def what_if_simulation():
    data = request.json or {}
    profile = data.get("profile", {})
    career_id = data.get("career_id", "software-engineer")
    simulated_improvements = data.get("simulated_improvements", {})
    
    result = run_what_if_simulation(profile, career_id, simulated_improvements)
    return jsonify({"success": True, "simulation": result})

@app.route("/api/roadmap", methods=["POST"])
def get_roadmap():
    data = request.json or {}
    profile = data.get("profile", {})
    career_id = data.get("career_id", "software-engineer")
    
    roadmap = generate_adaptive_roadmap(profile, career_id)
    return jsonify({"success": True, "roadmap": roadmap})

@app.route("/api/missions", methods=["GET"])
def fetch_missions():
    user_id = request.args.get("user_id", "demo-user")
    career_id = request.args.get("career_id", "software-engineer")
    missions = get_user_missions(user_id, career_id)
    return jsonify({"success": True, "missions": missions})

@app.route("/api/missions/toggle", methods=["POST"])
def toggle_mission():
    data = request.json or {}
    user_id = data.get("user_id", "demo-user")
    mission_id = data.get("mission_id")
    completed = data.get("completed", False)
    
    if mission_id:
        update_mission_status(user_id, mission_id, completed)
    return jsonify({"success": True, "mission_id": mission_id, "completed": completed})

@app.route("/api/industry-pulse", methods=["GET"])
def get_industry_pulse():
    return jsonify({
        "success": True,
        "is_curated_demo": True,
        "label": "Curated Industry Intelligence Dataset",
        "trends": INDUSTRY_TRENDS
    })

@app.route("/api/career-passport", methods=["POST"])
def generate_career_passport():
    data = request.json or {}
    user_id = data.get("user_id", "demo-user")
    profile = data.get("profile", {})
    career_id = data.get("career_id", "software-engineer")
    
    dna = calculate_career_dna(profile)
    careers = calculate_career_fits(profile)
    career = next((c for c in careers if c["career_id"] == career_id), careers[0])
    missions = get_user_missions(user_id, career_id)
    
    completed_count = sum(1 for m in missions if m.get("completed"))
    total_count = len(missions) if missions else 12
    progress_pct = int((completed_count / total_count) * 100) if total_count > 0 else 0
    
    badges = ["Explorer Baseline"]
    if dna["dimensions"]["Problem Solving"] >= 75:
        badges.append("Problem Solver")
    if dna["dimensions"]["Technical Foundation"] >= 75:
        badges.append("Tech Builder")
    if progress_pct >= 50:
        badges.append("Portfolio Ready")
    if progress_pct >= 80:
        badges.append("Interview Ready")

    passport = {
        "user_name": profile.get("name", "Pathwise Student"),
        "degree": profile.get("degree", "B.Tech"),
        "branch": profile.get("branch", "Computer Science"),
        "career_direction": career["title"],
        "career_fit": career["fit_score"],
        "current_readiness": dna["current_readiness"],
        "top_strength": dna["strongest_trait"],
        "biggest_gap": career["skill_gaps"][0]["skill"] if career["skill_gaps"] else "System Design",
        "roadmap_duration": "12 Weeks",
        "completed_missions": f"{completed_count} of {total_count}",
        "progress_percentage": progress_pct,
        "next_mission": career["next_action"],
        "badges": badges
    }
    return jsonify({"success": True, "passport": passport})

@app.route("/api/ai-assistant", methods=["POST"])
def query_ai_assistant():
    data = request.json or {}
    user_prompt = data.get("prompt", "")
    profile = data.get("profile", {})
    career_title = data.get("career_title", "Software Engineer")
    dna = data.get("dna", {})
    
    result = get_contextual_ai_response(user_prompt, profile, career_title, dna)
    return jsonify({"success": True, "response": result["response"], "source": result["source"]})

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=True)
