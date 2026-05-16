// Cybersecurity Resource Data
export interface VideoResource {
  id: string;
  title: string;
  duration: string;
  difficulty: 1 | 2 | 3;
  category: 'All' | 'Network Security' | 'Cryptography' | 'Social Engineering' | 'Cloud Security' | 'Forensics';
  relatedTool: string;
  description: string;
  creator: string;
  platform: 'YouTube' | 'Cybrary' | 'Coursera' | 'TryHackMe';
  thumbnailUrl: string;
  videoUrl: string;
}

export interface TextbookResource {
  id: string;
  title: string;
  author: string;
  publisher: string;
  year: number;
  isbn?: string;
  description: string;
  relatedTools: string[];
  relevance: 'high' | 'medium';
  coverUrl: string;
  purchaseUrl: string;
  chapters?: string[];
  rating: number;
  category: 'All' | 'Network Security' | 'Cryptography' | 'Social Engineering' | 'Cloud Security' | 'Forensics';
}

export interface CuratedCollection {
  id: string;
  title: string;
  description: string;
  videoCount: number;
  textbookCount: number;
  icon: string;
  gradient: string;
}

export const videoResources: VideoResource[] = [
  {
    id: 'v1',
    title: 'Network Security Fundamentals',
    duration: '45:12',
    difficulty: 1,
    category: 'Network Security',
    relatedTool: 'Wireshark',
    description: 'A deep dive into the basics of network security, OSI model, and protocol vulnerabilities.',
    creator: 'NetworkChuck',
    platform: 'YouTube',
    thumbnailUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc51?w=400&h=225&fit=crop',
    videoUrl: 'https://www.youtube.com/watch?v=example1'
  },
  {
    id: 'v2',
    title: 'Cryptography Explained',
    duration: '22:15',
    difficulty: 2,
    category: 'Cryptography',
    relatedTool: 'OpenSSL',
    description: 'Understanding symmetric vs asymmetric encryption, hashing, and digital signatures.',
    creator: 'Computerphile',
    platform: 'YouTube',
    thumbnailUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&h=225&fit=crop',
    videoUrl: 'https://www.youtube.com/watch?v=example2'
  },
  {
    id: 'v3',
    title: 'Social Engineering: The Human Element',
    duration: '18:45',
    difficulty: 1,
    category: 'Social Engineering',
    relatedTool: 'PhishMe',
    description: 'Learn how psychological manipulation is used to gain access to restricted data.',
    creator: 'The Cyber Mentor',
    platform: 'YouTube',
    thumbnailUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=225&fit=crop',
    videoUrl: 'https://www.youtube.com/watch?v=example3'
  },
  {
    id: 'v4',
    title: 'Introduction to Cloud Security',
    duration: '35:20',
    difficulty: 2,
    category: 'Cloud Security',
    relatedTool: 'AWS GuardDuty',
    description: 'Best practices for securing cloud environments in AWS, Azure, and Google Cloud.',
    creator: 'John Hammond',
    platform: 'YouTube',
    thumbnailUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=225&fit=crop',
    videoUrl: 'https://www.youtube.com/watch?v=example4'
  },
  {
    id: 'v5',
    title: 'Digital Forensics 101',
    duration: '28:10',
    difficulty: 3,
    category: 'Forensics',
    relatedTool: 'Autopsy',
    description: 'How to recover data from compromised systems and preserve evidence for legal proceedings.',
    creator: 'SANS Institute',
    platform: 'YouTube',
    thumbnailUrl: 'https://images.unsplash.com/photo-1510511459019-5dee99c48db8?w=400&h=225&fit=crop',
    videoUrl: 'https://www.youtube.com/watch?v=example5'
  }
];

export const textbookResources: TextbookResource[] = [
  {
    id: 't1',
    title: 'The Web Application Hacker\'s Handbook',
    author: 'Dafydd Stuttard & Marcus Pinto',
    publisher: 'Wiley',
    year: 2023,
    isbn: '978-1118026472',
    description: 'The definitive guide to finding and exploiting security flaws in web applications.',
    relatedTools: ['Burp Suite', 'OWASP ZAP', 'SQLMap'],
    relevance: 'high',
    coverUrl: 'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?w=200&h=300&fit=crop',
    purchaseUrl: 'https://www.amazon.com/',
    rating: 4.9,
    category: 'All'
  },
  {
    id: 't2',
    title: 'Practical Malware Analysis',
    author: 'Michael Sikorski',
    publisher: 'No Starch Press',
    year: 2024,
    isbn: '978-1593272906',
    description: 'A hands-on guide to dissecting malicious software and understanding its behavior.',
    relatedTools: ['IDA Pro', 'OllyDbg', 'Wireshark'],
    relevance: 'high',
    coverUrl: 'https://images.unsplash.com/photo-1563206767-5b18f218e8de?w=200&h=300&fit=crop',
    purchaseUrl: 'https://www.amazon.com/',
    rating: 4.8,
    category: 'Forensics'
  }
];

export const curatedCollections: CuratedCollection[] = [
  {
    id: 'c1',
    title: "Zero to Hero: Cybersecurity Path",
    description: 'A comprehensive roadmap for beginners to break into the industry.',
    videoCount: 12,
    textbookCount: 5,
    icon: '🛡️',
    gradient: 'gradient-indigo'
  },
  {
    id: 'c2',
    title: 'The Ethical Hacking Lab',
    description: 'Advanced techniques for penetration testing and vulnerability assessment.',
    videoCount: 8,
    textbookCount: 4,
    icon: '💻',
    gradient: 'gradient-emerald'
  }
];

export const getVideosByCategory = (category: string): VideoResource[] => {
  if (category === 'All') return videoResources;
  return videoResources.filter(v => v.category === category);
};

export const getTextbooksByCategory = (category: string): TextbookResource[] => {
  if (category === 'All') return textbookResources;
  return textbookResources.filter(t => t.category === category);
};

export const searchVideos = (query: string): VideoResource[] => {
  const q = query.toLowerCase();
  return videoResources.filter(v => 
    v.title.toLowerCase().includes(q) ||
    v.description.toLowerCase().includes(q)
  );
};

export const searchTextbooks = (query: string): TextbookResource[] => {
  const q = query.toLowerCase();
  return textbookResources.filter(t =>
    t.title.toLowerCase().includes(q) ||
    t.description.toLowerCase().includes(q)
  );
};
