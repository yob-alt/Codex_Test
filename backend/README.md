# GameBro Backend API

## Getting started

```bash
cd backend
npm install
npm run prisma:generate
npm run prisma:migrate --name init
npm run prisma:seed
npm run dev
```

The API listens on `PORT` (default `4000`).

## Environment variables
- `DATABASE_URL`
- `JWT_SECRET`
- `PORT`
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`

## Key endpoints
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/games`
- `POST /api/orders`
- `POST /api/payments/webhook`
- Admin routes under `/api/admin/*`
