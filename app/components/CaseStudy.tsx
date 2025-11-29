'use client'

import { useRef } from 'react';
import styles from '../styles/CaseStudy.module.scss';

export interface GalleryItem {
  type: 'image' | 'video';
  src: string;
  className?: string;
  videoType?: string;
}

interface CaseStudyProps {
  title: string;
  description: string | React.ReactNode;
  scope: (string | React.ReactNode)[];
  galleryItems: GalleryItem[];
}

export default function CaseStudy({ title, description, scope, galleryItems }: CaseStudyProps) {
  // Create refs for videos - we'll create one per video item
  const videoRefs = useRef<Map<number, HTMLVideoElement>>(new Map());

  const setVideoRef = (index: number) => (el: HTMLVideoElement | null) => {
    if (el) {
      videoRefs.current.set(index, el);
    } else {
      videoRefs.current.delete(index);
    }
  };

  return (
    <div className={styles.case}>
      <aside>
        <h4>{title}</h4>
        <p>{description}</p>
        <ul aria-label="Scope of work">
          {scope.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </aside>
      <div className={styles.gallery}>
        {galleryItems.map((item, index) => {
          const itemClassName = item.className === 'half' ? styles.half : item.className;
          if (item.type === 'video') {
            return (
              <video
                key={index}
                ref={setVideoRef(index)}
                loop
                muted
                autoPlay
                playsInline
                controls={false}
                className={itemClassName}
                preload="auto"
                onLoadedData={(e) => {
                  const video = e.currentTarget;
                  if (video.paused) {
                    video.play().catch(() => {});
                  }
                }}
              >
                <source src={item.src} type={item.videoType || 'video/mp4'} />
              </video>
            );
          } else {
            return (
              <img
                key={index}
                src={item.src}
                className={itemClassName}
                alt=""
              />
            );
          }
        })}
      </div>
    </div>
  );
}

