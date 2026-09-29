# Seed data for Pathwise application

CAREER_PROFILES = [
    {
        "id": "software-engineer",
        "title": "Software Engineer",
        "category": "Software Engineering",
        "description": "Design, build, and maintain scalable software applications, backend services, and robust APIs.",
        "icon": "code",
        "salary_range": "$85,000 - $145,000 / yr",
        "demand_level": "High",
        "target_skills": {
            "Data Structures": 85,
            "Java": 80,
            "Python": 75,
            "SQL": 70,
            "Git/GitHub": 80,
            "Problem Solving": 90,
            "Communication": 70
        },
        "key_responsibilities": [
            "Write clean, maintainable, and efficient code",
            "Build backend microservices and RESTful APIs",
            "Debug complex systems and optimize application performance",
            "Participate in code reviews and agile sprint planning"
        ],
        "typical_projects": [
            "Full-Stack Web Application with Authentication",
            "High-Throughput RESTful Microservice",
            "Database Migration and Optimization Tool"
        ],
        "recommended_certifications": [
            "AWS Certified Developer - Associate",
            "Oracle Certified Professional Java Programmer"
        ]
    },
    {
        "id": "data-analyst",
        "title": "Data Analyst",
        "category": "Data Analytics",
        "description": "Extract insights from complex datasets to enable business decision-making through visualization and modeling.",
        "icon": "bar-chart",
        "salary_range": "$70,000 - $115,000 / yr",
        "demand_level": "High",
        "target_skills": {
            "SQL": 90,
            "Data Analysis": 90,
            "Python": 75,
            "Excel / BI Tools": 85,
            "Analytical Thinking": 90,
            "Communication": 80,
            "Problem Solving": 80
        },
        "key_responsibilities": [
            "Query and transform large datasets using SQL and Pandas",
            "Design interactive executive dashboards (Power BI / Tableau)",
            "Identify statistical trends, anomalies, and business KPIs",
            "Present data stories to non-technical stakeholders"
        ],
        "typical_projects": [
            "Customer Churn Analysis Dashboard",
            "E-Commerce Sales Performance Tracker",
            "Automated ETL Data Pipeline"
        ],
        "recommended_certifications": [
            "Google Data Analytics Professional Certificate",
            "Microsoft Certified: Data Analyst Associate"
        ]
    },
    {
        "id": "aiml-engineer",
        "title": "AI / ML Engineer",
        "category": "AI / ML",
        "description": "Develop and deploy machine learning models, neural networks, and generative AI systems into production.",
        "icon": "cpu",
        "salary_range": "$95,000 - $165,000 / yr",
        "demand_level": "Very High",
        "target_skills": {
            "Python": 90,
            "Machine Learning": 85,
            "Data Analysis": 80,
            "Data Structures": 80,
            "Analytical Thinking": 90,
            "Math / Statistics": 85,
            "Problem Solving": 90
        },
        "key_responsibilities": [
            "Train and fine-tune deep learning and LLM models",
            "Build ML inference pipelines and model serving endpoints",
            "Perform feature engineering and dataset curation",
            "Optimize model accuracy and inference latency"
        ],
        "typical_projects": [
            "Predictive Maintenance Model with Scikit-Learn",
            "RAG (Retrieval-Augmented Generation) Knowledge Bot",
            "Real-Time Image Classification Pipeline"
        ],
        "recommended_certifications": [
            "AWS Certified Machine Learning - Specialty",
            "DeepLearning.AI TensorFlow Developer"
        ]
    },
    {
        "id": "cybersecurity-analyst",
        "title": "Cybersecurity Analyst",
        "category": "Cybersecurity",
        "description": "Protect organization networks, endpoints, and cloud infrastructure against threats, vulnerabilities, and cyber attacks.",
        "icon": "shield",
        "salary_range": "$80,000 - $135,000 / yr",
        "demand_level": "Very High",
        "target_skills": {
            "Cybersecurity": 90,
            "Cloud": 75,
            "Python": 70,
            "Analytical Thinking": 85,
            "Problem Solving": 85,
            "Communication": 75
        },
        "key_responsibilities": [
            "Monitor security operations center (SOC) alerts and logs",
            "Conduct penetration tests and vulnerability assessments",
            "Implement security compliance and incident response plans",
            "Configure firewalls, IDS/IPS, and identity management"
        ],
        "typical_projects": [
            "Network Intrusion Detection Log Analyzer",
            "Vulnerability Assessment & Remediation Report",
            "Zero-Trust IAM Access Policy Configuration"
        ],
        "recommended_certifications": [
            "CompTIA Security+",
            "Certified Information Systems Security Professional (CISSP)",
            "Certified Ethical Hacker (CEH)"
        ]
    },
    {
        "id": "cloud-devops-engineer",
        "title": "Cloud / DevOps Engineer",
        "category": "Cloud / DevOps",
        "description": "Automate cloud infrastructure deployment, CI/CD pipelines, container orchestration, and system reliability.",
        "icon": "cloud",
        "salary_range": "$90,000 - $155,000 / yr",
        "demand_level": "High",
        "target_skills": {
            "Cloud": 90,
            "Git/GitHub": 85,
            "Python": 75,
            "SQL": 70,
            "Problem Solving": 85,
            "Adaptability": 85,
            "Communication": 75
        },
        "key_responsibilities": [
            "Build automated CI/CD deployment pipelines with GitHub Actions",
            "Provision Infrastructure as Code (Terraform / CloudFormation)",
            "Manage Docker containers and Kubernetes clusters",
            "Ensure system uptime, monitoring, and auto-scaling"
        ],
        "typical_projects": [
            "Kubernetes Microservice Deployment Pipeline",
            "Multi-Region AWS Infrastructure with Terraform",
            "Automated Disaster Recovery & Backup Workflow"
        ],
        "recommended_certifications": [
            "AWS Certified Solutions Architect - Associate",
            "Certified Kubernetes Administrator (CKA)"
        ]
    },
    {
        "id": "uiux-designer",
        "title": "UI / UX Designer",
        "category": "UI / UX Design",
        "description": "Craft intuitive user experiences, design interfaces, wireframes, and design systems focused on user needs.",
        "icon": "layout",
        "salary_range": "$75,000 - $125,000 / yr",
        "demand_level": "Moderate-High",
        "target_skills": {
            "Creativity": 95,
            "HTML/CSS": 75,
            "React": 60,
            "Communication": 85,
            "Adaptability": 80,
            "Analytical Thinking": 75
        },
        "key_responsibilities": [
            "Conduct user research and usability testing interviews",
            "Create interactive wireframes, prototypes, and UI mockups",
            "Build and enforce cohesive design systems and component libraries",
            "Collaborate closely with frontend software engineers"
        ],
        "typical_projects": [
            "Mobile Banking App Design System in Figma",
            "SaaS Analytics Dashboard Redesign & User Flow",
            "Usability Audit & Interactive Prototype"
        ],
        "recommended_certifications": [
            "Google UX Design Professional Certificate",
            "Nielsen Norman Group UX Certification"
        ]
    }
]

INDUSTRY_TRENDS = [
    {
        "category": "Software Engineering",
        "description": "High demand for full-stack developers skilled in microservices, cloud-native architectures, and modern web frameworks.",
        "growing_skills": ["TypeScript", "Next.js", "Docker", "Go", "GraphQL"],
        "key_tools": ["Git", "Postman", "VS Code", "Jest", "Docker"],
        "emerging_tech": ["AI-Assisted Coding Tools", "Serverless Computing", "Edge Functions"],
        "certification_tips": "Focus on cloud-specific developer certifications (AWS/Azure) to stand out.",
        "hiring_demand_score": 92
    },
    {
        "category": "Data Analytics",
        "description": "Businesses are prioritizing real-time analytics, automated data pipelines, and storytelling with business intelligence tools.",
        "growing_skills": ["SQL", "dbt", "Python (Pandas/Polars)", "Tableau", "Power BI"],
        "key_tools": ["BigQuery", "Snowflake", "Jupyter", "PostgreSQL", "Metabase"],
        "emerging_tech": ["Generative BI Tools", "Real-Time Data Streaming", "Data Mesh"],
        "certification_tips": "Google Data Analytics or Power BI Data Analyst certifications carry high credibility.",
        "hiring_demand_score": 88
    },
    {
        "category": "AI / ML",
        "description": "Massive adoption of Large Language Models, Retrieval-Augmented Generation (RAG), and agentic workflows across all industries.",
        "growing_skills": ["PyTorch", "LangChain/LlamaIndex", "Vector Databases", "Prompt Engineering", "MLOps"],
        "key_tools": ["Hugging Face", "Pinecone", "Weights & Biases", "MLflow", "Ollama"],
        "emerging_tech": ["Autonomous AI Agents", "Small Language Models (SLMs)", "Multimodal AI"],
        "certification_tips": "AWS Machine Learning Specialty or TensorFlow Developer certificates are strongly recognized.",
        "hiring_demand_score": 96
    },
    {
        "category": "Cybersecurity",
        "description": "Increasing cyber threats and cloud migrations have fueled urgent demand for cloud security, threat hunting, and Zero-Trust setups.",
        "growing_skills": ["Cloud Security", "SIEM Tools", "Python for Automation", "Penetration Testing", "IAM Policies"],
        "key_tools": ["Splunk", "Wireshark", "Burp Suite", "Nmap", "Sentinel"],
        "emerging_tech": ["AI-Driven Threat Detection", "Quantum-Resistant Encryption", "Zero-Trust Architecture"],
        "certification_tips": "CompTIA Security+ is the foundational standard; CISSP or CEH for advanced roles.",
        "hiring_demand_score": 94
    },
    {
        "category": "Cloud / DevOps",
        "description": "Shift towards Infrastructure as Code, GitOps, zero-downtime deployments, and multi-cloud resilience.",
        "growing_skills": ["Terraform", "Kubernetes", "Docker", "CI/CD Pipelines", "Ansible"],
        "key_tools": ["AWS", "GitHub Actions", "ArgoCD", "Prometheus", "Grafana"],
        "emerging_tech": ["Platform Engineering", "FinOps (Cloud Cost Optimization)", "eBPF Monitoring"],
        "certification_tips": "AWS Solutions Architect Associate or CKA (Certified Kubernetes Administrator).",
        "hiring_demand_score": 90
    },
    {
        "category": "UI / UX Design",
        "description": "Growing emphasis on accessibility, design systems, data-driven UX decisions, and AI-assisted prototyping.",
        "growing_skills": ["Design Systems", "Figma", "Micro-Interactions", "Usability Testing", "Wireframing"],
        "key_tools": ["Figma", "Rive", "Storybook", "Miro", "Principle"],
        "emerging_tech": ["Generative UI Tools", "Spatial UI (AR/VR)", "Automated Design-to-Code"],
        "certification_tips": "Google UX Design Certificate paired with a strong online portfolio of case studies.",
        "hiring_demand_score": 82
    }
]
