/**
 * Motivational quotes for psychology and statistics students
 */

export interface Quote {
  text: string;
  author: string;
}

export const quotes: Quote[] = [
  {
    text: "Statistics is the grammar of science.",
    author: "Karl Pearson"
  },
  {
    text: "Without data, you're just another person with an opinion.",
    author: "W. Edwards Deming"
  },
  {
    text: "The greatest glory in living lies not in never falling, but in rising every time we fall.",
    author: "Nelson Mandela"
  },
  {
    text: "Torture the data, and it will confess to anything.",
    author: "Ronald Coase"
  },
  {
    text: "In God we trust. All others must bring data.",
    author: "W. Edwards Deming"
  },
  {
    text: "The purpose of psychology is to give us a completely different idea of the things we know best.",
    author: "Paul Valéry"
  },
  {
    text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    author: "Winston Churchill"
  },
  {
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs"
  },
  {
    text: "Education is not the filling of a pail, but the lighting of a fire.",
    author: "W.B. Yeats"
  },
  {
    text: "The beautiful thing about learning is that no one can take it away from you.",
    author: "B.B. King"
  },
  {
    text: "It is not that I'm so smart. But I stay with the questions much longer.",
    author: "Albert Einstein"
  },
  {
    text: "The mind is everything. What you think you become.",
    author: "Buddha"
  },
  {
    text: "Data is the new oil.",
    author: "Clive Humby"
  },
  {
    text: "The goal is to turn data into information, and information into insight.",
    author: "Carly Fiorina"
  },
  {
    text: "Understanding statistics means understanding research. Understanding research means understanding psychology.",
    author: "Anonymous"
  },
];

/**
 * Get a random daily quote based on the current date
 * Returns the same quote for the entire day
 */
export function getDailyQuote(): Quote {
  const today = new Date();
  const dayOfYear = Math.floor(
    (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 
    (1000 * 60 * 60 * 24)
  );
  
  // Use day of year to get consistent quote for the day
  const index = dayOfYear % quotes.length;
  return quotes[index];
}

/**
 * Get a random quote
 */
export function getRandomQuote(): Quote {
  const index = Math.floor(Math.random() * quotes.length);
  return quotes[index];
}
