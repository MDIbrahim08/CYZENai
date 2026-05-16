// Cybersecurity Career Path Data

export interface TimelineStep {
  id: string;
  number: number;
  icon: string;
  title: string;
  duration: string;
  isCurrent?: boolean;
  isComplete?: boolean;
}

export interface CountryInfo {
  id: string;
  name: string;
  flag: string;
  degree: string;
  duration: string;
  requirements: string[];
  licensingPath: string[];
  timeline: string;
  estimatedCost: string;
  salary: string;
  topUniversities: string[];
  additionalNotes?: string[];
  jobOutlook?: string;
  workSettings?: string[];
  specializations?: string[];
}

export const careerTimeline: TimelineStep[] = [
  {
    id: 'step1',
    number: 1,
    icon: '🛡️',
    title: 'CompTIA Security+',
    duration: '3-6 months',
    isComplete: true,
    isCurrent: false
  },
  {
    id: 'step2',
    number: 2,
    icon: '🔍',
    title: 'Junior SOC Analyst',
    duration: '1-2 years',
    isComplete: false,
    isCurrent: true
  },
  {
    id: 'step3',
    number: 3,
    icon: '💻',
    title: 'Pentester (CEH/OSCP)',
    duration: '2-3 years',
    isComplete: false
  },
  {
    id: 'step4',
    number: 4,
    icon: '⚡',
    title: 'Security Engineer',
    duration: '3-5 years',
    isComplete: false
  },
  {
    id: 'step5',
    number: 5,
    icon: '🏗️',
    title: 'Security Architect',
    duration: '5-8 years',
    isComplete: false
  },
  {
    id: 'step6',
    number: 6,
    icon: '🏆',
    title: 'CISO / Director',
    duration: '10+ years',
    isComplete: false
  }
];

export const currentStepDetails = {
  title: 'Junior SOC Analyst',
  duration: '1-2 years',
  subjects: [
    'Log Analysis (SIEM)',
    'Incident Response',
    'Network Traffic Analysis',
    'Threat Hunting',
    'Vulnerability Scanning',
    'EDR/XDR Solutions',
    'Cloud Security Basics',
    'Forensic Imaging'
  ],
  learningOutcomes: [
    'Real-time threat detection and mitigation',
    'Mastering SIEM tools like Splunk or QRadar',
    'Understanding attack patterns (MITRE ATT&CK)',
    'Writing effective security reports',
    'Automation via Python/Bash scripts',
    'Compliance frameworks (SOC2, ISO 27001)',
    'Managing firewalls and IDS/IPS'
  ],
  recommendedActions: [
    { text: 'Get CySA+ Certification', completed: false, note: 'Next logical step' },
    { text: 'Master Splunk Query Language', completed: true, note: 'Daily essential' },
    { text: 'Complete BTL1 (Blue Team Level 1)', completed: false, note: 'Practical labs' },
    { text: 'Network with SecOps pros', completed: false, note: 'Join LinkedIn groups' },
    { text: 'Contribute to open-source OSINT', completed: false, note: 'Build credibility' },
    { text: 'Learn Cloud Security (AWS/Azure)', completed: false, note: 'Crucial for modern SOC' }
  ]
};

export const countryPaths: CountryInfo[] = [
  {
    id: 'us',
    name: 'United States',
    flag: '🇺🇸',
    degree: "B.S. in Cybersecurity or Computer Science",
    duration: "4 years (Bachelor's) + Certifications",
    requirements: [
      'High school diploma or GED',
      'Strong proficiency in Linux/Windows systems',
      'Fundamental understanding of networking (TCP/IP)',
      'Security Clearance (required for government/defense roles)',
      'Certifications: Security+, CySA+, CISSP (for senior roles)',
      'Hands-on experience with virtualization (VMWare/VirtualBox)',
      'Personal portfolio of HTB/THM completions'
    ],
    licensingPath: [
      '1. Complete Degree/Certifications',
      '2. Gain experience in Help Desk or Junior SysAdmin',
      '3. Transition to SOC Analyst or Junior Pentester',
      '4. Specialize (Blue Team, Red Team, or GRC)',
      '5. Pursue advanced certifications like OSCP or CISM',
      '6. Reach Senior/Lead roles within 5-7 years'
    ],
    timeline: "Degree + Certs: 4-5 years. Entry-level to Senior: 5-8 years.",
    estimatedCost: 'Degree: $40k-$100k | Certifications: $500-$5,000',
    salary: 'Entry-level: $70k-$90k | Senior: $140k-$200k+',
    topUniversities: [
      'Carnegie Mellon University',
      'Georgia Institute of Technology',
      'Stanford University',
      'MIT',
      'Texas A&M'
    ],
    jobOutlook: 'Exceptional - 32% growth projected (much faster than average). Over 700k unfilled roles.',
    workSettings: [
      'Big Tech Companies',
      'Defense Contractors',
      'Financial Institutions',
      'Government Agencies (NSA/FBI)',
      'Remote Security Consultancies'
    ],
    specializations: [
      'Penetration Testing',
      'Incident Response',
      'AppSec',
      'Cloud Security',
      'GRC (Governance, Risk, Compliance)'
    ]
  },
  {
    id: 'in',
    name: 'India',
    flag: '🇮🇳',
    degree: 'B.Tech / B.E. in Computer Science or IT',
    duration: '4 years + PG Diploma in Cyber Security',
    requirements: [
      'Proficiency in Programming (C++, Java, Python)',
      'Understanding of Cryptography and Algorithms',
      'Internships in IT companies',
      'Certifications: CEH, Security+, CCNA'
    ],
    licensingPath: [
      '1. Engineering Degree',
      '2. Post-Grad Diploma or Certification Course',
      '3. Internship in IT security firm',
      '4. Junior Analyst roles in MNCs',
      '5. Certification upgrade (CISSP/CISA)'
    ],
    timeline: '4-5 years for foundation + 2-3 years experience for mid-level',
    estimatedCost: '₹4,00,000 - ₹12,00,000',
    salary: 'Entry: ₹5,00,000 - ₹8,00,000 | Mid: ₹15,00,000 - ₹25,00,000+',
    topUniversities: [
      'IIT Delhi / Bombay / Kanpur',
      'IIIT Hyderabad',
      'BITS Pilani',
      'NIT Trichy'
    ],
    jobOutlook: 'Strong - Digital India initiative driving massive demand for security pros.',
    workSettings: [
      'Service MNCs (TCS, Infosys, Wipro)',
      'Product MNCs (Google, Microsoft India)',
      'Fintech Startups',
      'Government PSUs'
    ],
    specializations: [
      'Cyber Law & Forensics',
      'Network Security',
      'VAPT',
      'Cloud Security'
    ]
  }
];

export const getCountryById = (id: string): CountryInfo | undefined => {
  return countryPaths.find(c => c.id === id);
};
