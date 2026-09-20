# Contributing

Thank you for helping improve Headhunt.

## Development setup

1. Fork and clone the repository.
2. Install Node.js 22 or newer.
3. Run `npm ci`.
4. Copy `.dev.vars.example` to `.dev.vars` and provide your own development
   configuration. Never commit local environment files or credentials.
5. Run `npm run dev`.

Each fork must use its own Google OAuth client and authorized origins. Import
URLs are sensitive and must never be used as fixtures or shared in reports.

## Before opening a pull request

Run:

```bash
npm run check
npm run build
```

Keep changes focused, update tests and documentation when behavior changes, and
do not commit generated build output. By contributing, you agree that your
source-code contribution is provided under the repository's MIT License.

Third-party game assets and data are not covered by the MIT License. Document
the origin and permitted use of any third-party material added by a change.
