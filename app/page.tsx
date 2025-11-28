'use client'

import { useRef } from "react";
import Hero from './components/Hero';
import Services from './components/Services';
import Intro from './components/Intro';
import PatternVideo from './components/PatternVideo';
import Featured from './components/Featured';
import Teams from './components/Teams';
import { useVideoPlayer } from './hooks/useVideoPlayer';
import { TEAMS_DATA } from './data/teams';

export default function Home() {
  // Refs for all video elements
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const introVideoRef = useRef<HTMLVideoElement>(null);
  const patternVideoRef = useRef<HTMLVideoElement>(null);

  // Set up video player hook to manage all videos
  useVideoPlayer({
    videoRefs: [heroVideoRef, introVideoRef, patternVideoRef],
  });

  return (
    <main>
      <Hero heroVideoRef={heroVideoRef} />
      <Services />
      <Intro introVideoRef={introVideoRef} />
      <Featured />
      <Teams teams={TEAMS_DATA} />
      <PatternVideo patternVideoRef={patternVideoRef} />
    </main>
  );
}
