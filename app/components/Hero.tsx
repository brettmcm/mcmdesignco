'use client'

import { useRef } from 'react';
import styles from '../styles/Hero.module.scss';
import { LOGOS } from '../constants/logos';
import { useLogoCycling } from '../hooks/useLogoCycling';
import { useScrollEffects } from '../hooks/useScrollEffects';
import { playVideo } from '../utils/video';

interface HeroProps {
  heroVideoRef: React.RefObject<HTMLVideoElement>;
}

export default function Hero({ heroVideoRef }: HeroProps) {
  const heroSvgRef = useRef<SVGSVGElement>(null);
  
  const { currentLogoIndex, startPauseDelay, cancelPauseDelay } = useLogoCycling({
    logos: LOGOS,
  });

  const { logoOpacity, logoScale, svgOpacity } = useScrollEffects();

  const handleTouchStart = (e: React.TouchEvent) => {
    // Start delayed pause on touch
    startPauseDelay();
    
    // Immediately try to play hero video on touch - this unlocks autoplay on mobile
    const video = heroVideoRef.current;
    if (video) {
      // Ensure video is ready
      if (video.readyState >= 2) {
        // Video has enough data, play immediately
        video.play().catch(() => {});
      } else {
        // Wait for video to be ready, then play
        const playWhenReady = () => {
          if (video.readyState >= 2 && video.paused) {
            video.play().catch(() => {});
            video.removeEventListener('canplay', playWhenReady);
          }
        };
        video.addEventListener('canplay', playWhenReady);
        // Also try immediately in case it's already ready
        if (video.readyState >= 1) {
          video.play().catch(() => {});
        }
      }
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    // Also handle click for desktop
    const video = heroVideoRef.current;
    if (video && video.paused) {
      video.play().catch(() => {});
    }
  };

  const handleVideoLoaded = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = e.currentTarget;
    if (video.paused) {
      video.play().catch(() => {});
    }
  };

  return (
    <section 
      className={styles.hero}
      onMouseDown={startPauseDelay}
      onMouseUp={cancelPauseDelay}
      onMouseLeave={cancelPauseDelay}
      onTouchStart={handleTouchStart}
      onTouchEnd={cancelPauseDelay}
      onTouchCancel={cancelPauseDelay}
      onClick={handleClick}
    >
      <video 
        ref={heroVideoRef}
        loop 
        muted 
        autoPlay 
        playsInline 
        controls={false} 
        className={styles.bg}
        preload="auto"
        onLoadedData={handleVideoLoaded}
        onCanPlay={handleVideoLoaded}
        onLoadedMetadata={handleVideoLoaded}
      >         
        <source src="/sky.mp4" type="video/mp4"/>       
      </video>

      {LOGOS.map((src, index) => (
        <img 
          key={src}
          src={src}
          alt=""
          style={{ 
            opacity: index === currentLogoIndex ? logoOpacity : 0,
            transform: `scale(${logoScale})`,
            transformOrigin: 'center center',
            willChange: 'transform, opacity',
            pointerEvents: index === currentLogoIndex ? 'auto' : 'none'
          }}
          loading="eager"
        />
      ))}

      <svg 
        ref={heroSvgRef}
        width="24" 
        height="24" 
        fill="none" 
        viewBox="0 0 24 24"
        style={{ 
          opacity: svgOpacity,
          willChange: 'opacity',
          transition: 'opacity 0.1s ease-out'
        }}
      >
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.25 13.75L12 19.25L6.75 13.75"></path>
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 18.25V4.75"></path>
      </svg>
    </section>
  );
}

