import styles from './styles/layout.module.scss'

export default function Home() {
  return (
    <main>

      <section className={styles.hero}>
        <video loop={true} muted={true} autoPlay={true} playsInline={true} controls={false} className={styles.bg}>         
            <source src="leaves.mp4" type="video/mp4"/>       
        </video>

        <h1>Innovative visual design crafting intuitive, inspiring experiences with precision and passion</h1>

        <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.25 13.75L12 19.25L6.75 13.75"></path>
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 18.25V4.75"></path>
        </svg>
      </section>

      <section className={`${styles.split} ${styles.flipped}`}>
        <img src="logo-animation.png" />
        <div className={styles.content}>
          <h5>Every detail becomes intentional and meaningful, leading to an inclusive sense of care and satisfaction.</h5>
        </div>
      </section>

      <section className={styles.split}>
        <img src="workin.jpg" />
        <div className={styles.content}>
            <h2>01</h2>
            <h3>Craftsmanship</h3>
            <h5>Always learning and expanding, stretching into new areas to remain continuously challenged and inspired.</h5>
        </div>
      </section>

      <section className={styles.disrupt}>
        {/* <img src="neonmoon.jpg" /> */}
      </section>

      <section className={styles.featured}>
        <h2>Selected works</h2>


        <div className={styles.case}>
          <aside>
            <h4>Dusty Times</h4>
            <p>Always learning and expanding, stretching into new areas to remain continuously challenged and inspired.</p>
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
            <img src="dtimes/dt5-stack.jpg" />
            <img src="dtimes/united-in-dirt.jpg" />
          </div>
        </div>

        <div className={styles.case}>
          <aside>
            <h4>Canary</h4>
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
            <img src="canary/kids.jpg" className={styles.half} />
            <img src="canary/cover2.jpg" />
            <img src="canary/hero.gif" />
          </div>
        </div>
        
        <div className={styles.case}>
          <aside>
            <h4>Experian</h4>
            <p>Always learning and expanding, stretching into new areas to remain continuously challenged and inspired.</p>
            <ul aria-label="Scope of work"> 
                <li>Product design management</li>
                <li>Design system management</li>
                <li>Design operations</li>
            </ul>
          </aside>
          <div className={styles.gallery}>
            <img src="neonmoon.jpg" />
          </div>
        </div>

      </section>

    </main>
  );
}


