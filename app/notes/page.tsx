import { fetchRSSFeed, formatDate } from '../utils/rss';
import Link from 'next/link';
import styles from './Notes.module.scss';

export const revalidate = 3600; // Revalidate every hour

export default async function NotesPage() {
  const posts = await fetchRSSFeed();

  return (
    <main className={styles.notesPage}>
      <div className={styles.container}>

        {posts.length === 0 ? (
          <p className={styles.empty}>No posts available at the moment.</p>
        ) : (
          posts.map((post) => (
            <div key={post.slug} className={styles.postItem}>
              <Link href={`/notes/${post.slug}`} className={styles.postLink}>
                <article>
                  {/* {post.imageUrl && (
                      <div className={styles.imageContainer}>
                        <img 
                          src={post.imageUrl} 
                          alt={post.title}
                          className={styles.postImage}
                        />
                      </div>
                    )} */}
                    <div className={styles.postPreview}>
                      <div className={styles.postHeader}>
                      <time className={styles.postDate} dateTime={post.pubDate}>
                        {formatDate(post.pubDate)}
                      </time>
                      <h2 className={styles.postTitle}>{post.title}</h2> 
                      </div>
                      {post.description && (
                        <p 
                          className={styles.postDescription}
                          dangerouslySetInnerHTML={{ __html: post.description }}
                        />
                      )}
                    </div>
                  </article>
                </Link>
              </div>
            ))  
          )}
      </div>
    </main>
  );
}

