# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A personal portfolio website built with Astro, React, and Tailwind CSS. Features a bento-grid layout with live integrations for Spotify (recently played tracks), Raindrop.io (reading list), and OpenWeather API (weather widget).

**Live Site:** https://joseavila.dev

## Commands

```bash
# Development
npm install              # Install dependencies
npm run dev             # Start dev server at localhost:4321
npm run build           # Build production site to ./dist/
npm run preview         # Preview production build locally
npm run astro           # Run Astro CLI commands
```

## Architecture

### Framework & Rendering
- **Astro 3.6.1** with Islands Architecture - static-first with selective React hydration for interactive components
- React components (`client:*` directives) are used only for dynamic features requiring state management
- Most UI is server-rendered Astro components for optimal performance

### State Management
- **Nanostores** (`src/store/store.ts`) manages global state:
  - `darkmode`: theme toggle state
  - `language`: internationalization state (EN/ES)
- React components use local state for API data fetching

### API Integration Pattern
All three live widgets follow the same pattern:
1. **AudioPlayer** (`src/components/audioPlayer/AudioPlayer.tsx`): Fetches from `PUBLIC_SPOTIFY_API`
2. **Weather** (`src/components/Weather/Weather.tsx`): Fetches from `PUBLIC_OPEN_WEATHER_API`
3. **Reading** (`src/components/Reading/Reading.tsx`): Fetches from `PUBLIC_POCKET_API`

Each component:
- Uses React hooks (`useState`, `useEffect`)
- Fetches from environment variable URLs on mount
- Handles loading states
- Gracefully handles errors (logs to console)
- Accepts `cols` and `rows` props for grid positioning

### Internationalization (i18n)
- Translation keys defined in `src/i18n/ui.ts` (English/Spanish)
- `getLangFromUrl()` extracts language from URL path
- `useTranslations()` hook provides translation function
- Currently limited implementation (only a few strings translated)

### Layout System
Three main layouts in `src/layouts/`:
1. **Layout.astro** - Base layout for homepage (bento-grid)
2. **BlogLayout.astro** - Blog listing page layout
3. **Post.astro** - Individual blog post layout

### Path Aliases
Defined in `tsconfig.json`:
- `@root/*` → project root
- `@components/*` → `src/components/`
- `@assets/*` → `src/assets/`
- `@layouts/*` → `src/layouts/`
- `@store/*` → `src/store/`

### Styling
- Tailwind CSS for utility-first styling
- Dark mode implemented via Tailwind's `dark:` variant + nanostore state
- Global styles in `main.css`
- Responsive breakpoints: mobile-first, then `md:`, `xl:`

### Content Structure
- **Blog posts**: Markdown files in `src/pages/posts/` with frontmatter
- **Static assets**: `public/` directory
- **Images**: `src/assets/images/` (processed by Astro)

## Environment Variables

Required for production (set in GitHub repository variables):
```bash
PUBLIC_PORTFOLIO_URL       # Base URL (https://joseavila.dev)
PUBLIC_SPOTIFY_API         # Backend endpoint for Spotify data
PUBLIC_POCKET_API          # Backend endpoint for Raindrop.io articles
PUBLIC_OPEN_WEATHER_API    # OpenWeather API endpoint
```

For local development, create `.env.local` (gitignored).

## Deployment

Automatically deploys to GitHub Pages via `.github/workflows/deploy.yml`:
1. Triggers on push to `master` branch
2. Runs `npm ci` and `npm run build`
3. Uploads `./dist/` to GitHub Pages
4. Environment variables injected from GitHub repository variables

Node version used in CI: 18

## Component Guidelines

When modifying bento-grid components:
- Grid defined in `src/pages/index.astro`: `grid-cols-3` mobile, `grid-cols-4` desktop
- Components accept `cols` and `rows` props for grid positioning (e.g., `col-span-2 md:col-span-2`)
- Use `LinkCard.astro` wrapper for clickable cards
- Maintain consistent hover effects: `hover:shadow-xl hover:scale-105 transition-all`

When working with API integrations:
- Always handle loading states and errors gracefully
- Log errors to console for debugging
- Follow existing patterns in AudioPlayer/Weather/Reading components
- API URLs come from environment variables (never hardcode)

## Testing & Quality

No testing framework is currently configured. When adding tests:
- Suggested: Vitest for unit tests
- Suggested: Playwright for E2E tests
- Focus on testing API integration components and i18n utilities
