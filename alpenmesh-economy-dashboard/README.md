# oxide-economy-dashboard

Svelte dashboard for AlpenMesh economy insights.

## Run

```bash
npm install
npm run dev
```

Default dev port: `5174`

The dashboard proxies `/api/*` to the economy backend:
- `http://127.0.0.1:3010`

## What it shows

- network-level economy summary
- worker-level earnings and reward status
- recent proof batches with chain lifecycle states
