# ERP System for Scrapyard Operations

A monorepo containing a React/Next.js front‑end (client/) and an Express/TypeScript back‑end (server/). Built for scrapyard operations, the system manages inbound/outbound loads, stockpiles, and purchase order workflows.

## Demo
https://youtu.be/IXBEEPGEJQo

https://tinyurl.com/erp-user-flow

## Deployed on Vercel
https://erp-system-optica.vercel.app/

## Repository Layout

<pre>
erp-system/
├─ client/                           # Next.js 15 front-end
│  ├─ public/                       
│  ├─ src/
│  │  ├─ app/                        # app router pages & layouts
│  │  │  ├─ (components)/            
│  │  │  ├─ dashboard/               
│  │  │  ├─ manage/                  
│  │  │  ├─ settings/                
│  │  │  ├─ track/                   
│  │  │  ├─ transactions/            
│  │  │  ├─ commonPageWrapper.tsx    
│  │  │  ├─ globals.css              
│  │  │  ├─ layout.tsx               
│  │  │  ├─ page.tsx                 
│  │  │  └─ redux.tsx                
│  │  └─ state/                      # Redux Toolkit slices and RTK Query
│  │     ├─ api.tsx
│  │     └─ index.tsx
│  ├─ .gitignore
│  ├─ README.md
│  ├─ eslint.config.mjs
│  └─ next.config.ts
│
├─ server/                           # Express + Prisma back-end
│  ├─ assets/                        
│  ├─ prisma/
│  │  ├─ migrations/                 
│  │  ├─ seedData/                   # JSON helpers for demo data
│  │  ├─ schema.prisma               # data model
│  │  └─ seed.ts                     
│  ├─ src/
│  │  ├─ controllers/                
│  │  ├─ routes/                     # api endpoints
│  │  └─ index.ts                    # server entrypoint
│  ├─ .gitignore
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ tsconfig.json
│  └─ README.md
│
└─ .gitignore                         
</pre>

## Quick Start (Dev/Local)

```bash
# 1. Clone
git clone https://github.com/gupann/erp-system.git
cd erp-system

# 2. Environment variables
# server/.env:
PORT=8000
DATABASE_URL="postgresql://USER:PW@localhost:5432/DBname?schema=public"

# client/.env.local
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000

# 3. Install dependencies for each package
cd server && npm i           # back-end
cd ../client && npm i        # front-end

# 4. Launch dev servers in two terminals

# Terminal 1 – API + DB
cd server
npm run dev                  # http://localhost:8000

# Terminal 1 – Next.js UI
cd client
npm run dev                  # http://localhost:3000
```

## 🗄️ Database Setup and Data Model

The back‑end uses **Prisma** with PostgreSQL.

```bash
# inside server/
npx prisma generate              # generate the Prisma client
npx prisma migrate dev --name init   # create migration + setup tables
npm run seed            # seed demo data (optional)
```
Using Neon (serverless PostgreSQL) for cloud database. Needed for backend server deployment.

<img width="1469" alt="Screenshot 2025-07-08 at 7 15 59 PM" src="https://github.com/user-attachments/assets/1d08aed4-21c6-4732-bcc2-816260ebff63" />

## Design Choices

| **Choice**                     | **Why**                                                                           |
|--------------------------------|-----------------------------------------------------------------------------------------|
| Monorepo                       | One place for front-end and backend → simpler and can make smaller PRs.                                   |
| Next.js 15 (App Router)        | Light, easy to work with, easy/auto routing, common in industry.                                 |
| Tailwind CSS                   | Modern and useful styling.                |
| Redux Toolkit + RTK Query      | Lots of available templates, built in caching, easy to learn.                           |
| Prisma ORM                     | Type safe queries, automated migrations, easy seeding, easy to learn.                               |
| Express                        | Light, familiar Node.js server that pairs well with Prisma.                       |
| PostgreSQL                     | Easy to learn, useful for scalable projects like ERP systems.                                 |
| TypeScript everywhere          | Type safety, past experience, common in industry.               |
| Vercel                          | Easy to use for small projects.               |

## User Flow
1. Lands on dashboard - quick summary views and buttons for quick actions
2. Track inventory on track page - can view, add and edit records
3. Manage stockpiles on manage page - can view and edit records
4. Manage transactions on transactions page - can view and edit P.O.s

https://tinyurl.com/erp-user-flow