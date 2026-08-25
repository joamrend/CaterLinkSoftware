# CaterLink Software

A comprehensive full-stack web platform designed for corporate catering management, weekly menu scheduling, order tracking, reporting, and employee attendance integration with biometric systems.

---

## Tech Stack

* **Frontend:** Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS v4.
* **UI Components & Charts:** Material UI (MUI v7), `@mui/x-date-pickers`, Recharts, Lottie React.
* **Backend & Persistence:** Next.js Route Handlers (`/api/*`), Prisma ORM 7 (`@prisma/client`, `@prisma/adapter-pg`), PostgreSQL.
* **Data & Spreadsheet Processing:** ExcelJS, SheetJS (`xlsx`), PapaParse, csv-parser.
* **Automation & Background Jobs:** Node-cron for scheduled tasks.

---

## Project Structure

```text
caterlinksoftware/
├── app/                  # App Router views & API Route Handlers
│   ├── api/              # Backend endpoints (auth, attendance, orders, reports, etc.)
│   ├── mk/               # Admin, provider, and employee dashboard views
│   ├── layout.tsx        # Root application layout
│   └── page.tsx          # Landing / Entry page
├── lib/                  # Shared instances & clients (prisma.ts)
├── prisma/               # Database schema, migrations, and seed scripts
│   ├── schema.prisma     # Relational models (User, Menu, Order, Attendance)
│   └── seed.ts           # Development seed data
├── prisma.config.ts      # Prisma 7 centralized configuration
└── tsconfig.json         # TypeScript compiler configuration
```

## Local Development Setup
**1. Prerequisites**
* Node.js v20+ installed
* Local PostgreSQL instance running (default port 5432)
* A dedicated database named **caterlink_db**.

**2. Environment Variables**
Create a **.env** file in the project root:
```
DATABASE_URL="postgresql://postgres:YOUR_LOCAL_PASSWORD@localhost:5432/caterlink_db?schema=public"
NODE_ENV="development"
PORT=3000
```

**3. Install Dependencies**
```
npm install
```

**4. Database Migrations & Seeding**
```
# Run database migrations
npx prisma migrate dev --name init_caterlink

# Populate initial seed data
npx prisma db seed
```

## Running the Application
Start the local Next.js development server:
```
npm run dev
```
Open **http://localhost:3000** in your browser.

## Demo Credentials (Seed)
* **Administrator:** admin@caterlink.com | 123456
* **Provider:** proveedor@caterlink.com | 123456
* **Employee:** empleado@caterlink.com | 123456