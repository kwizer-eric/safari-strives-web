# scripts

Convenience scripts.

- [dev.mjs](./dev.mjs) — spawn all dev servers with prefixed output.
- [build.mjs](./build.mjs) — build every workspace in dependency order.

Both are invoked via the root package.json for convenience:

```bash
node scripts/dev.mjs
node scripts/build.mjs
```
