/**
 * Plays a video element with proper error handling and mobile support
 */
export async function playVideo(video: HTMLVideoElement): Promise<void> {
  if (!video) return;
  
  // Ensure video is muted and has playsInline (required for mobile)
  video.muted = true;
  video.setAttribute('playsinline', 'true');
  video.setAttribute('webkit-playsinline', 'true');
  
  // Wait for video to be ready
  if (video.readyState >= 2) {
    try {
      await video.play();
    } catch (error) {
      // Silently fail - will retry on user interaction
    }
  } else {
    // Wait for video to load
    const handleCanPlay = async () => {
      try {
        await video.play();
      } catch (error) {
        // Silently fail
      }
      video.removeEventListener('canplay', handleCanPlay);
    };
    video.addEventListener('canplay', handleCanPlay);
  }
}

/**
 * Sets up a video element with proper attributes for autoplay
 */
export function setupVideoElement(video: HTMLVideoElement): void {
  video.muted = true;
  video.setAttribute('playsinline', 'true');
  video.setAttribute('webkit-playsinline', 'true');
}

