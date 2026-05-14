// Career Path Data for Clinical Psychology

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
    icon: '📘',
    title: 'BA in Psychology',
    duration: '3-4 years',
    isComplete: false,
    isCurrent: true
  },
  {
    id: 'step2',
    number: 2,
    icon: '🎯',
    title: 'Choose Specialization',
    duration: 'During BA',
    isComplete: false
  },
  {
    id: 'step3',
    number: 3,
    icon: '📚',
    title: "Master's Degree",
    duration: '2 years',
    isComplete: false
  },
  {
    id: 'step4',
    number: 4,
    icon: '🔬',
    title: 'Internship/Practicum',
    duration: '1 year',
    isComplete: false
  },
  {
    id: 'step5',
    number: 5,
    icon: '📋',
    title: 'Licensing Exam',
    duration: 'Varies',
    isComplete: false
  },
  {
    id: 'step6',
    number: 6,
    icon: '🏥',
    title: 'Clinical Practice',
    duration: 'Career',
    isComplete: false
  }
];

export const currentStepDetails = {
  title: 'BA Psychology Degree',
  duration: '3-4 years',
  subjects: [
    'Statistics (covered by this app! 📊)',
    'Research Methods',
    'Abnormal Psychology',
    'Developmental Psychology',
    'Social Psychology',
    'Cognitive Psychology',
    'Biological Psychology',
    'History of Psychology'
  ],
  learningOutcomes: [
    'Fundamental psychological concepts',
    'Research skills & methodology',
    'Critical thinking & analysis',
    'Statistical data analysis (SPSS, R)',
    'Scientific writing (APA format)',
    'Ethical considerations in research',
    'Evidence-based practice foundations'
  ],
  recommendedActions: [
    { text: 'Master statistics', completed: true, note: 'This app helps!' },
    { text: 'Gain research experience', completed: false, note: 'Join a research lab as RA' },
    { text: 'Complete internships', completed: false, note: 'Clinical or research settings' },
    { text: 'Network with professors', completed: false, note: 'For letters of recommendation' },
    { text: 'Maintain strong GPA', completed: false, note: '3.5+ for competitive programs' },
    { text: 'Volunteer in mental health', completed: false, note: 'Crisis lines, community centers' },
    { text: 'Prepare for GRE', completed: false, note: 'Required for many US/Canada programs' }
  ]
};

export const countryPaths: CountryInfo[] = [
  {
    id: 'us',
    name: 'United States',
    flag: '🇺🇸',
    degree: "Master's in Clinical Psychology (MA/MS) or Doctoral Degree (PhD/PsyD)",
    duration: "2 years (Master's) or 5-7 years (Doctoral)",
    requirements: [
      'Bachelor\'s degree in psychology or related field',
      'GPA: 3.0+ minimum (3.5+ for competitive doctoral programs)',
      'GRE General Test scores (some programs now test-optional)',
      'GRE Psychology Subject Test (for some doctoral programs)',
      'Personal statement demonstrating research/clinical interests',
      'Letters of recommendation (typically 3)',
      'Research experience strongly preferred for PhD programs',
      'Clinical experience preferred (volunteer or paid)',
      'Advanced statistics & research methods coursework',
      'Clinical assessment & psychotherapy courses',
      '500-1,000+ clinical practicum hours during program',
      'Master\'s thesis or doctoral dissertation required'
    ],
    licensingPath: [
      '1. Complete APA-accredited doctoral program (for independent practice)',
      '2. Complete APA-accredited internship (1 year, ~2,000 hours)',
      '3. Earn doctoral degree (PhD or PsyD)',
      '4. Complete postdoctoral supervised experience (1-2 years, 1,500-4,000 hours depending on state)',
      '5. Pass EPPP (Examination for Professional Practice in Psychology) - 225 multiple choice questions',
      '6. Pass state jurisprudence exam (varies by state)',
      '7. Apply for state license',
      '8. Maintain license through continuing education (typically 20-40 CE hours per renewal period)',
      'Note: Master\'s level clinicians can obtain LPC/LMFT/LCSW licenses for practice under supervision'
    ],
    timeline: "Master's: 2 years + supervised hours. Doctoral: 5-7 years (including internship) + 1-2 years postdoc + licensing",
    estimatedCost: 'Master\'s: $30,000-$60,000+ | Doctoral: $150,000-$300,000+ (many PhD programs offer full funding)',
    salary: 'Master\'s (LPC/LMFT): $50,000-$70,000 | Doctoral: $80,000-$120,000+ (varies by setting)',
    topUniversities: [
      'University of California, Los Angeles (UCLA)',
      'University of California, Berkeley',
      'University of Michigan, Ann Arbor',
      'Yale University',
      'Stanford University',
      'University of Pennsylvania',
      'University of North Carolina at Chapel Hill',
      'University of Wisconsin-Madison',
      'Stony Brook University (SUNY)',
      'Duke University'
    ],
    additionalNotes: [
      '⚠️ PhD programs are research-focused; PsyD programs are practice-focused',
      '⚠️ Many PhD programs offer full tuition + stipend (~$25,000-$35,000/year)',
      '⚠️ PsyD programs rarely offer funding and have higher debt loads',
      '⚠️ APA accreditation is essential for licensure in most states',
      '⚠️ "Clinical Psychology" title usually requires doctoral degree',
      '⚠️ Some states allow Master\'s-level practitioners to diagnose and treat',
      '⚠️ Telehealth has expanded practice opportunities across state lines'
    ],
    jobOutlook: 'Excellent - 6% growth projected 2022-2032 (faster than average). High demand in healthcare, schools, and private practice.',
    workSettings: [
      'Private practice',
      'Hospitals (inpatient/outpatient)',
      'Community mental health centers',
      'University counseling centers',
      'VA (Veterans Affairs) hospitals',
      'Correctional facilities',
      'Schools (K-12 and higher education)',
      'Pharmaceutical research',
      'Corporate/organizational consulting'
    ],
    specializations: [
      'Child & Adolescent Psychology',
      'Neuropsychology',
      'Health Psychology',
      'Forensic Psychology',
      'Geropsychology',
      'Trauma & PTSD',
      'Addiction Psychology',
      'Couples & Family Therapy'
    ]
  },
  {
    id: 'au',
    name: 'Australia',
    flag: '🇦🇺',
    degree: "Master of Clinical Psychology or Doctor of Psychology (Clinical)",
    duration: "Master's: 2 years | Doctorate: 3-4 years (combined Master's/Doctorate: 4 years)",
    requirements: [
      'Bachelor\'s degree in Psychology (4-year accredited sequence or 3-year + Honours)',
      'APAC (Australian Psychology Accreditation Council) accredited undergraduate degree',
      'First Class or Upper Second Class Honours (H1/H2A) strongly preferred',
      'Minimum GPA equivalent to 5.5/7.0 or Credit average',
      'IELTS 7.0+ overall (7.0 in each band) for international students',
      'Curriculum vitae demonstrating relevant experience',
      'Personal statement addressing clinical interests and career goals',
      'Referee reports (typically 2-3)',
      'Interview performance (highly competitive)',
      'Completion of 1,000+ hours supervised clinical practice during program',
      'Full year of clinical placement (usually final year)',
      'Research thesis component (substantial in doctoral programs)',
      'Demonstrated competency in 6 core areas of clinical practice'
    ],
    licensingPath: [
      '1. Complete APAC-accredited postgraduate clinical program',
      '2. Apply for general registration with Psychology Board of Australia',
      '3. Register with AHPRA (Australian Health Practitioner Regulation Agency)',
      '4. Complete provisional registration period if required',
      '5. Apply for Area of Practice Endorsement in Clinical Psychology',
      '6. Maintain registration through CPD (30+ hours annually)',
      '7. Annual registration renewal with AHPRA',
      '8. Optional: Obtain Medicare provider number for bulk billing',
      'Note: Only endorsed psychologists can use "Clinical Psychologist" title'
    ],
    timeline: '4-year undergrad sequence + 2-4 year postgrad + registration = 6-8 years total',
    estimatedCost: 'Master\'s: AUD $45,000-$80,000 | Doctorate: AUD $60,000-$120,000 (Commonwealth Supported Places available for domestic students)',
    salary: 'New Graduate: AUD $75,000-$90,000 | Mid-Career: AUD $100,000-$130,000 | Senior/Private Practice: AUD $150,000-$200,000+',
    topUniversities: [
      'University of Melbourne',
      'University of Sydney',
      'University of New South Wales (UNSW)',
      'University of Queensland',
      'Monash University',
      'Australian National University (ANU)',
      'Macquarie University',
      'University of Western Australia',
      'Curtin University',
      'Griffith University'
    ],
    additionalNotes: [
      '✅ Strong job market - psychology is on the Skills Shortage List for migration',
      '✅ Medicare rebates available for patients (up to 10 sessions per year)',
      '✅ Regional and remote areas offer significantly higher salaries and incentives',
      '✅ Telehealth permanently expanded since COVID-19',
      '⚠️ Entry into clinical programs is extremely competitive (~10-15% acceptance rate)',
      '⚠️ 4+2 pathway being phased out - 5+1 pathway is new standard',
      '⚠️ Area of Practice Endorsement required to call yourself "Clinical Psychologist"',
      '💡 Consider: Provisional Psychologist roles while completing training'
    ],
    jobOutlook: 'Very Strong - Psychology is on Australia\'s Medium and Long-term Strategic Skills List (MLTSSL). Projected 12.5% growth 2022-2027.',
    workSettings: [
      'Private practice (solo or group)',
      'Public hospitals (state health departments)',
      'Private hospitals',
      'Community mental health services',
      'Medicare-funded psychology clinics',
      'University psychology clinics',
      'Schools and education departments',
      'Correctional services',
      'Defence Force',
      'Workers\' compensation and insurance',
      'Employee Assistance Programs (EAPs)',
      'Aged care facilities',
      'Disability services (NDIS providers)'
    ],
    specializations: [
      'Clinical Neuropsychology',
      'Clinical Child & Adolescent Psychology',
      'Health Psychology',
      'Forensic Psychology',
      'Perinatal & Infant Mental Health',
      'Eating Disorders',
      'Trauma & PTSD (including veterans)',
      'Substance Use & Addiction',
      'Pain Management Psychology',
      'Indigenous Mental Health'
    ]
  },
  {
    id: 'uk',
    name: 'United Kingdom',
    flag: '🇬🇧',
    degree: 'DClinPsy (Doctorate in Clinical Psychology)',
    duration: '3 years (doctoral program)',
    requirements: [
      "Bachelor's degree in psychology (BPS accredited)",
      'Grade B or higher in research methods & statistics',
      '1-2 years post-BA clinical experience required',
      'Personal statement explaining motivation',
      'Interview (highly competitive)',
      'GCSE Maths and English at Grade 4+ (if not A-level)'
    ],
    licensingPath: [
      'Complete DClinPsy (Doctorate in Clinical Psychology)',
      'Register with HCPC (Health and Care Professions Council)',
      'BPS (British Psychological Society) accreditation',
      'Chartered Psychologist status available',
      'Continuing Professional Development (CPD) required'
    ],
    timeline: '1-2 years experience + 3 years doctorate + registration',
    estimatedCost: '£10,000 - £30,000 (funded NHS placements available)',
    salary: '£28,000 - £60,000+ (NHS Band 7-8)',
    topUniversities: [
      'University College London (UCL)',
      'King\'s College London',
      'University of Oxford',
      'University of Edinburgh',
      'University of Manchester'
    ],
    additionalNotes: [
      'DClinPsy is the standard route - no separate Master\'s required',
      'Competition is intense: ~20% acceptance rate',
      'NHS-funded positions cover tuition + salary during training'
    ],
    jobOutlook: 'Good - steady demand in NHS and private sector.',
    workSettings: [
      'NHS hospitals and community services',
      'Private practice',
      'Universities',
      'Forensic settings'
    ],
    specializations: [
      'Adult Mental Health',
      'Child & Adolescent',
      'Older Adults',
      'Learning Disabilities',
      'Neuropsychology'
    ]
  },
  {
    id: 'ca',
    name: 'Canada',
    flag: '🇨🇦',
    degree: "Master's or PhD in Clinical Psychology",
    duration: "2 years (Master's) or 5-7 years (PhD)",
    requirements: [
      'Competitive GPA (3.5+ recommended)',
      'Strong statistics and research methods background',
      'GRE scores (many programs)',
      '500+ clinical hours during program',
      'Practicum and internship required',
      'Thesis or dissertation'
    ],
    licensingPath: [
      'Complete CPA-accredited program',
      'Provincial licensing board registration',
      'Jurisprudence exam (province-specific)',
      'Oral exam or portfolio review',
      'Continuing education requirements',
      'Some provinces require PhD for independent practice'
    ],
    timeline: '2-5 years program + 1-2 years supervised practice + licensing',
    estimatedCost: 'CAD $15,000 - $40,000',
    salary: 'CAD $60,000 - $90,000+ annually',
    topUniversities: [
      'University of Toronto',
      'University of British Columbia (UBC)',
      'McGill University',
      'University of Alberta',
      'University of Western Ontario'
    ],
    additionalNotes: [
      'PhD often preferred for independent practice',
      'Provincial regulations vary significantly',
      'French language may be required in Quebec'
    ],
    jobOutlook: 'Good - growing demand especially in underserved areas.',
    workSettings: [
      'Hospitals',
      'Private practice',
      'Universities',
      'Community mental health'
    ],
    specializations: [
      'Clinical Psychology',
      'Counselling Psychology',
      'School Psychology',
      'Neuropsychology'
    ]
  },
  {
    id: 'in',
    name: 'India',
    flag: '🇮🇳',
    degree: 'M.Sc./M.A. in Clinical Psychology',
    duration: '2 years',
    requirements: [
      "Bachelor's in Psychology with statistics & research methods",
      'Entrance exam (university-specific or common admission test)',
      '500+ hours practical training during program',
      'Minimum 6 months internship',
      'Dissertation/thesis project',
      'Viva voce examination'
    ],
    licensingPath: [
      'Currently no statutory regulation in India',
      'Recognition through psychology councils (evolving)',
      'Professional membership: IPA (Indian Psychological Association)',
      'RCI registration required for disability-related work',
      'Self-regulation through ethics guidelines',
      'Proposed: Mental Healthcare Act regulations'
    ],
    timeline: '2 years program + practical training',
    estimatedCost: '₹1,00,000 - ₹5,00,000 (Government institutions cheaper)',
    salary: '₹3,00,000 - ₹8,00,000+ annually',
    topUniversities: [
      'NIMHANS (Bangalore)',
      'Tata Institute of Social Sciences (TISS)',
      'University of Delhi',
      'Jamia Millia Islamia',
      'Amity University'
    ],
    additionalNotes: [
      'No statutory registration required currently (unlike medicine)',
      'Mental Healthcare Act 2017 provides some regulation',
      'RCI registration needed for rehabilitation psychology',
      'Growing demand in urban areas',
      'Telepsychology expanding rapidly'
    ],
    jobOutlook: 'Growing - increasing awareness of mental health creating more opportunities.',
    workSettings: [
      'Private practice',
      'Hospitals',
      'NGOs',
      'Schools',
      'Corporate wellness'
    ],
    specializations: [
      'Clinical Psychology',
      'Counselling Psychology',
      'Child Psychology',
      'Health Psychology'
    ]
  }
];

// Helper function to get country by ID
export const getCountryById = (id: string): CountryInfo | undefined => {
  return countryPaths.find(c => c.id === id);
};
