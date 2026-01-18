'use client'

import { useEffect, useState } from 'react'
import styles from './Notes.module.scss'

interface Note {
  id: string
  content: string
  published: string
  url?: string
}

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/notes')
      .then(res => res.json())
      .then(data => {
        setNotes(data.notes || [])
        setLoading(false)
      })
      .catch(err => {
        console.error('Error fetching notes:', err)
        setLoading(false)
      })
  }, [])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  return (
    <main className={styles.notesPage}>
      <section className={styles.container}>
        <h1>Notes</h1>
        {loading ? (
          <p>Loading notes...</p>
        ) : notes.length === 0 ? (
          <p>No notes yet. Post from iA Writer to get started.</p>
        ) : (
          <div className={styles.notesList}>
            {notes.map((note) => (
              <article key={note.id} className={styles.note}>
                <div 
                  className={styles.content}
                  dangerouslySetInnerHTML={{ __html: note.content }}
                />
                <time className={styles.date} dateTime={note.published}>
                  {formatDate(note.published)}
                </time>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}

