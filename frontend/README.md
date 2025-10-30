# GameBro Frontend

## Getting started

```bash
cd frontend
npm install
npm run dev
```

The app expects the API to be available at `NEXT_PUBLIC_API_BASE_URL` (defaults to `http://localhost:4000`).

## Available routes
- `/` — Game catalog
- `/game/[id]` — Packages for the selected game
- `/checkout/new` — Create a new order
- `/checkout/[orderId]` — Payment view
- `/dashboard` — User account
- `/admin/*` — Admin dashboard
