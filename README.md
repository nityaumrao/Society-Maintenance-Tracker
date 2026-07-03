# 🏢 Society Maintenance Tracker

## Project Overview
A full‑stack web application that helps apartment societies efficiently manage maintenance complaints, notices, and resident communication. Residents can submit complaints with optional photos, while administrators track progress, assign priorities, post important notices, and monitor key metrics via a dashboard.

## Features
- **Resident side**: Register / login, email verification, raise complaints, upload optional photos, track status, view complaint history, view society notices.
- **Admin side**: View all complaints, filter by status/category, update status & priority, mark overdue, create important notices, email notifications, dashboard statistics.
- **Common**: Role‑based authentication (resident, admin, super‑admin), two‑factor authentication, email integration (Resend), image upload to Cloudinary, PostgreSQL (Neon) via Drizzle ORM.

## Tech Stack
- **Frontend**: Next.js 16 (App Router), React 19, Tailwind CSS, shadcn/ui, TypeScript.
- **Backend/API**: Next.js API Routes, Auth.js (NextAuth), Drizzle ORM, PostgreSQL (Neon).
- **Services**: Cloudinary (image storage), Resend (email), Vercel/Netlify for deployment.

## Folder Structure
```
src/
│   app/                # Next.js routes & pages
│   │   (auth)/         # Public auth pages
│   │   (protected)/    # Protected UI pages (admin dashboard, etc.)
│   │   api/            # API route handlers
│   │       admin/      # Admin‑only endpoints
│   │       complaints/ # Resident complaint endpoints
│   │       notices/    # Notice board endpoints
│   │       upload/     # Image upload endpoint
│   │       dashboard/  # Dashboard stats endpoint
│   │       auth/       # NextAuth catch‑all
│   └── components/    # UI components (complaint cards, dashboard widgets, etc.)
│   └── lib/           # Helpers, constants, DB config, queries
│   └── services/      # Email services
│   └── public/        # Static assets

tests/                 # (if any) test suite
```

## Installation
```bash
git clone https://github.com/nityaumrao/Society-Maintenance-Tracker.git
cd Society-Maintenance-Tracker/Authentication-and-Authorization
npm install
```

Create a `.env` file (see `.env.example` for keys) and run the database migrations:
```bash
npm run drizzle:generate   # generate migration files
npm run drizzle:push       # push schema to the database
```

## Running Locally
```bash
npm run dev
```
The app will be available at `http://localhost:3000`.

## Environment Variables
All required variables are listed in the [.env.example](./.env.example) file.

## Deployment
Deploy the `Authentication-and-Authorization` folder to Vercel or any platform that supports Next.js. Ensure the environment variables are set in the hosting dashboard.

## Screenshots
*(Add screenshots of the dashboard, complaint form, notice board, etc. here before submission.)*
