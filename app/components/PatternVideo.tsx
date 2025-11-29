'use client'

import { useRef } from 'react';
import styles from '../styles/PatternVideo.module.scss';

interface PatternVideoProps {
  patternVideoRef: React.RefObject<HTMLVideoElement>;
  videoSrc?: string;
  className?: string;
}

export default function PatternVideo({ 
  patternVideoRef,
  videoSrc = '/pattern.mp4',
  className
}: PatternVideoProps) {
  const handleVideoLoaded = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = e.currentTarget;
    if (video.paused) {
      video.play().catch(() => {});
    }
  };

  return (
    <section className={styles.disrupt}>
      <video 
        ref={patternVideoRef}
        loop 
        muted 
        autoPlay 
        playsInline 
        controls={false} 
        className={className}
        preload="auto"
        onLoadedData={handleVideoLoaded}
      >         
        <source src={videoSrc} type="video/mp4"/>       
      </video>
    </section>
  );
}

