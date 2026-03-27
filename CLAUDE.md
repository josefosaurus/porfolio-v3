# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A personal portfolio website built with Astro, React, and Tailwind CSS. Features a bento-grid layout with live integrations for Spotify (recently played tracks), Raindrop.io (reading list), OpenWeather API (weather widget), and a certificate carousel fetched from the backend API.

**Live Site:** https://joseavila.dev

## Commands

```bash
npm install              # Install dependencies
npm run dev             # Start dev server at localhost:4321
npm run build           # Build production site to ./dist/
npm run preview         # Preview production build locally
```

## Architecture

### Framework & Rendering
- **Astro** with Islands Architecture — static-first with selective React hydration (`client:only` or `client:load`)
- Most UI is server-rendered Astro components; React is used only where state/lifecycle is needed

### Routing & i18n
- The homepage (`/`) redirects to `/${defaultLang}` (currently `en`)
- All localized pages live under `src/pages/[lang]/` (e.g. `src/pages/[lang]/index.astro`, `src/pages/[lang]/blog.astro`)
- `getStaticPaths()` in each `[lang]` page generates routes for all keys in `src/i18n/ui.ts`
- i18n utilities in `src/i18n/utils.ts`: `getLangFromUrl`, `useTranslations`, `getLocalePath`, `getPathInOtherLang`, `isValidLang`
- Translation strings are defined in `src/i18n/ui.ts` (EN/ES); add keys there for both locales

### State Management
- **Nanostores** (`src/store/store.ts`) manages global state:
  - `darkmode`, `language` — UI state
  - `isAuthenticated`, `authUser`, `authLoading`, `authError` — Firebase auth state

### Live Widgets (React, `client:only`)
All four widgets follow the same fetch-on-mount pattern with loading skeletons and error logging:

| Component | Env var | Backend endpoint |
|-----------|---------|-----------------|
| `AudioPlayer.tsx` | `PUBLIC_SPOTIFY_API` | `GET /api/now-playing` |
| `Weather.tsx` | `PUBLIC_OPEN_WEATHER_API` | OpenWeather directly |
| `Reading/Reading.tsx` | `PUBLIC_POCKET_API` | `GET /api/now-reading` |
| `Education/Education.tsx` | `PUBLIC_CERTIFICATES_API` | `GET /api/certificates` |

`Education` fetches certificates dynamically and renders them in a Swiper carousel with `js-confetti` on click. Themes: `platzi`, `midudev`, `default`.

### Admin Panel
Accessible at `/admin/login` and `/admin/certificates`. Uses `AdminLayout.astro`.

- **Auth**: Firebase email/password via `src/auth/authService.ts`. Token stored in `localStorage` under `firebase_auth_token`. The `getIdToken()` function force-refreshes the token before API calls.
- **Protected pages**: Wrap content with `<ProtectedRoute client:load>` — redirects to `/admin/login` if unauthenticated.
- **Image uploads**: Badge images for certificates are uploaded to Firebase Storage via `uploadImage()` in `authService.ts`, returning a public download URL.
- **Certificate CRUD**: `src/pages/admin/certificates.astro` manages add/edit/delete via `PUBLIC_CERTIFICATES_API` with `Authorization: Bearer <token>` headers.

### Path Aliases (`tsconfig.json`)
- `@root/*` → project root
- `@components/*` → `src/components/`
- `@assets/*` → `src/assets/`
- `@layouts/*` → `src/layouts/`
- `@store/*` → `src/store/`
- `@auth/*` → `src/auth/`

### Layout System
- `Layout.astro` — base layout for localized homepage (bento-grid)
- `BlogLayout.astro` — blog listing layout
- `Post.astro` — individual blog post layout
- `AdminLayout.astro` — admin panel layout

### Bento Grid
Defined in `src/pages/[lang]/index.astro`: `grid-cols-3` mobile, `grid-cols-4` desktop. Components accept `cols` and `rows` props (Tailwind span classes). Use `LinkCard.astro` for clickable cards. Hover pattern: `hover:shadow-xl hover:scale-105 transition-all`.

### Styling
- Tailwind CSS; dark mode via `dark:` variant driven by `darkmode` nanostore
- Global styles in `main.css`
- Responsive breakpoints: mobile-first → `md:` → `xl:`

## Environment Variables

```bash
# Public API endpoints
PUBLIC_PORTFOLIO_URL          # Base URL (https://joseavila.dev)
PUBLIC_SPOTIFY_API            # Backend: GET /api/now-playing
PUBLIC_POCKET_API             # Backend: GET /api/now-reading
PUBLIC_OPEN_WEATHER_API       # OpenWeather API endpoint
PUBLIC_CERTIFICATES_API       # Backend: /api/certificates

# Firebase (auth + storage for admin panel)
PUBLIC_FIREBASE_API_KEY
PUBLIC_FIREBASE_AUTH_DOMAIN
PUBLIC_FIREBASE_PROJECT_ID
PUBLIC_FIREBASE_STORAGE_BUCKET
PUBLIC_FIREBASE_MESSAGING_SENDER_ID
PUBLIC_FIREBASE_APP_ID
```

For local development, create `.env.local` (gitignored).

## Deployment

Auto-deploys to GitHub Pages via `.github/workflows/deploy.yml` on push to `master`. Node 18, runs `npm ci && npm run build`. Environment variables injected from GitHub repository variables.
