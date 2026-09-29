import os
import requests
import json

GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY", "").strip()
OPENAI_API_KEY = os.environ.get("OPENAI_API_KEY", "").strip()

def get_contextual_ai_response(user_prompt, profile_data=None, career_title=None, dna_data=None):
    """
    Generate context-aware career guidance response using Gemini/OpenAI API or intelligent rule-based fallback.
    """
    user_prompt_lower = user_prompt.lower().strip()
    
    # Try calling Gemini API if key is present
    if GEMINI_API_KEY:
        try:
            url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={GEMINI_API_KEY}"
            system_context = f"You are Pathwise AI, an expert career guide. Profile: {json.dumps(profile_data or {})}. Selected Career: {career_title or 'General'}. DNA: {json.dumps(dna_data or {})}. Give concise, practical, encouraging advice in 3-4 bullet points."
            
            payload = {
                "contents": [
                    {
                        "role": "user",
                        "parts": [{"text": f"{system_context}\n\nUser Question: {user_prompt}"}]
                    }
                ]
            }
            resp = requests.post(url, json=payload, timeout=8)
            if resp.status_code == 200:
                data = resp.json()
                text = data["candidates"][0]["content"]["parts"][0]["text"]
                return {
                    "source": "gemini",
                    "response": text
                }
        except Exception as e:
            print(f"Gemini API call skipped/failed: {e}")

    # Fallback to intelligent context-aware rule engine
    strongest = dna_data.get("strongest_trait", "Problem Solving") if dna_data else "Problem Solving"
    readiness = dna_data.get("current_readiness", 65) if dna_data else 65

    if "what should i learn next" in user_prompt_lower or "next step" in user_prompt_lower:
        reply = (
            f"Based on your profile, here are your high-priority next steps:\n\n"
            f"1. **Focus on Core Gaps**: Strengthen Data Structures & Algorithms foundation.\n"
            f"2. **Targeted Practice**: Complete 5 practice problems focused on arrays and hash maps.\n"
            f"3. **Hands-on Application**: Build one REST API project using Python or Java to prove your technical depth.\n"
            f"4. **Pace**: Dedicate your available study time ({profile_data.get('time_per_day', '1 hour/day') if profile_data else '1 hour/day'}) consistently."
        )
    elif "why" in user_prompt_lower and ("recommend" in user_prompt_lower or "career" in user_prompt_lower):
        reply = (
            f"You were recommended **{career_title or 'Software Engineering'}** because:\n\n"
            f"• Your top strength is **{strongest}**.\n"
            f"• Your academic profile ({profile_data.get('branch', 'Engineering') if profile_data else 'Engineering'}, CGPA {profile_data.get('cgpa', '8.0') if profile_data else '8.0'}) aligns well with technical roles.\n"
            f"• Your current readiness is estimated at **{readiness}%**, giving you a strong foundation to bridge remaining skill gaps quickly."
        )
    elif "project" in user_prompt_lower or "build" in user_prompt_lower:
        reply = (
            f"Here are 3 standout portfolio project ideas tailored for **{career_title or 'Software Engineer'}**:\n\n"
            f"1. **High-Throughput RESTful API**: Build a CRUD service with authentication, request validation, and database caching.\n"
            f"2. **Analytics & Dashboard Tool**: Create an interactive dashboard consuming a public dataset with live charts.\n"
            f"3. **Pathwise Skill Tracker**: Build a full-stack mini app with search, filtering, and local persistent state."
        )
    elif "hour" in user_prompt_lower or "time" in user_prompt_lower or "schedule" in user_prompt_lower:
        reply = (
            f"With **{profile_data.get('time_per_day', '1 hour per day') if profile_data else '1 hour per day'}**, consistency is key! Here is a recommended routine:\n\n"
            f"• **20 mins**: Concept study & tutorial reading\n"
            f"• **35 mins**: Hands-on coding or problem solving\n"
            f"• **5 mins**: Push code updates to your GitHub repo\n\n"
            f"This pace keeps your 12-week roadmap manageable while building steady momentum."
        )
    elif "dsa" in user_prompt_lower or "data structure" in user_prompt_lower:
        reply = (
            f"To boost your DSA score from your current baseline:\n\n"
            f"1. Start with Arrays & Strings before moving to Binary Search and Two-Pointer techniques.\n"
            f"2. Solve 2 problems daily on LeetCode/HackerRank (Easy to Medium).\n"
            f"3. Always analyze space and time complexity (Big-O) after completing a solution."
        )
    else:
        reply = (
            f"Great question regarding your target path **{career_title or 'Career Goals'}**!\n\n"
            f"• Leverage your strongest trait (**{strongest}**) to build confidence.\n"
            f"• Use the **What-If Simulator** on Pathwise to test how improving specific target skills boosts your readiness.\n"
            f"• Focus on completing your active Career Missions to track progress towards your Career Passport!"
        )

    return {
        "source": "rule-engine",
        "response": reply
    }
