https://replit.com/@mkuugee182/cfgyufhjfjy
# BWM XMD YTS - YouTube Search API

## Overview

A YouTube Search API application built with a React frontend and Express backend. The application provides a high-performance JSON endpoint for video metadata extraction from YouTube.

## Project Structure

```
├── client/              # React frontend (Vite)
│   ├── src/
│   │   ├── components/  # UI components (shadcn/ui)
│   │   ├── pages/       # Page components
│   │   ├── hooks/       # Custom React hooks
│   │   └── lib/         # Utility functions
│   └── index.html
├── server/              # Express backend
│   ├── index.ts         # Server entry point
│   ├── routes.ts        # API routes
│   ├── storage.ts       # Storage implementation
│   ├── static.ts        # Static file serving
│   └── vite.ts          # Vite dev server integration
├── shared/              # Shared types and schemas
│   └── schema.ts        # Drizzle ORM schema
└── script/              # Build scripts
    └── build.ts         # Production build script
```

## Tech Stack

- **Frontend**: React 19, Vite, TailwindCSS, shadcn/ui
- **Backend**: Express.js, Node.js
- **Database**: PostgreSQL with Drizzle ORM
- **API**: YouTube metadata extraction via youtube-sr

## Development

The application runs on port 5000 in development mode with hot module reloading.

### Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Run production build
- `npm run db:push` - Push database schema changes

## API Endpoints

- `GET /api/v1/search?q=` - Search YouTube videos
- `GET /api/v1/trending` - Get trending videos (with optional country parameter)

## Configuration

- Frontend binds to `0.0.0.0:5000`
- AllowedHosts is set to `true` for Replit proxy compatibility
- Database connection via `DATABASE_URL` environment variable
