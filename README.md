# GameBro MVP

Generated full-stack MVP for GameBro — an online game top-up platform with a Next.js frontend and Express + Prisma backend.

## Structure
- `frontend` — Next.js 14 + TailwindCSS app
- `backend` — Express API with Prisma ORM

## Quick start
1. Copy `.env.example` from each folder to `.env` and adjust values.
2. Start the backend API:
   ```bash
   cd backend
   npm install
   npm run prisma:generate
   npm run prisma:migrate --name init
   npm run prisma:seed
   npm run dev
   ```
3. Start the frontend:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
4. Visit http://localhost:3000 for the UI and http://localhost:4000 for the API.

Admin credentials default to `admin@gamebro.gg / changeme` (configure via environment variables).
