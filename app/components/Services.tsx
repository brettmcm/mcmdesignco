'use client'

import styles from '../styles/Services.module.scss';

interface ServicesProps {
  title?: string;
  subtitle?: string;
  services?: string[];
}

export default function Services({ 
  title = 'Brett McM Design',
  subtitle = 'Creative services',
  services = ['Branding', 'Design Systems', 'Graphic Design']
}: ServicesProps) {
  return (
    <section className={styles.services}>
      <div className={styles.blob}><h1>{title}</h1></div>
      <div className={styles.list}>
        <h4>{subtitle}</h4>
        <ol>
          {services.map((service, index) => (
            <li key={index}>{service}</li>
          ))}
        </ol>
      </div>
    </section>
  );
}

