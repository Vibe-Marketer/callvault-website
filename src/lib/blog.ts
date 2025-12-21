import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'src/content/blog');

export interface SchemaConfig {
  type: 'Article' | 'HowTo' | 'FAQPage';
  estimatedCost?: {
    currency: string;
    value: string;
  };
  totalTime?: string; // ISO 8601 duration format (e.g., "PT10M")
  products?: {
    name: string;
    description?: string;
    price?: string;
    url?: string;
    rating?: string;
  }[];
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  pubDate: string;
  lastUpdated?: string;
  author: string;
  authorUrl?: string;
  authorImage?: string;
  authorBio?: string;
  category: string;
  tags: string[];
  heroImage?: string;
  heroImageAlt?: string;
  readingTime?: string;
  content: string;
  // AEO fields
  quickAnswer?: string;
  keyTakeaways?: string[];
  schema?: SchemaConfig;
  faqSchema?: { question: string; answer: string }[];
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.mdx') || fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.(mdx|md)$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      // Handle author as string or object
      const authorName = typeof data.author === 'object' ? data.author?.name : data.author;
      const authorUrl = typeof data.author === 'object' ? data.author?.url : data.authorUrl;

      return {
        slug,
        title: data.title || '',
        description: data.description || '',
        pubDate: data.pubDate ? new Date(data.pubDate).toISOString() : '',
        lastUpdated: data.lastUpdated ? new Date(data.lastUpdated).toISOString() : undefined,
        author: authorName || 'Andrew Naegele',
        authorUrl: authorUrl || '/about',
        authorImage: data.authorImage || 'https://assets.callvaultai.com/andrew-naegele-headshot.png',
        authorBio: data.authorBio,
        category: data.category || 'guides',
        tags: data.tags || [],
        heroImage: data.heroImage,
        heroImageAlt: data.heroImageAlt,
        readingTime: data.readingTime,
        content,
        // AEO fields
        quickAnswer: data.quickAnswer,
        keyTakeaways: data.keyTakeaways,
        schema: data.schema,
        faqSchema: data.faqSchema,
      };
    });

  return allPostsData.sort((a, b) => (a.pubDate < b.pubDate ? 1 : -1));
}

export function getPostBySlug(slug: string): BlogPost | null {
  const posts = getAllPosts();
  return posts.find((post) => post.slug === slug) || null;
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter((fileName) => fileName.endsWith('.mdx') || fileName.endsWith('.md'))
    .map((fileName) => fileName.replace(/\.(mdx|md)$/, ''));
}

export function getRelatedPosts(currentSlug: string, category: string, tags: string[], limit: number = 3): BlogPost[] {
  const allPosts = getAllPosts();

  // Score posts by relevance
  const scoredPosts = allPosts
    .filter(post => post.slug !== currentSlug)
    .map(post => {
      let score = 0;

      // Same category = high relevance
      if (post.category === category) score += 10;

      // Matching tags
      const matchingTags = post.tags.filter(tag => tags.includes(tag));
      score += matchingTags.length * 5;

      // Recent posts get slight boost
      const daysSincePublished = (Date.now() - new Date(post.pubDate).getTime()) / (1000 * 60 * 60 * 24);
      if (daysSincePublished < 30) score += 2;

      return { post, score };
    })
    .sort((a, b) => b.score - a.score);

  return scoredPosts.slice(0, limit).map(item => item.post);
}

// Helper function to generate HowTo schema from content
export function extractHowToSteps(content: string): { name: string; text: string }[] {
  const steps: { name: string; text: string }[] = [];
  const stepRegex = /## Step (\d+):\s*(.+?)(?=\n)/g;
  let match;

  while ((match = stepRegex.exec(content)) !== null) {
    const stepNumber = match[1];
    const stepTitle = match[2].trim();

    // Find content until next step or section
    const startIndex = match.index + match[0].length;
    const nextStepMatch = content.slice(startIndex).search(/## Step \d+:|## [^S]/);
    const endIndex = nextStepMatch === -1 ? content.length : startIndex + nextStepMatch;

    const stepContent = content.slice(startIndex, endIndex).trim();
    // Get first paragraph as the step text
    const firstParagraph = stepContent.split('\n\n')[0].replace(/\*\*/g, '').trim();

    steps.push({
      name: `Step ${stepNumber}: ${stepTitle}`,
      text: firstParagraph.substring(0, 300), // Limit to 300 chars for schema
    });
  }

  return steps;
}
