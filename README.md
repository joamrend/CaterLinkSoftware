# CaterLink Software

A comprehensive full-stack web platform designed for corporate catering management, weekly menu scheduling, order tracking, reporting, and employee attendance integration with biometric systems.

---

## Tech Stack

* **Frontend:** Angular 19+ (Standalone Components, SCSS, RxJS, HttpClient).
* **UI Components & Charts:** Angular Material, Material Design Symbols.
* **Backend:** Node.js, Express, TypeScript (`tsx`).
* **Persistence & Database:** Prisma ORM 7 (`@prisma/client`, `@prisma/adapter-pg`), PostgreSQL.
* **Data & Spreadsheet Processing:** ExcelJS, SheetJS (`xlsx`), PapaParse.
* **Automation & Background Jobs:** Node-cron for scheduled tasks.

---

## Project Structure

```text
caterlinksoftware/
├── backend/
│   ├── prisma/           # Database schema, migrations, and seed scripts
│   │   ├── migrations/   # PostgreSQL schema history
│   │   ├── schema.prisma # Relational data models
│   │   └── seed.ts       # Database initial mock data
│   ├── src/
│   │   ├── lib/          # Prisma database client instance (prisma.ts)
│   │   └── index.ts      # Express server & REST API endpoints
│   ├── .env              # Backend environment variables (DB URL, Port)
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── core/     # Global singleton services (HttpClient, Auth, Dashboard)
│   │   │   ├── features/ # Feature views & pages (dashboard, menus, orders)
│   │   │   ├── app.routes.ts # Frontend routing definitions
│   │   │   └── app.ts    # Standalone root component
│   │   ├── styles.scss   # Global styling and Material theme
│   │   └── main.ts       # Application entry point
│   ├── angular.json      # Angular workspace configuration
│   ├── package.json
│   └── tsconfig.json
└── README.md
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
# Backend dependencies
cd backend
npm install

# Frontend dependencies
cd ../frontend
npm install
```

**4. Database Migrations & Seeding**
```
# Run migrations
npx prisma migrate dev --name init_caterlink

# Generate Prisma Client
npx prisma generate

# Populate initial seed data
npx prisma db seed
```

## Running the Application
Both servers must run simultaneously in separate terminals:

**1. Start Backend Server (Port 4000):**
```
cd backend
npm run dev
```
API running at: **http://localhost:4000**

**2. Start Frontend App (Port 4200):**
```
cd frontend
npm start
```
App running at: **http://localhost:4200**

## Demo Credentials (Seed)
* **Administrator:** admin@caterlink.com | 123456
* **Provider:** proveedor@caterlink.com | 123456
* **Employee:** empleado@caterlink.com | 123456