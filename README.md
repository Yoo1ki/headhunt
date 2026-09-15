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
npm run generate:gear
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

## Image assets

Generated catalog images are stored in `public/assets/` using a SHA-256 content
hash as the filename. Because changing an image also changes its URL, these
files are served with a one-year immutable browser cache through
`public/_headers`.

In production, `CloudflareImage` serves catalog images through
`/cdn-cgi/image/format=auto/...` so Cloudflare can select an efficient image
format. Local UI icons in the root of `public/` are served directly as Workers
Static Assets. The project does not use the Next.js Image component or an Images
binding.

## Google Drive backups

Create a Google OAuth 2.0 Web client, add the application's origins to its
authorized JavaScript origins, enable the Google Drive API, and set:

```bash
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-oauth-client-secret
```

Add these authorized redirect URIs to the Google OAuth web client:

```text
http://localhost:3000/api/auth/google/callback
https://headhunt.cc/api/auth/google/callback
```

Google Drive backups use the restricted `drive.appdata` scope. The refresh token
is kept in a secure HttpOnly cookie and is never exposed to client JavaScript or
included in backup files. Configure `GOOGLE_CLIENT_SECRET` as a Cloudflare secret
in production; never commit the downloaded Google client-secret JSON file.

## Cloudflare preview and deployment

```bash
npm run preview
```

Before the first deployment, create the R2 incremental-cache bucket configured
in `wrangler.jsonc`, or replace its name with your own bucket:

```bash
npx wrangler r2 bucket create headhunt-opennext-cache
```

For a normal local deployment, commit and push the exact revision first:

```bash
npm run check
git add .
git commit -m "Describe the change"
git push
npm run deploy
```

`npm run deploy` automatically runs `scripts/check-deploy.mjs` before building.
For a Git clone or fork, deployment is stopped when the working tree is dirty,
the current branch has no upstream, or local commits have not been pushed. The
upstream is detected dynamically, so forks deploy against their own repository
rather than this repository.

Downloaded source archives do not contain `.git`; in that case the Git check is
skipped with a warning and deployment is allowed. Clean CI checkouts, including
GitHub Actions and Cloudflare builds, also skip the local upstream check because
their revision already originates from the remote repository.

The footer displays a seven-character Git commit SHA as the Build ID. Builds
use `GITHUB_SHA` or `CF_PAGES_COMMIT_SHA` when available, then fall back to the
local Git `HEAD`. Builds from a source archive without Git metadata use the
package version instead. The value is embedded during the build and does not
make a runtime API request.
