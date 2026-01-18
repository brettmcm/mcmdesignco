import { NextResponse } from 'next/server'
import { readFile, mkdir } from 'fs/promises'
import { existsSync } from 'fs'
import { join } from 'path'

const NOTES_FILE = join(process.cwd(), 'data', 'notes.json')

async function getNotes() {
  const dataDir = join(process.cwd(), 'data')
  if (!existsSync(dataDir)) {
    await mkdir(dataDir, { recursive: true })
  }
  
  if (!existsSync(NOTES_FILE)) {
    return { notes: [] }
  }
  
  try {
    const fileContents = await readFile(NOTES_FILE, 'utf-8')
    return JSON.parse(fileContents)
  } catch (error) {
    console.error('Error reading notes:', error)
    return { notes: [] }
  }
}

export async function GET() {
  const data = await getNotes()
  return NextResponse.json(data)
}

