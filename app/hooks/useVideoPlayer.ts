import { useRef, useEffect, useState } from 'react';
import { playVideo, setupVideoElement } from '../utils/video';

interface UseVideoPlayerOptions {
  videoRefs: React.RefObject<HTMLVideoElement>[];
  enabled?: boolean;
}

/**
 * Custom hook to manage video playback for multiple video elements
 * Handles autoplay, intersection observer, and user interaction
 */
export function useVideoPlayer({ videoRefs, enabled = true }: UseVideoPlayerOptions) {
  const [userInteracted, setUserInteracted] = useState(false);
  
  // Store video refs in a ref to avoid dependency issues
  const videoRefsRef = useRef(videoRefs);
  videoRefsRef.current = videoRefs;

  useEffect(() => {
    if (!enabled) return;

    const playAllVideos = async () => {
      videoRefsRef.current.forEach((ref) => {
        if (ref.current) {
          playVideo(ref.current);
        }
      });
    };

    // Set up video load handlers
    const setupVideos = () => {
      videoRefsRef.current.forEach((ref) => {
        if (ref.current) {
          const video = ref.current;
          setupVideoElement(video);
          
          // Try to play when video can play
          const handleCanPlay = async () => {
            if (!video.paused) return; // Already playing
            try {
              await video.play();
            } catch (error) {
              // Will retry on user interaction
            }
          };
          
          // Try to play when enough data is loaded
          const handleLoadedData = async () => {
            if (!video.paused) return;
            try {
              await video.play();
            } catch (error) {
              // Will retry on user interaction
            }
          };

          video.addEventListener('canplay', handleCanPlay);
          video.addEventListener('loadeddata', handleLoadedData);
          
          // If video is already loaded, try playing immediately
          if (video.readyState >= 2) {
            playVideo(video);
          }
        }
      });
    };

    // Initial setup - try immediately and with delays
    const tryPlayHeroVideo = () => {
      if (videoRefsRef.current[0]?.current && videoRefsRef.current[0].current.paused) {
        playVideo(videoRefsRef.current[0].current);
      }
    };
    
    // Try immediately
    tryPlayHeroVideo();
    
    const timer = setTimeout(() => {
      setupVideos();
      playAllVideos();
      
      // Specifically handle hero video - it's always visible on load
      if (videoRefsRef.current[0]?.current) {
        const heroVideo = videoRefsRef.current[0].current;
        // Force play the hero video multiple times to ensure it starts
        const tryPlayHero = async () => {
          if (heroVideo.paused) {
            try {
              await heroVideo.play();
            } catch (error) {
              // Retry after a short delay
              setTimeout(tryPlayHero, 200);
            }
          }
        };
        tryPlayHero();
        // Also try after video loads
        heroVideo.addEventListener('canplay', tryPlayHero, { once: true });
        heroVideo.addEventListener('loadeddata', tryPlayHero, { once: true });
      }
    }, 100);
    
    // Try again after a longer delay
    const timer2 = setTimeout(() => {
      tryPlayHeroVideo();
    }, 500);

    // Intersection Observer to play videos when they enter viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target instanceof HTMLVideoElement) {
            const video = entry.target;
            if (video.paused) {
              playVideo(video);
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    // Observe all video elements
    const observeTimer = setTimeout(() => {
      videoRefsRef.current.forEach((ref) => {
        if (ref.current) {
          observer.observe(ref.current);
        }
      });
      
      // Specifically check hero video immediately since it's always visible
      if (videoRefsRef.current[0]?.current) {
        // Use a small delay to ensure observer has processed
        setTimeout(() => {
          // Check if hero video is intersecting (it should be)
          const rect = videoRefsRef.current[0].current?.getBoundingClientRect();
          if (rect && rect.top < window.innerHeight && rect.bottom > 0) {
            // Hero video is in viewport, try playing it
            if (videoRefsRef.current[0].current && videoRefsRef.current[0].current.paused) {
              playVideo(videoRefsRef.current[0].current);
            }
          }
        }, 50);
      }
    }, 200);

    // Capture user interaction to unlock autoplay (mobile browsers require this)
    const handleUserInteraction = async (e?: Event) => {
      // Prioritize hero video - play it immediately on first interaction
      if (videoRefsRef.current[0]?.current && videoRefsRef.current[0].current.paused) {
        try {
          // Play hero video immediately and synchronously if possible
          const playPromise = videoRefsRef.current[0].current.play();
          if (playPromise !== undefined) {
            playPromise.catch(() => {
              // If it fails, try again
              setTimeout(() => {
                if (videoRefsRef.current[0]?.current && videoRefsRef.current[0].current.paused) {
                  videoRefsRef.current[0].current.play().catch(() => {});
                }
              }, 50);
            });
          }
        } catch (error) {
          // Silently fail
        }
      }
      
      if (!userInteracted) {
        setUserInteracted(true);
      }
      // Always try playing all videos on interaction
      await playAllVideos();
    };

    // Listen for various user interactions - prioritize touch events for mobile
    // Use capture phase for touchstart to catch it early
    document.addEventListener('touchstart', handleUserInteraction, { passive: true, capture: true });
    document.addEventListener('touchend', handleUserInteraction, { passive: true });
    document.addEventListener('click', handleUserInteraction, { passive: true });
    document.addEventListener('scroll', handleUserInteraction, { passive: true });
    document.addEventListener('pointerdown', handleUserInteraction, { passive: true });

    // Also try playing when page becomes visible (handles tab switching)
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        playAllVideos();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearTimeout(timer);
      clearTimeout(timer2);
      clearTimeout(observeTimer);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      document.removeEventListener('touchstart', handleUserInteraction, { capture: true } as any);
      document.removeEventListener('touchend', handleUserInteraction);
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('scroll', handleUserInteraction);
      document.removeEventListener('pointerdown', handleUserInteraction);
      observer.disconnect();
      // Clean up video event listeners
      videoRefsRef.current.forEach((ref) => {
        if (ref.current) {
          const video = ref.current;
          video.removeEventListener('canplay', () => {});
          video.removeEventListener('loadeddata', () => {});
        }
      });
    };
  }, [userInteracted, enabled]);

  return { userInteracted };
}

