# Whoscall Blog

A modern blog platform built with Sanity CMS and Next.js.

## Project Structure

```
whoscall-blog/
├── studio/          # Sanity Studio (CMS)
│   ├── schemaTypes/ # Content schemas
│   ├── sanity.config.ts
│   └── package.json
├── frontend/        # Next.js Frontend
│   ├── src/
│   ├── next.config.ts
│   └── package.json
└── package.json     # Root workspace configuration
```

## Getting Started

### Prerequisites

- Node.js >= 20.19.0
- npm

### Installation

1. Install dependencies:

```bash
npm install
```

### Development

Run both Sanity Studio and Next.js frontend concurrently:

```bash
npm run dev
```

Or run them separately:

```bash
# Sanity Studio (CMS) - http://localhost:3333
npm run dev:studio

# Next.js Frontend - http://localhost:3000
npm run dev:frontend
```

### Available Scripts

- `npm run dev` - Start both studio and frontend in development mode
- `npm run dev:studio` - Start only Sanity Studio
- `npm run dev:frontend` - Start only Next.js frontend
- `npm run build` - Build both projects
- `npm run deploy:studio` - Deploy Sanity Studio
- `npm run lint` - Lint both projects
- `npm run clean` - Clean all node_modules

## Architecture

- **Studio**: Content management system built with Sanity
- **Frontend**: Blog website built with Next.js
- **Workspace**: npm workspaces for managing dependencies

## Deployment

### Sanity Studio

```bash
npm run deploy:studio
```

### Next.js Frontend

Build and deploy to your preferred hosting platform:

```bash
npm run build:frontend
npm run start:frontend
```
