export interface RSSPost {
  title: string;
  description: string;
  link: string;
  pubDate: string;
  content: string;
  slug: string;
  imageUrl?: string;
}

export async function fetchRSSFeed(): Promise<RSSPost[]> {
  try {
    const response = await fetch('https://brettmcm.substack.com/feed', {
      next: { revalidate: 3600 } // Revalidate every hour
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch RSS feed');
    }
    
    const xmlText = await response.text();
    const posts = parseRSSFeed(xmlText);
    
    return posts;
  } catch (error) {
    console.error('Error fetching RSS feed:', error);
    return [];
  }
}

function parseRSSFeed(xmlText: string): RSSPost[] {
  const posts: RSSPost[] = [];
  
  // Extract all item elements
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let itemMatch;
  
  while ((itemMatch = itemRegex.exec(xmlText)) !== null) {
    const itemContent = itemMatch[1];
    
    const title = (extractCDATA(itemContent, 'title') || extractTag(itemContent, 'title') || '').trim();
    const description = (extractCDATA(itemContent, 'description') || extractTag(itemContent, 'description') || '').trim();
    let link = (extractTag(itemContent, 'link') || '').trim();
    const pubDate = (extractTag(itemContent, 'pubDate') || '').trim();
    const content = (extractCDATA(itemContent, 'content:encoded') || extractCDATA(itemContent, 'encoded') || '').trim();
    
    // Extract image from enclosure or content
    let imageUrl: string | undefined;
    const enclosureMatch = itemContent.match(/<enclosure[^>]*url="([^"]*)"[^>]*type="image\/([^"]*)"/i);
    if (enclosureMatch) {
      imageUrl = enclosureMatch[1];
    } else {
      // Try to extract from content
      const imgMatch = content.match(/<img[^>]*src="([^"]*)"/i);
      if (imgMatch) {
        imageUrl = imgMatch[1];
      }
    }
    
    // Generate slug from link - extract the part after /p/
    let slug = '';
    if (link) {
      // Try to extract slug from Substack URL pattern: .../p/slug
      const pMatch = link.match(/\/p\/([^\/?#]+)/);
      if (pMatch) {
        slug = pMatch[1];
      } else {
        // Fallback to last segment of URL
        slug = link.split('/').pop() || '';
      }
      // Remove query parameters and hash if any
      slug = slug.split('?')[0].split('#')[0];
    }
    
    // Fallback to title-based slug if needed
    if (!slug && title) {
      slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
    }
    
    if (title && link) {
      posts.push({
        title,
        description,
        link,
        pubDate,
        content,
        slug,
        imageUrl
      });
    }
  }
  
  return posts;
}

function extractCDATA(content: string, tagName: string): string | null {
  const regex = new RegExp(`<${tagName}[^>]*>\\s*<!\\[CDATA\\[([\\s\\S]*?)\\]\\]>\\s*</${tagName}>`, 'i');
  const match = content.match(regex);
  return match ? match[1].trim() : null;
}

function extractTag(content: string, tagName: string): string | null {
  const regex = new RegExp(`<${tagName}[^>]*>([\\s\\S]*?)</${tagName}>`, 'i');
  const match = content.match(regex);
  return match ? match[1].trim() : null;
}

export function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } catch {
    return dateString;
  }
}

