# scripts

Convenience scripts for the frontend workspace.

- [dev.mjs](./dev.mjs) — run the single `public-web` Next.js dev server (equivalent to `npm run dev -w public-web`).
- [build.mjs](./build.mjs) — build every workspace in dependency order.

```bash
node scripts/dev.mjs
node scripts/build.mjs
```
