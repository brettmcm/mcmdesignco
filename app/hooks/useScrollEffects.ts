import { useState, useEffect } from 'react';

interface UseScrollEffectsOptions {
  logoFadeStart?: number; // Viewport height multiplier for logo fade start
  svgFadeStart?: number; // Viewport height multiplier for SVG fade start
  logoScaleStart?: number; // Viewport height multiplier for logo scale start
}

/**
 * Custom hook to handle scroll-based opacity and scale effects
 */
export function useScrollEffects({
  logoFadeStart = 1,
  svgFadeStart = 1,
  logoScaleStart = 1,
}: UseScrollEffectsOptions = {}) {
  const [logoOpacity, setLogoOpacity] = useState(1);
  const [logoScale, setLogoScale] = useState(1);
  const [svgOpacity, setSvgOpacity] = useState(1);

  // Fade and scale logo based on scroll position
  useEffect(() => {
    let rafId: number | null = null;
    
    const handleScroll = () => {
      if (rafId) return; // Skip if already scheduled
      
      rafId = requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const viewportHeight = window.innerHeight;
        const logoScrollProgress = Math.min(1, scrollY / (viewportHeight * logoFadeStart));
        const svgScrollProgress = Math.min(1, scrollY / (viewportHeight * svgFadeStart));
        const logoScaleProgress = Math.min(1, scrollY / (viewportHeight * logoScaleStart));
        
        // Calculate opacity: 1.0 at scroll 0, 0.0 at scroll threshold
        const opacity = 1 - logoScrollProgress;
        setLogoOpacity(opacity);
        
        // Calculate scale: 1.0 at scroll 0, 0.9 at scroll threshold
        const scale = Math.max(0, 1 - (logoScaleProgress * 0.1));
        setLogoScale(scale);
        
        // Calculate SVG opacity: 1.0 at scroll 0, 0.0 at scroll threshold
        const svgOpacityValue = 1 - svgScrollProgress;
        setSvgOpacity(svgOpacityValue);
        
        rafId = null;
      });
    };

    // Set initial values
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [logoFadeStart, svgFadeStart, logoScaleStart]);

  return {
    logoOpacity,
    logoScale,
    svgOpacity,
  };
}

