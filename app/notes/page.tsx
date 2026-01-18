import { fetchRSSFeed, formatDate } from '../utils/rss';
import Link from 'next/link';
import styles from './Notes.module.scss';

export const revalidate = 3600; // Revalidate every hour

export default async function NotesPage() {
  const posts = await fetchRSSFeed();

  return (
    <main className={styles.notesPage}>
      <div className={styles.container}>
        <h1>Notes</h1>
        <p className={styles.subtitle}>Meditations on a world seen through the eyes of design.</p>
        
        {posts.length === 0 ? (
          <p className={styles.empty}>No posts available at the moment.</p>
        ) : (
          <ul className={styles.postList}>
            {posts.map((post) => (
              <li key={post.slug} className={styles.postItem}>
                <Link href={`/notes/${post.slug}`} className={styles.postLink}>
                  <article>
                    {post.imageUrl && (
                      <div className={styles.imageContainer}>
                        <img 
                          src={post.imageUrl} 
                          alt={post.title}
                          className={styles.postImage}
                        />
                      </div>
                    )}
                    <div className={styles.postPreview}>
                      <h2 className={styles.postTitle}>{post.title}</h2>
                      {post.description && (
                        <p className={styles.postDescription}>{post.description}</p>
                      )}
                      <time className={styles.postDate} dateTime={post.pubDate}>
                        {formatDate(post.pubDate)}
                      </time>
                    </div>
                  </article>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}

