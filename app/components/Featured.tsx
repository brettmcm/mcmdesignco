'use client'

import CaseStudy from './CaseStudy';
import { CASE_STUDIES } from '../data/caseStudies';
import styles from '../styles/Featured.module.scss';

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
            // Keep className as string - CaseStudy will handle the mapping
            className: item.className
          }))}
        />
      ))}
    </section>
  );
}

