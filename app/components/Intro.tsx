'use client'

import { useRef } from 'react';
import styles from '../styles/Intro.module.scss';

interface IntroProps {
  introVideoRef: React.RefObject<HTMLVideoElement>;
  imageSrc?: string;
}

export default function Intro({ 
  introVideoRef,
  imageSrc = 'portrait.jpg'
}: IntroProps) {
  const handleVideoLoaded = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = e.currentTarget;
    if (video.paused) {
      video.play().catch(() => {});
    }
  };

  return (
    <section className={styles.split}>
      <img src={imageSrc} alt="" />
      <video 
        ref={introVideoRef}
        loop 
        muted 
        autoPlay 
        playsInline 
        controls={false} 
        className={styles.half}
        preload="auto"
        onLoadedData={handleVideoLoaded}
      >         
        <source src="/mcm-intro.mp4" type="video/mp4"/>       
      </video>
    </section>
  );
}

