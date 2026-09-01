# Headhunt.cc

Headhunt tracker and game-data catalog built with Next.js and deployed to
Cloudflare through OpenNext.

## Requirements

- Node.js 20 or newer
- npm
- A `.dev.vars` file based on `.dev.vars.example` for Cloudflare bindings

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Quality checks

```bash
npm run check
npm run build
```

## Data scripts

Raw upstream responses live under `raw/`. Scripts in `scripts/` transform them
into the locale-specific JSON consumed from `src/data/`.

Common commands:

```bash
npm run generate:content
npm run generate:banner
npm run get:pool
npm run get:guide
```

## Project structure

```text
public/            Static images and public response headers
raw/               Raw upstream game data used by generation scripts
scripts/           Data fetching and generation tools
src/app/           Next.js routes with route-private `_components` folders
src/components/    Global components grouped into `ui`, `layout`, and `shared`
src/config/        Runtime application configuration
src/data/          Generated locale-specific application data
src/hooks/         Shared React hooks
src/i18n/          Locale routing and request configuration
src/lib/           Framework-independent runtime utilities
src/store/         Client-side Zustand stores
src/types/         Application and external API type definitions
```

Route-specific components stay beside their route inside `_components`. Only
components reused across routes belong in `src/components/`:

```text
src/components/
├── layout/         Site shell, navigation, header, sidebar, and footer
├── shared/         Reusable application-aware components
└── ui/             Generic presentational controls
```

`get-record-url.ps1` intentionally remains in the repository root because the
published tracker UI downloads it through its stable GitHub raw URL.

Puppeteer scripts use the existing local defaults for Chrome. Override them on
another machine with `CHROME_EXECUTABLE_PATH` and `PUPPETEER_USER_DATA_DIR`.

## Cloudflare preview and deployment

```bash
npm run preview
npm run deploy
```
