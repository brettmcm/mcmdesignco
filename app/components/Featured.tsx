'use client'

import CaseStudy from './CaseStudy';
import { CASE_STUDIES } from '../data/caseStudies';
import styles from '../styles/layout.module.scss';

/**
 * Featured case studies section
 * Maps case study data to CaseStudy components
 */
export default function Featured() {
  return (
    <section className={styles.featured}>
      {CASE_STUDIES.map((caseStudy, index) => (
        <CaseStudy
          key={index}
          title={caseStudy.title}
          description={caseStudy.description}
          scope={caseStudy.scope}
          galleryItems={caseStudy.galleryItems.map(item => ({
            ...item,
            // Map className string to actual style class if needed
            className: item.className === 'half' ? styles.half : item.className
          }))}
        />
      ))}
    </section>
  );
}

