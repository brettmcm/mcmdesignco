import { fetchRSSFeed, formatDate } from '../../utils/rss';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import styles from '../Notes.module.scss';

export const revalidate = 3600; // Revalidate every hour
export const dynamicParams = true; // Allow dynamic params not in generateStaticParams

export async function generateStaticParams() {
  try {
    const posts = await fetchRSSFeed();
    return posts.map((post) => ({
      slug: post.slug,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

export default async function NotePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const posts = await fetchRSSFeed();
  
  // Try exact match first
  let post = posts.find((p) => p.slug === slug);
  
  // Fallback to case-insensitive match
  if (!post) {
    post = posts.find((p) => p.slug.toLowerCase() === slug.toLowerCase());
  }

  if (!post) {
    notFound();
  }

  return (
    <main className={styles.notePage}>
      <div className={styles.container}>
        <Link href="/notes" className={styles.backLink}>← Back to Notes</Link>
        
        <article className={styles.postArticle}>
          <header className={styles.postHeader}>
            <h2 className={styles.postTitle}>{post.title}</h2>
            <time className={styles.postDate} dateTime={post.pubDate}>
              {formatDate(post.pubDate)}
            </time>
          </header>

          {/* {post.imageUrl && (
            <div className={styles.imageContainer}>
              <img 
                src={post.imageUrl} 
                alt={post.title}
                className={styles.postImage}
              />
            </div>
          )} */}

          <div 
            className={`${styles.postContent} notesContent`}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </div>
    </main>
  );
}

