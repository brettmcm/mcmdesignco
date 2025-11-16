'use client'

import { useRef, useState, useEffect } from "react";
import styles from './styles/layout.module.scss'



  

export default function Home(props: any) {

  // Refs for all video elements
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const introVideoRef = useRef<HTMLVideoElement>(null);
  const patternVideoRef = useRef<HTMLVideoElement>(null);
  const brushVideoRef = useRef<HTMLVideoElement>(null);
  const sudsVideoRef = useRef<HTMLVideoElement>(null);
  const vibeVideoRef = useRef<HTMLVideoElement>(null);

  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = 3; // Adjust this based on the number of pages in your carousel

  // Track if user has interacted (required for mobile autoplay)
  const [userInteracted, setUserInteracted] = useState(false);

  // Logo cycling state
  const [currentLogoIndex, setCurrentLogoIndex] = useState(0);
  const [logoOpacity, setLogoOpacity] = useState(1);
  const [logoScale, setLogoScale] = useState(1);
  const logos = [
    "/logos/apeak-dark.svg",
    "/logos/hmtbc-dark.svg",
    "/logos/island-dwell-dark.svg",
    "/logos/island-dwell-icon-dark.svg",
    "/logos/marends-dark.svg",
    "/logos/mcm-dark.svg",
    "/logos/millercove-dark.svg",
    "/logos/mosaic-dark.svg",
    "/logos/neon-moon-dark.svg",
    "/logos/neon-moon-icon-dark.svg",
    "/logos/rally-dark.svg",
    "/logos/swamptone-dark.svg",
    "/logos/the-beer-house-dark.svg",
    "/logos/yoga-for-alex-dark.svg",
    "/logos/stir-dark.svg",
    "/logos/canary-dark.svg",
    "/logos/bloop-dark.svg",
  ];

  // Function to play video with error handling
  const playVideo = async (video: HTMLVideoElement) => {
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
  };

  // Play all videos on mount and when they become visible
  useEffect(() => {
    const videoRefs = [
      heroVideoRef,
      introVideoRef,
      patternVideoRef,
      brushVideoRef,
      sudsVideoRef,
      vibeVideoRef,
    ];

    const playAllVideos = async () => {
      videoRefs.forEach((ref) => {
        if (ref.current) {
          playVideo(ref.current);
        }
      });
    };

    // Set up video load handlers
    const setupVideos = () => {
      videoRefs.forEach((ref) => {
        if (ref.current) {
          const video = ref.current;
          video.muted = true;
          video.setAttribute('playsinline', 'true');
          video.setAttribute('webkit-playsinline', 'true');
          
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
      if (heroVideoRef.current && heroVideoRef.current.paused) {
        playVideo(heroVideoRef.current);
      }
    };
    
    // Try immediately
    tryPlayHeroVideo();
    
    const timer = setTimeout(() => {
      setupVideos();
      playAllVideos();
      
      // Specifically handle hero video - it's always visible on load
      if (heroVideoRef.current) {
        const heroVideo = heroVideoRef.current;
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
      videoRefs.forEach((ref) => {
        if (ref.current) {
          observer.observe(ref.current);
        }
      });
      
      // Specifically check hero video immediately since it's always visible
      if (heroVideoRef.current) {
        // Use a small delay to ensure observer has processed
        setTimeout(() => {
          // Check if hero video is intersecting (it should be)
          const rect = heroVideoRef.current?.getBoundingClientRect();
          if (rect && rect.top < window.innerHeight && rect.bottom > 0) {
            // Hero video is in viewport, try playing it
            if (heroVideoRef.current && heroVideoRef.current.paused) {
              playVideo(heroVideoRef.current);
            }
          }
        }, 50);
      }
    }, 200);

    // Capture user interaction to unlock autoplay (mobile browsers require this)
    const handleUserInteraction = async (e?: Event) => {
      // Prioritize hero video - play it immediately on first interaction
      if (heroVideoRef.current && heroVideoRef.current.paused) {
        try {
          // Play hero video immediately and synchronously if possible
          const playPromise = heroVideoRef.current.play();
          if (playPromise !== undefined) {
            playPromise.catch(() => {
              // If it fails, try again
              setTimeout(() => {
                if (heroVideoRef.current && heroVideoRef.current.paused) {
                  heroVideoRef.current.play().catch(() => {});
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
      videoRefs.forEach((ref) => {
        if (ref.current) {
          const video = ref.current;
          video.removeEventListener('canplay', () => {});
          video.removeEventListener('loadeddata', () => {});
        }
      });
    };
  }, [userInteracted]);

  useEffect(() => {
    const handleScroll = () => {
      const carousel = document.getElementById('carousel');
      if (carousel) {
        const pageWidth = carousel.clientWidth;
        const newPage = Math.round(carousel.scrollLeft / pageWidth);
        setCurrentPage(newPage);
      }
    };

    const carousel = document.getElementById('carousel');
    if (carousel) {
      carousel.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (carousel) {
        carousel.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  // Cycle through logos every 100ms
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLogoIndex((prevIndex) => (prevIndex + 1) % logos.length);
    }, 125);

    return () => clearInterval(interval);
  }, [logos.length]);

  // Fade and scale logo based on scroll position
  useEffect(() => {
    let rafId: number | null = null;
    
    const handleScroll = () => {
      if (rafId) return; // Skip if already scheduled
      
      rafId = requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const viewportHeight = window.innerHeight;
        const scrollProgress = Math.min(1, scrollY / viewportHeight);
        
        // Calculate opacity: 1.0 at scroll 0, 0.0 at scroll 100vh
        const opacity = 1 - scrollProgress;
        setLogoOpacity(opacity);
        
        // Calculate scale: 1.0 at scroll 0, 0.9 at scroll 100vh
        const scale = Math.max(0, 1 - (scrollProgress * 0.1));
        setLogoScale(scale);
        
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
  }, []);

  const handlePrevClick = () => {
    const carousel = document.getElementById('carousel');
    if (carousel) {
      const pageWidth = carousel.clientWidth;
      const newPage = Math.max(currentPage - 1, 0);
      carousel.scrollTo({
        left: newPage * pageWidth,
        behavior: 'smooth',
      });
      setCurrentPage(newPage);
    }
  };

  const handleNextClick = () => {
    const carousel = document.getElementById('carousel');
    if (carousel) {
      const pageWidth = carousel.clientWidth;
      const newPage = Math.min(currentPage + 1, totalPages - 1);
      carousel.scrollTo({
        left: newPage * pageWidth,
        behavior: 'smooth',
      });
      setCurrentPage(newPage);
    }
  };

  return (
    <main>

      <section 
        className={styles.hero}
        onTouchStart={(e) => {
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
        }}
        onClick={(e) => {
          // Also handle click for desktop
          const video = heroVideoRef.current;
          if (video && video.paused) {
            video.play().catch(() => {});
          }
        }}
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
          onLoadedData={(e) => {
            const video = e.currentTarget;
            if (video.paused) {
              video.play().catch(() => {});
            }
          }}
          onCanPlay={(e) => {
            const video = e.currentTarget;
            if (video.paused) {
              video.play().catch(() => {});
            }
          }}
          onLoadedMetadata={(e) => {
            const video = e.currentTarget;
            if (video.paused) {
              video.play().catch(() => {});
            }
          }}
        >         
            <source src="/sky.mp4" type="video/mp4"/>       
        </video>

        <img 
          src={logos[currentLogoIndex]} 
          key={currentLogoIndex} 
          style={{ 
            opacity: logoOpacity, 
            transform: `scale(${logoScale})`,
            transformOrigin: 'center center',
            transition: 'opacity 0.1s ease-out',
            willChange: 'transform, opacity'
          }}
        />

        <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.25 13.75L12 19.25L6.75 13.75"></path>
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 18.25V4.75"></path>
        </svg>
      </section>

      {/* <section className={`${styles.split} ${styles.flipped} ${styles.intro}`}>
        <video 
          ref={introVideoRef}
          loop 
          muted 
          autoPlay 
          playsInline 
          controls={false} 
          className={styles.half}
          preload="auto"
          onLoadedData={(e) => {
            const video = e.currentTarget;
            if (video.paused) {
              video.play().catch(() => {});
            }
          }}
        >         
            <source src="/mcm-intro.mp4" type="video/mp4"/>       
        </video>
        <div className={styles.content}>
          <p>Product. Graphic. Branding. Product. Graphic. Branding.</p>
          <p>Graphic. Branding. Product. Graphic. Branding. Product.</p>
          <p>Branding. Product. Graphic. Branding. Product. Graphic.</p>
        </div>
      </section>

      <section className={styles.split}>
        <img src="workin.jpg" />
        <div className={styles.content}>
          <div className={styles.carousel} id="carousel">
            <div className={styles.carouselContent}>
              <h2>01</h2>
              <h3>Craftsmanship</h3>
              <h5>Consumed by the details and the meditative practice of craft where aesthetic meets function.</h5>
            </div>
            <div className={styles.carouselContent}>
              <h2>02</h2>
              <h3>Curiosity</h3>
              <h5>Always learning and expanding, stretching into new areas to remain continuously challenged and inspired.</h5>
            </div>
            <div className={styles.carouselContent}>
              <h2>03</h2>
              <h3>Empathy</h3>
              <h5>Listen first and choose words wisely. Know you can always understand others better than you do today.</h5>
            </div>
          </div>

          <div className={styles.carouselControls}>
            <button className={styles.prev} onClick={handlePrevClick}>
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.25 13.75L12 19.25L6.75 13.75"></path>
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 18.25V4.75"></path>
                </svg>
            </button>
            <button className={styles.next} onClick={handleNextClick}>
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.25 13.75L12 19.25L6.75 13.75"></path>
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 18.25V4.75"></path>
              </svg>
            </button>
          </div>

          <div className={styles.dots}>
            {Array.from({ length: totalPages }).map((_, index) => (
            <div
              key={index}
              className={styles.dot}
              style={{ opacity: currentPage === index ? 1 : 0.1 }}
            />
          ))}
          </div>


        </div>
      </section>
      <section className={styles.disrupt}>
        <video 
          ref={patternVideoRef}
          loop 
          muted 
          autoPlay 
          playsInline 
          controls={false} 
          className={styles.half}
          preload="auto"
          onLoadedData={(e) => {
            const video = e.currentTarget;
            if (video.paused) {
              video.play().catch(() => {});
            }
          }}
        >         
            <source src="/pattern.mp4" type="video/mp4"/>       
        </video>
      </section>

       */}


      <section className={styles.featured}>
        {/* <h2>Selected work</h2> */}




        <div className={styles.case}>
          <aside>
            <h2>Canary</h2>
            <p>Finding the subversive space in an industry saturated with green-washed, minimal brands presenting tired monotony.</p>
            <ul aria-label="Scope of work"> 
                <li>Brand strategy</li>
                <li>Visual identity</li>
                <li>Illustration</li>
                <li>Art direction</li>
                <li>Copywriting</li>
            </ul>
          </aside>
          <div className={styles.gallery}>
            <img src="canary/logo.jpg" />
            <video 
              ref={brushVideoRef}
              loop 
              muted 
              autoPlay 
              playsInline 
              controls={false} 
              className={styles.half}
              preload="auto"
              onLoadedData={(e) => {
                const video = e.currentTarget;
                if (video.paused) {
                  video.play().catch(() => {});
                }
              }}
            >         
                <source src="/canary/brush.mp4" type="video/mp4"/>       
            </video>
            <img src="canary/icon.png" className={styles.half} />
            <img src="canary/guide.jpg" />
            <img src="canary/cover2.jpg" />
            <img src="canary/kids.jpg" className={styles.half} />
            <img src="canary/skate.png" className={styles.half} />
            <img src="canary/hero.gif" />
          </div>
        </div>

        <div className={styles.case}>
          <aside>
            <h2>Bloop</h2>
            <p>Transforming a once-hidden chore into a household celebration with small-batch, all-natural laundry soap that is free of both harmful chemicals <i>and</i> typical hippy scents.</p>
            <ul aria-label="Scope of work"> 
                <li>Brand strategy</li>
                <li>Visual identity</li>
                <li>Illustration</li>
                <li>Art direction</li>
                <li>Copywriting</li>
            </ul>
          </aside>
          <div className={styles.gallery}>
            <video 
              ref={sudsVideoRef}
              loop 
              muted 
              autoPlay 
              playsInline 
              controls={false}
              preload="auto"
              onLoadedData={(e) => {
                const video = e.currentTarget;
                if (video.paused) {
                  video.play().catch(() => {});
                }
              }}
            >         
                <source src="/bloop/bloop-suds.mp4" type="video/mp4"/>       
            </video>
            <img src="bloop/bloop-hands.jpg" />
            <img src="bloop/bloop-product.jpg" className={styles.half} />
            <video 
              ref={vibeVideoRef}
              loop 
              muted 
              autoPlay 
              playsInline 
              controls={false} 
              className={styles.half}
              preload="auto"
              onLoadedData={(e) => {
                const video = e.currentTarget;
                if (video.paused) {
                  video.play().catch(() => {});
                }
              }}
            >         
                <source src="/bloop/bloop-vibe.mp4" type="video/mp4"/>       
            </video>
            <img src="bloop/bloop-posters.jpg" />
          </div>
        </div>

        <div className={styles.case}>
          <aside>
            <h2>Dusty Times</h2>
            <p>An annual lifestyle journal celebrating the world of desert racing and overlanding. Spotlighting the spirit of adventure, resilience, and the relentless pursuit of victory by highlighting the stories on the fringes of the spotlight.</p>
            <ul aria-label="Scope of work"> 
                <li>Design direction</li>
                <li>Layout design</li>
                <li>Illustration</li>
                <li>Photo retouching</li>
                <li>Copywriting</li>
            </ul>
          </aside>
          <div className={styles.gallery}>
            <img src="dtimes/dt-stack.jpg" />
            <img src="dtimes/dt5-snake.jpg" />
            <img src="dtimes/dtspreads.gif" />
            <img src="dtimes/dt5-stack.jpg" />
            <img src="dtimes/united-in-dirt.jpg" />
          </div>
        </div>

        <div className={styles.case}>
          <aside>
            <h2>McM Sound</h2>
            <p>Boutique sound studio servicing enterprise clients in TV and film.</p>
            <ul aria-label="Scope of work"> 
                <li>Visual identity</li>
                <li>Website design</li>
                <li>Website development</li>
            </ul>
          </aside>
          <div className={styles.gallery}>
            <img src="mcmsound/mcms-icon.jpg" />
            <img src="mcmsound/mcms-phone2.jpg" className={styles.half} />
            <img src="mcmsound/mcms-interface.jpg" className={styles.half} />
            <img src="mcmsound/mcms-vinyl.jpg" />
            <img src="mcmsound/mcms-radio.gif" className={styles.half} />
            <img src="mcmsound/mcms-laptop.jpg" className={styles.half} />
          </div>
        </div>
        
        <div className={styles.case}>
          <aside>
            <h2>Mocks</h2>
            <p>A fast and intuitive mobile device mockup maker for mobile makers.</p>
            <ul aria-label="Scope of work"> 
                <li>Product design</li>
                <li><span className="proper">SwiftUI</span> development</li>
            </ul>
          </aside>
          <div className={styles.gallery}>
            <img src="moks/moks1.jpg" />
            <img src="moks/moks-ani1.gif" className={styles.half} />
            <img src="moks/moks-ani2.gif" className={styles.half} />
            <img src="moks/moks2.jpg" />
          </div>
        </div>

      </section>


      <section className={styles.cv}>

        <h4 className={styles.title}>Teams</h4>

        <a href="http://radsmth.com" className={styles.row}>
          <p>Radsmth</p>
          <p className={styles.desc}>Founder</p>
          <hr />
          <p className={styles.desc}>Current</p>
        </a>
        <a href="http://experian.com" className={styles.row}>
          <p>Experian</p>
          <p className={styles.desc}>Product Design Manager</p>
          <hr />
          <p className={styles.desc}>Current</p>
        </a>
        <a href="http://dustytimes.com" className={styles.row}>
          <p>Dusty Times</p>
          <p className={styles.desc}>Design Director</p>
          <hr />
          <p className={styles.desc}>Current</p>
        </a>
        <a href="http://vuori.com" className={styles.row}>
          <p>Vuori Clothing</p>
          <p className={styles.desc}>UX Consultant</p>
          <hr />
          <p className={styles.desc}>2022</p>
        </a>
        <a href="http://onxmaps.com" className={styles.row}>
          <p>onX Maps</p>
          <p className={styles.desc}>Product Designer</p>
          <hr />
          <p className={styles.desc}>2022</p>
        </a>
        <a href="http://stance.com" className={styles.row}>
          <p>Stance</p>
          <p className={styles.desc}>UX Designer</p>
          <hr />
          <p className={styles.desc}>2016-2022</p>
        </a>
        <a href="http://oakley.com" className={styles.row}>
          <p>Oakley</p>
          <p className={styles.desc}>Interaction Designer</p>
          <hr />
          <p className={styles.desc}>2016</p>
        </a>
        <a href="http://gofuse.com" className={styles.row}>
          <p>Fuse</p>
          <p className={styles.desc}>Assoc. Creative Director</p>
          <hr />
          <p className={styles.desc}>2011-2016</p>
        </a>
        <a href="http://nucontext.com" className={styles.row}>
          <p>NuContext</p>
          <p className={styles.desc}>Art Director</p>
          <hr />
          <p className={styles.desc}>2006-2011</p>
        </a>



      </section>

    </main>
  );
}


