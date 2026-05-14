// Video and Textbook Resources Data

export interface VideoResource {
  id: string;
  title: string;
  duration: string;
  difficulty: 1 | 2 | 3;
  category: 'All' | 'Descriptive' | 'Inferential' | 'Correlation' | 'Effect Sizes';
  relatedFormula: string;
  description: string;
  creator: string;
  platform: 'YouTube' | 'Khan Academy' | 'Coursera' | 'StatQuest';
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
  relatedFormulas: string[];
  relevance: 'high' | 'medium';
  coverUrl: string;
  purchaseUrl: string;
  chapters?: string[];
  rating: number;
  category: 'All' | 'Descriptive' | 'Inferential' | 'Correlation' | 'Effect Sizes';
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
    title: 'Understanding Mean, Median & Mode',
    duration: '12:45',
    difficulty: 1,
    category: 'Descriptive',
    relatedFormula: 'Mean',
    description: 'A complete beginner guide to understanding central tendency measures in psychology research.',
    creator: 'StatQuest with Josh Starmer',
    platform: 'YouTube',
    thumbnailUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=225&fit=crop',
    videoUrl: 'https://www.youtube.com/watch?v=example1'
  },
  {
    id: 'v2',
    title: 'Standard Deviation Explained',
    duration: '18:32',
    difficulty: 2,
    category: 'Descriptive',
    relatedFormula: 'Standard Deviation',
    description: 'Learn how to calculate and interpret standard deviation for psychological data.',
    creator: 'Organic Chemistry Tutor',
    platform: 'YouTube',
    thumbnailUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=225&fit=crop',
    videoUrl: 'https://www.youtube.com/watch?v=example2'
  },
  {
    id: 'v3',
    title: 'Z-Scores and Normal Distribution',
    duration: '24:15',
    difficulty: 2,
    category: 'Descriptive',
    relatedFormula: 'Z-Score',
    description: 'Master z-scores and understand how they relate to the normal distribution.',
    creator: 'Khan Academy',
    platform: 'Khan Academy',
    thumbnailUrl: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400&h=225&fit=crop',
    videoUrl: 'https://www.khanacademy.org/math/statistics-probability'
  },
  {
    id: 'v4',
    title: 'Correlation Coefficient (Pearson r)',
    duration: '21:40',
    difficulty: 2,
    category: 'Correlation',
    relatedFormula: "Pearson's r",
    description: 'Deep dive into correlation analysis and interpreting relationships between variables.',
    creator: 'StatQuest with Josh Starmer',
    platform: 'StatQuest',
    thumbnailUrl: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=400&h=225&fit=crop',
    videoUrl: 'https://www.youtube.com/watch?v=example4'
  },
  {
    id: 'v5',
    title: 'Independent Samples T-Test',
    duration: '28:15',
    difficulty: 2,
    category: 'Inferential',
    relatedFormula: 'T-Test',
    description: 'Learn when and how to use the independent samples t-test in psychological research.',
    creator: 'Dr. Todd Grande',
    platform: 'YouTube',
    thumbnailUrl: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=225&fit=crop',
    videoUrl: 'https://www.youtube.com/watch?v=example5'
  },
  {
    id: 'v6',
    title: 'One-Way ANOVA Step by Step',
    duration: '35:22',
    difficulty: 3,
    category: 'Inferential',
    relatedFormula: 'ANOVA',
    description: 'Complete tutorial on performing and interpreting one-way ANOVA for group comparisons.',
    creator: 'Statistics Solutions',
    platform: 'YouTube',
    thumbnailUrl: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=400&h=225&fit=crop',
    videoUrl: 'https://www.youtube.com/watch?v=example6'
  },
  {
    id: 'v7',
    title: "Cohen's d Effect Size",
    duration: '15:45',
    difficulty: 2,
    category: 'Effect Sizes',
    relatedFormula: "Cohen's d",
    description: 'Understanding effect sizes and why they matter beyond p-values.',
    creator: 'Research By Design',
    platform: 'YouTube',
    thumbnailUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=225&fit=crop',
    videoUrl: 'https://www.youtube.com/watch?v=example7'
  },
  {
    id: 'v8',
    title: 'Chi-Square Test Explained',
    duration: '19:30',
    difficulty: 2,
    category: 'Inferential',
    relatedFormula: 'Chi-Square',
    description: 'How to use chi-square tests for categorical data analysis in psychology.',
    creator: 'Organic Chemistry Tutor',
    platform: 'YouTube',
    thumbnailUrl: 'https://images.unsplash.com/photo-1527474305487-b87b222841cc?w=400&h=225&fit=crop',
    videoUrl: 'https://www.youtube.com/watch?v=example8'
  },
  {
    id: 'v9',
    title: 'Regression Analysis Basics',
    duration: '32:10',
    difficulty: 3,
    category: 'Correlation',
    relatedFormula: 'Regression',
    description: 'Introduction to linear regression and prediction in psychological research.',
    creator: 'Khan Academy',
    platform: 'Khan Academy',
    thumbnailUrl: 'https://images.unsplash.com/photo-1590650153855-d9e808231d41?w=400&h=225&fit=crop',
    videoUrl: 'https://www.khanacademy.org/math/statistics-probability'
  },
  {
    id: 'v10',
    title: 'Eta Squared and Omega Squared',
    duration: '22:18',
    difficulty: 3,
    category: 'Effect Sizes',
    relatedFormula: 'Eta Squared',
    description: 'Effect size measures for ANOVA: when to use eta squared vs omega squared.',
    creator: 'Research By Design',
    platform: 'YouTube',
    thumbnailUrl: 'https://images.unsplash.com/photo-1542744094-24638eff58bb?w=400&h=225&fit=crop',
    videoUrl: 'https://www.youtube.com/watch?v=example10'
  },
  {
    id: 'v11',
    title: 'Spearman Rank Correlation',
    duration: '16:55',
    difficulty: 2,
    category: 'Correlation',
    relatedFormula: 'Spearman rho',
    description: 'When to use Spearman instead of Pearson correlation for ordinal data.',
    creator: 'StatQuest with Josh Starmer',
    platform: 'StatQuest',
    thumbnailUrl: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&h=225&fit=crop',
    videoUrl: 'https://www.youtube.com/watch?v=example11'
  },
  {
    id: 'v12',
    title: 'Variance and Population vs Sample',
    duration: '14:20',
    difficulty: 1,
    category: 'Descriptive',
    relatedFormula: 'Variance',
    description: 'Understanding variance and the difference between population and sample statistics.',
    creator: 'Khan Academy',
    platform: 'Khan Academy',
    thumbnailUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=225&fit=crop',
    videoUrl: 'https://www.khanacademy.org/math/statistics-probability'
  }
];

export const textbookResources: TextbookResource[] = [
  {
    id: 't1',
    title: 'Statistics for Psychology',
    author: 'Aron, Coups & Aron',
    publisher: 'Pearson',
    year: 2021,
    isbn: '978-0135192221',
    description: 'The gold standard textbook for psychology students. Covers all essential statistical methods with real psychology examples and step-by-step calculations.',
    relatedFormulas: ['Mean', 'Standard Deviation', 'T-Test', 'ANOVA', 'Correlation'],
    relevance: 'high',
    coverUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=200&h=300&fit=crop',
    purchaseUrl: 'https://www.pearson.com/store/p/statistics-for-psychology/P100002665761',
    chapters: ['Chapter 1: Introduction', 'Chapter 4: Z-Scores', 'Chapter 8: T-Tests', 'Chapter 10: ANOVA'],
    rating: 4.8,
    category: 'All'
  },
  {
    id: 't2',
    title: 'Discovering Statistics Using IBM SPSS Statistics',
    author: 'Andy Field',
    publisher: 'SAGE Publications',
    year: 2024,
    isbn: '978-1526419521',
    description: 'A comprehensive and entertaining guide to statistics with SPSS. Features humor, real examples, and detailed explanations of complex concepts.',
    relatedFormulas: ['T-Test', 'ANOVA', 'Regression', 'Factor Analysis', 'Chi-Square'],
    relevance: 'high',
    coverUrl: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=200&h=300&fit=crop',
    purchaseUrl: 'https://www.discoveringstatistics.com/',
    chapters: ['Chapter 2: The Spine of Statistics', 'Chapter 7: Regression', 'Chapter 12: ANOVA'],
    rating: 4.9,
    category: 'Inferential'
  },
  {
    id: 't3',
    title: 'OpenStax Introductory Statistics',
    author: 'OpenStax',
    publisher: 'OpenStax (Free)',
    year: 2023,
    description: 'A free, peer-reviewed textbook covering essential statistics concepts. Perfect for students on a budget.',
    relatedFormulas: ['Mean', 'Median', 'Standard Deviation', 'Z-Score', 'Probability'],
    relevance: 'high',
    coverUrl: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=200&h=300&fit=crop',
    purchaseUrl: 'https://openstax.org/details/books/introductory-statistics',
    rating: 4.6,
    category: 'Descriptive'
  },
  {
    id: 't4',
    title: 'Statistical Methods for Psychology',
    author: 'David C. Howell',
    publisher: 'Cengage Learning',
    year: 2022,
    isbn: '978-1337597722',
    description: 'Advanced coverage of statistical methods with emphasis on conceptual understanding. Ideal for graduate students.',
    relatedFormulas: ['ANOVA', 'MANOVA', 'Regression', 'Effect Sizes', 'Power Analysis'],
    relevance: 'high',
    coverUrl: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=200&h=300&fit=crop',
    purchaseUrl: 'https://www.cengage.com/',
    chapters: ['Chapter 6: Correlation', 'Chapter 11: Simple ANOVA', 'Chapter 14: Repeated Measures'],
    rating: 4.7,
    category: 'Inferential'
  },
  {
    id: 't5',
    title: 'Effect Size for the Behavioral Sciences',
    author: 'Robert J. Grissom & John J. Kim',
    publisher: 'Routledge',
    year: 2019,
    isbn: '978-0415877695',
    description: 'Comprehensive guide to effect sizes in psychology research. Essential for understanding research impact beyond significance.',
    relatedFormulas: ["Cohen's d", 'Eta Squared', "Omega Squared", "Hedges' g"],
    relevance: 'high',
    coverUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=200&h=300&fit=crop',
    purchaseUrl: 'https://www.routledge.com/',
    rating: 4.5,
    category: 'Effect Sizes'
  },
  {
    id: 't6',
    title: 'Applied Correlation and Regression Analysis',
    author: 'Michael J. Denis',
    publisher: 'Springer',
    year: 2021,
    isbn: '978-3030471842',
    description: 'In-depth treatment of correlation and regression techniques for psychological research applications.',
    relatedFormulas: ["Pearson's r", "Spearman's rho", 'Regression', 'Multiple Regression'],
    relevance: 'medium',
    coverUrl: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=200&h=300&fit=crop',
    purchaseUrl: 'https://www.springer.com/',
    rating: 4.4,
    category: 'Correlation'
  },
  {
    id: 't7',
    title: 'Understanding Psychology Research',
    author: 'Julia J. McQuillan',
    publisher: 'Wiley',
    year: 2020,
    description: 'Bridges research methods and statistics with practical psychology examples. Great for understanding why we use certain tests.',
    relatedFormulas: ['T-Test', 'Chi-Square', 'ANOVA', 'Regression'],
    relevance: 'medium',
    coverUrl: 'https://images.unsplash.com/photo-1589998059171-988d887df646?w=200&h=300&fit=crop',
    purchaseUrl: 'https://www.wiley.com/',
    rating: 4.3,
    category: 'Inferential'
  },
  {
    id: 't8',
    title: 'Descriptive Statistics for Social Sciences',
    author: 'R. Mark Sirkin',
    publisher: 'SAGE Publications',
    year: 2021,
    isbn: '978-1506337579',
    description: 'Focused coverage of descriptive statistics with social science applications. Clear explanations with minimal math anxiety.',
    relatedFormulas: ['Mean', 'Median', 'Mode', 'Standard Deviation', 'Variance'],
    relevance: 'high',
    coverUrl: 'https://images.unsplash.com/photo-1476275466078-4007374efbbe?w=200&h=300&fit=crop',
    purchaseUrl: 'https://us.sagepub.com/',
    rating: 4.5,
    category: 'Descriptive'
  }
];

export const curatedCollections: CuratedCollection[] = [
  {
    id: 'c1',
    title: "Beginner's Guide to Descriptive Statistics",
    description: 'Start your statistics journey with these essential resources',
    videoCount: 3,
    textbookCount: 2,
    icon: '📊',
    gradient: 'gradient-orange'
  },
  {
    id: 'c2',
    title: 'Master Inferential Statistics',
    description: 'Level up with hypothesis testing and group comparisons',
    videoCount: 5,
    textbookCount: 3,
    icon: '🎯',
    gradient: 'gradient-purple'
  },
  {
    id: 'c3',
    title: 'Understanding Correlation & Regression',
    description: 'Explore relationships between variables in psychology',
    videoCount: 4,
    textbookCount: 2,
    icon: '📈',
    gradient: 'gradient-teal'
  }
];

// Helper functions
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
    v.description.toLowerCase().includes(q) ||
    v.relatedFormula.toLowerCase().includes(q) ||
    v.creator.toLowerCase().includes(q)
  );
};

export const searchTextbooks = (query: string): TextbookResource[] => {
  const q = query.toLowerCase();
  return textbookResources.filter(t =>
    t.title.toLowerCase().includes(q) ||
    t.description.toLowerCase().includes(q) ||
    t.author.toLowerCase().includes(q) ||
    t.relatedFormulas.some(f => f.toLowerCase().includes(q))
  );
};
