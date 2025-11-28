'use client'

import styles from '../styles/layout.module.scss';

interface ServicesProps {
  title?: string;
  subtitle?: string;
  services?: string[];
}

export default function Services({ 
  title = 'McMDesign Co.',
  subtitle = 'Creative services',
  services = ['Branding', 'Design Systems', 'Graphic Design']
}: ServicesProps) {
  return (
    <section className={styles.services}>
      <div>
        <h1>{title}</h1>
        <h4>{subtitle}</h4>
      </div>
      <ol>
        {services.map((service, index) => (
          <li key={index}>{service}</li>
        ))}
      </ol>
    </section>
  );
}

