import styles from './styles/layout.module.scss'

export default function Home() {
  return (
    <main>
      <section className={styles.hero}>
        
        <video autoPlay muted loop className={styles.bg}>         
            <source src="leaves.mp4" type="video/mp4"/>       
        </video>

        <h1>Innovative visual design crafting intuitive, inspiring experiences with precision and passion</h1>

        <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.25 13.75L12 19.25L6.75 13.75"></path>
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 18.25V4.75"></path>
</svg>


      </section>
      <section className={styles.split}>
        <div className={styles.content}>
            <h3>McM Design Co.</h3>
          <p>Creating designed solutions that are intuitive and inspiring. By applying design thinking to client challenges, every detail becomes intentional and meaningful, leading to an inclusive sense of comfort and satisfaction.</p>
        </div>
        <img src="logo-animation.png" />
      </section>
      <section className={styles.split}>
        <img src="workin.jpg" />
        <div className={styles.content}>
            <h3>01</h3>
            <p>Always learning and expanding, stretching into new areas to remain continuously challenged and inspired.</p>
        </div>
      </section>
    </main>
  );
}


