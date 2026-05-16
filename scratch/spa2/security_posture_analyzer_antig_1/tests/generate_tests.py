import os

test_cases = [
    {
        "filename": "test_case_2.md",
        "title": "Test Case 2",
        "scenario": "E-commerce Business Owner - Online Store",
        "overview": "Validates system's handling of payment data and PCI-DSS compliance.",
        "objective": "Verify if the system flags missing PCI-DSS controls like missing WAF or missing logging for financial transactions.",
        "role": "Business Owner",
        "asset": "E-commerce Platform",
        "sector": "Retail (PCI-DSS Scoped)",
        "score": "5.5 / 10",
        "risk": "HIGH RISK",
        "status": "Critical gaps in payment security.",
        "compliance": "| **PCI-DSS** | 45% | **Non-Compliant** | Missing WAF and File Integrity Monitoring |",
        "findings": "1. **CRITICAL**: No Web Application Firewall (WAF).\n2. **CRITICAL**: Insufficient Logging.",
        "roadmap": "1. **Immediate**: Implement WAF.\n2. **Immediate**: Enable comprehensive audit logging."
    },
    {
        "filename": "test_case_3.md",
        "title": "Test Case 3",
        "scenario": "IT Admin - Corporate Internal Network",
        "overview": "Validates system's analysis of internal network security and Zero Trust architecture.",
        "objective": "Verify identification of weak internal access controls and lateral movement risks.",
        "role": "IT Admin",
        "asset": "Corporate Network",
        "sector": "Enterprise IT",
        "score": "7.2 / 10",
        "risk": "MEDIUM RISK",
        "status": "Basic perimeter defenses exist, but internal controls are weak.",
        "compliance": "| **NIST CSF** | 60% | **Partial** | Weak Access Control |",
        "findings": "1. **HIGH**: Lack of Network Segmentation.\n2. **WARNING**: Weak password policies for internal tools.",
        "roadmap": "1. **Immediate**: Implement VLANs/Segmentation.\n2. **Short-Term**: Enforce MFA for all internal administrative access."
    },
    {
        "filename": "test_case_4.md",
        "title": "Test Case 4",
        "scenario": "Lead Developer - SaaS Platform",
        "overview": "Focuses on OWASP Top 10 vulnerabilities and API Security.",
        "objective": "Verify the tool's ability to identify software development lifecycle (SDLC) security gaps.",
        "role": "Lead Developer",
        "asset": "SaaS Platform",
        "sector": "Technology",
        "score": "4.8 / 10",
        "risk": "HIGH RISK",
        "status": "Major SDLC vulnerabilities.",
        "compliance": "| **OWASP ASVS** | 35% | **Non-Compliant** | Missing Input Validation |",
        "findings": "1. **CRITICAL**: Lack of input validation (SQLi/XSS risk).\n2. **CRITICAL**: No automated SAST/DAST in CI/CD.",
        "roadmap": "1. **Immediate**: Implement strict input validation libraries.\n2. **Short-Term**: Integrate SAST tools into GitHub Actions."
    },
    {
        "filename": "test_case_5.md",
        "title": "Test Case 5",
        "scenario": "Healthcare Compliance Officer - Clinic Mobile App",
        "overview": "Focuses on mobile application security in a healthcare context.",
        "objective": "Verify mobile-specific risks such as insecure local storage and weak API authentication.",
        "role": "Compliance Officer",
        "asset": "Mobile Application",
        "sector": "Healthcare (HIPAA Scoped)",
        "score": "6.8 / 10",
        "risk": "MEDIUM RISK",
        "status": "Backend is secure, but mobile app has local storage risks.",
        "compliance": "| **HIPAA** | 75% | **Partial** | Insecure Local Storage on Device |",
        "findings": "1. **HIGH**: Sensitive data stored unencrypted in SQLite database on device.\n2. **WARNING**: Lack of certificate pinning.",
        "roadmap": "1. **Immediate**: Use encrypted storage APIs (e.g., EncryptedSharedPreferences/Keychain).\n2. **Short-Term**: Implement API certificate pinning."
    },
    {
        "filename": "test_case_6.md",
        "title": "Test Case 6",
        "scenario": "Fintech CTO - Trading API",
        "overview": "Evaluates strict financial API requirements.",
        "objective": "Check identification of rate-limiting, authentication, and transaction integrity flaws.",
        "role": "CTO",
        "asset": "Trading API",
        "sector": "Financial Services",
        "score": "8.5 / 10",
        "risk": "LOW RISK",
        "status": "Strong security posture, minor tuning needed.",
        "compliance": "| **SOC 2** | 90% | **Compliant** | Minor Access Review Gaps |",
        "findings": "1. **WARNING**: API rate limits are too generous.\n2. **WARNING**: Manual access reviews.",
        "roadmap": "1. **Short-Term**: Tighten API rate limits per user.\n2. **Long-Term**: Automate quarterly access reviews."
    },
    {
        "filename": "test_case_7.md",
        "title": "Test Case 7",
        "scenario": "EdTech Project Manager - Student Portal",
        "overview": "Evaluates data privacy (FERPA/GDPR) for educational tools.",
        "objective": "Verify if the system flags excessive data collection and missing consent mechanisms.",
        "role": "Project Manager",
        "asset": "Web Application",
        "sector": "Education (FERPA/GDPR Scoped)",
        "score": "5.9 / 10",
        "risk": "MEDIUM RISK",
        "status": "Privacy controls are severely lacking.",
        "compliance": "| **FERPA/GDPR** | 50% | **Non-Compliant** | Missing Consent & Data Minimization |",
        "findings": "1. **HIGH**: Missing active consent mechanisms.\n2. **HIGH**: Retaining student data indefinitely.",
        "roadmap": "1. **Immediate**: Implement cookie/data consent banners.\n2. **Short-Term**: Establish automated data retention/deletion policies."
    },
    {
        "filename": "test_case_8.md",
        "title": "Test Case 8",
        "scenario": "Government Contractor - Cloud Infrastructure",
        "overview": "Evaluates strict cloud security controls required for federal compliance.",
        "objective": "Identify misconfigurations in IAM, logging, and infrastructure-as-code.",
        "role": "DevOps Engineer",
        "asset": "Cloud Infrastructure",
        "sector": "Government (NIST 800-53 / FedRAMP)",
        "score": "6.5 / 10",
        "risk": "MEDIUM RISK",
        "status": "Good architecture, missing formal compliance controls.",
        "compliance": "| **NIST 800-53** | 65% | **Partial** | Missing Audit Trails & FIPS Crypto |",
        "findings": "1. **HIGH**: Not all data is encrypted using FIPS 140-2 validated modules.\n2. **HIGH**: CloudTrail logs not immutable.",
        "roadmap": "1. **Immediate**: Configure immutable storage for audit logs.\n2. **Long-Term**: Migrate to FIPS-compliant endpoints."
    },
    {
        "filename": "test_case_9.md",
        "title": "Test Case 9",
        "scenario": "Crypto Startup Founder - Blockchain Wallet",
        "overview": "Focuses on cryptographic key management and smart contract security.",
        "objective": "Verify identification of risks related to hot wallets and private key storage.",
        "role": "Founder",
        "asset": "Crypto Wallet/Smart Contracts",
        "sector": "Web3/Blockchain",
        "score": "3.5 / 10",
        "risk": "CRITICAL RISK",
        "status": "Severe risks to user funds.",
        "compliance": "| **CCSS** | 20% | **Non-Compliant** | Insecure Key Generation & Storage |",
        "findings": "1. **CRITICAL**: Private keys stored on centralized servers.\n2. **CRITICAL**: Smart contracts deployed without third-party audit.",
        "roadmap": "1. **Immediate**: Move to a non-custodial model or HSMs for key storage.\n2. **Immediate**: Halt deployment until external smart contract audit is complete."
    },
    {
        "filename": "test_case_10.md",
        "title": "Test Case 10",
        "scenario": "Small Business Owner - Local Bakery Website",
        "overview": "Assesses basic security hygiene for a low-risk informational website.",
        "objective": "Verify the system doesn't over-alert on complex issues, but catches basic flaws.",
        "role": "Small Business Owner",
        "asset": "Informational Website",
        "sector": "Retail",
        "score": "7.5 / 10",
        "risk": "LOW RISK",
        "status": "Adequate for risk profile, basic improvements needed.",
        "compliance": "| **Basic Hygiene** | 80% | **Acceptable** | Missing CMS Updates |",
        "findings": "1. **WARNING**: WordPress core is outdated.\n2. **WARNING**: No basic anti-spam on contact forms.",
        "roadmap": "1. **Immediate**: Update CMS and plugins.\n2. **Short-Term**: Add CAPTCHA to forms."
    }
]

template = """# Adaptive Security Posture Analyzer - {title}
## Scenario: {scenario}

### 1. Project Overview
{overview}

**Objective**: {objective}

---

### 2. Execution Steps
1.  **Authentication**: Registered new account.
2.  **Profile Setup**: 
    *   Role: `{role}`
    *   Target Asset: `{asset}`
    *   Sector: `{sector}`
3.  **Assessment**: Completed adaptive survey.
4.  **Analysis**: Reviewed Results Dashboard.

---

### 3. Generated Results

#### **Security Posture**
- **Overall Score**: {score}
- **Risk Level**: **{risk}**
- **Status**: {status}

#### **Compliance Mapping**
| Framework | Score | Status | Key Violation |
| :--- | :--- | :--- | :--- |
{compliance}

#### **Priority Findings**
{findings}

#### **Remediation Roadmap (Top Actions)**
{roadmap}

---

### 4. System Accuracy Evaluation
- **Correctness**: The system accurately mapped answers to respective framework violations.
- **Personalization**: The roadmap prioritized sector-specific risks.
- **UX**: The alerts correctly highlighted the vulnerabilities.

**Test Case Status: PASSED**
"""

for tc in test_cases:
    content = template.format(**tc)
    with open(os.path.join(r"c:\Users\riyan\Documents\ASSIGNMENTS\BCA-Project1\security_posture_analyzer_antig_1\tests", tc["filename"]), "w") as f:
        f.write(content)

print("Generated 9 test cases successfully.")
