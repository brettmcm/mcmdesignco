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

// Helper function to parse form data into Micropub format
function parseFormDataToMicropub(formObj: Record<string, any>): any {
  // Default to h-entry if h is not specified (per Micropub spec)
  const hType = String(formObj.h || formObj['h'] || 'entry')
  const properties: Record<string, string[]> = {}
  
  // Parse properties[content][], properties[published], etc.
  for (const [key, value] of Object.entries(formObj)) {
    // Skip reserved parameters
    if (key === 'h' || key === 'action' || key === 'access_token' || key === 'url' || key.startsWith('mp-')) {
      continue
    }
    
    // Handle properties[content][] format
    const propertiesMatch = key.match(/^properties\[(.+?)\](?:\[\])?$/)
    if (propertiesMatch) {
      const propName = propertiesMatch[1]
      if (!properties[propName]) {
        properties[propName] = []
      }
      if (Array.isArray(value)) {
        properties[propName].push(...value.map(v => String(v)))
      } else {
        properties[propName].push(String(value))
      }
    }
    // Handle direct properties like 'content', 'name', etc. (iA Writer format)
    else if (!key.startsWith('properties[')) {
      if (!properties[key]) {
        properties[key] = []
      }
      if (Array.isArray(value)) {
        properties[key].push(...value.map(v => String(v)))
      } else {
        properties[key].push(String(value))
      }
    }
  }
  
  return { 
    type: [`h-${hType}`], 
    properties,
    action: formObj.action || 'create'
  }
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
  const contentTypeLower = contentType.toLowerCase()
  console.log('Micropub POST - Content-Type:', contentType)
  console.log('Micropub POST - Headers:', Object.fromEntries(request.headers.entries()))
  
  let data: any
  
  try {
    if (contentTypeLower.includes('application/json')) {
      data = await request.json()
    } else if (contentTypeLower.includes('application/x-www-form-urlencoded')) {
      // Parse form-urlencoded data manually
      const text = await request.text()
      console.log('Raw form data:', text)
      const formObj: Record<string, any> = {}
      const params = new URLSearchParams(text)
      
      for (const [key, value] of params.entries()) {
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
      
      console.log('Parsed form object:', formObj)
      // Parse Micropub format
      data = parseFormDataToMicropub(formObj)
    } else if (contentTypeLower.includes('multipart/form-data')) {
      const formData = await request.formData()
      const formObj: Record<string, any> = {}
      
      // Convert FormData to object, handling arrays
      for (const [key, value] of formData.entries()) {
        if (formObj[key]) {
          if (Array.isArray(formObj[key])) {
            formObj[key].push(value)
          } else {
            formObj[key] = [formObj[key], value]
          }
        } else {
          formObj[key] = value
        }
      }
      
      console.log('Parsed form object:', formObj)
      // Parse Micropub format
      data = parseFormDataToMicropub(formObj)
    } else {
      // Try to parse as form-urlencoded even if content-type header is missing/malformed
      try {
        const text = await request.text()
        console.log('Raw data (fallback):', text)
        const formObj: Record<string, any> = {}
        const params = new URLSearchParams(text)
        
        for (const [key, value] of params.entries()) {
          formObj[key] = value
        }
        
        console.log('Parsed form object (fallback):', formObj)
        // Parse Micropub format
        data = parseFormDataToMicropub(formObj)
      } catch (e: any) {
        console.error('Failed to parse request:', e)
        return NextResponse.json(
          { error: 'invalid_request', error_description: `Unsupported content type: ${contentType}` },
          { 
            status: 400,
            headers: corsHeaders(),
          }
        )
      }
    }
  } catch (error: any) {
    console.error('Error parsing request:', error)
    console.error('Error stack:', error.stack)
    return NextResponse.json(
      { error: 'invalid_request', error_description: error.message },
      { 
        status: 400,
        headers: corsHeaders(),
      }
    )
  }
  
  console.log('Parsed data:', JSON.stringify(data, null, 2))

  // Handle Micropub create action
  if (data.action === 'create' || !data.action) {
    // Per Micropub spec: must have at least one of content, summary, or photo
    const hasContent = data.properties?.content && data.properties.content.length > 0
    const hasSummary = data.properties?.summary && data.properties.summary.length > 0
    const hasPhoto = data.properties?.photo && data.properties.photo.length > 0
    
    if (!hasContent && !hasSummary && !hasPhoto) {
      console.error('No content, summary, or photo found in request')
      console.error('Data structure:', JSON.stringify(data, null, 2))
      console.error('Data keys:', Object.keys(data))
      if (data.properties) {
        console.error('Properties keys:', Object.keys(data.properties))
      }
      return NextResponse.json(
        { 
          error: 'invalid_request',
          error_description: 'At least one of content, summary, or photo is required',
          received: Object.keys(data),
          properties: data.properties ? Object.keys(data.properties) : null,
        },
        { 
          status: 400,
          headers: corsHeaders(),
        }
      )
    }
    
    // Extract content (prefer content, fallback to summary)
    let contentValue: any = null
    
    // Try properties.content first (standard Micropub format)
    if (data.properties?.content && data.properties.content.length > 0) {
      contentValue = Array.isArray(data.properties.content) 
        ? data.properties.content[0] 
        : data.properties.content
    }
    // Try summary if no content
    else if (data.properties?.summary && data.properties.summary.length > 0) {
      contentValue = Array.isArray(data.properties.summary) 
        ? data.properties.summary[0] 
        : data.properties.summary
    }
    // Try direct content property (iA Writer format)
    else if (data.content) {
      contentValue = Array.isArray(data.content) ? data.content[0] : data.content
    }
    // Try properties['content'] or properties['summary']
    else if (data.properties && typeof data.properties === 'object') {
      for (const [key, value] of Object.entries(data.properties)) {
        if (key.toLowerCase() === 'content' || key.toLowerCase() === 'summary') {
          const arrValue = Array.isArray(value) ? value : [value]
          if (arrValue.length > 0 && arrValue[0]) {
            contentValue = arrValue[0]
            break
          }
        }
      }
    }
    
    const published = data.properties?.published?.[0] 
      || data.properties?.published 
      || data.published 
      || new Date().toISOString()
    
    // Extract content from various formats
    let content = ''
    if (contentValue === null || contentValue === undefined) {
      // If we have photo but no content/summary, use empty content
      content = hasPhoto ? '' : ''
    } else if (typeof contentValue === 'string') {
      content = contentValue
    } else if (typeof contentValue === 'object') {
      // Handle content object with html/text properties
      content = contentValue.html || contentValue.text || contentValue.value || String(contentValue)
    } else {
      content = String(contentValue)
    }
    
    // Allow empty content if we have photo
    if (!hasPhoto && (!content || content.trim() === '')) {
      console.error('No valid content found in request')
      console.error('Data structure:', JSON.stringify(data, null, 2))
      return NextResponse.json(
        { 
          error: 'invalid_request',
          error_description: 'Content is required when no photo is provided',
        },
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
    { error: 'invalid_request', error_description: `Unsupported action: ${data.action}` },
    { 
      status: 400,
      headers: corsHeaders(),
    }
  )
}

