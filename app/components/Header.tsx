'use client'

import { useEffect, useState } from 'react'
import styles from '../styles/Header.module.scss'

export default function Header() {
  const [translateY, setTranslateY] = useState(-100)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const viewportHeight = window.innerHeight
      const scrollProgress = scrollY / (viewportHeight * 0.8) // 80vh
      const progress = Math.min(Math.max(scrollProgress, 0), 1)
      // Interpolate from -100% (fully above) to 0% (in position)
      const newTranslateY = -100 + (progress * 100)
      setTranslateY(newTranslateY)
    }

    // Set initial position
    handleScroll()

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className={styles.header}>
      <div 
        className={styles.headerBackground}
        style={{ 
          transform: `translateY(${translateY}%)`
        }}
      />
      <div className={styles.content}>
        <picture>
          <source srcSet="dark/m.svg" media="(prefers-color-scheme: dark)" />
          <img src="dark/m.svg" alt="" className={styles.logo} />
        </picture>
        <a href="mailto:hello@brettmcm.com?subject=Hello there!" className={styles.email}>
          Contact
        </a>
      </div>
    </div>
  )
}

