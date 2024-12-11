'use client'

import { useRef, useState, useEffect } from "react";
import styles from './styles/layout.module.scss'



  

export default function Home(props: any) {

  // const [scrollPosition, setScrollPosition] = useState({ scrollTop: 0, scrollLeft: 0 });
  // const carouselRef = useRef<null | HTMLDivElement>(null);

  // useEffect(() => {
  //   if (carouselRef.current) {
  //     const carousel = carouselRef.current;
  //     carousel.scrollLeft = carousel.clientWidth; // Start at the first duplicated item
  //   }
  // }, []);

  // function scrollCarousel(e: React.MouseEvent<HTMLButtonElement>, direction: 'next' | 'prev') {
  //   e.preventDefault();
  //   if (!carouselRef.current) return;

  //   const carousel = carouselRef.current;
  //   const scrollAmount = carousel.clientWidth; // Adjust this value as needed
  //   const targetScrollLeft = direction === 'next' 
  //     ? carousel.scrollLeft + scrollAmount 
  //     : carousel.scrollLeft - scrollAmount;
  //   const duration = 500; // duration in ms
  //   const startTime = performance.now();

  //   function animateScroll(currentTime: number) {
  //     const elapsedTime = currentTime - startTime;
  //     const progress = Math.min(elapsedTime / duration, 1);
  //     const easeInOutQuad = (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  //     const easedProgress = easeInOutQuad(progress);

  //     carousel.scrollLeft = scrollPosition.scrollLeft + (targetScrollLeft - scrollPosition.scrollLeft) * easedProgress;

  //     if (progress < 1) {
  //       requestAnimationFrame(animateScroll);
  //     } else {
  //       // Ensure the final position aligns with the snap point
  //       carousel.scrollLeft = targetScrollLeft;
  //       setScrollPosition({
  //         scrollTop: 0,
  //         scrollLeft: targetScrollLeft
  //       });

  //       // Handle infinite scroll wrapping
  //       if (direction === 'next' && targetScrollLeft >= carousel.scrollWidth - carousel.clientWidth) {
  //         carousel.scrollLeft = carousel.clientWidth;
  //         setScrollPosition({
  //           scrollTop: 0,
  //           scrollLeft: carousel.clientWidth
  //         });
  //       } else if (direction === 'prev' && targetScrollLeft <= 0) {
  //         carousel.scrollLeft = carousel.scrollWidth - 2 * carousel.clientWidth;
  //         setScrollPosition({
  //           scrollTop: 0,
  //           scrollLeft: carousel.scrollWidth - 2 * carousel.clientWidth
  //         });
  //       }
  //     }
  //   }

  //   requestAnimationFrame(animateScroll);
  // }


  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = 3; // Adjust this based on the number of pages in your carousel

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

      <section className={styles.hero}>
        <video loop={true} muted={true} autoPlay={true} playsInline={true} controls={false} className={styles.bg}>         
            <source src="leaves.mp4" type="video/mp4"/>       
        </video>

        <h1>Innovative design crafting intuitive, inspiring experiences with precision and passion</h1>

        <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.25 13.75L12 19.25L6.75 13.75"></path>
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 18.25V4.75"></path>
        </svg>
      </section>

      <section className={`${styles.split} ${styles.flipped}`}>
        <video loop={true} muted={true} autoPlay={true} playsInline={true} controls={false} className={styles.half}>         
            <source src="mcm-intro.mp4" type="video/mp4"/>       
        </video>
        <div className={styles.content}>
          <h5>Every detail becomes intentional and meaningful, leading to an inclusive sense of care and satisfaction.</h5>
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
        <video loop={true} muted={true} autoPlay={true} playsInline={true} controls={false} className={styles.half}>         
            <source src="pattern.mp4" type="video/mp4"/>       
        </video>
      </section>

      <section className={styles.featured}>
        {/* <h2>Selected work</h2> */}




        <div className={styles.case}>
          <aside>
            <h2>Canary</h2>
            <p>A subversive, punk-rock ethos in the world of plastic-free, sustainable personal care products. An industry saturated with green-washed brands and minimal aesthetic.</p>
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
            <video loop={true} muted={true} autoPlay={true} playsInline={true} controls={false} className={styles.half}>         
                <source src="canary/brush.mp4" type="video/mp4"/>       
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
            <p>Small-batch, all-natural laundry soap that is free of both harmful chemicals <i>and</i> typical hippy scents. Their products are safe for both the environment and your household, featuring refreshing scents and a commitment to cruelty-free practices.</p>
            <ul aria-label="Scope of work"> 
                <li>Brand strategy</li>
                <li>Visual identity</li>
                <li>Illustration</li>
                <li>Art direction</li>
                <li>Copywriting</li>
            </ul>
          </aside>
          <div className={styles.gallery}>
            <video loop={true} muted={true} autoPlay={true} playsInline={true} controls={false}>         
                <source src="bloop/bloop-suds.mp4" type="video/mp4"/>       
            </video>
            <img src="bloop/bloop-hands.jpg" />
            <img src="bloop/bloop-product.jpg" className={styles.half} />
            <video loop={true} muted={true} autoPlay={true} playsInline={true} controls={false} className={styles.half}>         
                <source src="bloop/bloop-vibe.mp4" type="video/mp4"/>       
            </video>
            <img src="bloop/bloop-posters.jpg" />
          </div>
        </div>

        <div className={styles.case}>
          <aside>
            <h2>Dusty Times</h2>
            <p>Embrace the thrill of off-road with Dusty Times—an annual lifestyle journal celebrating the world of desert racing and overlanding. Spotlighting the spirit of adventure, resilience, and the relentless pursuit of victory.</p>
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


