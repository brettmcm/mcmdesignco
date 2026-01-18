# Micropub API Setup for iA Writer

This site supports posting notes via the Micropub API, which allows you to publish directly from iA Writer.

## Setup Instructions

### 1. Configure Environment Variable

Create a `.env.local` file in the root of your project (if it doesn't exist) and add:

```
MICROPUB_TOKEN=your-secret-token-here
```

Replace `your-secret-token-here` with a secure random token. You can generate one using:

```bash
openssl rand -hex 32
```

### 2. Configure iA Writer

1. Open iA Writer
2. Go to Settings → Publishing → Micropub
3. Enter your site URL: `https://yourdomain.com` (or `http://localhost:3000` for local development)
4. Enter your Bearer token (the value you set in `MICROPUB_TOKEN`)
5. Test the connection

### 3. Publishing Notes

Once configured, you can publish notes directly from iA Writer:

1. Write your note in iA Writer
2. Use the publish command (usually Cmd+P or via the menu)
3. Select your Micropub endpoint
4. Your note will appear on the `/notes` page

## API Endpoints

- **Micropub Endpoint**: `/api/micropub`
- **Notes API**: `/api/notes` (GET - returns all notes)
- **Notes Page**: `/notes` (displays all published notes)

## Notes Storage

Notes are stored in `/data/notes.json`. This file is gitignored and will be created automatically when you publish your first note.

## Security

⚠️ **Important**: In production, always set the `MICROPUB_TOKEN` environment variable. Without it, the API will accept unauthenticated requests (for development only).

