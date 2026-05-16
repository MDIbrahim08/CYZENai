import asyncio
from playwright.async_api import async_playwright
import json
import os

scenarios = [
    {
        "id": 2,
        "scenario": "E-commerce Business Owner - Online Store",
        "role_text": "Business Owner",
        "target_text": "Web Application",
        "maturity": "intermediate",
        "compliance": ["Handles payment card information"]
    },
    {
        "id": 3,
        "scenario": "IT Admin - Corporate Internal Network",
        "role_text": "IT Admin",
        "target_text": "Cloud Environment",
        "maturity": "advanced",
        "compliance": []
    },
    {
        "id": 4,
        "scenario": "Lead Developer - SaaS Platform",
        "role_text": "Developer",
        "target_text": "API Infrastructure",
        "maturity": "advanced",
        "compliance": []
    },
    {
        "id": 5,
        "scenario": "Healthcare Compliance Officer - Clinic Mobile App",
        "role_text": "Business Owner",
        "target_text": "Mobile Application",
        "maturity": "intermediate",
        "compliance": ["Handles patient health data"]
    },
    {
        "id": 6,
        "scenario": "Freelancer - Client APIs",
        "role_text": "Freelancer",
        "target_text": "API Infrastructure",
        "maturity": "intermediate",
        "compliance": []
    },
    {
        "id": 7,
        "scenario": "Student - Educational Project",
        "role_text": "Student",
        "target_text": "Web Application",
        "maturity": "beginner",
        "compliance": []
    },
    {
        "id": 8,
        "scenario": "Startup Founder - Data Aggregator",
        "role_text": "Startup Founder",
        "target_text": "API Infrastructure",
        "maturity": "intermediate",
        "compliance": ["Collects EU/UK resident personal data"]
    },
    {
        "id": 9,
        "scenario": "Small Business Owner - Internal Ops",
        "role_text": "Business Owner",
        "target_text": "Business Operations",
        "maturity": "beginner",
        "compliance": []
    },
    {
        "id": 10,
        "scenario": "Developer - Personal Devices",
        "role_text": "Developer",
        "target_text": "Personal Devices",
        "maturity": "advanced",
        "compliance": []
    }
]

async def run_scenario(page, sc):
    # 1. Register / Login
    await page.goto("http://localhost:5173")
    await page.click("text=Create Account")
    await page.fill("input[type='text']", f"User {sc['id']}")
    await page.fill("input[type='email']", f"user{sc['id']}@example.com")
    await page.fill("input[type='password']", "password123")
    
    # Click submit (Create Account)
    await page.click("button[type='submit']")
    
    # Wait for setup page
    await page.wait_for_selector("text=Profile Discovery")
    
    # 2. Profile Setup
    # Click role
    await page.click(f"button:has-text('{sc['role_text']}')")
    
    # Click target
    await page.click(f"button:has-text('{sc['target_text']}')")
    
    # Select maturity
    await page.select_option("select", sc["maturity"])
    
    # Check compliance checkboxes
    for comp in sc["compliance"]:
        await page.click(f"label:has-text('{comp}')")
        
    # Click generate
    await page.click("text=Generate Personalized Questionnaire")
    
    # 3. Questionnaire
    # Wait for first question
    await page.wait_for_selector("text=Question 1")
    
    qa_log = []
    
    while True:
        # Get question text
        question_el = await page.query_selector("h3")
        question_text = await question_el.inner_text()
        
        # Get options
        options = await page.query_selector_all("button.glass-card")
        
        # Select first option for simplicity
        option = options[0]
        answer_text = await option.inner_text()
        
        qa_log.append({"question": question_text, "answer": answer_text})
        
        await option.click()
        
        # Check if Complete Assessment button is visible and enabled
        try:
            complete_btn = await page.wait_for_selector("button:has-text('Complete Assessment')", timeout=1000)
            if complete_btn:
                await complete_btn.click()
                break
        except:
            pass
            
    # 4. Results
    await page.wait_for_selector("text=Security Analysis", timeout=10000)
    
    # Extract Score
    score_text = await page.inner_text(".score-container h1") if await page.query_selector(".score-container h1") else "N/A"
    risk_level = await page.inner_text(".risk-badge") if await page.query_selector(".risk-badge") else "N/A"
    
    findings_els = await page.query_selector_all(".finding-card")
    findings = []
    for f in findings_els:
        title = await f.inner_text()
        findings.append(title.replace("\\n", " "))
        
    # generate markdown
    md = f"""# Adaptive Security Posture Analyzer - Test Case {sc['id']}
## Scenario: {sc['scenario']}

### 1. Execution Steps
1.  **Authentication**: Registered account user{sc['id']}@example.com
2.  **Profile Setup**: 
    *   Role: `{sc['role_text']}`
    *   Target Asset: `{sc['target_text']}`
    *   Maturity: `{sc['maturity']}`
    *   Compliance Scoping: {', '.join(sc['compliance']) if sc['compliance'] else 'None'}
3.  **Assessment**: Completed questionnaire.

### 2. Recorded Inputs (Questions & Answers)
"""
    for item in qa_log:
        md += f"- **Q**: {item['question']}\n  **A**: {item['answer']}\n"
        
    md += f"""
### 3. Generated Results
- **Overall Score**: {score_text}
- **Risk Level**: {risk_level}

#### **Findings**
"""
    for idx, f in enumerate(findings):
        md += f"{idx+1}. {f}\n"

    with open(f"test_case_{sc['id']}.md", "w", encoding="utf-8") as f:
        f.write(md)
    print(f"Generated test_case_{sc['id']}.md")

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        # Record video
        context = await browser.new_context(record_video_dir="videos/")
        page = await context.new_page()
        
        for sc in scenarios:
            try:
                await run_scenario(page, sc)
                # clear session storage/cookies for next user
                await context.clear_cookies()
            except Exception as e:
                print(f"Error on {sc['id']}: {e}")
                
        await context.close()
        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
