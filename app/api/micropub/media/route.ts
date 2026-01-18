import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import { existsSync } from 'fs'
import { join } from 'path'

const MEDIA_DIR = join(process.cwd(), 'public', 'media')

// Verify Bearer token
function verifyToken(authHeader: string | null): boolean {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return false
  }
  
  const token = authHeader.substring(7)
  const expectedToken = process.env.MICROPUB_TOKEN
  
  if (!expectedToken) {
    console.warn('MICROPUB_TOKEN not set - allowing unauthenticated requests')
    return true
  }
  
  return token === expectedToken
}

// CORS headers helper
function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
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

  // Ensure media directory exists
  if (!existsSync(MEDIA_DIR)) {
    await mkdir(MEDIA_DIR, { recursive: true })
  }

  const formData = await request.formData()
  const file = formData.get('file') as File | null

  if (!file) {
    return NextResponse.json(
      { error: 'No file provided' },
      { 
        status: 400,
        headers: corsHeaders(),
      }
    )
  }

  // Generate unique filename
  const timestamp = Date.now()
  const randomStr = Math.random().toString(36).substring(2, 9)
  const extension = file.name.split('.').pop() || 'bin'
  const filename = `${timestamp}-${randomStr}.${extension}`
  const filepath = join(MEDIA_DIR, filename)

  // Save file
  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)
  await writeFile(filepath, buffer)

  // Return URL
  const url = `${request.nextUrl.origin}/media/${filename}`

  return NextResponse.json(
    { url },
    { 
      status: 201,
      headers: corsHeaders(),
    }
  )
}

