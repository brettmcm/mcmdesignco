import styles from '../styles/SocialLinks.module.scss'

export interface SocialLink {
  href: string
  iconName: string // e.g., 'insta', 'readcv', etc.
  alt?: string
}

interface SocialLinksProps {
  links: SocialLink[]
}

export default function SocialLinks({ links }: SocialLinksProps) {
  return (
    <div className={styles.network}>
      {links.map((link, index) => (
        <a key={index} href={link.href}>
          <picture>
            <source 
              srcSet={`light/${link.iconName}.svg`} 
              media="(prefers-color-scheme: dark)" 
            />
            <img src={`light/${link.iconName}.svg`} alt={link.alt || ''} />
          </picture>
        </a>
      ))}
    </div>
  )
}

