'use client'

import styles from '../styles/Teams.module.scss'

export interface Team {
  name: string
  role: string
  period: string
  url: string
}

interface TeamsProps {
  title?: string
  teams: Team[]
}

export default function Teams({ title = 'Teams', teams }: TeamsProps) {
  return (
    <section className={styles.cv}>
      <h4 className={styles.title}>{title}</h4>
      
      {teams.map((team, index) => (
        <a key={index} href={team.url} className={styles.row}>
          <p>{team.name}</p>
          <p className={styles.desc}>{team.role}</p>
          <hr />
          <p className={styles.desc}>{team.period}</p>
        </a>
      ))}
    </section>
  )
}

