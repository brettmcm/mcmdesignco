import { NextRequest, NextResponse } from 'next/server'
import { readFile, writeFile, mkdir } from 'fs/promises'
import { existsSync } from 'fs'
import { join } from 'path'

const NOTES_FILE = join(process.cwd(), 'data', 'notes.json')

interface Note {
  id: string
  content: string
  published: string
  url?: string
}

// Initialize notes file if it doesn't exist
async function ensureNotesFile() {
  const dataDir = join(process.cwd(), 'data')
  if (!existsSync(dataDir)) {
    await mkdir(dataDir, { recursive: true })
  }
  if (!existsSync(NOTES_FILE)) {
    await writeFile(NOTES_FILE, JSON.stringify({ notes: [] }, null, 2))
  }
}

async function getNotes(): Promise<Note[]> {
  await ensureNotesFile()
  try {
    const fileContents = await readFile(NOTES_FILE, 'utf-8')
    const data = JSON.parse(fileContents)
    return data.notes || []
  } catch (error) {
    console.error('Error reading notes:', error)
    return []
  }
}

async function saveNote(note: Note) {
  await ensureNotesFile()
  const notes = await getNotes()
  notes.unshift(note) // Add to beginning
  await writeFile(NOTES_FILE, JSON.stringify({ notes }, null, 2))
}

// Verify Bearer token (you should replace this with your actual token verification)
function verifyToken(authHeader: string | null): boolean {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return false
  }
  
  const token = authHeader.substring(7)
  // TODO: Replace with your actual token verification logic
  // For now, we'll use an environment variable
  const expectedToken = process.env.MICROPUB_TOKEN
  
  if (!expectedToken) {
    // If no token is set, allow requests (for development)
    // In production, you should always require authentication
    console.warn('MICROPUB_TOKEN not set - allowing unauthenticated requests')
    return true
  }
  
  return token === expectedToken
}

// CORS headers helper
function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: corsHeaders(),
  })
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const q = searchParams.get('q')

  // Handle configuration query
  if (q === 'config') {
    return NextResponse.json({
      'media-endpoint': `${request.nextUrl.origin}/api/micropub/media`,
      'syndicate-to': []
    }, {
      headers: corsHeaders(),
    })
  }

  // Handle source query
  if (q === 'source') {
    const url = searchParams.get('url')
    if (url) {
      const notes = await getNotes()
      const note = notes.find(n => n.url === url || n.id === url)
      if (note) {
        return NextResponse.json({
          type: ['h-entry'],
          properties: {
            content: [note.content],
            published: [note.published]
          }
        }, {
          headers: corsHeaders(),
        })
      }
    }
    return NextResponse.json({ error: 'Not found' }, { 
      status: 404,
      headers: corsHeaders(),
    })
  }

  // Default: return endpoint info
  return NextResponse.json({
    'media-endpoint': `${request.nextUrl.origin}/api/micropub/media`
  }, {
    headers: corsHeaders(),
  })
}

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  
  if (!verifyToken(authHeader)) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { 
        status: 401,
        headers: corsHeaders(),
      }
    )
  }

  const contentType = request.headers.get('content-type') || ''
  
  let data: any
  
  if (contentType.includes('application/json')) {
    data = await request.json()
  } else if (contentType.includes('application/x-www-form-urlencoded') || contentType.includes('multipart/form-data')) {
    const formData = await request.formData()
    const formObj: Record<string, any> = {}
    
    // Convert FormData to object, handling arrays
    for (const [key, value] of formData.entries()) {
      if (formObj[key]) {
        // Convert to array if multiple values
        if (Array.isArray(formObj[key])) {
          formObj[key].push(value)
        } else {
          formObj[key] = [formObj[key], value]
        }
      } else {
        formObj[key] = value
      }
    }
    
    // Parse Micropub format
    if (formObj.h) {
      // Handle h-entry format
      const hType = formObj.h
      const properties: Record<string, string[]> = {}
      
      // Parse properties[content], properties[published], etc.
      for (const [key, value] of Object.entries(formObj)) {
        const match = key.match(/^properties\[(.+)\]$/)
        if (match) {
          const propName = match[1]
          if (!properties[propName]) {
            properties[propName] = []
          }
          if (Array.isArray(value)) {
            properties[propName].push(...value.map(v => String(v)))
          } else {
            properties[propName].push(String(value))
          }
        }
      }
      
      data = { type: [`h-${hType}`], properties }
    } else {
      // Fallback: treat form data as-is
      data = formObj
    }
  } else {
    return NextResponse.json(
      { error: 'Unsupported content type' },
      { 
        status: 400,
        headers: corsHeaders(),
      }
    )
  }

  // Handle Micropub create action
  if (data.action === 'create' || !data.action) {
    let contentValue = data.properties?.content?.[0] || data.content || ''
    const published = data.properties?.published?.[0] || new Date().toISOString()
    
    // Extract content from various formats
    let content = ''
    if (typeof contentValue === 'string') {
      content = contentValue
    } else if (typeof contentValue === 'object') {
      // Handle content object with html/text properties
      content = contentValue.html || contentValue.text || String(contentValue)
    } else {
      content = String(contentValue)
    }
    
    if (!content || content.trim() === '') {
      return NextResponse.json(
        { error: 'Content is required' },
        { 
          status: 400,
          headers: corsHeaders(),
        }
      )
    }

    // Generate ID and URL
    const id = `note-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    const url = `${request.nextUrl.origin}/notes#${id}`

    const note: Note = {
      id,
      content: content.trim(),
      published,
      url
    }

    await saveNote(note)

    return NextResponse.json(
      {
        url,
        id
      },
      {
        status: 201,
        headers: {
          Location: url,
          ...corsHeaders(),
        }
      }
    )
  }

  // Handle other actions (update, delete) if needed
  return NextResponse.json(
    { error: 'Unsupported action' },
    { 
      status: 400,
      headers: corsHeaders(),
    }
  )
}

