import { NextResponse } from 'next/server'
import { readFile, mkdir } from 'fs/promises'
import { existsSync } from 'fs'
import { join } from 'path'

// Use /tmp in serverless environments (Vercel, AWS Lambda, etc.), otherwise use project data directory
const isServerless = process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME || process.env.NEXT_RUNTIME === 'nodejs'
const DATA_DIR = isServerless ? '/tmp/data' : join(process.cwd(), 'data')
const NOTES_FILE = join(DATA_DIR, 'notes.json')

async function getNotes() {
  try {
    if (!existsSync(DATA_DIR)) {
      await mkdir(DATA_DIR, { recursive: true })
    }
    
    if (!existsSync(NOTES_FILE)) {
      return { notes: [] }
    }
    
    const fileContents = await readFile(NOTES_FILE, 'utf-8')
    return JSON.parse(fileContents)
  } catch (error: any) {
    console.error('Error reading notes:', error.message)
    return { notes: [] }
  }
}

export async function GET() {
  const data = await getNotes()
  return NextResponse.json(data)
}

