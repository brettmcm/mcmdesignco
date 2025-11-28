import { useState, useEffect, useRef } from 'react';

interface UseLogoCyclingOptions {
  logos: readonly string[];
  cycleInterval?: number;
  pauseDelay?: number;
}

/**
 * Custom hook to cycle through logos with pause functionality
 */
export function useLogoCycling({ 
  logos, 
  cycleInterval = 100,
  pauseDelay = 150 
}: UseLogoCyclingOptions) {
  const [currentLogoIndex, setCurrentLogoIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [carouselPaused, setCarouselPaused] = useState(false);
  const pauseTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Preload all logo images
  useEffect(() => {
    let loadedCount = 0;
    const totalImages = logos.length;
    
    const preloadImages = () => {
      logos.forEach((src) => {
        const img = new Image();
        img.onload = () => {
          loadedCount++;
          if (loadedCount === totalImages) {
            setImagesLoaded(true);
          }
        };
        img.onerror = () => {
          loadedCount++;
          if (loadedCount === totalImages) {
            setImagesLoaded(true);
          }
        };
        img.src = src;
      });
    };

    preloadImages();
  }, [logos]);

  // Cycle through logos every cycleInterval ms
  useEffect(() => {
    if (!imagesLoaded || carouselPaused) return;
    
    const interval = setInterval(() => {
      setCurrentLogoIndex((prevIndex) => (prevIndex + 1) % logos.length);
    }, cycleInterval);

    return () => clearInterval(interval);
  }, [logos.length, imagesLoaded, carouselPaused, cycleInterval]);

  // Cleanup pause timeout on unmount
  useEffect(() => {
    return () => {
      if (pauseTimeoutRef.current) {
        clearTimeout(pauseTimeoutRef.current);
      }
    };
  }, []);

  // Helper functions for delayed pause
  const startPauseDelay = () => {
    // Clear any existing timeout
    if (pauseTimeoutRef.current) {
      clearTimeout(pauseTimeoutRef.current);
    }
    // Set a new timeout to pause after pauseDelay ms
    pauseTimeoutRef.current = setTimeout(() => {
      setCarouselPaused(true);
      pauseTimeoutRef.current = null;
    }, pauseDelay);
  };

  const cancelPauseDelay = () => {
    if (pauseTimeoutRef.current) {
      clearTimeout(pauseTimeoutRef.current);
      pauseTimeoutRef.current = null;
    }
    setCarouselPaused(false);
  };

  return {
    currentLogoIndex,
    imagesLoaded,
    startPauseDelay,
    cancelPauseDelay,
  };
}

